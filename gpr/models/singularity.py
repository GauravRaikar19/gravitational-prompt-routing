"""
LLMSingularity model representing an orchestrated model node in cognitive topography.
"""

from dataclasses import dataclass, field
from typing import Dict, List, Optional
import numpy as np
from gpr.core.mass import calculate_model_semantic_mass


@dataclass
class LLMSingularity:
    """
    Represents an LLM as a Gravitational Singularity in semantic latent space.
    """
    id: str
    name: str
    domain_description: str
    parameters_b: float
    benchmark_scores: Dict[str, float] = field(default_factory=dict)
    context_window_k: float = 128.0
    cost_per_m_tokens: float = 0.50
    median_latency_ms: float = 250.0
    
    # Semantic centroid coordinates (normalized unit vector in R^D)
    centroid: Optional[np.ndarray] = None
    
    # Precomputed mass or dynamically computed
    _mass: Optional[float] = None
    
    # Exemplar domain queries used to initialize or calibrate centroid
    domain_exemplars: List[str] = field(default_factory=list)

    @property
    def mass(self) -> float:
        """Returns the semantic mass of this singularity."""
        if self._mass is None:
            self._mass = calculate_model_semantic_mass(
                parameters_b=self.parameters_b,
                benchmark_scores=self.benchmark_scores,
                context_window_k=self.context_window_k,
            )
        return self._mass

    def set_mass(self, custom_mass: float) -> None:
        """Explicitly override model semantic mass."""
        self._mass = float(custom_mass)

    def set_centroid(self, vector: np.ndarray) -> None:
        """Sets and normalizes the domain centroid vector."""
        norm = np.linalg.norm(vector)
        if norm > 1e-9:
            self.centroid = vector / norm
        else:
            self.centroid = vector.copy()

    def __repr__(self) -> str:
        return (
            f"<LLMSingularity id='{self.id}' name='{self.name}' "
            f"mass={self.mass:.2f} params={self.parameters_b}B>"
        )
