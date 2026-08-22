export class BaseRenderer {
  constructor() {}

  render(ctx, base, camera, groundY) {
    const screenX = camera.worldToScreen(base.x);
    const screenY = groundY;

    // Cull offscreen
    if (screenX < -250 || screenX > camera.viewportWidth + 250) return;

    ctx.save();
    ctx.translate(screenX, screenY);

    if (base.faction === 'enemy') {
      ctx.scale(-1, 1);
    }

    // Render Fortress Architecture according to Age
    const drawBaseFn = this[`draw_base_age${base.age}`] || this.draw_base_age1;
    drawBaseFn.call(this, ctx, base);

    // Render Turrets on their slots
    this.renderTurrets(ctx, base);

    ctx.restore();

    // Render Base Health Bar & Age Name above the base
    this.renderBaseHeader(ctx, base, screenX, screenY);
  }

  // --- AGE 1: STONE AGE BASE (Cave Cliff & Primitive Totems) ---
  draw_base_age1(ctx, base) {
    // Massive Rock Cliff Face
    ctx.fillStyle = '#574230';
    ctx.beginPath();
    ctx.moveTo(-70, 0);
    ctx.lineTo(-70, -180);
    ctx.lineTo(10, -180);
    ctx.lineTo(25, -140);
    ctx.lineTo(40, -100);
    ctx.lineTo(50, -50);
    ctx.lineTo(55, 0);
    ctx.closePath();
    ctx.fill();

    // Rock Strata
    ctx.strokeStyle = '#3d2e22';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-50, -120);
    ctx.lineTo(25, -120);
    ctx.moveTo(-60, -60);
    ctx.lineTo(40, -60);
    ctx.stroke();

    // Cave Entrance Doorway
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(35, -25, 22, Math.PI, 0);
    ctx.lineTo(57, 0);
    ctx.lineTo(13, 0);
    ctx.closePath();
    ctx.fill();

    // Campfire at base
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(10, -4, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(10, -5, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- AGE 2: CASTLE AGE BASE (Stone Castle & Battlement Towers) ---
  draw_base_age2(ctx, base) {
    const bannerColor = base.faction === 'player' ? '#2563eb' : '#dc2626';

    // Main Castle Wall
    ctx.fillStyle = '#64748b';
    ctx.fillRect(-70, -180, 110, 180);

    // Stone Brick Pattern
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    for (let y = -170; y < 0; y += 20) {
      ctx.beginPath();
      ctx.moveTo(-70, y);
      ctx.lineTo(40, y);
      ctx.stroke();
    }

    // Crenellations / Battlements at top
    ctx.fillStyle = '#475569';
    for (let x = -70; x < 40; x += 22) {
      ctx.fillRect(x, -195, 12, 16);
    }

    // Fortified Gate with Iron Portcullis
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(15, -45, 24, 45);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    for (let gx = 19; gx <= 35; gx += 5) {
      ctx.beginPath();
      ctx.moveTo(gx, -45);
      ctx.lineTo(gx, 0);
      ctx.stroke();
    }

    // Royal Banner Flag
    ctx.fillStyle = bannerColor;
    ctx.fillRect(-20, -220, 28, 18);
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-20, -230);
    ctx.lineTo(-20, -180);
    ctx.stroke();
  }

  // --- AGE 3: RENAISSANCE BASE (Imperial Bastion Fort) ---
  draw_base_age3(ctx, base) {
    const bannerColor = base.faction === 'player' ? '#1d4ed8' : '#b91c1c';

    // Brick Ramparts
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-70, -190, 115, 190);

    // Stone Parapet
    ctx.fillStyle = '#44403c';
    ctx.fillRect(-75, -200, 125, 14);

    // Watchtower with Copper Roof Dome
    ctx.fillStyle = '#292524';
    ctx.fillRect(-25, -230, 35, 30);
    ctx.fillStyle = '#059669'; // Oxidized copper green
    ctx.beginPath();
    ctx.arc(-8, -230, 20, Math.PI, 0);
    ctx.fill();

    // Heavy Iron Gate
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(15, -50, 28, 50);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 3;
    ctx.strokeRect(17, -48, 24, 46);

    // Imperial Standard
    ctx.fillStyle = bannerColor;
    ctx.fillRect(10, -250, 32, 20);
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(10, -260);
    ctx.lineTo(10, -200);
    ctx.stroke();
  }

  // --- AGE 4: MODERN BASE (Concrete Military Bunker) ---
  draw_base_age4(ctx, base) {
    // Reinforced Concrete Bunker
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(-70, 0);
    ctx.lineTo(-70, -190);
    ctx.lineTo(20, -190);
    ctx.lineTo(45, -120);
    ctx.lineTo(55, 0);
    ctx.closePath();
    ctx.fill();

    // Camo Panels
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-60, -170, 40, 50);
    ctx.fillRect(-10, -120, 45, 40);

    // Rotating Radar Dish
    ctx.save();
    ctx.translate(-40, -205);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 14, -Math.PI * 0.7, 0);
    ctx.stroke();
    ctx.restore();

    // Heavy Armored Blast Door
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(20, -50, 30, 50);
    // Hazard Stripes
    ctx.fillStyle = '#eab308';
    ctx.fillRect(22, -48, 26, 4);
    ctx.fillRect(22, -4, 26, 4);
  }

  // --- AGE 5: FUTURE BASE (Cyberpunk Neon Citadel) ---
  draw_base_age5(ctx, base) {
    const neon = base.faction === 'player' ? '#06b6d4' : '#ec4899';

    // Obsidian Megastructure
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.moveTo(-70, 0);
    ctx.lineTo(-70, -200);
    ctx.lineTo(0, -200);
    ctx.lineTo(35, -130);
    ctx.lineTo(55, 0);
    ctx.closePath();
    ctx.fill();

    // Glowing Neon Circuit Lines
    ctx.strokeStyle = neon;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-60, -190);
    ctx.lineTo(-20, -150);
    ctx.lineTo(20, -150);
    ctx.lineTo(35, -100);
    ctx.moveTo(-50, -80);
    ctx.lineTo(30, -80);
    ctx.stroke();

    // Levitating Power Core Crystal
    ctx.save();
    ctx.translate(-25, -225);
    ctx.fillStyle = neon;
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(12, 0);
    ctx.lineTo(0, 16);
    ctx.lineTo(-12, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Energy Forcefield Gate
    ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.fillRect(20, -55, 30, 55);
    ctx.strokeStyle = neon;
    ctx.lineWidth = 2;
    ctx.strokeRect(20, -55, 30, 55);
  }

  // --- RENDER TURRETS ON BASE SLOTS ---
  renderTurrets(ctx, base) {
    // Slot positions relative to base center (x=0, y=0 at ground)
    const slotOffsets = [
      { x: 30, y: -90 },   // Slot 1 (Lower right)
      { x: 10, y: -140 },  // Slot 2 (Mid tier)
      { x: -20, y: -190 }, // Slot 3 (Upper tier)
      { x: -50, y: -200 }  // Slot 4 (Top back tier)
    ];

    for (let i = 0; i < base.maxTurretSlots; i++) {
      const pos = slotOffsets[i];
      const turret = base.turrets[i];

      // Draw Turret Mount Pad
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(pos.x - 12, pos.y - 4, 24, 8);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(pos.x - 12, pos.y - 4, 24, 8);

      if (turret) {
        // Draw the active turret rotated towards target
        this.drawTurretWeapon(ctx, turret, pos.x, pos.y, base.faction);
      }
    }
  }

  drawTurretWeapon(ctx, turret, x, y, faction) {
    ctx.save();
    ctx.translate(x, y);

    const angle = turret.targetAngle || 0;
    // Turret Base Dome
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();

    // Rotating Barrel
    ctx.rotate(angle);

    if (turret.id.includes('slingshot')) {
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(20, 0);
      ctx.stroke();
    } else if (turret.id.includes('catapult') || turret.id.includes('trebuchet')) {
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, -4, 24, 8);
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(22, 0, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (turret.id.includes('ballista')) {
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, -3, 26, 6);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(8, -10);
      ctx.lineTo(8, 10);
      ctx.stroke();
    } else if (turret.id.includes('cannon')) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, -5, 28, 10);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(24, -6, 4, 12);
    } else if (turret.id.includes('mg')) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, -6, 26, 4);
      ctx.fillRect(0, 2, 26, 4);
    } else if (turret.id.includes('missile')) {
      ctx.fillStyle = '#14532d';
      ctx.fillRect(0, -7, 24, 14);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(24, -5, 4, 10);
    } else {
      // Future Plasma / Ion
      const beamColor = faction === 'player' ? '#06b6d4' : '#f43f5e';
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, -6, 28, 12);
      ctx.fillStyle = beamColor;
      ctx.fillRect(14, -3, 14, 6);
    }

    ctx.restore();
  }

  renderBaseHeader(ctx, base, screenX, screenY) {
    ctx.save();
    const barWidth = 140;
    const barHeight = 8;
    const headerY = screenY - 220;

    // Header Background Frame
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(screenX - barWidth / 2 - 8, headerY - 24, barWidth + 16, 38);
    ctx.strokeStyle = base.faction === 'player' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(239, 68, 68, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(screenX - barWidth / 2 - 8, headerY - 24, barWidth + 16, 38);

    // Title / Faction / Age Text
    ctx.font = 'bold 12px "Outfit", "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = base.faction === 'player' ? '#60a5fa' : '#f87171';
    const factionLabel = base.faction === 'player' ? 'CĂN CỨ BẠN' : 'CĂN CỨ ĐỊCH';
    ctx.fillText(`${factionLabel} • AGE ${base.age}`, screenX, headerY - 8);

    // HP Bar
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(screenX - barWidth / 2, headerY, barWidth, barHeight);

    const pct = Math.max(0, Math.min(1, base.hp / base.maxHp));
    const hpColor = pct > 0.5 ? '#22c55e' : pct > 0.25 ? '#f59e0b' : '#dc2626';
    ctx.fillStyle = hpColor;
    ctx.fillRect(screenX - barWidth / 2, headerY, barWidth * pct, barHeight);

    // HP Numbers
    ctx.font = '10px "Inter", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${Math.ceil(base.hp)} / ${base.maxHp}`, screenX, headerY + 7);

    ctx.restore();
  }
}
