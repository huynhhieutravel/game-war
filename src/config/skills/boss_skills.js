export const BOSS_SKILLS = {
  SKILL_BOSS_PRIMAL_ROAR_801: {
    id: 'SKILL_BOSS_PRIMAL_ROAR_801',
    name: 'Primal Roar',
    nameVi: 'Tiếng Gầm Bạo Chúa Cổ Đại',
    bossId: 'boss_age1_trex',
    element: 'fire',
    cooldown: 12,
    stunDuration: 2.0,
    cameraShake: 8,
    sound: 'hit_club',
    descriptionVi: 'Tiếng gầm nguyên thủy làm rung chuyển mặt đất và gây choáng toàn bộ quân lính trong 2 giây (giảm bởi Tenacity).'
  },

  SKILL_BOSS_FLAME_SWEEP_802: {
    id: 'SKILL_BOSS_FLAME_SWEEP_802',
    name: 'Dragon Flame Sweep',
    nameVi: 'Bão Lửa Quét Tuyến Hoàng Gia',
    bossId: 'boss_age2_dragon',
    element: 'fire',
    cooldown: 14,
    fireballCount: 3,
    damagePerFireball: 90,
    aoeRadius: 80,
    sound: 'fireball',
    descriptionVi: 'Rồng phun liên tiếp 3 quả cầu lửa khổng lồ nổ lan quét sạch tiền tuyến.'
  },

  SKILL_BOSS_MORTAR_BARRAGE_803: {
    id: 'SKILL_BOSS_MORTAR_BARRAGE_803',
    name: 'Steam Mortar Barrage',
    nameVi: 'Loạt Pháo Cối Hơi Nước',
    bossId: 'boss_age3_juggernaut',
    element: 'fire',
    cooldown: 16,
    mortarCount: 3,
    damagePerMortar: 220,
    aoeRadius: 85,
    sound: 'artillery',
    descriptionVi: 'Bắn loạt 3 quả pháo cối tầm xa gây sát thương nổ lan diện rộng.'
  },

  SKILL_BOSS_MISSILE_SALVO_804: {
    id: 'SKILL_BOSS_MISSILE_SALVO_804',
    name: 'Nuclear Missile Salvo',
    nameVi: 'Phóng Loạt Tên Lửa Hạt Nhân',
    bossId: 'boss_age4_tank',
    element: 'fire',
    cooldown: 18,
    missileCount: 4,
    damagePerMissile: 320,
    armorPenetration: 0.40,
    sound: 'rocket_launch',
    descriptionVi: 'Phóng 4 quả tên lửa hành trình tầm xa có khả năng xuyên 40% giáp đối phương.'
  },

  SKILL_BOSS_SINGULARITY_BEAM_805: {
    id: 'SKILL_BOSS_SINGULARITY_BEAM_805',
    name: 'Singularity Death Beam',
    nameVi: 'Chùm Tia Không Gian Tử Thần',
    bossId: 'boss_age5_leviathan',
    element: 'light',
    cooldown: 20,
    duration: 3.5,
    trueDamage: 400,
    sound: 'laser',
    descriptionVi: 'Quét chùm tia năng lượng tử thần gây Sát Thương Chuẩn xuyên thấu toàn bộ hàng lính.'
  }
};
