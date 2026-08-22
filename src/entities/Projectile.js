export class Projectile {
  constructor(params) {
    this.type = params.type || 'arrow';
    this.faction = params.faction;
    this.x = params.originX;
    this.y = params.originY;
    this.originX = params.originX;
    this.originY = params.originY;
    this.targetX = params.targetX;
    this.targetY = params.targetY;
    this.speed = params.speed || 400;

    // 3-Tier RPG Stats
    this.physAtk = params.physAtk !== undefined ? params.physAtk : (params.damage || 20);
    this.magAtk = params.magAtk || 0;
    this.trueDmg = params.trueDmg || 0;
    this.armorPen = params.armorPen || 0;
    this.magPen = params.magPen || 0;
    this.element = params.element || 'fire';
    this.critRate = params.critRate || 0.1;
    this.critDmg = params.critDmg || 1.5;
    this.lifeSteal = params.lifeSteal || 0;
    this.attacker = params.attacker || null;

    this.aoeRadius = params.aoeRadius || 0;
    this.target = params.target;

    this.isDead = false;
    this.totalDistance = Math.hypot(this.targetX - this.originX, this.targetY - this.originY);
    this.travelTime = Math.max(0.08, this.totalDistance / this.speed);
    this.elapsedTime = 0;

    // Arc height for ballistic projectiles (rocks, arrows, grenades, fireballs)
    this.isArc = ['rock', 'giant_rock', 'arrow', 'heavy_bolt', 'grenade', 'fireball'].includes(this.type);
    this.arcHeight = this.isArc ? Math.min(160, this.totalDistance * 0.35) : 0;

    this.currentAngle = 0;
    this.trailTimer = 0;
  }

  update(dt, engine) {
    // Dynamic tracking for homing projectiles or just better accuracy
    if (this.target && this.target.state !== 'dead' && this.target.state !== 'dying') {
      this.targetX = this.target.x;
      this.targetY = this.target.y ? this.target.y - 25 : engine.groundY - 30;
      this.totalDistance = Math.hypot(this.targetX - this.originX, this.targetY - this.originY);
      this.travelTime = Math.max(0.08, this.totalDistance / this.speed);
    }

    this.elapsedTime += dt;
    const progress = Math.min(1, this.elapsedTime / this.travelTime);

    const prevX = this.x;
    const prevY = this.y;

    // Linear interpolation for X
    this.x = this.originX + (this.targetX - this.originX) * progress;

    if (this.isArc) {
      // Parabolic arc Y: base line + parabola offset (4 * H * p * (1 - p))
      const baseY = this.originY + (this.targetY - this.originY) * progress;
      const arcOffset = 4 * this.arcHeight * progress * (1 - progress);
      this.y = baseY - arcOffset;
    } else {
      this.y = this.originY + (this.targetY - this.originY) * progress;
    }

    this.currentAngle = Math.atan2(this.y - prevY, this.x - prevX);

    // Particle trails
    this.trailTimer += dt;
    if (this.trailTimer >= 0.03) {
      this.trailTimer = 0;
      if (this.type === 'rocket' || this.type === 'turret_missile') {
        engine.particles.emitSmokeTrail(this.x, this.y);
      } else if (this.type === 'fireball') {
        engine.particles.emitSparks(this.x, this.y, 2, '#f97316');
      } else if (this.type.includes('plasma') || this.type.includes('ion') || this.type.includes('laser')) {
        engine.particles.emitLaserGlow(this.x, this.y, '#06b6d4');
      }
    }

    // Check arrival / impact
    if (progress >= 1 || this.y >= engine.groundY) {
      this.impact(engine);
    }
  }

  impact(engine) {
    this.isDead = true;
    const enemyUnits = this.faction === 'player' ? engine.enemyUnits : engine.playerUnits;
    const enemyBase = this.faction === 'player' ? engine.enemyBase : engine.playerBase;
    const isCrit = Math.random() < this.critRate;

    // Play impact sound & explosions
    if (this.aoeRadius > 0) {
      engine.particles.emitExplosion(this.x, this.y, this.aoeRadius);
      engine.sound.playSfx('explosion');
      engine.camera.shake(this.aoeRadius > 70 ? 6 : 3, 0.25);

      // Area of effect damage
      for (const enemy of enemyUnits) {
        if (enemy.state === 'dying' || enemy.state === 'dead') continue;
        const dist = Math.abs(enemy.x - this.x);
        if (dist <= this.aoeRadius) {
          const falloff = 1 - (dist / this.aoeRadius) * 0.4;
          const pDmg = Math.round(this.physAtk * falloff);
          const mDmg = Math.round(this.magAtk * falloff);
          const tDmg = Math.round(this.trueDmg * falloff);
          enemy.takeDamage(pDmg, mDmg, tDmg, this.armorPen, this.magPen, this.element, isCrit, this.critDmg, this.attacker);
        }
      }

      // Check boss in radius
      if (this.faction === 'player' && engine.activeBoss && engine.activeBoss.state !== 'dead') {
        if (Math.abs(engine.activeBoss.x - this.x) <= this.aoeRadius + 60) {
          engine.activeBoss.takeDamage(this.physAtk, this.magAtk, this.trueDmg, this.armorPen, this.magPen, this.element, isCrit, this.critDmg, this.attacker);
        }
      }

      // Check base in radius
      if (enemyBase && Math.abs(enemyBase.x - this.x) <= this.aoeRadius + 40) {
        enemyBase.takeDamage(this.physAtk, this.magAtk, this.trueDmg, this.armorPen, this.magPen, this.element, isCrit, this.critDmg, this.attacker);
      }
    } else {
      // Single Target Impact
      if (this.target && this.target.state !== 'dead' && this.target.state !== 'dying') {
        this.target.takeDamage(this.physAtk, this.magAtk, this.trueDmg, this.armorPen, this.magPen, this.element, isCrit, this.critDmg, this.attacker);

        if (this.type.includes('plasma') || this.type.includes('laser') || this.type.includes('ion')) {
          engine.particles.emitLaserGlow(this.x, this.y, '#38bdf8');
        } else {
          engine.particles.emitSparks(this.x, this.y, 4, '#fbbf24');
        }
      } else {
        // Fallback: hit closest enemy near impact
        for (const enemy of enemyUnits) {
          if (enemy.state === 'dying' || enemy.state === 'dead') continue;
          if (Math.abs(enemy.x - this.x) < 30) {
            enemy.takeDamage(this.physAtk, this.magAtk, this.trueDmg, this.armorPen, this.magPen, this.element, isCrit, this.critDmg, this.attacker);
            break;
          }
        }
      }
    }
  }

  render(ctx, camera) {
    const screenX = camera.worldToScreen(this.x);
    const screenY = this.y + camera.getShakeOffset().y;

    if (screenX < -50 || screenX > camera.viewportWidth + 50) return;

    ctx.save();
    ctx.translate(screenX, screenY);
    ctx.rotate(this.currentAngle);

    if (this.type === 'rock' || this.type === 'giant_rock') {
      ctx.fillStyle = '#78350f';
      const r = this.type === 'giant_rock' ? 7 : 4;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'arrow' || this.type === 'heavy_bolt') {
      const isHeavy = this.type === 'heavy_bolt';
      ctx.strokeStyle = isHeavy ? '#cbd5e1' : '#78350f';
      ctx.lineWidth = isHeavy ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.stroke();

      ctx.fillStyle = isHeavy ? '#94a3b8' : '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(5, -3);
      ctx.lineTo(5, 3);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'bullet') {
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-6, -1.5, 12, 3);
    } else if (this.type === 'grenade') {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'rocket' || this.type === 'turret_missile') {
      ctx.fillStyle = '#475569';
      ctx.fillRect(-12, -3, 24, 6);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(8, -3);
      ctx.lineTo(8, 3);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'tank_shell') {
      ctx.fillStyle = '#eab308';
      ctx.fillRect(-10, -2.5, 20, 5);
    } else if (this.type === 'plasma_bolt') {
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'ion_beam' || this.type === 'god_laser') {
      ctx.fillStyle = '#a855f7';
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 14;
      ctx.fillRect(-18, -3, 36, 6);
    } else if (this.type === 'fireball') {
      ctx.fillStyle = '#f97316';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}
