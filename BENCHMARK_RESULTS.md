# Gravitational Prompt Routing (GPR) — Comprehensive Benchmark Report
> **Evaluation Category:** Routing Accuracy, Computational Latency, and Simulated Token Economics  > **Benchmark Dataset:** 1,000+ Multi-Domain Curated Questions (Math, Code, Creative, World Knowledge)  > **Ground Truth:** Frontier Singularity Specialization Manifold
---
## 1. Executive Summary
This report benchmarks **Gravitational Prompt Routing (GPR)** against industry baselines:
1. **Cosine-Centroid Router:** Direct unweighted cosine similarity (omits semantic mass and relativistic penalties).
2. **Static Keyword / Rule Heuristic Router:** Keyword regex matching fallback rules.
3. **Monolithic Frontier (All-to-671B):** Over-provisioned baseline directing 100% of queries to the largest model.
4. **Always Cheapest (All-to-8B):** Minimum cost baseline sending all queries to an 8B model.

## 2. Comparative Benchmark Matrix

| Router Architecture | Accuracy (%) | Cost / 1k Queries ($) | Cost Savings vs Frontier (%) | Mean Latency (ms) | Throughput (QPS) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Gravitational Prompt Router (GPR)** | **99.6%** | **$0.1062** | **57.2%** | **0.71 ms** | **1413** |
| Cosine Centroid (Unweighted) | 99.4% | $0.1041 | 58.1% | 0.62 ms | 1621 |
| Static Keyword / Rule Heuristic | 96.8% | $0.1029 | 58.6% | 0.02 ms | 47129 |
| Monolithic Frontier (All-to-671B) | 4.9% | $0.2484 | 0.0% | 0.00 ms | 5092546 |
| Always Cheapest (All-to-8B) | 0.0% | $0.0093 | 96.2% | 0.00 ms | 8357964 |

---
## 3. Mathematical Evaluation Formulations

### 3.1 Gravitational Attraction Force Formula

```text
+-----------------------------------------------------------------------------------+
|                           GRAVITATIONAL ATTRACTION FORCE                          |
|                                                                                   |
|                                     Mass_i × m_p                                  |
|               Force_i  =  G  ×  --------------------  ×  Omega_i                  |
|                                 ( Distance_i + eps )^delta                        |
+-----------------------------------------------------------------------------------+
```

#### Variable Definitions & Intuition Table

| Variable | Intuition | Typical Range | Concrete Example |
| :--- | :--- | :---: | :--- |
| `Force_i` | Net gravitational pull exerted by Model `i` on prompt `p` | `[0.0, 100.0+]` | `14.82` (dominant pull) |
| `G` | Global gravitational routing constant | `1.0` | `1.0` |
| `Mass_i` | Intrinsic semantic capacity & benchmark mass of model | `[30.0, 80.0]` | `58.5` (Qwen-2.5-Coder-32B) |
| `m_p` | Prompt informational inertia based on tokens and entropy | `[1.0, 3.5]` | `1.42` (25 token query) |
| `Distance_i`| Topographical geodesic distance on semantic unit sphere | `[0.05, 2.05]` | `0.38` (close match in code space) |
| `eps` | Planck-like gravitational softening radius | `0.05 - 0.08` | `0.08` |
| `delta` | Topographical potential decay exponent | `2.0 - 3.0` | `3.0` |
| `Omega_i` | Relativistic dampening operator factoring cost & latency | `(0.0, 1.0]` | `0.92` |

#### Step-by-Step Numerical Example
Consider a prompt `p` with code syntax routed against `Qwen-2.5-Coder-32B`:
1. **Model Mass (`Mass_i`):** `58.5`
2. **Prompt Mass (`m_p`):** `1.20`
3. **Geodesic Distance (`Distance_i`):** `0.32`
4. **Effective Radius:** `r_eff = Distance_i + eps = 0.32 + 0.08 = 0.40`
5. **Decay Factor:** `r_eff^3 = 0.40^3 = 0.064`
6. **Relativistic Dampening (`Omega_i`):** `0.95`
7. **Calculation:** `Force = 1.0 × (58.5 × 1.20 / 0.064) × 0.95 = (70.2 / 0.064) × 0.95 = 1096.8 × 0.95 = 1042.0`

### 3.2 Routing Cost Reduction Efficiency

```text
+-----------------------------------------------------------------------------------+
|                             COST SAVINGS EFFICIENCY                               |
|                                                                                   |
|                                Cost_Monolithic - Cost_Router                      |
|             Savings_Rate  =  ---------------------------------  ×  100%           |
|                                      Cost_Monolithic                              |
+-----------------------------------------------------------------------------------+
```

| Variable | Intuition | Typical Range | Concrete Example |
| :--- | :--- | :---: | :--- |
| `Savings_Rate` | Financial expenditure percentage saved | `0.0% - 90.0%` | `61.4%` savings |
| `Cost_Monolithic` | Total dollar cost if all queries went to frontier 671B model | `> $0.00` | `$0.3850` per 1k |
| `Cost_Router` | Total dollar cost achieved by dynamic routing | `> $0.00` | `$0.1486` per 1k |

## 4. GPR Domain Alignment & Precision Breakdown

| Domain | Total Samples | Precision (%) | Recall (%) | F1-Score (%) |
| :--- | :---: | :---: | :---: | :---: |
| Knowledge | 868 | 99.7% | 100.0% | 99.8% |
| Math | 50 | 98.0% | 98.0% | 98.0% |
| Code | 50 | 100.0% | 98.0% | 99.0% |
| Creative | 50 | 100.0% | 96.0% | 98.0% |

## 5. Singularity Traffic Distribution

Percentage of total benchmark traffic captured by each model singularity under GPR:

| Singularity ID | Parameter Count | Captured Traffic Share (%) |
| :--- | :---: | :---: |
| `llama-3.3-70b-instruct` | — | 85.6% |
| `deepseek-r1-671b` | — | 4.9% |
| `qwen-2.5-coder-32b` | — | 4.8% |
| `hermes-3-70b` | — | 4.7% |
