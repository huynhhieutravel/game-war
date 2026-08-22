export class BossRenderer {
  constructor() {}

  render(ctx, boss, camera, groundY) {
    const screenX = camera.worldToScreen(boss.x);
    const screenY = groundY;

    if (screenX < -200 || screenX > camera.viewportWidth + 200) return;

    ctx.save();
    ctx.translate(screenX, screenY);

    if (boss.faction === 'enemy') {
      ctx.scale(-1, 1);
    }

    // Boss Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 0, boss.width * 0.55, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    if (boss.hitFlashTimer > 0) {
      ctx.filter = 'brightness(2) contrast(1.3)';
    }

    if (boss.state === 'dying') {
      ctx.globalAlpha = Math.max(0, boss.deathTimer / boss.deathDuration);
      ctx.translate(0, (1 - boss.deathTimer / boss.deathDuration) * 30);
    }

    const drawFn = this[`draw_${boss.type}`] || this.draw_generic;
    drawFn.call(this, ctx, boss);

    ctx.restore();
  }

  // --- 1. APEX T-REX BOSS ---
  draw_boss_stone_trex(ctx, b) {
    const walk = b.state === 'walking' ? Math.sin(b.animTime * 8) : 0;
    const bite = b.state === 'attacking' ? Math.sin(b.animTime * 14) * 15 : 0;

    // Heavy Dinosaur Body
    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.ellipse(0, -45, 52, 32, 0, 0, Math.PI * 2);
    ctx.fill();

    // Giant Tail
    ctx.beginPath();
    ctx.moveTo(-45, -45);
    ctx.lineTo(-85 + walk * 8, -65);
    ctx.lineTo(-45, -30);
    ctx.closePath();
    ctx.fill();

    // Massive Legs
    ctx.fillStyle = '#14532d';
    ctx.fillRect(-26 + walk * 10, -32, 18, 32);
    ctx.fillRect(10 - walk * 10, -32, 18, 32);
    // Claws
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-30 + walk * 10, -5, 8, 5);
    ctx.fillRect(6 - walk * 10, -5, 8, 5);

    // Giant Head & Jaws
    ctx.fillStyle = '#166534';
    ctx.save();
    ctx.translate(45 + bite, -60);
    ctx.beginPath();
    ctx.ellipse(18, 0, 28, 20, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(14, -8, 5, 0, Math.PI * 2);
    ctx.fill();

    // Sharp Teeth
    ctx.fillStyle = '#ffffff';
    for (let t = 20; t <= 40; t += 6) {
      ctx.fillRect(t, 8, 4, 8);
    }
    ctx.restore();

    // Small T-Rex Arms
    ctx.fillStyle = '#15803d';
    ctx.fillRect(20, -40, 10, 6);
  }

  // --- 2. FIRE DRAGON BOSS ---
  draw_boss_castle_dragon(ctx, b) {
    const flap = Math.sin(b.animTime * 10) * 20;

    // Dragon Body
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.ellipse(0, -50, 48, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wings
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.moveTo(-10, -55);
    ctx.lineTo(-40, -110 + flap);
    ctx.lineTo(20, -90 + flap);
    ctx.closePath();
    ctx.fill();

    // Dragon Neck & Head
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.moveTo(35, -55);
    ctx.lineTo(55, -80);
    ctx.lineTo(75, -75);
    ctx.lineTo(45, -45);
    ctx.closePath();
    ctx.fill();

    // Glowing Fire Mouth
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(70, -72, 6, 0, Math.PI * 2);
    ctx.fill();

    // Horns
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.moveTo(55, -80);
    ctx.lineTo(45, -95);
    ctx.lineTo(52, -80);
    ctx.closePath();
    ctx.fill();
  }

  // --- 3. STEAM JUGGERNAUT BOSS ---
  draw_boss_renaissance_juggernaut(ctx, b) {
    // Massive Iron Chassis
    ctx.fillStyle = '#3f3f46';
    ctx.fillRect(-60, -55, 120, 45);

    // Brass Plating
    ctx.fillStyle = '#d97706';
    ctx.fillRect(-55, -40, 110, 10);

    // Heavy Rolling Wheels
    ctx.fillStyle = '#18181b';
    for (let x = -50; x <= 50; x += 25) {
      ctx.beginPath();
      ctx.arc(x, -12, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    // Triple Cannon Turret Ports
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(20, -50, 48, 12);
    ctx.fillRect(20, -32, 48, 12);

    // Smokestacks spewing dark smoke
    ctx.fillStyle = '#27272a';
    ctx.fillRect(-45, -80, 12, 28);
    ctx.fillRect(-25, -75, 12, 22);

    ctx.fillStyle = 'rgba(100, 116, 139, 0.4)';
    ctx.beginPath();
    ctx.arc(-40, -85, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- 4. APOCALYPSE TANK BOSS ---
  draw_boss_modern_apocalypse(ctx, b) {
    // Heavy Armored Treads
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-65, -28, 130, 24);

    // Hull
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(-60, -28);
    ctx.lineTo(-45, -55);
    ctx.lineTo(50, -55);
    ctx.lineTo(65, -28);
    ctx.closePath();
    ctx.fill();

    // Twin 150mm Cannon Turret
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-25, -72, 60, 22);

    // Dual Barrels
    ctx.fillStyle = '#020617';
    ctx.fillRect(30, -68, 55, 6);
    ctx.fillRect(30, -58, 55, 6);

    // Missile Pod on Roof
    ctx.fillStyle = '#15803d';
    ctx.fillRect(-15, -84, 25, 12);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(8, -82, 4, 8);
  }

  // --- 5. TITAN LEVIATHAN BOSS ---
  draw_boss_future_leviathan(ctx, b) {
    const hover = Math.sin(b.animTime * 4) * 10;
    ctx.save();
    ctx.translate(0, hover);

    // 4 Glowing Energy Wings
    ctx.fillStyle = 'rgba(192, 132, 252, 0.4)';
    ctx.beginPath();
    ctx.moveTo(-30, -70);
    ctx.lineTo(-90, -130);
    ctx.lineTo(-40, -90);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(30, -70);
    ctx.lineTo(90, -130);
    ctx.lineTo(40, -90);
    ctx.closePath();
    ctx.fill();

    // God Mech Main Chassis
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.moveTo(-55, -20);
    ctx.lineTo(-40, -110);
    ctx.lineTo(40, -110);
    ctx.lineTo(55, -20);
    ctx.closePath();
    ctx.fill();

    // Pulsing Singularity Reactor Core
    ctx.fillStyle = '#c084fc';
    ctx.beginPath();
    ctx.arc(0, -65, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -65, 8, 0, Math.PI * 2);
    ctx.fill();

    // Heavy Obliteration Arms
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(40, -75, 50, 20);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(80, -72, 12, 14);

    ctx.restore();
  }

  draw_generic(ctx, b) {
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-b.width / 2, -b.height, b.width, b.height);
  }
}
