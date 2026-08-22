export const HEROES = {
  hero_human: {
    id: 'hero_human',
    faction: 'human',
    name: 'Warlord Alexander',
    nameVi: 'Đại Tướng Quân Alexander',
    title: 'Hộ Vệ Hoàng Gia',
    avatar: '👑',
    element: 'light',
    cost: 150,
    respawnTime: 35,

    // Base Level 1 Stats (3-Tier RPG)
    hp: 850,
    shield: 200,
    physicalArmor: 35,
    magicResistance: 30,
    tenacity: 0.35,
    hpRegen: 8.0,
    moveSpeed: 60,

    physicalAttack: 70,
    magicAttack: 30,
    trueDamage: 15,
    attackRange: 60,
    attackCooldown: 1.1,
    critRate: 0.20,
    critDamage: 1.8,
    armorPenetration: 0.25,
    magicPenetration: 0.15,
    lifeSteal: 0.10,

    maxMana: 100,
    startingMana: 50,
    manaPerAttack: 25,
    aoeRadius: 40,

    specialSkillId: 'SKILL_HERO_HOLY_AEGIS_701',
    color: '#38bdf8',
    glowColor: '#fbbf24',
    descriptionVi: 'Vị tướng dũng mãnh bảo vệ hàng ngũ đồng minh bằng khiên thánh và kiếm ánh sáng.'
  },

  hero_beast: {
    id: 'hero_beast',
    faction: 'beast',
    name: 'Fenrir Prime',
    nameVi: 'Thần Thú Fenrir Cổ Đại',
    title: 'Chúa Tể Bầy Đàn',
    avatar: '🐺',
    element: 'wood',
    cost: 160,
    respawnTime: 35,

    // Base Level 1 Stats
    hp: 1100,
    shield: 100,
    physicalArmor: 30,
    magicResistance: 25,
    tenacity: 0.45,
    hpRegen: 14.0,
    moveSpeed: 75,

    physicalAttack: 85,
    magicAttack: 10,
    trueDamage: 25,
    attackRange: 55,
    attackCooldown: 0.95,
    critRate: 0.25,
    critDamage: 1.9,
    armorPenetration: 0.30,
    magicPenetration: 0.10,
    lifeSteal: 0.18,

    maxMana: 100,
    startingMana: 40,
    manaPerAttack: 30,
    aoeRadius: 45,

    specialSkillId: 'SKILL_HERO_FRENZY_ROAR_702',
    color: '#22c55e',
    glowColor: '#10b981',
    descriptionVi: 'Quái thú tiền sử càn quét chiến tuyến với tốc độ cuồng nộ và sức mạnh xé xác.'
  },

  hero_undead: {
    id: 'hero_undead',
    faction: 'undead',
    name: 'Dread Lich Malakor',
    nameVi: 'Lãnh Chúa Malakor',
    title: 'Tử Thần Hư Không',
    avatar: '💀',
    element: 'dark',
    cost: 170,
    respawnTime: 40,

    // Base Level 1 Stats
    hp: 750,
    shield: 350,
    physicalArmor: 25,
    magicResistance: 45,
    tenacity: 0.40,
    hpRegen: 6.0,
    moveSpeed: 55,

    physicalAttack: 30,
    magicAttack: 95,
    trueDamage: 40,
    attackRange: 160,
    attackCooldown: 1.3,
    critRate: 0.15,
    critDamage: 1.7,
    armorPenetration: 0.15,
    magicPenetration: 0.40,
    lifeSteal: 0.25,

    maxMana: 100,
    startingMana: 60,
    manaPerAttack: 25,
    aoeRadius: 65,

    specialSkillId: 'SKILL_HERO_SOUL_HARVEST_703',
    color: '#a855f7',
    glowColor: '#c084fc',
    projectileType: 'fireball',
    projectileSpeed: 450,
    descriptionVi: 'Bậc thầy hắc thuật triệu hồi sát thương chuẩn và hút sinh lực kẻ địch từ xa.'
  }
};

export const HERO_LEVEL_EXP_TABLE = [0, 300, 800, 1800, 3500]; // Exp needed for Lv 1, 2, 3, 4, 5

export function getHeroByFaction(faction = 'human') {
  if (faction === 'beast') return HEROES.hero_beast;
  if (faction === 'undead') return HEROES.hero_undead;
  return HEROES.hero_human;
}
