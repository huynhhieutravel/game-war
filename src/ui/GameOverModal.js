export class GameOverModal {
  constructor(engine) {
    this.engine = engine;
    this.modal = document.getElementById('screen-gameover');
    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.elGameOverTitle = document.getElementById('gameover-title');
    this.elGameOverSubtitle = document.getElementById('gameover-subtitle');
    this.elStatTime = document.getElementById('stat-time');
    this.elStatKills = document.getElementById('stat-kills');
    this.elStatUnits = document.getElementById('stat-units');
    this.elStatGold = document.getElementById('stat-gold');
    this.elStatWaveRow = document.getElementById('stat-wave-row');
    this.elStatWave = document.getElementById('stat-wave');
    this.btnRestart = document.getElementById('btn-restart');
    this.btnMenuReturn = document.getElementById('btn-menu-return');
  }

  bindEvents() {
    if (this.btnRestart) {
      this.btnRestart.addEventListener('click', () => {
        this.close();
        const diff = this.engine.difficulty || 'normal';
        const mode = this.engine.gameMode || 'campaign';
        this.engine.start(diff, mode);
      });
    }

    if (this.btnMenuReturn) {
      this.btnMenuReturn.addEventListener('click', () => {
        this.close();
        const pauseScreen = document.getElementById('screen-pause');
        if (pauseScreen) pauseScreen.classList.add('hidden');
        const menuScreen = document.getElementById('screen-menu');
        if (menuScreen) menuScreen.classList.remove('hidden');

        this.engine.state = 'menu';
        this.engine.sound.stopBGM();
        if (this.engine.uiManager) {
          this.engine.uiManager.updateHighScoreDisplay();
        }
      });
    }
  }

  open(result, stats) {
    if (!this.modal) return;
    this.modal.classList.remove('hidden');
    const isWin = result === 'victory';

    if (this.elGameOverTitle) {
      this.elGameOverTitle.textContent = isWin ? 'CHIẾN THẮNG HUY HOÀNG!' : 'THẤT BẠI!';
      this.elGameOverTitle.className = isWin ? 'text-victory' : 'text-defeat';
    }

    if (this.elGameOverSubtitle) {
      this.elGameOverSubtitle.textContent = isWin
        ? 'Bạn đã hủy diệt hoàn toàn căn cứ của kẻ thù qua các thời đại!'
        : 'Căn cứ của bạn đã bị nghiền nát trước hỏa lực đối phương!';
    }

    const timePlayed = stats?.timePlayed || 0;
    const mins = Math.floor(timePlayed / 60);
    const secs = Math.floor(timePlayed % 60);

    if (this.elStatTime) this.elStatTime.textContent = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
    if (this.elStatKills) this.elStatKills.textContent = stats?.enemiesKilled || 0;
    if (this.elStatUnits) this.elStatUnits.textContent = stats?.unitsTrained || 0;
    if (this.elStatGold) this.elStatGold.textContent = Math.round(this.engine.playerBase ? this.engine.playerBase.gold : (stats?.goldEarned || 0));

    if (this.elStatWaveRow && this.elStatWave) {
      if (this.engine.gameMode === 'endless') {
        this.elStatWaveRow.classList.remove('hidden');
        this.elStatWave.textContent = `Đợt ${this.engine.wave}`;
      } else {
        this.elStatWaveRow.classList.add('hidden');
      }
    }
  }

  close() {
    if (this.modal) this.modal.classList.add('hidden');
  }
}
