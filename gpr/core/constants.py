"""
Universal constants and cosmological parameters for Gravitational Prompt Routing.
"""

# Universal Semantic Gravitational Constant
DEFAULT_G: float = 1.0

# Planck Softening Radius (prevents division by zero at singularity center)
DEFAULT_EPSILON: float = 0.05

# Spatial Decay Exponent (2.0 = standard Newtonian inverse-square decay)
DEFAULT_DECAY_DELTA: float = 2.0

# Default threshold for Lagrangian equilibrium (below which co-processing is triggered)
DEFAULT_LAGRANGE_THRESHOLD: float = 0.15

# Mass weighting factors (sum to 1.0)
DEFAULT_OMEGA_PARAM: float = 0.40      # Model parameter scale weight
DEFAULT_OMEGA_BENCHMARK: float = 0.40  # Benchmark capability weight
DEFAULT_OMEGA_CONTEXT: float = 0.20    # Context capacity weight
