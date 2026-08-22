import { getElementalMultiplier } from '../config/elements.js';

/**
 * ============================================================================
 * BALANCE ENGINE & COMBAT FORMULA MODULE (BỘ ĐIỀU PHỐI CÂN BẰNG CHIẾN THUẬT)
 * ============================================================================
 * Cung cấp:
 * 1. Công thức tính toán Sát thương, Giáp, Kháng phép, Khắc chế Nguyên tố, Chí mạng.
 * 2. Ngân sách sức mạnh (Power Score Budget) phân bổ theo Kỷ nguyên & Vai trò (Role).
 * 3. Trình tự động tạo chỉ số cân bằng cho Lính mới (generateUnitStats).
 * 4. Trình kiểm toán cân bằng (validateUnitBalance & auditAllUnits).
 */

// 1. NGÂN SÁCH SỨC MẠNH THEO KỶ NGUYÊN (POWER BUDGET PER AGE)
export const AGE_POWER_BUDGETS = {
  1: { baseCost: 15,  baseEHP: 130,  baseDPS: 25,  baseBounty: 20,  baseXp: 35 },
  2: { baseCost: 45,  baseEHP: 300,  baseDPS: 45,  baseBounty: 50,  baseXp: 85 },
  3: { baseCost: 100, baseEHP: 600,  baseDPS: 80,  baseBounty: 120, baseXp: 200 },
  4: { baseCost: 220, baseEHP: 1300, baseDPS: 150, baseBounty: 260, baseXp: 450 },
  5: { baseCost: 450, baseEHP: 2800, baseDPS: 300, baseBounty: 550, baseXp: 950 }
};

// 2. TỶ TRỌNG PHÂN BỔ CHỈ SỐ THEO VAI TRÒ (ROLE STAT DISTRIBUTION)
export const ROLE_PROFILES = {
  melee: {
    role: 'melee',
    ehpWeight: 0.48,
    dpsWeight: 0.35,
    armorShare: 0.17,
    baseMoveSpeed: 80,
    baseAttackRange: 35,
    baseAttackCooldown: 0.75,
    defaultCritRate: 0.10,
    defaultCritDmg: 1.50,
    defaultTenacity: 0.12,
    defaultLifeSteal: 0.0,
    aoeRadius: 0
  },
  ranged: {
    role: 'ranged',
    ehpWeight: 0.28,
    dpsWeight: 0.58,
    armorShare: 0.14,
    baseMoveSpeed: 72,
    baseAttackRange: 280,
    baseAttackCooldown: 1.05,
    defaultCritRate: 0.18,
    defaultCritDmg: 1.65,
    defaultTenacity: 0.05,
    defaultLifeSteal: 0.0,
    aoeRadius: 0
  },
  heavy: {
    role: 'heavy',
    ehpWeight: 0.60,
    dpsWeight: 0.25,
    armorShare: 0.15,
    baseMoveSpeed: 60,
    baseAttackRange: 45,
    baseAttackCooldown: 1.35,
    defaultCritRate: 0.12,
    defaultCritDmg: 1.60,
    defaultTenacity: 0.25,
    defaultLifeSteal: 0.05,
    aoeRadius: 40
  }
};

export class BalanceEngine {
  /**
   * Tính toán Sát thương Thực tế giữa Kẻ tấn công và Mục tiêu
   */
  static calculateDamage(attacker, defender, options = {}) {
    const physAtk = options.physAtk ?? attacker.physicalAttack ?? 0;
    const magAtk = options.magAtk ?? attacker.magicAttack ?? 0;
    const trueDmg = options.trueDmg ?? attacker.trueDamage ?? 0;
    const armorPen = options.armorPen ?? attacker.armorPenetration ?? 0;
    const magPen = options.magPen ?? attacker.magicPenetration ?? 0;
    const attackerElement = options.element ?? attacker.element ?? 'fire';
    const defenderElement = defender.element ?? 'fire';

    // 1. Tính toán Giáp và Kháng phép hiệu dụng (Effective Armor / MR)
    const effArmor = Math.max(0, (defender.physicalArmor || 0) * (1 - armorPen));
    const effMagRes = Math.max(0, (defender.magicResistance || 0) * (1 - magPen));

    // 2. Công thức giảm trừ sát thương (Diminishing Returns)
    const physDamage = physAtk * (100 / (100 + effArmor));
    const magDamage = magAtk * (100 / (100 + effMagRes));

    // 3. Hệ số tương khắc Ngũ Hành (Elemental Counter Multiplier)
    const elemMult = getElementalMultiplier(attackerElement, defenderElement);
    let mitigatedDamage = (physDamage + magDamage) * elemMult;

    // 4. Tính toán Đòn đánh Chí Mạng (Critical Strike)
    let isCrit = options.isCrit ?? (Math.random() < (attacker.critRate || 0));
    const critMultiplier = attacker.critDamage || 1.5;
    if (isCrit) {
      mitigatedDamage *= critMultiplier;
    }

    // 5. Tổng sát thương cuối cùng (Bao gồm Sát thương Chuẩn không bị giảm trừ)
    let finalDamage = Math.max(1, Math.round(mitigatedDamage + trueDmg));

    // 6. Xử lý Lá chắn Shield hấp thụ trước
    let shieldAbsorbed = 0;
    if (defender.shield > 0) {
      if (defender.shield >= finalDamage) {
        shieldAbsorbed = finalDamage;
        finalDamage = 0;
      } else {
        shieldAbsorbed = defender.shield;
        finalDamage -= defender.shield;
      }
    }

    // 7. Hút máu cho kẻ tấn công (Life Steal)
    let lifeStealHealed = 0;
    if (attacker.lifeSteal > 0 && finalDamage > 0) {
      lifeStealHealed = Math.round(finalDamage * attacker.lifeSteal);
    }

    return {
      finalDamage,
      shieldAbsorbed,
      lifeStealHealed,
      isCrit,
      elemMult,
      rawPhysical: physDamage,
      rawMagic: magDamage
    };
  }

  /**
   * Tính Máu Hiệu Dụng (Effective Health Pool - EHP)
   */
  static calculateEHP(hp = 100, shield = 0, physicalArmor = 0, magicResistance = 0) {
    const avgResistance = (physicalArmor + magicResistance) / 2;
    const mitigationFactor = 1 + (avgResistance / 100);
    return Math.round((hp + shield) * mitigationFactor);
  }

  /**
   * Tính Sát Thương Mỗi Giây (Damage Per Second - DPS)
   */
  static calculateDPS(physAtk = 10, magAtk = 0, trueDmg = 0, cooldown = 1.0, critRate = 0.1, critDmg = 1.5) {
    const rawPerHit = physAtk + magAtk + trueDmg;
    const critExpectedFactor = 1 + (critRate * (critDmg - 1));
    const hitPerSec = 1 / Math.max(0.2, cooldown);
    return Math.round(rawPerHit * critExpectedFactor * hitPerSec);
  }

  /**
   * Tính Thời Gian Tiêu Diệt (Time-To-Kill - TTK) giữa 2 đơn vị tính bằng giây
   */
  static calculateTTK(attackerUnit, defenderUnit) {
    const targetEHP = this.calculateEHP(
      defenderUnit.hp,
      defenderUnit.shield,
      defenderUnit.physicalArmor,
      defenderUnit.magicResistance
    );
    const attackerDPS = this.calculateDPS(
      attackerUnit.physicalAttack,
      attackerUnit.magicAttack,
      attackerUnit.trueDamage,
      attackerUnit.attackCooldown,
      attackerUnit.critRate,
      attackerUnit.critDamage
    );
    return Number((targetEHP / Math.max(1, attackerDPS)).toFixed(2));
  }

  /**
   * Tính Điểm Sức Mạnh Chuẩn Hóa (Normalized Power Score)
   */
  static calculateUnitPowerScore(unitConfig) {
    const ehp = this.calculateEHP(
      unitConfig.hp,
      unitConfig.shield || 0,
      unitConfig.physicalArmor || 0,
      unitConfig.magicResistance || 0
    );
    const dps = this.calculateDPS(
      unitConfig.physicalAttack || 0,
      unitConfig.magicAttack || 0,
      unitConfig.trueDamage || 0,
      unitConfig.attackCooldown || 1.0,
      unitConfig.critRate || 0,
      unitConfig.critDamage || 1.5
    );
    const rangeBonus = Math.sqrt(unitConfig.attackRange || 35) * 1.8;
    const speedBonus = (unitConfig.moveSpeed || 70) * 0.4;
    const aoeBonus = (unitConfig.aoeRadius || 0) * 3.5;

    // Power Score Index Formula
    const rawScore = (ehp * 0.4) + (dps * 2.8) + rangeBonus + speedBonus + aoeBonus;
    return Math.round(rawScore);
  }

  /**
   * TRÌNH TẠO CHỈ SỐ TỰ ĐỘNG CÂN BẰNG CHO LÍNH MỚI (AUTO-BALANCED UNIT GENERATOR)
   * Giúp bất kỳ ai thêm lính mới đều có chỉ số cân xứng hoàn hảo theo công thức.
   */
  static generateUnitStats(params) {
    const {
      id,
      name,
      nameVi,
      ageId = 1,
      role = 'melee',
      costTier = 1.0, // Hệ số giá (0.8 = siêu rẻ, 1.0 = chuẩn, 1.5 = cao cấp)
      element = 'fire',
      customModifiers = {}
    } = params;

    const budget = AGE_POWER_BUDGETS[ageId] || AGE_POWER_BUDGETS[1];
    const profile = ROLE_PROFILES[role] || ROLE_PROFILES.melee;

    // 1. Tính giá và thời gian huấn luyện
    const cost = Math.round(budget.baseCost * (role === 'heavy' ? 4.5 : (role === 'ranged' ? 1.6 : 1.0)) * costTier);
    const trainTime = Number((1.6 + (cost / budget.baseCost) * 0.35).toFixed(1));

    // 2. Tính Máu, Giáp, Kháng phép theo tỷ trọng
    const targetEHP = budget.baseEHP * (role === 'heavy' ? 3.6 : (role === 'ranged' ? 0.75 : 1.1)) * costTier;
    const armor = Math.round((ageId * 4 + 4) * (role === 'heavy' ? 1.5 : (role === 'melee' ? 1.2 : 0.6)));
    const mr = Math.round(armor * 0.6);
    const hp = Math.round(targetEHP / (1 + ((armor + mr) / 2) / 100));

    // 3. Tính Sát thương và Tốc đánh
    const targetDPS = budget.baseDPS * (role === 'ranged' ? 1.3 : (role === 'heavy' ? 1.5 : 1.0)) * costTier;
    const attackCooldown = profile.baseAttackCooldown;
    const attackDmg = Math.round(targetDPS * attackCooldown);

    // 4. Thưởng Vàng & XP khi hạ gục
    const xpReward = Math.round(cost * 2.2);
    const killBounty = Math.round(cost * 1.25);

    const generatedUnit = {
      id,
      name,
      nameVi,
      ageId,
      role,
      cost,
      trainTime,
      xpReward,
      killBounty,

      // Sinh mệnh
      hp,
      shield: customModifiers.shield || 0,
      physicalArmor: armor,
      magicResistance: mr,
      tenacity: profile.defaultTenacity,
      hpRegen: Number((ageId * 0.5).toFixed(1)),
      moveSpeed: profile.baseMoveSpeed,

      // Tấn công
      physicalAttack: attackDmg,
      magicAttack: 0,
      trueDamage: customModifiers.trueDamage || 0,
      element,
      attackRange: profile.baseAttackRange,
      attackCooldown,
      critRate: profile.defaultCritRate,
      critDamage: profile.defaultCritDmg,
      armorPenetration: Number((0.05 * ageId).toFixed(2)),
      magicPenetration: 0.0,
      lifeSteal: profile.defaultLifeSteal,

      // Năng lượng & AOE
      maxMana: 100,
      startingMana: 0,
      manaPerAttack: 25,
      aoeRadius: profile.aoeRadius,
      descriptionVi: customModifiers.descriptionVi || `Binh chủng ${profile.role.toUpperCase()} thời đại ${ageId}.`,
      ...customModifiers
    };

    return generatedUnit;
  }

  /**
   * KIỂM TOÁN CÂN BẰNG BỘ CHỈ SỐ (BALANCE AUDIT REPORT)
   */
  static auditUnits(unitsDict) {
    const report = [];
    for (const [key, unit] of Object.entries(unitsDict)) {
      const powerScore = this.calculateUnitPowerScore(unit);
      const cost = unit.cost || 1;
      const efficiencyRatio = Number((powerScore / cost).toFixed(2));

      report.push({
        key,
        nameVi: unit.nameVi,
        ageId: unit.ageId,
        role: unit.role,
        cost,
        powerScore,
        efficiencyRatio,
        status: (efficiencyRatio >= 2.0 && efficiencyRatio <= 6.5) ? 'BALANCED' : (efficiencyRatio > 6.5 ? 'OVERPOWERED' : 'UNDERPOWERED')
      });
    }
    return report;
  }
}
