# Gravitational Prompt Routing (GPR) 🌌

> **Continuous Field-Theoretic Orchestration for Large Language Models via Cognitive Topography Mapping (CTM).**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python: 3.9+](https://img.shields.io/badge/python-3.9+-brightgreen.svg)](https://python.org)
[![Status: Experimental RFC](https://img.shields.io/badge/status-RFC--0001-purple.svg)](SPEC.md)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-cyan.svg)](https://gauravraikar19.github.io/gravitational-prompt-routing/)

👉 **[Launch the Live Interactive Cosmic Visualizer](https://gauravraikar19.github.io/gravitational-prompt-routing/)** — Watch prompts calculate semantic trajectories, orbit in real-time at 60 FPS, fall into winning AI model wells, and stream live model answers directly on GitHub Pages!

---

## ⚡ What is GPR?

Traditional AI routers use static rule matchers, brittle cosine thresholds, or expensive judge LLMs that add 500ms+ of latency and double your API bills.

**Gravitational Prompt Routing (GPR)** treats prompt routing as an astrophysics N-body continuous potential field simulation:
- **Models are Gravitational Singularities**: Each model has a **Semantic Mass (`Mass_i`)** derived from parameter scale, benchmark vectors, and context capacity, anchored at a domain centroid in latent semantic space.
- **Prompts are Point Masses**: Prompts enter semantic space as mass particles and naturally "fall" along geodesic potential curves into the gravitational well best suited to answer them.
- **Lagrangian Equilibrium**: Multi-domain queries near equilibrium points automatically trigger collaborative dual-model co-processing.

```text
                           [ Llama-3.3-70B-Instruct ] (Mass: 65.0)
                                      /        \
                                     /          \
                                    /   (★)      \
   Prompt (m_p) -----------------> *   Prompt     \
                                  /   Particle     \
                                 /                  \
                    [ Qwen-2.5-Coder-32B ]      [ DeepSeek-R1-671B ]
                         (Mass: 58.5)               (Mass: 74.2)
```

---

## 🪐 The 4 Celestial Model Singularities

The GPR field visualizer simulates four specialized model singularities situated across distinct cognitive quadrants:

| Model Singularity | Role & Domain Specialty | Parameters | Semantic Mass ($M_i$) | Latency | Color Key |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Qwen-2.5-Coder-32B** | Code, Systems Architecture, Rust, C++, Concurrency, SQL | 32 Billion | `58.5` | ~110 ms | Electric Cyan (`#00f2fe`) |
| **DeepSeek-R1-671B** | Theoretical Math, Formal Proofs, Physics, Deep Reasoning | 671 Billion | `74.2` | ~320 ms | Cosmic Violet (`#a855f7`) |
| **Hermes-3-70B** | Creative Prose, Songs, Poetry, Emotional Dialogue, Tales | 70 Billion | `53.0` | ~130 ms | Warm Amber (`#f59e0b`) |
| **Llama-3.3-70B-Instruct** | World Knowledge, Governance, History, General Q&A | 70 Billion | `65.0` | ~125 ms | Emerald Green (`#10b981`) |

---

## 📐 Mathematical Foundation & Formula Standards

In compliance with GPR RFC-0001 standards, the core attraction equation is presented with complete structural breakdowns and verifiable numerical examples:

```
+---------------------------------------------------------------------------------------------------+
|                                 MASTER GPR GRAVITATIONAL FORCE EQUATION                            |
|                                                                                                   |
|                                     M_i  *  m_p                                                   |
|                Force(i)  =  G  *  ----------------  *  Omega_i(Cost, Latency)                     |
|                                    ( r_i + eps )^delta                                            |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

### Structured Breakdown Table

| Variable | Mathematical Role | Intuition & Plain Meaning | Typical Value Range | Concrete Example |
| :--- | :--- | :--- | :--- | :--- |
| **`G`** | Universal Gravitational Constant | Scales overall field attraction magnitude | `1.0` | `1.0` |
| **`M_i`** | Model Semantic Mass | Intrinsic reasoning & parameter capacity of the model | `50.0` to `75.0` | `74.2` for DeepSeek-R1 (671B) |
| **`m_p`** | Prompt Informational Inertia | Complexity and token entropy of the user's prompt | `1.0` to `2.5` | `1.45` for a 40-token technical prompt |
| **`r_i`** | Geodesic Distance | Semantic separation between prompt vector and model centroid | `0.1` (close) to `1.8` (distant) | `0.18` (prompt is close to Code domain) |
| **`eps` ($\varepsilon$)** | Planck Softening Radius | Prevents singularity divergence ($r \rightarrow 0$) when exactly on centroid | `0.05` to `0.08` | `0.08` |
| **`delta` ($\delta$)** | Spatial Decay Exponent | Controls sharpness of field falloff ($1/r^\delta$) | `1.5` to `4.0` | `3.0` (Inverse-Cube law for sharp domain capture) |
| **`Omega_i` ($\Omega$)** | Relativistic Dampening | Penalizes financial token expense and slow response times | `0.0` to `1.0` | `0.85` (slight cost/latency discount) |

### Step-by-Step Numerical Example

Suppose a user submits the prompt: *"Implement a concurrent lock-free queue in Rust"*.
- **Prompt Inertia ($m_p$):** `1.40`
- **Softening Radius ($\varepsilon$):** `0.08`
- **Decay Exponent ($\delta$):** `3.0`
- **User Tuning:** $\lambda_{\text{cost}} = 0.0$, $\lambda_{\text{latency}} = 0.0 \implies \Omega_i = 1.0$

```text
Step 1: Compute Geodesic Distances
  - r(Qwen-Coder)    = 0.14  (strongly aligned with software engineering)
  - r(DeepSeek-Math) = 1.15  (distant from pure coding)

Step 2: Compute Denominators ( (r_i + eps)^3 )
  - Qwen Denominator     = (0.14 + 0.08)^3 = (0.22)^3 = 0.010648
  - DeepSeek Denominator = (1.15 + 0.08)^3 = (1.23)^3 = 1.860867

Step 3: Compute Numerators ( G * M_i * m_p )
  - Qwen Numerator     = 1.0 * 58.5 * 1.40 = 81.90
  - DeepSeek Numerator = 1.0 * 74.2 * 1.40 = 103.88

Step 4: Compute Gravitational Forces
  - Force(Qwen)     = 81.90 / 0.010648   = 7,691.58  (DOMINANT CAPTURE: 99.3%)
  - Force(DeepSeek) = 103.88 / 1.860867  = 55.82     (0.7%)

Conclusion:
  Qwen-Coder exerts 137x more pull than DeepSeek. 
  The prompt particle accelerates directly into Qwen's gravitational well in < 1 ms!
```

---

## 🎛️ Field Physics & Gravitational Tuning Controls

The live visualizer includes a 3-slider interactive physics panel allowing users to dynamically sculpt the semantic gravitational landscape:

```
+-----------------------------------------------------------------------------------------+
|                         FIELD GRAVITATIONAL TUNING CONTROLS                             |
|                                                                                         |
|   [1] Cost Sensitivity (lambda_cost)   : 0.0 (Pure IQ)  -->  3.0 (Max Budget Priority)  |
|   [2] Speed Priority (lambda_latency)  : 0.0 (Neutral)  -->  3.0 (Ultra-Fastest Only)   |
|   [3] Field Sharpness (delta Decay)    : 1.5 (Co-Orbit) -->  4.0 (Laser Focus)          |
+-----------------------------------------------------------------------------------------+
```

1. **💰 Cost Sensitivity ($\lambda_{\text{cost}}$):** Penalizes token expense. At higher values, expensive frontier models are weakened, pulling prompts toward budget and open-source models.
2. **⚡ Speed Priority ($\lambda_{\text{latency}}$):** Penalizes high response latency. Pulls queries toward low-latency models for real-time streaming.
3. **🧲 Field Sharpness ($\delta$ Decay):** Controls the spatial rate of field falloff ($1/r^\delta$). Low values ($1.5$) produce diffuse fields allowing dual-model **Lagrangian Co-Processing**; high values ($4.0$) laser-focus prompts on a single dominant specialist.

---

## 📺 Live Model Execution Terminal & Backends

Once a prompt is captured by a winning singularity, GPR triggers live text generation through three pluggable backends:

1. **Autonomous Knowledge Synthesizer (Recommended for GitHub Pages):**
   - 100% client-side, zero API keys required.
   - Comprehensive verified knowledge bases across science, programming, history, and world records.
2. **Cloud LLM API (Groq Frontier Streaming):**
   - Connects to Groq's high-speed inference engine using your private API key (stored in local browser storage only).
   - Powered by `openai/gpt-oss-120b` (frontier reasoning) and `qwen/qwen3.8-27b` (code).
   - Includes **⚡ Test Key Connection** button and **Show/Hide (👁️)** visibility toggle.
3. **Local Ollama (100% Free Offline):**
   - Connects to a locally running Ollama instance (`http://localhost:11434`) running `llama3` or `mistral`.

---

## 🚀 Running Locally

### Option A: Python CORS Streaming Server & Web UI

```bash
# Clone the repository
git clone https://github.com/GauravRaikar19/gravitational-prompt-routing.git
cd gravitational-prompt-routing

# Optional: Add your Groq API key in .env for seamless local streaming
echo "GROQ_API_KEY=your_key_here" > .env

# Launch the local server with built-in CORS streaming proxy
python server.py 8000
```
Open **`http://localhost:8000`** in your browser.

### Option B: Terminal Python Simulation

```bash
pip install -r requirements.txt
python examples/quickstart.py
```

---

## 📂 Repository Structure

```
├── docs/                             # Live GitHub Pages Web Application (v=7.9)
│   ├── index.html                    # Cosmic UI, Space Canvas & Execution Terminal
│   ├── style.css                     # Glassmorphic dark theme & responsive grid
│   └── js/
│       ├── app.js                    # Controller, canvas renderer & event loop
│       ├── constants.js              # 4 model singularities & semantic coordinates
│       ├── embedder.js               # Client-side 128D semantic hash embedder
│       ├── physics.js                # Continuous N-body gravitational force engine
│       ├── generator.js              # Multi-mode AI text generation dispatcher
│       └── knowledge_base.js         # Curated client knowledge graph
├── server.py                         # Local Python server & streaming CORS proxy
├── gpr/                              # Core Python Package
│   ├── core/                         # GravitationalRouter engine, mass & topography
│   ├── models/                       # LLMSingularity & PromptMass representations
│   ├── adapters/                     # Pluggable embedders & dispatch interfaces
│   └── visualizer/                   # ASCII terminal field plotter
├── examples/                         # Python quickstart and custom topology examples
├── tests/                            # Test suites and multi-model benchmark harnesses
├── SPEC.md                           # RFC-0001: Formal Mathematical Specification
├── MANIFESTO.md                      # Thought-leadership essay & architecture manifesto
├── EXPLAINER.md                      # Plain-English non-technical guide
└── LICENSE                           # MIT License
```

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
Engineered by **[Gaurav Raikar](https://github.com/GauravRaikar19)**.
