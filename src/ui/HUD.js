import { AGES } from '../config/ages.js';
import { getHeroByFaction } from '../config/heroes.js';

export class HUD {
  constructor(engine) {
    this.engine = engine;
    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    // Health & Resources
    this.elPlayerHp = document.getElementById('player-hp-text');
    this.elPlayerHpBar = document.getElementById('player-hp-fill');
    this.elEnemyHp = document.getElementById('enemy-hp-text');
    this.elEnemyHpBar = document.getElementById('enemy-hp-fill');
    this.elGold = document.getElementById('gold-display');
    this.elXp = document.getElementById('xp-display');
    this.elXpBar = document.getElementById('xp-progress-fill');
    this.elAgeBadge = document.getElementById('age-badge');
    this.elWaveBadge = document.getElementById('wave-badge');

    // Boss Bar
    this.containerBossBar = document.getElementById('boss-health-bar-container');
    this.elBossName = document.getElementById('boss-name-text');
    this.elBossHpText = document.getElementById('boss-hp-text');
    this.elBossHpFill = document.getElementById('boss-hp-fill');

    // Special & Evolve Buttons
    this.btnSpecial = document.getElementById('btn-special');
    this.elSpecialCooldown = document.getElementById('special-cooldown-text');
    this.elSpecialFill = document.getElementById('special-progress-fill');
    this.btnEvolve = document.getElementById('btn-evolve');
    this.elEvolveStatus = document.getElementById('evolve-status-text');

    // Tactical Commands & Hero
    this.btnFallback = document.getElementById('btn-cmd-fallback');
    this.btnCharge = document.getElementById('btn-cmd-charge');
    this.elChargeCooldown = document.getElementById('charge-cooldown-text');
    this.btnHeroSummon = document.getElementById('btn-hero-summon');
    this.elHeroIcon = document.getElementById('hero-btn-icon');
    this.elHeroLabel = document.getElementById('hero-btn-label');
    this.elHeroCooldown = document.getElementById('hero-cooldown-text');

    // Controls
    this.speedButtons = document.querySelectorAll('.btn-speed');
    this.btnSound = document.getElementById('btn-sound');
    this.btnPause = document.getElementById('btn-pause');
  }

  bindEvents() {
    // Special Attack Action
    if (this.btnSpecial) {
      this.btnSpecial.addEventListener('click', () => {
        this.engine.triggerSpecialAttack();
      });
    }

    // Evolve Action
    if (this.btnEvolve) {
      this.btnEvolve.addEventListener('click', () => {
        this.engine.evolveAge();
      });
    }

    // Tactical Command: Fallback
    if (this.btnFallback) {
      this.btnFallback.addEventListener('click', () => {
        const active = this.engine.toggleFallback();
        this.btnFallback.classList.toggle('active', active);
      });
    }

    // Tactical Command: Charge
    if (this.btnCharge) {
      this.btnCharge.addEventListener('click', () => {
        this.engine.triggerCharge();
      });
    }

    // Hero Summon & Skill
    if (this.btnHeroSummon) {
      this.btnHeroSummon.addEventListener('click', () => {
        const hero = this.engine.playerHero;
        if (!hero || hero.state === 'dead') {
          this.engine.spawnHero();
        } else {
          this.engine.triggerHeroSkill();
        }
      });
    }

    // Game Speed Controls
    this.speedButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const speed = parseFloat(btn.dataset.speed || '1.0');
        this.engine.setGameSpeed(speed);
        this.speedButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Sound Toggle
    if (this.btnSound) {
      this.btnSound.addEventListener('click', () => {
        if (this.engine.uiManager) {
          this.engine.uiManager.toggleSound();
        } else {
          const muted = this.engine.sound.toggleMute();
          this.btnSound.textContent = muted ? '🔇 Tắt' : '🔊 Bật';
        }
      });
    }

    // Pause Toggle
    if (this.btnPause) {
      this.btnPause.addEventListener('click', () => {
        this.engine.togglePause();
      });
    }
  }

  update() {
    if (!this.engine.playerBase || !this.engine.enemyBase) return;

    const pb = this.engine.playerBase;
    const eb = this.engine.enemyBase;

    // 1. Health Bars
    if (this.elPlayerHp) this.elPlayerHp.textContent = `${Math.max(0, pb.hp)} / ${pb.maxHp}`;
    if (this.elPlayerHpBar) this.elPlayerHpBar.style.width = `${Math.max(0, (pb.hp / pb.maxHp) * 100)}%`;

    if (this.elEnemyHp) this.elEnemyHp.textContent = `${Math.max(0, eb.hp)} / ${eb.maxHp}`;
    if (this.elEnemyHpBar) this.elEnemyHpBar.style.width = `${Math.max(0, (eb.hp / eb.maxHp) * 100)}%`;

    // 2. Gold & XP
    if (this.elGold) this.elGold.textContent = Math.floor(pb.gold).toLocaleString();

    const currentAgeConfig = AGES[pb.age - 1];
    const isMaxAge = pb.age >= 5;

    if (!isMaxAge && currentAgeConfig) {
      const prevEvolveXp = pb.age > 1 ? AGES[pb.age - 2].evolveXp : 0;
      const targetEvolveXp = currentAgeConfig.evolveXp;
      const xpProgress = Math.max(0, Math.min(1, (pb.xp - prevEvolveXp) / Math.max(1, targetEvolveXp - prevEvolveXp)));

      if (this.elXp) this.elXp.textContent = `${Math.floor(pb.xp)} / ${targetEvolveXp}`;
      if (this.elXpBar) this.elXpBar.style.width = `${xpProgress * 100}%`;
    } else {
      if (this.elXp) this.elXp.textContent = `${Math.floor(pb.xp)} (MAX)`;
      if (this.elXpBar) this.elXpBar.style.width = '100%';
    }

    // 3. Age & Wave Badge
    if (this.elAgeBadge && currentAgeConfig) {
      this.elAgeBadge.textContent = `${currentAgeConfig.nameVi} (Kỷ nguyên ${pb.age})`;
    }
    if (this.elWaveBadge) {
      if (this.engine.gameMode === 'endless') {
        this.elWaveBadge.style.display = 'block';
        this.elWaveBadge.textContent = `🌊 Đợt ${this.engine.wave}`;
      } else {
        this.elWaveBadge.style.display = 'none';
      }
    }

    // 4. Special Attack Button
    if (this.btnSpecial) {
      if (pb.specialCooldownTimer > 0) {
        this.btnSpecial.classList.remove('ready');
        this.btnSpecial.disabled = true;
        const remain = Math.ceil(pb.specialCooldownTimer);
        if (this.elSpecialCooldown) this.elSpecialCooldown.textContent = `Hồi: ${remain}s`;
        if (this.elSpecialFill) {
          const progress = 1 - (pb.specialCooldownTimer / pb.specialMaxCooldown);
          this.elSpecialFill.style.width = `${progress * 100}%`;
        }
      } else {
        this.btnSpecial.classList.add('ready');
        this.btnSpecial.disabled = false;
        if (this.elSpecialCooldown) this.elSpecialCooldown.textContent = '[Space] SẴN SÀNG';
        if (this.elSpecialFill) this.elSpecialFill.style.width = '100%';
      }
    }

    // 5. Evolve Button
    if (this.btnEvolve) {
      if (pb.canEvolve()) {
        this.btnEvolve.classList.add('ready');
        this.btnEvolve.disabled = false;
        if (this.elEvolveStatus) this.elEvolveStatus.textContent = '[E] SẴN SÀNG!';
      } else {
        this.btnEvolve.classList.remove('ready');
        this.btnEvolve.disabled = true;
        if (this.elEvolveStatus) this.elEvolveStatus.textContent = isMaxAge ? 'ĐÃ TỐI ĐA' : '[E] Kỷ nguyên';
      }
    }

    // 6. Tactical Commands
    if (this.btnFallback) {
      this.btnFallback.classList.toggle('active', !!pb.isFallingBack);
    }

    if (this.btnCharge && this.elChargeCooldown) {
      if (pb.isCharging) {
        this.btnCharge.classList.add('active');
        const activeRemain = Math.ceil(pb.chargeTimer);
        this.elChargeCooldown.textContent = `Chạy! (${activeRemain}s)`;
      } else if (pb.chargeCooldownTimer > 0) {
        this.btnCharge.classList.remove('active');
        const cdRemain = Math.ceil(pb.chargeCooldownTimer);
        this.elChargeCooldown.textContent = `Hồi: ${cdRemain}s`;
      } else {
        this.btnCharge.classList.remove('active');
        this.elChargeCooldown.textContent = '[F] Sẵn sàng';
      }
    }

    // 7. Hero HUD Status
    this.updateHeroHUD();

    // 8. Boss Health Bar
    this.updateBossBar();
  }

  updateHeroHUD() {
    if (!this.btnHeroSummon) return;

    const heroConfig = getHeroByFaction(this.engine.selectedFaction);
    const hero = this.engine.playerHero;
    const respawnTimer = this.engine.heroRespawnTimer;

    if (!hero || hero.state === 'dead') {
      if (respawnTimer > 0) {
        this.btnHeroSummon.classList.remove('ready');
        if (this.elHeroIcon) this.elHeroIcon.textContent = '⏳';
        if (this.elHeroLabel) this.elHeroLabel.textContent = 'TƯỚNG';
        if (this.elHeroCooldown) this.elHeroCooldown.textContent = `Hồi sinh: ${Math.ceil(respawnTimer)}s`;
      } else {
        const canAfford = this.engine.playerBase && this.engine.playerBase.gold >= heroConfig.cost;
        if (canAfford) {
          this.btnHeroSummon.classList.add('ready');
          if (this.elHeroCooldown) this.elHeroCooldown.textContent = `[Q] Gọi (${heroConfig.cost}G)`;
        } else {
          this.btnHeroSummon.classList.remove('ready');
          if (this.elHeroCooldown) this.elHeroCooldown.textContent = `[Q] Cần ${heroConfig.cost}G`;
        }
        if (this.elHeroIcon) this.elHeroIcon.textContent = '👑';
        if (this.elHeroLabel) this.elHeroLabel.textContent = 'TƯỚNG';
      }
    } else {
      if (hero.skillCooldown > 0) {
        this.btnHeroSummon.classList.remove('ready');
        if (this.elHeroIcon) this.elHeroIcon.textContent = '⚔️';
        if (this.elHeroLabel) this.elHeroLabel.textContent = `TƯỚNG LV.${hero.level}`;
        if (this.elHeroCooldown) this.elHeroCooldown.textContent = `Hồi: ${Math.ceil(hero.skillCooldown)}s`;
      } else {
        this.btnHeroSummon.classList.add('ready');
        if (this.elHeroIcon) this.elHeroIcon.textContent = '⚡';
        if (this.elHeroLabel) this.elHeroLabel.textContent = `TƯỚNG LV.${hero.level}`;
        if (this.elHeroCooldown) this.elHeroCooldown.textContent = '[Q] CHIÊU CUỐI!';
      }
    }
  }

  updateBossBar() {
    if (!this.containerBossBar) return;

    if (this.engine.activeBoss && this.engine.activeBoss.state !== 'dead') {
      this.containerBossBar.classList.remove('hidden');
      const boss = this.engine.activeBoss;
      if (this.elBossName) this.elBossName.textContent = `⚠️ BOSS: ${boss.nameVi.toUpperCase()} (${boss.title})`;
      if (this.elBossHpText) this.elBossHpText.textContent = `${Math.max(0, Math.floor(boss.hp))} / ${boss.maxHp}`;
      if (this.elBossHpFill) {
        const pct = Math.max(0, (boss.hp / boss.maxHp) * 100);
        this.elBossHpFill.style.width = `${pct}%`;
      }
    } else {
      this.containerBossBar.classList.add('hidden');
    }
  }
}
