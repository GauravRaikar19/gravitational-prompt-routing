"""
Semantic Mass calculations for Model Singularities and Prompt Point Masses.
"""

import math
from typing import Dict, Optional
from gpr.core.constants import (
    DEFAULT_OMEGA_PARAM,
    DEFAULT_OMEGA_BENCHMARK,
    DEFAULT_OMEGA_CONTEXT,
)


def calculate_model_semantic_mass(
    parameters_b: float,
    benchmark_scores: Dict[str, float],
    context_window_k: float,
    benchmark_weights: Optional[Dict[str, float]] = None,
    omega_param: float = DEFAULT_OMEGA_PARAM,
    omega_bench: float = DEFAULT_OMEGA_BENCHMARK,
    omega_context: float = DEFAULT_OMEGA_CONTEXT,
) -> float:
    """
    Computes the scalar Semantic Mass (M_i) of an LLM Singularity.

    M_i = omega_P * ln(P) + omega_B * sum(w_k * B_k) * 10 + omega_C * log2(C)

    Parameters:
        parameters_b: Parameter scale in billions (e.g., 70 for a 70B model).
        benchmark_scores: Dict of normalized benchmark domain scores [0.0, 1.0].
        context_window_k: Context window capacity in thousands of tokens (e.g. 128 for 128k).
        benchmark_weights: Optional per-benchmark weighting dict.
        omega_param: Parameter weight factor.
        omega_bench: Benchmark weight factor.
        omega_context: Context weight factor.

    Returns:
        float: Non-negative semantic mass.
    """
    # 1. Parameter logarithmic scaling (guarded for P >= 1.0)
    p_clamped = max(1.0, float(parameters_b))
    p_term = math.log(p_clamped + 1.0) * 10.0

    # 2. Weighted benchmark aggregate
    if benchmark_scores:
        if benchmark_weights:
            total_w = sum(benchmark_weights.get(k, 1.0) for k in benchmark_scores)
            bench_term = (
                sum(benchmark_scores[k] * benchmark_weights.get(k, 1.0) for k in benchmark_scores)
                / max(1e-6, total_w)
            ) * 100.0
        else:
            bench_term = (sum(benchmark_scores.values()) / len(benchmark_scores)) * 100.0
    else:
        bench_term = 50.0

    # 3. Context window logarithmic scaling
    c_clamped = max(1.0, float(context_window_k))
    c_term = math.log2(c_clamped + 1.0) * 5.0

    # Composite mass calculation
    raw_mass = (
        (omega_param * p_term)
        + (omega_bench * bench_term)
        + (omega_context * c_term)
    )

    return max(1.0, round(raw_mass, 3))


def calculate_prompt_inertia(
    text: str,
    token_count_approx: Optional[int] = None,
    alpha: float = 0.5,
    beta: float = 0.3,
) -> float:
    """
    Calculates the dynamic prompt mass (m_p), measuring informational inertia.

    m_p = 1.0 + alpha * log10(tokens) + beta * ShannonEntropy(text)

    Parameters:
        text: Raw prompt string.
        token_count_approx: Optional precomputed token count.
        alpha: Token length sensitivity.
        beta: Lexical entropy sensitivity.

    Returns:
        float: Positive scalar prompt mass.
    """
    tokens = token_count_approx or max(1, len(text.split()))
    token_term = math.log10(tokens + 9.0)  # log10(10)=1 when tokens=1

    # Shannon Entropy of character distribution (approximating informational complexity)
    if text:
        prob_dist = [text.count(c) / len(text) for c in set(text)]
        entropy = -sum(p * math.log2(p) for p in prob_dist if p > 0)
        # Normalize entropy roughly by max typical character entropy (~5.0)
        norm_entropy = min(2.0, entropy / 4.0)
    else:
        norm_entropy = 0.0

    mass = 1.0 + (alpha * token_term) + (beta * norm_entropy)
    return max(0.5, round(mass, 4))
