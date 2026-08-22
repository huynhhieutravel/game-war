import { HUMAN_FACTION } from './human_faction.js';
import { BEAST_FACTION } from './beast_faction.js';
import { UNDEAD_FACTION } from './undead_faction.js';

export { HUMAN_FACTION, BEAST_FACTION, UNDEAD_FACTION };

export const FACTIONS = {
  human: HUMAN_FACTION,
  beast: BEAST_FACTION,
  undead: UNDEAD_FACTION
};

export function getFactionByCode(code = 'human') {
  return FACTIONS[code] || HUMAN_FACTION;
}

export function getFactionById(id) {
  return Object.values(FACTIONS).find(f => f.id === id) || HUMAN_FACTION;
}

export function getAllFactions() {
  return Object.values(FACTIONS);
}
