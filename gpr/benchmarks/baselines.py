"""
Comparative routing baselines for evaluation benchmarks.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
import re
import time
from typing import Dict, List, Optional
import numpy as np

from gpr.core.engine import GravitationalRouter
from gpr.models.presets import get_default_singularities, get_cheapest_singularity
from gpr.adapters.embedder import BaseEmbedder, get_default_embedder


@dataclass
class BaselineDecision:
    """Standardized decision outcome for any router."""
    selected_model_id: str
    decision_time_ms: float
    confidence: float = 1.0
    router_name: str = ""


class AbstractRouter(ABC):
    """Abstract interface for benchmark routers."""

    name: str = "AbstractRouter"

    @abstractmethod
    def route(self, prompt: str) -> BaselineDecision:
        """Determines target model for given prompt."""
        pass


class GPRRouterWrapper(AbstractRouter):
    """Gravitational Prompt Routing (GPR) engine wrapper."""

    name = "Gravitational Prompt Router (GPR)"

    def __init__(self, embedder: Optional[BaseEmbedder] = None):
        self.embedder = embedder or get_default_embedder()
        self.router = GravitationalRouter(embedder=self.embedder)
        for s in get_default_singularities():
            self.router.register_singularity(s)

    def route(self, prompt: str) -> BaselineDecision:
        t0 = time.perf_counter()
        decision = self.router.route(prompt)
        dt_ms = (time.perf_counter() - t0) * 1000.0
        return BaselineDecision(
            selected_model_id=decision.dominant_id,
            decision_time_ms=dt_ms,
            confidence=decision.primary_force,
            router_name=self.name,
        )


class CosineCentroidRouter(AbstractRouter):
    """
    Cosine-Only Nearest Centroid Router.
    Calculates cosine similarity to domain centroids, completely ignoring semantic mass,
    parameter size, benchmark capability, and relativistic dampening.
    """

    name = "Cosine Centroid (Unweighted)"

    def __init__(self, embedder: Optional[BaseEmbedder] = None):
        self.embedder = embedder or get_default_embedder()
        self.singularities = get_default_singularities()
        self.centroids: Dict[str, np.ndarray] = {}

        for s in self.singularities:
            texts = [s.domain_description] + s.domain_exemplars
            vecs = self.embedder.embed_batch(texts)
            centroid = np.mean(vecs, axis=0)
            norm = np.linalg.norm(centroid)
            self.centroids[s.id] = centroid / (norm + 1e-9)

    def route(self, prompt: str) -> BaselineDecision:
        t0 = time.perf_counter()
        prompt_vec = self.embedder.embed_text(prompt)

        best_id = None
        best_sim = -float("inf")

        for model_id, centroid in self.centroids.items():
            sim = float(np.dot(prompt_vec, centroid))
            if sim > best_sim:
                best_sim = sim
                best_id = model_id

        dt_ms = (time.perf_counter() - t0) * 1000.0
        return BaselineDecision(
            selected_model_id=best_id or "llama-3.3-70b-instruct",
            decision_time_ms=dt_ms,
            confidence=best_sim,
            router_name=self.name,
        )


class KeywordHeuristicRouter(AbstractRouter):
    """
    Static Rule-Based Keyword Router.
    Uses regex patterns and domain lexicons to match target domains.
    Defaults to General Knowledge if no specific pattern is matched.
    """

    name = "Static Keyword / Rule Heuristic"

    MATH_REGEX = re.compile(
        r"\b(derivative|integral|solve|equation|hypotenuse|radius|induction|eigenvalue|determinant|proof|theorem|probability|pi|navier|riemann|hamiltonian|christoffel|percent|sqrt|square root|\d+\s*[\+\-\*\/\^]\s*\d+)\b",
        re.IGNORECASE
    )

    CODE_REGEX = re.compile(
        r"\b(code|python|rust|c\+\+|javascript|typescript|function|class|algorithm|sql|postgres|docker|kubernetes|git|regex|async|await|event loop|heap|binary search|quicksort|lru|cache|css|flexbox|div)\b",
        re.IGNORECASE
    )

    CREATIVE_REGEX = re.compile(
        r"\b(poem|poetry|song|lyrics|ballad|lullaby|sonnet|haiku|story|tales|dialogue|monologue|soliloquy|melanchol|atmospheric|verse|rhyme|screenplay|fiction)\b",
        re.IGNORECASE
    )

    def route(self, prompt: str) -> BaselineDecision:
        t0 = time.perf_counter()
        p = prompt.strip().lower()

        # Check domain pattern priority
        if self.MATH_REGEX.search(p):
            selected = "deepseek-r1-671b"
        elif self.CODE_REGEX.search(p):
            selected = "qwen-2.5-coder-32b"
        elif self.CREATIVE_REGEX.search(p):
            selected = "hermes-3-70b"
        else:
            selected = "llama-3.3-70b-instruct"

        dt_ms = (time.perf_counter() - t0) * 1000.0
        return BaselineDecision(
            selected_model_id=selected,
            decision_time_ms=dt_ms,
            confidence=1.0,
            router_name=self.name,
        )


class MonolithicFrontierRouter(AbstractRouter):
    """
    Monolithic Frontier Router (All-to-Flagship).
    Routes 100% of prompts to the largest, most expensive flagship model (DeepSeek-R1-671B).
    Provides upper-bound capability at maximum financial and latency cost.
    """

    name = "Monolithic Frontier (All-to-671B)"

    def route(self, prompt: str) -> BaselineDecision:
        t0 = time.perf_counter()
        # Minimal constant time dispatch
        selected = "deepseek-r1-671b"
        dt_ms = (time.perf_counter() - t0) * 1000.0
        return BaselineDecision(
            selected_model_id=selected,
            decision_time_ms=dt_ms,
            confidence=1.0,
            router_name=self.name,
        )


class AlwaysCheapestRouter(AbstractRouter):
    """
    Always Cheapest Router (All-to-8B).
    Routes 100% of prompts to the lowest cost lightweight model (Llama-3.1-8B-Instant).
    Provides absolute minimum cost baseline at degraded complex reasoning capability.
    """

    name = "Always Cheapest (All-to-8B)"

    def route(self, prompt: str) -> BaselineDecision:
        t0 = time.perf_counter()
        selected = "llama-3.1-8b-instant"
        dt_ms = (time.perf_counter() - t0) * 1000.0
        return BaselineDecision(
            selected_model_id=selected,
            decision_time_ms=dt_ms,
            confidence=1.0,
            router_name=self.name,
        )


def get_all_benchmark_routers(embedder: Optional[BaseEmbedder] = None) -> List[AbstractRouter]:
    """Instantiates and returns the full suite of evaluated routers."""
    emb = embedder or get_default_embedder()
    return [
        GPRRouterWrapper(embedder=emb),
        CosineCentroidRouter(embedder=emb),
        KeywordHeuristicRouter(),
        MonolithicFrontierRouter(),
        AlwaysCheapestRouter(),
    ]
