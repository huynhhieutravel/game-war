import { AGES } from '../config/ages.js';
import { UNITS } from '../config/units.js';
import { TURRETS } from '../config/turrets.js';

export class EnemyAI {
  constructor(difficulty = 'normal') {
    this.difficulty = difficulty; // 'easy' | 'normal' | 'hard' | 'insane'
    this.decisionTimer = 0;
    this.decisionInterval = this.getDecisionInterval();
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    this.decisionInterval = this.getDecisionInterval();
  }

  getDecisionInterval() {
    switch (this.difficulty) {
      case 'easy': return 2.5;
      case 'normal': return 1.5;
      case 'hard': return 0.8;
      case 'insane': return 0.4;
      default: return 1.5;
    }
  }

  getGoldBonusMultiplier() {
    switch (this.difficulty) {
      case 'easy': return 0.8;
      case 'normal': return 1.0;
      case 'hard': return 1.25;
      case 'insane': return 1.6;
      default: return 1.0;
    }
  }

  update(dt, engine) {
    const enemyBase = engine.enemyBase;
    if (!enemyBase) return;

    // Apply difficulty gold bonus
    const goldMultiplier = this.getGoldBonusMultiplier();
    if (goldMultiplier !== 1.0) {
      enemyBase.gold += dt * (goldMultiplier - 1.0) * 1.5;
    }

    this.decisionTimer -= dt;
    if (this.decisionTimer <= 0) {
      this.decisionTimer = this.decisionInterval + (Math.random() * 0.4 - 0.2);
      this.makeDecisions(engine);
    }
  }

  makeDecisions(engine) {
    const base = engine.enemyBase;
    const playerBase = engine.playerBase;
    const age = base.age;

    // 1. Check Evolution
    if (base.canEvolve()) {
      if (this.difficulty !== 'easy' || Math.random() < 0.6) {
        base.evolve(engine);
        return;
      }
    }

    // 2. Check Special Attack
    if (base.specialCooldownTimer <= 0) {
      // Trigger special if player has at least 3 units or if player is near enemy base
      const threateningPlayerUnits = engine.playerUnits.filter(u => u.state !== 'dying' && u.state !== 'dead');
      const shouldCast = (
        threateningPlayerUnits.length >= (this.difficulty === 'easy' ? 5 : this.difficulty === 'normal' ? 3 : 2) ||
        threateningPlayerUnits.some(u => u.x > engine.worldWidth - 700)
      );

      if (shouldCast) {
        engine.specialAttacks.triggerSpecial('enemy', base.age, engine);
        base.specialCooldownTimer = base.specialMaxCooldown;
      }
    }

    // 3. Check Turret Slot Unlock and Turret Purchases
    if (this.difficulty === 'hard' || this.difficulty === 'insane' || (this.difficulty === 'normal' && Math.random() < 0.4)) {
      // Find empty slot
      let emptySlot = -1;
      for (let i = 0; i < base.maxTurretSlots; i++) {
        if (!base.turrets[i]) {
          emptySlot = i;
          break;
        }
      }

      if (emptySlot !== -1) {
        // Buy a turret for current age
        const availableTurrets = Object.keys(TURRETS).filter(k => TURRETS[k].ageId === age);
        if (availableTurrets.length > 0) {
          const turretKey = availableTurrets[availableTurrets.length - 1]; // Pick strongest
          if (base.gold >= TURRETS[turretKey].cost * 1.3) {
            base.buildTurret(emptySlot, turretKey);
          }
        }
      } else if (base.maxTurretSlots < 4) {
        const slotCost = AGES[age - 1].slotCosts[base.maxTurretSlots];
        if (base.gold >= slotCost * 1.5) {
          base.unlockSlot();
        }
      }
    }

    // 4. Check Base HP Upgrade if low health
    if (base.hp < base.maxHp * 0.4 && base.gold >= AGES[age - 1].baseUpgradeCost * 1.2) {
      base.upgradeBaseHp();
    }

    // 5. Spawn Units (Queue units if queue has space)
    const maxQueue = this.difficulty === 'easy' ? 2 : (this.difficulty === 'insane' ? 5 : 4);
    
    // Wave spawning logic: try to queue multiple units at once if rich
    while (base.queue.length < maxQueue) {
      const unitKeys = Object.keys(UNITS).filter(k => UNITS[k].ageId === age);
      if (unitKeys.length === 0) break;

      let chosenUnitKey = null;

      if (this.difficulty === 'easy') {
        chosenUnitKey = unitKeys[Math.floor(Math.random() * Math.min(2, unitKeys.length))];
      } else {
        // Tactical Wave Building
        const queueRoles = base.queue.map(uKey => UNITS[uKey] ? UNITS[uKey].role : null);
        const hasTank = queueRoles.includes('heavy') || queueRoles.includes('melee');
        
        if (!hasTank && unitKeys.length >= 3 && base.gold >= UNITS[unitKeys[2]].cost) {
          chosenUnitKey = unitKeys[2]; // Heavy first
        } else if (hasTank && unitKeys.length >= 2 && base.gold >= UNITS[unitKeys[1]].cost) {
          chosenUnitKey = unitKeys[1]; // Ranged behind tank
        } else {
          // Just pick best affordable
          for (let i = unitKeys.length - 1; i >= 0; i--) {
            if (base.gold >= UNITS[unitKeys[i]].cost) {
              chosenUnitKey = unitKeys[i];
              break;
            }
          }
        }
      }

      if (chosenUnitKey && base.gold >= UNITS[chosenUnitKey].cost) {
        base.queueUnit(chosenUnitKey);
      } else {
        break; // Not enough gold for anything else
      }
    }
  }
}
