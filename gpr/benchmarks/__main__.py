"""
CLI entry point for Gravitational Prompt Routing benchmarks: `python -m gpr.benchmarks`
"""

import argparse
import sys
from gpr.benchmarks.runner import BenchmarkRunner
from gpr.benchmarks.reporter import BenchmarkReporter


def main():
    parser = argparse.ArgumentParser(
        description="Gravitational Prompt Routing (GPR) Benchmark & Evaluation Suite",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "--dataset",
        type=str,
        default="full",
        help="Dataset name ('full', 'math', 'code', 'creative', 'knowledge') or absolute file path to custom JSON.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Optional limit on the number of queries to evaluate (useful for rapid testing).",
    )
    parser.add_argument(
        "--json-output",
        type=str,
        default="benchmark_results.json",
        help="File path to save JSON results.",
    )
    parser.add_argument(
        "--markdown-output",
        type=str,
        default="BENCHMARK_RESULTS.md",
        help="File path to save Markdown benchmark report.",
    )
    parser.add_argument(
        "--no-markdown",
        action="store_true",
        help="Disable Markdown report export.",
    )

    args = parser.parse_args()

    print(f"\n[*] Initializing GPR Benchmark Suite (Dataset: {args.dataset})...")
    runner = BenchmarkRunner()

    try:
        results = runner.run(
            dataset_name=args.dataset,
            sample_limit=args.limit,
        )
    except Exception as e:
        print(f"[!] Error executing benchmark: {e}", file=sys.stderr)
        sys.exit(1)

    reporter = BenchmarkReporter(results)
    reporter.print_terminal_summary()

    if args.json_output:
        reporter.export_json(args.json_output)

    if not args.no_markdown and args.markdown_output:
        reporter.export_markdown(args.markdown_output)

    print("[*] Benchmark completed successfully.\n")


if __name__ == "__main__":
    main()
