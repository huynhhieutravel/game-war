export class Camera {
  constructor(worldWidth = 2400, viewportWidth = 1100, viewportHeight = 600) {
    this.worldWidth = worldWidth;
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;

    this.x = 0;
    this.targetX = 0;
    this.lerpSpeed = 14.0;

    this.zoom = 1.0;
    this.targetZoom = 1.0;
    this.minZoom = 0.60;
    this.maxZoom = 1.35;

    this.isDragging = false;
    this.dragStartX = 0;
    this.cameraStartX = 0;

    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    this.shakeTimer = 0;
  }

  resize(viewportWidth, viewportHeight) {
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
    this.clamp();
  }

  setZoom(z) {
    this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, z));
    this.clamp();
  }

  zoomBy(delta) {
    this.setZoom(this.targetZoom + delta);
  }

  resetZoom() {
    this.setZoom(1.0);
  }

  update(dt) {
    // Smooth Zoom
    this.zoom += (this.targetZoom - this.zoom) * Math.min(1, 10.0 * dt);

    // Smooth Lerp
    if (!this.isDragging) {
      this.x += (this.targetX - this.x) * Math.min(1, this.lerpSpeed * dt);
    }
    this.clamp();

    // Camera Shake
    if (this.shakeTimer > 0) {
      this.shakeTimer -= dt;
      if (this.shakeTimer <= 0) {
        this.shakeIntensity = 0;
      }
    }
  }

  shake(intensity = 8, duration = 0.4) {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
    this.shakeDuration = duration;
    this.shakeTimer = duration;
  }

  getShakeOffset() {
    if (this.shakeTimer <= 0 || this.shakeIntensity <= 0) {
      return { x: 0, y: 0 };
    }
    const progress = this.shakeTimer / this.shakeDuration;
    const currentAmp = this.shakeIntensity * progress;
    return {
      x: (Math.random() * 2 - 1) * currentAmp,
      y: (Math.random() * 2 - 1) * currentAmp
    };
  }

  clamp() {
    const effectiveVisibleW = this.viewportWidth / Math.max(0.1, this.zoom);
    const maxX = Math.max(0, this.worldWidth - effectiveVisibleW);
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.targetX = Math.max(0, Math.min(this.targetX, maxX));
  }

  focus(worldX) {
    const effectiveVisibleW = this.viewportWidth / Math.max(0.1, this.zoom);
    this.targetX = worldX - effectiveVisibleW / 2;
    this.clamp();
  }

  panBy(deltaX) {
    this.targetX += deltaX / this.zoom;
    this.clamp();
  }

  worldToScreen(worldX) {
    const shake = this.getShakeOffset();
    return worldX - this.x + shake.x;
  }

  screenToWorld(screenX) {
    return screenX / this.zoom + this.x;
  }

  startDrag(clientX) {
    this.isDragging = true;
    this.dragStartX = clientX;
    this.cameraStartX = this.x;
  }

  onDrag(clientX) {
    if (!this.isDragging) return;
    const delta = (this.dragStartX - clientX) / this.zoom;
    this.x = this.cameraStartX + delta;
    this.targetX = this.x;
    this.clamp();
  }

  endDrag() {
    this.isDragging = false;
  }

  // Quick Tactical Jumps
  jumpToPlayer(engine) {
    const px = engine.playerBase ? engine.playerBase.x + 200 : 200;
    this.focus(px);
  }

  jumpToEnemy(engine) {
    const ex = engine.enemyBase ? engine.enemyBase.x - 200 : this.worldWidth - 200;
    this.focus(ex);
  }

  jumpToFrontline(engine) {
    if (engine.playerUnits.length > 0 && engine.enemyUnits.length > 0) {
      const pFront = engine.playerUnits[engine.playerUnits.length - 1].x;
      const eFront = engine.enemyUnits[0].x;
      this.focus((pFront + eFront) / 2);
    } else if (engine.playerUnits.length > 0) {
      this.focus(engine.playerUnits[engine.playerUnits.length - 1].x + 100);
    } else if (engine.enemyUnits.length > 0) {
      this.focus(engine.enemyUnits[0].x - 100);
    } else {
      this.focus(this.worldWidth / 2);
    }
  }
}
