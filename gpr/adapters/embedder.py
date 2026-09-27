"""
Embedder abstractions and default deterministic vectorizer for Cognitive Topography Mapping.
"""

from abc import ABC, abstractmethod
import hashlib
import numpy as np


class BaseEmbedder(ABC):
    """Abstract base class for semantic space embedding providers."""

    @abstractmethod
    def embed_text(self, text: str) -> np.ndarray:
        """Embeds single text string into a normalized 1D numpy array."""
        pass

    def embed_batch(self, texts: list) -> np.ndarray:
        """Embeds a list of texts into a 2D numpy array [N, D]."""
        return np.array([self.embed_text(t) for t in texts])


class DeterministicEmbedder(BaseEmbedder):
    """
    Lightweight, deterministic feature hashing embedder.
    Runs anywhere with zero external network downloads or heavy weights.
    Maps words, character n-grams, and structural tokens onto an orthogonalized unit sphere.

    Includes domain-aware keyword boosting to improve routing accuracy for short
    or ambiguous prompts where pure hash-based embedding lacks semantic signal.
    """

    STOPWORDS = {
        "the", "a", "an", "is", "in", "it", "of", "and", "or", "to", "for", "with",
        "on", "at", "by", "from", "as", "this", "that", "are", "was", "were", "be",
        "been", "being", "have", "has", "had", "do", "does", "did", "who", "which",
        "me", "my", "i", "you", "your", "we", "us", "our", "can", "could",
        "would", "should", "will", "shall", "may", "might", "about", "just",
        "some", "any", "no", "not", "so", "but", "if", "then", "than",
    }

    # Domain signal keywords — when detected in a prompt, these inject a synthetic
    # semantic boost toward the corresponding domain axis. The boost tokens are
    # hashed exactly like domain exemplar phrases, pulling the prompt embedding
    # closer to the correct model centroid.
    DOMAIN_SIGNALS = {
        "creative": {
            "keywords": {
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
                "baby", "child", "children", "lullaby",
                "rain", "ocean", "forest", "mountain", "river",
                "letter", "diary", "journal",
            },
            "boost_phrases": [
                "creative writing poetry prose fiction",
                "emotional soliloquy melancholy storytelling",
                "lyrical ballad verse expressive narrative",
                "poetic monologue metaphor evocative",
            ],
            "weight": 3.5,
        },
        "code": {
            "keywords": {
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
                "refactor", "implement", "implementation",
            },
            "boost_phrases": [
                "software engineering programming algorithms systems",
                "lock-free concurrent memory buffer Rust C++",
                "debugging optimization performance code",
                "implementation architecture pipeline",
            ],
            "weight": 3.0,
        },
        "math": {
            "keywords": {
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
                "mathematical", "computation", "numerical",
            },
            "boost_phrases": [
                "mathematical proof theorem derivation formal logic",
                "tensor curvature differential calculus physics",
                "analytical reasoning verification axiom",
                "symbolic computation equations",
            ],
            "weight": 4.2,
        },
        "knowledge": {
            "keywords": {
                "capital", "currency", "language", "official", "president", "minister", "prime",
                "chief", "governor", "administrator", "country", "countries", "nation", "nations",
                "state", "states", "city", "cities", "history", "historical", "geography", "geographical",
                "animal", "bird", "flower", "anthem", "song", "tree", "emblem", "taluka", "talukas",
                "district", "districts", "bone", "bones", "body", "human", "organ", "cell", "mitochondria",
                "dna", "blood", "planet", "planets", "solar", "system", "earth", "moon", "sun",
                "light", "gravity", "acceleration", "boiling", "point", "water", "temperature",
                "mountain", "river", "ocean", "continents", "war", "independence", "republic",
                "constitution", "founder", "founded", "invented", "discovered", "symbol", "atomic",
                "element", "elements", "chemical", "olympic", "fifa", "world", "canal",
            },
            "boost_phrases": [
                "world geography history governance sovereign nations",
                "political leadership state ministers factual QA",
                "encyclopedic reasoning historical entities science",
                "capital city official language currency",
            ],
            "weight": 4.2,
        },
    }

    def __init__(self, dimension: int = 128, seed: int = 42):
        self.dimension = dimension
        self.seed = seed

    def _hash_token(self, token: str) -> tuple:
        """Returns (index, sign) for a given token using MD5 hash."""
        h = int(hashlib.md5(f"{self.seed}:{token}".encode("utf-8")).hexdigest(), 16)
        idx = h % self.dimension
        sign = 1.0 if ((h >> 8) & 1) else -1.0
        return idx, sign, h

    def _hash_trigram(self, trigram: str) -> tuple:
        """Returns (index, sign) for a given character trigram using SHA256 hash."""
        h = int(hashlib.sha256(f"{self.seed}:tri:{trigram}".encode("utf-8")).hexdigest(), 16)
        idx = h % self.dimension
        sign = 1.0 if ((h >> 8) & 1) else -1.0
        return idx, sign

    def _detect_domain_signal(self, tokens: list, raw_text: str = "") -> dict:
        """
        Detects which domain(s) the prompt tokens signal toward.
        Returns a dict mapping domain_name -> match_strength (0.0 to 1.0+)
        """
        import re
        text_lower = raw_text.lower()
        token_set = set(tokens)
        signals = {}

        # 1. High-priority compound intent detection matching client engine
        is_code_intent = bool(re.search(
            r"(?:write|give|create|implement)\s+(?:me\s+)?(?:a\s+)?(?:code|program|script|function|algorithm|query|sql|dockerfile|regex)|code\s+to|script\s+to|sql\s+query|second\s+highest\s+salary|prime\s+number|binary\s+search|center\s+(?:a\s+)?div|fibonacci|sort\s+array|reverse\s+linked|dockerfile|docker-compose|containerize|css\s+flexbox|git\s+(?:command|commit|rebase|merge)|fastapi|express\s+js|acid\s+properties|rest\s+and\s+graphql|box\s+model|cors|rate\s+limiting|thread\s+pool|zero\s+allocation|ring\s+buffer|quicksort|debounce|throttle|webpack|beautifulsoup|lru\s+cache|jwt\s+authentication|sql\s+injection|terraform",
            text_lower
        ))
        is_creative_intent = bool(re.search(
            r"(?:write|compose|craft|narrate)\s+(?:me\s+)?(?:a\s+)?(?:poem|song|lyrics|story|ballad|soliloquy|monologue|lullaby|haiku|sonnet|verse|tale|speech|letter)|tell\s+me\s+a\s+story|tell\s+a\s+(?:poignant|atmospheric|heartfelt|haunting)|melanchol|atmospheric\s+fantasy|lyrical\s+ballad|poetic\s+monologue|haunting\s+tale|dramatic\s+speech",
            text_lower
        ))
        is_math_intent = bool(re.search(
            r"(?:square\s*root|sqrt|percent\s+of|percentage|hypotenuse|solve\s+\d+x|pythagor|derive|curvature\s+tensor|schwarzschild|christoffel|integral\s+of|derivative\s+of|prove\s+by\s+induction|riemann\s+hypothesis|navier-stokes|euler-lagrange|kinetic\s+energy|standard\s+deviation)",
            text_lower
        ))
        is_knowledge_intent = bool(re.search(
            r"(?:capital\s+of|national\s+(?:animal|bird|flower|anthem|tree|song|emblem)|chief\s+minister|prime\s+minister|president\s+of|governor\s+of|administrator\s+of|how\s+many\s+(?:talukas|districts|bones|continents|planets|states|oceans|medals|runs)|who\s+(?:is|was|invented|discovered|wrote|founded|scored|won)|what\s+(?:is|was|does|are)\s+(?:the\s+)?(?:capital|currency|language|symbol|atomic\s+number|highest|longest|nearest|fastest|hottest|largest|smallest|boiling|speed\s+of\s+light|earth\s+gravitational)|dna\s+stand|universal\s+donor|blood\s+group|powerhouse\s+of|speed\s+of\s+light|gravitational\s+acceleration|boiling\s+point|suez\s+canal|panama\s+canal|world\s+war|republic\s+day|independence|aldona|panaji|talukas|ramayana|mahabharata|gitanjali|eiffel|pyramid|taj\s+mahal|colosseum|great\s+wall|olympic|fifa|solar\s+system)",
            text_lower
        ))

        for domain, config in self.DOMAIN_SIGNALS.items():
            matches = token_set & config["keywords"]
            if matches:
                signals[domain] = min(2.5, len(matches) / 2.0)

        if is_creative_intent:
            signals = {"creative": 4.2}
        elif is_code_intent:
            signals = {"code": 4.2}
        elif is_math_intent:
            signals = {"math": 4.2}
        elif is_knowledge_intent:
            signals = {"knowledge": 4.2}

        return signals

    def embed_text(self, text: str) -> np.ndarray:
        """
        Embeds text into a unit vector in R^dimension using seeded multi-hash projection
        with salience weighting and domain-aware keyword boosting.
        """
        if not text:
            vec = np.zeros(self.dimension, dtype=np.float32)
            vec[0] = 1.0
            return vec

        vec = np.zeros(self.dimension, dtype=np.float32)
        import re
        tokens = re.findall(r"[a-zA-Z0-9_\-\+\*\#]+", text.lower())

        # 1. Salience-weighted word tokens
        for token in tokens:
            weight = 0.1 if token in self.STOPWORDS else min(3.0, 1.0 + 0.3 * len(token))
            idx, sign, h = self._hash_token(token)
            vec[idx] += weight * sign

            # Subword 3-grams for non-stopwords
            if token not in self.STOPWORDS and len(token) >= 3:
                for i in range(len(token) - 2):
                    trigram = token[i : i + 3]
                    idx_tri, sign_tri = self._hash_trigram(trigram)
                    vec[idx_tri] += 0.5 * sign_tri

        # 2. Domain-aware keyword boosting
        domain_signals = self._detect_domain_signal(tokens, raw_text=text)
        for domain, strength in domain_signals.items():
            config = self.DOMAIN_SIGNALS.get(domain)
            if not config:
                continue
            boost_weight = config["weight"] * strength

            for phrase in config["boost_phrases"]:
                phrase_tokens = phrase.lower().split()
                for pt in phrase_tokens:
                    idx, sign, _ = self._hash_token(pt)
                    vec[idx] += boost_weight * sign * 0.4

                    if len(pt) >= 3:
                        for i in range(len(pt) - 2):
                            trigram = pt[i : i + 3]
                            idx_tri, sign_tri = self._hash_trigram(trigram)
                            vec[idx_tri] += boost_weight * sign_tri * 0.2

        # Unit normalization
        norm = np.linalg.norm(vec)
        if norm > 1e-9:
            return vec / norm
        else:
            vec[0] = 1.0
            return vec


class SentenceTransformerEmbedder(BaseEmbedder):
    """
    Adapter for HuggingFace sentence-transformers (optional).
    """

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        try:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer(model_name)
        except ImportError:
            raise ImportError(
                "sentence-transformers is not installed. Install with 'pip install sentence-transformers' "
                "or use DeterministicEmbedder for zero-dependency operation."
            )

    def embed_text(self, text: str) -> np.ndarray:
        emb = self.model.encode(text, normalize_embeddings=True)
        return np.array(emb, dtype=np.float32)


def get_default_embedder(prefer_ml: bool = False, dimension: int = 128) -> BaseEmbedder:
    """
    Factory function returning the best available embedder.
    Falls back gracefully to DeterministicEmbedder.
    """
    if prefer_ml:
        try:
            return SentenceTransformerEmbedder()
        except ImportError:
            pass
    return DeterministicEmbedder(dimension=dimension)
