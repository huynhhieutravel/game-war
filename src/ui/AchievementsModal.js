import { ACHIEVEMENTS, STAR_LAB_UPGRADES } from '../config/achievements.js';

export class AchievementsModal {
  constructor(engine) {
    this.engine = engine;
    this.modal = document.getElementById('screen-achievements');
    this.activeTab = 'star_lab'; // 'star_lab' | 'achievements'
    this.init();
  }

  init() {
    if (!this.modal) return;

    // Close button
    const closeBtn = document.getElementById('btn-close-achievements');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Tab buttons
    const tabBtns = this.modal.querySelectorAll('.ach-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTab = btn.dataset.achTab;
        this.renderTab();
      });
    });
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.remove('hidden');
    this.render();
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
  }

  render() {
    const profile = this.engine.profileManager;
    profile.checkAchievements();

    // Update Star Shard Balance
    const balanceEl = document.getElementById('ach-shard-balance');
    if (balanceEl) {
      balanceEl.textContent = `${profile.getStarShards()} ⭐`;
    }

    this.renderTab();
  }

  renderTab() {
    const labContainer = document.getElementById('ach-tab-starlab');
    const listContainer = document.getElementById('ach-tab-list');

    if (this.activeTab === 'star_lab') {
      if (labContainer) labContainer.classList.remove('hidden');
      if (listContainer) listContainer.classList.add('hidden');
      this.renderStarLab();
    } else {
      if (labContainer) labContainer.classList.add('hidden');
      if (listContainer) listContainer.classList.remove('hidden');
      this.renderAchievementsList();
    }
  }

  renderStarLab() {
    const grid = document.getElementById('starlab-upgrades-grid');
    if (!grid) return;

    const profile = this.engine.profileManager;
    const shards = profile.getStarShards();

    grid.innerHTML = Object.values(STAR_LAB_UPGRADES).map(upg => {
      const currentLvl = profile.getUpgradeLevel(upg.id);
      const isMax = currentLvl >= upg.maxLevel;
      const nextCost = isMax ? 0 : upg.costPerLevel[currentLvl];
      const canAfford = !isMax && shards >= nextCost;

      const pips = Array.from({ length: upg.maxLevel }, (_, i) => 
        `<span class="upgrade-pip ${i < currentLvl ? 'filled' : ''}"></span>`
      ).join('');

      return `
        <div class="starlab-card ${isMax ? 'maxed' : ''}">
          <div class="starlab-header">
            <div class="starlab-icon">${upg.icon}</div>
            <div class="starlab-info">
              <div class="starlab-name">${upg.nameVi}</div>
              <div class="starlab-bonus">${upg.getBonusText(currentLvl || 1)}</div>
            </div>
          </div>
          <p class="starlab-desc">${upg.descVi}</p>
          <div class="starlab-pips">${pips} <span class="pip-text">Cấp ${currentLvl}/${upg.maxLevel}</span></div>
          <div class="starlab-footer">
            ${isMax 
              ? `<button class="btn-starlab-upgrade maxed" disabled>ĐÃ ĐẠT TỐI ĐA</button>`
              : `<button class="btn-starlab-upgrade ${canAfford ? 'affordable' : 'disabled'}" data-upgrade-id="${upg.id}">
                  <span>NÂNG CẤP</span>
                  <span class="cost-tag">${nextCost} ⭐</span>
                </button>`
            }
          </div>
        </div>
      `;
    }).join('');

    // Bind upgrade clicks
    grid.querySelectorAll('.btn-starlab-upgrade:not(.maxed)').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const upgId = btn.dataset.upgradeId;
        if (profile.buyStarLabUpgrade(upgId)) {
          this.engine.sound.playSfx('evolve');
          this.render();
        }
      });
    });
  }

  renderAchievementsList() {
    const list = document.getElementById('achievements-items-list');
    if (!list) return;

    const profile = this.engine.profileManager;
    const unlockedMap = profile.data.unlockedAchievements || {};

    list.innerHTML = ACHIEVEMENTS.map(ach => {
      const isUnlocked = !!unlockedMap[ach.id];

      return `
        <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="ach-badge">${ach.icon}</div>
          <div class="ach-details">
            <div class="ach-title">${ach.titleVi} ${isUnlocked ? '✅' : '🔒'}</div>
            <div class="ach-desc">${ach.descVi}</div>
          </div>
          <div class="ach-reward">
            <span class="shard-reward">+${ach.rewardShards} ⭐</span>
            <span class="status-badge ${isUnlocked ? 'done' : 'pending'}">${isUnlocked ? 'ĐÃ MỞ' : 'CHƯA ĐẠT'}</span>
          </div>
        </div>
      `;
    }).join('');
  }
}
