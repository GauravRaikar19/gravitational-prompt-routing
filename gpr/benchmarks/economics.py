"""
Token economics and cost modeling for LLM routing evaluation.
"""

from dataclasses import dataclass
from typing import Dict, Optional


@dataclass
class ModelPricing:
    """Pricing configuration in USD per 1 Million tokens."""
    model_id: str
    name: str
    input_cost_per_m: float
    output_cost_per_m: float

    @property
    def blended_cost_per_m(self) -> float:
        """Standard 1:2 input-to-output blended cost estimate."""
        return (self.input_cost_per_m + 2.0 * self.output_cost_per_m) / 3.0


DEFAULT_PRICING_TABLE: Dict[str, ModelPricing] = {
    "deepseek-r1-671b": ModelPricing(
        model_id="deepseek-r1-671b",
        name="DeepSeek-R1-671B",
        input_cost_per_m=0.55,
        output_cost_per_m=2.19,
    ),
    "llama-3.3-70b-instruct": ModelPricing(
        model_id="llama-3.3-70b-instruct",
        name="Llama-3.3-70B-Instruct",
        input_cost_per_m=0.50,
        output_cost_per_m=0.80,
    ),
    "hermes-3-70b": ModelPricing(
        model_id="hermes-3-70b",
        name="Hermes-3-70B",
        input_cost_per_m=0.40,
        output_cost_per_m=0.60,
    ),
    "qwen-2.5-coder-32b": ModelPricing(
        model_id="qwen-2.5-coder-32b",
        name="Qwen-2.5-Coder-32B",
        input_cost_per_m=0.20,
        output_cost_per_m=0.20,
    ),
    "llama-3.1-8b-instant": ModelPricing(
        model_id="llama-3.1-8b-instant",
        name="Llama-3.1-8B-Instant",
        input_cost_per_m=0.05,
        output_cost_per_m=0.08,
    ),
}


class TokenCostEstimator:
    """
    Simulates token usage and expenditure per query.
    Uses word-level heuristics (~1.33 tokens per word) and domain-specific completion estimates.
    """

    # Estimated average completion tokens per domain
    DOMAIN_COMPLETION_TOKENS = {
        "math": 350,       # Step-by-step mathematical reasoning
        "code": 280,       # Code snippet with syntax & explanation
        "creative": 250,   # Poem, dialogue, or story passage
        "knowledge": 80,   # Direct concise factual answers
        "default": 150,
    }

    def __init__(self, pricing_table: Optional[Dict[str, ModelPricing]] = None):
        self.pricing_table = pricing_table or DEFAULT_PRICING_TABLE

    def estimate_prompt_tokens(self, text: str) -> int:
        """Estimates prompt token count using standard 1.33 token-per-word heuristic."""
        words = len(text.strip().split())
        return max(4, int(words * 1.33))

    def estimate_completion_tokens(self, domain: str = "default") -> int:
        """Estimates generation tokens by domain complexity."""
        return self.DOMAIN_COMPLETION_TOKENS.get(domain, self.DOMAIN_COMPLETION_TOKENS["default"])

    def calculate_cost(
        self,
        model_id: str,
        prompt_text: str,
        domain: str = "default",
    ) -> float:
        """
        Calculates simulated query cost in USD:
        Cost = (prompt_tokens * input_rate + completion_tokens * output_rate) / 1,000,000
        """
        pricing = self.pricing_table.get(
            model_id,
            ModelPricing(model_id, model_id, 0.50, 0.50)
        )
        prompt_tokens = self.estimate_prompt_tokens(prompt_text)
        comp_tokens = self.estimate_completion_tokens(domain)

        cost = (prompt_tokens * pricing.input_cost_per_m + comp_tokens * pricing.output_cost_per_m) / 1_000_000.0
        return cost
