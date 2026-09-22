/**
 * Gravitational Vector Field & Particle Orbital Simulation
 */

export class GravitationalEngine {
  constructor(embedder, options = {}) {
    this.embedder = embedder;
    this.G = options.G ?? 1.0;
    this.epsilon = options.epsilon ?? 0.08;
    this.delta = options.delta ?? 3.0;
    this.lagrangeThreshold = options.lagrangeThreshold ?? 0.15;
    this.lambdaCost = options.lambdaCost ?? 0.0;
    this.lambdaLatency = options.lambdaLatency ?? 0.0;
    this.singularities = [];
  }

  setSingularities(singularities) {
    this.singularities = singularities.map(s => {
      // Precompute centroid vector from description and domain exemplars
      const texts = [s.description, ...(s.exemplars || [])];
      const vecs = texts.map(t => this.embedder.embedText(t));

      const dim = this.embedder.dimension;
      const centroid = new Float32Array(dim);
      for (const v of vecs) {
        for (let i = 0; i < dim; i++) {
          centroid[i] += v[i] / vecs.length;
        }
      }

      // Normalize centroid
      let sumSq = 0;
      for (let i = 0; i < dim; i++) sumSq += centroid[i] * centroid[i];
      const norm = Math.sqrt(sumSq) || 1.0;
      for (let i = 0; i < dim; i++) centroid[i] /= norm;

      return {
        ...s,
        centroidVec: centroid,
        activeMass: s.mass
      };
    });
  }

  evaluatePrompt(promptText) {
    const promptVec = this.embedder.embedText(promptText);
    const promptInertia = this.embedder.calculatePromptInertia(promptText);

    const results = this.singularities.map(s => {
      // 1. Geodesic distance on unit hypersphere
      let dot = 0.0;
      for (let i = 0; i < this.embedder.dimension; i++) {
        dot += promptVec[i] * s.centroidVec[i];
      }
      dot = Math.max(-1.0, Math.min(1.0, dot));
      const geodesicDist = Math.sqrt(Math.max(0.0, 2.0 * (1.0 - dot))) + this.epsilon;

      // 2. Relativistic dampening
      const normCost = s.costPerM / 10.0;
      const normLat = s.latencyMs / 1000.0;
      const dampening = Math.exp(- (this.lambdaCost * normCost) - (this.lambdaLatency * normLat));

      // 3. Gravitational pull force
      const force = this.G * (s.activeMass * promptInertia) / Math.pow(geodesicDist, this.delta) * dampening;

      return {
        singularity: s,
        distance: geodesicDist,
        dampening: dampening,
        force: force
      };
    });

    // Sort descending by net force
    results.sort((a, b) => b.force - a.force);

    // Calculate shares
    const totalForce = results.reduce((acc, r) => acc + r.force, 0) || 1.0;
    results.forEach(r => {
      r.sharePercent = (r.force / totalForce) * 100.0;
    });

    const primary = results[0];
    const secondary = results[1] || null;

    let isLagrange = false;
    let lagrangeMargin = 1.0;

    if (secondary && primary.force > 1e-9) {
      lagrangeMargin = (primary.force - secondary.force) / primary.force;
      if (lagrangeMargin < this.lagrangeThreshold) {
        isLagrange = true;
      }
    }

    return {
      promptText,
      promptInertia,
      primary,
      secondary,
      isLagrange,
      lagrangeMargin,
      results
    };
  }
}
