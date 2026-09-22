"""
Gravitational Prompt Routing (GPR) via Cognitive Topography Mapping (CTM)
-------------------------------------------------------------------------
Continuous field-theoretic orchestration for Large Language Models.
"""

from gpr.core.engine import GravitationalRouter, RoutingDecision
from gpr.models.singularity import LLMSingularity
from gpr.models.prompt import PromptMass
from gpr.adapters.embedder import DeterministicEmbedder, BaseEmbedder

__version__ = "0.1.0"
__all__ = [
    "GravitationalRouter",
    "RoutingDecision",
    "LLMSingularity",
    "PromptMass",
    "DeterministicEmbedder",
    "BaseEmbedder",
]
