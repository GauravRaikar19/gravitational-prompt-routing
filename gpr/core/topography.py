"""
Cognitive Topography Mapping: Geodesic distances, potential fields, and attraction vectors.
"""

import math
import numpy as np
from gpr.core.constants import DEFAULT_EPSILON, DEFAULT_G, DEFAULT_DECAY_DELTA


def regularized_geodesic_distance(
    vec_a: np.ndarray,
    vec_b: np.ndarray,
    epsilon: float = DEFAULT_EPSILON,
) -> float:
    """
    Computes regularized geodesic distance on the unit hypersphere between two normalized vectors.

    r = sqrt(2 * (1 - cosine_sim)) + epsilon

    Parameters:
        vec_a: Normalized 1D numpy array.
        vec_b: Normalized 1D numpy array.
        epsilon: Softening factor.

    Returns:
        float: Strictly positive distance r >= epsilon.
    """
    # Cosine similarity between unit vectors is dot product
    cos_sim = float(np.dot(vec_a, vec_b))
    cos_sim = max(-1.0, min(1.0, cos_sim))  # Numerical clamp

    chord_dist = math.sqrt(max(0.0, 2.0 * (1.0 - cos_sim)))
    return chord_dist + epsilon


def compute_relativistic_dampening(
    cost_per_m_tokens: float,
    latency_ms: float,
    lambda_cost: float = 0.0,
    lambda_latency: float = 0.0,
    cost_scale: float = 10.0,
    latency_scale: float = 1000.0,
) -> float:
    """
    Computes the relativistic dampening factor Omega based on operational constraints.

    Omega = exp(- lambda_cost * (cost / cost_scale) - lambda_lat * (latency / latency_scale))

    Parameters:
        cost_per_m_tokens: Model USD cost per 1M tokens.
        latency_ms: Average time-to-first-token in milliseconds.
        lambda_cost: User cost penalty sensitivity.
        lambda_latency: User latency penalty sensitivity.
        cost_scale: Normalization scale for cost.
        latency_scale: Normalization scale for latency.

    Returns:
        float: Multiplier in range (0.0, 1.0].
    """
    if lambda_cost <= 0.0 and lambda_latency <= 0.0:
        return 1.0

    normalized_cost = max(0.0, cost_per_m_tokens) / max(0.01, cost_scale)
    normalized_latency = max(0.0, latency_ms) / max(1.0, latency_scale)

    penalty = (lambda_cost * normalized_cost) + (lambda_latency * normalized_latency)
    return math.exp(-penalty)


def compute_gravitational_force(
    model_mass: float,
    prompt_mass: float,
    distance: float,
    gravitational_constant: float = DEFAULT_G,
    decay_exponent: float = DEFAULT_DECAY_DELTA,
    dampening_factor: float = 1.0,
) -> float:
    """
    Computes net scalar gravitational pull:

    F = G * (M_model * m_prompt) / (r ^ delta) * Omega
    """
    safe_dist = max(1e-5, distance)
    force = (
        gravitational_constant
        * (model_mass * prompt_mass)
        / (safe_dist ** decay_exponent)
    ) * dampening_factor

    return float(force)
