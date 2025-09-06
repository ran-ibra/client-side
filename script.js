// --- HiDPI-safe canvas sizing ---
function fitCanvas(canvas, cssSize = 80){
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.style.width  = cssSize + 'px';
  canvas.style.height = cssSize + 'px';
  canvas.width  = Math.round(cssSize * dpr);
  canvas.height = Math.round(cssSize * dpr);
  return dpr;
}

// --- draw one radial percentage badge ---
function drawSkillBadge(canvas){
  const dpr = fitCanvas(canvas, 80);
  const ctx = canvas.getContext('2d');

  // read data attributes
  const label = canvas.dataset.label || '';
  const color = canvas.dataset.color || '#f39c12';
  let p = parseFloat(canvas.dataset.percent || '0');
  if (p > 1) p = p / 100;          // allow 0–100 or 0–1
  p = Math.max(0, Math.min(1, p)); // clamp

  const w = canvas.width, h = canvas.height;
  const cx = w / 2, cy = h / 2;
  const thickness = 8 * dpr;
  const radius = Math.min(w, h) / 2 - 10 * dpr;

  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = 'round';
  ctx.lineWidth = thickness;

  // track
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = '#e6e6e6';
  ctx.stroke();

  // progress (start at 12 o’clock)
  const start = -Math.PI / 2;
  const end   = start + p * Math.PI * 2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, start, end);
  ctx.strokeStyle = color;
  ctx.stroke();

  // label
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${Math.round(22 * dpr)}px system-ui, Arial, sans-serif`;
  ctx.fillText(label, cx, cy);

  // tooltip
  canvas.title = `${label} ${Math.round(p * 100)}%`;
}

// init all canvases
function initSkills(){
  document.querySelectorAll('.skills-row canvas').forEach(drawSkillBadge);
}

window.addEventListener('DOMContentLoaded', initSkills);
window.addEventListener('resize', initSkills); 