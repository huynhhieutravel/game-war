export const UNITS = {
  // === AGE 1: STONE AGE (THỜI TIỀN SỬ) ===
  stone_clubman: {
    id: 'stone_clubman',
    name: 'Club Man',
    nameVi: 'Người Cầm Dùi Cui',
    ageId: 1,
    role: 'melee',
    cost: 20,
    trainTime: 1.8,
    xpReward: 35,
    killBounty: 20,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 100,
    shield: 0,
    physicalArmor: 6,
    magicResistance: 4,
    tenacity: 0.10,
    hpRegen: 0.8,
    moveSpeed: 80,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 15,
    magicAttack: 0,
    trueDamage: 0,
    element: 'fire',
    attackRange: 35,
    attackCooldown: 0.75,
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
    descriptionVi: 'Chiến binh cận chiến thô sơ với tốc độ ra đòn nhanh và dùi cui gỗ.'
  },

  stone_slingshot: {
    id: 'stone_slingshot',
    name: 'Slingshot Man',
    nameVi: 'Người Ném Đá',
    ageId: 1,
    role: 'ranged',
    cost: 28,
    trainTime: 2.4,
    xpReward: 50,
    killBounty: 30,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 60,
    shield: 0,
    physicalArmor: 2,
    magicResistance: 6,
    tenacity: 0.05,
    hpRegen: 0.5,
    moveSpeed: 74,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 15,
    magicAttack: 0,
    trueDamage: 0,
    element: 'wood',
    attackRange: 280,
    attackCooldown: 1.0,
    critRate: 0.18,
    critDamage: 1.65,
    armorPenetration: 0.10,
    magicPenetration: 0.0,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 10,
    manaPerAttack: 20,
    aoeRadius: 0,
    pierceCount: 1,
    projectileSpeed: 420,
    descriptionVi: 'Xạ thủ tầm xa ném sỏi đá liên hồi với độ chính xác và chí mạng cao.'
  },

  stone_dino_rider: {
    id: 'stone_dino_rider',
    name: 'Dino Rider',
    nameVi: 'Kỵ Sĩ Khủng Long',
    ageId: 1,
    role: 'heavy',
    cost: 95,
    trainTime: 4.8,
    xpReward: 160,
    killBounty: 110,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 440,
    shield: 0,
    physicalArmor: 20,
    magicResistance: 12,
    tenacity: 0.25,
    hpRegen: 3.0,
    moveSpeed: 62,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 44,
    magicAttack: 0,
    trueDamage: 5,
    element: 'fire',
    attackRange: 45,
    attackCooldown: 1.3,
    critRate: 0.12,
    critDamage: 1.6,
    armorPenetration: 0.15,
    magicPenetration: 0.0,
    lifeSteal: 0.06,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 25,
    manaPerAttack: 35,
    aoeRadius: 40,
    pierceCount: 2,
    descriptionVi: 'Cự thú bọc giáp gai càn quét tiền tuyến với cú húc giẫm đạp lan 40px.'
  },

  // === AGE 2: CASTLE AGE (THỜI TRUNG CỔ) ===
  castle_swordsman: {
    id: 'castle_swordsman',
    name: 'Swordsman',
    nameVi: 'Hiệp Sĩ Hoàng Gia',
    ageId: 2,
    role: 'melee',
    cost: 48,
    trainTime: 2.0,
    xpReward: 90,
    killBounty: 55,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 230,
    shield: 40,
    physicalArmor: 22,
    magicResistance: 12,
    tenacity: 0.15,
    hpRegen: 1.5,
    moveSpeed: 82,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 36,
    magicAttack: 0,
    trueDamage: 0,
    element: 'light',
    attackRange: 35,
    attackCooldown: 0.78,
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
    descriptionVi: 'Hiệp sĩ giáp thép mang khiên đỡ tên và kiếm báu hoàng gia chém nhanh dứt khoát.'
  },

  castle_archer: {
    id: 'castle_archer',
    name: 'Archer',
    nameVi: 'Cung Thủ Tầm Xa',
    ageId: 2,
    role: 'ranged',
    cost: 72,
    trainTime: 2.8,
    xpReward: 120,
    killBounty: 80,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 120,
    shield: 0,
    physicalArmor: 8,
    magicResistance: 14,
    tenacity: 0.05,
    hpRegen: 0.8,
    moveSpeed: 74,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 32,
    magicAttack: 0,
    trueDamage: 0,
    element: 'wood',
    attackRange: 320,
    attackCooldown: 1.0,
    critRate: 0.22,
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
    projectileSpeed: 480,
    descriptionVi: 'Xạ thủ cung tên thiện xạ với khả năng bắn xuyên giáp tầm xa chuẩn xác.'
  },

  castle_knight: {
    id: 'castle_knight',
    name: 'Mounted Knight',
    nameVi: 'Kỵ Binh Giáp Sắt',
    ageId: 2,
    role: 'heavy',
    cost: 210,
    trainTime: 5.2,
    xpReward: 320,
    killBounty: 240,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 850,
    shield: 60,
    physicalArmor: 36,
    magicResistance: 18,
    tenacity: 0.30,
    hpRegen: 4.0,
    moveSpeed: 66,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 82,
    magicAttack: 0,
    trueDamage: 10,
    element: 'light',
    attackRange: 45,
    attackCooldown: 1.35,
    critRate: 0.15,
    critDamage: 1.65,
    armorPenetration: 0.25,
    magicPenetration: 0.0,
    lifeSteal: 0.08,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 30,
    manaPerAttack: 30,
    aoeRadius: 45,
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
    cost: 130,
    trainTime: 2.2,
    xpReward: 240,
    killBounty: 160,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 360,
    shield: 0,
    physicalArmor: 20,
    magicResistance: 16,
    tenacity: 0.15,
    hpRegen: 2.0,
    moveSpeed: 78,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 64,
    magicAttack: 0,
    trueDamage: 0,
    element: 'fire',
    attackRange: 160,
    attackCooldown: 0.95,
    critRate: 0.20,
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
    projectileSpeed: 620,
    descriptionVi: 'Bộ binh súng hỏa mai bắn đạn chì uy lực ở cự ly tầm trung dồn dập.'
  },

  ren_bomb_thrower: {
    id: 'ren_bomb_thrower',
    name: 'Grenadier',
    nameVi: 'Lính Ném Bom',
    ageId: 3,
    role: 'ranged_aoe',
    cost: 220,
    trainTime: 3.2,
    xpReward: 360,
    killBounty: 260,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 240,
    shield: 0,
    physicalArmor: 14,
    magicResistance: 22,
    tenacity: 0.10,
    hpRegen: 1.5,
    moveSpeed: 72,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 85,
    magicAttack: 35,
    trueDamage: 15,
    element: 'fire',
    attackRange: 290,
    attackCooldown: 1.3,
    critRate: 0.25,
    critDamage: 1.8,
    armorPenetration: 0.30,
    magicPenetration: 0.15,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 20,
    manaPerAttack: 35,
    aoeRadius: 70,
    pierceCount: 3,
    projectileSpeed: 400,
    descriptionVi: 'Chuyên gia thuốc nổ ném lựu đạn nổ lan 70px sát thương hủy diệt diện rộng.'
  },

  ren_steam_tank: {
    id: 'ren_steam_tank',
    name: 'Steam Tank',
    nameVi: 'Xe Thiết Giáp Hơi Nước',
    ageId: 3,
    role: 'heavy',
    cost: 480,
    trainTime: 5.8,
    xpReward: 750,
    killBounty: 580,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 1750,
    shield: 120,
    physicalArmor: 46,
    magicResistance: 28,
    tenacity: 0.40,
    hpRegen: 6.0,
    moveSpeed: 55,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 160,
    magicAttack: 30,
    trueDamage: 30,
    element: 'fire',
    attackRange: 190,
    attackCooldown: 1.6,
    critRate: 0.15,
    critDamage: 1.7,
    armorPenetration: 0.35,
    magicPenetration: 0.10,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 25,
    manaPerAttack: 30,
    aoeRadius: 60,
    pierceCount: 3,
    projectileSpeed: 550,
    descriptionVi: 'Pháo đài cơ khí chạy bằng hơi nước chịu hỏa lực và nghiền nát quân địch.'
  },

  // === AGE 4: MODERN AGE (THỜI HIỆN ĐẠI) ===
  mod_infantry: {
    id: 'mod_infantry',
    name: 'Commando',
    nameVi: 'Lính Đặc Nhiệm',
    ageId: 4,
    role: 'melee',
    cost: 320,
    trainTime: 2.2,
    xpReward: 600,
    killBounty: 420,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 750,
    shield: 80,
    physicalArmor: 32,
    magicResistance: 25,
    tenacity: 0.20,
    hpRegen: 3.5,
    moveSpeed: 84,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 115,
    magicAttack: 0,
    trueDamage: 15,
    element: 'light',
    attackRange: 210,
    attackCooldown: 0.60,
    critRate: 0.25,
    critDamage: 1.8,
    armorPenetration: 0.30,
    magicPenetration: 0.0,
    lifeSteal: 0.06,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 20,
    manaPerAttack: 20,
    aoeRadius: 0,
    pierceCount: 1,
    projectileSpeed: 800,
    descriptionVi: 'Lính biệt kích bắn súng trường tấn công với tốc độ xả đạn cực nhanh và độ chuẩn xác cao.'
  },

  mod_rocket_launcher: {
    id: 'mod_rocket_launcher',
    name: 'Rocket Specialist',
    nameVi: 'Lính Tên Lửa Bazooka',
    ageId: 4,
    role: 'ranged_aoe',
    cost: 480,
    trainTime: 3.6,
    xpReward: 950,
    killBounty: 680,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 550,
    shield: 50,
    physicalArmor: 24,
    magicResistance: 32,
    tenacity: 0.15,
    hpRegen: 3.0,
    moveSpeed: 70,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 190,
    magicAttack: 50,
    trueDamage: 40,
    element: 'fire',
    attackRange: 360,
    attackCooldown: 1.6,
    critRate: 0.28,
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
    projectileSpeed: 520,
    descriptionVi: 'Xạ thủ vũ khí hạng nặng phóng tên lửa nhiệt phá hủy xe tăng và đám đông với sức nổ uy lực.'
  },

  mod_abrams_tank: {
    id: 'mod_abrams_tank',
    name: 'Abrams Tank',
    nameVi: 'Xe Tăng Chủ Lực Abrams',
    ageId: 4,
    role: 'heavy',
    cost: 1100,
    trainTime: 6.2,
    xpReward: 2100,
    killBounty: 1500,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 3600,
    shield: 350,
    physicalArmor: 58,
    magicResistance: 40,
    tenacity: 0.50,
    hpRegen: 9.0,
    moveSpeed: 58,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 320,
    magicAttack: 40,
    trueDamage: 80,
    element: 'fire',
    attackRange: 250,
    attackCooldown: 1.8,
    critRate: 0.22,
    critDamage: 1.9,
    armorPenetration: 0.45,
    magicPenetration: 0.15,
    lifeSteal: 0.0,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 30,
    manaPerAttack: 35,
    aoeRadius: 80,
    pierceCount: 3,
    projectileSpeed: 680,
    descriptionVi: 'Cỗ máy chiến tranh bọc thép phản ứng nổ với pháo 120mm san phẳng công sự và bộ binh địch.'
  },

  // === AGE 5: FUTURE AGE (THỜI VIỄN TƯỞNG) ===
  fut_plasma_trooper: {
    id: 'fut_plasma_trooper',
    name: 'Plasma Trooper',
    nameVi: 'Chiến Binh Năng Lượng Plasma',
    ageId: 5,
    role: 'melee',
    cost: 750,
    trainTime: 2.4,
    xpReward: 1600,
    killBounty: 1100,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 1550,
    shield: 250,
    physicalArmor: 44,
    magicResistance: 44,
    tenacity: 0.25,
    hpRegen: 6.0,
    moveSpeed: 86,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 90,
    magicAttack: 160,
    trueDamage: 40,
    element: 'light',
    attackRange: 230,
    attackCooldown: 0.55,
    critRate: 0.32,
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
    projectileSpeed: 950,
    descriptionVi: 'Chiến binh bọc giáp Nano phóng tia plasma phân rã mọi vật chất với tốc độ cực nhanh.'
  },

  fut_mech_walker: {
    id: 'fut_mech_walker',
    name: 'Mech Walker',
    nameVi: 'Người Máy Chiến Đấu Mech',
    ageId: 5,
    role: 'ranged_aoe',
    cost: 1250,
    trainTime: 3.8,
    xpReward: 2500,
    killBounty: 1800,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 2300,
    shield: 450,
    physicalArmor: 50,
    magicResistance: 50,
    tenacity: 0.35,
    hpRegen: 8.0,
    moveSpeed: 72,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 160,
    magicAttack: 280,
    trueDamage: 90,
    element: 'light',
    attackRange: 380,
    attackCooldown: 1.35,
    critRate: 0.35,
    critDamage: 2.2,
    armorPenetration: 0.40,
    magicPenetration: 0.45,
    lifeSteal: 0.08,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 35,
    manaPerAttack: 35,
    aoeRadius: 95,
    pierceCount: 4,
    projectileSpeed: 750,
    descriptionVi: 'Người máy 2 chân hai nòng laser xung kích với hỏa lực hủy diệt diện rộng liên hồi.'
  },

  fut_god_titan: {
    id: 'fut_god_titan',
    name: 'Titan Leviathan',
    nameVi: 'Thần Máy Titan Leviathan',
    ageId: 5,
    role: 'heavy',
    cost: 2600,
    trainTime: 7.0,
    xpReward: 5500,
    killBounty: 3800,

    // Tầng 1: Sinh mệnh & Phòng thủ
    hp: 8200,
    shield: 1000,
    physicalArmor: 68,
    magicResistance: 68,
    tenacity: 0.60,
    hpRegen: 18.0,
    moveSpeed: 60,

    // Tầng 2: Sức mạnh & Nguyên tố
    physicalAttack: 420,
    magicAttack: 520,
    trueDamage: 180,
    element: 'light',
    attackRange: 290,
    attackCooldown: 1.65,
    critRate: 0.32,
    critDamage: 2.2,
    armorPenetration: 0.50,
    magicPenetration: 0.50,
    lifeSteal: 0.15,

    // Tầng 3: Năng lượng & Kỹ năng
    maxMana: 100,
    startingMana: 40,
    manaPerAttack: 40,
    aoeRadius: 120,
    pierceCount: 5,
    projectileSpeed: 850,
    descriptionVi: 'Cỗ máy tối thượng trang bị trường lực lượng tử và pháo hủy diệt không gian san bằng mọi đạo quân.'
  }
};
