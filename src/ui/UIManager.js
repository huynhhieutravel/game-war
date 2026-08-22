import { HUD } from './HUD.js';
import { DeckManager } from './DeckManager.js';
import { GameOverModal } from './GameOverModal.js';
import { WikiModal } from './WikiModal.js';
import { AchievementsModal } from './AchievementsModal.js';

export class UIManager {
  constructor(engine) {
    this.engine = engine;

    // Sub-UI Component Controllers
    this.hud = new HUD(this.engine);
    this.deck = new DeckManager(this.engine);
    this.gameOverModal = new GameOverModal(this.engine);
    this.wikiModal = new WikiModal(this.engine);
    this.achievementsModal = new AchievementsModal(this.engine);

    this.cacheElements();
    this.bindEvents();
    this.updateHighScoreDisplay();
    this.updateAudioButtons();
  }

  cacheElements() {
    this.screenMenu = document.getElementById('screen-menu');
    this.screenPause = document.getElementById('screen-pause');
    this.btnStartGame = document.getElementById('btn-start-game');
    this.difficultySelect = document.getElementById('difficulty-select');
    this.modeSelect = document.getElementById('game-mode-select');
    this.mapSelect = document.getElementById('map-select');
    this.elHighScore = document.getElementById('high-score-display');
    this.factionCards = document.querySelectorAll('.faction-card');
    this.btnOpenAchievements = document.getElementById('btn-open-achievements');
    this.btnOpenAchievementsPause = document.getElementById('btn-open-achievements-pause');
    this.btnResume = document.getElementById('btn-resume');
    this.btnHudSound = document.getElementById('btn-sound');

    // Camera Navigation Toolbar
    this.btnCamZoomOut = document.getElementById('btn-cam-zoom-out');
    this.btnCamZoomReset = document.getElementById('btn-cam-zoom-reset');
    this.btnCamZoomIn = document.getElementById('btn-cam-zoom-in');
    this.btnCamJumpPlayer = document.getElementById('btn-cam-jump-player');
    this.btnCamJumpBattle = document.getElementById('btn-cam-jump-battle');
    this.btnCamJumpEnemy = document.getElementById('btn-cam-jump-enemy');
  }

  updateHighScoreDisplay() {
    if (this.elHighScore) {
      const high = localStorage.getItem('ageofwar_high_wave') || '1';
      this.elHighScore.textContent = `Kỷ Lục Đợt Cao Nhất: Đợt ${high}`;
    }
  }

  updateAudioButtons(isMuted = this.engine.sound.isMuted) {
    if (this.btnHudSound) {
      this.btnHudSound.textContent = isMuted ? '🔇' : '🔊';
      this.btnHudSound.classList.toggle('muted', isMuted);
    }
  }

  bindEvents() {
    // Start Game Action
    if (this.btnStartGame) {
      this.btnStartGame.addEventListener('click', () => {
        const diff = this.difficultySelect ? this.difficultySelect.value : 'normal';
        const mode = this.modeSelect ? this.modeSelect.value : 'campaign';
        const mapId = this.mapSelect ? this.mapSelect.value : 'map_primeval_valley';
        
        this.engine.setMap(mapId);
        this.engine.sound.ensureContext();
        this.engine.start(diff, mode);
      });
    }

    // Faction Selection
    this.factionCards.forEach(card => {
      card.addEventListener('click', () => {
        this.factionCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const fCode = card.dataset.faction;
        this.engine.setFaction(fCode);
        this.engine.sound.playSfx('click');
      });
    });

    // Open Achievements & Star Lab
    if (this.btnOpenAchievements) {
      this.btnOpenAchievements.addEventListener('click', () => {
        this.achievementsModal.open();
        this.engine.sound.playSfx('click');
      });
    }
    if (this.btnOpenAchievementsPause) {
      this.btnOpenAchievementsPause.addEventListener('click', () => {
        this.achievementsModal.open();
        this.engine.sound.playSfx('click');
      });
    }

    // Resume Game from Pause Screen
    if (this.btnResume) {
      this.btnResume.addEventListener('click', () => {
        this.engine.togglePause();
      });
    }

    // Audio Toggle
    if (this.btnHudSound) {
      this.btnHudSound.addEventListener('click', () => {
        this.toggleSound();
      });
    }

    // Tactical Camera Toolbar Events
    if (this.btnCamZoomOut) {
      this.btnCamZoomOut.addEventListener('click', () => {
        this.engine.camera.zoomBy(-0.15);
        this.engine.sound.playSfx('click');
      });
    }
    if (this.btnCamZoomReset) {
      this.btnCamZoomReset.addEventListener('click', () => {
        this.engine.camera.resetZoom();
        this.engine.sound.playSfx('click');
      });
    }
    if (this.btnCamZoomIn) {
      this.btnCamZoomIn.addEventListener('click', () => {
        this.engine.camera.zoomBy(0.15);
        this.engine.sound.playSfx('click');
      });
    }
    if (this.btnCamJumpPlayer) {
      this.btnCamJumpPlayer.addEventListener('click', () => {
        this.engine.camera.jumpToPlayer(this.engine);
        this.engine.sound.playSfx('click');
      });
    }
    if (this.btnCamJumpBattle) {
      this.btnCamJumpBattle.addEventListener('click', () => {
        this.engine.camera.jumpToFrontline(this.engine);
        this.engine.sound.playSfx('click');
      });
    }
    if (this.btnCamJumpEnemy) {
      this.btnCamJumpEnemy.addEventListener('click', () => {
        this.engine.camera.jumpToEnemy(this.engine);
        this.engine.sound.playSfx('click');
      });
    }
  }

  onGameStart() {
    if (this.screenMenu) this.screenMenu.classList.add('hidden');
    if (this.screenPause) this.screenPause.classList.add('hidden');
    this.gameOverModal.close();
    this.wikiModal.close();
    this.deck.render();
  }

  onGameOver(result, stats) {
    this.gameOverModal.open(result, stats);
  }

  // Delegated Forwarders for Hotkeys & Helpers
  trainUnit(unitKey) {
    this.deck.trainUnit(unitKey);
  }

  tryEvolve() {
    if (this.engine.playerBase && this.engine.playerBase.canEvolve()) {
      this.engine.playerBase.evolve(this.engine);
      this.deck.render();
    }
  }

  useSpecial() {
    if (this.engine.triggerSpecialAttack('player')) {
      this.deck.render();
    }
  }

  toggleFallBack() {
    return this.engine.toggleFallback();
  }

  toggleFallback() {
    return this.engine.toggleFallback();
  }

  triggerCharge() {
    return this.engine.triggerCharge();
  }

  toggleSound() {
    const isMuted = this.engine.sound.toggleMute();
    this.updateAudioButtons(isMuted);
    return isMuted;
  }

  togglePause() {
    const isPaused = this.engine.togglePause();
    if (this.screenPause) {
      this.screenPause.classList.toggle('hidden', !isPaused);
    }
  }

  toggleWiki() {
    this.wikiModal.toggle();
  }

  setSpeed(speed) {
    this.engine.setGameSpeed(speed);
  }

  update(dt) {
    this.hud.update(dt);
    this.deck.update(dt);
  }
}
