export const HUMAN_FACTION = {
  id: 'FACTION_HUMAN_01',
  code: 'human',
  name: 'Human Empire',
  nameVi: 'Đế Chế Nhân Loại',
  elementMain: 'fire',
  elementSub: 'light',
  descriptionVi: 'Văn minh tiến bộ với hỏa lực súng đạn, pháo cối và xe tăng bọc thép cân bằng hoàn hảo.',
  baseColor: '#38bdf8',

  ages: [
    {
      ageId: 1,
      nameVi: 'Thời Tiền Sử',
      baseHp: 600,
      evolveXp: 4000,
      skillId: 'SKILL_ERA_METEOR_SWARM_101',
      unitIds: ['stone_clubman', 'stone_slingshot', 'stone_dino_rider'],
      turretIds: ['turret_stone_slingshot', 'turret_stone_catapult']
    },
    {
      ageId: 2,
      nameVi: 'Thời Trung Cổ',
      baseHp: 1200,
      evolveXp: 14000,
      skillId: 'SKILL_ERA_ARROW_STORM_102',
      unitIds: ['castle_swordsman', 'castle_archer', 'castle_knight'],
      turretIds: ['turret_castle_crossbow', 'turret_castle_ballista']
    },
    {
      ageId: 3,
      nameVi: 'Thời Phục Hưng',
      baseHp: 2400,
      evolveXp: 45000,
      skillId: 'SKILL_ERA_ARTILLERY_BARRAGE_103',
      unitIds: ['ren_musketeer', 'ren_bomb_thrower', 'ren_steam_tank'],
      turretIds: ['turret_ren_cannon', 'turret_ren_mortar']
    },
    {
      ageId: 4,
      nameVi: 'Thời Hiện Đại',
      baseHp: 4800,
      evolveXp: 150000,
      skillId: 'SKILL_ERA_B52_CARPET_BOMB_104',
      unitIds: ['mod_infantry', 'mod_rocket_launcher', 'mod_abrams_tank'],
      turretIds: ['turret_mod_gatling', 'turret_mod_sam_launcher']
    },
    {
      ageId: 5,
      nameVi: 'Thời Viễn Tưởng',
      baseHp: 9600,
      evolveXp: 999999,
      skillId: 'SKILL_ERA_ORBITAL_ION_LASER_105',
      unitIds: ['fut_plasma_trooper', 'fut_mech_walker', 'fut_god_titan'],
      turretIds: ['turret_fut_pulse_laser', 'turret_fut_orbital_ion']
    }
  ]
};
