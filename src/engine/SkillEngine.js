import { getSkillById } from '../config/skills/index.js';

export class SkillEngine {
  constructor(engine) {
    this.engine = engine;
    this.activeEffects = [];
  }

  update(dt) {
    for (let i = this.activeEffects.length - 1; i >= 0; i--) {
      const effect = this.activeEffects[i];
      effect.update(dt, this.engine);
      if (effect.isFinished) {
        this.activeEffects.splice(i, 1);
      }
    }
  }

  executeSkill(skillId, caster, target = null) {
    const skill = getSkillById(skillId);
    if (!skill) {
      console.warn(`[SkillEngine] Unknown Skill ID: ${skillId}`);
      return false;
    }

    const faction = caster.faction || 'player';

    // 1. TACTICAL SKILLS
    if (skill.id === 'SKILL_TAC_FALLBACK_001') {
      const base = faction === 'player' ? this.engine.playerBase : this.engine.enemyBase;
      if (base) {
        base.toggleFallBack();
        return true;
      }
    } else if (skill.id === 'SKILL_TAC_CHARGE_002') {
      const base = faction === 'player' ? this.engine.playerBase : this.engine.enemyBase;
      if (base) {
        return base.triggerCharge(this.engine);
      }
    }

    // 2. ERA ULTIMATES
    if (skill.id === 'SKILL_ERA_METEOR_SWARM_101') {
      this.engine.specialAttacks.spawnMeteorSwarm(faction, this.engine);
      return true;
    } else if (skill.id === 'SKILL_ERA_ARROW_STORM_102') {
      this.engine.specialAttacks.spawnArrowStorm(faction, this.engine);
      return true;
    } else if (skill.id === 'SKILL_ERA_ARTILLERY_BARRAGE_103') {
      this.engine.specialAttacks.spawnArtilleryBarrage(faction, this.engine);
      return true;
    } else if (skill.id === 'SKILL_ERA_B52_CARPET_BOMB_104') {
      this.engine.specialAttacks.spawnB52CarpetBomb(faction, this.engine);
      return true;
    } else if (skill.id === 'SKILL_ERA_ORBITAL_ION_LASER_105') {
      this.engine.specialAttacks.spawnOrbitalLaser(faction, this.engine);
      return true;
    }

    // 3. BOSS SKILLS
    if (skill.id === 'SKILL_BOSS_PRIMAL_ROAR_801') {
      this.engine.sound.playSfx('hit_club');
      this.engine.camera.shake(8, 0.5);
      this.engine.particles.addFloatingText('🦖 TIẾNG GẦM BẠO CHÚA (CHOÁNG 2s)!', caster.x, this.engine.groundY - caster.height - 30, '#ef4444', 18, true);
      const enemyUnits = faction === 'player' ? this.engine.enemyUnits : this.engine.playerUnits;
      enemyUnits.forEach(u => {
        if (u.state !== 'dead') {
          u.stunTimer = skill.stunDuration || 2.0;
          this.engine.particles.emitSparks(u.x, u.y - 30, 8, '#f59e0b');
        }
      });
      return true;
    } else if (skill.id === 'SKILL_BOSS_FLAME_SWEEP_802') {
      this.engine.sound.playSfx('fireball');
      this.engine.particles.addFloatingText('🔥 BÃO LỬA RỒNG HOÀNG GIA!', caster.x, this.engine.groundY - caster.height - 30, '#f97316', 18, true);
      for (let i = 0; i < (skill.fireballCount || 3); i++) {
        setTimeout(() => {
          if (caster.state !== 'dead') {
            const targetX = faction === 'player' ? caster.x + 300 + i * 120 : caster.x - 300 - i * 120;
            this.engine.spawnProjectile({
              type: 'fireball',
              faction,
              originX: caster.x + (faction === 'player' ? 60 : -60),
              originY: this.engine.groundY - 110,
              targetX,
              targetY: this.engine.groundY - 20,
              speed: 420,
              physAtk: 0,
              magAtk: skill.damagePerFireball || 90,
              trueDmg: 0,
              element: 'fire',
              aoeRadius: skill.aoeRadius || 80,
              attacker: caster
            });
          }
        }, i * 200);
      }
      return true;
    } else if (skill.id === 'SKILL_BOSS_MORTAR_BARRAGE_803') {
      this.engine.sound.playSfx('artillery');
      this.engine.particles.addFloatingText('⚙️ LOẠT PHÁO CỐI HƠI NƯỚC!', caster.x, this.engine.groundY - caster.height - 30, '#38bdf8', 18, true);
      for (let i = 0; i < (skill.mortarCount || 3); i++) {
        setTimeout(() => {
          if (caster.state !== 'dead') {
            const targetX = faction === 'player' ? caster.x + 350 + i * 150 : caster.x - 350 - i * 150;
            this.engine.spawnProjectile({
              type: 'grenade',
              faction,
              originX: caster.x + (faction === 'player' ? 50 : -50),
              originY: this.engine.groundY - 90,
              targetX,
              targetY: this.engine.groundY - 20,
              speed: 400,
              physAtk: skill.damagePerMortar || 220,
              magAtk: 0,
              trueDmg: 0,
              element: 'fire',
              aoeRadius: skill.aoeRadius || 85,
              attacker: caster
            });
          }
        }, i * 250);
      }
      return true;
    } else if (skill.id === 'SKILL_BOSS_MISSILE_SALVO_804') {
      this.engine.sound.playSfx('rocket_launch');
      this.engine.particles.addFloatingText('🚀 PHÓNG LOẠT TÊN LỬA HẠT NHÂN!', caster.x, this.engine.groundY - caster.height - 30, '#fbbf24', 18, true);
      for (let i = 0; i < (skill.missileCount || 4); i++) {
        setTimeout(() => {
          if (caster.state !== 'dead') {
            const targetX = faction === 'player' ? caster.x + 400 + i * 160 : caster.x - 400 - i * 160;
            this.engine.spawnProjectile({
              type: 'rocket',
              faction,
              originX: caster.x + (faction === 'player' ? 60 : -60),
              originY: this.engine.groundY - 120,
              targetX,
              targetY: this.engine.groundY - 20,
              speed: 460,
              physAtk: skill.damagePerMissile || 320,
              magAtk: 50,
              trueDmg: 20,
              armorPen: skill.armorPenetration || 0.40,
              element: 'fire',
              aoeRadius: 80,
              attacker: caster
            });
          }
        }, i * 200);
      }
      return true;
    } else if (skill.id === 'SKILL_BOSS_SINGULARITY_BEAM_805') {
      this.engine.sound.playSfx('laser');
      this.engine.specialAttacks.spawnOrbitalLaser(faction, this.engine);
      this.engine.particles.addFloatingText('🌌 CHÙM TIA KHÔNG GIAN TỬ THẦN!', caster.x, this.engine.groundY - caster.height - 30, '#c084fc', 18, true);
      return true;
    }

    // 4. HERO SKILLS
    if (skill.id === 'SKILL_HERO_HOLY_AEGIS_701') {
      this.engine.sound.playSfx('victory');
      this.engine.camera.shake(6, 0.4);
      this.engine.particles.addScreenFlash('#fbbf24', 0.4, 0.5);
      this.engine.particles.showComboBanner('🛡️ HÀO QUANG KHIÊN THÁNH!', 'TƯỚNG ALEXANDER BAN LÁ CHẮN & KHÁNG KHỐNG CHẾ!', '#fbbf24');
      
      const allies = faction === 'player' ? this.engine.playerUnits : this.engine.enemyUnits;
      allies.forEach(u => {
        if (u.state !== 'dead' && Math.abs(u.x - caster.x) <= 300) {
          u.shield = Math.min(u.maxShield + 400, u.shield + 400);
          u.tenacity = Math.min(0.9, u.tenacity + 0.5);
          this.engine.particles.emitSparks(u.x, u.y - 25, 12, '#fbbf24');
          this.engine.particles.addFloatingText('🛡️ +400 SHIELD', u.x, u.y - 40, '#38bdf8', 12, true);
        }
      });
      return true;
    } else if (skill.id === 'SKILL_HERO_FRENZY_ROAR_702') {
      this.engine.sound.playSfx('siren');
      this.engine.camera.shake(8, 0.5);
      this.engine.particles.addScreenFlash('#22c55e', 0.4, 0.4);
      this.engine.particles.showComboBanner('🐺 TIẾNG GẦM CUỒNG NỘ THÚ VƯƠNG!', '+100% TỐC ĐÁNH & HỒI MÁU BẦY THÚ!', '#22c55e');

      const allies = faction === 'player' ? this.engine.playerUnits : this.engine.enemyUnits;
      allies.forEach(u => {
        if (u.state !== 'dead' && Math.abs(u.x - caster.x) <= 350) {
          const heal = Math.round(u.maxHp * 0.30);
          u.hp = Math.min(u.maxHp, u.hp + heal);
          u.attackCooldown = Math.max(0.4, u.attackCooldown * 0.5);
          this.engine.particles.emitBlood(u.x, u.y - 20, 8);
          this.engine.particles.addFloatingText(`🌿 +${heal} HP & FRENZY!`, u.x, u.y - 35, '#22c55e', 12, true);
        }
      });
      return true;
    } else if (skill.id === 'SKILL_HERO_SOUL_HARVEST_703') {
      this.engine.sound.playSfx('laser');
      this.engine.camera.shake(8, 0.6);
      this.engine.particles.addScreenFlash('#a855f7', 0.5, 0.5);
      this.engine.particles.showComboBanner('💀 THU HOẠCH LINH HỒN TỬ THẦN!', 'HÚT SINH LỰC KẺ ĐỊCH CHUYỂN THÀNH LÁ CHẮN!', '#c084fc');

      const enemies = faction === 'player' ? this.engine.enemyUnits : this.engine.playerUnits;
      let totalDrained = 0;
      enemies.forEach(u => {
        if (u.state !== 'dead' && Math.abs(u.x - caster.x) <= 220) {
          u.takeDamage(0, 100, 220, 0, 0.4, 'dark', true, 1.5, caster);
          this.engine.particles.emitSparks(u.x, u.y - 30, 15, '#c084fc');
          totalDrained += 120;
        }
      });
      if (totalDrained > 0) {
        caster.shield = Math.min(caster.maxShield + 600, caster.shield + totalDrained);
        this.engine.particles.addFloatingText(`🛡️ +${totalDrained} SHIELD HÚT HỒN`, caster.x, caster.y - 45, '#c084fc', 14, true);
      }
      return true;
    }

    return true;
  }
}
