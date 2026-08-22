export const ELEMENTS = {
  fire: {
    id: 'fire',
    name: 'Fire',
    nameVi: 'Hỏa',
    icon: '🔥',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.2)',
    descriptionVi: 'Hỏa khắc chế Mộc (+30% DMG), bị Thủy khắc chế (75% DMG). Gây sát thương thiêu đốt theo thời gian.'
  },
  wood: {
    id: 'wood',
    name: 'Wood / Nature',
    nameVi: 'Mộc',
    icon: '🌿',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.2)',
    descriptionVi: 'Mộc khắc chế Thủy (+30% DMG), bị Hỏa khắc chế (75% DMG). Hút sinh lực và tự hồi phục máu.'
  },
  water: {
    id: 'water',
    name: 'Water / Frost',
    nameVi: 'Thủy',
    icon: '💧',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.2)',
    descriptionVi: 'Thủy khắc chế Hỏa (+30% DMG), bị Mộc khắc chế (75% DMG). Đóng băng và làm chậm tốc độ đối thủ.'
  },
  light: {
    id: 'light',
    name: 'Light / Holy',
    nameVi: 'Ánh Sáng',
    icon: '☀️',
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.2)',
    descriptionVi: 'Tương khắc đối kháng với Bóng Tối (140% DMG lên nhau). Phá giáp vật lý và kháng phép.'
  },
  dark: {
    id: 'dark',
    name: 'Dark / Shadow',
    nameVi: 'Bóng Tối',
    icon: '🌑',
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.2)',
    descriptionVi: 'Tương khắc đối kháng với Ánh Sáng (140% DMG lên nhau). Gây nguyền rủa suy yếu và hút hồn.'
  }
};

export const ELEMENT_MATRIX = {
  fire:  { fire: 1.0, wood: 1.30, water: 0.75, light: 1.0, dark: 1.0 },
  wood:  { fire: 0.75, wood: 1.0, water: 1.30, light: 1.0, dark: 1.0 },
  water: { fire: 1.30, wood: 0.75, water: 1.0, light: 1.0, dark: 1.0 },
  light: { fire: 1.0, wood: 1.0, water: 1.0, light: 0.75, dark: 1.40 },
  dark:  { fire: 1.0, wood: 1.0, water: 1.0, light: 1.40, dark: 0.75 }
};

export function getElementalMultiplier(attackerElem = 'fire', defenderElem = 'fire') {
  const row = ELEMENT_MATRIX[attackerElem];
  if (!row) return 1.0;
  return row[defenderElem] || 1.0;
}
