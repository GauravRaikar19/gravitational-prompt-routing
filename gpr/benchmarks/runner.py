"""
BenchmarkRunner: Orchestrates multi-router evaluation pipelines across datasets.
"""

import json
import os
from typing import Dict, List, Optional, Any

from gpr.benchmarks.baselines import AbstractRouter, get_all_benchmark_routers, MonolithicFrontierRouter
from gpr.benchmarks.economics import TokenCostEstimator
from gpr.benchmarks.metrics import MetricsCalculator, RouterBenchmarkResult
from gpr.adapters.embedder import BaseEmbedder


class BenchmarkRunner:
    """
    Executes automated routing benchmarks across model routers and query datasets.
    """

    DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

    def __init__(
        self,
        embedder: Optional[BaseEmbedder] = None,
        cost_estimator: Optional[TokenCostEstimator] = None,
    ):
        self.embedder = embedder
        self.cost_estimator = cost_estimator or TokenCostEstimator()

    def load_dataset(self, name_or_path: str = "full") -> List[Dict[str, Any]]:
        """
        Loads queries from predefined split or file path.
        Allowed aliases: 'full', 'knowledge', 'math', 'code', 'creative'.
        """
        split_map = {
            "full": "full_benchmark.json",
            "knowledge": "world_knowledge.json",
            "world_knowledge": "world_knowledge.json",
            "math": "math_reasoning.json",
            "math_reasoning": "math_reasoning.json",
            "code": "code_systems.json",
            "code_systems": "code_systems.json",
            "creative": "creative_prose.json",
            "creative_prose": "creative_prose.json",
        }

        filename = split_map.get(name_or_path.lower(), name_or_path)
        path = filename if os.path.isabs(filename) else os.path.join(self.DATA_DIR, filename)

        if not os.path.exists(path):
            raise FileNotFoundError(f"Benchmark dataset not found at: {path}")

        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)

        return data

    def run(
        self,
        dataset_name: str = "full",
        routers: Optional[List[AbstractRouter]] = None,
        sample_limit: Optional[int] = None,
    ) -> Dict[str, RouterBenchmarkResult]:
        """
        Runs full comparative benchmark across provided routers and returns structured results.
        """
        queries = self.load_dataset(dataset_name)
        if sample_limit and sample_limit > 0:
            queries = queries[:sample_limit]

        if not routers:
            routers = get_all_benchmark_routers(self.embedder)

        # 1. First run Monolithic Frontier to establish economic baseline
        mono_router = MonolithicFrontierRouter()
        mono_costs: List[float] = []
        for q in queries:
            c = self.cost_estimator.calculate_cost(
                model_id="deepseek-r1-671b",
                prompt_text=q["prompt"],
                domain=q.get("domain", "default"),
            )
            mono_costs.append(c)
        monolithic_total_cost = sum(mono_costs)

        # 2. Run all routers
        results: Dict[str, RouterBenchmarkResult] = {}

        for r in routers:
            preds: List[str] = []
            latencies: List[float] = []
            costs: List[float] = []

            for q in queries:
                decision = r.route(q["prompt"])
                preds.append(decision.selected_model_id)
                latencies.append(decision.decision_time_ms)

                cost = self.cost_estimator.calculate_cost(
                    model_id=decision.selected_model_id,
                    prompt_text=q["prompt"],
                    domain=q.get("domain", "default"),
                )
                costs.append(cost)

            res = MetricsCalculator.compute(
                router_name=r.name,
                queries=queries,
                predictions=preds,
                latencies_ms=latencies,
                costs_usd=costs,
                monolithic_cost_usd=monolithic_total_cost,
            )
            results[r.name] = res

        return results
