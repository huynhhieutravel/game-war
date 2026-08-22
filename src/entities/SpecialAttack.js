export class SpecialAttackManager {
  constructor() {
    this.activeAttacks = [];
  }

  triggerSpecial(faction, ageId, engine) {
    const isPlayer = faction === 'player';
    const targetFaction = isPlayer ? 'enemy' : 'player';

    if (ageId === 1) {
      // Age 1: Meteor Swarm
      this.spawnMeteorSwarm(faction, engine);
    } else if (ageId === 2) {
      // Age 2: Arrow Storm
      this.spawnArrowStorm(faction, engine);
    } else if (ageId === 3) {
      // Age 3: Artillery Barrage
      this.spawnArtilleryBarrage(faction, engine);
    } else if (ageId === 4) {
      // Age 4: B-52 Carpet Bombing
      this.spawnCarpetBombing(faction, engine);
    } else {
      // Age 5: Orbital Ion Laser
      this.spawnOrbitalLaser(faction, engine);
    }
  }

  spawnMeteorSwarm(faction, engine) {
    const count = 12;
    engine.sound.playSfx('cannon');
    engine.particles.addScreenFlash('#ea580c', 0.35, 0.4);

    for (let i = 0; i < count; i++) {
      const delay = i * 0.25;
      const targetX = 300 + Math.random() * (engine.worldWidth - 600);
      const startX = targetX - 250;
      const startY = -100;

      this.activeAttacks.push({
        type: 'meteor',
        faction,
        delay,
        x: startX,
        y: startY,
        targetX,
        targetY: engine.groundY,
        speed: 700,
        damage: 85,
        radius: 80,
        isDead: false
      });
    }
  }

  spawnArrowStorm(faction, engine) {
    const waves = 4;
    engine.sound.playSfx('arrow_shoot');

    for (let w = 0; w < waves; w++) {
      for (let i = 0; i < 10; i++) {
        const delay = w * 0.3 + i * 0.04;
        const targetX = 350 + Math.random() * (engine.worldWidth - 700);
        const startX = faction === 'player' ? targetX - 200 : targetX + 200;
        const startY = -50 - Math.random() * 100;

        this.activeAttacks.push({
          type: 'storm_arrow',
          faction,
          delay,
          x: startX,
          y: startY,
          targetX,
          targetY: engine.groundY,
          speed: 800,
          damage: 48,
          radius: 35,
          isDead: false
        });
      }
    }
  }

  spawnArtilleryBarrage(faction, engine) {
    const shellCount = 14;
    engine.sound.playSfx('cannon');
    engine.particles.addScreenFlash('#f59e0b', 0.4, 0.3);

    for (let i = 0; i < shellCount; i++) {
      const delay = i * 0.22;
      const targetX = 350 + Math.random() * (engine.worldWidth - 700);
      const startX = targetX + (Math.random() * 100 - 50);
      const startY = -150;

      this.activeAttacks.push({
        type: 'artillery_shell',
        faction,
        delay,
        x: startX,
        y: startY,
        targetX,
        targetY: engine.groundY,
        speed: 950,
        damage: 320,
        radius: 95,
        isDead: false
      });
    }
  }

  spawnCarpetBombing(faction, engine) {
    engine.sound.playSfx('siren');
    engine.particles.addScreenFlash('#ef4444', 0.3, 0.5);

    const isPlayer = faction === 'player';
    const bomberStartX = isPlayer ? -200 : engine.worldWidth + 200;
    const bomberTargetX = isPlayer ? engine.worldWidth + 200 : -200;

    this.activeAttacks.push({
      type: 'bomber_plane',
      faction,
      delay: 0.5,
      x: bomberStartX,
      y: 70,
      startX: bomberStartX,
      targetX: bomberTargetX,
      speed: 900,
      bombTimer: 0,
      bombInterval: 0.08,
      duration: 3.0,
      isDead: false
    });
  }

  spawnB52CarpetBomb(faction, engine) {
    this.spawnCarpetBombing(faction, engine);
  }

  spawnOrbitalLaser(faction, engine) {
    engine.sound.playSfx('laser');
    engine.particles.addScreenFlash('#06b6d4', 0.6, 0.6);
    engine.camera.shake(12, 4.0);

    const targetStartX = faction === 'player' ? 300 : engine.worldWidth - 300;
    const targetEndX = faction === 'player' ? engine.worldWidth - 100 : 100;

    this.activeAttacks.push({
      type: 'orbital_beam',
      faction,
      delay: 0,
      x: targetStartX,
      targetX: targetEndX,
      y: 0,
      speed: 400,
      duration: 4.5,
      elapsed: 0,
      dps: 1800,
      radius: 120,
      isDead: false
    });
  }

  update(dt, engine) {
    for (let i = this.activeAttacks.length - 1; i >= 0; i--) {
      const atk = this.activeAttacks[i];

      if (atk.delay > 0) {
        atk.delay -= dt;
        continue;
      }

      if (atk.type === 'meteor' || atk.type === 'storm_arrow' || atk.type === 'artillery_shell') {
        const dx = atk.targetX - atk.x;
        const dy = atk.targetY - atk.y;
        const dist = Math.hypot(dx, dy);
        const step = atk.speed * dt;

        if (dist <= step) {
          // Hit Ground
          atk.isDead = true;
          this.applyImpact(atk, engine);
        } else {
          atk.x += (dx / dist) * step;
          atk.y += (dy / dist) * step;

          if (atk.type === 'meteor') {
            engine.particles.emitSparks(atk.x, atk.y, 4, '#ea580c');
          } else if (atk.type === 'storm_arrow') {
            engine.particles.emitSparks(atk.x, atk.y, 1, '#f97316');
          }
        }
      } else if (atk.type === 'bomber_plane') {
        const dir = atk.targetX > atk.startX ? 1 : -1;
        atk.x += dir * atk.speed * dt;

        // Drop bombs continuously
        atk.bombTimer += dt;
        if (atk.bombTimer >= atk.bombInterval && atk.x >= 200 && atk.x <= engine.worldWidth - 200) {
          atk.bombTimer = 0;
          this.activeAttacks.push({
            type: 'artillery_shell',
            faction: atk.faction,
            delay: 0,
            x: atk.x,
            y: atk.y + 20,
            targetX: atk.x + (Math.random() * 40 - 20),
            targetY: engine.groundY,
            speed: 600,
            damage: 650,
            radius: 110,
            isDead: false
          });
        }

        if ((dir === 1 && atk.x > atk.targetX) || (dir === -1 && atk.x < atk.targetX)) {
          atk.isDead = true;
        }
      } else if (atk.type === 'orbital_beam') {
        atk.elapsed += dt;
        const progress = Math.min(1, atk.elapsed / atk.duration);
        atk.x = atk.x + (atk.targetX - atk.x) * (dt * 1.5);

        // Continuous damage along sweep area
        const enemyFaction = atk.faction === 'player' ? 'enemy' : 'player';
        const enemyUnits = atk.faction === 'player' ? engine.enemyUnits : engine.playerUnits;
        const enemyBase = atk.faction === 'player' ? engine.enemyBase : engine.playerBase;

        for (const unit of enemyUnits) {
          if (unit.state === 'dying' || unit.state === 'dead') continue;
          if (Math.abs(unit.x - atk.x) <= atk.radius) {
            unit.takeDamage(Math.round(atk.dps * dt), false, engine);
          }
        }

        if (Math.abs(enemyBase.x - atk.x) <= atk.radius + 30) {
          enemyBase.takeDamage(Math.round(atk.dps * dt * 0.5), false, engine);
        }

        // Particle sparks on ground
        engine.particles.emitSparks(atk.x + (Math.random() * 80 - 40), engine.groundY, 6, '#06b6d4');

        if (atk.elapsed >= atk.duration) {
          atk.isDead = true;
        }
      }

      if (atk.isDead) {
        this.activeAttacks.splice(i, 1);
      }
    }
  }

  applyImpact(atk, engine) {
    engine.particles.emitExplosion(atk.targetX, atk.targetY, atk.radius);
    engine.sound.playSfx('explosion');
    engine.camera.shake(atk.radius > 70 ? 8 : 4, 0.3);

    const enemyUnits = atk.faction === 'player' ? engine.enemyUnits : engine.playerUnits;
    const enemyBase = atk.faction === 'player' ? engine.enemyBase : engine.playerBase;

    for (const unit of enemyUnits) {
      if (unit.state === 'dying' || unit.state === 'dead') continue;
      const dist = Math.abs(unit.x - atk.targetX);
      if (dist <= atk.radius) {
        const falloff = 1 - (dist / atk.radius) * 0.3;
        unit.takeDamage(Math.round(atk.damage * falloff), false, engine);
      }
    }

    if (Math.abs(enemyBase.x - atk.targetX) <= atk.radius + 30) {
      enemyBase.takeDamage(atk.damage, false, engine);
    }
  }

  render(ctx, camera, groundY) {
    for (const atk of this.activeAttacks) {
      if (atk.delay > 0) continue;

      const screenX = camera.worldToScreen(atk.x);
      const screenY = atk.y + camera.getShakeOffset().y;

      if (atk.type === 'meteor') {
        ctx.save();
        ctx.translate(screenX, screenY);
        // Meteor Body
        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (atk.type === 'storm_arrow') {
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (atk.type === 'artillery_shell') {
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (atk.type === 'bomber_plane') {
        ctx.save();
        ctx.translate(screenX, screenY);
        const dir = atk.targetX > atk.startX ? 1 : -1;
        ctx.scale(dir, 1);
        // Stealth Bomber silhouette
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(40, 0);
        ctx.lineTo(-40, -25);
        ctx.lineTo(-20, 0);
        ctx.lineTo(-40, 25);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else if (atk.type === 'orbital_beam') {
        ctx.save();
        // Massive vertical beam from sky to ground
        const grad = ctx.createLinearGradient(screenX - atk.radius, 0, screenX + atk.radius, 0);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        grad.addColorStop(0.3, 'rgba(6, 182, 212, 0.6)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.6)');
        grad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(screenX - atk.radius, 0, atk.radius * 2, groundY);
        ctx.restore();
      }
    }
  }

  clear() {
    this.activeAttacks = [];
  }
}
