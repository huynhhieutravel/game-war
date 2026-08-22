import { TURRETS } from '../config/turrets.js';

export class Turret {
  constructor(turretKey) {
    const config = TURRETS[turretKey];
    if (!config) {
      throw new Error(`Turret config for ${turretKey} not found!`);
    }

    this.id = turretKey;
    this.name = config.name;
    this.nameVi = config.nameVi;
    this.cost = config.cost;
    this.sellValue = config.sellValue;
    this.damage = config.damage;
    this.range = config.range;
    this.fireCooldown = config.fireCooldown;
    this.projectileType = config.projectileType;
    this.projectileSpeed = config.projectileSpeed;
    this.aoeRadius = config.aoeRadius || 0;
    this.burstCount = config.burstCount || 1;

    this.cooldownTimer = Math.random() * 0.5; // Stagger initial shots
    this.targetAngle = 0;
    this.target = null;
  }

  update(dt, slotWorldX, slotWorldY, engine, faction) {
    if (this.cooldownTimer > 0) {
      this.cooldownTimer -= dt;
    }

    // Find nearest enemy in range
    const enemyUnits = faction === 'player' ? engine.enemyUnits : engine.playerUnits;
    const enemyBase = faction === 'player' ? engine.enemyBase : engine.playerBase;

    let closestTarget = null;
    let minDistance = this.range;

    for (const enemy of enemyUnits) {
      if (enemy.state === 'dying' || enemy.state === 'dead') continue;
      const dx = enemy.x - slotWorldX;
      const dy = (engine.groundY - enemy.height * 0.5) - slotWorldY;
      const dist = Math.hypot(dx, dy);

      // Check if target is in front of the base
      const inFront = faction === 'player' ? dx > 0 : dx < 0;
      if (inFront && dist <= minDistance) {
        minDistance = dist;
        closestTarget = enemy;
      }
    }

    // If no unit, target base if within range
    if (!closestTarget) {
      const dx = enemyBase.x - slotWorldX;
      const dy = (engine.groundY - 100) - slotWorldY;
      const dist = Math.hypot(dx, dy);
      const inFront = faction === 'player' ? dx > 0 : dx < 0;
      if (inFront && dist <= minDistance) {
        closestTarget = enemyBase;
      }
    }

    if (closestTarget) {
      this.target = closestTarget;
      const targetY = closestTarget.height ? engine.groundY - closestTarget.height * 0.5 : engine.groundY - 100;
      const dx = closestTarget.x - slotWorldX;
      const dy = targetY - slotWorldY;
      this.targetAngle = Math.atan2(dy, faction === 'player' ? dx : -dx);

      if (this.cooldownTimer <= 0) {
        this.fire(slotWorldX, slotWorldY, closestTarget, engine, faction);
        this.cooldownTimer = this.fireCooldown;
      }
    } else {
      this.target = null;
    }
  }

  fire(slotX, slotY, target, engine, faction) {
    const targetY = target.height ? engine.groundY - target.height * 0.5 : engine.groundY - 100;

    engine.spawnProjectile({
      type: this.projectileType,
      faction,
      originX: slotX,
      originY: slotY,
      targetX: target.x,
      targetY,
      speed: this.projectileSpeed,
      damage: this.damage,
      aoeRadius: this.aoeRadius,
      target
    });

    // Sound effect
    if (this.projectileType.includes('rock') || this.projectileType.includes('bolt')) {
      engine.sound.playSfx('arrow_shoot');
    } else if (this.projectileType.includes('cannon') || this.projectileType.includes('fireball')) {
      engine.sound.playSfx('cannon');
    } else if (this.projectileType.includes('bullet')) {
      engine.sound.playSfx('gunshot');
    } else if (this.projectileType.includes('missile')) {
      engine.sound.playSfx('rocket_launch');
    } else {
      engine.sound.playSfx('laser');
    }
  }
}
