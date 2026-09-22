"""
PromptMass model representing an incoming prompt as a point mass in semantic space.
"""

from dataclasses import dataclass, field
from typing import Optional
import numpy as np
from gpr.core.mass import calculate_prompt_inertia


@dataclass
class PromptMass:
    """
    Represents an incoming prompt as a point mass traversing cognitive topography.
    """
    text: str
    coordinates: Optional[np.ndarray] = None
    _mass: Optional[float] = None
    token_count_approx: Optional[int] = None

    @property
    def mass(self) -> float:
        """Returns the dynamic prompt mass (inertia)."""
        if self._mass is None:
            self._mass = calculate_prompt_inertia(
                text=self.text,
                token_count_approx=self.token_count_approx,
            )
        return self._mass

    def set_coordinates(self, vector: np.ndarray) -> None:
        """Sets and normalizes prompt coordinates."""
        norm = np.linalg.norm(vector)
        if norm > 1e-9:
            self.coordinates = vector / norm
        else:
            self.coordinates = vector.copy()

    def __repr__(self) -> str:
        snippet = (self.text[:40] + "...") if len(self.text) > 40 else self.text
        return f"<PromptMass text='{snippet}' mass={self.mass:.3f}>"
