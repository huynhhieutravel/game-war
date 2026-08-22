export const TACTICAL_SKILLS = {
  SKILL_TAC_FALLBACK_001: {
    id: 'SKILL_TAC_FALLBACK_001',
    name: 'Fall Back Command',
    nameVi: 'Lệnh Rút Quân Về Căn Cứ',
    hotkey: 'R',
    type: 'toggle',
    damageReductionPct: 0.25,
    speedMultiplier: 1.1,
    icon: '🛡️',
    descriptionVi: 'Lệnh cho toàn bộ quân lính rút lui về dưới tầm bắn của Tháp phòng thủ và nhận hiệu ứng giảm 25% sát thương nhận vào.'
  },

  SKILL_TAC_CHARGE_002: {
    id: 'SKILL_TAC_CHARGE_002',
    name: 'All-Out Charge Command',
    nameVi: 'Lệnh Tổng Tấn Công (Xung Phong)',
    hotkey: 'F',
    type: 'active',
    cooldown: 20,
    duration: 6.0,
    moveSpeedBonusPct: 0.50,
    attackSpeedBonusPct: 0.25,
    icon: '⚡',
    sound: 'siren',
    descriptionVi: 'Kích hoạt hào quang xung trận: Tăng 50% tốc độ chạy và 25% tốc độ đánh cho toàn quân trong 6 giây.'
  }
};
