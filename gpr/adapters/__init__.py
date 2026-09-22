"""
Adapters for embedding generation and downstream model dispatching.
"""

from gpr.adapters.embedder import BaseEmbedder, DeterministicEmbedder, get_default_embedder
from gpr.adapters.dispatcher import ModelDispatcher, DispatchResult

__all__ = [
    "BaseEmbedder",
    "DeterministicEmbedder",
    "get_default_embedder",
    "ModelDispatcher",
    "DispatchResult",
]
