# Gravitational Prompt Routing (GPR) 🌌

> **Continuous Field-Theoretic Orchestration for Large Language Models via Cognitive Topography Mapping (CTM).**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python: 3.9+](https://img.shields.io/badge/python-3.9+-brightgreen.svg)](https://python.org)
[![Status: Experimental RFC](https://img.shields.io/badge/status-RFC--0001-purple.svg)](SPEC.md)

---

## ⚡ What is GPR?

Traditional AI routers use static rule matchers, brittle cosine thresholds, or expensive judge LLMs that add 500ms+ of latency.

**Gravitational Prompt Routing (GPR)** treats prompt routing as an astrophysics N-body continuous simulation:
- **Models are Gravitational Singularities**: Each model has a **Semantic Mass (`Mass_i`)** derived from parameter scale, benchmark vectors, and context capacity, located at a domain centroid in latent space.
- **Prompts are Point Masses**: Prompts enter semantic space as mass particles and naturally "fall" along geodesic potential curves into the gravitational well best suited to answer them.
- **Lagrangian Equilibrium**: Multi-domain queries near equilibrium points automatically trigger collaborative dual-model co-processing.

```
       [ DeepSeek-Reasoner-671B ] (Mass: 94.2)
                   \      .      /
                    \    .      /
  Prompt (m_p) ------> * =====> Captured by Code Singularity!
                    /    .      \
                   /      .      \
       [ Claude-Opus-Creative ]  [ Fast-Chat-8B ]
             (Mass: 88.0)          (Mass: 25.1)
```

---

## 🚀 Quick Start

### 1. Installation

```bash
git clone https://github.com/GauravRaikar19/gravitational-prompt-routing.git
cd gravitational-prompt-routing
pip install -r requirements.txt
```

### 2. Run the Interactive Simulation & Visualizer

```bash
python examples/quickstart.py
```

Watch prompts compute semantic trajectories and fall into gravitational wells right inside your terminal:

```
================================================================================
Prompt: "Write a high-performance concurrent ring buffer in Rust with zero-alloc."
--------------------------------------------------------------------------------
Singularity Pull Vector Distribution:
  [●] Code-Singularity-70B      : ######################################## [F = 184.22] (DOMINANT)
  [○] Reasoning-Math-405B       : ############                             [F = 58.10]
  [○] Literary-Creative-8B      : ##                                       [F = 12.04]
--------------------------------------------------------------------------------
Gravitational Well Captured: Code-Singularity-70B
Trajectory Status          : STABLE CAPTURE (Lagrangian Margin: 68.46%)
Computation Latency        : 0.84 ms
================================================================================
```

---

## 📐 Mathematical Foundation

The core attraction equation mapping semantic distance to gravitational pull:

```text
                                (Model Mass) × (Prompt Inertia)
 Net Pull Force  =  G  ×  ───────────────────────────────────────────  ×  Relativistic Dampening
                           ( Geodesic Distance + Softening Radius )^δ
```

Or in compact algorithmic form:

```text
Force(i) = G * [ (Mass_i * Inertia_prompt) / (Distance_i + ε)^δ ] * Ω_i(Cost, Latency)
```

### Parameter Breakdown:

| Parameter | Plain Name | Role in Routing | Typical Range |
| :--- | :--- | :--- | :--- |
| **`Mass_i`** | Model Semantic Mass | Derived from parameter count, context window, and benchmark scores (MMLU, HumanEval). | `40.0` to `75.0` |
| **`Inertia_prompt`** | Prompt Mass | Measures prompt complexity and length (token volume + lexical Shannon entropy). | `1.5` to `2.5` |
| **`Distance_i`** | Geodesic Distance | Semantic separation between prompt coordinates and model domain centroid. | `0.1` (close) to `1.8` (distant) |
| **`ε` (Epsilon)** | Softening Radius | Prevents singularity divergence when prompt directly matches centroid. | `0.05` to `0.08` |
| **`δ` (Delta)** | Decay Exponent | Spatial curvature decay (`2.0` = Newtonian, `3.0` = steep domain preference). | `2.0` or `3.0` |
| **`Ω_i` (Omega)** | Relativistic Dampening | Penalizes high cost or slow latency models based on user constraints. | `0.0` to `1.0` |

### Lagrangian Equilibrium Condition:

When two models exert near-equal gravitational pull, GPR triggers **Orbital Resonance** (co-processing):

```text
Resonance Gap = | Force(Primary) - Force(Secondary) | / Force(Primary)
Trigger Condition: Resonance Gap < 15%
```

Read the complete mathematical RFC at [`SPEC.md`](SPEC.md) or read the philosophy in [`MANIFESTO.md`](MANIFESTO.md).

---

## 📂 Repository Structure

```
├── SPEC.md                    # Formal RFC & Mathematical Foundations
├── MANIFESTO.md               # Thought-leadership manifesto & essay
├── gpr/                       # Core Package
│   ├── core/
│   │   ├── constants.py       # Gravitational constants and defaults
│   │   ├── mass.py            # Mass calculation functions
│   │   ├── topography.py      # Geodesic metrics and curvature
│   │   └── engine.py          # GravitationalRouter engine
│   ├── models/
│   │   ├── singularity.py     # LLMSingularity representation
│   │   └── prompt.py          # PromptMass representation
│   ├── adapters/
│   │   ├── embedder.py        # Pluggable vector embedders (Local & External)
│   │   └── dispatcher.py      # Multi-model dispatch interfaces
│   └── visualizer/
│       └── field_plotter.py   # Terminal ASCII gravity field visualizer
├── examples/
│   ├── quickstart.py          # Runnable routing walkthrough
│   └── custom_topology.py    # Custom domain singularities & cost tuning
└── tests/
    └── test_gpr_engine.py     # Deterministic mathematical test suite
```

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
