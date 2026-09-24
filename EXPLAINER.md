# The Plain-English Guide to Gravitational Prompt Routing (GPR) 🌌

*A simple, no-jargon explanation of what we built, what the visualizer is doing, and how the continuous gravity field routes your prompts.*

---

## 1. The Core Idea in Everyday Plain English

### The Problem:
Imagine you have 4 different AI specialists on your team:
1. **Qwen-2.5-Coder-32B (The Software Architect):** Brilliant at coding, Rust, C++, Python, concurrency, and algorithms.
2. **DeepSeek-R1-671B (The Math & Physics Professor):** A 671B reasoning monster at formal mathematical proofs, calculus, and multi-step logic.
3. **Hermes-3-70B (The Creative Author):** World-class at poetic prose, song lyrics, dialogue, metaphors, and rich stories.
4. **Llama-3.3-70B-Instruct (The World Historian & Encyclopedic Scholar):** Master of geography, governance, historical facts, politics, and general knowledge Q&A.

When you type a message (a **"Prompt"**), **which AI should answer it?**
- If you ask for a lock-free queue in Rust, you want **Qwen-Coder**.
- If you ask to prove the Riemann hypothesis, you want **DeepSeek-R1**.
- If you ask for a melancholic song or poem, you want **Hermes-3**.
- If you ask who founded Google or who is the chief minister of Goa, you want **Llama-3.3**.

### How Everyone Else Does It Today (And Why It Fails):
- **Method A (Keyword Rules):** They write `if "code" in prompt: route to coder`. This is brittle, simplistic, and breaks constantly.
- **Method B (Judge LLMs):** They use an *extra* AI model to read every message first and decide where to route it. This adds 500ms+ of lag and doubles your API bill!

---

## 2. What We Invented (The Cosmic Solution)

Instead of rigid `if-else` rules or slow judge models, we turned routing into a **continuous astrophysics simulation**:

```text
                           [ Llama-3.3-70B-Instruct ] (World Facts)
                                      /        \
                                     /          \
                                    /   (★)      \
   Prompt (m_p) -----------------> *   Prompt     \
                                  /   Particle     \
                                 /                  \
                    [ Qwen-2.5-Coder-32B ]      [ DeepSeek-R1-671B ]
                         (Coder Planet)              (Math Professor)
```

1. **Every AI Model is a "Planet" (Singularity):**
   - Each planet has **Mass** ($M_i$) derived from how big and capable the model is.
   - Each planet sits in its own quadrant of cognitive space (Code, Math, Creative, World Knowledge).
2. **Your Prompt is a "Spacecraft" (Point Mass):**
   - When you type a prompt, it launches into the semantic vector field.
   - It simultaneously feels the gravitational pull of all 4 planets.
3. **The Winning Model:**
   - Whichever planet exerts the strongest gravitational attraction captures the prompt into its orbital well and streams the answer back to you!
   - GPR calculates this in **less than 1 millisecond** using pure continuous physics math.

---

## 3. What the Visualizer Screen Shows

| Visual Element | What It Represents in Plain English |
| :--- | :--- |
| **The 4 Glowing Planets** | The 4 AI models (Cyan = Qwen Coder, Purple = DeepSeek Math, Amber = Hermes Creative, Green = Llama World Facts). The glowing orbital rings visualize each model's gravitational field strength. |
| **The Flying Particle (Dot)** | Your user prompt flying through space! It curves toward whichever model has the strongest gravitational attraction. |
| **The Curved Trajectory Trail** | The continuous flight path of your prompt as gravity accelerates it. |
| **The Telemetry Force Bars ($F = \dots$)** | Shows the exact gravitational pull of each model. The model with the largest force wins (**Dominant Well**). |
| **Lagrangian Resonance Notice** | Appears when two models exert nearly equal pull (within 15%), triggering dual-model **Co-Processing**! |
| **Routed AI Output Stream Terminal** | The docked terminal on the right where the winning model streams its live answer directly to your screen. |

---

## 4. What the 3 Sliders Do (Field Gravitational Tuning)

The tuning panel under the prompt input allows you to dynamically alter the physical laws of the routing universe:

```
+-----------------------------------------------------------------------------------------+
|                               GRAVITATIONAL PULL EQUATION                                |
|                                                                                         |
|                         Effective Mass           M_eff                                  |
|        Field Force = --------------------  =  ------------                              |
|                      (Distance + eps)^delta   (r + eps)^delta                           |
|                                                                                         |
|        where M_eff = Base_Mass - (lambda_cost * Cost) - (lambda_lat * Latency)          |
+-----------------------------------------------------------------------------------------+
```

### 1. 💰 Cost Sensitivity ($\lambda_{\text{cost}}$)
- *"How much do you care about saving money on token costs?"*
- `0.0 (Pure IQ)`: You don't care about cost at all. Frontier 671B reasoning models will win whenever they are even slightly smarter.
- `3.0 (Max Budget Priority)`: You want to minimize costs! Expensive models have their effective mass crushed, pulling prompts toward agile, cost-effective models.

### 2. ⚡ Speed Priority ($\lambda_{\text{latency}}$)
- *"How much do you care about getting an instant, low-latency response?"*
- `0.0 (Neutral)`: Routing cares purely about capability and distance.
- `3.0 (Ultra-Fastest Only)`: Drastically penalizes slow-thinking models (like 671B MoE reasoning models) and pulls queries toward ultra-fast streaming models (~110ms).

### 3. 🧲 Field Sharpness ($\delta$ Distance Decay)
- *"How strict should domain boundaries be?"*
- `1.5 (Diffuse / Co-Orbit)`: The gravitational pull falls off gently with distance. Prompts in the borderlands between Code and Math will easily trigger **Lagrangian Co-Processing**.
- `3.0 (Inverse-Cube Standard)`: The balanced physical default. Clean, predictable routing.
- `4.0 (Laser Focus)`: Ultra-steep falloff. A model will only pull prompts that are an exact bullseye for its domain.

---

## 5. The Three AI Generation Backends

Click **⚙️ AI Settings** on the terminal to choose how your answers are generated:

1. **Autonomous Knowledge Synthesizer (Recommended for GitHub Pages):**
   - Runs 100% inside your browser with **zero API keys required**.
   - Contains a verified offline knowledge graph for instant answers across science, code, and world facts.
2. **Cloud LLM API (Groq Frontier Streaming):**
   - Connects directly to Groq's high-speed cloud inference engine using your personal API key.
   - Uses `openai/gpt-oss-120b` (120B reasoning model) and `qwen/qwen3.8-27b` (code).
   - Features a **⚡ Test Key Connection** button and **Show/Hide (👁️)** key toggle.
3. **Local Ollama (100% Free Offline):**
   - Connects to your local Ollama server (`localhost:11434`) running open-weights models like `llama3` or `mistral`.
