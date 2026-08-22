export const TURRETS = {
  // === STONE AGE ===
  stone_slingshot_turret: {
    id: 'stone_slingshot_turret',
    ageId: 1,
    name: 'Primitive Slingshot',
    nameVi: 'Súng Cao Su Đá',
    cost: 100,
    sellValue: 50,
    damage: 26,
    range: 360,
    fireCooldown: 1.4,
    projectileType: 'rock',
    projectileSpeed: 340,
    description: 'Tháp bắn đá thô sơ phòng thủ đầu trận.'
  },
  stone_catapult: {
    id: 'stone_catapult',
    ageId: 1,
    name: 'Rock Catapult',
    nameVi: 'Máy Bắn Đá Cổ',
    cost: 220,
    sellValue: 110,
    damage: 65,
    aoeRadius: 50,
    range: 460,
    fireCooldown: 2.5,
    projectileType: 'giant_rock',
    projectileSpeed: 280,
    description: 'Ném tảng đá lớn gây sát thương nổ lan.'
  },

  // === CASTLE AGE ===
  castle_ballista: {
    id: 'castle_ballista',
    ageId: 2,
    name: 'Heavy Ballista',
    nameVi: 'Nỏ Thần Công',
    cost: 450,
    sellValue: 225,
    damage: 95,
    range: 460,
    fireCooldown: 1.5,
    projectileType: 'heavy_bolt',
    projectileSpeed: 450,
    description: 'Phóng mũi tên khổng lồ xuyên thủng giáp.'
  },
  castle_trebuchet: {
    id: 'castle_trebuchet',
    ageId: 2,
    name: 'Fire Trebuchet',
    nameVi: 'Máy Ném Cầu Lửa',
    cost: 850,
    sellValue: 425,
    damage: 210,
    aoeRadius: 65,
    range: 560,
    fireCooldown: 2.7,
    projectileType: 'fireball',
    projectileSpeed: 300,
    description: 'Ném khối cầu lửa bùng cháy diện rộng.'
  },

  // === RENAISSANCE AGE ===
  renaissance_single_cannon: {
    id: 'renaissance_single_cannon',
    ageId: 3,
    name: 'Fortress Cannon',
    nameVi: 'Đại Bác Thành Trì',
    cost: 1400,
    sellValue: 700,
    damage: 260,
    range: 500,
    fireCooldown: 1.6,
    projectileType: 'cannonball',
    projectileSpeed: 520,
    description: 'Pháo phòng thủ tiêu chuẩn sức công phá lớn.'
  },
  renaissance_double_cannon: {
    id: 'renaissance_double_cannon',
    ageId: 3,
    name: 'Dual Siege Cannon',
    nameVi: 'Đại Bác Nòng Đôi',
    cost: 2600,
    sellValue: 1300,
    damage: 540,
    aoeRadius: 75,
    range: 580,
    fireCooldown: 2.3,
    projectileType: 'heavy_cannonball',
    projectileSpeed: 500,
    description: 'Nòng đôi bắn loạt đạn pháo hạng nặng càn quét quân địch.'
  },

  // === MODERN AGE ===
  modern_mg_turret: {
    id: 'modern_mg_turret',
    ageId: 4,
    name: 'Dual Heavy MG',
    nameVi: 'Súng Máy Phòng Thủ Hạng Nặng',
    cost: 3800,
    sellValue: 1900,
    damage: 220,
    burstCount: 3,
    range: 540,
    fireCooldown: 1.1,
    projectileType: 'turret_bullet',
    projectileSpeed: 750,
    description: 'Khẩu đại liên 2 nòng xả đạn không ngừng.'
  },
  modern_missile_turret: {
    id: 'modern_missile_turret',
    ageId: 4,
    name: 'SAM Missile Battery',
    nameVi: 'Trận Địa Tên Lửa Phòng Thủ',
    cost: 7200,
    sellValue: 3600,
    damage: 1050,
    aoeRadius: 90,
    range: 680,
    fireCooldown: 2.5,
    projectileType: 'turret_missile',
    projectileSpeed: 480,
    description: 'Phóng tên lửa dẫn đường tiêu diệt mục tiêu mặt đất.'
  },

  // === FUTURE AGE ===
  future_plasma_turret: {
    id: 'future_plasma_turret',
    ageId: 5,
    name: 'Plasma Blaster',
    nameVi: 'Tháp Pháo Plasma',
    cost: 11000,
    sellValue: 5500,
    damage: 1350,
    range: 620,
    fireCooldown: 0.9,
    projectileType: 'plasma_orb',
    projectileSpeed: 700,
    description: 'Phóng tia cầu năng lượng plasma tốc độ cực nhanh.'
  },
  future_ion_turret: {
    id: 'future_ion_turret',
    ageId: 5,
    name: 'Ion Beam Cannon',
    nameVi: 'Đại Pháo Chùm Ion',
    cost: 24000,
    sellValue: 12000,
    damage: 3600,
    aoeRadius: 110,
    range: 780,
    fireCooldown: 2.1,
    projectileType: 'ion_blast',
    projectileSpeed: 650,
    description: 'Bắn xung lực Ion diện rộng phá hủy mọi loại phòng ngự.'
  }
};
