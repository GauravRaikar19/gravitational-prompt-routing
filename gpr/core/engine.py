"""
Core GravitationalRouter engine implementing Cognitive Topography Mapping.
"""

from dataclasses import dataclass, field
import time
from typing import Dict, List, Optional, Tuple
import numpy as np

from gpr.core.constants import (
    DEFAULT_G,
    DEFAULT_EPSILON,
    DEFAULT_DECAY_DELTA,
    DEFAULT_LAGRANGE_THRESHOLD,
)
from gpr.core.topography import (
    regularized_geodesic_distance,
    compute_relativistic_dampening,
    compute_gravitational_force,
)
from gpr.models.singularity import LLMSingularity
from gpr.models.prompt import PromptMass
from gpr.adapters.embedder import BaseEmbedder, get_default_embedder
from gpr.adapters.dispatcher import ModelDispatcher, DispatchResult


@dataclass
class SingularityAttraction:
    """Detailed gravitational metrics for an individual model singularity."""
    singularity_id: str
    singularity_name: str
    model_mass: float
    geodesic_distance: float
    relativistic_dampening: float
    gravitational_force: float
    normalized_gravity_share: float


@dataclass
class RoutingDecision:
    """Full architectural decision output for an orchestrated prompt."""
    prompt_text: str
    prompt_mass: float
    selected_singularity: LLMSingularity
    primary_force: float
    attraction_scores: List[SingularityAttraction]
    is_lagrangian_resonance: bool
    lagrangian_margin: float
    secondary_singularity: Optional[LLMSingularity] = None
    computation_time_ms: float = 0.0

    @property
    def dominant_id(self) -> str:
        return self.selected_singularity.id


class GravitationalRouter:
    """
    Main orchestration engine modeling LLM routing as continuous gravitational physics.
    """

    def __init__(
        self,
        embedder: Optional[BaseEmbedder] = None,
        gravitational_constant: float = DEFAULT_G,
        softening_epsilon: float = DEFAULT_EPSILON,
        decay_exponent: float = DEFAULT_DECAY_DELTA,
        lagrange_threshold: float = DEFAULT_LAGRANGE_THRESHOLD,
        lambda_cost: float = 0.0,
        lambda_latency: float = 0.0,
    ):
        self.embedder = embedder or get_default_embedder()
        self.G = gravitational_constant
        self.epsilon = softening_epsilon
        self.delta = decay_exponent
        self.lagrange_threshold = lagrange_threshold
        self.lambda_cost = lambda_cost
        self.lambda_latency = lambda_latency

        self.singularities: Dict[str, LLMSingularity] = {}
        self.dispatcher = ModelDispatcher()

    def register_singularity(
        self,
        singularity: LLMSingularity,
        calibrate_exemplars: bool = True,
    ) -> "GravitationalRouter":
        """
        Adds a model singularity to the cognitive topography.
        If centroid is missing, computes centroid from domain description and exemplars.
        """
        if singularity.centroid is None or calibrate_exemplars:
            texts = [singularity.domain_description] + singularity.domain_exemplars
            vectors = self.embedder.embed_batch(texts)
            # Compute centroid vector as normalized mean
            centroid = np.mean(vectors, axis=0)
            singularity.set_centroid(centroid)

        self.singularities[singularity.id] = singularity
        return self

    def route(self, prompt: str) -> RoutingDecision:
        """
        Calculates gravitational attraction vectors and routes prompt into the dominant well.
        """
        if not self.singularities:
            raise ValueError("No model singularities registered in cognitive topography.")

        t_start = time.perf_counter()

        # 1. Project prompt into semantic coordinates and calculate prompt inertia
        prompt_obj = PromptMass(text=prompt)
        prompt_vec = self.embedder.embed_text(prompt)
        prompt_obj.set_coordinates(prompt_vec)
        p_mass = prompt_obj.mass

        # 2. Compute gravitational attraction field for all singularities
        attraction_list: List[Tuple[LLMSingularity, SingularityAttraction]] = []

        for s in self.singularities.values():
            dist = regularized_geodesic_distance(
                prompt_obj.coordinates,
                s.centroid,
                epsilon=self.epsilon,
            )

            damp = compute_relativistic_dampening(
                cost_per_m_tokens=s.cost_per_m_tokens,
                latency_ms=s.median_latency_ms,
                lambda_cost=self.lambda_cost,
                lambda_latency=self.lambda_latency,
            )

            f_net = compute_gravitational_force(
                model_mass=s.mass,
                prompt_mass=p_mass,
                distance=dist,
                gravitational_constant=self.G,
                decay_exponent=self.delta,
                dampening_factor=damp,
            )

            attraction_list.append(
                (
                    s,
                    SingularityAttraction(
                        singularity_id=s.id,
                        singularity_name=s.name,
                        model_mass=s.mass,
                        geodesic_distance=dist,
                        relativistic_dampening=damp,
                        gravitational_force=f_net,
                        normalized_gravity_share=0.0,
                    ),
                )
            )

        # 3. Sort singularities by descending gravitational force
        attraction_list.sort(key=lambda item: item[1].gravitational_force, reverse=True)

        # Normalize gravitational force shares
        total_f = sum(item[1].gravitational_force for item in attraction_list)
        if total_f > 1e-9:
            for _, att in attraction_list:
                att.normalized_gravity_share = att.gravitational_force / total_f

        primary_model, primary_att = attraction_list[0]
        secondary_model, secondary_att = (
            attraction_list[1] if len(attraction_list) > 1 else (None, None)
        )

        # 4. Check for Lagrangian equilibrium / resonance
        is_lagrange = False
        margin = 1.0

        if secondary_att and primary_att.gravitational_force > 1e-9:
            margin = (
                primary_att.gravitational_force - secondary_att.gravitational_force
            ) / primary_att.gravitational_force

            if margin < self.lagrange_threshold:
                is_lagrange = True

        t_elapsed = (time.perf_counter() - t_start) * 1000.0

        return RoutingDecision(
            prompt_text=prompt,
            prompt_mass=p_mass,
            selected_singularity=primary_model,
            primary_force=primary_att.gravitational_force,
            attraction_scores=[att for _, att in attraction_list],
            is_lagrangian_resonance=is_lagrange,
            lagrangian_margin=margin,
            secondary_singularity=secondary_model if is_lagrange else None,
            computation_time_ms=round(t_elapsed, 3),
        )

    def dispatch(self, prompt: str) -> DispatchResult:
        """
        Routes the prompt and automatically executes it against the captured model singularity.
        """
        decision = self.route(prompt)
        return self.dispatcher.dispatch(
            singularity=decision.selected_singularity,
            prompt=prompt,
            secondary_singularity=decision.secondary_singularity,
            is_lagrange=decision.is_lagrangian_resonance,
        )
