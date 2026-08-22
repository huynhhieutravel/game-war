export class UnitRenderer {
  constructor() {}

  render(ctx, unit, camera, groundY) {
    const screenX = camera.worldToScreen(unit.x);
    const screenY = groundY;

    // Cull offscreen
    if (screenX < -250 || screenX > camera.viewportWidth + 250) return;

    ctx.save();
    ctx.translate(screenX, screenY);

    // Direction: Player moves right (scaleX = 1), Enemy moves left (scaleX = -1)
    const dir = unit.faction === 'enemy' ? -1 : 1;
    ctx.scale(dir, 1);

    // Shadow under unit
    this.renderShadow(ctx, unit);

    // Hit flash tint
    if (unit.hitFlashTimer > 0) {
      ctx.filter = 'brightness(2) contrast(1.5)';
    }

    // Death fade & collapse
    if (unit.state === 'dying') {
      const deathProgress = 1 - (unit.deathTimer / unit.deathDuration);
      ctx.globalAlpha = Math.max(0, 1 - deathProgress);
      ctx.translate(0, deathProgress * 20);
      ctx.rotate((unit.faction === 'player' ? 1 : -1) * deathProgress * 1.5);
    } else if (unit.state === 'dead') {
      ctx.restore();
      return;
    }

    // Render Unit Specific Model
    const key = unit.configKey || unit.id || unit.type;
    const methodMap = {
      'stone_clubman': 'draw_stone_clubman',
      'stone_slingshot': 'draw_stone_slingshot',
      'stone_dino_rider': 'draw_stone_dinorider',
      'castle_swordsman': 'draw_castle_swordsman',
      'castle_archer': 'draw_castle_archer',
      'castle_knight': 'draw_castle_knight',
      'ren_musketeer': 'draw_renaissance_musketeer',
      'ren_bomb_thrower': 'draw_renaissance_grenadier',
      'ren_steam_tank': 'draw_renaissance_ironclad',
      'mod_infantry': 'draw_modern_trooper',
      'mod_rocket_launcher': 'draw_modern_bazooka',
      'mod_abrams_tank': 'draw_modern_tank',
      'fut_plasma_trooper': 'draw_future_cyber',
      'fut_mech_walker': 'draw_future_mech',
      'fut_god_titan': 'draw_future_titan'
    };

    const targetMethod = methodMap[key] || `draw_${key}`;
    const drawFn = this[targetMethod] || this.draw_generic;
    drawFn.call(this, ctx, unit);

    ctx.restore();

    // Render Unit Health Bar
    if (unit.state !== 'dying' && unit.state !== 'dead') {
      this.renderHealthBar(ctx, unit, screenX, screenY);
    }
  }

  renderShadow(ctx, unit) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    const shadowWidth = unit.width * 0.9;
    const shadowHeight = 8;
    ctx.beginPath();
    ctx.ellipse(0, 0, shadowWidth / 2, shadowHeight / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  renderHealthBar(ctx, unit, screenX, screenY) {
    if (unit.hp >= unit.maxHp) return; // Only show if damaged

    ctx.save();
    const barWidth = Math.max(30, unit.width * 0.8);
    const barHeight = 4;
    const barY = screenY - unit.height - 15;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(screenX - barWidth / 2 - 1, barY - 1, barWidth + 2, barHeight + 2);

    // Fill
    const pct = Math.max(0, Math.min(1, unit.hp / unit.maxHp));
    const factionColor = unit.faction === 'player' ? '#22c55e' : '#ef4444';
    ctx.fillStyle = pct > 0.5 ? factionColor : pct > 0.25 ? '#f59e0b' : '#dc2626';
    ctx.fillRect(screenX - barWidth / 2, barY, barWidth * pct, barHeight);

    // Shield (if any)
    if (unit.shield > 0 && unit.maxShield > 0) {
      const shieldPct = Math.max(0, Math.min(1, unit.shield / unit.maxShield));
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(screenX - barWidth / 2, barY + barHeight, barWidth * shieldPct, 2);
    }

    ctx.restore();
  }

  // ==========================================
  // PROCEDURAL ANIMATION HELPERS
  // ==========================================
  
  getAnimState(u) {
    const walk = u.state === 'walking' ? Math.sin(u.animTimer * 12) : 0;
    const attackProgress = u.state === 'attacking' ? (1 - u.attackTimer / u.attackCooldown) : 0;
    
    // Melee swing: Pull back slightly, then fast forward, then hold
    let swing = 0;
    if (u.state === 'attacking') {
      if (attackProgress < 0.2) swing = -attackProgress * 2; // Pull back
      else if (attackProgress < 0.4) swing = (attackProgress - 0.2) * 8; // Strike
      else swing = 1.6 - (attackProgress - 0.4); // Recover
    }

    // Ranged shoot: Raise weapon, recoil, lower
    let shoot = 0;
    if (u.state === 'attacking') {
      if (attackProgress < 0.1) shoot = attackProgress * 10;
      else shoot = 1 - (attackProgress - 0.1) * 1.2;
    }

    return { walk, swing, shoot, attackProgress };
  }

  // ==========================================
  // AGE 1: STONE AGE
  // ==========================================

  draw_stone_clubman(ctx, u) {
    const isPlayer = u.faction === 'player';
    const tunicColor = isPlayer ? '#2563eb' : '#b91c1c';
    const skinColor = '#d97736';
    const { walk, swing } = this.getAnimState(u);

    // Back Arm (Swing)
    ctx.save();
    ctx.translate(0, -22);
    ctx.rotate(swing * 1.5 - walk * 0.3);
    ctx.fillStyle = skinColor;
    ctx.fillRect(-4, 0, 8, 16);
    // Club
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(-3, 10, 6, 24);
    // Club spikes
    ctx.fillStyle = '#d4d4d8';
    ctx.fillRect(0, 24, 6, 4);
    ctx.fillRect(-3, 28, 6, 4);
    ctx.restore();

    // Back Leg
    ctx.fillStyle = skinColor;
    ctx.fillRect(-8 + walk * 6, -14, 6, 14);

    // Body (Fur Tunic)
    ctx.fillStyle = tunicColor;
    ctx.beginPath();
    ctx.moveTo(-12, -32);
    ctx.lineTo(12, -32);
    ctx.lineTo(14, -12);
    ctx.lineTo(-14, -12);
    ctx.fill();

    // Fur details
    ctx.fillStyle = '#4a2c11';
    ctx.beginPath();
    ctx.moveTo(14, -12);
    ctx.lineTo(10, -8);
    ctx.lineTo(-10, -8);
    ctx.lineTo(-14, -12);
    ctx.fill();

    // Head
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(0, -42, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Hair
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(0, -44, 11, Math.PI, 0);
    ctx.fill();

    // Front Leg
    ctx.fillStyle = skinColor;
    ctx.fillRect(2 - walk * 6, -14, 6, 14);

    // Front Arm
    ctx.fillStyle = skinColor;
    ctx.fillRect(-2 + walk * 3, -22, 6, 14);
  }

  draw_stone_slingshot(ctx, u) {
    const isPlayer = u.faction === 'player';
    const tunicColor = isPlayer ? '#3b82f6' : '#ef4444';
    const skinColor = '#d97736';
    const { walk, shoot } = this.getAnimState(u);

    // Legs
    ctx.fillStyle = skinColor;
    ctx.fillRect(-8 + walk * 6, -12, 5, 12);
    ctx.fillRect(3 - walk * 6, -12, 5, 12);

    // Body
    ctx.fillStyle = tunicColor;
    ctx.fillRect(-10, -28, 20, 16);

    // Head
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(0, -36, 8, 0, Math.PI * 2);
    ctx.fill();

    // Front Arm & Slingshot
    ctx.save();
    ctx.translate(0, -24);
    ctx.rotate(shoot * 0.8 - walk * 0.2);
    ctx.fillStyle = skinColor;
    ctx.fillRect(-3, 0, 6, 14);
    // Slingshot Wood
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-2, 12, 4, 12);
    ctx.fillRect(-6, 22, 4, 8);
    ctx.fillRect(2, 22, 4, 8);
    // Slingshot Band
    if (u.state === 'attacking' && u.attackTimer > u.attackCooldown * 0.5) {
      ctx.strokeStyle = '#d4d4d8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-4, 28);
      ctx.lineTo(0, 16); // Pulled back
      ctx.lineTo(4, 28);
      ctx.stroke();
    }
    ctx.restore();
  }

  draw_stone_dinorider(ctx, u) {
    const isPlayer = u.faction === 'player';
    const tunicColor = isPlayer ? '#1d4ed8' : '#b91c1c';
    const dinoColor = '#4d7c0f';
    const skinColor = '#d97736';
    const { walk, swing } = this.getAnimState(u);
    const bounce = Math.abs(walk) * 3;

    ctx.save();
    ctx.translate(0, -bounce);

    // Dino Back Leg
    ctx.fillStyle = '#3f6212';
    ctx.fillRect(-12 + walk * 8, -20, 10, 20);

    // Dino Tail
    ctx.fillStyle = dinoColor;
    ctx.beginPath();
    ctx.moveTo(-25, -35);
    ctx.lineTo(-50, -25 + walk * 4);
    ctx.lineTo(-25, -25);
    ctx.fill();

    // Dino Body
    ctx.fillStyle = dinoColor;
    ctx.beginPath();
    ctx.ellipse(0, -35, 30, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rider Legs
    ctx.fillStyle = skinColor;
    ctx.fillRect(-5, -45, 10, 15);
    
    // Rider Body
    ctx.fillStyle = tunicColor;
    ctx.fillRect(-8, -60, 16, 15);
    
    // Rider Arm (Spear)
    ctx.save();
    ctx.translate(0, -55);
    ctx.rotate(swing * 1.5);
    ctx.fillStyle = skinColor;
    ctx.fillRect(-4, 0, 8, 16);
    // Spear
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-2, -10, 4, 40);
    ctx.fillStyle = '#d4d4d8';
    ctx.beginPath();
    ctx.moveTo(-2, 30);
    ctx.lineTo(0, 45);
    ctx.lineTo(2, 30);
    ctx.fill();
    ctx.restore();

    // Rider Head
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(0, -68, 8, 0, Math.PI * 2);
    ctx.fill();

    // Dino Head
    ctx.fillStyle = dinoColor;
    ctx.beginPath();
    ctx.moveTo(25, -40);
    ctx.lineTo(45, -30);
    ctx.lineTo(45, -15);
    ctx.lineTo(25, -25);
    ctx.fill();
    // Dino Jaw
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(35, -22);
    ctx.lineTo(42, -12);
    ctx.lineTo(25, -18);
    ctx.fill();

    // Dino Front Leg
    ctx.fillStyle = dinoColor;
    ctx.fillRect(8 - walk * 8, -20, 12, 20);

    ctx.restore();
  }

  // ==========================================
  // AGE 2: CASTLE AGE
  // ==========================================

  draw_castle_swordsman(ctx, u) {
    const isPlayer = u.faction === 'player';
    const capeColor = isPlayer ? '#2563eb' : '#dc2626';
    const armorColor = '#94a3b8'; // Silver
    const { walk, swing } = this.getAnimState(u);

    // Cape (Back)
    ctx.fillStyle = capeColor;
    ctx.beginPath();
    ctx.moveTo(-8, -35);
    ctx.lineTo(-20, -10 + walk * 4);
    ctx.lineTo(-5, -15);
    ctx.fill();

    // Back Leg
    ctx.fillStyle = '#475569';
    ctx.fillRect(-8 + walk * 6, -16, 6, 16);

    // Body Armor
    const bodyGrad = ctx.createLinearGradient(0, -35, 0, -15);
    bodyGrad.addColorStop(0, '#e2e8f0');
    bodyGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = bodyGrad;
    ctx.fillRect(-10, -35, 20, 20);

    // Helmet
    ctx.fillStyle = armorColor;
    ctx.beginPath();
    ctx.arc(0, -42, 9, 0, Math.PI * 2);
    ctx.fill();
    // Visor
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(2, -45, 6, 4);

    // Arm (Sword)
    ctx.save();
    ctx.translate(0, -28);
    ctx.rotate(swing * 2 - walk * 0.2);
    ctx.fillStyle = armorColor;
    ctx.fillRect(-4, 0, 8, 16);
    // Sword
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-2, 16);
    ctx.lineTo(2, 16);
    ctx.lineTo(2, 35);
    ctx.lineTo(0, 40);
    ctx.lineTo(-2, 35);
    ctx.fill();
    // Crossguard
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-6, 14, 12, 4);
    ctx.restore();

    // Front Leg
    ctx.fillStyle = '#475569';
    ctx.fillRect(2 - walk * 6, -16, 6, 16);

    // Shield (Front Arm)
    ctx.fillStyle = capeColor;
    ctx.beginPath();
    ctx.moveTo(-4, -25);
    ctx.lineTo(12, -25);
    ctx.lineTo(12, -10);
    ctx.lineTo(4, 0);
    ctx.lineTo(-4, -10);
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  draw_castle_archer(ctx, u) {
    const isPlayer = u.faction === 'player';
    const tunicColor = isPlayer ? '#3b82f6' : '#ef4444';
    const { walk, shoot } = this.getAnimState(u);

    // Legs
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-6 + walk * 6, -14, 4, 14);
    ctx.fillRect(2 - walk * 6, -14, 4, 14);

    // Body (Leather & Cloth)
    ctx.fillStyle = tunicColor;
    ctx.fillRect(-8, -30, 16, 16);
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(-4, -30, 8, 16);

    // Quiver (Back)
    ctx.fillStyle = '#451a03';
    ctx.fillRect(-12, -32, 6, 16);

    // Head (Hood)
    ctx.fillStyle = '#22c55e'; // Ranger green hood
    ctx.beginPath();
    ctx.arc(0, -38, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fcd34d'; // Face
    ctx.beginPath();
    ctx.arc(3, -38, 4, 0, Math.PI * 2);
    ctx.fill();

    // Bow (Front Arm)
    ctx.save();
    ctx.translate(0, -25);
    ctx.rotate(shoot * 1.2 - Math.PI / 2);
    
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(10, 0, 12, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    if (u.state === 'attacking' && u.attackTimer > u.attackCooldown * 0.4) {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, -12);
      ctx.lineTo(0, 0); // Pulled string
      ctx.lineTo(10, 12);
      ctx.stroke();
      
      // Arrow loaded
      ctx.strokeStyle = '#fcd34d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(20, 0);
      ctx.stroke();
    } else {
      // Idle string
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, -12);
      ctx.lineTo(10, 12);
      ctx.stroke();
    }
    ctx.restore();
  }

  draw_castle_knight(ctx, u) {
    const isPlayer = u.faction === 'player';
    const capeColor = isPlayer ? '#1d4ed8' : '#b91c1c';
    const armorColor = '#cbd5e1';
    const horseColor = '#e5e5e5';
    const { walk, swing } = this.getAnimState(u);
    const bounce = Math.abs(walk) * 4;

    ctx.save();
    ctx.translate(0, -bounce);

    // Horse Back Leg
    ctx.fillStyle = '#a3a3a3';
    ctx.fillRect(-15 + walk * 10, -22, 6, 22);

    // Horse Tail
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-35, -45);
    ctx.lineTo(-45, -20 + walk * 4);
    ctx.lineTo(-30, -35);
    ctx.fill();

    // Horse Body
    ctx.fillStyle = horseColor;
    ctx.beginPath();
    ctx.ellipse(0, -42, 35, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    // Barding (Armor on horse)
    ctx.fillStyle = capeColor;
    ctx.beginPath();
    ctx.ellipse(0, -42, 36, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Knight Body
    ctx.fillStyle = armorColor;
    ctx.fillRect(-10, -70, 20, 25);
    
    // Knight Head & Plume
    ctx.fillStyle = armorColor;
    ctx.beginPath();
    ctx.arc(0, -78, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = capeColor;
    ctx.beginPath();
    ctx.moveTo(-5, -88);
    ctx.lineTo(5, -88);
    ctx.lineTo(-15, -75);
    ctx.fill();

    // Lance (Arm)
    ctx.save();
    ctx.translate(0, -60);
    if (u.state === 'attacking') {
      ctx.translate(swing * 20, 0); // Thrust forward
    } else {
      ctx.rotate(-Math.PI / 6); // Pointing slightly up idle
    }
    // Lance Handle
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-30, -2, 60, 4);
    // Lance Tip
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(30, -4);
    ctx.lineTo(50, 0);
    ctx.lineTo(30, 4);
    ctx.fill();
    // Hand
    ctx.fillStyle = armorColor;
    ctx.beginPath();
    ctx.arc(-5, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Horse Head
    ctx.fillStyle = horseColor;
    ctx.beginPath();
    ctx.moveTo(25, -48);
    ctx.lineTo(45, -60);
    ctx.lineTo(55, -40);
    ctx.lineTo(30, -30);
    ctx.fill();
    
    // Horse Armor Mask
    ctx.fillStyle = armorColor;
    ctx.beginPath();
    ctx.moveTo(35, -55);
    ctx.lineTo(55, -40);
    ctx.lineTo(40, -35);
    ctx.fill();

    // Horse Front Leg
    ctx.fillStyle = horseColor;
    ctx.fillRect(15 - walk * 10, -22, 6, 22);
    
    ctx.restore();
  }

  // ==========================================
  // AGE 3: RENAISSANCE
  // ==========================================
  
  draw_renaissance_musketeer(ctx, u) {
    const isPlayer = u.faction === 'player';
    const coatColor = isPlayer ? '#0284c7' : '#dc2626';
    const { walk, shoot } = this.getAnimState(u);

    // Legs (White pants)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-6 + walk * 5, -16, 5, 16);
    ctx.fillRect(2 - walk * 5, -16, 5, 16);

    // Coat
    ctx.fillStyle = coatColor;
    ctx.beginPath();
    ctx.moveTo(-10, -36);
    ctx.lineTo(10, -36);
    ctx.lineTo(12, -14);
    ctx.lineTo(-12, -14);
    ctx.fill();
    // White X belts
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-8, -34);
    ctx.lineTo(8, -16);
    ctx.moveTo(8, -34);
    ctx.lineTo(-8, -16);
    ctx.stroke();

    // Head & Tricorne Hat
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(0, -44, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(-14, -48);
    ctx.lineTo(14, -48);
    ctx.lineTo(0, -60);
    ctx.fill();

    // Musket (Arms)
    ctx.save();
    ctx.translate(0, -28);
    if (u.state === 'attacking') {
      ctx.rotate(0); // Aiming flat
    } else {
      ctx.rotate(-Math.PI / 6); // Resting
    }
    
    // Gun Stock
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-8, -2, 28, 4);
    // Barrel
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(20, -1, 16, 2);
    
    // Muzzle Flash
    if (u.state === 'attacking' && u.attackTimer > u.attackCooldown - 0.1) {
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(40, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(40, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  draw_renaissance_grenadier(ctx, u) {
    const isPlayer = u.faction === 'player';
    const coatColor = isPlayer ? '#0369a1' : '#991b1b';
    const { walk, swing } = this.getAnimState(u);

    // Heavy Boots
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(-8 + walk * 4, -18, 6, 18);
    ctx.fillRect(2 - walk * 4, -18, 6, 18);

    // Thick Coat
    ctx.fillStyle = coatColor;
    ctx.fillRect(-12, -38, 24, 22);

    // Tall Bearskin Hat
    ctx.fillStyle = '#111827';
    ctx.fillRect(-9, -65, 18, 20);
    // Face
    ctx.fillStyle = '#fcd34d';
    ctx.fillRect(-7, -45, 14, 8);

    // Throwing Arm (Grenade)
    ctx.save();
    ctx.translate(0, -30);
    ctx.rotate(swing * 2 - walk * 0.2);
    ctx.fillStyle = coatColor;
    ctx.fillRect(-4, 0, 8, 16);
    
    if (u.state !== 'attacking' || u.attackTimer > u.attackCooldown * 0.5) {
      // Grenade in hand
      ctx.fillStyle = '#1c1917';
      ctx.beginPath();
      ctx.arc(0, 20, 5, 0, Math.PI * 2);
      ctx.fill();
      // Spark
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-1, 12, 2, 4);
    }
    ctx.restore();
  }

  draw_renaissance_ironclad(ctx, u) {
    const isPlayer = u.faction === 'player';
    const metalColor = isPlayer ? '#94a3b8' : '#737373';
    const detailColor = isPlayer ? '#2563eb' : '#dc2626';
    const { walk } = this.getAnimState(u);
    
    const bounce = Math.abs(walk) * 2;
    
    ctx.save();
    ctx.translate(0, -bounce);

    // Treads / Wheels
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.ellipse(0, -15, 35, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ironclad Hull
    ctx.fillStyle = metalColor;
    ctx.beginPath();
    ctx.moveTo(-30, -25);
    ctx.lineTo(25, -25);
    ctx.lineTo(40, -50);
    ctx.lineTo(-40, -50);
    ctx.closePath();
    ctx.fill();
    
    // Faction Trim
    ctx.fillStyle = detailColor;
    ctx.fillRect(-30, -35, 55, 6);

    // Cannon Barrel
    ctx.save();
    ctx.translate(10, -40);
    if (u.state === 'attacking') {
      const recoil = Math.max(0, (u.attackTimer / u.attackCooldown) * 10);
      ctx.translate(-recoil, 0);
    }
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, -6, 40, 12);
    
    if (u.state === 'attacking' && u.attackTimer > u.attackCooldown - 0.2) {
      // Big explosion
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(50, 0, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(50, 0, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Smoke Stack
    ctx.fillStyle = '#334155';
    ctx.fillRect(-20, -75, 12, 25);
    // Smoke puffs
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = '#64748b';
    const puffY = -85 - ((u.animTimer || 0) * 20) % 20;
    ctx.beginPath();
    ctx.arc(-14, puffY, 8 + ((u.animTimer || 0) * 5) % 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // ==========================================
  // AGE 4: MODERN
  // ==========================================

  draw_modern_trooper(ctx, u) {
    const isPlayer = u.faction === 'player';
    const camoColor = isPlayer ? '#4d7c0f' : '#831843'; // Olive vs Dark Maroon
    const { walk, shoot } = this.getAnimState(u);

    // Legs
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(-6 + walk * 5, -16, 5, 16);
    ctx.fillRect(2 - walk * 5, -16, 5, 16);

    // Body
    ctx.fillStyle = camoColor;
    ctx.fillRect(-8, -34, 16, 18);
    // Tactical Vest
    ctx.fillStyle = '#292524';
    ctx.fillRect(-6, -32, 12, 12);

    // Head & Helmet
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(0, -42, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = camoColor;
    ctx.beginPath();
    ctx.arc(0, -44, 8, Math.PI, 0);
    ctx.fill();
    // Visor / Goggles
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(-2, -45, 8, 4);

    // Assault Rifle
    ctx.save();
    ctx.translate(0, -25);
    ctx.rotate(shoot * 0.1); // Slight recoil tilt
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, -2, 20, 4); // Barrel
    ctx.fillRect(-4, -2, 6, 6); // Stock
    ctx.fillRect(8, 2, 3, 6); // Magazine
    
    if (u.state === 'attacking' && u.attackTimer > u.attackCooldown - 0.1) {
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(24, 0, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  draw_modern_bazooka(ctx, u) {
    const isPlayer = u.faction === 'player';
    const camoColor = isPlayer ? '#3f6212' : '#881337';
    const { walk, shoot } = this.getAnimState(u);

    // Heavy Legs
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(-8 + walk * 3, -16, 6, 16);
    ctx.fillRect(2 - walk * 3, -16, 6, 16);

    // Body
    ctx.fillStyle = camoColor;
    ctx.fillRect(-10, -36, 20, 20);

    // Helmet
    ctx.fillStyle = camoColor;
    ctx.beginPath();
    ctx.arc(0, -44, 9, Math.PI, 0);
    ctx.fill();

    // Bazooka Launcher (on shoulder)
    ctx.save();
    ctx.translate(0, -40); // High on shoulder
    ctx.rotate(shoot * 0.2); // Recoil up
    
    ctx.fillStyle = '#3f3f46';
    ctx.fillRect(-15, -6, 40, 12);
    // Rocket tip
    if (u.state !== 'attacking' || u.attackTimer < u.attackCooldown - 0.2) {
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(25, -6);
      ctx.lineTo(35, 0);
      ctx.lineTo(25, 6);
      ctx.fill();
    } else {
      // Fire backblast
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(-20, 0, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  draw_modern_tank(ctx, u) {
    const isPlayer = u.faction === 'player';
    const tankColor = isPlayer ? '#4b5563' : '#3f3f46';
    const camo = isPlayer ? '#65a30d' : '#9f1239';
    const { walk } = this.getAnimState(u);
    const rumble = Math.random() * 1.5;

    ctx.save();
    ctx.translate(0, -rumble);

    // Treads
    ctx.fillStyle = '#171717';
    ctx.beginPath();
    ctx.roundRect(-40, -16, 80, 16, 8);
    ctx.fill();
    // Wheels rolling
    ctx.fillStyle = '#52525b';
    for(let i = -30; i <= 30; i+= 15) {
      ctx.beginPath();
      ctx.arc(i, -8, 6, 0, Math.PI * 2);
      ctx.fill();
      // Spokes
      ctx.save();
      ctx.translate(i, -8);
      ctx.rotate(walk * 10);
      ctx.fillStyle = '#000';
      ctx.fillRect(-1, -6, 2, 12);
      ctx.fillRect(-6, -1, 12, 2);
      ctx.restore();
    }

    // Main Chassis
    ctx.fillStyle = tankColor;
    ctx.beginPath();
    ctx.moveTo(-45, -16);
    ctx.lineTo(40, -16);
    ctx.lineTo(35, -30);
    ctx.lineTo(-40, -30);
    ctx.closePath();
    ctx.fill();
    
    // Camo stripe
    ctx.fillStyle = camo;
    ctx.fillRect(-30, -26, 60, 6);

    // Turret
    ctx.fillStyle = tankColor;
    ctx.beginPath();
    ctx.roundRect(-20, -45, 35, 15, 5);
    ctx.fill();

    // Main Gun
    ctx.save();
    ctx.translate(10, -38);
    if (u.state === 'attacking') {
      const recoil = Math.max(0, (u.attackTimer / u.attackCooldown) * 12);
      ctx.translate(-recoil, 0);
    }
    ctx.fillStyle = '#27272a';
    ctx.fillRect(0, -3, 45, 6);
    // Muzzle Brake
    ctx.fillRect(40, -5, 8, 10);

    if (u.state === 'attacking' && u.attackTimer > u.attackCooldown - 0.2) {
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(55, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(55, 0, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.restore();
  }

  // ==========================================
  // AGE 5: FUTURE
  // ==========================================

  draw_future_cyber(ctx, u) {
    const isPlayer = u.faction === 'player';
    const neonColor = isPlayer ? '#0ea5e9' : '#e11d48'; // Cyan vs Neon Red
    const { walk, swing } = this.getAnimState(u);

    // Holographic Trail
    if (walk !== 0) {
      ctx.fillStyle = neonColor;
      ctx.globalAlpha = 0.3;
      ctx.fillRect(-10 - walk * 10, -35, 12, 35);
      ctx.globalAlpha = 1.0;
    }

    // Cyber Legs
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-6 + walk * 6, -18, 4, 18);
    ctx.fillRect(2 - walk * 6, -18, 4, 18);
    ctx.fillStyle = neonColor;
    ctx.fillRect(-5 + walk * 6, -12, 2, 8); // Neon stripe

    // Cyber Suit
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-8, -36, 16, 18);
    ctx.strokeStyle = neonColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(-8, -36, 16, 18);

    // Energy Core
    ctx.fillStyle = '#fff';
    ctx.shadowColor = neonColor;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, -28, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Cyber Helmet
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, -45, 8, 0, Math.PI * 2);
    ctx.fill();
    // Glowing Visor
    ctx.fillStyle = neonColor;
    ctx.fillRect(-1, -48, 10, 4);

    // Plasma Sword Arm
    ctx.save();
    ctx.translate(0, -30);
    ctx.rotate(swing * 2.5 - walk * 0.2);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-4, 0, 8, 14); // Cyber arm
    
    // Blade
    ctx.shadowColor = neonColor;
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(-2, 14);
    ctx.lineTo(2, 14);
    ctx.lineTo(0, 45);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  draw_future_mech(ctx, u) {
    const isPlayer = u.faction === 'player';
    const primaryColor = isPlayer ? '#e2e8f0' : '#18181b'; // White Mech vs Black Mech
    const energyColor = isPlayer ? '#38bdf8' : '#f43f5e';
    const { walk, shoot } = this.getAnimState(u);
    const bounce = Math.abs(walk) * 2;

    ctx.save();
    ctx.translate(0, -bounce);

    // Mech Legs (Reverse joint)
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    
    // Back Leg
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(-10 + walk * 10, -15);
    ctx.lineTo(0 + walk * 5, 0);
    ctx.stroke();

    // Body Core
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.ellipse(0, -35, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Plasma Cannon (Arm)
    ctx.save();
    ctx.translate(5, -35);
    ctx.rotate(shoot * 0.1);
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, -5, 30, 10);
    // Energy Chambers
    ctx.fillStyle = energyColor;
    ctx.fillRect(10, -3, 5, 6);
    ctx.fillRect(20, -3, 5, 6);
    
    if (u.state === 'attacking' && u.attackTimer > u.attackCooldown - 0.2) {
      // Beam charge
      ctx.shadowColor = energyColor;
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(35, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Front Leg
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(10 - walk * 10, -15);
    ctx.lineTo(5 - walk * 5, 0);
    ctx.stroke();

    // Eye Sensor
    ctx.fillStyle = energyColor;
    ctx.shadowColor = energyColor;
    ctx.shadowBlur = 10;
    ctx.fillRect(10, -40, 8, 4);
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  draw_future_titan(ctx, u) {
    const isPlayer = u.faction === 'player';
    const armorColor = isPlayer ? '#0f172a' : '#450a0a';
    const glowColor = isPlayer ? '#0284c7' : '#dc2626';
    const { walk } = this.getAnimState(u);
    const rumble = Math.random() * 2;

    ctx.save();
    ctx.translate(0, -rumble);
    ctx.scale(1.3, 1.3); // It's huge

    // Massive Legs
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-15 + walk * 8, -25, 12, 25);
    ctx.fillRect(5 - walk * 8, -25, 12, 25);
    // Glowing joints
    ctx.fillStyle = glowColor;
    ctx.fillRect(-12 + walk * 8, -12, 6, 6);
    ctx.fillRect(8 - walk * 8, -12, 6, 6);

    // Torso
    ctx.fillStyle = armorColor;
    ctx.beginPath();
    ctx.moveTo(-25, -25);
    ctx.lineTo(25, -25);
    ctx.lineTo(35, -60);
    ctx.lineTo(-35, -60);
    ctx.closePath();
    ctx.fill();

    // Core Reactor
    ctx.fillStyle = '#fff';
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(0, -45, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Shoulder Pods
    ctx.fillStyle = '#334155';
    ctx.fillRect(-45, -70, 20, 25);
    ctx.fillRect(25, -70, 20, 25);

    // Head
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(0, -70, 10, 0, Math.PI * 2);
    ctx.fill();
    // V-shaped visor
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-6, -75);
    ctx.lineTo(0, -68);
    ctx.lineTo(6, -75);
    ctx.stroke();

    // Arms
    ctx.save();
    ctx.translate(0, -50);
    if (u.state === 'attacking') {
      const punch = Math.max(0, Math.sin((1 - u.attackTimer/u.attackCooldown) * Math.PI));
      ctx.translate(punch * 20, 0); // Big punch forward
    }
    // Front Arm
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(30, -5, 15, 30);
    // Power Fist
    ctx.fillStyle = armorColor;
    ctx.fillRect(28, 25, 19, 15);
    ctx.fillStyle = glowColor;
    ctx.fillRect(35, 30, 5, 5);
    ctx.restore();

    ctx.restore();
  }

  // Fallback
  draw_generic(ctx, u) {
    ctx.fillStyle = '#ec4899'; // Hot pink to easily spot missing assets
    ctx.fillRect(-15, -40, 30, 40);
  }
}
