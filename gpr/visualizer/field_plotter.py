"""
ASCII Gravitational Potential Field and Routing Trajectory Visualizer.
"""

from typing import List
from gpr.core.engine import RoutingDecision


def render_routing_ascii(decision: RoutingDecision, bar_width: int = 35) -> str:
    """
    Renders an ASCII visualization of gravitational pull vectors and well capture.
    """
    lines: List[str] = []
    lines.append("=" * 80)
    snippet = decision.prompt_text.strip().replace("\n", " ")
    if len(snippet) > 70:
        snippet = snippet[:67] + "..."
    lines.append(f"[GPR ORCHESTRATION EVENT]")
    lines.append(f"Prompt (m_p={decision.prompt_mass:.3f}) : \"{snippet}\"")
    lines.append("-" * 80)
    lines.append("Singularity Gravitational Field Distribution:")

    max_force = max((att.gravitational_force for att in decision.attraction_scores), default=1.0)

    for i, att in enumerate(decision.attraction_scores):
        is_dominant = (att.singularity_id == decision.selected_singularity.id)
        is_secondary = (
            decision.secondary_singularity
            and att.singularity_id == decision.secondary_singularity.id
        )

        marker = "[*]" if is_dominant else ("[~]" if is_secondary else "[ ]")
        ratio = att.gravitational_force / max(1e-6, max_force)
        fill_len = int(ratio * bar_width)
        bar = "#" * fill_len + " " * (bar_width - fill_len)

        status = " (DOMINANT WELL)" if is_dominant else ""
        if is_secondary and decision.is_lagrangian_resonance:
            status = " (LAGRANGE RESONANCE)"

        lines.append(
            f" {marker} {att.singularity_name:<22} |{bar}| "
            f"F={att.gravitational_force:>7.2f} (r={att.geodesic_distance:.2f}, share={att.normalized_gravity_share*100:>5.1f}%){status}"
        )

    lines.append("-" * 80)
    lines.append(f"Captured Singularity : {decision.selected_singularity.name} (id: {decision.selected_singularity.id})")
    
    if decision.is_lagrangian_resonance and decision.secondary_singularity:
        lines.append(
            f"Equilibrium Status   : LAGRANGIAN RESONANCE DETECTED (Margin: {decision.lagrangian_margin*100:.1f}%)"
        )
        lines.append(
            f"Co-Processing Route  : Orbit shared with secondary well: {decision.secondary_singularity.name}"
        )
    else:
        lines.append(
            f"Equilibrium Status   : STABLE BASIN CAPTURE (Lagrangian Margin: {decision.lagrangian_margin*100:.1f}%)"
        )

    lines.append(f"Tensor Computation   : {decision.computation_time_ms:.2f} ms")
    lines.append("=" * 80)
    return "\n".join(lines)


def render_topography_2d(decision: RoutingDecision, grid_size: int = 15) -> str:
    """
    Renders an ASCII 2D spatial grid showing the prompt's position relative to model singularities.
    Uses simulated projection onto the top 2 principal dimensions.
    """
    canvas = [["." for _ in range(grid_size)] for _ in range(grid_size)]

    # Center represents the prompt
    mid = grid_size // 2
    canvas[mid][mid] = "★"  # Prompt point mass

    # Plot singularities around center based on geodesic distance
    chars = ["A", "B", "C", "D", "E"]
    legend: List[str] = [f"★ = Incoming Prompt (m_p={decision.prompt_mass:.2f})"]

    for idx, att in enumerate(decision.attraction_scores[:5]):
        char = chars[idx]
        # Map distance r in [0, 2] to radius from center
        dist = att.geodesic_distance
        radius = min(mid - 1, max(1, int((dist / 2.0) * mid)))

        # Assign directional angles for up to 4 models
        angle_offsets = [0, 3.14159, 1.57079, 4.71238, 0.785]
        import math
        angle = angle_offsets[idx % len(angle_offsets)]
        x = mid + int(radius * math.cos(angle))
        y = mid + int(radius * math.sin(angle))
        x = max(0, min(grid_size - 1, x))
        y = max(0, min(grid_size - 1, y))

        canvas[y][x] = char
        legend.append(f"{char} = {att.singularity_name} (dist={dist:.2f}, F={att.gravitational_force:.1f})")

    grid_str = "\n".join(" ".join(row) for row in canvas)
    legend_str = "\n".join(f"  {item}" for item in legend)
    return f"Cognitive Topography 2D Manifold Slice:\n{grid_str}\n\nLegend:\n{legend_str}"
