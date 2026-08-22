import { AGES } from '../config/ages.js';
import { UNITS } from '../config/units.js';
import { TURRETS } from '../config/turrets.js';
import { ARMORY_UPGRADES } from '../config/upgrades.js';
import { Turret } from './Turret.js';

export class Base {
  constructor(faction, x, startingGold = 175) {
    this.faction = faction; // 'player' | 'enemy'
    this.x = x;
    this.age = 1;

    const ageConfig = AGES[0];
    this.hp = ageConfig.baseHp;
    this.maxHp = ageConfig.baseHp;

    this.gold = startingGold;
    this.xp = 0;

    this.maxTurretSlots = 1;
    this.turrets = [null, null, null, null];

    this.queue = [];
    this.trainTimer = 0;
    this.currentTrainingTime = 0;

    this.specialCooldownTimer = 0;
    this.specialMaxCooldown = ageConfig.special.cooldown;

    // Armory Tech Tree
    this.armory = {
      damage: 0,
      armor: 0,
      economy: 0,
      training: 0
    };

    // Tactical Commands
    this.isFallingBack = false;
    this.isCharging = false;
    this.chargeDuration = 6.0;
    this.chargeTimer = 0;
    this.chargeCooldown = 20.0;
    this.chargeCooldownTimer = 0;
  }

  getDmgMultiplier() {
    return 1.0 + this.armory.damage * ARMORY_UPGRADES.damage.bonusPerLevel;
  }

  getHpMultiplier() {
    return 1.0 + this.armory.armor * ARMORY_UPGRADES.armor.bonusPerLevel;
  }

  getTrainTimeReduction() {
    return Math.max(0.4, 1.0 - this.armory.training * ARMORY_UPGRADES.training.bonusPerLevel);
  }

  getArmoryMultipliers() {
    return {
      dmgMult: this.getDmgMultiplier(),
      hpMult: this.getHpMultiplier()
    };
  }

  update(dt, engine) {
    // Special Cooldown
    if (this.specialCooldownTimer > 0) {
      this.specialCooldownTimer -= dt;
    }

    // Charge Buff & Cooldown
    if (this.isCharging) {
      this.chargeTimer -= dt;
      if (this.chargeTimer <= 0) {
        this.isCharging = false;
      }
    }
    if (this.chargeCooldownTimer > 0) {
      this.chargeCooldownTimer -= dt;
    }

    // Economy Passive Income (Base 1.2 gold/s + 1.5 gold/s per economy level)
    const goldPerSec = 1.2 + this.armory.economy * ARMORY_UPGRADES.economy.bonusPerLevel;
    this.gold += dt * goldPerSec;

    // Unit Training Queue
    if (this.queue.length > 0) {
      const currentUnitKey = this.queue[0];
      const unitConfig = UNITS[currentUnitKey];

      if (this.trainTimer <= 0) {
        this.currentTrainingTime = unitConfig.trainTime * this.getTrainTimeReduction();
        this.trainTimer = this.currentTrainingTime;
      }

      this.trainTimer -= dt;

      if (this.trainTimer <= 0) {
        this.queue.shift();
        engine.spawnUnit(currentUnitKey, this.faction);
        if (this.faction === 'player') {
          engine.sound.playSfx('spawn');
        }

        if (this.queue.length > 0) {
          const nextConfig = UNITS[this.queue[0]];
          this.currentTrainingTime = nextConfig.trainTime * this.getTrainTimeReduction();
          this.trainTimer = this.currentTrainingTime;
        }
      }
    }

    // Update mounted turrets
    const slotOffsets = [
      { x: this.faction === 'player' ? 30 : -30, y: -90 },
      { x: this.faction === 'player' ? 10 : -10, y: -140 },
      { x: this.faction === 'player' ? -20 : 20, y: -190 },
      { x: this.faction === 'player' ? -50 : 50, y: -200 }
    ];

    for (let i = 0; i < this.maxTurretSlots; i++) {
      const turret = this.turrets[i];
      if (turret) {
        const slotPos = slotOffsets[i];
        turret.update(dt, this.x + slotPos.x, engine.groundY + slotPos.y, engine, this.faction);
      }
    }
  }

  toggleFallBack() {
    this.isFallingBack = !this.isFallingBack;
    return this.isFallingBack;
  }

  triggerCharge(engine) {
    if (this.chargeCooldownTimer > 0 || this.isCharging) return false;

    this.isCharging = true;
    this.chargeTimer = this.chargeDuration;
    this.chargeCooldownTimer = this.chargeCooldown;
    this.isFallingBack = false;

    engine.sound.playSfx('siren');
    engine.camera.shake(6, 0.4);
    engine.particles.addScreenFlash('#fbbf24', 0.3, 0.4);
    engine.particles.addFloatingText('🔥 TỔNG TẤN CÔNG (CHARGE)!', this.x + 80, engine.groundY - 160, '#fbbf24', 18, true);

    return true;
  }

  upgradeArmory(techKey) {
    const tech = ARMORY_UPGRADES[techKey];
    if (!tech) return false;

    const currentLevel = this.armory[techKey];
    if (currentLevel >= tech.maxLevel) return false;

    const cost = tech.costs[currentLevel];
    if (this.gold < cost) return false;

    this.gold -= cost;
    this.armory[techKey]++;
    return true;
  }

  queueUnit(unitKey) {
    if (this.queue.length >= 5) return false;
    const config = UNITS[unitKey];
    if (!config || this.gold < config.cost) return false;

    this.gold -= config.cost;
    this.queue.push(unitKey);
    return true;
  }

  cancelQueue(index) {
    if (index < 0 || index >= this.queue.length) return false;
    const unitKey = this.queue[index];
    const config = UNITS[unitKey];
    this.gold += config.cost;
    this.queue.splice(index, 1);
    if (index === 0) {
      this.trainTimer = 0;
    }
    return true;
  }

  addXp(amount, engine = null) {
    if (this.age >= 5) return;
    this.xp += (amount || 0);
  }

  canEvolve() {
    if (this.age >= 5) return false;
    const currentAgeConfig = AGES[this.age - 1];
    return this.xp >= currentAgeConfig.evolveXp;
  }

  evolve(engine) {
    if (!this.canEvolve()) return false;

    this.age++;
    const newAgeConfig = AGES[this.age - 1];
    const hpBoost = newAgeConfig.baseHp - AGES[this.age - 2].baseHp;

    this.maxHp = newAgeConfig.baseHp;
    this.hp = Math.min(this.maxHp, this.hp + hpBoost);
    this.specialMaxCooldown = newAgeConfig.special.cooldown;
    this.specialCooldownTimer = 0;

    if (this.faction === 'player') {
      engine.sound.playSfx('evolve');
      engine.sound.setAge(this.age);
      engine.particles.addScreenFlash('#38bdf8', 0.4, 0.5);
      engine.particles.addFloatingText(`TIẾN HÓA LÊN ${newAgeConfig.nameVi.toUpperCase()}!`, this.x + 80, engine.groundY - 180, '#38bdf8', 20, true);
    }

    return true;
  }

  upgradeBaseHp() {
    const ageConfig = AGES[this.age - 1];
    if (this.gold < ageConfig.baseUpgradeCost) return false;

    this.gold -= ageConfig.baseUpgradeCost;
    this.maxHp += ageConfig.baseUpgradeHpGain;
    this.hp += ageConfig.baseUpgradeHpGain;
    return true;
  }

  unlockSlot() {
    if (this.maxTurretSlots >= 4) return false;
    const ageConfig = AGES[this.age - 1];
    const cost = ageConfig.slotCosts[this.maxTurretSlots];
    if (this.gold < cost) return false;

    this.gold -= cost;
    this.maxTurretSlots++;
    return true;
  }

  buildTurret(slotIndex, turretKey) {
    if (slotIndex < 0 || slotIndex >= this.maxTurretSlots) return false;
    const config = TURRETS[turretKey];
    if (!config || this.gold < config.cost) return false;

    this.gold -= config.cost;
    this.turrets[slotIndex] = new Turret(turretKey);
    return true;
  }

  sellTurret(slotIndex) {
    if (slotIndex < 0 || slotIndex >= this.maxTurretSlots) return false;
    const turret = this.turrets[slotIndex];
    if (!turret) return false;

    this.gold += turret.sellValue;
    this.turrets[slotIndex] = null;
    return true;
  }

  takeDamage(physAtk = 0, magAtk = 0, trueDmg = 0, armorPen = 0, magPen = 0, element = 'fire', isCrit = false, critDmg = 1.5, attacker = null) {
    let amount = physAtk + magAtk + trueDmg;
    if (isCrit) amount = Math.round(amount * critDmg);
    amount = Math.max(1, Math.round(amount));

    this.hp -= amount;
    const engine = this.engine || (attacker ? attacker.engine : null);
    if (engine) {
      engine.particles.addFloatingText(
        isCrit ? `💥 -${amount}` : `-${amount}`,
        this.x,
        engine.groundY - 140,
        '#ef4444',
        16,
        true
      );
    }

    if (this.hp <= 0) {
      this.hp = 0;
      if (engine) {
        engine.onBaseDestroyed(this.faction);
      }
    }
  }
}
