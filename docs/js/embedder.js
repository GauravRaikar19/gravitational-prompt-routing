/**
 * Client-Side Deterministic Feature Vectorizer for Cognitive Topography Mapping
 */

const STOPWORDS = new Set([
  "the", "a", "an", "is", "in", "it", "of", "and", "or", "to", "for", "with",
  "on", "at", "by", "from", "as", "this", "that", "are", "was", "were", "be",
  "been", "being", "have", "has", "had", "do", "does", "did", "who", "which"
]);

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

  embedText(text) {
    if (!text || text.trim() === "") {
      const vec = new Float32Array(this.dimension);
      vec[0] = 1.0;
      return vec;
    }

    const vec = new Float32Array(this.dimension);
    const tokens = text.toLowerCase().match(/[a-zA-Z0-9_\-\+\*\#]+/g) || [];

    for (const token of tokens) {
      const isStopword = STOPWORDS.has(token);
      const weight = isStopword ? 0.1 : Math.min(3.0, 1.0 + 0.3 * token.length);

      // Word-level hash
      const h = fnv1a(`${this.seed}:${token}`);
      const idx = h % this.dimension;
      const sign = (h & 0x100) ? 1.0 : -1.0;
      vec[idx] += weight * sign;

      // 3-grams for non-stopwords
      if (!isStopword && token.length >= 3) {
        for (let i = 0; i <= token.length - 3; i++) {
          const tri = token.slice(i, i + 3);
          const hTri = fnv1a(`${this.seed}:tri:${tri}`);
          const idxTri = hTri % this.dimension;
          const signTri = (hTri & 0x100) ? 1.0 : -1.0;
          vec[idxTri] += 0.5 * signTri;
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
