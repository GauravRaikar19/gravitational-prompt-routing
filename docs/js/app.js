import { INITIAL_SINGULARITIES, PRESET_PROMPTS, DEFAULT_G, DEFAULT_EPSILON, DEFAULT_DELTA, DEFAULT_LAGRANGE_THRESHOLD } from "./constants.js?v=7.0";
import { ClientEmbedder } from "./embedder.js?v=7.0";
import { GravitationalEngine } from "./physics.js?v=7.0";
import { ModelResponseGenerator } from "./generator.js?v=7.0";

// DOM Elements
const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");
const promptInput = document.getElementById("promptInput");
const presetContainer = document.getElementById("presetContainer");
const routeBtn = document.getElementById("routeBtn");

// Sliders & value displays
const costSlider = document.getElementById("costSlider");
const costVal = document.getElementById("costVal");
const latencySlider = document.getElementById("latencySlider");
const latencyVal = document.getElementById("latencyVal");
const deltaSlider = document.getElementById("deltaSlider");
const deltaVal = document.getElementById("deltaVal");

// Telemetry DOM
const statusBadge = document.getElementById("statusBadge");
const lagrangeNotice = document.getElementById("lagrangeNotice");
const barsContainer = document.getElementById("barsContainer");
const dispatchCard = document.getElementById("dispatchCard");
const dispatchContent = document.getElementById("dispatchContent");

// Live Execution Terminal DOM
const activeModelPill = document.getElementById("activeModelPill");
const pipelinePill = document.getElementById("pipelinePill");
const generationStatus = document.getElementById("generationStatus");
const terminalPlaceholder = document.getElementById("terminalPlaceholder");
const liveStreamContainer = document.getElementById("liveStreamContainer");
const liveStreamText = document.getElementById("liveStreamText");
const terminalGlow = document.getElementById("terminalGlow");

// Modal DOM
const configModal = document.getElementById("configModal");
const openConfigBtn = document.getElementById("openConfigBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveConfigBtn = document.getElementById("saveConfigBtn");
const ollamaSettings = document.getElementById("ollamaSettings");
const cloudSettings = document.getElementById("cloudSettings");
const ollamaUrlInput = document.getElementById("ollamaUrlInput");
const cloudKeyInput = document.getElementById("cloudKeyInput");
const cloudEndpointInput = document.getElementById("cloudEndpointInput");
const cloudModelInput = document.getElementById("cloudModelInput");

// Initialize Engine & Generator
const embedder = new ClientEmbedder(128, 42);
const generator = new ModelResponseGenerator();
const engine = new GravitationalEngine(embedder, {
  G: DEFAULT_G,
  epsilon: DEFAULT_EPSILON,
  delta: DEFAULT_DELTA,
  lagrangeThreshold: DEFAULT_LAGRANGE_THRESHOLD,
  lambdaCost: parseFloat(costSlider.value),
  lambdaLatency: parseFloat(latencySlider.value),
});
engine.setSingularities(INITIAL_SINGULARITIES);

// Particle Simulation State
let currentEvaluation = null;
let particle = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  trail: [],
  targetPos: { x: 0, y: 0 },
  orbitAngle: 0,
  active: false,
};

// Canvas Resolution & Resize
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Coordinate transforms: Normalized (-1 to 1) -> Screen px
function toScreenX(normX) {
  const rect = canvas.getBoundingClientRect();
  const scale = Math.min(rect.width, rect.height) * 0.42;
  return rect.width / 2 + normX * scale;
}
function toScreenY(normY) {
  const rect = canvas.getBoundingClientRect();
  const scale = Math.min(rect.width, rect.height) * 0.42;
  return rect.height / 2 + normY * scale;
}

// Background Starfield
const STARS = Array.from({ length: 90 }, () => ({
  x: Math.random(),
  y: Math.random(),
  size: Math.random() * 1.5 + 0.5,
  alpha: Math.random() * 0.7 + 0.3,
  speed: Math.random() * 0.005 + 0.002,
}));

function drawStarfield(width, height) {
  for (const s of STARS) {
    s.alpha += s.speed;
    const a = Math.abs(Math.sin(s.alpha)) * 0.6 + 0.2;
    ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
    ctx.beginPath();
    ctx.arc(s.x * width, s.y * height, s.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Draw Potential Contours / Equipotential Rings
function drawPotentialField(width, height) {
  if (!currentEvaluation) return;

  const singularities = engine.singularities;
  ctx.save();
  ctx.lineWidth = 1;

  for (const s of singularities) {
    const sx = toScreenX(s.canvasPos.x);
    const sy = toScreenY(s.canvasPos.y);

    const pullRatio = (currentEvaluation.results.find(r => r.singularity.id === s.id)?.sharePercent || 33) / 100.0;
    const rings = 4;

    for (let r = 1; r <= rings; r++) {
      const radius = r * 28 + (pullRatio * 35);
      const ringAlpha = Math.max(0.04, (pullRatio * 0.25) / r);

      ctx.strokeStyle = s.color;
      ctx.globalAlpha = ringAlpha;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

// Draw Celestial Model Singularities
function drawSingularities() {
  const singularities = engine.singularities;

  for (const s of singularities) {
    const sx = toScreenX(s.canvasPos.x);
    const sy = toScreenY(s.canvasPos.y);

    const isPrimary = currentEvaluation?.primary?.singularity.id === s.id;
    const isSecondary = currentEvaluation?.secondary?.singularity.id === s.id && currentEvaluation?.isLagrange;

    // Atmospheric Glow
    const glowRadius = isPrimary ? 55 : (isSecondary ? 45 : 32);
    const gradient = ctx.createRadialGradient(sx, sy, 8, sx, sy, glowRadius);
    gradient.addColorStop(0, s.glowColor);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Central Core
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(sx, sy, isPrimary ? 12 : 9, 0, Math.PI * 2);
    ctx.fill();

    // Rotating orbital ring
    ctx.save();
    ctx.strokeStyle = s.color;
    ctx.globalAlpha = isPrimary ? 0.8 : 0.4;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(sx, sy, isPrimary ? 22 : 16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Model Name & Role Label
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 13px 'Outfit', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(s.name, sx, sy - 28);

    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "400 10px 'Inter', sans-serif";
    ctx.fillText(s.role, sx, sy - 15);
  }
}

// Draw Prompt Particle & Trajectory Trail
function drawParticle() {
  if (!particle.active) return;

  const px = toScreenX(particle.x);
  const py = toScreenY(particle.y);

  // Render Trail
  if (particle.trail.length > 1) {
    ctx.save();
    for (let i = 1; i < particle.trail.length; i++) {
      const p1 = particle.trail[i - 1];
      const p2 = particle.trail[i];
      const alpha = (i / particle.trail.length) * 0.8;

      ctx.strokeStyle = currentEvaluation?.isLagrange
        ? `rgba(236, 72, 153, ${alpha})` // Pink for Lagrange
        : `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = (i / particle.trail.length) * 3.5;
      ctx.beginPath();
      ctx.moveTo(toScreenX(p1.x), toScreenY(p1.y));
      ctx.lineTo(toScreenX(p2.x), toScreenY(p2.y));
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw Glowing Particle Head
  const glow = ctx.createRadialGradient(px, py, 2, px, py, 14);
  glow.addColorStop(0, "#ffffff");
  glow.addColorStop(0.4, currentEvaluation?.isLagrange ? "#ec4899" : (currentEvaluation?.primary?.singularity.color || "#00f2fe"));
  glow.addColorStop(1, "transparent");

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(px, py, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(px, py, 3.5, 0, Math.PI * 2);
  ctx.fill();
}

// Update Particle Physics per Frame
function updateParticlePhysics() {
  if (!particle.active || !currentEvaluation) return;

  // Add current pos to trail
  particle.trail.push({ x: particle.x, y: particle.y });
  if (particle.trail.length > 45) {
    particle.trail.shift();
  }

  if (currentEvaluation.isLagrange && currentEvaluation.secondary) {
    // FIGURE-8 ORBIT between primary and secondary singularities
    particle.orbitAngle += 0.045;
    const pPos = currentEvaluation.primary.singularity.canvasPos;
    const sPos = currentEvaluation.secondary.singularity.canvasPos;

    const midX = (pPos.x + sPos.x) / 2;
    const midY = (pPos.y + sPos.y) / 2;
    const spanX = (pPos.x - sPos.x) * 0.65;
    const spanY = (pPos.y - sPos.y) * 0.65;

    // Lissajous figure-8
    const targetX = midX + Math.sin(particle.orbitAngle) * spanX;
    const targetY = midY + Math.sin(particle.orbitAngle * 2) * spanY * 0.6;

    particle.x += (targetX - particle.x) * 0.12;
    particle.y += (targetY - particle.y) * 0.12;
  } else {
    // DIRECT WELL CAPTURE & STABLE ORBIT
    const primaryPos = currentEvaluation.primary.singularity.canvasPos;
    const dx = primaryPos.x - particle.x;
    const dy = primaryPos.y - particle.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0.18) {
      // Accelerate toward well
      particle.vx += dx * 0.025;
      particle.vy += dy * 0.025;
      particle.vx *= 0.88;
      particle.vy *= 0.88;
      particle.x += particle.vx;
      particle.y += particle.vy;
    } else {
      // Circular capture orbit
      particle.orbitAngle += 0.055;
      const orbitR = 0.12;
      const targetX = primaryPos.x + Math.cos(particle.orbitAngle) * orbitR;
      const targetY = primaryPos.y + Math.sin(particle.orbitAngle) * orbitR;

      particle.x += (targetX - particle.x) * 0.2;
      particle.y += (targetY - particle.y) * 0.2;
    }
  }
}

// Main 60 FPS Render Loop
function renderLoop() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);

  drawStarfield(rect.width, rect.height);
  drawPotentialField(rect.width, rect.height);
  drawSingularities();
  updateParticlePhysics();
  drawParticle();

  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);

// Trigger Routing Evaluation & UI Update
function executeRouting() {
  const text = promptInput.value.trim();
  if (!text) return;

  const result = engine.evaluatePrompt(text);
  currentEvaluation = result;

  // Reset Particle to Origin (Center)
  particle = {
    x: 0,
    y: 0,
    vx: (Math.random() - 0.5) * 0.02,
    vy: (Math.random() - 0.5) * 0.02,
    trail: [],
    targetPos: { ...result.primary.singularity.canvasPos },
    orbitAngle: 0,
    active: true,
  };

  updateTelemetryUI(result);
  triggerGeneration(result);
}

// Markdown-to-HTML Formatter with Code Blocks & Grouped Blockquotes
function formatMarkdown(raw) {
  if (!raw) return "";
  let out = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Fenced Code blocks: ```lang ... ```
  out = out.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gim, (m, lang, code) => {
    return `<div class="code-block-wrapper"><div class="code-block-header">${lang || "CODE"}</div><pre class="code-block"><code>${code.trim()}</code></pre></div>`;
  });

  // Inline code: `code`
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Bold **text**
  out = out.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Headings
  out = out.replace(/^#### (.*$)/gim, "<h5>$1</h5>");
  out = out.replace(/^### (.*$)/gim, "<h4>$1</h4>");
  out = out.replace(/^## (.*$)/gim, "<h3>$1</h3>");

  // Group consecutive blockquote lines into a single coherent blockquote box
  out = out.replace(/((?:^&gt;[^\n]*\n?)+)/gm, (match) => {
    const cleaned = match.replace(/^&gt;\s?/gm, "").trim();
    return `<blockquote>${cleaned.replace(/\n/g, "<br>")}</blockquote>`;
  });

  return out;
}

// Trigger Live Stream Response
let currentGenToken = 0;

function triggerGeneration(result) {
  const { primary, secondary, isLagrange } = result;
  const genToken = ++currentGenToken;

  activeModelPill.textContent = primary.singularity.name;
  activeModelPill.style.color = primary.singularity.color;
  activeModelPill.style.borderColor = primary.singularity.color;
  terminalGlow.style.background = primary.singularity.color;
  terminalGlow.style.boxShadow = `0 0 10px ${primary.singularity.color}`;

  if (isLagrange && secondary) {
    pipelinePill.classList.remove("hidden");
    pipelinePill.style.display = "inline-block";
  } else {
    pipelinePill.classList.add("hidden");
    pipelinePill.style.display = "none";
  }

  terminalPlaceholder.classList.add("hidden");
  terminalPlaceholder.style.display = "none";
  liveStreamContainer.classList.remove("hidden");
  liveStreamContainer.style.display = "block";
  liveStreamText.innerHTML = "";
  generationStatus.textContent = "Streaming response...";

  generator.generateResponse(
    result,
    (chunk) => {
      if (genToken === currentGenToken) {
        liveStreamText.innerHTML = formatMarkdown(chunk);
      }
    },
    () => {
      if (genToken === currentGenToken) {
        generationStatus.textContent = "Generation Complete ✓";
      }
    }
  );
}

// Update Telemetry Panel
function updateTelemetryUI(result) {
  const { primary, secondary, isLagrange, lagrangeMargin, results, promptInertia } = result;

  // Status Badge
  if (isLagrange) {
    statusBadge.className = "status-badge status-lagrange";
    statusBadge.innerHTML = `⚠️ LAGRANGIAN RESONANCE (Margin: ${(lagrangeMargin * 100).toFixed(1)}%)`;
    lagrangeNotice.classList.remove("hidden");
    lagrangeNotice.innerHTML = `
      <strong>Orbital Co-Processing Triggered:</strong> Prompt falls into gravitational equilibrium between 
      <span style="color: ${primary.singularity.color}">${primary.singularity.name}</span> and 
      <span style="color: ${secondary.singularity.color}">${secondary.singularity.name}</span>.
    `;
  } else {
    statusBadge.className = "status-badge status-stable";
    statusBadge.innerHTML = `🟢 STABLE WELL CAPTURE: ${primary.singularity.name}`;
    lagrangeNotice.classList.add("hidden");
  }

  // Force Distribution Bars
  barsContainer.innerHTML = "";
  for (const r of results) {
    const isDominant = r.singularity.id === primary.singularity.id;
    const isCoOrbit = isLagrange && secondary && r.singularity.id === secondary.singularity.id;

    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <div class="bar-header">
        <span class="bar-name">
          <span class="singularity-dot" style="background: ${r.singularity.color}"></span>
          <strong>${r.singularity.name}</strong>
          ${isDominant ? '<span class="pill-dominant">Dominant</span>' : ""}
          ${isCoOrbit ? '<span class="pill-coorbit">Co-Orbit</span>' : ""}
        </span>
        <span class="bar-stats">
          F = <strong>${r.force.toFixed(1)}</strong> 
          <span class="muted">(r=${r.distance.toFixed(2)}, share=${r.sharePercent.toFixed(1)}%)</span>
        </span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${r.sharePercent}%; background: ${r.singularity.color};"></div>
      </div>
    `;
    barsContainer.appendChild(row);
  }

  // Simulated Dispatch Output
  dispatchCard.classList.remove("hidden");
  if (isLagrange) {
    dispatchContent.innerHTML = `
      <div class="dispatch-header">
        <span class="dispatch-tag" style="background: rgba(236, 72, 153, 0.2); color: #f472b6;">
          Dual Resonant Pipeline
        </span>
        <span class="dispatch-latency">Latency: ~${Math.max(primary.singularity.latencyMs, secondary.singularity.latencyMs)} ms</span>
      </div>
      <p><strong>[${primary.singularity.name}]</strong> Formulated mathematical & structural core representation.</p>
      <p><strong>[${secondary.singularity.name}]</strong> Synthesized stylistic nuance, tonal prose, and harmonic completion.</p>
    `;
  } else {
    dispatchContent.innerHTML = `
      <div class="dispatch-header">
        <span class="dispatch-tag" style="background: ${primary.singularity.glowColor}; color: ${primary.singularity.color};">
          ${primary.singularity.name}
        </span>
        <span class="dispatch-latency">Latency: ~${primary.singularity.latencyMs} ms | Cost: $${primary.singularity.costPerM}/1M</span>
      </div>
      <p>Prompt successfully captured and routed to <strong>${primary.singularity.name}</strong> based on continuous gravitational attraction (${primary.sharePercent.toFixed(1)}% field share).</p>
    `;
  }
}

// Preset Buttons Setup
function initPresets() {
  if (!presetContainer) return;
  presetContainer.innerHTML = "";
  for (const p of PRESET_PROMPTS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "preset-btn-compact";
    btn.textContent = p.title;
    btn.title = `${p.title} (${p.category})`;
    btn.addEventListener("click", () => {
      promptInput.value = p.prompt;
      executeRouting();
    });
    presetContainer.appendChild(btn);
  }
}

// Slider Event Listeners
costSlider.addEventListener("input", (e) => {
  const val = parseFloat(e.target.value);
  costVal.textContent = val.toFixed(1);
  engine.lambdaCost = val;
  executeRouting();
});

latencySlider.addEventListener("input", (e) => {
  const val = parseFloat(e.target.value);
  latencyVal.textContent = val.toFixed(1);
  engine.lambdaLatency = val;
  executeRouting();
});

deltaSlider.addEventListener("input", (e) => {
  const val = parseFloat(e.target.value);
  deltaVal.textContent = val.toFixed(1);
  engine.delta = val;
  executeRouting();
});

routeBtn.addEventListener("click", executeRouting);
promptInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    executeRouting();
  }
});

// Modal Dialog Controller
function openModal() {
  configModal.classList.add("active");
  configModal.style.display = "flex";
  // Sync current config
  const radios = document.querySelectorAll('input[name="providerMode"]');
  radios.forEach(r => {
    r.checked = (r.value === generator.mode);
  });
  ollamaUrlInput.value = generator.ollamaUrl;
  cloudKeyInput.value = generator.cloudApiKey;
  cloudEndpointInput.value = generator.cloudEndpoint;
  cloudModelInput.value = generator.cloudModel;
  toggleModalSubsections(generator.mode);
}

function closeModal() {
  configModal.classList.remove("active");
  configModal.style.display = "none";
}

openConfigBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

closeModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

// Close modal when clicking backdrop outside modal-card
configModal.addEventListener("click", (e) => {
  if (e.target === configModal) {
    closeModal();
  }
});

// Close modal when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && (configModal.classList.contains("active") || configModal.style.display === "flex")) {
    closeModal();
  }
});

document.querySelectorAll('input[name="providerMode"]').forEach(r => {
  r.addEventListener("change", (e) => {
    toggleModalSubsections(e.target.value);
  });
});

function toggleModalSubsections(mode) {
  if (mode === "ollama") {
    ollamaSettings.classList.add("active");
    ollamaSettings.style.display = "flex";
    cloudSettings.classList.remove("active");
    cloudSettings.style.display = "none";
  } else if (mode === "cloud") {
    cloudSettings.classList.add("active");
    cloudSettings.style.display = "flex";
    ollamaSettings.classList.remove("active");
    ollamaSettings.style.display = "none";
  } else {
    ollamaSettings.classList.remove("active");
    ollamaSettings.style.display = "none";
    cloudSettings.classList.remove("active");
    cloudSettings.style.display = "none";
  }
}

saveConfigBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedRadio = document.querySelector('input[name="providerMode"]:checked');
  const selectedMode = selectedRadio ? selectedRadio.value : "autonomous";
  generator.saveConfig(
    selectedMode,
    ollamaUrlInput.value.trim(),
    cloudKeyInput.value.trim(),
    cloudEndpointInput.value.trim(),
    cloudModelInput.value.trim()
  );
  closeModal();
  executeRouting();
});

// Initialize on Load
closeModal();
toggleModalSubsections(generator.mode);
initPresets();
// Trigger initial prompt
promptInput.value = "Who was Lord Rama's wife?";
executeRouting();

