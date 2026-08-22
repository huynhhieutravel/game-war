export const AGES = [
  {
    id: 1,
    key: 'stone',
    name: 'Stone Age',
    nameVi: 'Thời Tiền Sử',
    description: 'Kỷ nguyên nguyên thủy với vũ khí thô sơ và khủng long',
    evolveXp: 4000,
    baseHp: 600,
    baseUpgradeCost: 400,
    baseUpgradeHpGain: 300,
    slotCosts: [0, 1000, 3000, 7500],
    special: {
      id: 'meteor_swarm',
      name: 'Meteor Swarm',
      nameVi: 'Mưa Sao Băng',
      description: 'Gọi thiên thạch rực lửa dội xuống chiến trường',
      cooldown: 55, // seconds
      meteorCount: 9,
      damage: 75,
      radius: 80
    },
    colors: {
      skyTop: '#4a2c11',
      skyBottom: '#d97736',
      mountain: '#5c4033',
      ground: '#3b2514',
      grass: '#5c6b28',
      base: '#786d5f'
    }
  },
  {
    id: 2,
    key: 'castle',
    name: 'Castle Age',
    nameVi: 'Thời Trung Cổ',
    description: 'Thời đại của kiếm sĩ kiên cường, cung thủ và kỵ binh hoàng gia',
    evolveXp: 14000,
    baseHp: 1500,
    baseUpgradeCost: 1200,
    baseUpgradeHpGain: 800,
    slotCosts: [0, 1500, 4500, 10000],
    special: {
      id: 'arrow_storm',
      name: 'Arrow Storm',
      nameVi: 'Bão Tên Lửa',
      description: 'Phóng hàng ngàn mũi tên lửa rực sáng quét sạch tiền tuyến',
      cooldown: 60,
      waveCount: 5,
      arrowsPerWave: 12,
      damage: 45,
      radius: 40
    },
    colors: {
      skyTop: '#1a365d',
      skyBottom: '#63b3ed',
      mountain: '#4a5568',
      ground: '#2d3748',
      grass: '#2f855a',
      base: '#718096'
    }
  },
  {
    id: 3,
    key: 'renaissance',
    name: 'Renaissance',
    nameVi: 'Thời Phục Hưng',
    description: 'Kỷ nguyên thuốc súng, súng hỏa mai và pháo công thành',
    evolveXp: 45000,
    baseHp: 3800,
    baseUpgradeCost: 3500,
    baseUpgradeHpGain: 2000,
    slotCosts: [0, 2500, 7000, 15000],
    special: {
      id: 'artillery_barrage',
      name: 'Artillery Barrage',
      nameVi: 'Bão Pháo Kích',
      description: 'Nã pháo dồn dập cày xới trận địa quân thù',
      cooldown: 65,
      shellCount: 12,
      damage: 280,
      radius: 90
    },
    colors: {
      skyTop: '#374151',
      skyBottom: '#f59e0b',
      mountain: '#4b5563',
      ground: '#1f2937',
      grass: '#4d7c0f',
      base: '#64748b'
    }
  },
  {
    id: 4,
    key: 'modern',
    name: 'Modern Age',
    nameVi: 'Thời Hiện Đại',
    description: 'Chiến tranh hiện đại với súng tự động, bazooka và xe tăng bọc thép',
    evolveXp: 200000,
    baseHp: 9000,
    baseUpgradeCost: 8500,
    baseUpgradeHpGain: 5000,
    slotCosts: [0, 5000, 15000, 30000],
    special: {
      id: 'carpet_airstrike',
      name: 'B-52 Carpet Bombing',
      nameVi: 'Không Kích B-52',
      description: 'Pháo đài bay B-52 dội thảm bom napalm hủy diệt toàn tuyến',
      cooldown: 70,
      bombsCount: 16,
      damage: 620,
      radius: 110
    },
    colors: {
      skyTop: '#1e293b',
      skyBottom: '#64748b',
      mountain: '#334155',
      ground: '#0f172a',
      grass: '#365314',
      base: '#475569'
    }
  },
  {
    id: 5,
    key: 'future',
    name: 'Future Age',
    nameVi: 'Thời Viễn Tưởng',
    description: 'Công nghệ Cyber tương lai, chiến binh plasma và cỗ máy Titan',
    evolveXp: Infinity,
    baseHp: 22000,
    baseUpgradeCost: 20000,
    baseUpgradeHpGain: 12000,
    slotCosts: [0, 10000, 25000, 50000],
    special: {
      id: 'orbital_laser',
      name: 'Orbital Ion Cannon',
      nameVi: 'Tia Laze Quỹ Đạo',
      description: 'Vệ tinh không gian phóng chùm hạt Ion siêu nhiệt thiêu rụi kẻ địch',
      cooldown: 75,
      beamDuration: 4.5,
      damagePerSecond: 1800,
      radius: 120
    },
    colors: {
      skyTop: '#030712',
      skyBottom: '#3b0764',
      mountain: '#1e1b4b',
      ground: '#090514',
      grass: '#064e3b',
      base: '#0f172a'
    }
  }
];
