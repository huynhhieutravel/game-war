import { Unit } from './Unit.js';
import { HEROES, HERO_LEVEL_EXP_TABLE } from '../config/heroes.js';
import { HeroRenderer } from '../render/HeroRenderer.js';

export class Hero extends Unit {
  constructor(heroConfigKey, faction = 'player', x, y, engine) {
    const heroConfig = HEROES[heroConfigKey] || HEROES.hero_human;

    // Initialize as Unit base
    super('stone_clubman', faction, x, y, engine);

    this.isHero = true;
    this.heroConfigKey = heroConfigKey;
    this.config = heroConfig;
    this.factionType = heroConfig.faction;
    this.name = heroConfig.name;
    this.nameVi = heroConfig.nameVi;
    this.element = heroConfig.element;

    // Apply Meta-Progression Might Multiplier if available
    let mightMult = 1.0;
    if (engine && engine.profileManager) {
      mightMult = engine.profileManager.getHeroMightMultiplier();
    }

    // Hero RPG Base Stats
    this.level = 1;
    this.heroExp = 0;
    this.heroMaxExp = HERO_LEVEL_EXP_TABLE[1];

    this.maxHp = Math.round(heroConfig.hp * mightMult);
    this.hp = this.maxHp;
    this.maxShield = heroConfig.shield || 0;
    this.shield = this.maxShield;
    this.physicalArmor = heroConfig.physicalArmor;
    this.magicResistance = heroConfig.magicResistance;
    this.tenacity = heroConfig.tenacity;
    this.hpRegen = heroConfig.hpRegen;
    this.moveSpeed = heroConfig.moveSpeed;

    this.physicalAttack = Math.round(heroConfig.physicalAttack * mightMult);
    this.magicAttack = Math.round(heroConfig.magicAttack * mightMult);
    this.trueDamage = heroConfig.trueDamage;
    this.attackRange = heroConfig.attackRange;
    this.attackCooldown = heroConfig.attackCooldown;
    this.critRate = heroConfig.critRate;
    this.critDamage = heroConfig.critDamage;
    this.armorPenetration = heroConfig.armorPenetration;
    this.magicPenetration = heroConfig.magicPenetration;
    this.lifeSteal = heroConfig.lifeSteal;

    this.maxMana = heroConfig.maxMana || 100;
    this.mana = heroConfig.startingMana || 50;
    this.manaPerAttack = heroConfig.manaPerAttack || 25;
    this.aoeRadius = heroConfig.aoeRadius || 40;

    this.specialSkillId = heroConfig.specialSkillId;
    this.skillCooldownTimer = 0;
    this.skillMaxCooldown = 25;

    this.width = 48;
    this.height = 65;
  }

  get skillCooldown() {
    return this.skillCooldownTimer;
  }

  update(dt, engineOrUnits, enemyBaseParam, playerBaseParam) {
    super.update(dt, engineOrUnits, enemyBaseParam, playerBaseParam);

    if (this.skillCooldownTimer > 0) {
      this.skillCooldownTimer -= dt;
    }
  }

  addHeroExp(amount, engine) {
    if (this.level >= 5 || this.state === 'dead') return;

    this.heroExp += amount;
    const expNeeded = HERO_LEVEL_EXP_TABLE[this.level];

    if (this.heroExp >= expNeeded) {
      this.levelUp(engine);
    }
  }

  levelUp(engine) {
    this.level = Math.min(5, this.level + 1);
    this.heroExp = 0;

    // Stat Stat Growth: +25% HP, +25% Attack, +10 Armor/MR
    this.maxHp = Math.round(this.maxHp * 1.25);
    this.hp = this.maxHp;
    this.maxShield += 80;
    this.shield = this.maxShield;
    this.physicalAttack = Math.round(this.physicalAttack * 1.25);
    this.magicAttack = Math.round(this.magicAttack * 1.25);
    this.physicalArmor += 10;
    this.magicResistance += 10;

    if (engine) {
      engine.sound.playSfx('victory');
      engine.particles.addScreenFlash('#fbbf24', 0.4, 0.4);
      engine.particles.emitSparks(this.x, this.y - 30, 30, '#fbbf24');
      engine.particles.showComboBanner(`👑 TƯỚNG ĐẠT LEVEL ${this.level}!`, `${this.nameVi.toUpperCase()} THĂNG CẤP SỨC MẠNH!`, '#fbbf24');
      engine.camera.shake(6, 0.3);

      if (engine.profileManager) {
        if (this.level > (engine.profileManager.data.heroMaxLevelReached || 1)) {
          engine.profileManager.data.heroMaxLevelReached = this.level;
          engine.profileManager.checkAchievements(engine.particles);
        }
      }
    }
  }

  useHeroSkill(engine) {
    if (this.state === 'dead' || this.skillCooldownTimer > 0) return false;

    if (engine && engine.skillEngine) {
      const success = engine.skillEngine.executeSkill(this.specialSkillId, this);
      if (success) {
        this.skillCooldownTimer = this.skillMaxCooldown;
        return true;
      }
    }
    return false;
  }

  draw(ctx) {
    if (this.state !== 'dead') {
      HeroRenderer.drawHero(ctx, this);
      this.drawBars(ctx);
    }
  }
}
