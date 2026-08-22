export const ACHIEVEMENTS = [
  {
    id: 'ACH_FIRST_BLOOD',
    titleVi: 'Chiến Công Đầu Tiên',
    icon: '🩸',
    descVi: 'Tiêu diệt 10 tên lính địch trong bất kỳ chế độ chơi nào.',
    rewardShards: 15,
    check: (profile) => profile.totalKills >= 10
  },
  {
    id: 'ACH_CAMPAIGN_VICTOR',
    titleVi: 'Chinh Phục Thời Đại',
    icon: '🏆',
    descVi: 'Chiến thắng 1 trận Chiến Dịch 5 Thời Đại.',
    rewardShards: 50,
    check: (profile) => profile.campaignWins >= 1
  },
  {
    id: 'ACH_EVOLUTION_MASTER',
    titleVi: 'Bậc Thầy Tiến Hóa',
    icon: '🌌',
    descVi: 'Tiến hóa thành công đến Thời Viễn Tưởng (Age 5).',
    rewardShards: 40,
    check: (profile) => profile.reachedAge5 >= 1
  },
  {
    id: 'ACH_BOSS_SLAYER',
    titleVi: 'Kẻ Diệt Khủng Long Bạo Chúa',
    icon: '🦖',
    descVi: 'Hạ gục Boss Apex T-Rex trong trận chiến.',
    rewardShards: 30,
    check: (profile) => profile.bossesKilled >= 1
  },
  {
    id: 'ACH_HERO_ASCENSION',
    titleVi: 'Tướng Lĩnh Đạt Cấp 5',
    icon: '👑',
    descVi: 'Huấn luyện Tướng Chỉ Huy thăng cấp lên Level 5 tối thượng.',
    rewardShards: 45,
    check: (profile) => profile.heroMaxLevelReached >= 5
  },
  {
    id: 'ACH_ENDLESS_SURVIVOR',
    titleVi: 'Bất Tử Trong Bão Tố',
    icon: '♾️',
    descVi: 'Sống sót vượt qua Đợt 5 trong chế độ Vô Tận (Endless Waves).',
    rewardShards: 60,
    check: (profile) => profile.highestWave >= 5
  },
  {
    id: 'ACH_MASSIVE_SLAYER',
    titleVi: 'Vạn Quân Diệt Địch',
    icon: '💀',
    descVi: 'Hạ gục tổng cộng 100 kẻ địch trên mọi mặt trận.',
    rewardShards: 80,
    check: (profile) => profile.totalKills >= 100
  },
  {
    id: 'ACH_FLAWLESS_VICTORY',
    titleVi: 'Thành Trì Bất Hoại',
    icon: '🛡️',
    descVi: 'Giành chiến thắng mà căn cứ vẫn còn trên 90% Máu.',
    rewardShards: 50,
    check: (profile) => profile.flawlessWins >= 1
  },
  {
    id: 'ACH_TRI_FACTION_COMMANDER',
    titleVi: 'Thống Soái Tam Giới',
    icon: '⚔️',
    descVi: 'Thắng ít nhất 1 trận với cả 3 Chủng tộc: Nhân Loại, Bầy Thú & Ma Giới.',
    rewardShards: 100,
    check: (profile) => (profile.factionWins?.human >= 1 && profile.factionWins?.beast >= 1 && profile.factionWins?.undead >= 1)
  },
  {
    id: 'ACH_MEGA_KILL_STREAK',
    titleVi: 'Cuồng Nộ Bất Diệt (Unstoppable)',
    icon: '⚡',
    descVi: 'Đạt chuỗi 8 Kill Streak liên hoàn trong 1 trận đấu.',
    rewardShards: 60,
    check: (profile) => profile.highestKillStreak >= 8
  }
];

export const STAR_LAB_UPGRADES = {
  starting_gold: {
    id: 'starting_gold',
    nameVi: 'Kho Báu Khởi Đầu',
    icon: '💰',
    descVi: 'Cung cấp thêm Vàng ban đầu khi vừa bước vào trận đấu.',
    costPerLevel: [20, 40, 80, 150, 300],
    maxLevel: 5,
    bonusPerLevel: 40, // +40 gold per level
    getBonusText: (lvl) => `+${lvl * 40} Vàng Khởi Đầu`
  },

  xp_mastery: {
    id: 'xp_mastery',
    nameVi: 'Khai Sáng Văn Minh',
    icon: '⚡',
    descVi: 'Tăng lượng XP nhận được từ tất cả các nguồn để tiến hóa nhanh hơn.',
    costPerLevel: [25, 50, 100, 200, 400],
    maxLevel: 5,
    bonusPerLevel: 0.08, // +8% XP per level
    getBonusText: (lvl) => `+${Math.round(lvl * 8)}% XP Nhận Vào`
  },

  starting_mana: {
    id: 'starting_mana',
    nameVi: 'Lõi Năng Lượng Lượng Tử',
    icon: '🔮',
    descVi: 'Tất cả quân lính xuất trận nhận sẵn một lượng Năng lượng Mana ban đầu.',
    costPerLevel: [30, 60, 120, 250, 500],
    maxLevel: 5,
    bonusPerLevel: 10, // +10 starting mana
    getBonusText: (lvl) => `+${lvl * 10} Mana Ban Đầu`
  },

  base_fortress: {
    id: 'base_fortress',
    nameVi: 'Pháo Đài Vĩnh Cửu',
    icon: '🛡️',
    descVi: 'Gia cố thêm % Máu cơ bản cho Pháo đài căn cứ ở mọi thời đại.',
    costPerLevel: [20, 45, 90, 180, 350],
    maxLevel: 5,
    bonusPerLevel: 0.10, // +10% base HP
    getBonusText: (lvl) => `+${Math.round(lvl * 10)}% Máu Căn Cứ`
  },

  hero_might: {
    id: 'hero_might',
    nameVi: 'Uy Lực Tướng Lĩnh',
    icon: '👑',
    descVi: 'Tăng sát thương công kích cơ bản và giảm thời gian hồi sinh cho Tướng.',
    costPerLevel: [35, 70, 140, 300, 600],
    maxLevel: 5,
    bonusPerLevel: 0.12, // +12% Hero Atk & -2s respawn
    getBonusText: (lvl) => `+${Math.round(lvl * 12)}% Công Tướng & -${lvl * 2}s Hồi Sinh`
  }
};
