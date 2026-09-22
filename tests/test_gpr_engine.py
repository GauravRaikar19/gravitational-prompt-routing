"""
Unit test suite for Gravitational Prompt Routing (GPR) and Cognitive Topography Mapping.
"""

import unittest
import numpy as np

from gpr.core.mass import calculate_model_semantic_mass, calculate_prompt_inertia
from gpr.core.topography import (
    regularized_geodesic_distance,
    compute_relativistic_dampening,
    compute_gravitational_force,
)
from gpr.models.singularity import LLMSingularity
from gpr.models.prompt import PromptMass
from gpr.adapters.embedder import DeterministicEmbedder
from gpr.core.engine import GravitationalRouter


class TestGPREngine(unittest.TestCase):

    def setUp(self):
        self.embedder = DeterministicEmbedder(dimension=128, seed=42)

    def test_semantic_mass_scaling(self):
        """Test that higher parameter models and higher benchmarks yield strictly greater mass."""
        mass_small = calculate_model_semantic_mass(
            parameters_b=7.0,
            benchmark_scores={"eval": 0.60},
            context_window_k=32.0,
        )
        mass_large = calculate_model_semantic_mass(
            parameters_b=70.0,
            benchmark_scores={"eval": 0.90},
            context_window_k=128.0,
        )
        self.assertGreater(mass_large, mass_small)
        self.assertGreater(mass_small, 0.0)

    def test_prompt_inertia_entropy(self):
        """Test that complex prompts carry greater informational mass."""
        simple_prompt = "hello"
        complex_prompt = "Write a comprehensive distributed consensus raft algorithm with Byzantine fault tolerance."
        m_simple = calculate_prompt_inertia(simple_prompt)
        m_complex = calculate_prompt_inertia(complex_prompt)
        self.assertGreater(m_complex, m_simple)

    def test_geodesic_distance_softening(self):
        """Test that regularized distance is strictly >= epsilon and identical vectors yield epsilon."""
        vec = np.array([1.0, 0.0, 0.0], dtype=np.float32)
        dist_same = regularized_geodesic_distance(vec, vec, epsilon=0.05)
        self.assertAlmostEqual(dist_same, 0.05, places=4)

        vec_opposite = np.array([-1.0, 0.0, 0.0], dtype=np.float32)
        dist_opp = regularized_geodesic_distance(vec, vec_opposite, epsilon=0.05)
        self.assertAlmostEqual(dist_opp, 2.0 + 0.05, places=4)

    def test_deterministic_router_execution(self):
        """Test end-to-end routing into designated domain wells."""
        router = GravitationalRouter(embedder=self.embedder)

        code_s = LLMSingularity(
            id="code-model",
            name="CodeModel",
            domain_description="Programming, software development, Python algorithms, syntax",
            parameters_b=30.0,
            domain_exemplars=["def binary_search", "class Node"],
        )
        creative_s = LLMSingularity(
            id="creative-model",
            name="CreativeModel",
            domain_description="Poetry, fiction, literature, storytelling, romantic prose",
            parameters_b=30.0,
            domain_exemplars=["Once upon a time in a misty forest", "rhyme and stanzas"],
        )

        router.register_singularity(code_s)
        router.register_singularity(creative_s)

        code_prompt = "Write a Python function to implement quicksort algorithm"
        decision_code = router.route(code_prompt)
        self.assertEqual(decision_code.dominant_id, "code-model")

        creative_prompt = "Write a romantic lyrical poem about moonlight on the lake"
        decision_creative = router.route(creative_prompt)
        self.assertEqual(decision_creative.dominant_id, "creative-model")

    def test_dispatcher_execution(self):
        """Test dispatcher triggers handler or fallback output."""
        router = GravitationalRouter(embedder=self.embedder)
        model = LLMSingularity(
            id="test-node",
            name="TestNode",
            domain_description="General queries",
            parameters_b=10.0,
        )
        router.register_singularity(model)

        result = router.dispatch("Hello test query")
        self.assertEqual(result.singularity_id, "test-node")
        self.assertIn("TestNode", result.response)


if __name__ == "__main__":
    unittest.main()
