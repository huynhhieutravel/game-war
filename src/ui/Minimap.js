export class Minimap {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.setupInteraction();
    }
    this.engine = null;
    this.isDragging = false;
  }

  setEngine(engine) {
    this.engine = engine;
  }

  setupInteraction() {
    if (!this.canvas) return;

    const handleAction = (e) => {
      if (!this.engine) return;
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const targetWorldX = pct * this.engine.worldWidth;
      this.engine.camera.focus(targetWorldX);
    };

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      handleAction(e);
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        handleAction(e);
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.isDragging = true;
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.touches[0].clientX - rect.left;
        const pct = Math.max(0, Math.min(1, clickX / rect.width));
        this.engine.camera.focus(pct * this.engine.worldWidth);
      }
    }, { passive: true });
  }

  render(engine) {
    if (!this.canvas || !this.ctx || !engine) return;
    if (!engine.playerBase || !engine.enemyBase) return;

    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const worldW = engine.worldWidth || 2400;

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(0, 0, w, h);

    // Ground line
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.75);
    ctx.lineTo(w, h * 0.75);
    ctx.stroke();

    // Player Base (Left bar)
    const playerBaseX = (engine.playerBase.x / worldW) * w;
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(Math.max(0, playerBaseX - 4), h * 0.2, 8, h * 0.55);

    // Enemy Base (Right bar)
    const enemyBaseX = (engine.enemyBase.x / worldW) * w;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(Math.min(w - 8, enemyBaseX - 4), h * 0.2, 8, h * 0.55);

    // Player Units (Cyan/Blue dots)
    ctx.fillStyle = '#38bdf8';
    for (const u of engine.playerUnits) {
      if (u.state === 'dying' || u.state === 'dead') continue;
      const ux = (u.x / worldW) * w;
      const dotH = u.role === 'heavy' ? 8 : 5;
      const dotW = u.role === 'heavy' ? 4 : 3;
      ctx.fillRect(ux - dotW / 2, h * 0.75 - dotH, dotW, dotH);
    }

    // Enemy Units (Red/Orange dots)
    ctx.fillStyle = '#f87171';
    for (const u of engine.enemyUnits) {
      if (u.state === 'dying' || u.state === 'dead') continue;
      const ux = (u.x / worldW) * w;
      const dotH = u.role === 'heavy' ? 8 : 5;
      const dotW = u.role === 'heavy' ? 4 : 3;
      ctx.fillRect(ux - dotW / 2, h * 0.75 - dotH, dotW, dotH);
    }

    // Camera Viewport Box with Zoom calculation
    const zoom = engine.camera ? engine.camera.zoom : 1.0;
    const effectiveVisibleW = (engine.camera ? engine.camera.viewportWidth : w) / Math.max(0.1, zoom);
    const camLeft = ((engine.camera ? engine.camera.x : 0) / worldW) * w;
    const camWidth = (effectiveVisibleW / worldW) * w;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(camLeft, 1, Math.min(w - camLeft, camWidth), h - 2);

    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.fillRect(camLeft, 1, Math.min(w - camLeft, camWidth), h - 2);
  }
}
