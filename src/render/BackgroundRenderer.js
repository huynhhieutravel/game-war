import { BATTLE_MAPS, DEFAULT_MAP_ID } from '../config/maps.js';

export class BackgroundRenderer {
  constructor(worldWidth = 2400, worldHeight = 600, groundY = 460) {
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.groundY = groundY;
    this.time = 0;
    this.currentMapId = DEFAULT_MAP_ID;

    // Weather Particles Pool
    this.weatherParticles = [];
    this.initWeatherParticles();
    this.lightningTimer = 5 + Math.random() * 5;
    this.lightningFlash = 0;
  }

  setMap(mapId) {
    if (BATTLE_MAPS[mapId]) {
      this.currentMapId = mapId;
      this.initWeatherParticles();
    }
  }

  getMapConfig() {
    return BATTLE_MAPS[this.currentMapId] || BATTLE_MAPS[DEFAULT_MAP_ID];
  }

  initWeatherParticles() {
    const mapConfig = this.getMapConfig();
    const weather = mapConfig.weatherType;
    this.weatherParticles = [];

    const count = weather === 'clear' ? 25 : 85;

    for (let i = 0; i < count; i++) {
      if (weather === 'snow') {
        this.weatherParticles.push({
          x: Math.random() * 1600,
          y: Math.random() * 600,
          speedY: 40 + Math.random() * 80,
          speedX: Math.sin(Math.random() * Math.PI * 2) * 20,
          size: 1.5 + Math.random() * 3,
          alpha: 0.3 + Math.random() * 0.6,
          color: '#e0f2fe'
        });
      } else if (weather === 'sandstorm') {
        this.weatherParticles.push({
          x: Math.random() * 1600,
          y: Math.random() * 600,
          speedY: (Math.random() - 0.5) * 25,
          speedX: 200 + Math.random() * 250,
          size: 1 + Math.random() * 2.5,
          alpha: 0.2 + Math.random() * 0.45,
          color: '#fbbf24'
        });
      } else if (weather === 'ember') {
        this.weatherParticles.push({
          x: Math.random() * 1600,
          y: this.groundY + Math.random() * 50,
          speedY: -(50 + Math.random() * 90),
          speedX: (Math.random() - 0.5) * 40,
          size: 1.5 + Math.random() * 3,
          alpha: 0.4 + Math.random() * 0.6,
          color: Math.random() > 0.5 ? '#f97316' : '#ef4444'
        });
      } else {
        // Clear / ambient dust
        this.weatherParticles.push({
          x: Math.random() * 1600,
          y: Math.random() * 600,
          speedY: 20 + Math.random() * 40,
          speedX: (Math.random() - 0.5) * 15,
          size: 1 + Math.random() * 2,
          alpha: 0.15 + Math.random() * 0.3,
          color: '#ffffff'
        });
      }
    }
  }

  update(dt) {
    this.time += dt;
    const mapConfig = this.getMapConfig();
    const weather = mapConfig.weatherType;

    // Update Weather Particles
    for (const p of this.weatherParticles) {
      p.y += p.speedY * dt;
      p.x += p.speedX * dt;

      if (weather === 'ember') {
        // Embers float upwards and reset at ground
        if (p.y < 0) {
          p.y = this.groundY + Math.random() * 20;
          p.x = Math.random() * 1600;
        }
      } else if (weather === 'sandstorm') {
        // Sandstorm moves horizontally
        if (p.x > 1600) {
          p.x = -20;
          p.y = Math.random() * 600;
        }
      } else {
        // Rain/Snow/Dust falls downwards
        if (p.y > this.groundY + 40) {
          p.y = -20;
          p.x = Math.random() * 1600;
        }
      }
    }

    // Lightning Flash for Modern Age (Age 4)
    this.lightningTimer -= dt;
    if (this.lightningTimer <= 0) {
      this.lightningTimer = 6 + Math.random() * 8;
      this.lightningFlash = 0.25;
    }
    if (this.lightningFlash > 0) {
      this.lightningFlash -= dt;
    }
  }

  render(ctx, camera, playerAge = 1, enemyAge = 1) {
    const age = playerAge || 1;
    const zoom = camera.zoom || 1.0;
    const w = (camera.viewportWidth || ctx.canvas.width || 1100) / zoom + 400;
    const h = (camera.viewportHeight || ctx.canvas.height || 600) / zoom + 400;

    ctx.save();

    // 1. DISTANT LAYER (Parallax 0.15)
    const p1 = (camera.x || 0) * 0.15;
    this.renderDistantMountains(ctx, camera, p1, age, w);

    // 2. MID-GROUND LAYER (Parallax 0.4)
    const p2 = (camera.x || 0) * 0.4;
    this.renderMidGround(ctx, camera, p2, age, w);

    // 3. FOREGROUND & BATTLEFIELD ROAD (Parallax 1.0)
    this.renderBattlefieldGround(ctx, camera, age, w, h);

    ctx.restore();
  }

  renderSky(ctx, w, h, age, groundY) {
    const mapConfig = this.getMapConfig();
    const colors = (mapConfig && mapConfig.skyColors && mapConfig.skyColors[age]) ? mapConfig.skyColors[age] : ['#3b1808', '#782d12', '#ea580c'];
    const gY = Math.max(50, groundY || this.groundY || Math.round(h * 0.78) || 440);

    const skyGrad = ctx.createLinearGradient(0, 0, 0, gY);
    skyGrad.addColorStop(0, colors[0]);
    skyGrad.addColorStop(0.5, colors[1]);
    skyGrad.addColorStop(1, colors[2]);

    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    if (this.lightningFlash > 0 && age === 4) {
      ctx.fillStyle = `rgba(248, 250, 252, ${this.lightningFlash * 2})`;
      ctx.fillRect(0, 0, w, h);
    }

    if (age === 1) {
      ctx.fillStyle = 'rgba(254, 215, 170, 0.35)';
      ctx.beginPath();
      ctx.arc(w * 0.4, 120, 60, 0, Math.PI * 2);
      ctx.fill();
    } else if (age === 2) {
      this.drawCloud(ctx, (w * 0.2 + this.time * 8) % (w + 100) - 50, 80, 45);
      this.drawCloud(ctx, (w * 0.7 + this.time * 5) % (w + 100) - 50, 110, 35);
    } else if (age === 4) {
      const angle = Math.sin(this.time * 0.8) * 0.4;
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(w * 0.3, this.groundY);
      ctx.lineTo(w * 0.3 + Math.tan(angle - 0.15) * this.groundY, 0);
      ctx.lineTo(w * 0.3 + Math.tan(angle + 0.15) * this.groundY, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    } else if (age === 5) {
      ctx.save();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const y = 50 + i * 40;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      const shipX = (w * 0.5 + this.time * 20) % (w + 200) - 100;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.fillRect(shipX, 70, 60, 10);
      ctx.restore();
    }
  }

  drawCloud(ctx, x, y, size) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size * 0.6, y - size * 0.2, size * 0.8, 0, Math.PI * 2);
    ctx.arc(x + size * 1.2, y, size * 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  renderDistantMountains(ctx, camera, parallaxX, age, spanW = 2000) {
    ctx.save();
    const gY = this.groundY;
    const w = Math.max(spanW, camera.viewportWidth + 800);
    const mapConfig = this.getMapConfig();

    ctx.fillStyle = mapConfig.distantColor || '#1e3a5f';
    ctx.beginPath();
    ctx.moveTo(-400, gY);
    for (let x = -400; x <= w + 400; x += 120) {
      const peakHeight = 120 + Math.sin((x + parallaxX) * 0.01) * 60 + Math.cos((x + parallaxX) * 0.02) * 40;
      ctx.lineTo(x, gY - peakHeight);
    }
    ctx.lineTo(w + 400, gY);
    ctx.closePath();
    ctx.fill();

    // Volcano for Stone Age or Volcanic Rift
    if (age === 1 || mapConfig.weatherType === 'ember') {
      const volcanoX = ((w * 0.5 - parallaxX) % (w + 400) + (w + 400)) % (w + 400) - 100;
      ctx.fillStyle = '#260404';
      ctx.beginPath();
      ctx.moveTo(volcanoX - 90, gY);
      ctx.lineTo(volcanoX - 25, gY - 170);
      ctx.lineTo(volcanoX + 25, gY - 170);
      ctx.lineTo(volcanoX + 90, gY);
      ctx.closePath();
      ctx.fill();

      // Lava Crater Glow
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(volcanoX, gY - 170, 25, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Smoke Plume
      const smokeOffset = Math.sin(this.time * 2) * 10;
      ctx.fillStyle = 'rgba(75, 85, 99, 0.4)';
      ctx.beginPath();
      ctx.arc(volcanoX + smokeOffset, gY - 210, 25, 0, Math.PI * 2);
      ctx.arc(volcanoX - smokeOffset * 0.5, gY - 240, 35, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  renderMidGround(ctx, camera, parallaxX, age, spanW = 2000) {
    ctx.save();
    const gY = this.groundY;
    const w = Math.max(spanW, camera.viewportWidth + 800);
    const mapConfig = this.getMapConfig();

    ctx.fillStyle = mapConfig.midColor || '#166534';
    ctx.beginPath();
    ctx.moveTo(-400, gY);
    for (let x = -400; x <= w + 400; x += 50) {
      const hillH = 40 + Math.sin((x + parallaxX) * 0.02) * 25 + Math.cos((x + parallaxX) * 0.035) * 15;
      ctx.lineTo(x, gY - hillH);
    }
    ctx.lineTo(w + 400, gY);
    ctx.closePath();
    ctx.fill();

    // Trees / Details on Hills
    if (age <= 3 && mapConfig.weatherType !== 'ember') {
      ctx.fillStyle = '#14532d';
      for (let x = -300; x <= w + 300; x += 100) {
        const treeX = ((x - parallaxX) % w + w) % w - 200;
        const hY = gY - (40 + Math.sin(treeX * 0.02) * 25);
        ctx.beginPath();
        ctx.moveTo(treeX - 10, hY);
        ctx.lineTo(treeX, hY - 30);
        ctx.lineTo(treeX + 10, hY);
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.restore();
  }

  renderBattlefieldGround(ctx, camera, age, spanW = 2000, spanH = 1200) {
    ctx.save();
    const h = Math.max(spanH, camera.viewportHeight || ctx.canvas.height || 600);
    const w = Math.max(spanW, camera.viewportWidth || ctx.canvas.width || 1100);
    const gY = Math.max(50, Math.min(h - 20, this.groundY || Math.round(h * 0.78) || 440));
    const mapConfig = this.getMapConfig();

    // Ground Gradient
    const groundHeight = Math.max(300, h - gY + 500);
    const groundGrad = ctx.createLinearGradient(0, gY, 0, gY + groundHeight);
    groundGrad.addColorStop(0, mapConfig.groundColor || '#365314');
    groundGrad.addColorStop(1, mapConfig.groundSubColor || '#1a2e05');

    ctx.fillStyle = groundGrad;
    ctx.fillRect(-500, gY, w + 1000, groundHeight);

    // Battlefield Path
    ctx.fillStyle = mapConfig.roadColor || '#78350f';
    ctx.fillRect(-500, gY, w + 1000, 6);

    ctx.restore();
  }

  renderWeatherOverlay(ctx, w, h, age) {
    ctx.save();
    for (const p of this.weatherParticles) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
