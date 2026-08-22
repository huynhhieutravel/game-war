import { ERA_SKILLS } from './era_skills.js';
import { TACTICAL_SKILLS } from './tactical_skills.js';
import { BOSS_SKILLS } from './boss_skills.js';
import { UNIT_SKILLS } from './unit_skills.js';
import { HERO_SKILLS } from './hero_skills.js';

export { ERA_SKILLS, TACTICAL_SKILLS, BOSS_SKILLS, UNIT_SKILLS, HERO_SKILLS };

export const SKILL_REGISTRY = {
  ...ERA_SKILLS,
  ...TACTICAL_SKILLS,
  ...BOSS_SKILLS,
  ...UNIT_SKILLS,
  ...HERO_SKILLS
};

export function getSkillById(skillId) {
  return SKILL_REGISTRY[skillId] || null;
}

export function getAllSkills() {
  return Object.values(SKILL_REGISTRY);
}

export function getSkillsByCategory(category = 'era') {
  if (category === 'era') return Object.values(ERA_SKILLS);
  if (category === 'tactical') return Object.values(TACTICAL_SKILLS);
  if (category === 'boss') return Object.values(BOSS_SKILLS);
  if (category === 'unit') return Object.values(UNIT_SKILLS);
  if (category === 'hero') return Object.values(HERO_SKILLS);
  return getAllSkills();
}
