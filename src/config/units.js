export const UNITS = {
  // === AGE 1: STONE AGE (THỜI TIỀN SỬ) ===
  stone_clubman: {
    id: 'stone_clubman',
    name: 'Club Man',
    nameVi: 'Người Cầm Dùi Cui',
    ageId: 1,
    role: 'melee',
    cost: 15,
    trainTime: 2.0,
    xpReward: 35,
    killBounty: 20,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 110,
    shield: 0,
    physicalArmor: 8,
    magicResistance: 4,
    tenacity: 0.10,
    hpRegen: 1.0,
    moveSpeed: 70,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 18,
    magicAttack: 0,
    trueDamage: 0,
    element: 'fire',
    attackRange: 32,
    attackCooldown: 0.9,
    critRate: 0.10,
    critDamage: 1.5,
    armorPenetration: 0.05,
    magicPenetration: 0.0,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 0,
    manaPerAttack: 25,
    aoeRadius: 0,
    pierceCount: 1,
    descriptionVi: 'Chiến binh cận chiến thô sơ với sức sống bền bỉ và dùi cui gỗ.'
  },

  stone_slingshot: {
    id: 'stone_slingshot',
    name: 'Slingshot Man',
    nameVi: 'Người Ném Đá',
    ageId: 1,
    role: 'ranged',
    cost: 25,
    trainTime: 2.8,
    xpReward: 50,
    killBounty: 30,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 65,
    shield: 0,
    physicalArmor: 3,
    magicResistance: 6,
    tenacity: 0.05,
    hpRegen: 0.5,
    moveSpeed: 65,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 14,
    magicAttack: 0,
    trueDamage: 0,
    element: 'wood',
    attackRange: 260,
    attackCooldown: 1.2,
    critRate: 0.15,
    critDamage: 1.6,
    armorPenetration: 0.10,
    magicPenetration: 0.0,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 10,
    manaPerAttack: 20,
    aoeRadius: 0,
    pierceCount: 1,
    projectileSpeed: 380,
    descriptionVi: 'Xạ thủ tầm xa ném sỏi đá liên hồi với độ chính xác cao.'
  },

  stone_dino_rider: {
    id: 'stone_dino_rider',
    name: 'Dino Rider',
    nameVi: 'Kỵ Sĩ Khủng Long',
    ageId: 1,
    role: 'heavy',
    cost: 100,
    trainTime: 5.5,
    xpReward: 160,
    killBounty: 110,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 420,
    shield: 0,
    physicalArmor: 22,
    magicResistance: 12,
    tenacity: 0.25,
    hpRegen: 3.5,
    moveSpeed: 55,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 42,
    magicAttack: 0,
    trueDamage: 5,
    element: 'fire',
    attackRange: 40,
    attackCooldown: 1.5,
    critRate: 0.12,
    critDamage: 1.6,
    armorPenetration: 0.15,
    magicPenetration: 0.0,
    lifeSteal: 0.08,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 25,
    manaPerAttack: 35,
    aoeRadius: 35,
    pierceCount: 2,
    descriptionVi: 'Cự thú bọc giáp gai càn quét tiền tuyến với cú húc giẫm đạp uy lực.'
  },

  // === AGE 2: CASTLE AGE (THỜI TRUNG CỔ) ===
  castle_swordsman: {
    id: 'castle_swordsman',
    name: 'Swordsman',
    nameVi: 'Hiệp Sĩ Hoàng Gia',
    ageId: 2,
    role: 'melee',
    cost: 50,
    trainTime: 2.2,
    xpReward: 90,
    killBounty: 55,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 220,
    shield: 30,
    physicalArmor: 24,
    magicResistance: 10,
    tenacity: 0.15,
    hpRegen: 1.5,
    moveSpeed: 72,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 34,
    magicAttack: 0,
    trueDamage: 0,
    element: 'light',
    attackRange: 34,
    attackCooldown: 0.9,
    critRate: 0.15,
    critDamage: 1.6,
    armorPenetration: 0.15,
    magicPenetration: 0.0,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 15,
    manaPerAttack: 25,
    aoeRadius: 0,
    pierceCount: 1,
    descriptionVi: 'Hiệp sĩ giáp thép mang khiên đỡ tên và kiếm báu hoàng gia sắc bén.'
  },

  castle_archer: {
    id: 'castle_archer',
    name: 'Archer',
    nameVi: 'Cung Thủ Tầm Xa',
    ageId: 2,
    role: 'ranged',
    cost: 75,
    trainTime: 3.0,
    xpReward: 120,
    killBounty: 80,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 130,
    shield: 0,
    physicalArmor: 8,
    magicResistance: 14,
    tenacity: 0.05,
    hpRegen: 0.8,
    moveSpeed: 68,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 28,
    magicAttack: 0,
    trueDamage: 0,
    element: 'wood',
    attackRange: 320,
    attackCooldown: 1.1,
    critRate: 0.20,
    critDamage: 1.75,
    armorPenetration: 0.20,
    magicPenetration: 0.0,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 10,
    manaPerAttack: 25,
    aoeRadius: 0,
    pierceCount: 1,
    projectileSpeed: 450,
    descriptionVi: 'Xạ thủ cung tên thiện xạ với khả năng bắn xuyên giáp từ khoảng cách xa.'
  },

  castle_knight: {
    id: 'castle_knight',
    name: 'Mounted Knight',
    nameVi: 'Kỵ Binh Giáp Sắt',
    ageId: 2,
    role: 'heavy',
    cost: 220,
    trainTime: 5.8,
    xpReward: 320,
    killBounty: 240,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 750,
    shield: 50,
    physicalArmor: 38,
    magicResistance: 18,
    tenacity: 0.30,
    hpRegen: 4.0,
    moveSpeed: 65,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 72,
    magicAttack: 0,
    trueDamage: 10,
    element: 'light',
    attackRange: 42,
    attackCooldown: 1.4,
    critRate: 0.15,
    critDamage: 1.65,
    armorPenetration: 0.25,
    magicPenetration: 0.0,
    lifeSteal: 0.10,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 30,
    manaPerAttack: 30,
    aoeRadius: 40,
    pierceCount: 2,
    descriptionVi: 'Kỵ binh thiết giáp cưỡi tuấn mã xông thẳng càn quét phá vỡ phòng tuyến.'
  },

  // === AGE 3: RENAISSANCE (THỜI PHỤC HƯNG) ===
  ren_musketeer: {
    id: 'ren_musketeer',
    name: 'Musketeer',
    nameVi: 'Lính Hỏa Mai',
    ageId: 3,
    role: 'melee',
    cost: 150,
    trainTime: 2.5,
    xpReward: 240,
    killBounty: 160,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 360,
    shield: 0,
    physicalArmor: 20,
    magicResistance: 16,
    tenacity: 0.15,
    hpRegen: 2.0,
    moveSpeed: 70,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 58,
    magicAttack: 0,
    trueDamage: 0,
    element: 'fire',
    attackRange: 160,
    attackCooldown: 1.3,
    critRate: 0.18,
    critDamage: 1.7,
    armorPenetration: 0.25,
    magicPenetration: 0.0,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 15,
    manaPerAttack: 25,
    aoeRadius: 0,
    pierceCount: 1,
    projectileSpeed: 600,
    descriptionVi: 'Bộ binh súng hỏa mai bắn đạn chì uy lực ở cự ly tầm trung.'
  },

  ren_bomb_thrower: {
    id: 'ren_bomb_thrower',
    name: 'Grenadier',
    nameVi: 'Lính Ném Bom',
    ageId: 3,
    role: 'ranged_aoe',
    cost: 250,
    trainTime: 3.8,
    xpReward: 360,
    killBounty: 260,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 260,
    shield: 0,
    physicalArmor: 14,
    magicResistance: 22,
    tenacity: 0.10,
    hpRegen: 1.5,
    moveSpeed: 66,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 70,
    magicAttack: 30,
    trueDamage: 10,
    element: 'fire',
    attackRange: 280,
    attackCooldown: 1.8,
    critRate: 0.22,
    critDamage: 1.8,
    armorPenetration: 0.30,
    magicPenetration: 0.15,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 20,
    manaPerAttack: 35,
    aoeRadius: 65,
    pierceCount: 3,
    projectileSpeed: 360,
    descriptionVi: 'Chuyên gia thuốc nổ ném lựu đạn nổ lan sát thương khủng khiếp.'
  },

  ren_steam_tank: {
    id: 'ren_steam_tank',
    name: 'Steam Tank',
    nameVi: 'Xe Thiết Giáp Hơi Nước',
    ageId: 3,
    role: 'heavy',
    cost: 550,
    trainTime: 6.5,
    xpReward: 750,
    killBounty: 580,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 1550,
    shield: 100,
    physicalArmor: 45,
    magicResistance: 26,
    tenacity: 0.40,
    hpRegen: 6.0,
    moveSpeed: 48,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 130,
    magicAttack: 20,
    trueDamage: 25,
    element: 'fire',
    attackRange: 180,
    attackCooldown: 2.0,
    critRate: 0.15,
    critDamage: 1.7,
    armorPenetration: 0.35,
    magicPenetration: 0.10,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 25,
    manaPerAttack: 30,
    aoeRadius: 55,
    pierceCount: 3,
    projectileSpeed: 520,
    descriptionVi: 'Pháo đài cơ khí chạy bằng hơi nước chịu hỏa lực và nghiền nát quân địch.'
  },

  // === AGE 4: MODERN AGE (THỜI HIỆN ĐẠI) ===
  mod_infantry: {
    id: 'mod_infantry',
    name: 'Commando',
    nameVi: 'Lính Đặc Nhiệm',
    ageId: 4,
    role: 'melee',
    cost: 400,
    trainTime: 2.6,
    xpReward: 600,
    killBounty: 420,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 680,
    shield: 50,
    physicalArmor: 32,
    magicResistance: 25,
    tenacity: 0.20,
    hpRegen: 3.0,
    moveSpeed: 78,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 95,
    magicAttack: 0,
    trueDamage: 10,
    element: 'light',
    attackRange: 200,
    attackCooldown: 0.7,
    critRate: 0.25,
    critDamage: 1.8,
    armorPenetration: 0.30,
    magicPenetration: 0.0,
    lifeSteal: 0.05,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 20,
    manaPerAttack: 20,
    aoeRadius: 0,
    pierceCount: 1,
    projectileSpeed: 750,
    descriptionVi: 'Lính biệt kích bắn súng trường tấn công với tốc độ xả đạn cực nhanh.'
  },

  mod_rocket_launcher: {
    id: 'mod_rocket_launcher',
    name: 'Rocket Specialist',
    nameVi: 'Lính Tên Lửa Bazooka',
    ageId: 4,
    role: 'ranged_aoe',
    cost: 650,
    trainTime: 4.2,
    xpReward: 950,
    killBounty: 680,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 520,
    shield: 0,
    physicalArmor: 22,
    magicResistance: 30,
    tenacity: 0.15,
    hpRegen: 2.5,
    moveSpeed: 64,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 160,
    magicAttack: 40,
    trueDamage: 30,
    element: 'fire',
    attackRange: 360,
    attackCooldown: 2.2,
    critRate: 0.25,
    critDamage: 2.0,
    armorPenetration: 0.40,
    magicPenetration: 0.20,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 25,
    manaPerAttack: 35,
    aoeRadius: 85,
    pierceCount: 4,
    projectileSpeed: 480,
    descriptionVi: 'Xạ thủ vũ khí hạng nặng phóng tên lửa nhiệt phá hủy xe tăng và đám đông.'
  },

  mod_abrams_tank: {
    id: 'mod_abrams_tank',
    name: 'Abrams Tank',
    nameVi: 'Xe Tăng Chủ Lực Abrams',
    ageId: 4,
    role: 'heavy',
    cost: 1400,
    trainTime: 7.0,
    xpReward: 2100,
    killBounty: 1500,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 3100,
    shield: 250,
    physicalArmor: 55,
    magicResistance: 38,
    tenacity: 0.50,
    hpRegen: 8.0,
    moveSpeed: 52,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 260,
    magicAttack: 30,
    trueDamage: 60,
    element: 'fire',
    attackRange: 240,
    attackCooldown: 2.4,
    critRate: 0.20,
    critDamage: 1.85,
    armorPenetration: 0.45,
    magicPenetration: 0.15,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 30,
    manaPerAttack: 35,
    aoeRadius: 75,
    pierceCount: 3,
    projectileSpeed: 620,
    descriptionVi: 'Cỗ máy chiến tranh bọc thép phản ứng nổ với pháo 120mm san phẳng tất cả.'
  },

  // === AGE 5: FUTURE AGE (THỜI VIỄN TƯỞNG) ===
  fut_plasma_trooper: {
    id: 'fut_plasma_trooper',
    name: 'Plasma Trooper',
    nameVi: 'Chiến Binh Năng Lượng Plasma',
    ageId: 5,
    role: 'melee',
    cost: 950,
    trainTime: 2.8,
    xpReward: 1600,
    killBounty: 1100,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 1350,
    shield: 200,
    physicalArmor: 42,
    magicResistance: 42,
    tenacity: 0.25,
    hpRegen: 5.0,
    moveSpeed: 82,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 70,
    magicAttack: 130,
    trueDamage: 30,
    element: 'light',
    attackRange: 220,
    attackCooldown: 0.65,
    critRate: 0.30,
    critDamage: 2.0,
    armorPenetration: 0.35,
    magicPenetration: 0.40,
    lifeSteal: 0.10,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 25,
    manaPerAttack: 25,
    aoeRadius: 0,
    pierceCount: 1,
    projectileSpeed: 900,
    descriptionVi: 'Chiến binh bọc giáp Nano phóng tia plasma phân rã mọi vật chất.'
  },

  fut_mech_walker: {
    id: 'fut_mech_walker',
    name: 'Mech Walker',
    nameVi: 'Người Máy Chiến Đấu Mech',
    ageId: 5,
    role: 'ranged_aoe',
    cost: 1600,
    trainTime: 4.5,
    xpReward: 2500,
    killBounty: 1800,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 1950,
    shield: 350,
    physicalArmor: 48,
    magicResistance: 48,
    tenacity: 0.35,
    hpRegen: 7.0,
    moveSpeed: 68,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 120,
    magicAttack: 220,
    trueDamage: 60,
    element: 'light',
    attackRange: 380,
    attackCooldown: 1.8,
    critRate: 0.35,
    critDamage: 2.2,
    armorPenetration: 0.40,
    magicPenetration: 0.45,
    lifeSteal: 0.08,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 35,
    manaPerAttack: 35,
    aoeRadius: 90,
    pierceCount: 4,
    projectileSpeed: 700,
    descriptionVi: 'Người máy 2 chân hai nòng laser xung kích với hỏa lực hủy diệt diện rộng.'
  },

  fut_god_titan: {
    id: 'fut_god_titan',
    name: 'Titan Leviathan',
    nameVi: 'Thần Máy Titan Leviathan',
    ageId: 5,
    role: 'heavy',
    cost: 3500,
    trainTime: 8.0,
    xpReward: 5500,
    killBounty: 3800,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 6800,
    shield: 800,
    physicalArmor: 65,
    magicResistance: 65,
    tenacity: 0.60,
    hpRegen: 15.0,
    moveSpeed: 56,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 300,
    magicAttack: 380,
    trueDamage: 120,
    element: 'light',
    attackRange: 280,
    attackCooldown: 2.2,
    critRate: 0.30,
    critDamage: 2.2,
    armorPenetration: 0.50,
    magicPenetration: 0.50,
    lifeSteal: 0.15,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 40,
    manaPerAttack: 40,
    aoeRadius: 110,
    pierceCount: 5,
    projectileSpeed: 800,
    descriptionVi: 'Cỗ máy tối thượng trang bị trường lực lượng tử và pháo hủy diệt không gian.'
  }
};
