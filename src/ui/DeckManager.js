import { UNITS } from '../config/units.js';
import { TURRETS } from '../config/turrets.js';
import { ARMORY_UPGRADES } from '../config/upgrades.js';
import { AGES } from '../config/ages.js';
import { getUnitAvatarSvg, getTurretAvatarSvg, getArmoryAvatarSvg, getBaseFortAvatarSvg } from '../config/unitAvatars.js';

export class DeckManager {
  constructor(engine) {
    this.engine = engine;
    this.activeTab = 'units'; // 'units' | 'turrets' | 'armory' | 'upgrades'
    this.selectedTurretKey = null;

    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.tabButtons = document.querySelectorAll('.deck-tab-btn');
    this.tabContents = document.querySelectorAll('.deck-tab-content');
    this.containerUnitCards = document.getElementById('unit-cards-container');
    this.containerQueueSlots = document.getElementById('queue-slots-container');
    this.containerTurretShop = document.getElementById('turret-shop-container');
    this.containerTurretSlots = document.getElementById('turret-slots-container');
    this.containerArmory = document.getElementById('armory-cards-container');
    this.containerUpgrades = document.getElementById('base-upgrades-container');
  }

  bindEvents() {
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
        this.engine.sound.playSfx('click');
      });
    });
  }

  switchTab(tab) {
    this.activeTab = tab;
    this.tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    this.tabContents.forEach(c => c.classList.toggle('hidden', c.id !== `tab-${tab}`));
    this.renderActiveTab();
  }

  render() {
    this.renderActiveTab();
  }

  renderActiveTab() {
    if (!this.engine.playerBase) return;
    const base = this.engine.playerBase;
    const age = base.age;

    if (this.activeTab === 'units') {
      this.renderUnitsTab(base, age);
    } else if (this.activeTab === 'turrets') {
      this.renderTurretsTab(base, age);
    } else if (this.activeTab === 'armory') {
      this.renderArmoryTab(base);
    } else if (this.activeTab === 'upgrades') {
      this.renderUpgradesTab(base, age);
    }
  }

  trainUnit(unitKey) {
    if (this.engine.state !== 'playing' || !this.engine.playerBase) return;
    const success = this.engine.playerBase.queueUnit(unitKey);
    if (success) {
      this.engine.sound.playSfx('click');
      this.render();
    }
  }

  renderUnitsTab(base, age) {
    if (!this.containerUnitCards) return;
    const unitKeys = Object.keys(UNITS).filter(k => UNITS[k].ageId === age);

    this.containerUnitCards.innerHTML = unitKeys.map((key, index) => {
      const u = UNITS[key];
      const hotkey = index + 1;
      const dMult = base.getDmgMultiplier ? base.getDmgMultiplier() : 1.0;
      const hMult = base.getHpMultiplier ? base.getHpMultiplier() : 1.0;
      const baseAtk = (u.physicalAttack || 0) + (u.magicAttack || 0) || (u.damage || 15);
      const effDmg = Math.round(baseAtk * dMult);
      const effHp = Math.round(u.hp * hMult);
      const avatarSvg = getUnitAvatarSvg(key);

      return `
        <div class="unit-card ${base.gold < u.cost ? 'disabled' : ''}" data-unit-key="${key}">
          <div class="unit-card-header">
            <span class="hotkey-badge">[${hotkey}]</span>
            <span class="unit-role-badge role-${u.role}">${u.role.toUpperCase()}</span>
          </div>
          <div class="unit-card-main">
            <div class="unit-avatar-box">
              ${avatarSvg}
            </div>
            <div class="unit-card-body">
              <div class="unit-name">${u.nameVi}</div>
              <div class="unit-stats">
                <span>❤️ ${effHp}</span>
                <span>⚔️ ${effDmg}</span>
                <span>🏹 ${u.attackRange}px</span>
              </div>
            </div>
          </div>
          <div class="unit-card-footer">
            <div class="unit-cost">💰 ${u.cost} G</div>
            <button class="btn-train">Mua [${hotkey}]</button>
          </div>
        </div>
      `;
    }).join('');

    const cards = this.containerUnitCards.querySelectorAll('.unit-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.unitKey;
        this.trainUnit(key);
      });
    });
  }

  renderTurretsTab(base, age) {
    if (!this.containerTurretShop || !this.containerTurretSlots) return;

    const turretKeys = Object.keys(TURRETS).filter(k => TURRETS[k].ageId === age);
    this.containerTurretShop.innerHTML = turretKeys.map(key => {
      const t = TURRETS[key];
      const isSelected = this.selectedTurretKey === key;
      const avatarSvg = getTurretAvatarSvg(key);

      return `
        <div class="turret-shop-item ${isSelected ? 'selected' : ''}" data-turret-key="${key}">
          <div class="turret-item-top">
            <div class="deck-item-avatar">
              ${avatarSvg}
            </div>
            <div class="turret-item-body">
              <div class="turret-title">
                <span class="turret-name" title="${t.nameVi}">${t.nameVi}</span>
                <span class="turret-cost">💰 ${t.cost}G</span>
              </div>
              <div class="turret-stats">
                <span>⚔️ ${t.damage}</span>
                <span>🎯 ${t.range}px</span>
                <span>⏱️ ${t.fireCooldown}s</span>
              </div>
            </div>
          </div>
          <button class="btn-select-turret ${isSelected ? 'active' : ''}">
            ${isSelected ? '✓ Đang chọn' : 'Chọn tháp'}
          </button>
        </div>
      `;
    }).join('');

    let slotsHtml = '';
    for (let i = 0; i < 4; i++) {
      const isUnlocked = i < base.maxTurretSlots;
      const currentTurret = base.turrets[i];

      if (isUnlocked) {
        if (currentTurret) {
          const avatarSvg = getTurretAvatarSvg(currentTurret.id);
          slotsHtml += `
            <div class="turret-slot-box filled">
              <div class="slot-header">VỊ TRÍ #${i + 1}</div>
              <div class="slot-main-row">
                <div class="deck-item-avatar mini">
                  ${avatarSvg}
                </div>
                <div class="slot-text-info">
                  <div class="turret-slot-name">${currentTurret.nameVi}</div>
                  <div class="turret-slot-stats">⚔️ ${currentTurret.damage} | 🎯 ${currentTurret.range}px</div>
                </div>
              </div>
              <button class="btn-sell-turret" data-slot="${i}">Bán (+${currentTurret.sellValue}G)</button>
            </div>
          `;
        } else {
          const avatarSvg = getTurretAvatarSvg('slot_empty');
          slotsHtml += `
            <div class="turret-slot-box empty">
              <div class="slot-header">VỊ TRÍ #${i + 1} (Trống)</div>
              <div class="slot-main-row">
                <div class="deck-item-avatar mini">
                  ${avatarSvg}
                </div>
                <div class="slot-text-info">
                  <div class="turret-slot-hint">Chọn tháp bên trái để lắp</div>
                </div>
              </div>
              <button class="btn-build-turret" data-slot="${i}">Lắp vào ô này</button>
            </div>
          `;
        }
      } else {
        const slotCost = AGES[age - 1].slotCosts[i];
        const avatarSvg = getTurretAvatarSvg('slot_locked');
        slotsHtml += `
          <div class="turret-slot-box locked">
            <div class="slot-header">VỊ TRÍ #${i + 1} (Khóa)</div>
            <div class="slot-main-row">
              <div class="deck-item-avatar mini">
                ${avatarSvg}
              </div>
              <div class="slot-text-info">
                <div class="turret-slot-hint">Mở thêm ô tháp phòng thủ</div>
              </div>
            </div>
            <button class="btn-unlock-slot" data-slot="${i}" ${base.gold < slotCost ? 'disabled' : ''}>
              Mở khóa (💰 ${slotCost}G)
            </button>
          </div>
        `;
      }
    }
    this.containerTurretSlots.innerHTML = slotsHtml;

    this.containerTurretShop.querySelectorAll('.turret-shop-item').forEach(item => {
      item.addEventListener('click', () => {
        this.selectedTurretKey = item.dataset.turretKey;
        this.engine.sound.playSfx('click');
        this.renderTurretsTab(base, age);
      });
    });

    this.containerTurretSlots.querySelectorAll('.btn-sell-turret').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const slot = parseInt(btn.dataset.slot, 10);
        base.sellTurret(slot);
        this.engine.sound.playSfx('click');
        this.renderTurretsTab(base, age);
      });
    });

    this.containerTurretSlots.querySelectorAll('.btn-build-turret').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const slot = parseInt(btn.dataset.slot, 10);
        if (this.selectedTurretKey) {
          const success = base.buildTurret(slot, this.selectedTurretKey);
          if (success) {
            this.engine.sound.playSfx('click');
            this.renderTurretsTab(base, age);
          }
        }
      });
    });

    this.containerTurretSlots.querySelectorAll('.btn-unlock-slot').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const success = base.unlockSlot();
        if (success) {
          this.engine.sound.playSfx('click');
          this.renderTurretsTab(base, age);
        }
      });
    });
  }

  renderArmoryTab(base) {
    if (!this.containerArmory) return;

    this.containerArmory.innerHTML = Object.keys(ARMORY_UPGRADES).map(key => {
      const tech = ARMORY_UPGRADES[key];
      const level = base.armory[key];
      const isMax = level >= tech.maxLevel;
      const cost = isMax ? 0 : tech.costs[level];
      const canAfford = !isMax && base.gold >= cost;
      const avatarSvg = getArmoryAvatarSvg(key);

      return `
        <div class="armory-card">
          <div class="armory-top-row">
            <div class="deck-item-avatar">
              ${avatarSvg}
            </div>
            <div class="armory-info-body">
              <div class="armory-title">${tech.nameVi}</div>
              <div class="armory-level">Cấp độ: <strong>${level} / ${tech.maxLevel}</strong></div>
            </div>
          </div>
          <p class="armory-desc">${tech.description}</p>
          <div class="armory-footer">
            <button class="btn-upgrade-tech ${isMax ? 'maxed' : ''}" data-tech="${key}" ${!canAfford || isMax ? 'disabled' : ''}>
              ${isMax ? 'ĐÃ TỐI ĐA' : `Nâng Cấp (💰 ${cost}G)`}
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.containerArmory.querySelectorAll('.btn-upgrade-tech').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.tech;
        const success = base.upgradeArmory(key);
        if (success) {
          this.engine.sound.playSfx('evolve');
          this.engine.particles.addFloatingText('NÂNG CẤP THÀNH CÔNG!', base.x + 80, this.engine.groundY - 140, '#22c55e', 14, true);
          this.renderArmoryTab(base);
        }
      });
    });
  }

  renderUpgradesTab(base, age) {
    if (!this.containerUpgrades) return;
    const ageConfig = AGES[age - 1];
    const avatarSvg = getBaseFortAvatarSvg();

    this.containerUpgrades.innerHTML = `
      <div class="upgrade-card compact-fort-card">
        <div class="upgrade-card-main">
          <div class="deck-item-avatar large">
            ${avatarSvg}
          </div>
          <div class="upgrade-info">
            <h3>Gia Cố Pháo Đài (+${ageConfig.baseUpgradeHpGain} HP)</h3>
            <p>Tăng vĩnh viễn lượng máu tối đa và hồi phục máu pháo đài cho thời đại này.</p>
            <div class="upgrade-stat">Máu hiện tại: <strong>${Math.ceil(base.hp)} / ${base.maxHp} HP</strong></div>
          </div>
        </div>
        <button class="btn-upgrade-action" id="btn-upgrade-hp" ${base.gold < ageConfig.baseUpgradeCost ? 'disabled' : ''}>
          Gia Cố (💰 ${ageConfig.baseUpgradeCost}G)
        </button>
      </div>
    `;

    const btnUpgradeHp = document.getElementById('btn-upgrade-hp');
    if (btnUpgradeHp) {
      btnUpgradeHp.addEventListener('click', () => {
        const success = base.upgradeBaseHp();
        if (success) {
          this.engine.sound.playSfx('evolve');
          this.renderUpgradesTab(base, age);
        }
      });
    }
  }

  update(dt) {
    if (!this.engine.playerBase) return;
    const base = this.engine.playerBase;

    this.updateQueueDisplay(base);
    this.updateUnitAffordability(base);
  }

  updateQueueDisplay(base) {
    if (!this.containerQueueSlots) return;
    const slots = this.containerQueueSlots.children;

    for (let i = 0; i < 5; i++) {
      const slotEl = slots[i];
      if (!slotEl) continue;

      const unitKey = base.queue[i];
      if (unitKey) {
        const config = UNITS[unitKey];
        if (slotEl.dataset.unitKey !== unitKey) {
          // Re-render completely if it's a new unit in this slot
          slotEl.className = 'queue-slot filled';
          slotEl.dataset.unitKey = unitKey;
          const miniAvatar = getUnitAvatarSvg(unitKey);
          slotEl.innerHTML = `
            <div class="queue-avatar-mini">${miniAvatar}</div>
            <span class="queue-unit-name">${config.nameVi.split(' ')[0]}</span>
            <div class="queue-progress-bg"><div class="queue-progress" style="width: 0%"></div></div>
            <button class="btn-cancel-queue" title="Hủy luyện">✕</button>
          `;
          const cancelBtn = slotEl.querySelector('.btn-cancel-queue');
          if (cancelBtn) {
            cancelBtn.onclick = (e) => {
              e.stopPropagation();
              base.cancelQueue(i);
              this.engine.sound.playSfx('click');
            };
          }
        }
        
        // Just update progress bar width every frame
        const progressEl = slotEl.querySelector('.queue-progress');
        if (progressEl) {
          if (i === 0) {
            const progress = Math.max(0, (1 - base.trainTimer / base.currentTrainingTime) * 100);
            progressEl.style.width = `${progress}%`;
          } else {
            progressEl.style.width = `0%`;
          }
        }
      } else {
        if (slotEl.className !== 'queue-slot empty') {
          slotEl.className = 'queue-slot empty';
          slotEl.dataset.unitKey = '';
          slotEl.innerHTML = `<span class="slot-num">${i + 1}</span>`;
        }
      }
    }
  }

  updateUnitAffordability(base) {
    if (this.activeTab !== 'units' || !this.containerUnitCards) return;
    const cards = this.containerUnitCards.querySelectorAll('.unit-card');
    cards.forEach(card => {
      const key = card.dataset.unitKey;
      const config = UNITS[key];
      if (config) {
        const canAfford = base.gold >= config.cost && base.queue.length < 5;
        card.classList.toggle('disabled', !canAfford);
      }
    });
  }
}
