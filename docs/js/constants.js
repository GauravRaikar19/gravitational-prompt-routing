/**
 * Constants & Model Singularity Configurations for GPR Visualizer
 */

export const DEFAULT_G = 1.0;
export const DEFAULT_EPSILON = 0.08;
export const DEFAULT_DELTA = 3.0;
export const DEFAULT_LAGRANGE_THRESHOLD = 0.15; // 15% margin for co-processing

export const INITIAL_SINGULARITIES = [
  {
    id: "qwen-2.5-coder-32b",
    name: "Qwen-2.5-Coder-32B",
    role: "Code & Systems Architecture",
    description: "Alibaba's premier open coding model. Specialized in software engineering, low-level systems, Rust, C++, Python, algorithms, concurrency, Docker, SQL, and systems architecture.",
    parametersB: 32,
    mass: 58.5,
    costPerM: 0.20,
    latencyMs: 110,
    color: "#00f2fe", // Electric Cyan
    glowColor: "rgba(0, 242, 254, 0.4)",
    // 2D Canvas normalized target position (-1 to 1)
    canvasPos: { x: -0.55, y: 0.45 },
    exemplars: [
      "Write a memory-safe lock-free ring buffer in Rust with zero heap allocation",
      "Optimize this PostgreSQL query execution plan and B-Tree index",
      "Implement concurrent thread pool in C++ with work-stealing deque",
      "Fix null pointer dereference and memory leak in Linux kernel module",
      "Write python code to check prime number and generate sieve",
      "Implement binary search algorithm in Python and C++"
    ]
  },
  {
    id: "deepseek-r1-671b",
    name: "DeepSeek-R1-671B",
    role: "Theoretical Math & Deep Reasoning",
    description: "DeepSeek's frontier 671B MoE reasoning model. Master of formal mathematical proofs, theoretical physics, calculus, tensors, symbolic logic, and multi-step analytical reasoning.",
    parametersB: 671,
    mass: 74.2,
    costPerM: 0.55,
    latencyMs: 320,
    color: "#a855f7", // Cosmic Violet
    glowColor: "rgba(168, 85, 247, 0.4)",
    canvasPos: { x: 0.55, y: 0.45 },
    exemplars: [
      "Derive the Christoffel symbols and Riemann curvature tensor for a black hole",
      "Prove the Riemann hypothesis for non-trivial zeros and analytic continuation",
      "Solve nonlinear differential equations with Navier-Stokes approximations",
      "Derive the Euler-Lagrange equations of motion in Hamiltonian mechanics",
      "Solve quadratic equation and calculate hypotenuse using Pythagorean theorem"
    ]
  },
  {
    id: "hermes-3-70b",
    name: "Hermes-3-70B",
    role: "Creative Prose & Nuance",
    description: "Nous Research's frontier flagship model. Acclaimed for expressive creative writing, songs, lyrics, emotional character dialogues, screenplays, melancholy, poetry, metaphors, fantasy tales, and evocative storytelling.",
    parametersB: 70,
    mass: 53.0,
    costPerM: 0.35,
    latencyMs: 130,
    color: "#f59e0b", // Warm Amber
    glowColor: "rgba(245, 158, 11, 0.4)",
    canvasPos: { x: -0.48, y: -0.52 },
    exemplars: [
      "Write an emotional, melancholic soliloquy of a weary artisan watching time slip away",
      "Compose a lyrical ballad in iambic pentameter about moonlight reflecting on still water",
      "Craft a tense noir detective dialogue in the pouring midnight rain",
      "Narrate an atmospheric fantasy tale of an ancient kingdom fading into myth",
      "Write me a song about love and heartbreak under the moonlight",
      "Tell me a story about a dragon who befriends a lonely child",
      "Compose a lullaby for a baby falling asleep under the stars",
      "Write a poem about thunderstorms and heavy rainfall"
    ]
  },
  {
    id: "llama-3.3-70b-instruct",
    name: "Llama-3.3-70B-Instruct",
    role: "World Knowledge & General Q&A",
    description: "Meta's flagship open-weights model for world geography, governance, political leadership, factual Q&A, historical entities, state ministers, current affairs, and encyclopedic reasoning.",
    parametersB: 70,
    mass: 65.0,
    costPerM: 0.40,
    latencyMs: 125,
    color: "#10b981", // Emerald Green
    glowColor: "rgba(16, 185, 129, 0.4)",
    canvasPos: { x: 0.48, y: -0.52 },
    exemplars: [
      "Who is the chief minister of Goa and what is their political party and term?",
      "Who is the prime minister of India and what are the key powers of the executive branch?",
      "Explain the history, founding, and administrative capital of Aldona and Panaji Goa",
      "Who founded Google, Apple, and Microsoft and what were their breakthrough inventions?",
      "What is the capital city, official language, and currency of France and Germany?",
      "What is the national animal, bird, flower, and anthem of India?",
      "How many talukas and districts are there in Goa?",
      "Summarize the constitutional structure of the Indian parliamentary democracy"
    ]
  }
];

export const PRESET_PROMPTS = [
  {
    id: "rust-ring-buffer",
    title: "Rust Ring Buffer",
    category: "Systems Code",
    prompt: "Write a memory-safe lock-free ring buffer in Rust with zero heap allocation and atomic CAS operations."
  },
  {
    id: "riemann-curvature",
    title: "Black Hole Tensor",
    category: "Math & Physics",
    prompt: "Derive the Christoffel symbols and Riemann curvature tensor for a Schwarzschild black hole metric."
  },
  {
    id: "clockmaker-soliloquy",
    title: "Melancholic Soliloquy",
    category: "Creative Prose",
    prompt: "Write an emotional, melancholic soliloquy of a clockmaker who realizes time itself is falling asleep."
  },
  {
    id: "goa-chief-minister",
    title: "Goa Chief Minister",
    category: "World Knowledge",
    prompt: "Who is the chief minister of Goa?"
  },
  {
    id: "turing-dialogue",
    title: "Turing Dialogue ⚠️",
    category: "Lagrangian Resonance",
    prompt: "Compose an elegant poetic dialogue in verse between Alan Turing and a thinking machine discussing mathematical truth and human emotion."
  }
];
