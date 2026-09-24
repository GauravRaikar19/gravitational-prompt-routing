/**
 * Client-Side Deterministic Feature Vectorizer for Cognitive Topography Mapping
 *
 * Includes domain-aware keyword boosting for improved routing accuracy on short
 * or ambiguous prompts where pure hash-based embedding lacks semantic signal.
 */

const STOPWORDS = new Set([
  "the", "a", "an", "is", "in", "it", "of", "and", "or", "to", "for", "with",
  "on", "at", "by", "from", "as", "this", "that", "are", "was", "were", "be",
  "been", "being", "have", "has", "had", "do", "does", "did", "who", "which",
  "me", "my", "i", "you", "your", "we", "us", "our", "can", "could",
  "would", "should", "will", "shall", "may", "might", "about", "just",
  "some", "any", "no", "not", "so", "but", "if", "then", "than"
]);

// Domain signal keywords and boost phrases — mirror of Python DeterministicEmbedder
const DOMAIN_SIGNALS = {
  creative: {
    keywords: new Set([
      "song", "poem", "poetry", "story", "stories", "tale", "tales",
      "write", "compose", "sing", "lyric", "lyrics", "ballad", "lullaby",
      "sonnet", "haiku", "verse", "rhyme", "rhymes", "creative",
      "fiction", "novel", "narrative", "narrator", "prose", "essay",
      "dialogue", "monologue", "soliloquy", "screenplay", "script",
      "emotional", "melancholy", "melancholic", "evocative", "poetic",
      "artistic", "expressive", "metaphor", "allegory", "imagery",
      "fantasy", "fairy", "fable", "myth", "legend",
      "character", "protagonist", "hero", "villain",
      "drama", "dramatic", "romantic", "romance", "love",
      "sad", "happy", "joy", "sorrow", "grief", "tears",
      "dream", "dreaming", "imagine", "imagination",
      "beautiful", "beauty", "elegant", "graceful",
      "whisper", "murmur", "sigh", "cry", "laugh",
      "moonlight", "starlight", "sunset", "dawn", "twilight",
      "heart", "soul", "spirit", "emotion", "feeling",
      "dragon", "princess", "knight", "castle", "kingdom",
      "magic", "magical", "enchanted", "mystical",
      "baby", "child", "children",
      "rain", "ocean", "forest", "mountain", "river",
      "letter", "diary", "journal"
    ]),
    boostPhrases: [
      "creative writing poetry prose fiction",
      "emotional soliloquy melancholy storytelling",
      "lyrical ballad verse expressive narrative",
      "poetic monologue metaphor evocative"
    ],
    weight: 3.5
  },
  code: {
    keywords: new Set([
      "code", "coding", "program", "programming", "function", "algorithm",
      "debug", "debugging", "compile", "compiler", "runtime",
      "python", "rust", "javascript", "java", "cpp", "c++", "golang", "go",
      "typescript", "ruby", "swift", "kotlin", "scala", "haskell",
      "api", "rest", "graphql", "http", "server", "client",
      "database", "sql", "postgresql", "mysql", "mongodb", "redis",
      "memory", "heap", "stack", "pointer", "buffer", "array",
      "lock-free", "concurrent", "thread", "async", "await",
      "git", "docker", "kubernetes", "deploy", "ci", "cd",
      "bug", "fix", "error", "exception", "crash",
      "class", "object", "interface", "struct", "enum",
      "loop", "recursion", "sort", "search", "hash",
      "binary", "tree", "graph", "linked", "queue",
      "atomic", "mutex", "semaphore", "deadlock",
      "kernel", "syscall", "linux", "operating",
      "architecture", "microservice", "pipeline",
      "optimization", "performance", "benchmark",
      "test", "testing", "unittest", "pytest",
      "refactor", "implement", "implementation"
    ]),
    boostPhrases: [
      "software engineering programming algorithms systems",
      "lock-free concurrent memory buffer Rust C++",
      "debugging optimization performance code",
      "implementation architecture pipeline"
    ],
    weight: 3.0
  },
  math: {
    keywords: new Set([
      "prove", "proof", "theorem", "lemma", "corollary",
      "derive", "derivation", "equation", "formula",
      "calculus", "integral", "derivative", "differential",
      "algebra", "linear", "matrix", "vector", "eigenvalue",
      "topology", "manifold", "metric", "tensor", "curvature",
      "geometry", "euclidean", "riemannian", "geodesic",
      "probability", "statistics", "distribution", "variance",
      "hypothesis", "conjecture", "axiom", "postulate",
      "trigonometry", "sine", "cosine", "tangent",
      "logarithm", "exponential", "polynomial",
      "convergence", "divergence", "limit", "series",
      "riemann", "euler", "lagrange", "lagrangian",
      "hamiltonian", "schwarzschild", "christoffel",
      "navier-stokes", "fourier", "laplace",
      "quantum", "relativity", "spacetime", "gravity",
      "physics", "thermodynamics", "entropy",
      "mathematical", "computation", "numerical"
    ]),
    boostPhrases: [
      "mathematical proof theorem derivation formal logic",
      "tensor curvature differential calculus physics",
      "analytical reasoning verification axiom",
      "symbolic computation equations"
    ],
    weight: 3.0
  }
};

// Deterministic 32-bit FNV-1a hash
function fnv1a(str, seed = 0x811c9dc5) {
  let hval = seed;
  for (let i = 0; i < str.length; i++) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return hval >>> 0;
}

export class ClientEmbedder {
  constructor(dimension = 128, seed = 42) {
    this.dimension = dimension;
    this.seed = seed;
  }

  _hashToken(token) {
    const h = fnv1a(`${this.seed}:${token}`);
    const idx = h % this.dimension;
    const sign = (h & 0x100) ? 1.0 : -1.0;
    return { idx, sign, h };
  }

  _hashTrigram(trigram) {
    const h = fnv1a(`${this.seed}:tri:${trigram}`);
    const idx = h % this.dimension;
    const sign = (h & 0x100) ? 1.0 : -1.0;
    return { idx, sign };
  }

  _detectDomainSignals(tokens) {
    const tokenSet = new Set(tokens);
    const signals = {};

    for (const [domain, config] of Object.entries(DOMAIN_SIGNALS)) {
      let matchCount = 0;
      for (const kw of tokenSet) {
        if (config.keywords.has(kw)) matchCount++;
      }
      if (matchCount > 0) {
        // Strength scales with number of keyword hits, saturating around 4-5 matches
        signals[domain] = Math.min(2.0, matchCount / 2.0);
      }
    }

    return signals;
  }

  embedText(text) {
    if (!text || text.trim() === "") {
      const vec = new Float32Array(this.dimension);
      vec[0] = 1.0;
      return vec;
    }

    const vec = new Float32Array(this.dimension);
    const tokens = text.toLowerCase().match(/[a-zA-Z0-9_\-\+\*\#]+/g) || [];

    // 1. Salience-weighted word tokens
    for (const token of tokens) {
      const isStopword = STOPWORDS.has(token);
      const weight = isStopword ? 0.1 : Math.min(3.0, 1.0 + 0.3 * token.length);

      // Word-level hash
      const { idx, sign } = this._hashToken(token);
      vec[idx] += weight * sign;

      // 3-grams for non-stopwords
      if (!isStopword && token.length >= 3) {
        for (let i = 0; i <= token.length - 3; i++) {
          const tri = token.slice(i, i + 3);
          const { idx: idxTri, sign: signTri } = this._hashTrigram(tri);
          vec[idxTri] += 0.5 * signTri;
        }
      }
    }

    // 2. Domain-aware keyword boosting
    const domainSignals = this._detectDomainSignals(tokens);
    for (const [domain, strength] of Object.entries(domainSignals)) {
      const config = DOMAIN_SIGNALS[domain];
      const boostWeight = config.weight * strength;

      for (const phrase of config.boostPhrases) {
        const phraseTokens = phrase.toLowerCase().split(/\s+/);
        for (const pt of phraseTokens) {
          const { idx, sign } = this._hashToken(pt);
          vec[idx] += boostWeight * sign * 0.4;

          if (pt.length >= 3) {
            for (let i = 0; i <= pt.length - 3; i++) {
              const tri = pt.slice(i, i + 3);
              const { idx: idxTri, sign: signTri } = this._hashTrigram(tri);
              vec[idxTri] += boostWeight * signTri * 0.2;
            }
          }
        }
      }
    }

    // Unit normalize vector
    let sumSq = 0.0;
    for (let i = 0; i < this.dimension; i++) {
      sumSq += vec[i] * vec[i];
    }
    const norm = Math.sqrt(sumSq);

    if (norm > 1e-9) {
      for (let i = 0; i < this.dimension; i++) {
        vec[i] /= norm;
      }
    } else {
      vec[0] = 1.0;
    }

    return vec;
  }

  calculatePromptInertia(text) {
    const tokens = (text.trim().match(/\S+/g) || []).length;
    const tokenTerm = Math.log10(Math.max(1, tokens) + 9.0);

    // Lexical Shannon Entropy approximation
    const charCounts = {};
    for (const ch of text) {
      charCounts[ch] = (charCounts[ch] || 0) + 1;
    }
    let entropy = 0;
    const totalChars = text.length || 1;
    for (const ch in charCounts) {
      const p = charCounts[ch] / totalChars;
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }
    const normEntropy = Math.min(2.0, entropy / 4.0);

    return 1.0 + (0.5 * tokenTerm) + (0.3 * normEntropy);
  }
}
