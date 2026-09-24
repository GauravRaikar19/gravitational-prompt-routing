/**
 * Constants & Model Singularity Configurations for GPR Visualizer
 */

export const DEFAULT_G = 1.0;
export const DEFAULT_EPSILON = 0.08;
export const DEFAULT_DELTA = 3.0;
export const DEFAULT_LAGRANGE_THRESHOLD = 0.15; // 15% margin for co-processing

export const INITIAL_SINGULARITIES = [
  {
    id: "deepcoder-70b",
    name: "DeepCoder-70B",
    role: "Code & Systems Architecture",
    description: "Specialized in software engineering, low-level systems, Rust, C++, Python, algorithms, concurrency, and debugging.",
    parametersB: 70,
    mass: 56.7,
    costPerM: 0.80,
    latencyMs: 180,
    color: "#00f2fe", // Electric Cyan
    glowColor: "rgba(0, 242, 254, 0.4)",
    // 2D Canvas normalized target position (-1 to 1)
    canvasPos: { x: -0.55, y: 0.45 },
    exemplars: [
      "Write a memory-safe lock-free ring buffer in Rust with zero heap allocation",
      "Optimize this PostgreSQL query execution plan and B-Tree index",
      "Implement concurrent thread pool in C++ with work-stealing deque",
      "Fix null pointer dereference and memory leak in Linux kernel module"
    ]
  },
  {
    id: "omnireasoner-405b",
    name: "OmniReasoner-405B",
    role: "Theoretical Math & Logic",
    description: "Master of formal mathematical proofs, theoretical physics, calculus, tensors, symbolic logic, and multi-step reasoning.",
    parametersB: 405,
    mass: 68.3,
    costPerM: 3.00,
    latencyMs: 450,
    color: "#a855f7", // Cosmic Violet
    glowColor: "rgba(168, 85, 247, 0.4)",
    canvasPos: { x: 0.55, y: 0.45 },
    exemplars: [
      "Derive the Christoffel symbols and Riemann curvature tensor for a black hole",
      "Prove the Riemann hypothesis for non-trivial zeros and analytic continuation",
      "Solve nonlinear differential equations with Navier-Stokes approximations",
      "Derive the Euler-Lagrange equations of motion in Hamiltonian mechanics"
    ]
  },
  {
    id: "hermes-prose-8b",
    name: "Hermes-Prose-8B",
    role: "Creative Prose & Nuance",
    description: "Expressive creative writing, songs, lyrics, emotional character dialogues, screenplays, melancholy, poetry, metaphors, fantasy tales, and evocative storytelling.",
    parametersB: 8,
    mass: 49.6,
    costPerM: 0.20,
    latencyMs: 90,
    color: "#f59e0b", // Warm Amber
    glowColor: "rgba(245, 158, 11, 0.4)",
    canvasPos: { x: 0.0, y: -0.60 },
    exemplars: [
      "Write an emotional, melancholic soliloquy of a weary artisan watching time slip away",
      "Compose a lyrical ballad in iambic pentameter about moonlight reflecting on still water",
      "Craft a tense noir detective dialogue in the pouring midnight rain",
      "Narrate an atmospheric fantasy tale of an ancient kingdom fading into myth",
      "Write me a song about love and heartbreak under the moonlight",
      "Tell me a story about a dragon who befriends a lonely child",
      "Compose a lullaby for a baby falling asleep under the stars",
      "Write lyrics for a folk ballad about the changing seasons"
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
    id: "turing-dialogue",
    title: "Turing Dialogue ⚠️",
    category: "Lagrangian Resonance",
    prompt: "Compose an elegant poetic dialogue in verse between Alan Turing and a thinking machine discussing mathematical truth and human emotion."
  }
];
