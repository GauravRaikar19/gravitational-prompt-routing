"""
Quickstart demonstration of Gravitational Prompt Routing (GPR).
Simulates three model singularities and visualizes prompt trajectories.
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
from gpr.visualizer.field_plotter import render_routing_ascii, render_topography_2d


def run_quickstart():
    print("\n[*] Initializing Gravitational Prompt Router (GPR)...")

    # 1. Instantiate the router
    router = GravitationalRouter(
        gravitational_constant=1.0,
        softening_epsilon=0.08,
        decay_exponent=3.0,       # Steeper potential well: strongly rewards close domain proximity
        lagrange_threshold=0.15,  # Triggers co-processing if top 2 models are within 15% force
    )

    # 2. Register Model Singularities with benchmark profiles and domain exemplars
    code_model = LLMSingularity(
        id="code-expert-70b",
        name="DeepCoder-70B",
        domain_description="Specialized in software engineering, low-level programming, algorithms, debugging, Python, Rust, memory management, and systems architecture.",
        parameters_b=70.0,
        benchmark_scores={"humaneval": 0.92, "swe_bench": 0.65, "mbpp": 0.88},
        context_window_k=128.0,
        cost_per_m_tokens=0.80,
        median_latency_ms=180.0,
        domain_exemplars=[
            "Write a concurrent memory pool in C++",
            "Optimize this PostgreSQL query execution plan",
            "Implement a lock-free ring buffer in Rust with zero heap allocation",
            "Fix memory leak and null pointer dereference in kernel module",
            "Algorithm complexity dynamic programming binary tree",
        ],
    )

    math_model = LLMSingularity(
        id="math-reasoner-405b",
        name="OmniReasoner-405B",
        domain_description="Master of advanced mathematics, formal logic, theoretical physics proofs, calculus, tensors, and multi-step analytical reasoning.",
        parameters_b=405.0,
        benchmark_scores={"gsm8k": 0.97, "math": 0.84, "mmlu": 0.91},
        context_window_k=256.0,
        cost_per_m_tokens=3.00,
        median_latency_ms=450.0,
        domain_exemplars=[
            "Prove the Riemann hypothesis for trivial zeros",
            "Calculate tensor curvature invariants in general relativity",
            "Solve the Navier-Stokes differential equation approximation",
            "Derive the Lagrangian mechanics equations of motion and Christoffel symbols",
            "Formal axiomatic mathematical proof and theorem verification",
        ],
    )

    creative_model = LLMSingularity(
        id="creative-writer-8b",
        name="Hermes-Prose-8B",
        domain_description="Expressive creative writing, songs, lyrics, emotional character dialogue, prose, fiction, poetry, soliloquy, melancholy, storytelling, fantasy tales, romantic letters, and imaginative narratives.",
        parameters_b=8.0,
        benchmark_scores={"alpaca_eval": 0.89, "eq_bench": 0.85},
        context_window_k=64.0,
        cost_per_m_tokens=0.20,
        median_latency_ms=90.0,
        domain_exemplars=[
            "Write a poetic monologue from the perspective of an astronaut drifting into space",
            "Compose a lyrical ballad in iambic pentameter about melancholy and tears",
            "Craft a tense noir detective dialogue scene in the rainy midnight",
            "Write an emotional soliloquy of a weary artisan watching time slip away",
            "Expressive fiction narrative with rich metaphors and emotional prose",
            "Write me a song about love and heartbreak under the moonlight",
            "Tell me a story about a dragon who befriends a lonely child",
            "Compose a lullaby for a baby falling asleep under the stars",
            "Write lyrics for a folk ballad about the changing seasons",
            "Create an imaginative fantasy tale of an enchanted forest kingdom",
        ],
    )

    router.register_singularity(code_model)
    router.register_singularity(math_model)
    router.register_singularity(creative_model)

    print(f"Registered {len(router.singularities)} gravitational singularities:")
    for s in router.singularities.values():
        print(f"  • {s.name:<20} | Mass: {s.mass:6.2f} | Params: {s.parameters_b:3.0f}B")

    # 3. Test prompts representing different cognitive domains
    test_prompts = [
        # Domain: Pure Systems Code
        "Write a memory-safe lock-free ring buffer in Rust with zero heap allocation and atomic CAS operations.",

        # Domain: Advanced Mathematical Physics
        "Derive the Christoffel symbols and Riemann curvature tensor for a Schwarzschild black hole metric.",

        # Domain: Poetic / Creative Fiction
        "Write an emotional, melancholic soliloquy of a clockmaker who realizes time itself is falling asleep.",

        # Domain: Hybrid Lagrange Resonance (Code + Poetic Philosophy)
        "Compose an elegant poetic dialogue in verse between Alan Turing and a thinking machine discussing mathematical truth and human emotion.",
    ]

    print("\n" + "#" * 80)
    print("EXECUTING GRAVITATIONAL PROMPT ROUTING SIMULATION")
    print("#" * 80 + "\n")

    for prompt in test_prompts:
        decision = router.route(prompt)
        print(render_routing_ascii(decision))
        print()

    # Show 2D Topography manifold slice for the last prompt
    print("=" * 80)
    print("COGNITIVE TOPOGRAPHY MANIFOLD SLICE (PROMPT IN LATENT SPACE)")
    print("=" * 80)
    last_decision = router.route(test_prompts[-1])
    print(render_topography_2d(last_decision))
    print("=" * 80)


if __name__ == "__main__":
    run_quickstart()
