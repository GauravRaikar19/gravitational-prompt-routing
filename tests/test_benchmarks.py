"""
Unit test suite for GPR Benchmark & Evaluation Framework.
"""

import unittest
from gpr.benchmarks.baselines import (
    GPRRouterWrapper,
    CosineCentroidRouter,
    KeywordHeuristicRouter,
    MonolithicFrontierRouter,
    AlwaysCheapestRouter,
)
from gpr.benchmarks.economics import TokenCostEstimator
from gpr.benchmarks.runner import BenchmarkRunner
from gpr.benchmarks.metrics import MetricsCalculator


class TestBenchmarkFramework(unittest.TestCase):

    def test_token_cost_estimator(self):
        estimator = TokenCostEstimator()
        tokens = estimator.estimate_prompt_tokens("Solve the quadratic equation 3x^2 + 5x - 2 = 0")
        self.assertGreater(tokens, 5)

        cost_frontier = estimator.calculate_cost("deepseek-r1-671b", "Solve 2+2", domain="math")
        cost_cheap = estimator.calculate_cost("llama-3.1-8b-instant", "Solve 2+2", domain="math")
        self.assertGreater(cost_frontier, cost_cheap)

    def test_router_execution(self):
        routers = [
            GPRRouterWrapper(),
            CosineCentroidRouter(),
            KeywordHeuristicRouter(),
            MonolithicFrontierRouter(),
            AlwaysCheapestRouter(),
        ]

        test_prompt = "Write a python function to implement quicksort"
        for r in routers:
            decision = r.route(test_prompt)
            self.assertIsNotNone(decision.selected_model_id)
            self.assertGreaterEqual(decision.decision_time_ms, 0.0)

    def test_benchmark_runner_subset(self):
        runner = BenchmarkRunner()
        # Run small subset of 10 queries
        results = runner.run(dataset_name="code", sample_limit=10)
        self.assertIn("Gravitational Prompt Router (GPR)", results)
        gpr_res = results["Gravitational Prompt Router (GPR)"]
        self.assertEqual(gpr_res.total_queries, 10)
        self.assertGreater(gpr_res.accuracy_percent, 50.0)


if __name__ == "__main__":
    unittest.main()
