export const ARMORY_UPGRADES = {
  damage: {
    id: 'damage',
    nameVi: 'Rèn Vũ Khí Tối Tân',
    icon: '⚔️',
    description: 'Tăng +15% sát thương tấn công cho tất cả quân lính.',
    maxLevel: 5,
    costs: [150, 450, 1200, 3500, 9000],
    bonusPerLevel: 0.15 // +15% per level
  },
  armor: {
    id: 'armor',
    nameVi: 'Tôi Luyện Giáp Trụ',
    icon: '🛡️',
    description: 'Tăng +20% lượng máu tối đa và giảm sát thương nhận vào cho toàn quân.',
    maxLevel: 5,
    costs: [180, 500, 1400, 4000, 10000],
    bonusPerLevel: 0.20 // +20% per level
  },
  economy: {
    id: 'economy',
    nameVi: 'Mỏ Vàng & Khai Khoáng',
    icon: '⛏️',
    description: 'Tăng thêm +1.5 Vàng tự động mỗi giây.',
    maxLevel: 5,
    costs: [120, 350, 900, 2600, 7000],
    bonusPerLevel: 1.5 // +1.5 Gold/s per level
  },
  training: {
    id: 'training',
    nameVi: 'Kỷ Luật Quân Đội',
    icon: '⚡',
    description: 'Rút ngắn 12% thời gian huấn luyện ra quân.',
    maxLevel: 4,
    costs: [200, 600, 1800, 5000],
    bonusPerLevel: 0.12 // -12% train time per level
  }
};
