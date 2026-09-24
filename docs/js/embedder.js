/**
 * Client-Side Deterministic Feature Vectorizer for Cognitive Topography Mapping
 *
 * Includes domain-aware keyword boosting for improved routing accuracy on short
 * or ambiguous prompts where pure hash-based embedding lacks semantic signal.
 */

const STOPWORDS = new Set([
  "the", "a", "an", "is", "in", "it", "of", "and", "or", "to", "for", "with",
  "on", "at", "by", "from", "as", "this", "that", "are", "was", "were", "be",
  "been", "being", "have", "has", "had", "do", "does", "did",
  "me", "my", "i", "you", "your", "we", "us", "our", "can", "could",
  "would", "should", "will", "shall", "may", "might", "about", "just",
  "some", "any", "no", "not", "so", "but", "if", "then", "than"
]);

// Domain signal keywords and boost phrases — mirror of Python DeterministicEmbedder
const DOMAIN_SIGNALS = {
  knowledge: {
    keywords: new Set([
      "who", "where", "when", "which",
      "minister", "chief", "prime", "president", "governor", "mayor",
      "leader", "cabinet", "parliament", "congress", "senate", "assembly",
      "government", "governance", "democracy", "republic", "election",
      "party", "bjp", "democrat", "republican", "politics", "political",
      "goa", "india", "delhi", "panaji", "mumbai", "karnataka", "maharashtra",
      "aldona", "france", "germany", "japan", "china", "usa", "uk", "russia", "australia",
      "capital", "city", "country", "state", "nation", "national", "territory", "district", "taluka", "talukas",
      "geography", "history", "historical", "founded", "founder", "founding", "established",
      "population", "economy", "gdp", "currency", "language", "official",
      "headquarters", "ceo", "company", "treaty", "monument", "culture",
      "heritage", "unesco", "landmark", "tourism", "biography", "facts",
      "policy", "administration", "constitution", "executive", "law",
      "boiling", "continents", "ocean", "painted", "painter", "mona", "lisa",
      "war", "century", "ram", "rama", "wife", "sita", "medals", "asian", "games",
      "shakespeare", "romeo", "juliet", "hamlet",
      "animal", "animals", "bird", "birds", "flower", "tree", "anthem", "emblem",
      "flag", "symbol", "symbols", "tiger", "peacock", "river", "sport", "game",
      "highest", "longest", "largest", "deepest", "fastest", "discovery", "invented",
      "inventor", "nobel", "prize", "planet", "planets", "bone", "bones", "skeleton",
      "suez", "panama", "canal", "everest", "nile", "amazon", "gandhi", "nehru", "modi",
      "murmu", "ambedkar", "valmiki", "vyasa", "gitanjali", "taj", "mahal", "colosseum",
      "eiffel", "pyramid", "giza", "element", "elements", "atomic", "chemical", "compound",
      "water", "salt", "glucose", "formula", "formulae", "galaxy", "olympic", "olympics", "fifa", "worldcup"
    ]),
    boostPhrases: [
      "world geography governance political leadership factual Q&A state national symbol",
      "who is where is capital prime minister president facts history national animal",
      "history biography country state leadership government administration animal symbol"
    ],
    weight: 4.2
  },
  creative: {
    keywords: new Set([
      "song", "poem", "poetry", "story", "stories", "tale", "tales",
      "compose", "sing", "lyric", "lyrics", "ballad", "lullaby",
      "sonnet", "haiku", "verse", "rhyme", "rhymes", "creative",
      "fiction", "novel", "narrative", "narrator", "prose",
      "dialogue", "monologue", "soliloquy", "screenplay",
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
      "baby", "child", "children", "lullaby",
      "rain", "ocean", "forest", "mountain", "river",
      "letter", "diary", "journal", "greeting", "card", "birthday", "sweet"
    ]),
    boostPhrases: [
      "creative writing poetry prose fiction",
      "emotional soliloquy melancholy storytelling",
      "lyrical ballad verse expressive narrative",
      "poetic monologue metaphor evocative"
    ],
    weight: 4.0
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
      "git", "docker", "dockerfile", "kubernetes", "ingress", "nginx", "controller",
      "deploy", "ci", "cd", "bash", "shell", "script", "s3", "backup",
      "bug", "fix", "error", "exception", "crash", "typeerror", "undefined",
      "class", "object", "interface", "struct", "enum",
      "loop", "recursion", "sort", "search", "hash",
      "binary", "tree", "graph", "linked", "list", "queue", "deque",
      "atomic", "mutex", "semaphore", "deadlock",
      "kernel", "syscall", "linux", "operating",
      "architecture", "microservice", "pipeline",
      "optimization", "performance", "benchmark", "latency",
      "test", "testing", "unittest", "pytest",
      "refactor", "implement", "implementation",
      "css", "flexbox", "div", "html", "style", "frontend", "center",
      "prime", "primes", "sieve", "eratosthenes", "fibonacci", "reverse", "linkedlist"
    ]),
    boostPhrases: [
      "software engineering programming algorithms systems",
      "lock-free concurrent memory buffer Rust C++ python javascript",
      "debugging optimization performance code database sql",
      "implementation architecture pipeline docker kubernetes"
    ],
    weight: 4.2
  },
  math: {
    keywords: new Set([
      "prove", "proof", "theorem", "lemma", "corollary", "induction",
      "derive", "derivation", "equation", "formula", "quadratic",
      "calculus", "integral", "derivative", "differential",
      "algebra", "linear", "matrix", "vector", "eigenvalue",
      "topology", "manifold", "metric", "tensor", "curvature",
      "geometry", "euclidean", "riemannian", "geodesic", "hypotenuse", "triangle",
      "circle", "area", "radius", "diameter", "circumference",
      "probability", "statistics", "distribution", "variance", "dice",
      "hypothesis", "conjecture", "axiom", "postulate",
      "trigonometry", "sine", "cosine", "tangent",
      "logarithm", "exponential", "polynomial", "power", "exponent",
      "square", "root", "sqrt", "percent", "percentage", "tip",
      "convergence", "divergence", "limit", "series", "sum", "integers",
      "riemann", "euler", "lagrange", "lagrangian",
      "hamiltonian", "schwarzschild", "christoffel",
      "navier-stokes", "fourier", "laplace",
      "quantum", "relativity", "spacetime", "gravity", "heisenberg", "planck",
      "physics", "thermodynamics", "entropy", "speed", "light", "vacuum",
      "mathematical", "computation", "numerical", "arithmetic", "calculate", "solve"
    ]),
    boostPhrases: [
      "mathematical proof theorem derivation formal logic",
      "tensor curvature differential calculus physics",
      "analytical reasoning verification axiom equation",
      "symbolic computation equations square root arithmetic"
    ],
    weight: 4.2
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

  _detectDomainSignals(tokens, rawText = "") {
    const textLower = rawText.toLowerCase();
    const tokenSet = new Set();
    for (const t of tokens) {
      tokenSet.add(t);
      if (t.endsWith("'s")) tokenSet.add(t.slice(0, -2));
      if (t.endsWith("s") && t.length > 3) tokenSet.add(t.slice(0, -1));
    }
    const signals = {};

    // 1. High-priority compound intent detection
    const isCodeIntent = /(?:write|give|create|implement)\s+(?:me\s+)?(?:a\s+)?(?:code|program|script|function|algorithm|query|sql|dockerfile|regex)|code\s+to|script\s+to|sql\s+query|second\s+highest\s+salary|prime\s+number|binary\s+search|center\s+(?:a\s+)?div|fibonacci|sort\s+array|reverse\s+linked|dockerfile|docker-compose|containerize|css\s+flexbox|git\s+(?:command|commit|rebase|merge)|fastapi|express\s+js|acid\s+properties|rest\s+and\s+graphql|box\s+model|cors|rate\s+limiting|thread\s+pool|zero\s+allocation|ring\s+buffer|quicksort|debounce|throttle|webpack|beautifulsoup|lru\s+cache|jwt\s+authentication|sql\s+injection|terraform/i.test(textLower);
    const isCreativeIntent = /(?:write|compose|craft|narrate)\s+(?:me\s+)?(?:a\s+)?(?:poem|song|lyrics|story|ballad|soliloquy|monologue|lullaby|haiku|sonnet|verse|tale|speech|letter)|tell\s+me\s+a\s+story|tell\s+a\s+(?:poignant|atmospheric|heartfelt|haunting)|melanchol|atmospheric\s+fantasy|lyrical\s+ballad|poetic\s+monologue|haunting\s+tale|dramatic\s+speech/i.test(textLower);
    const isMathIntent = /(?:square\s*root|sqrt|percent\s+of|percentage|hypotenuse|solve\s+\d+x|pythagor|derive|curvature\s+tensor|schwarzschild|christoffel|integral\s+of|derivative\s+of|prove\s+by\s+induction|riemann\s+hypothesis|navier-stokes|euler-lagrange|kinetic\s+energy|standard\s+deviation)/i.test(textLower);
    const isKnowledgeIntent = /(?:capital\s+of|national\s+(?:animal|bird|flower|anthem|tree|song|emblem)|chief\s+minister|prime\s+minister|president\s+of|governor\s+of|administrator\s+of|how\s+many\s+(?:talukas|districts|bones|continents|planets|states|oceans|medals|runs)|who\s+(?:is|was|invented|discovered|wrote|founded|scored|won)|what\s+(?:is|was|does|are)\s+(?:the\s+)?(?:capital|currency|language|symbol|atomic\s+number|highest|longest|nearest|fastest|hottest|largest|smallest|boiling|speed\s+of\s+light|earth\s+gravitational)|dna\s+stand|universal\s+donor|blood\s+group|powerhouse\s+of|speed\s+of\s+light|gravitational\s+acceleration|boiling\s+point|suez\s+canal|panama\s+canal|world\s+war|republic\s+day|independence|aldona|panaji|talukas|ramayana|mahabharata|gitanjali|eiffel|pyramid|taj\s+mahal|colosseum|great\s+wall|olympic|fifa|solar\s+system)/i.test(textLower);

    for (const [domain, config] of Object.entries(DOMAIN_SIGNALS)) {
      let matchCount = 0;
      for (const kw of tokenSet) {
        if (config.keywords.has(kw)) matchCount++;
      }
      if (matchCount > 0) {
        signals[domain] = Math.min(2.5, matchCount / 2.0);
      }
    }

    if (isCreativeIntent) {
      signals.creative = 4.2;
      delete signals.code;
      delete signals.math;
      delete signals.knowledge;
    } else if (isCodeIntent) {
      signals.code = 4.2;
      delete signals.creative;
      delete signals.knowledge;
      delete signals.math;
    } else if (isMathIntent) {
      signals.math = 4.2;
      delete signals.creative;
      delete signals.knowledge;
    } else if (isKnowledgeIntent) {
      signals.knowledge = 4.2;
      delete signals.creative;
      delete signals.math;
      delete signals.code;
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
    const domainSignals = this._detectDomainSignals(tokens, text);
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
