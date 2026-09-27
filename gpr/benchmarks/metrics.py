"""
Metrics calculation engine for routing accuracy, economics, and performance.
"""

from collections import defaultdict
from dataclasses import dataclass, field
from typing import Dict, List, Any
import numpy as np


@dataclass
class DomainMetrics:
    """Per-domain precision, recall, and F1 performance."""
    domain: str
    total_samples: int
    true_positives: int
    false_positives: int
    false_negatives: int
    precision: float
    recall: float
    f1_score: float


@dataclass
class RouterBenchmarkResult:
    """Consolidated benchmark evaluation results for a single router."""
    router_name: str
    total_queries: int
    correct_queries: int
    accuracy_percent: float

    # Performance
    mean_latency_ms: float
    p95_latency_ms: float
    p99_latency_ms: float
    throughput_qps: float

    # Economics
    total_cost_usd: float
    cost_per_1k_queries: float
    cost_savings_vs_monolithic_percent: float

    # Distributions
    workload_distribution: Dict[str, float]  # model_id -> percent share
    domain_breakdown: Dict[str, DomainMetrics]

    raw_failures: List[Dict[str, Any]] = field(default_factory=list)


class MetricsCalculator:
    """Calculates comprehensive benchmark statistics across routing decisions."""

    @staticmethod
    def compute(
        router_name: str,
        queries: List[Dict[str, Any]],
        predictions: List[str],
        latencies_ms: List[float],
        costs_usd: List[float],
        monolithic_cost_usd: float,
    ) -> RouterBenchmarkResult:
        total = len(queries)
        if total == 0:
            raise ValueError("Cannot calculate metrics on empty query set.")

        correct = 0
        failures = []

        # Domain level tracking
        # domain -> {TP, FP, FN, total}
        domain_counts = defaultdict(lambda: {"TP": 0, "FP": 0, "FN": 0, "total": 0})
        model_distribution = defaultdict(int)

        # Mapping expected models to canonical domains
        model_to_domain = {
            "deepseek-r1-671b": "math",
            "qwen-2.5-coder-32b": "code",
            "hermes-3-70b": "creative",
            "llama-3.3-70b-instruct": "knowledge",
            "llama-3.1-8b-instant": "knowledge",
        }

        for q, pred in zip(queries, predictions):
            exp = q["expected_model"]
            dom = q.get("domain", model_to_domain.get(exp, "unknown"))
            pred_dom = model_to_domain.get(pred, "unknown")

            model_distribution[pred] += 1
            domain_counts[dom]["total"] += 1

            if pred == exp:
                correct += 1
                domain_counts[dom]["TP"] += 1
            else:
                domain_counts[dom]["FN"] += 1
                if pred_dom in domain_counts:
                    domain_counts[pred_dom]["FP"] += 1
                failures.append({
                    "prompt": q["prompt"],
                    "domain": dom,
                    "expected": exp,
                    "predicted": pred,
                })

        accuracy = (correct / total) * 100.0

        # Latencies
        arr_lat = np.array(latencies_ms)
        mean_lat = float(np.mean(arr_lat))
        p95_lat = float(np.percentile(arr_lat, 95))
        p99_lat = float(np.percentile(arr_lat, 99))
        throughput = 1000.0 / mean_lat if mean_lat > 0 else 0.0

        # Economics
        total_cost = float(sum(costs_usd))
        cost_per_1k = (total_cost / total) * 1000.0
        if monolithic_cost_usd > 0:
            savings = max(0.0, ((monolithic_cost_usd - total_cost) / monolithic_cost_usd) * 100.0)
        else:
            savings = 0.0

        # Workload share
        workload_share = {
            m: round((count / total) * 100.0, 2)
            for m, count in model_distribution.items()
        }

        # Domain breakdown
        domain_metrics_map = {}
        for d, cnt in domain_counts.items():
            tp = cnt["TP"]
            fp = cnt["FP"]
            fn = cnt["FN"]
            prec = (tp / (tp + fp)) * 100.0 if (tp + fp) > 0 else 0.0
            rec = (tp / (tp + fn)) * 100.0 if (tp + fn) > 0 else 0.0
            f1 = (2 * prec * rec) / (prec + rec) if (prec + rec) > 0 else 0.0
            domain_metrics_map[d] = DomainMetrics(
                domain=d,
                total_samples=cnt["total"],
                true_positives=tp,
                false_positives=fp,
                false_negatives=fn,
                precision=round(prec, 1),
                recall=round(rec, 1),
                f1_score=round(f1, 1),
            )

        return RouterBenchmarkResult(
            router_name=router_name,
            total_queries=total,
            correct_queries=correct,
            accuracy_percent=round(accuracy, 2),
            mean_latency_ms=round(mean_lat, 3),
            p95_latency_ms=round(p95_lat, 3),
            p99_latency_ms=round(p99_lat, 3),
            throughput_qps=round(throughput, 1),
            total_cost_usd=round(total_cost, 4),
            cost_per_1k_queries=round(cost_per_1k, 4),
            cost_savings_vs_monolithic_percent=round(savings, 2),
            workload_distribution=workload_share,
            domain_breakdown=domain_metrics_map,
            raw_failures=failures,
        )
