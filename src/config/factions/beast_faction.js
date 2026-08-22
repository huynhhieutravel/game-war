export const BEAST_FACTION = {
  id: 'FACTION_BEAST_02',
  code: 'beast',
  name: 'Primal Beast Swarm',
  nameVi: 'Bầy Thú Vương & Khủng Long Cổ Đại',
  elementMain: 'wood',
  elementSub: 'fire',
  descriptionVi: 'Quân đoàn quái thú hoang dã với lượng máu khổng lồ, khả năng càn quét và tự hồi phục máu tự nhiên.',
  baseColor: '#22c55e',

  ages: [
    {
      ageId: 1,
      nameVi: 'Kỷ Bầy Đàn',
      baseHp: 750,
      evolveXp: 4000,
      skillId: 'SKILL_BEAST_PRIMAL_FRENZY_201',
      unitIds: ['beast_raptor', 'beast_dilophosaur', 'beast_triceratops'],
      turretIds: ['turret_beast_thorn', 'turret_beast_acid']
    },
    {
      ageId: 2,
      nameVi: 'Kỷ Băng Hà',
      baseHp: 1500,
      evolveXp: 14000,
      skillId: 'SKILL_BEAST_PRIMAL_FRENZY_201',
      unitIds: ['beast_saber', 'beast_frost_owl', 'beast_mammoth'],
      turretIds: ['turret_beast_frost_spire', 'turret_beast_tusk_catapult']
    },
    {
      ageId: 3,
      nameVi: 'Kỷ Núi Lửa',
      baseHp: 3000,
      evolveXp: 45000,
      skillId: 'SKILL_BEAST_PRIMAL_FRENZY_201',
      unitIds: ['beast_fire_lizard', 'beast_magma_spitter', 'beast_ankylosaur'],
      turretIds: ['turret_beast_magma_vent', 'turret_beast_lava_mortar']
    },
    {
      ageId: 4,
      nameVi: 'Kỷ Cơ Giới Đột Biến',
      baseHp: 6000,
      evolveXp: 150000,
      skillId: 'SKILL_BEAST_PRIMAL_FRENZY_201',
      unitIds: ['beast_cyber_cheetah', 'beast_cyber_scorpion', 'beast_mecha_rex'],
      turretIds: ['turret_beast_plasma_turret', 'turret_beast_missile_pod']
    },
    {
      ageId: 5,
      nameVi: 'Kỷ Thần Thú Cổ Đại',
      baseHp: 12000,
      evolveXp: 999999,
      skillId: 'SKILL_BEAST_PRIMAL_FRENZY_201',
      unitIds: ['beast_chimera', 'beast_colossus', 'beast_godzilla_leviathan'],
      turretIds: ['turret_beast_dragon_altar', 'turret_beast_void_eye']
    }
  ]
};
