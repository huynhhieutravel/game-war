export const UNIT_SKILLS = {
  SKILL_UNIT_SHIELD_BLOCK_501: {
    id: 'SKILL_UNIT_SHIELD_BLOCK_501',
    name: 'Shield Deflect',
    nameVi: 'Đỡ Khiên Hoàng Gia',
    type: 'passive',
    element: 'light',
    damageReductionVsRanged: 0.25,
    descriptionVi: 'Khiên giáp thép chặn giảm 25% sát thương từ tất cả các loại đạn tầm xa.'
  },

  SKILL_UNIT_EXPLOSIVE_SHELL_502: {
    id: 'SKILL_UNIT_EXPLOSIVE_SHELL_502',
    name: 'Explosive Shell Blast',
    nameVi: 'Đạn Pháo Nổ Lan Diện Rộng',
    type: 'passive',
    element: 'fire',
    aoeRadius: 75,
    descriptionVi: 'Đạn pháo khi phát nổ gây sát thương lan cho tất cả kẻ địch trong bán kính nổ.'
  },

  SKILL_UNIT_PLASMA_BARRIER_503: {
    id: 'SKILL_UNIT_PLASMA_BARRIER_503',
    name: 'Quantum Plasma Barrier',
    nameVi: 'Trường Lực Lượng Tử Tự Hồi',
    type: 'passive',
    element: 'light',
    shieldAmount: 800,
    shieldRegenRate: 20,
    descriptionVi: 'Tạo lớp lá chắn năng lượng 800 HP hấp thụ sát thương và tự tái tạo 20 Shield mỗi giây.'
  },

  SKILL_UNIT_TRAMPLE_CRUSH_504: {
    id: 'SKILL_UNIT_TRAMPLE_CRUSH_504',
    name: 'Trample Charge',
    nameVi: 'Giẫm Đạp Càn Quét',
    type: 'passive',
    element: 'wood',
    knockbackDist: 30,
    descriptionVi: 'Sức mạnh cơ bắp đẩy lùi lính đối phương khi va chạm ở tiền tuyến.'
  },

  SKILL_UNIT_LIFESTEAL_BITE_505: {
    id: 'SKILL_UNIT_LIFESTEAL_BITE_505',
    name: 'Vampiric Bite',
    nameVi: 'Cắn Xé Hút Hồn',
    type: 'passive',
    element: 'dark',
    lifeStealPct: 0.15,
    descriptionVi: 'Hồi phục máu cho bản thân bằng 15% lượng sát thương gây ra.'
  },

  SKILL_UNIT_AUTO_ULTIMATE_506: {
    id: 'SKILL_UNIT_AUTO_ULTIMATE_506',
    name: 'Energy Awakening',
    nameVi: 'Thức Tỉnh Tuyệt Kỹ Năng Lượng',
    type: 'auto_burst',
    element: 'light',
    manaCost: 100,
    bonusShield: 60,
    descriptionVi: 'Khi thanh Năng lượng nạp đầy 100%, tự động bộc phát sấm sét năng lượng và nhận thêm 60 Lá Chắn Shield!'
  }
};
