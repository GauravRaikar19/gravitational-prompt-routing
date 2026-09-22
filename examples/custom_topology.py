"""
Demonstrating Relativistic Dampening in GPR:
Balancing massive frontier models against budget/latency constraints.
"""

import os
import sys

# Ensure package root is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Ensure robust stdout encoding on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from gpr.core.engine import GravitationalRouter
from gpr.models.singularity import LLMSingularity
from gpr.visualizer.field_plotter import render_routing_ascii


def run_custom_topology_demo():
    print("\n[*] GPR Demo: Impact of Relativistic Cost/Latency Dampening\n")

    # Frontier high-mass, high-cost singularity
    giant_model = LLMSingularity(
        id="giant-frontier-405b",
        name="TitanOmni-405B",
        domain_description="General reasoning, code, math, and knowledge synthesis.",
        parameters_b=405.0,
        benchmark_scores={"mmlu": 0.93, "humaneval": 0.91},
        cost_per_m_tokens=15.00,  # Expensive ($15/M)
        median_latency_ms=1200.0,  # High latency (1.2s)
        domain_exemplars=["Solve logic puzzle", "Debug algorithm", "Explain concept"],
    )

    # Fast, ultra-cheap agile singularity
    fast_model = LLMSingularity(
        id="agile-flash-8b",
        name="SwiftFlash-8B",
        domain_description="General reasoning, code, math, and knowledge synthesis.",
        parameters_b=8.0,
        benchmark_scores={"mmlu": 0.78, "humaneval": 0.76},
        cost_per_m_tokens=0.15,   # Cheap ($0.15/M)
        median_latency_ms=120.0,   # Fast (120ms)
        domain_exemplars=["Solve logic puzzle", "Debug algorithm", "Explain concept"],
    )

    prompt = "Explain how merge sort works with a short code snippet."

    # Scenario A: Unconstrained (Pure capability / mass preference)
    print("=" * 80)
    print("SCENARIO A: Unconstrained Routing (lambda_cost=0, lambda_latency=0)")
    router_unconstrained = GravitationalRouter(lambda_cost=0.0, lambda_latency=0.0)
    router_unconstrained.register_singularity(giant_model)
    router_unconstrained.register_singularity(fast_model)
    decision_a = router_unconstrained.route(prompt)
    print(render_routing_ascii(decision_a))

    # Scenario B: Cost & Latency Penalties Enabled
    print("\n" + "=" * 80)
    print("SCENARIO B: Relativistic Dampened Routing (lambda_cost=1.5, lambda_latency=1.0)")
    router_dampened = GravitationalRouter(lambda_cost=1.5, lambda_latency=1.0)
    router_dampened.register_singularity(giant_model)
    router_dampened.register_singularity(fast_model)
    decision_b = router_dampened.route(prompt)
    print(render_routing_ascii(decision_b))


if __name__ == "__main__":
    run_custom_topology_demo()
