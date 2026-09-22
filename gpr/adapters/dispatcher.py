"""
Dispatcher interface for executing prompts against routed model singularities.
"""

from dataclasses import dataclass
from typing import Any, Callable, Dict, Optional
from gpr.models.singularity import LLMSingularity


@dataclass
class DispatchResult:
    """Outcome of a routed prompt execution."""
    singularity_id: str
    singularity_name: str
    prompt: str
    response: str
    latency_ms: float
    token_usage: Dict[str, int]
    is_lagrange_coprocessed: bool = False
    secondary_singularity_id: Optional[str] = None


class ModelDispatcher:
    """
    Manages client execution for routed models.
    Supports mock simulated responses, custom callbacks, and endpoint hooks.
    """

    def __init__(self):
        self._handlers: Dict[str, Callable[[str], str]] = {}

    def register_handler(self, singularity_id: str, handler: Callable[[str], str]) -> None:
        """Register a custom execution function for a specific singularity ID."""
        self._handlers[singularity_id] = handler

    def dispatch(
        self,
        singularity: LLMSingularity,
        prompt: str,
        secondary_singularity: Optional[LLMSingularity] = None,
        is_lagrange: bool = False,
    ) -> DispatchResult:
        """
        Executes prompt on the designated model singularity.
        """
        handler = self._handlers.get(singularity.id)

        if handler:
            response = handler(prompt)
        else:
            # Deterministic simulated response reflecting the singularity's persona
            if is_lagrange and secondary_singularity:
                response = (
                    f"[{singularity.name} x {secondary_singularity.name} Co-Synthesis]\n"
                    f"Harmonized response across primary well ({singularity.name}) "
                    f"and secondary well ({secondary_singularity.name}) for prompt: '{prompt[:50]}...'"
                )
            else:
                response = (
                    f"[{singularity.name} Response]\n"
                    f"Processed prompt with mass-attracted expertise in {singularity.domain_description}.\n"
                    f"Received prompt: '{prompt}'"
                )

        return DispatchResult(
            singularity_id=singularity.id,
            singularity_name=singularity.name,
            prompt=prompt,
            response=response,
            latency_ms=singularity.median_latency_ms,
            token_usage={
                "prompt_tokens": len(prompt.split()),
                "completion_tokens": len(response.split()),
            },
            is_lagrange_coprocessed=is_lagrange,
            secondary_singularity_id=secondary_singularity.id if secondary_singularity else None,
        )
