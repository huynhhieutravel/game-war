import { AGES } from '../config/ages.js';
import { Camera } from './Camera.js';
import { SoundManager } from './SoundManager.js';
import { ParticleSystem } from '../render/ParticleSystem.js';
import { BackgroundRenderer } from '../render/BackgroundRenderer.js';
import { UnitRenderer } from '../render/UnitRenderer.js';
import { BaseRenderer } from '../render/BaseRenderer.js';
import { BossRenderer } from '../render/BossRenderer.js';
import { HeroRenderer } from '../render/HeroRenderer.js';
import { Base } from '../entities/Base.js';
import { Unit } from '../entities/Unit.js';
import { Boss } from '../entities/Boss.js';
import { Hero } from '../entities/Hero.js';
import { getHeroByFaction } from '../config/heroes.js';
import { Projectile } from '../entities/Projectile.js';
import { SpecialAttackManager } from '../entities/SpecialAttack.js';
import { SkillEngine } from './SkillEngine.js';
import { ProfileManager } from './ProfileManager.js';
import { EnemyAI } from '../ai/EnemyAI.js';
import { eventBus } from './EventBus.js';
import { DEFAULT_MAP_ID } from '../config/maps.js';

export class GameEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.worldWidth = 2400;
    this.worldHeight = 600;
    this.groundY = 440;

    this.state = 'menu'; // 'menu' | 'playing' | 'paused' | 'victory' | 'defeat'
    this.difficulty = 'normal';
    this.gameSpeed = 1.0;
    this.gameMode = 'campaign'; // 'campaign' | 'endless' | 'boss_rush'
    this.selectedMap = DEFAULT_MAP_ID;

    // Subsystems
    this.eventBus = eventBus;
    this.camera = new Camera(this.worldWidth, this.canvas.width || 1100, this.canvas.height || 600);
    this.sound = new SoundManager();
    this.particles = new ParticleSystem();
    this.bgRenderer = new BackgroundRenderer(this.worldWidth, this.worldHeight, this.groundY);
    this.unitRenderer = new UnitRenderer();
    this.baseRenderer = new BaseRenderer();
    this.bossRenderer = new BossRenderer();
    this.specialAttacks = new SpecialAttackManager();
    this.skillEngine = new SkillEngine(this);
    this.profileManager = new ProfileManager();
    this.ai = new EnemyAI(this.difficulty);

    // Selected Faction ('human' | 'beast' | 'undead')
    this.selectedFaction = this.profileManager.getFaction();

    // Entities
    this.playerBase = null;
    this.enemyBase = null;
    this.playerUnits = [];
    this.enemyUnits = [];
    this.projectiles = [];
    this.activeBoss = null;
    this.playerHero = null;
    this.heroRespawnTimer = 0;

    // Endless & Boss Rush Modes
    this.wave = 1;
    this.waveTimer = 0;
    this.bossRushIndex = 0;

    // Kill Streaks & Combos
    this.killStreak = 0;
    this.killStreakTimer = 0;

    // Stats
    this.stats = {
      startTime: 0,
      timePlayed: 0,
      unitsTrained: 0,
      enemiesKilled: 0,
      goldEarned: 0,
      damageDealt: 0,
      highWave: 1
    };

    this.lastTime = 0;
    this.uiManager = null;
    this.minimap = null;

    this.resizeCanvas();
  }

  resizeCanvas() {
    const viewport = document.getElementById('viewport-container');
    const w = viewport && viewport.clientWidth > 0 ? viewport.clientWidth : 1100;
    const h = viewport && viewport.clientHeight > 0 ? viewport.clientHeight : 600;
    if (this.canvas && (this.canvas.width !== w || this.canvas.height !== h)) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.groundY = Math.round(h * 0.78);
      if (this.bgRenderer) {
        this.bgRenderer.groundY = this.groundY;
        this.bgRenderer.worldHeight = h;
      }
      this.camera.resize(w, h);
    }
  }

  setUI(uiManager) {
    this.uiManager = uiManager;
  }

  setMinimap(minimap) {
    this.minimap = minimap;
  }

  setFaction(factionCode) {
    this.selectedFaction = factionCode;
    this.profileManager.setFaction(factionCode);
    this.eventBus.emit('faction:changed', { faction: factionCode });
  }

  setMap(mapId) {
    this.selectedMap = mapId;
    this.bgRenderer.setMap(mapId);
    this.eventBus.emit('map:changed', { mapId });
  }

  init() {
    this.resizeCanvas();
    this.startLoop();
    this.camera.focus(120);

    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  start(difficulty = 'normal', mode = 'campaign') {
    this.resizeCanvas();
    this.difficulty = difficulty;
    this.gameMode = mode;
    this.ai.setDifficulty(difficulty);

    // Starting Gold with Star Lab Meta-Progression
    const baseStartingGold = difficulty === 'easy' ? 240 : 175;
    const bonusGold = this.profileManager.getBonusStartingGold();
    const startingGold = baseStartingGold + bonusGold;

    this.playerBase = new Base('player', 160, startingGold);
    this.enemyBase = new Base('enemy', this.worldWidth - 160, startingGold);

    // Apply Meta-Progression Base Fortress HP
    const baseHpMult = this.profileManager.getBaseHpMultiplier();
    this.playerBase.maxHp = Math.round(this.playerBase.maxHp * baseHpMult);
    this.playerBase.hp = this.playerBase.maxHp;

    this.playerUnits = [];
    this.enemyUnits = [];
    this.projectiles = [];
    this.activeBoss = null;
    this.playerHero = null;
    this.heroRespawnTimer = 0;

    this.specialAttacks.clear();
    this.particles.clear();

    this.wave = 1;
    this.waveTimer = 3.0;
    this.bossRushIndex = 0;
    this.killStreak = 0;
    this.killStreakTimer = 0;

    this.stats = {
      startTime: Date.now(),
      timePlayed: 0,
      unitsTrained: 0,
      enemiesKilled: 0,
      goldEarned: startingGold,
      damageDealt: 0,
      highWave: 1
    };

    this.state = 'playing';
    this.camera.focus(this.playerBase.x + 300);

    this.sound.startBGM(1);

    if (this.gameMode === 'boss_rush') {
      this.spawnNextBossRush();
    }

    this.eventBus.emit('game:start', { difficulty, mode, map: this.selectedMap });

    if (this.uiManager) {
      this.uiManager.onGameStart();
    }
  }

  setGameSpeed(speed) {
    this.gameSpeed = speed;
  }

  togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
    } else if (this.state === 'paused') {
      this.state = 'playing';
    }
    this.eventBus.emit('game:pause', { isPaused: this.state === 'paused' });
    return this.state === 'paused';
  }

  spawnUnit(unitKey, faction) {
    const startX = faction === 'player' ? this.playerBase.x + 40 : this.enemyBase.x - 40;
    const base = faction === 'player' ? this.playerBase : this.enemyBase;
    const multipliers = base ? base.getArmoryMultipliers() : { dmgMult: 1.0, hpMult: 1.0 };

    const unit = new Unit(unitKey, faction, startX, this.groundY, this);

    // Apply Meta-Progression Starting Mana for Player Units
    if (faction === 'player') {
      const bonusMana = this.profileManager.getBonusStartingMana();
      unit.mana = Math.min(unit.maxMana, unit.mana + bonusMana);
      this.playerUnits.push(unit);
      this.stats.unitsTrained++;
    } else {
      this.enemyUnits.push(unit);
    }
    return unit;
  }

  spawnHero() {
    if (this.playerHero && this.playerHero.state !== 'dead') return false;
    if (this.heroRespawnTimer > 0) return false;

    const heroConfig = getHeroByFaction(this.selectedFaction);
    if (this.playerBase.gold < heroConfig.cost) return false;

    this.playerBase.gold -= heroConfig.cost;
    this.playerHero = new Hero(heroConfig.id, 'player', this.playerBase.x + 40, this.groundY, this);
    this.playerUnits.push(this.playerHero);

    this.sound.playSfx('victory');
    this.particles.showComboBanner('👑 TƯỚNG LĨNH XUẤT TRẬN!', `${heroConfig.nameVi.toUpperCase()} ĐÃ BƯỚC VÀO CHIẾN TRƯỜNG!`, heroConfig.glowColor || '#fbbf24');
    this.eventBus.emit('hero:spawned', { hero: this.playerHero });
    return true;
  }

  triggerHeroSkill() {
    if (!this.playerHero || this.playerHero.state === 'dead') return false;
    return this.playerHero.useHeroSkill(this);
  }

  spawnBoss(bossKey, faction = 'enemy') {
    const startX = faction === 'player' ? this.playerBase.x + 100 : this.enemyBase.x - 100;
    this.activeBoss = new Boss(bossKey, faction, startX, this);
    this.sound.playSfx('boss_spawn');
    this.camera.shake(10, 0.6);
    this.particles.addScreenFlash('#dc2626', 0.4, 0.8);
    this.particles.showComboBanner(`⚠️ ${this.activeBoss.nameVi.toUpperCase()} XUẤT HIỆN!`, this.activeBoss.title.toUpperCase(), '#ef4444');
    this.eventBus.emit('boss:spawned', { boss: this.activeBoss });
    return this.activeBoss;
  }

  spawnNextBossRush() {
    const bossKeys = ['boss_age1_trex', 'boss_age2_dragon', 'boss_age3_juggernaut', 'boss_age4_tank', 'boss_age5_leviathan'];
    if (this.bossRushIndex < bossKeys.length) {
      const bKey = bossKeys[this.bossRushIndex];
      this.spawnBoss(bKey, 'enemy');
      this.bossRushIndex++;
    } else {
      // Completed Boss Rush!
      this.onBaseDestroyed('enemy');
    }
  }

  registerPlayerKill() {
    this.onPlayerKillEnemy();
  }

  onPlayerKillEnemy() {
    this.killStreak++;
    this.killStreakTimer = 3.0;
    this.stats.enemiesKilled++;

    // Profile Progress & Achievements Check
    this.profileManager.data.totalKills++;
    if (this.killStreak > (this.profileManager.data.highestKillStreak || 0)) {
      this.profileManager.data.highestKillStreak = this.killStreak;
    }
    this.profileManager.checkAchievements(this.particles);

    // Hero Exp Share
    if (this.playerHero && this.playerHero.state !== 'dead') {
      this.playerHero.addHeroExp(45, this);
    }

    if (this.killStreak === 2) {
      this.particles.showComboBanner('DOUBLE KILL!', '+20 Vàng Thưởng', '#38bdf8');
      this.playerBase.gold += 20;
    } else if (this.killStreak === 3) {
      this.particles.showComboBanner('TRIPLE KILL! 🔥', '+50 Vàng Thưởng', '#f59e0b');
      this.playerBase.gold += 50;
    } else if (this.killStreak === 5) {
      this.particles.showComboBanner('MEGA KILL! ⚡', '+120 Vàng & 300 XP', '#fbbf24');
      this.playerBase.gold += 120;
      this.playerBase.xp += 300;
      this.camera.shake(5, 0.3);
    } else if (this.killStreak >= 8) {
      this.particles.showComboBanner('UNSTOPPABLE! 👑', '+300 Vàng & 800 XP', '#ec4899');
      this.playerBase.gold += 300;
      this.playerBase.xp += 800;
      this.camera.shake(8, 0.4);
    }

    this.eventBus.emit('enemy:killed', { killStreak: this.killStreak });
  }

  triggerComboKill(customTitle) {
    this.particles.showComboBanner(customTitle, 'CHIẾN CÔNG VANG DỘI', '#fbbf24');
  }

  spawnProjectile(params) {
    const proj = new Projectile(params);
    this.projectiles.push(proj);
    return proj;
  }

  triggerSpecialAttack(faction) {
    const base = faction === 'player' ? this.playerBase : this.enemyBase;
    if (!base || base.specialCooldownTimer > 0) return false;

    this.specialAttacks.triggerSpecial(faction, base.age, this);
    base.specialCooldownTimer = base.specialMaxCooldown;
    return true;
  }

  onBaseDestroyed(defeatedFaction) {
    if (this.state !== 'playing') return;

    // Trigger Slow-mo sequence
    this.state = 'game_over_sequence';
    this.gameSpeed = 0.2;
    this.gameOverTimer = 3.0; // 3 real-time seconds (0.6 in-game seconds due to slow-mo)
    this.pendingGameOverResult = defeatedFaction === 'enemy' ? 'victory' : 'defeat';
    
    this.sound.stopBGM();
    this.particles.addScreenFlash(defeatedFaction === 'enemy' ? '#fbbf24' : '#dc2626', 0.8, 1.5);
    
    // Zoom in on the destroyed base
    const targetBase = defeatedFaction === 'enemy' ? this.enemyBase : this.playerBase;
    if (targetBase) {
      this.camera.setTarget(targetBase);
      this.camera.zoom = 1.5;
    }
    
    this.camera.shake(12, 1.0);
  }

  finalizeGameOver() {
    this.state = this.pendingGameOverResult;

    if (this.state === 'victory') {
      this.sound.playSfx('victory');

      // Rewards Star Shards & Meta-Progression
      this.profileManager.data.totalVictories++;
      if (this.gameMode === 'campaign') this.profileManager.data.campaignWins++;
      if (this.playerBase.age >= 5) this.profileManager.data.reachedAge5++;
      if (this.playerBase.hp >= this.playerBase.maxHp * 0.9) this.profileManager.data.flawlessWins++;

      if (!this.profileManager.data.factionWins) this.profileManager.data.factionWins = { human: 0, beast: 0, undead: 0 };
      this.profileManager.data.factionWins[this.selectedFaction] = (this.profileManager.data.factionWins[this.selectedFaction] || 0) + 1;

      this.profileManager.addStarShards(35);
      this.profileManager.checkAchievements(this.particles);
    } else {
      this.sound.playSfx('defeat');
      this.profileManager.addStarShards(10); // Consolation reward
    }

    // Save High Score for Endless Mode
    if (this.gameMode === 'endless') {
      const savedHighWave = parseInt(localStorage.getItem('ageofwar_high_wave') || '1', 10);
      if (this.wave > savedHighWave) {
        localStorage.setItem('ageofwar_high_wave', this.wave.toString());
      }
      if (this.wave > (this.profileManager.data.highestWave || 1)) {
        this.profileManager.data.highestWave = this.wave;
        this.profileManager.checkAchievements(this.particles);
      }
    }

    this.eventBus.emit('game:over', { result: this.state, stats: this.stats });

    if (this.uiManager) {
      this.uiManager.onGameOver(this.state, this.stats);
    }
  }

  // --- MAIN LOOP ---
  startLoop() {
    this.lastTime = performance.now();
    const loop = (currentTime) => {
      const rawDt = Math.min(0.1, (currentTime - this.lastTime) / 1000);
      this.lastTime = currentTime;

      const dt = rawDt * this.gameSpeed;

      try {
        if (this.state === 'playing' || this.state === 'game_over_sequence') {
          this.update(dt, rawDt);
          if (this.state === 'playing') {
            this.stats.timePlayed += dt;
          }
        }

        this.render();
      } catch (err) {
        console.error('[GameEngine Loop Error]:', err);
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  update(dt, rawDt) {
    if (this.state === 'game_over_sequence') {
      this.gameOverTimer -= rawDt;
      if (this.gameOverTimer <= 0) {
        this.finalizeGameOver();
        return;
      }
    }

    this.camera.update(dt);
    this.particles.update(dt);
    this.bgRenderer.update(dt);

    if (this.killStreakTimer > 0) {
      this.killStreakTimer -= dt;
      if (this.killStreakTimer <= 0) {
        this.killStreak = 0;
      }
    }

    // Update Hero Respawn
    if (this.playerHero && this.playerHero.state === 'dead') {
      if (this.heroRespawnTimer > 0) {
        this.heroRespawnTimer -= dt;
      }
    }

    // Update Bases
    if (this.playerBase) this.playerBase.update(dt, this);
    if (this.enemyBase) this.enemyBase.update(dt, this);

    // Update Enemy AI
    if (this.ai && this.enemyBase) {
      this.ai.update(dt, this);
    }

    // Update Game Modes
    if (this.gameMode === 'endless') {
      this.updateEndlessMode(dt);
    }

    // Update Active Boss
    if (this.activeBoss) {
      this.activeBoss.update(dt, this);
      if (this.activeBoss.state === 'dead') {
        this.profileManager.data.bossesKilled++;
        this.profileManager.checkAchievements(this.particles);
        this.activeBoss = null;
        if (this.gameMode === 'boss_rush') {
          setTimeout(() => this.spawnNextBossRush(), 2500);
        }
      }
    }

    // Update Units
    for (let i = this.playerUnits.length - 1; i >= 0; i--) {
      const u = this.playerUnits[i];
      u.update(dt, this);
      if (u.state === 'dead') {
        if (u.isHero) {
          const heroConfig = getHeroByFaction(this.selectedFaction);
          const reduction = this.profileManager.getHeroRespawnReduction();
          this.heroRespawnTimer = Math.max(10, heroConfig.respawnTime - reduction);
        }
        this.playerUnits.splice(i, 1);
      }
    }

    for (let i = this.enemyUnits.length - 1; i >= 0; i--) {
      const u = this.enemyUnits[i];
      u.update(dt, this);
      if (u.state === 'dead') {
        this.enemyUnits.splice(i, 1);
      }
    }

    // Update Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt, this);
      if (p.isDead) {
        this.projectiles.splice(i, 1);
      }
    }

    // Update Special Attacks & Skill Engine
    this.specialAttacks.update(dt, this);
    if (this.skillEngine) {
      this.skillEngine.update(dt);
    }

    // Update UI & Minimap
    if (this.uiManager) {
      this.uiManager.update(dt);
    }
    if (this.minimap) {
      this.minimap.render(this);
    }
  }

  updateEndlessMode(dt) {
    this.waveTimer -= dt;
    if (this.waveTimer <= 0) {
      this.wave++;
      this.stats.highWave = Math.max(this.stats.highWave, this.wave);

      if (this.wave % 5 === 0) {
        // Spawn Boss on Wave 5, 10, 15...
        const bossKeys = ['boss_age1_trex', 'boss_age2_dragon', 'boss_age3_juggernaut', 'boss_age4_tank', 'boss_age5_leviathan'];
        const bIdx = Math.min(bossKeys.length - 1, Math.floor(this.wave / 5) - 1);
        this.spawnBoss(bossKeys[bIdx], 'enemy');
        this.waveTimer = 35.0;
      } else {
        this.waveTimer = Math.max(8.0, 18.0 - this.wave * 0.5);
      }

      this.particles.showComboBanner(`🌊 ĐỢT SỐ ${this.wave}`, 'BẦY QUÁI KẺ THÙ TĂNG CƯỜNG!', '#38bdf8');
      this.sound.playSfx('evolve');
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const age = this.playerBase ? this.playerBase.age : 1;

    // 1. SKY GRADIENT (Always covers 100% full screen, no borders)
    this.bgRenderer.renderSky(this.ctx, this.canvas.width, this.canvas.height, age, this.groundY);

    // 2. WORLD LAYERS WITH ZOOM TRANSFORM
    this.ctx.save();
    if (this.camera.zoom !== 1.0) {
      const cx = this.canvas.width / 2;
      const cy = this.groundY;
      this.ctx.translate(cx, cy);
      this.ctx.scale(this.camera.zoom, this.camera.zoom);
      this.ctx.translate(-cx, -cy);
    }

    // 2.1 Background Mountains, Hills, Ground
    this.bgRenderer.render(this.ctx, this.camera, age);

    // 2.2 Base Fortress Architecture
    if (this.playerBase) this.baseRenderer.render(this.ctx, this.playerBase, this.camera, this.groundY);
    if (this.enemyBase) this.baseRenderer.render(this.ctx, this.enemyBase, this.camera, this.groundY);

    // 2.3 Units & Heroes
    for (const u of this.playerUnits) {
      if (u.isHero) {
        HeroRenderer.render(this.ctx, u, this.camera, this.groundY);
      } else {
        this.unitRenderer.render(this.ctx, u, this.camera, this.groundY);
      }
    }
    for (const u of this.enemyUnits) {
      if (u.isHero) {
        HeroRenderer.render(this.ctx, u, this.camera, this.groundY);
      } else {
        this.unitRenderer.render(this.ctx, u, this.camera, this.groundY);
      }
    }

    // 2.4 Boss
    if (this.activeBoss) {
      this.bossRenderer.render(this.ctx, this.activeBoss, this.camera, this.groundY);
    }

    // 2.5 Projectiles
    for (const p of this.projectiles) {
      p.render(this.ctx, this.camera);
    }

    // 2.6 Special Attacks (Meteors, Lasers, Bombs)
    this.specialAttacks.render(this.ctx, this.camera, this.groundY);

    // 2.7 Particles, Screen Flash & Floating Texts
    this.particles.render(this.ctx, this.camera);

    this.ctx.restore();

    // 3. WEATHER OVERLAY (Full-screen overlay)
    this.bgRenderer.renderWeatherOverlay(this.ctx, this.canvas.width, this.canvas.height, age);
  }
}
