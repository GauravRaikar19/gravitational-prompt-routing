# The Plain-English Guide to Gravitational Prompt Routing (GPR)

*A simple, no-jargon explanation of what we built, what the visualizer is doing, and what your screenshots mean.*

---

## 1. The Core Idea in Everyday Plain English

### The Problem:
Imagine you have 3 different AI assistants working on your team:
1. **DeepCoder-70B (The Senior Programmer):** Brilliant at coding, Rust, Python, and algorithms.
2. **OmniReasoner-405B (The Math Professor):** A super-genius at complex math, physics, and deep logic. But he charges $100/hour and takes a while to reply.
3. **Hermes-Prose-8B (The Creative Writer):** Lightning-fast, super cheap, great at conversational prose, stories, and quick explanations.

When a user types a message (a **"Prompt"**), **who should answer it?**
- If the user asks for a Rust algorithm, you want the **Programmer**.
- If the user asks for a differential equation proof, you want the **Professor**.
- If the user asks for a story or casual explanation, you want the **Writer**.

### How Everyone Else Does It Today (And Why It Fails):
- **Method A (Keyword Rules):** They write `if "code" in prompt: send to programmer`. This is brittle and breaks constantly.
- **Method B (Judge LLMs):** They use an *extra* AI model to read every message first and decide where to route it. This adds almost a full second of lag and doubles your API bill!

---

## 2. What We Invented (The Cosmic Solution)

Instead of rigid `if-else` rules or slow judge models, we turned routing into a **space simulation**:

```text
                     [ Hermes-Prose-8B ] (Writer Planet)
                              /        \
                             /          \
                            /   (★)      \
                           /   Prompt     \
                          /   Particle     \
                         /                  \
            [ DeepCoder-70B ]            [ OmniReasoner-405B ]
             (Coder Planet)                (Math Professor)
```

1. **Every AI Model is a "Planet" (Singularity):**
   - Each planet has **Mass** (how powerful and big the model is).
   - Each planet sits in its own area of space (Code domain, Math domain, Creative domain).
2. **Your Prompt is a "Spacecraft" (Point Mass):**
   - When you type a prompt, it launches into space.
   - It feels the gravitational pull of all 3 planets at once.
3. **The Winning Model:**
   - Whichever planet pulls the spacecraft hardest into its gravity well **wins** and gets to answer your prompt.
   - It calculates this in **less than 1 millisecond** using simple physics math!

---

## 3. What the Visualizer Screen Does

| Visual Element | What It Represents in Plain English |
| :--- | :--- |
| **The 3 Glowing Circles** | The 3 AI models (Cyan = Code, Purple = Math, Amber = Creative). The glowing rings show their gravity field. |
| **The Moving White/Pink Dot** | Your user prompt flying through space! It curves toward whichever model has the strongest gravitational attraction. |
| **The Trajectory Trail** | The curved flight path of your prompt as gravity acts on it. |
| **The Force Bars (F = ...)** | Shows the exact gravitational pull of each model. The one with the biggest bar wins (**Dominant Well**). |
| **The Prompt Box** | Where you type any message or question you want to send to an AI. |

---

## 4. What Happened in Your Screenshots (Deconstructed)

### In Images 1 & 2:
```text
Prompt: "Write a memory-safe lock-free ring buffer in Rust with zero heap allocation..."
```
- **What happened:** This prompt is dense, hardcore computer programming code.
- **The Result:** The prompt felt an overwhelming gravitational attraction to **DeepCoder-70B** (`F = 51.3`).
- **Telemetry Badge:** `🟢 STABLE WELL CAPTURE: DeepCoder-70B`
- **What the dot did:** It launched straight into DeepCoder's blue gravity well and entered a stable circular orbit around it!

---

### In Images 3 & 4 (The Coolest Part!):
```text
Prompt: "find founder of google"
Sliders: Cost Penalty was turned UP to 3.0!
```

- **Why did it say `⚠️ LAGRANGIAN RESONANCE`?**
  1. The prompt `"find founder of google"` is a simple general knowledge question. It is NOT heavy programming code, and it is NOT advanced calculus physics.
  2. Because you moved the **Cost Penalty slider up to 3.0**, you told the universe: *"I am on a tight budget! Heavily penalize the expensive 405B model!"*
  3. This drastically weakened the big purple planet (**OmniReasoner-405B** dropped to only `F = 16.4`).
  4. That left two cheap models competing: **Hermes-Prose** (`F = 24.3`) and **DeepCoder** (`F = 23.6`).
  5. The difference between them was only **3.0%**! Neither planet was strong enough to pull the prompt away from the other!
- **What the moving dot did:**
  - Instead of getting sucked into one planet, the glowing pink dot got **caught in the middle** between Hermes and DeepCoder, moving in a figure-8 loop!
- **What Lagrangian Resonance means in AI:**
  - In astrophysics, a "Lagrange Point" is where two celestial bodies balance each other's gravity.
  - In our AI system, when a prompt lands here, it means: *"This question doesn't belong strictly to one specialist. Both models can handle it together!"*

---

## 5. What the Sliders Do

- **Cost Penalty ($\lambda_{\text{Cost}}$):**
  - *"How much do you care about saving money?"*
  - `0.0`: You don't care about cost at all. Giant 405B models will win often because they have huge mass.
  - `3.0`: You hate spending money! Giant expensive models get their gravity crushed, letting cheap, agile models (8B and 70B) win.
- **Latency Penalty ($\lambda_{\text{Lat}}$):**
  - *"How much do you care about speed?"*
  - Turn this up to penalize slow models and favor instant, lightweight models.
- **Decay Exponent ($\delta$):**
  - *"How strict are the domains?"*
  - Controls how fast gravity drops off with distance. Higher values make models very territorial (only pulling things that match their exact expertise).

---

## 6. What Should You Enter in the Prompt Box?

You can test **any real question you would ask ChatGPT or Claude**:
- **Test Code:** *"Write an SQL query to find duplicate users by email."* → Watch it fly to **DeepCoder**.
- **Test Math:** *"Calculate the eigenvalues of a 3x3 Hermitian matrix."* → Watch it fly to **OmniReasoner**.
- **Test Creative Writing:** *"Write a bedtime story about a lonely lighthouse in winter."* → Watch it fly to **Hermes-Prose**.
- **Test a Hybrid:** *"Write a poem explaining how Python handles recursion."* → Watch it trigger **Lagrangian Resonance** between Code and Prose!
