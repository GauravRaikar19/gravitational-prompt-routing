"""
Default Frontier Singularities matching production and client configurations.
"""

from typing import List
from gpr.models.singularity import LLMSingularity


def get_default_singularities() -> List[LLMSingularity]:
    """Returns the 4 canonical frontier model singularities for GPR."""
    qwen = LLMSingularity(
        id="qwen-2.5-coder-32b",
        name="Qwen-2.5-Coder-32B",
        domain_description="Alibaba's premier open coding model. Specialized in software engineering, low-level systems, Rust, C++, Python, algorithms, concurrency, Docker, SQL, and systems architecture.",
        parameters_b=32.0,
        benchmark_scores={"eval": 0.85},
        context_window_k=128.0,
        cost_per_m_tokens=0.20,
        median_latency_ms=110.0,
        domain_exemplars=[
            "Write a memory-safe lock-free ring buffer in Rust with zero heap allocation",
            "Optimize this PostgreSQL query execution plan and B-Tree index",
            "Implement concurrent thread pool in C++ with work-stealing deque",
            "Fix null pointer dereference and memory leak in Linux kernel module",
            "Write python code to check prime number and generate sieve",
            "Implement binary search algorithm in Python and C++",
            "Write a Dockerfile and docker-compose for multi-stage python web app",
            "How do I center a div using CSS flexbox?",
            "Write a bash script to parse JSON and backup directory to S3",
            "Explain async await in Node.js event loop and call stack"
        ]
    )
    qwen.set_mass(58.5)

    deepseek = LLMSingularity(
        id="deepseek-r1-671b",
        name="DeepSeek-R1-671B",
        domain_description="DeepSeek's frontier 671B MoE reasoning model. Master of formal mathematical proofs, theoretical physics, calculus, tensors, symbolic logic, and multi-step analytical reasoning.",
        parameters_b=671.0,
        benchmark_scores={"eval": 0.96},
        context_window_k=128.0,
        cost_per_m_tokens=0.55,
        median_latency_ms=320.0,
        domain_exemplars=[
            "Derive the Christoffel symbols and Riemann curvature tensor for a black hole",
            "Prove the Riemann hypothesis for non-trivial zeros and analytic continuation",
            "Solve nonlinear differential equations with Navier-Stokes approximations",
            "Derive the Euler-Lagrange equations of motion in Hamiltonian mechanics",
            "Solve quadratic equation and calculate hypotenuse using Pythagorean theorem",
            "Calculate the derivative of sin(x) * e^x using product rule",
            "Prove by induction that sum of first n integers is n(n+1)/2",
            "What is the integral of 1/x dx and explain the natural logarithm?",
            "Explain Heisenberg uncertainty principle and Planck constant in quantum physics",
            "Calculate the probability of rolling two sixes on fair dice"
        ]
    )
    deepseek.set_mass(74.2)

    hermes = LLMSingularity(
        id="hermes-3-70b",
        name="Hermes-3-70B",
        domain_description="Nous Research's frontier flagship model. Acclaimed for expressive creative writing, songs, lyrics, emotional character dialogues, screenplays, melancholy, poetry, metaphors, fantasy tales, and evocative storytelling.",
        parameters_b=70.0,
        benchmark_scores={"eval": 0.82},
        context_window_k=128.0,
        cost_per_m_tokens=0.40,
        median_latency_ms=140.0,
        domain_exemplars=[
            "Write an evocative melancholic acoustic ballad about lost love in autumn",
            "Compose a dramatic noir screenplay scene between two detectives at 3 AM in the rain",
            "Write a poetic soliloquy of an ancient sentient star watching galaxies collide",
            "Draft an intimate fantasy dialogue between a rogue thief and a moon goddess",
            "Write a beautiful emotional poem about cherry blossoms falling on quiet water",
            "Compose lyrics for a heartbreaking indie rock song about memory and nostalgia",
            "Tell a mystical fairy tale about a clockmaker who captured whispered secrets in pocket watches",
            "Write a sweet birthday greeting card message filled with warmth and affection",
            "Draft a gothic monologue about an immortal painter seeking his final masterpiece",
            "Write a haiku capturing the silence after morning snow"
        ]
    )
    hermes.set_mass(53.0)

    llama = LLMSingularity(
        id="llama-3.3-70b-instruct",
        name="Llama-3.3-70B-Instruct",
        domain_description="Meta's flagship open-weights model for world geography, governance, political leadership, factual Q&A, historical entities, state ministers, current affairs, and encyclopedic reasoning.",
        parameters_b=70.0,
        benchmark_scores={"eval": 0.88},
        context_window_k=128.0,
        cost_per_m_tokens=0.40,
        median_latency_ms=125.0,
        domain_exemplars=[
            "Who is the chief minister of Goa and what is their political party and term?",
            "Who is the prime minister of India and what are the key powers of the executive branch?",
            "Explain the history, founding, and administrative capital of Aldona and Panaji Goa",
            "Who founded Google, Apple, and Microsoft and what were their breakthrough inventions?",
            "What is the capital city, official language, and currency of France and Germany?",
            "What is the national animal, bird, flower, and anthem of India?",
            "How many talukas and districts are there in Goa?",
            "Summarize the constitutional structure of the Indian parliamentary democracy",
            "What is the capital of Australia, Canada, and Brazil?",
            "In what year did World War II end and which treaties were signed?"
        ]
    )
    llama.set_mass(65.0)

    return [qwen, deepseek, hermes, llama]


def get_cheapest_singularity() -> LLMSingularity:
    """Returns the cheapest lightweight model (e.g. 8B) for baseline comparisons."""
    cheap = LLMSingularity(
        id="llama-3.1-8b-instant",
        name="Llama-3.1-8B-Instant",
        domain_description="Ultra-fast, lightweight 8B parameter model suitable for simple queries.",
        parameters_b=8.0,
        benchmark_scores={"eval": 0.65},
        context_window_k=128.0,
        cost_per_m_tokens=0.05,
        median_latency_ms=75.0,
    )
    cheap.set_mass(35.0)
    return cheap
