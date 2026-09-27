"""
BenchmarkReporter: Generates ANSI terminal summaries, JSON exports, and Markdown reports.
Adheres strictly to workspace mathematical formula and notation standards.
"""

from dataclasses import asdict
import json
import os
from typing import Dict, Any
from gpr.benchmarks.metrics import RouterBenchmarkResult


class BenchmarkReporter:
    """Formats and exports benchmark evaluation reports."""

    def __init__(self, results: Dict[str, RouterBenchmarkResult]):
        self.results = results

    def print_terminal_summary(self):
        """Prints a clean formatted ANSI comparison table in terminal."""
        cyan = "\033[96m"
        green = "\033[92m"
        yellow = "\033[93m"
        magenta = "\033[95m"
        bold = "\033[1m"
        reset = "\033[0m"

        print(f"\n{bold}{cyan}=" * 96 + reset)
        print(f"{bold}{cyan}[GPR] GRAVITATIONAL PROMPT ROUTING -- AUTOMATED BENCHMARK EVALUATION{reset}")
        print(f"{bold}{cyan}=" * 96 + reset)

        header = f"{'Router Architecture':<34} | {'Accuracy':<9} | {'Cost/1k Qs':<11} | {'Savings':<8} | {'Lat (ms)':<9} | {'QPS':<7}"
        print(f"{bold}{header}{reset}")
        print("-" * 96)

        for name, r in self.results.items():
            acc_str = f"{r.accuracy_percent:.1f}%"
            cost_str = f"${r.cost_per_1k_queries:.4f}"
            sav_str = f"{r.cost_savings_vs_monolithic_percent:.1f}%"
            lat_str = f"{r.mean_latency_ms:.2f} ms"
            qps_str = f"{r.throughput_qps:.0f}"

            if "Gravitational" in name:
                print(f"{bold}{green}{name:<34} | {acc_str:<9} | {cost_str:<11} | {sav_str:<8} | {lat_str:<9} | {qps_str:<7}{reset}")
            else:
                print(f"{name:<34} | {acc_str:<9} | {cost_str:<11} | {sav_str:<8} | {lat_str:<9} | {qps_str:<7}")

        print("-" * 96)

        # Highlight GPR per-domain precision & recall
        gpr_key = next((k for k in self.results if "Gravitational" in k), None)
        if gpr_key:
            gpr_res = self.results[gpr_key]
            print(f"\n{bold}{magenta}[*] GPR Per-Domain Performance Breakdown:{reset}")
            dom_header = f"{'Domain':<16} | {'Samples':<8} | {'Precision':<10} | {'Recall':<10} | {'F1-Score':<10}"
            print(dom_header)
            print("-" * 62)
            for dom, m in gpr_res.domain_breakdown.items():
                print(f"{dom.capitalize():<16} | {m.total_samples:<8} | {m.precision:.1f}%{'':<4} | {m.recall:.1f}%{'':<4} | {m.f1_score:.1f}%")

        print(f"{bold}{cyan}=" * 96 + reset + "\n")

    def export_json(self, filepath: str = "benchmark_results.json"):
        """Exports full benchmark results as machine-readable JSON."""
        abs_path = os.path.abspath(filepath)
        data: Dict[str, Any] = {}
        for name, res in self.results.items():
            data[name] = asdict(res)

        with open(abs_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"[OK] Exported JSON benchmark results: {abs_path}")

    def export_markdown(self, filepath: str = "BENCHMARK_RESULTS.md"):
        """
        Exports comprehensive Markdown report strictly satisfying AGENTS.md standards:
        - Clean visual ASCII formula boxes
        - Structured breakdown tables (variable, intuition, typical value, concrete example)
        - Step-by-step numerical examples
        """
        abs_path = os.path.abspath(filepath)
        md = []

        md.append("# Gravitational Prompt Routing (GPR) — Comprehensive Benchmark Report\n")
        md.append("> **Evaluation Category:** Routing Accuracy, Computational Latency, and Simulated Token Economics  ")
        md.append("> **Benchmark Dataset:** 1,000+ Multi-Domain Curated Questions (Math, Code, Creative, World Knowledge)  ")
        md.append("> **Ground Truth:** Frontier Singularity Specialization Manifold\n")
        md.append("---\n")

        md.append("## 1. Executive Summary\n")
        md.append("This report benchmarks **Gravitational Prompt Routing (GPR)** against industry baselines:\n")
        md.append("1. **Cosine-Centroid Router:** Direct unweighted cosine similarity (omits semantic mass and relativistic penalties).\n")
        md.append("2. **Static Keyword / Rule Heuristic Router:** Keyword regex matching fallback rules.\n")
        md.append("3. **Monolithic Frontier (All-to-671B):** Over-provisioned baseline directing 100% of queries to the largest model.\n")
        md.append("4. **Always Cheapest (All-to-8B):** Minimum cost baseline sending all queries to an 8B model.\n\n")

        # Table
        md.append("## 2. Comparative Benchmark Matrix\n\n")
        md.append("| Router Architecture | Accuracy (%) | Cost / 1k Queries ($) | Cost Savings vs Frontier (%) | Mean Latency (ms) | Throughput (QPS) |\n")
        md.append("| :--- | :---: | :---: | :---: | :---: | :---: |\n")

        for name, r in self.results.items():
            bold = "**" if "Gravitational" in name else ""
            md.append(
                f"| {bold}{name}{bold} | {bold}{r.accuracy_percent:.1f}%{bold} | "
                f"{bold}${r.cost_per_1k_queries:.4f}{bold} | {bold}{r.cost_savings_vs_monolithic_percent:.1f}%{bold} | "
                f"{bold}{r.mean_latency_ms:.2f} ms{bold} | {bold}{r.throughput_qps:.0f}{bold} |\n"
            )

        md.append("\n---\n")
        md.append("## 3. Mathematical Evaluation Formulations\n\n")

        # Formula 1: Gravitational Potential Force
        md.append("### 3.1 Gravitational Attraction Force Formula\n\n")
        md.append("```text\n")
        md.append("+-----------------------------------------------------------------------------------+\n")
        md.append("|                           GRAVITATIONAL ATTRACTION FORCE                          |\n")
        md.append("|                                                                                   |\n")
        md.append("|                                     Mass_i × m_p                                  |\n")
        md.append("|               Force_i  =  G  ×  --------------------  ×  Omega_i                  |\n")
        md.append("|                                 ( Distance_i + eps )^delta                        |\n")
        md.append("+-----------------------------------------------------------------------------------+\n")
        md.append("```\n\n")

        md.append("#### Variable Definitions & Intuition Table\n\n")
        md.append("| Variable | Intuition | Typical Range | Concrete Example |\n")
        md.append("| :--- | :--- | :---: | :--- |\n")
        md.append("| `Force_i` | Net gravitational pull exerted by Model `i` on prompt `p` | `[0.0, 100.0+]` | `14.82` (dominant pull) |\n")
        md.append("| `G` | Global gravitational routing constant | `1.0` | `1.0` |\n")
        md.append("| `Mass_i` | Intrinsic semantic capacity & benchmark mass of model | `[30.0, 80.0]` | `58.5` (Qwen-2.5-Coder-32B) |\n")
        md.append("| `m_p` | Prompt informational inertia based on tokens and entropy | `[1.0, 3.5]` | `1.42` (25 token query) |\n")
        md.append("| `Distance_i`| Topographical geodesic distance on semantic unit sphere | `[0.05, 2.05]` | `0.38` (close match in code space) |\n")
        md.append("| `eps` | Planck-like gravitational softening radius | `0.05 - 0.08` | `0.08` |\n")
        md.append("| `delta` | Topographical potential decay exponent | `2.0 - 3.0` | `3.0` |\n")
        md.append("| `Omega_i` | Relativistic dampening operator factoring cost & latency | `(0.0, 1.0]` | `0.92` |\n\n")

        # Step by Step Calculation
        md.append("#### Step-by-Step Numerical Example\n")
        md.append("Consider a prompt `p` with code syntax routed against `Qwen-2.5-Coder-32B`:\n")
        md.append("1. **Model Mass (`Mass_i`):** `58.5`\n")
        md.append("2. **Prompt Mass (`m_p`):** `1.20`\n")
        md.append("3. **Geodesic Distance (`Distance_i`):** `0.32`\n")
        md.append("4. **Effective Radius:** `r_eff = Distance_i + eps = 0.32 + 0.08 = 0.40`\n")
        md.append("5. **Decay Factor:** `r_eff^3 = 0.40^3 = 0.064`\n")
        md.append("6. **Relativistic Dampening (`Omega_i`):** `0.95`\n")
        md.append("7. **Calculation:** `Force = 1.0 × (58.5 × 1.20 / 0.064) × 0.95 = (70.2 / 0.064) × 0.95 = 1096.8 × 0.95 = 1042.0`\n\n")

        # Formula 2: Cost Savings
        md.append("### 3.2 Routing Cost Reduction Efficiency\n\n")
        md.append("```text\n")
        md.append("+-----------------------------------------------------------------------------------+\n")
        md.append("|                             COST SAVINGS EFFICIENCY                               |\n")
        md.append("|                                                                                   |\n")
        md.append("|                                Cost_Monolithic - Cost_Router                      |\n")
        md.append("|             Savings_Rate  =  ---------------------------------  ×  100%           |\n")
        md.append("|                                      Cost_Monolithic                              |\n")
        md.append("+-----------------------------------------------------------------------------------+\n")
        md.append("```\n\n")

        md.append("| Variable | Intuition | Typical Range | Concrete Example |\n")
        md.append("| :--- | :--- | :---: | :--- |\n")
        md.append("| `Savings_Rate` | Financial expenditure percentage saved | `0.0% - 90.0%` | `61.4%` savings |\n")
        md.append("| `Cost_Monolithic` | Total dollar cost if all queries went to frontier 671B model | `> $0.00` | `$0.3850` per 1k |\n")
        md.append("| `Cost_Router` | Total dollar cost achieved by dynamic routing | `> $0.00` | `$0.1486` per 1k |\n\n")

        # Per Domain Breakdown Table
        gpr_key = next((k for k in self.results if "Gravitational" in k), None)
        if gpr_key:
            gpr_res = self.results[gpr_key]
            md.append("## 4. GPR Domain Alignment & Precision Breakdown\n\n")
            md.append("| Domain | Total Samples | Precision (%) | Recall (%) | F1-Score (%) |\n")
            md.append("| :--- | :---: | :---: | :---: | :---: |\n")
            for dom, m in gpr_res.domain_breakdown.items():
                md.append(f"| {dom.capitalize()} | {m.total_samples} | {m.precision:.1f}% | {m.recall:.1f}% | {m.f1_score:.1f}% |\n")

            md.append("\n## 5. Singularity Traffic Distribution\n\n")
            md.append("Percentage of total benchmark traffic captured by each model singularity under GPR:\n\n")
            md.append("| Singularity ID | Parameter Count | Captured Traffic Share (%) |\n")
            md.append("| :--- | :---: | :---: |\n")
            for m_id, share in gpr_res.workload_distribution.items():
                md.append(f"| `{m_id}` | — | {share:.1f}% |\n")

        with open(abs_path, "w", encoding="utf-8") as f:
            f.write("".join(md))

        print(f"[OK] Generated formatted Markdown benchmark report: {abs_path}")
