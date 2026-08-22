import { UNITS } from '../config/units.js';
import { UnitRenderer } from '../render/UnitRenderer.js';
import { getElementalMultiplier } from '../config/elements.js';

export class Unit {
  constructor(configKey, faction, x, y, engine) {
    this.configKey = configKey;
    const config = UNITS[configKey] || UNITS.stone_clubman;

    this.faction = faction; // 'player' | 'enemy'
    this.x = x;
    this.y = y;
    this.engine = engine;

    // Config info
    this.name = config.name;
    this.nameVi = config.nameVi;
    this.ageId = config.ageId;
    this.role = config.role;
    this.element = config.element || 'fire';

    // === TẦNG 1: SINH MỆNH, CƠ ĐỘNG & BẢO HỘ ===
    this.maxHp = config.hp;
    this.hp = config.hp;
    this.maxShield = config.shield || 0;
    this.shield = config.shield || 0;
    this.physicalArmor = config.physicalArmor || 0;
    this.magicResistance = config.magicResistance || 0;
    this.tenacity = config.tenacity || 0;
    this.hpRegen = config.hpRegen || 0;
    this.moveSpeed = config.moveSpeed;

    // === TẦNG 2: SỨC MẠNH CÔNG KÍCH & NGUYÊN TỐ ===
    this.physicalAttack = config.physicalAttack || 0;
    this.magicAttack = config.magicAttack || 0;
    this.trueDamage = config.trueDamage || 0;
    this.attackRange = config.attackRange;
    this.attackCooldown = config.attackCooldown;
    this.critRate = config.critRate || 0.1;
    this.critDamage = config.critDamage || 1.5;
    this.armorPenetration = config.armorPenetration || 0;
    this.magicPenetration = config.magicPenetration || 0;
    this.lifeSteal = config.lifeSteal || 0;

    // === TẦNG 3: NĂNG LƯỢNG & KỸ NĂNG TUYỆT KỸ ===
    this.maxMana = config.maxMana || 100;
    this.mana = config.startingMana || 0;
    this.manaPerAttack = config.manaPerAttack || 25;
    this.aoeRadius = config.aoeRadius || 0;
    this.pierceCount = config.pierceCount || 1;

    // Combat & Animation States
    this.state = 'walking'; // 'walking' | 'attacking' | 'dying' | 'dead'
    this.attackTimer = 0;
    this.animTimer = 0;
    this.deathTimer = 0;
    this.deathDuration = 1.0; // 1 second to die
    this.hitFlashTimer = 0;
    this.width = 40;
    this.height = 55;
    this.stunTimer = 0;

    // Rewards
    this.xpReward = config.xpReward;
    this.killBounty = config.killBounty;
  }

  update(dt, engineOrUnits, enemyBaseParam, playerBaseParam) {
    if (this.hitFlashTimer > 0) {
      this.hitFlashTimer -= dt;
    }

    if (this.state === 'dead') {
      return;
    }

    if (this.state === 'dying') {
      this.deathTimer += dt;
      if (this.deathTimer >= this.deathDuration) {
        this.state = 'dead';
      }
      return;
    }

    let engine = this.engine;
    let units = [];
    let enemyBase = enemyBaseParam;
    let playerBase = playerBaseParam;

    if (engineOrUnits && engineOrUnits.playerUnits && engineOrUnits.enemyUnits) {
      engine = engineOrUnits;
      this.engine = engine;
      units = [...engine.playerUnits, ...engine.enemyUnits];
      enemyBase = engine.enemyBase;
      playerBase = engine.playerBase;
    } else if (Array.isArray(engineOrUnits)) {
      units = engineOrUnits;
    }

    // Tenacity reduces stun time faster
    if (this.stunTimer > 0) {
      this.stunTimer -= dt * (1 + this.tenacity);
      return;
    }

    // Natural HP Regen
    if (this.hp < this.maxHp && this.hpRegen > 0) {
      this.hp = Math.min(this.maxHp, this.hp + this.hpRegen * dt);
    }

    // Shield Regen for Future Titan
    if (this.configKey === 'fut_god_titan' && this.shield < this.maxShield) {
      this.shield = Math.min(this.maxShield, this.shield + 20 * dt);
    }

    this.animTimer += dt;
    if (this.attackTimer > 0) {
      this.attackTimer -= dt;
    }

    // Find Target
    const target = this.findTarget(units, enemyBase, playerBase);

    // Tactical Command Modifiers
    const base = this.faction === 'player' ? playerBase : enemyBase;
    const isFallingBack = base && base.isFallingBack;
    const isCharging = base && base.isCharging;

    if (isFallingBack && this.faction === 'player' && playerBase) {
      const retreatSpeed = this.moveSpeed * 1.1;
      this.x = Math.max(playerBase.x + 80, this.x - retreatSpeed * dt);
      this.state = 'walking';
      return;
    }

    let currentSpeed = this.moveSpeed;
    if (isCharging) {
      currentSpeed *= 1.5;
    }

    if (target) {
      const distance = Math.abs(target.x - this.x);
      if (distance <= this.attackRange) {
        this.state = 'attacking';
        let cooldown = this.attackCooldown;
        if (isCharging) cooldown *= 0.75;

        if (this.attackTimer <= 0) {
          this.performAttack(target);
          this.attackTimer = cooldown;
        }
      } else {
        this.state = 'walking';
        this.moveForward(dt, currentSpeed, units);
      }
    } else {
      this.state = 'walking';
      this.moveForward(dt, currentSpeed, units);
    }
  }

  moveForward(dt, speed, units) {
    const dir = this.faction === 'player' ? 1 : -1;
    const nextX = this.x + dir * speed * dt;

    // Friendly Unit Collision Avoidance
    const minSpacing = 28;
    for (const other of units) {
      if (other !== this && other.faction === this.faction && other.state !== 'dead') {
        if (this.faction === 'player' && other.x > this.x && other.x - this.x < minSpacing) {
          return;
        }
        if (this.faction === 'enemy' && other.x < this.x && this.x - other.x < minSpacing) {
          return;
        }
      }
    }

    this.x = nextX;
  }

  findTarget(units, enemyBase, playerBase) {
    const oppFaction = this.faction === 'player' ? 'enemy' : 'player';
    let closestEnemy = null;
    let closestDist = Infinity;

    // Check Enemy Units
    if (Array.isArray(units)) {
      for (const u of units) {
        if (u.faction === oppFaction && u.state !== 'dead') {
          const dist = this.faction === 'player' ? u.x - this.x : this.x - u.x;
          if (dist > 0 && dist < closestDist) {
            closestDist = dist;
            closestEnemy = u;
          }
        }
      }
    }

    // Check Boss
    if (this.faction === 'player' && this.engine && this.engine.activeBoss && this.engine.activeBoss.state !== 'dead') {
      const bDist = this.engine.activeBoss.x - this.x;
      if (bDist > 0 && bDist < closestDist) {
        closestDist = bDist;
        closestEnemy = this.engine.activeBoss;
      }
    }

    if (closestEnemy && closestDist <= this.attackRange + 400) {
      return closestEnemy;
    }

    // Check Base
    const targetBase = this.faction === 'player' ? enemyBase : playerBase;
    if (targetBase) {
      const baseDist = this.faction === 'player' ? targetBase.x - this.x : this.x - targetBase.x;
      if (baseDist > 0 && (!closestEnemy || baseDist < closestDist)) {
        return targetBase;
      }
    }

    return closestEnemy;
  }

  performAttack(target) {
    const isRanged = this.role === 'ranged' || this.role === 'ranged_aoe' || this.configKey === 'ren_musketeer' || this.configKey === 'fut_plasma_trooper';

    if (isRanged && UNITS[this.configKey].projectileSpeed && this.engine) {
      let pType = 'arrow';
      if (this.configKey === 'stone_slingshot') pType = 'rock';
      else if (this.configKey === 'castle_archer') pType = 'arrow';
      else if (this.configKey === 'ren_musketeer') pType = 'bullet';
      else if (this.configKey === 'ren_bomb_thrower') pType = 'grenade';
      else if (this.configKey === 'mod_infantry') pType = 'bullet';
      else if (this.configKey === 'mod_rocket_launcher') pType = 'rocket';
      else if (this.configKey === 'mod_abrams_tank') pType = 'tank_shell';
      else if (this.configKey === 'fut_plasma_trooper') pType = 'plasma_bolt';
      else if (this.configKey === 'fut_mech_walker') pType = 'ion_beam';
      else if (this.configKey === 'fut_god_titan') pType = 'god_laser';

      this.engine.spawnProjectile({
        type: pType,
        faction: this.faction,
        originX: this.x + (this.faction === 'player' ? 18 : -18),
        originY: this.y - 25,
        targetX: target.x,
        targetY: target.y ? target.y - 25 : this.engine.groundY - 80,
        speed: UNITS[this.configKey].projectileSpeed,
        physAtk: this.physicalAttack,
        magAtk: this.magicAttack,
        trueDmg: this.trueDamage,
        armorPen: this.armorPenetration,
        magPen: this.magicPenetration,
        element: this.element,
        critRate: this.critRate,
        critDmg: this.critDamage,
        lifeSteal: this.lifeSteal,
        aoeRadius: this.aoeRadius,
        attacker: this,
        target
      });
    } else {
      // Melee Instant Damage
      if (this.engine && this.engine.particles) {
        this.engine.particles.emitSlash(this.x + (this.faction === 'player' ? 20 : -20), this.y - 20, this.faction === 'player' ? 1 : -1, this.element === 'fire' ? '#ef4444' : '#f8fafc');
      }

      const isCrit = Math.random() < this.critRate;
      target.takeDamage(
        this.physicalAttack,
        this.magicAttack,
        this.trueDamage,
        this.armorPenetration,
        this.magicPenetration,
        this.element,
        isCrit,
        this.critDamage,
        this
      );

      // Play Sound
      if (this.engine && this.engine.sound) {
        if (this.ageId === 1) this.engine.sound.playSfx('club');
        else if (this.ageId === 2) this.engine.sound.playSfx('sword');
        else this.engine.sound.playSfx('hit');
      }
    }

    // Gain Mana on Attack
    this.mana = Math.min(this.maxMana, this.mana + this.manaPerAttack);
    if (this.mana >= this.maxMana) {
      this.triggerUltimate();
    }
  }

  triggerUltimate() {
    this.mana = 0;
    if (this.engine && this.engine.particles) {
      this.engine.particles.emitSparks(this.x, this.y - 20, 20, '#38bdf8');
      this.engine.particles.addFloatingText('⚡ TUYỆT KỸ!', this.x, this.y - 45, '#38bdf8', 14, true);
    }
    // Buff: Grant temporary shield or extra burst
    this.shield = Math.min(this.maxShield + 100, this.shield + 60);
  }

  takeDamage(physAtk = 0, magAtk = 0, trueDmg = 0, attackerArmorPen = 0, attackerMagPen = 0, attackerElement = 'fire', isCrit = false, critDmg = 1.5, attacker = null) {
    if (this.state === 'dead') return;

    // Calculate Effective Armor & Magic Resistance
    const effArmor = Math.max(0, this.physicalArmor * (1 - attackerArmorPen));
    const effMagRes = Math.max(0, this.magicResistance * (1 - attackerMagPen));

    // Diminishing Returns Formula
    let physDamage = physAtk * (100 / (100 + effArmor));
    let magDamage = magAtk * (100 / (100 + effMagRes));

    // Elemental Counter Multiplier
    const elemMult = getElementalMultiplier(attackerElement, this.element);
    let mitigatedDamage = (physDamage + magDamage) * elemMult;

    if (isCrit) {
      mitigatedDamage *= critDmg;
    }

    // Total final damage including True Damage
    let totalDamage = Math.max(1, Math.round(mitigatedDamage + trueDmg));

    // Fallback Command Damage Reduction (-25%)
    const engine = this.engine || (attacker ? attacker.engine : null);
    const base = engine ? (this.faction === 'player' ? engine.playerBase : engine.enemyBase) : null;
    if (base && base.isFallingBack) {
      totalDamage = Math.max(1, Math.round(totalDamage * 0.75));
    }

    // Absorb Damage with Shield First
    if (this.shield > 0) {
      if (this.shield >= totalDamage) {
        this.shield -= totalDamage;
        if (engine && engine.particles) engine.particles.addFloatingText(`🛡️ -${totalDamage}`, this.x, this.y - 25, '#38bdf8', 11);
        totalDamage = 0;
      } else {
        totalDamage -= this.shield;
        if (engine && engine.particles) engine.particles.addFloatingText(`🛡️ HẾT KHIÊN`, this.x, this.y - 25, '#38bdf8', 10);
        this.shield = 0;
      }
    }

    // Apply remaining damage to HP
    if (totalDamage > 0) {
      this.hp -= totalDamage;
      if (engine && engine.particles) {
        const dmgColor = isCrit ? '#fbbf24' : (trueDmg > 0 ? '#c084fc' : (this.faction === 'player' ? '#ef4444' : '#ffffff'));
        engine.particles.addFloatingText(
          `${isCrit ? '💥 ' : ''}-${totalDamage}`,
          this.x + (Math.random() * 20 - 10),
          this.y - 30,
          dmgColor,
          isCrit ? 15 : 12,
          isCrit
        );
      }
    }

    // LifeSteal for Attacker
    if (attacker && attacker.lifeSteal > 0 && attacker.state !== 'dead') {
      const healAmt = Math.round(totalDamage * attacker.lifeSteal);
      if (healAmt > 0) {
        attacker.hp = Math.min(attacker.maxHp, attacker.hp + healAmt);
        if (engine && engine.particles) engine.particles.addFloatingText(`+${healAmt} HP`, attacker.x, attacker.y - 35, '#22c55e', 11);
      }
    }

    // Hit Flash
    this.hitFlashTimer = 0.15;

    // Death Check
    if (this.hp <= 0) {
      this.hp = 0;
      this.state = 'dying';
      this.deathTimer = 0;
      this.onDeath(attacker);
    }
  }

  onDeath(killer) {
    const engine = this.engine || (killer ? killer.engine : null);
    if (engine) {
      engine.particles.createBloodSplat(this.x, this.y);

      // Reward Enemy Faction
      const killerBase = this.faction === 'player' ? engine.enemyBase : engine.playerBase;
      if (killerBase) {
        killerBase.gold += this.killBounty;
        killerBase.addXp(this.xpReward, engine);
      }

      // Register Kill Combo & Bounty
      if (this.faction === 'enemy') {
        if (typeof engine.registerPlayerKill === 'function') engine.registerPlayerKill();
        else if (typeof engine.onPlayerKillEnemy === 'function') engine.onPlayerKillEnemy();
        engine.particles.addFloatingText(`+${this.killBounty}G`, this.x, this.y - 40, '#fbbf24', 12);
      }
    }
  }

  draw(ctx, camera) {
    if (this.engine && this.engine.unitRenderer && camera) {
      this.engine.unitRenderer.render(ctx, this, camera, this.y);
    }
  }

  drawBars(ctx) {
    const barW = 32;
    const barH = 4;
    const barX = this.x - barW / 2;
    const barY = this.y - 58;

    // HP Bar BG
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);

    // HP Fill
    const hpPct = Math.max(0, Math.min(1, this.hp / this.maxHp));
    ctx.fillStyle = this.faction === 'player' ? '#22c55e' : '#ef4444';
    ctx.fillRect(barX, barY, barW * hpPct, barH);

    // Shield Overlay
    if (this.shield > 0 && this.maxShield > 0) {
      const shieldPct = Math.max(0, Math.min(1, this.shield / this.maxShield));
      ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.fillRect(barX, barY, barW * shieldPct, 2);
    }

    // Mana Bar
    if (this.maxMana > 0) {
      const manaPct = Math.max(0, Math.min(1, this.mana / this.maxMana));
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(barX - 1, barY + barH + 1, barW + 2, 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(barX, barY + barH + 1, barW * manaPct, 2);
    }
  }
}
