export const UNDEAD_FACTION = {
  id: 'FACTION_UNDEAD_03',
  code: 'undead',
  name: 'Undead & Nether Legion',
  nameVi: 'Quân Đoàn Ma Giới & Hắc Ám',
  elementMain: 'dark',
  elementSub: 'water',
  descriptionVi: 'Quân đoàn hắc ám với khả năng hút máu (LifeSteal), sát thương chuẩn (True Damage) và nguyền rủa đối thủ.',
  baseColor: '#a855f7',

  ages: [
    {
      ageId: 1,
      nameVi: 'Kỷ Tha Hóa',
      baseHp: 550,
      evolveXp: 4000,
      skillId: 'SKILL_UNDEAD_HELL_GATE_301',
      unitIds: ['undead_skeleton_warrior', 'undead_skeleton_archer', 'undead_hellhound'],
      turretIds: ['turret_undead_skull_spire', 'turret_undead_bone_ballista']
    },
    {
      ageId: 2,
      nameVi: 'Kỷ Đêm Tối Ma Cà Rồng',
      baseHp: 1100,
      evolveXp: 14000,
      skillId: 'SKILL_UNDEAD_HELL_GATE_301',
      unitIds: ['undead_ghoul', 'undead_wraith', 'undead_vampire_lord'],
      turretIds: ['turret_undead_blood_altar', 'turret_undead_crypt_gargoyle']
    },
    {
      ageId: 3,
      nameVi: 'Kỷ Hắc Thuật Địa Ngục',
      baseHp: 2200,
      evolveXp: 45000,
      skillId: 'SKILL_UNDEAD_HELL_GATE_301',
      unitIds: ['undead_dullahan', 'undead_abomination', 'undead_dark_sorcerer'],
      turretIds: ['turret_undead_soul_cage', 'turret_undead_shadow_obelisk']
    },
    {
      ageId: 4,
      nameVi: 'Kỷ Ác Quỷ Ma Giới',
      baseHp: 4400,
      evolveXp: 150000,
      skillId: 'SKILL_UNDEAD_HELL_GATE_301',
      unitIds: ['undead_shadow_assassin', 'undead_infernal_demon', 'undead_lich_king'],
      turretIds: ['turret_undead_inferno_pillar', 'turret_undead_doom_cannon']
    },
    {
      ageId: 5,
      nameVi: 'Kỷ Diệt Vong Hắc Ám',
      baseHp: 8800,
      evolveXp: 999999,
      skillId: 'SKILL_UNDEAD_HELL_GATE_301',
      unitIds: ['undead_death_knight', 'undead_shadow_dragon', 'undead_lord_lucifer'],
      turretIds: ['turret_undead_abyss_gate', 'turret_undead_nether_eye']
    }
  ]
};
