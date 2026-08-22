import { BOSSES } from '../config/bosses.js';

export class Boss {
  constructor(bossKey, faction = 'enemy', startX, engine = null) {
    const config = BOSSES[bossKey];
    if (!config) {
      throw new Error(`Boss config ${bossKey} not found!`);
    }

    this.isBoss = true;
    this.type = bossKey;
    this.faction = faction;
    this.ageId = config.ageId;
    this.name = config.name;
    this.nameVi = config.nameVi;
    this.title = config.title;
    this.engine = engine;

    this.x = startX;
    this.hp = config.hp;
    this.maxHp = config.hp;
    this.damage = config.damage;
    this.attackRange = config.attackRange;
    this.attackCooldown = config.attackCooldown;
    this.moveSpeed = config.moveSpeed;

    this.projectileType = config.projectileType || null;
    this.projectileSpeed = config.projectileSpeed || 450;
    this.aoeRadius = config.aoeRadius || 0;

    this.width = config.width || 140;
    this.height = config.height || 120;

    this.killBounty = config.killBounty;
    this.xpReward = config.xpReward;

    // Unique Skill ID Integration
    this.specialSkillId = config.specialSkillId || 'SKILL_BOSS_PRIMAL_ROAR_801';
    this.specialMaxCooldown = config.specialCooldown || 12;
    this.specialTimer = this.specialMaxCooldown * 0.5; // Starts half charged

    this.state = 'walking';
    this.attackTimer = 0;
    this.animTime = 0;
    this.hitFlashTimer = 0;
    this.deathTimer = 1.2;
    this.deathDuration = 1.2;
  }

  update(dt, engine) {
    this.engine = engine;
    if (this.state === 'dead') return;

    if (this.state === 'dying') {
      this.deathTimer -= dt;
      if (this.deathTimer <= 0) {
        this.state = 'dead';
      }
      return;
    }

    this.animTime += dt;
    if (this.attackTimer > 0) this.attackTimer -= dt;
    if (this.hitFlashTimer > 0) this.hitFlashTimer -= dt;

    // Update Special Skill Cooldown
    this.specialTimer -= dt;
    if (this.specialTimer <= 0) {
      this.useSpecialSkill(engine);
      this.specialTimer = this.specialMaxCooldown;
    }

    // Find closest target
    const enemyUnits = this.faction === 'player' ? engine.enemyUnits : engine.playerUnits;
    const enemyBase = this.faction === 'player' ? engine.enemyBase : engine.playerBase;

    let target = null;
    let minDistance = Infinity;

    for (const unit of enemyUnits) {
      if (unit.state === 'dying' || unit.state === 'dead') continue;
      const dist = this.faction === 'player' ? (unit.x - this.x) : (this.x - unit.x);
      if (dist >= 0 && dist < minDistance) {
        minDistance = dist;
        target = unit;
      }
    }

    const distToBase = this.faction === 'player' ? (enemyBase.x - this.x) : (this.x - enemyBase.x);
    if (distToBase >= 0 && distToBase < minDistance) {
      minDistance = distToBase;
      target = enemyBase;
    }

    if (target && minDistance <= this.attackRange + (target.width ? target.width / 2 : 30)) {
      this.state = 'attacking';
      if (this.attackTimer <= 0) {
        this.executeAttack(target, engine);
        this.attackTimer = this.attackCooldown;
      }
    } else {
      this.state = 'walking';
      const dir = this.faction === 'player' ? 1 : -1;
      this.x += dir * this.moveSpeed * dt;
    }
  }

  executeAttack(target, engine) {
    if (this.projectileType) {
      const originX = this.x + (this.faction === 'player' ? this.width / 2 : -this.width / 2);
      const originY = engine.groundY - this.height * 0.6;
      const targetX = target.x;
      const targetY = engine.groundY - (target.height ? target.height * 0.5 : 40);

      engine.spawnProjectile({
        type: this.projectileType,
        faction: this.faction,
        originX,
        originY,
        targetX,
        targetY,
        speed: this.projectileSpeed,
        physAtk: this.damage,
        magAtk: 0,
        trueDmg: 0,
        aoeRadius: this.aoeRadius,
        attacker: this,
        target
      });
    } else {
      // Melee Boss Crush
      const isCrit = Math.random() < 0.2;
      target.takeDamage(this.damage, 0, 0, 0.2, 0, 'fire', isCrit, 1.5, this);
      engine.sound.playSfx('hit_club');
      engine.camera.shake(6, 0.2);
    }
  }

  useSpecialSkill(engine) {
    if (this.state === 'dying' || this.state === 'dead') return;
    if (engine && engine.skillEngine) {
      engine.skillEngine.executeSkill(this.specialSkillId, this);
    }
  }

  takeDamage(physAtk = 0, magAtk = 0, trueDmg = 0, attackerArmorPen = 0, attackerMagPen = 0, attackerElement = 'fire', isCrit = false, critDmg = 1.5, attacker = null) {
    if (this.state === 'dying' || this.state === 'dead') return;

    const engine = this.engine || (attacker ? attacker.engine : null);
    
    // Boss armor mitigation
    const effArmor = Math.max(0, 30 * (1 - attackerArmorPen));
    const effMagRes = Math.max(0, 20 * (1 - attackerMagPen));
    let physDamage = physAtk * (100 / (100 + effArmor));
    let magDamage = magAtk * (100 / (100 + effMagRes));
    let amount = physDamage + magDamage;
    if (isCrit) amount *= critDmg;
    amount = Math.max(1, Math.round(amount + trueDmg));

    this.hp -= amount;
    this.hitFlashTimer = 0.08;

    if (engine) {
      engine.particles.addFloatingText(
        isCrit ? `💥 CRIT -${amount}!` : `-${amount}`,
        this.x,
        engine.groundY - this.height,
        isCrit ? '#fbbf24' : '#ef4444',
        isCrit ? 18 : 14,
        isCrit
      );
    }

    // LifeSteal for Attacker
    if (attacker && attacker.lifeSteal > 0 && attacker.state !== 'dead') {
      const healAmt = Math.round(amount * attacker.lifeSteal);
      if (healAmt > 0) {
        attacker.hp = Math.min(attacker.maxHp, attacker.hp + healAmt);
        if (engine) engine.particles.addFloatingText(`+${healAmt} HP`, attacker.x, attacker.y - 35, '#22c55e', 11);
      }
    }

    if (this.hp <= 0) {
      this.hp = 0;
      this.state = 'dying';
      this.deathTimer = this.deathDuration;

      if (engine) {
        // Rewards
        const killerBase = this.faction === 'player' ? engine.enemyBase : engine.playerBase;
        killerBase.gold += this.killBounty;
        killerBase.xp += this.xpReward;

        if (this.faction === 'enemy') {
          engine.particles.addFloatingText(`DIỆT TRÙM: +${this.killBounty}G!`, this.x, engine.groundY - this.height - 20, '#fbbf24', 20, true);
          engine.particles.addFloatingText(`+${this.xpReward} XP`, this.x, engine.groundY - this.height - 45, '#38bdf8', 18, true);
          engine.triggerComboKill('EXTINCTION EVENT! (DIỆT TRÙM)');
        }

        engine.particles.emitExplosion(this.x, engine.groundY - this.height * 0.5, 90);
        engine.sound.playSfx('victory');
        engine.camera.shake(14, 0.8);
      }
    }
  }
}
