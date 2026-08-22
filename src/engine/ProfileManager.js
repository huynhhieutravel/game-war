import { ACHIEVEMENTS, STAR_LAB_UPGRADES } from '../config/achievements.js';

const STORAGE_KEY = 'ageofwar_profile_v3';

export class ProfileManager {
  constructor() {
    this.data = this.loadProfile();
  }

  getDefaultProfile() {
    return {
      selectedFaction: 'human',
      starShards: 50, // Free 50 shards on start
      totalVictories: 0,
      campaignWins: 0,
      totalKills: 0,
      highestWave: 1,
      reachedAge5: 0,
      bossesKilled: 0,
      heroMaxLevelReached: 1,
      flawlessWins: 0,
      highestKillStreak: 0,
      factionWins: {
        human: 0,
        beast: 0,
        undead: 0
      },
      unlockedAchievements: {},
      starLabUpgrades: {
        starting_gold: 0,
        xp_mastery: 0,
        starting_mana: 0,
        base_fortress: 0,
        hero_might: 0
      }
    };
  }

  loadProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.getDefaultProfile();
      const parsed = JSON.parse(raw);
      return { ...this.getDefaultProfile(), ...parsed };
    } catch (e) {
      console.warn('[ProfileManager] Failed to load profile:', e);
      return this.getDefaultProfile();
    }
  }

  saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('[ProfileManager] Failed to save profile:', e);
    }
  }

  setFaction(factionCode) {
    if (['human', 'beast', 'undead'].includes(factionCode)) {
      this.data.selectedFaction = factionCode;
      this.saveProfile();
    }
  }

  getFaction() {
    return this.data.selectedFaction || 'human';
  }

  getStarShards() {
    return this.data.starShards || 0;
  }

  addStarShards(amount) {
    this.data.starShards = (this.data.starShards || 0) + amount;
    this.saveProfile();
  }

  checkAchievements(particles = null) {
    let newlyUnlocked = [];
    for (const ach of ACHIEVEMENTS) {
      if (!this.data.unlockedAchievements[ach.id] && ach.check(this.data)) {
        this.data.unlockedAchievements[ach.id] = true;
        this.addStarShards(ach.rewardShards);
        newlyUnlocked.push(ach);

        if (particles) {
          particles.showComboBanner(`🏆 THÀNH TỰU: ${ach.titleVi}`, `+${ach.rewardShards} ⭐ Tinh Thể Sao!`, '#fbbf24');
        }
      }
    }
    if (newlyUnlocked.length > 0) {
      this.saveProfile();
    }
    return newlyUnlocked;
  }

  buyStarLabUpgrade(upgradeId) {
    const upgrade = STAR_LAB_UPGRADES[upgradeId];
    if (!upgrade) return false;

    const currentLvl = this.data.starLabUpgrades[upgradeId] || 0;
    if (currentLvl >= upgrade.maxLevel) return false;

    const cost = upgrade.costPerLevel[currentLvl];
    if (this.data.starShards < cost) return false;

    this.data.starShards -= cost;
    this.data.starLabUpgrades[upgradeId] = currentLvl + 1;
    this.saveProfile();
    return true;
  }

  getUpgradeLevel(upgradeId) {
    return this.data.starLabUpgrades[upgradeId] || 0;
  }

  // Meta-Progression Application to Match
  getBonusStartingGold() {
    const lvl = this.getUpgradeLevel('starting_gold');
    return lvl * STAR_LAB_UPGRADES.starting_gold.bonusPerLevel;
  }

  getXpMultiplier() {
    const lvl = this.getUpgradeLevel('xp_mastery');
    return 1.0 + lvl * STAR_LAB_UPGRADES.xp_mastery.bonusPerLevel;
  }

  getBonusStartingMana() {
    const lvl = this.getUpgradeLevel('starting_mana');
    return lvl * STAR_LAB_UPGRADES.starting_mana.bonusPerLevel;
  }

  getBaseHpMultiplier() {
    const lvl = this.getUpgradeLevel('base_fortress');
    return 1.0 + lvl * STAR_LAB_UPGRADES.base_fortress.bonusPerLevel;
  }

  getHeroMightMultiplier() {
    const lvl = this.getUpgradeLevel('hero_might');
    return 1.0 + lvl * STAR_LAB_UPGRADES.hero_might.bonusPerLevel;
  }

  getHeroRespawnReduction() {
    const lvl = this.getUpgradeLevel('hero_might');
    return lvl * 2; // -2s per level
  }
}
