export class ParticleSystem {
  constructor() {
    this.particles = [];
    this.floatingTexts = [];
    this.screenFlashes = [];
    this.comboBanner = null; // { text, subtext, color, timer, maxDuration }
  }

  update(dt) {
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += (p.gravity || 0) * dt;
      p.rotation = (p.rotation || 0) + (p.vRot || 0) * dt;
      p.scale = Math.max(0, p.initialScale * (p.life / p.maxLife));
      p.alpha = Math.max(0, p.initialAlpha * (p.life / p.maxLife));
    }

    // Update floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const t = this.floatingTexts[i];
      t.life -= dt;
      if (t.life <= 0) {
        this.floatingTexts.splice(i, 1);
        continue;
      }
      t.y += t.vy * dt;
      t.x += (t.vx || 0) * dt;
      t.alpha = Math.min(1, t.life / (t.maxLife * 0.4));
    }

    // Update screen flashes
    for (let i = this.screenFlashes.length - 1; i >= 0; i--) {
      const f = this.screenFlashes[i];
      f.life -= dt;
      if (f.life <= 0) {
        this.screenFlashes.splice(i, 1);
        continue;
      }
      f.alpha = f.maxAlpha * (f.life / f.maxLife);
    }

    // Update combo banner
    if (this.comboBanner) {
      this.comboBanner.timer -= dt;
      if (this.comboBanner.timer <= 0) {
        this.comboBanner = null;
      }
    }
  }

  showComboBanner(text, subtext = '', color = '#fbbf24') {
    this.comboBanner = {
      text,
      subtext,
      color,
      timer: 2.2,
      maxDuration: 2.2
    };
  }

  emitBlood(x, y, count = 8) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 90;
      this.particles.push({
        type: 'circle',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 20,
        gravity: 250,
        color: '#dc2626',
        initialScale: 2 + Math.random() * 3,
        scale: 3,
        initialAlpha: 0.9,
        alpha: 0.9,
        maxLife: 0.35 + Math.random() * 0.25,
        life: 0.35 + Math.random() * 0.25
      });
    }
  }

  createBloodSplat(x, y, count = 8) {
    this.emitBlood(x, y, count);
  }

  emitSparks(x, y, count = 10, color = '#fbbf24') {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 140;
      this.particles.push({
        type: 'spark',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 40,
        gravity: 200,
        color,
        initialScale: 2 + Math.random() * 2,
        scale: 2,
        initialAlpha: 1,
        alpha: 1,
        maxLife: 0.25 + Math.random() * 0.2,
        life: 0.25 + Math.random() * 0.2
      });
    }
  }

  createSparks(x, y, count = 10, color = '#fbbf24') {
    this.emitSparks(x, y, count, color);
  }

  emitExplosion(x, y, radius = 40) {
    this.particles.push({
      type: 'shockwave',
      x,
      y,
      vx: 0,
      vy: 0,
      radius: 5,
      maxRadius: radius * 1.5,
      color: '#f97316',
      initialAlpha: 0.8,
      alpha: 0.8,
      maxLife: 0.35,
      life: 0.35
    });

    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 150;
      const colors = ['#ef4444', '#f97316', '#fbbf24', '#71717a'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push({
        type: 'circle',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 50,
        gravity: 60,
        color,
        initialScale: 4 + Math.random() * 10,
        scale: 8,
        initialAlpha: 0.9,
        alpha: 0.9,
        maxLife: 0.4 + Math.random() * 0.4,
        life: 0.4 + Math.random() * 0.4
      });
    }
  }

  emitLaserGlow(x, y, color = '#38bdf8') {
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 30 + Math.random() * 60;
      this.particles.push({
        type: 'glow',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0,
        color,
        initialScale: 3 + Math.random() * 5,
        scale: 4,
        initialAlpha: 0.9,
        alpha: 0.9,
        maxLife: 0.25,
        life: 0.25
      });
    }
  }

  emitSmokeTrail(x, y) {
    this.particles.push({
      type: 'circle',
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      gravity: -15,
      color: '#9ca3af',
      initialScale: 2 + Math.random() * 3,
      scale: 3,
      initialAlpha: 0.5,
      alpha: 0.5,
      maxLife: 0.35,
      life: 0.35
    });
  }

  emitSlash(x, y, dir, color = '#f8fafc') {
    this.particles.push({
      type: 'slash',
      x,
      y,
      vx: dir * 50, // Moves slightly forward
      vy: 0,
      gravity: 0,
      color,
      initialScale: 1,
      scale: 1,
      initialAlpha: 0.9,
      alpha: 0.9,
      maxLife: 0.2, // Very fast
      life: 0.2,
      dir // 1 or -1
    });
  }

  addFloatingText(text, x, y, color = '#ffffff', fontSize = 14, isCrit = false) {
    this.floatingTexts.push({
      text,
      x: x + (Math.random() * 16 - 8),
      y: y - 10,
      vx: (Math.random() * 20 - 10),
      vy: -45 - Math.random() * 25,
      color,
      fontSize: isCrit ? fontSize * 1.3 : fontSize,
      isCrit,
      initialAlpha: 1,
      alpha: 1,
      maxLife: 0.85,
      life: 0.85
    });
  }

  addScreenFlash(color = '#ffffff', maxAlpha = 0.5, duration = 0.3) {
    this.screenFlashes.push({
      color,
      maxAlpha,
      alpha: maxAlpha,
      maxLife: duration,
      life: duration
    });
  }

  render(ctx, camera) {
    ctx.save();

    // Render particles
    for (const p of this.particles) {
      const screenX = camera.worldToScreen(p.x);
      const screenY = p.y + camera.getShakeOffset().y;

      if (screenX < -50 || screenX > camera.viewportWidth + 50) continue;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;

      if (p.type === 'circle' || p.type === 'glow' || p.type === 'spark') {
        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(0.5, p.scale), 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'shockwave') {
        const progress = 1 - (p.life / p.maxLife);
        const r = p.radius + (p.maxRadius - p.radius) * progress;
        ctx.lineWidth = Math.max(1, 4 * (1 - progress));
        ctx.beginPath();
        ctx.arc(screenX, screenY, r, 0, Math.PI * 2);
        ctx.stroke();
      } else if (p.type === 'slash') {
        const progress = 1 - (p.life / p.maxLife); // 0 to 1
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.scale(p.dir, 1);
        ctx.rotate(Math.PI * progress * 0.5); // Arc swing
        ctx.lineWidth = 15 * (1 - progress);
        ctx.lineCap = 'round';
        ctx.strokeStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, 40, -Math.PI/2, Math.PI/2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    }

    // Render floating combat texts
    for (const t of this.floatingTexts) {
      const screenX = camera.worldToScreen(t.x);
      const screenY = t.y + camera.getShakeOffset().y;

      if (screenX < -100 || screenX > camera.viewportWidth + 100) continue;

      ctx.save();
      ctx.globalAlpha = t.alpha;
      ctx.font = `bold ${t.fontSize}px 'Outfit', 'Inter', system-ui, sans-serif`;
      ctx.textAlign = 'center';

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.lineWidth = t.isCrit ? 4 : 3;
      ctx.strokeText(t.text, screenX, screenY);

      ctx.fillStyle = t.color;
      ctx.fillText(t.text, screenX, screenY);
      ctx.restore();
    }

    // Render screen flashes
    for (const f of this.screenFlashes) {
      ctx.save();
      ctx.globalAlpha = f.alpha;
      ctx.fillStyle = f.color;
      ctx.fillRect(0, 0, camera.viewportWidth, camera.viewportHeight);
      ctx.restore();
    }

    // Render COMBO KILL BANNER (Top Center of Screen)
    if (this.comboBanner) {
      const banner = this.comboBanner;
      const progress = banner.timer / banner.maxDuration;
      const alpha = Math.min(1, progress / 0.3);
      const scale = 1.0 + Math.max(0, (1 - (banner.maxDuration - banner.timer) / 0.2)) * 0.4;

      ctx.save();
      ctx.translate(camera.viewportWidth / 2, 90);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;

      ctx.font = '900 26px "Outfit", sans-serif';
      ctx.textAlign = 'center';

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
      ctx.lineWidth = 6;
      ctx.strokeText(banner.text, 0, 0);

      ctx.fillStyle = banner.color;
      ctx.fillText(banner.text, 0, 0);

      if (banner.subtext) {
        ctx.font = '700 13px "Inter", sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.fillText(banner.subtext, 0, 22);
      }

      ctx.restore();
    }

    ctx.restore();
  }

  clear() {
    this.particles = [];
    this.floatingTexts = [];
    this.screenFlashes = [];
    this.comboBanner = null;
  }
}
