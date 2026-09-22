"""
Embedder abstractions and default deterministic vectorizer for Cognitive Topography Mapping.
"""

from abc import ABC, abstractmethod
import hashlib
import numpy as np


class BaseEmbedder(ABC):
    """Abstract base class for semantic space embedding providers."""

    @abstractmethod
    def embed_text(self, text: str) -> np.ndarray:
        """Embeds single text string into a normalized 1D numpy array."""
        pass

    def embed_batch(self, texts: list) -> np.ndarray:
        """Embeds a list of texts into a 2D numpy array [N, D]."""
        return np.array([self.embed_text(t) for t in texts])


class DeterministicEmbedder(BaseEmbedder):
    """
    Lightweight, deterministic feature hashing embedder.
    Runs anywhere with zero external network downloads or heavy weights.
    Maps words, character n-grams, and structural tokens onto an orthogonalized unit sphere.
    """

    STOPWORDS = {
        "the", "a", "an", "is", "in", "it", "of", "and", "or", "to", "for", "with",
        "on", "at", "by", "from", "as", "this", "that", "are", "was", "were", "be",
        "been", "being", "have", "has", "had", "do", "does", "did", "who", "which",
    }

    def __init__(self, dimension: int = 128, seed: int = 42):
        self.dimension = dimension
        self.seed = seed

    def embed_text(self, text: str) -> np.ndarray:
        """
        Embeds text into a unit vector in R^dimension using seeded multi-hash projection with salience weighting.
        """
        if not text:
            vec = np.zeros(self.dimension, dtype=np.float32)
            vec[0] = 1.0
            return vec

        vec = np.zeros(self.dimension, dtype=np.float32)
        import re
        tokens = re.findall(r"[a-zA-Z0-9_\-\+\*\#]+", text.lower())

        # 1. Salience-weighted word tokens
        for token in tokens:
            weight = 0.1 if token in self.STOPWORDS else min(3.0, 1.0 + 0.3 * len(token))
            h = int(hashlib.md5(f"{self.seed}:{token}".encode("utf-8")).hexdigest(), 16)
            idx = h % self.dimension
            sign = 1.0 if ((h >> 8) & 1) else -1.0
            vec[idx] += weight * sign

            # Subword 3-grams for non-stopwords
            if token not in self.STOPWORDS and len(token) >= 3:
                for i in range(len(token) - 2):
                    trigram = token[i : i + 3]
                    h_tri = int(hashlib.sha256(f"{self.seed}:tri:{trigram}".encode("utf-8")).hexdigest(), 16)
                    idx_tri = h_tri % self.dimension
                    sign_tri = 1.0 if ((h_tri >> 8) & 1) else -1.0
                    vec[idx_tri] += 0.5 * sign_tri

        # Unit normalization
        norm = np.linalg.norm(vec)
        if norm > 1e-9:
            return vec / norm
        else:
            vec[0] = 1.0
            return vec


class SentenceTransformerEmbedder(BaseEmbedder):
    """
    Adapter for HuggingFace sentence-transformers (optional).
    """

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        try:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer(model_name)
        except ImportError:
            raise ImportError(
                "sentence-transformers is not installed. Install with 'pip install sentence-transformers' "
                "or use DeterministicEmbedder for zero-dependency operation."
            )

    def embed_text(self, text: str) -> np.ndarray:
        emb = self.model.encode(text, normalize_embeddings=True)
        return np.array(emb, dtype=np.float32)


def get_default_embedder(prefer_ml: bool = False, dimension: int = 128) -> BaseEmbedder:
    """
    Factory function returning the best available embedder.
    Falls back gracefully to DeterministicEmbedder.
    """
    if prefer_ml:
        try:
            return SentenceTransformerEmbedder()
        except ImportError:
            pass
    return DeterministicEmbedder(dimension=dimension)
