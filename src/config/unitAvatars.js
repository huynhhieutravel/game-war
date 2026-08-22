// === UNIT AVATARS (SVG ICONS FOR ALL 15 UNITS) ===

export const UNIT_AVATARS = {
  // --- AGE 1: STONE AGE ---
  stone_clubman: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_clubman)"/>
      <!-- Caveman Head & Body -->
      <circle cx="28" cy="24" r="12" fill="#d97706"/>
      <!-- Wild Hair -->
      <path d="M16 22C16 14 22 10 32 10C40 10 44 15 42 22C38 18 34 16 28 16C22 16 18 18 16 22Z" fill="#78350f"/>
      <!-- Face details -->
      <circle cx="25" cy="23" r="2" fill="#1e293b"/>
      <circle cx="33" cy="23" r="2" fill="#1e293b"/>
      <path d="M26 29C28 31 32 31 34 29" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
      <!-- Fur Tunic -->
      <path d="M18 38C18 34 22 32 30 32C38 32 42 34 42 38L44 58H16L18 38Z" fill="#b45309"/>
      <!-- Wooden Club with Spikes -->
      <path d="M42 48L52 14C54 12 58 14 56 18L48 52L42 48Z" fill="#92400e" stroke="#78350f" stroke-width="1.5"/>
      <circle cx="53" cy="18" r="2" fill="#e2e8f0"/>
      <circle cx="51" cy="26" r="2" fill="#e2e8f0"/>
      <circle cx="48" cy="34" r="2" fill="#e2e8f0"/>
      <defs>
        <linearGradient id="bg_clubman" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#451a03"/>
          <stop offset="1" stop-color="#1c1917"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  stone_slingshot: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_slingshot)"/>
      <!-- Head -->
      <circle cx="26" cy="22" r="11" fill="#d97706"/>
      <!-- Headband & Feather -->
      <rect x="15" y="18" width="22" height="4" rx="2" fill="#dc2626"/>
      <path d="M16 18L10 8L18 12L16 18Z" fill="#0284c7"/>
      <!-- Eyes -->
      <circle cx="23" cy="22" r="1.8" fill="#1e293b"/>
      <circle cx="30" cy="22" r="1.8" fill="#1e293b"/>
      <!-- Slingshot Y-Fork -->
      <path d="M40 44L48 26M48 26L42 16M48 26L56 18" stroke="#92400e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Elastic & Rock -->
      <path d="M42 17L49 22L55 19" stroke="#ea580c" stroke-width="1.5" stroke-dasharray="2 1"/>
      <circle cx="49" cy="22" r="4" fill="#64748b" stroke="#334155" stroke-width="1"/>
      <!-- Body -->
      <path d="M16 35C16 31 20 29 28 29C36 29 40 31 40 35L42 58H14L16 35Z" fill="#78350f"/>
      <defs>
        <linearGradient id="bg_slingshot" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0c4a6e"/>
          <stop offset="1" stop-color="#1c1917"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  stone_dino_rider: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_dinorider)"/>
      <!-- Green Raptor Dinosaur Head & Body -->
      <path d="M22 32C26 26 38 24 50 26C56 27 60 32 58 36C52 38 46 38 42 42C38 46 36 54 30 58H18C16 52 18 42 22 32Z" fill="#16a34a"/>
      <!-- Dino Snout & Teeth -->
      <path d="M50 26L58 28C60 30 59 34 54 36L44 36" fill="#15803d"/>
      <path d="M47 34L49 32L51 34L53 32L55 34" stroke="#ffffff" stroke-width="1.5"/>
      <circle cx="48" cy="29" r="2.5" fill="#facc15"/>
      <circle cx="48" cy="29" r="1.2" fill="#000000"/>
      <!-- Caveman Rider on Top -->
      <circle cx="24" cy="18" r="8" fill="#d97706"/>
      <path d="M16 16C16 12 20 8 26 8C30 8 33 11 32 16" fill="#78350f"/>
      <!-- Bone Spear -->
      <path d="M12 40L38 10" stroke="#f1f5f9" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="38,10 44,6 42,14" fill="#e2e8f0"/>
      <defs>
        <linearGradient id="bg_dinorider" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#14532d"/>
          <stop offset="1" stop-color="#1c1917"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  // --- AGE 2: CASTLE AGE ---
  castle_swordsman: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_swordsman)"/>
      <!-- Steel Helmet & Visor -->
      <circle cx="28" cy="22" r="11" fill="#94a3b8"/>
      <path d="M20 20H36V26C36 29 32 32 28 32C24 32 20 29 20 26V20Z" fill="#64748b"/>
      <!-- Visor T-slit -->
      <path d="M22 23H34M28 23V28" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
      <!-- Royal Blue Helmet Plume -->
      <path d="M28 11C28 5 36 4 40 8C36 10 34 13 32 15" fill="#3b82f6"/>
      <!-- Knight Plate Armor -->
      <path d="M18 34C18 30 22 28 28 28C34 28 38 30 38 34L40 58H16L18 34Z" fill="#475569"/>
      <!-- Gleaming Steel Sword -->
      <path d="M46 54L46 14" stroke="#e2e8f0" stroke-width="3" stroke-linecap="round"/>
      <path d="M40 46H52" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="46" cy="54" r="2.5" fill="#f59e0b"/>
      <polygon points="46,10 44,15 48,15" fill="#ffffff"/>
      <defs>
        <linearGradient id="bg_swordsman" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1e3a8a"/>
          <stop offset="1" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  castle_archer: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_archer)"/>
      <!-- Ranger Head & Hood -->
      <path d="M18 24C18 14 24 10 32 10C40 10 44 14 44 24C44 32 38 34 32 34C26 34 18 32 18 24Z" fill="#15803d"/>
      <circle cx="31" cy="22" r="7" fill="#fed7aa"/>
      <circle cx="34" cy="21" r="1.5" fill="#1e293b"/>
      <!-- Feather on Cap -->
      <path d="M26 12L18 4L24 10" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Wooden Longbow -->
      <path d="M46 12C54 24 54 42 46 54" stroke="#92400e" stroke-width="3" stroke-linecap="round"/>
      <path d="M46 12L38 33L46 54" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- Arrow -->
      <path d="M30 33H54" stroke="#f1f5f9" stroke-width="2" stroke-linecap="round"/>
      <polygon points="56,33 51,30 51,36" fill="#f59e0b"/>
      <defs>
        <linearGradient id="bg_archer" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#064e3b"/>
          <stop offset="1" stop-color="#022c22"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  castle_knight: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_knight)"/>
      <!-- Armored Warhorse Head -->
      <path d="M16 48L24 30C26 24 32 22 38 24L52 28C56 30 56 36 50 40L42 44L40 58H16L16 48Z" fill="#e2e8f0"/>
      <!-- Horse Armor Champron -->
      <path d="M36 24L48 27L44 38L32 34Z" fill="#3b82f6"/>
      <circle cx="42" cy="30" r="2" fill="#f59e0b"/>
      <!-- Jousting Lance -->
      <path d="M12 56L56 10" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round"/>
      <polygon points="58,8 52,11 55,14" fill="#fbbf24"/>
      <!-- Knight Shield Crest -->
      <path d="M22 36C22 32 28 30 32 30C36 30 38 34 36 40C34 44 28 48 26 50C24 46 22 40 22 36Z" fill="#dc2626"/>
      <defs>
        <linearGradient id="bg_knight" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#854d0e"/>
          <stop offset="1" stop-color="#1e1b4b"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  // --- AGE 3: RENAISSANCE ---
  ren_musketeer: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_musketeer)"/>
      <!-- Face -->
      <circle cx="28" cy="24" r="10" fill="#fed7aa"/>
      <path d="M24 28C26 29 30 29 32 28" stroke="#78350f" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Musketeer Tricorn Hat -->
      <path d="M14 20C18 10 38 10 44 20L48 24H10L14 20Z" fill="#1e1b4b"/>
      <path d="M16 16C12 8 22 4 28 8" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Uniform with Royal Sash -->
      <path d="M18 34C18 30 22 28 28 28C34 28 38 30 38 34L40 58H16L18 34Z" fill="#4338ca"/>
      <path d="M20 32L38 52" stroke="#f59e0b" stroke-width="3"/>
      <!-- Flintlock Musket Gun -->
      <path d="M38 52L54 20" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
      <path d="M48 32L58 12" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
      <defs>
        <linearGradient id="bg_musketeer" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#312e81"/>
          <stop offset="1" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  ren_bomb_thrower: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_bomb)"/>
      <!-- Heavy Grenadier Head & Beard -->
      <circle cx="24" cy="24" r="10" fill="#fed7aa"/>
      <path d="M18 24C18 16 22 12 30 12C36 12 40 16 40 24" fill="#991b1b"/>
      <path d="M18 26C20 34 28 34 30 26" fill="#78350f"/>
      <!-- Big Black Iron Cannonball Bomb -->
      <circle cx="44" cy="38" r="14" fill="#0f172a" stroke="#334155" stroke-width="2"/>
      <path d="M44 24V20" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <!-- Burning Sparkling Fuse -->
      <path d="M44 20C46 16 50 16 52 14" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
      <circle cx="52" cy="14" r="3" fill="#facc15"/>
      <defs>
        <linearGradient id="bg_bomb" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#7f1d1d"/>
          <stop offset="1" stop-color="#18181b"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  ren_steam_tank: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_steamtank)"/>
      <!-- Steampunk Brass Tank Hull -->
      <path d="M12 46L18 32H44L52 46L46 54H18L12 46Z" fill="#b45309" stroke="#78350f" stroke-width="2"/>
      <!-- Turret Dome & Heavy Cannon -->
      <circle cx="28" cy="30" r="10" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
      <rect x="34" y="26" width="24" height="8" rx="2" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
      <!-- Smokestack & Steam Plume -->
      <rect x="18" y="16" width="6" height="14" fill="#78350f"/>
      <circle cx="21" cy="12" r="4" fill="rgba(255,255,255,0.7)"/>
      <circle cx="24" cy="8" r="5" fill="rgba(255,255,255,0.4)"/>
      <!-- Cogwheel Wheels -->
      <circle cx="20" cy="50" r="4" fill="#475569"/>
      <circle cx="32" cy="50" r="4" fill="#475569"/>
      <circle cx="44" cy="50" r="4" fill="#475569"/>
      <defs>
        <linearGradient id="bg_steamtank" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#451a03"/>
          <stop offset="1" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  // --- AGE 4: MODERN AGE ---
  mod_infantry: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_commando)"/>
      <!-- Tactical Helmet & Night Vision/Goggles -->
      <circle cx="28" cy="24" r="11" fill="#334155"/>
      <rect x="20" y="16" width="18" height="6" rx="3" fill="#1e293b"/>
      <rect x="22" y="22" width="14" height="4" rx="2" fill="#22c55e"/>
      <!-- Camo Body -->
      <path d="M18 35C18 31 22 29 28 29C34 29 38 31 38 35L40 58H16L18 35Z" fill="#1e3a5f"/>
      <!-- Tactical M4 Assault Rifle -->
      <rect x="32" y="38" width="26" height="5" rx="1" fill="#0f172a"/>
      <rect x="36" y="43" width="4" height="8" fill="#1e293b"/>
      <rect x="42" y="34" width="6" height="4" fill="#0f172a"/>
      <defs>
        <linearGradient id="bg_commando" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0f172a"/>
          <stop offset="1" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  mod_rocket_launcher: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_bazooka)"/>
      <!-- Soldier Head -->
      <circle cx="24" cy="24" r="10" fill="#fed7aa"/>
      <path d="M14 20C14 12 20 10 28 10C36 10 38 14 36 20" fill="#3f3f46"/>
      <!-- Heavy Bazooka Launcher Tube -->
      <rect x="12" y="30" width="48" height="10" rx="2" transform="rotate(-20 12 30)" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>
      <!-- Rocket Warhead Peeking -->
      <polygon points="56,12 62,10 58,18" fill="#ef4444"/>
      <defs>
        <linearGradient id="bg_bazooka" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#14532d"/>
          <stop offset="1" stop-color="#18181b"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  mod_abrams_tank: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_tank)"/>
      <!-- Modern Battle Tank Turret & Long 120mm Gun Barrel -->
      <rect x="12" y="38" width="42" height="14" rx="3" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
      <!-- Angular Turret -->
      <path d="M18 38L24 24H38L44 38Z" fill="#64748b"/>
      <!-- Long Gun Barrel with Muzzle Brake -->
      <rect x="38" y="28" width="24" height="5" fill="#334155"/>
      <rect x="58" y="26" width="3" height="9" fill="#1e293b"/>
      <!-- Tank Treads with Wheels -->
      <rect x="10" y="48" width="46" height="8" rx="4" fill="#0f172a"/>
      <circle cx="16" cy="52" r="3" fill="#64748b"/>
      <circle cx="24" cy="52" r="3" fill="#64748b"/>
      <circle cx="32" cy="52" r="3" fill="#64748b"/>
      <circle cx="40" cy="52" r="3" fill="#64748b"/>
      <circle cx="48" cy="52" r="3" fill="#64748b"/>
      <defs>
        <linearGradient id="bg_tank" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1e293b"/>
          <stop offset="1" stop-color="#020617"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  // --- AGE 5: FUTURE AGE ---
  fut_plasma_trooper: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_plasma)"/>
      <!-- Nano Helmet with Glowing Cyan Visor -->
      <circle cx="28" cy="22" r="11" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5"/>
      <path d="M20 20H36V24C36 26 32 28 28 28C24 28 20 26 20 24V20Z" fill="#06b6d4"/>
      <!-- Cyber Armor with Neon Circuits -->
      <path d="M18 34C18 30 22 28 28 28C34 28 38 30 38 34L40 58H16L18 34Z" fill="#1e293b"/>
      <path d="M28 30V48M22 38H34" stroke="#06b6d4" stroke-width="1.5"/>
      <!-- Dual Plasma Rifle -->
      <rect x="36" y="38" width="22" height="6" rx="2" fill="#0891b2"/>
      <rect x="42" y="36" width="12" height="2" fill="#22d3ee"/>
      <circle cx="56" cy="41" r="3" fill="#67e8f9"/>
      <defs>
        <linearGradient id="bg_plasma" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#083344"/>
          <stop offset="1" stop-color="#020617"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  fut_mech_walker: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_mech)"/>
      <!-- Bipedal Mech Cockpit & Torso -->
      <path d="M18 20L24 10H40L46 20L42 36H22L18 20Z" fill="#581c87" stroke="#a855f7" stroke-width="1.5"/>
      <!-- Glowing Core Reactor -->
      <circle cx="32" cy="22" r="5" fill="#c084fc"/>
      <circle cx="32" cy="22" r="2.5" fill="#f5d0fe"/>
      <!-- Dual Heavy Laser Cannons -->
      <rect x="10" y="24" width="8" height="16" rx="2" fill="#3b0764"/>
      <rect x="46" y="24" width="8" height="16" rx="2" fill="#3b0764"/>
      <!-- Hydraulic Mech Legs -->
      <path d="M22 36L16 54H24L28 42" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <path d="M42 36L48 54H40L36 42" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <defs>
        <linearGradient id="bg_mech" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#3b0764"/>
          <stop offset="1" stop-color="#09090b"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  fut_god_titan: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_titan)"/>
      <!-- Quantum Leviathan Titan Superstructure -->
      <path d="M12 28L24 8H40L52 28L48 48L32 58L16 48L12 28Z" fill="#831843" stroke="#f43f5e" stroke-width="2"/>
      <!-- Antimatter Quantum Singularity Core -->
      <circle cx="32" cy="32" r="10" fill="#f43f5e"/>
      <circle cx="32" cy="32" r="6" fill="#fbcfe8"/>
      <!-- Particle Beam Radiators -->
      <path d="M8 32L16 28M56 32L48 28M32 8V2M32 58V62" stroke="#fb7185" stroke-width="2" stroke-linecap="round"/>
      <defs>
        <linearGradient id="bg_titan" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4c0519"/>
          <stop offset="1" stop-color="#030712"/>
        </linearGradient>
      </defs>
    </svg>
  `
};

export const TURRET_AVATARS = {
  stone_slingshot_turret: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_slingshot)"/>
      <rect x="28" y="28" width="8" height="28" fill="#78350f" stroke="#451a03"/>
      <path d="M22 28L32 12L42 28" stroke="#92400e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24 16L32 20L40 16" stroke="#ea580c" stroke-width="2"/>
      <circle cx="32" cy="20" r="4.5" fill="#64748b" stroke="#334155"/>
      <defs>
        <linearGradient id="bg_t_slingshot" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#451a03"/><stop offset="1" stop-color="#1c1917"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  stone_catapult: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_catapult)"/>
      <rect x="14" y="44" width="36" height="12" rx="2" fill="#78350f"/>
      <path d="M22 44L44 18" stroke="#b45309" stroke-width="5" stroke-linecap="round"/>
      <circle cx="45" cy="16" r="7" fill="#64748b" stroke="#475569" stroke-width="1.5"/>
      <circle cx="20" cy="52" r="4" fill="#451a03"/>
      <circle cx="44" cy="52" r="4" fill="#451a03"/>
      <defs>
        <linearGradient id="bg_t_catapult" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#78350f"/><stop offset="1" stop-color="#18181b"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  castle_ballista: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_ballista)"/>
      <rect x="28" y="24" width="8" height="32" fill="#475569"/>
      <path d="M12 28C22 18 42 18 52 28" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
      <path d="M32 10V46" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <polygon points="32,6 28,12 36,12" fill="#fbbf24"/>
      <defs>
        <linearGradient id="bg_t_ballista" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1e3a8a"/><stop offset="1" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  castle_trebuchet: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_trebuchet)"/>
      <path d="M18 54L32 26L46 54H18Z" fill="#713f12" stroke="#451a03"/>
      <path d="M20 38L48 14" stroke="#92400e" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="12" r="7" fill="#ef4444" stroke="#f97316" stroke-width="2"/>
      <circle cx="50" cy="12" r="3" fill="#fef08a"/>
      <defs>
        <linearGradient id="bg_t_trebuchet" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#7c2d12"/><stop offset="1" stop-color="#18181b"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  renaissance_single_cannon: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_rcannon)"/>
      <circle cx="28" cy="46" r="8" fill="#78350f" stroke="#451a03" stroke-width="2"/>
      <path d="M18 42L48 22" stroke="#d97706" stroke-width="8" stroke-linecap="round"/>
      <rect x="44" y="18" width="6" height="8" rx="1" transform="rotate(-34 44 18)" fill="#b45309"/>
      <circle cx="52" cy="16" r="4" fill="#0f172a"/>
      <defs>
        <linearGradient id="bg_t_rcannon" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#451a03"/><stop offset="1" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  renaissance_double_cannon: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_dblecannon)"/>
      <circle cx="26" cy="48" r="8" fill="#475569"/>
      <path d="M16 38L48 18" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
      <path d="M22 46L54 26" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
      <circle cx="54" cy="14" r="3.5" fill="#ef4444"/>
      <circle cx="58" cy="22" r="3.5" fill="#ef4444"/>
      <defs>
        <linearGradient id="bg_t_dblecannon" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#312e81"/><stop offset="1" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  modern_mg_turret: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_mg)"/>
      <rect x="18" y="34" width="22" height="18" rx="3" fill="#1e293b" stroke="#334155"/>
      <rect x="36" y="36" width="20" height="4" rx="1" fill="#64748b"/>
      <rect x="36" y="44" width="20" height="4" rx="1" fill="#64748b"/>
      <circle cx="58" cy="38" r="2" fill="#facc15"/>
      <circle cx="58" cy="46" r="2" fill="#facc15"/>
      <defs>
        <linearGradient id="bg_t_mg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0f172a"/><stop offset="1" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  modern_missile_turret: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_sam)"/>
      <rect x="16" y="38" width="28" height="16" rx="3" fill="#14532d"/>
      <rect x="22" y="16" width="8" height="24" rx="2" transform="rotate(25 22 16)" fill="#16a34a"/>
      <rect x="34" y="16" width="8" height="24" rx="2" transform="rotate(25 34 16)" fill="#16a34a"/>
      <polygon points="32,10 38,12 34,18" fill="#ef4444"/>
      <polygon points="44,10 50,12 46,18" fill="#ef4444"/>
      <defs>
        <linearGradient id="bg_t_sam" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#14532d"/><stop offset="1" stop-color="#052e16"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  future_plasma_turret: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_plasma)"/>
      <circle cx="28" cy="38" r="12" fill="#0e7490" stroke="#06b6d4" stroke-width="1.5"/>
      <rect x="34" y="32" width="22" height="12" rx="3" fill="#0891b2"/>
      <circle cx="45" cy="38" r="4" fill="#67e8f9"/>
      <circle cx="56" cy="38" r="3" fill="#a5f3fc"/>
      <defs>
        <linearGradient id="bg_t_plasma" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#083344"/><stop offset="1" stop-color="#020617"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  future_ion_turret: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_t_ion)"/>
      <path d="M16 48L28 22H44L52 48Z" fill="#581c87" stroke="#a855f7" stroke-width="1.5"/>
      <circle cx="36" cy="34" r="7" fill="#c084fc"/>
      <rect x="42" y="30" width="16" height="8" rx="2" fill="#9333ea"/>
      <circle cx="58" cy="34" r="3" fill="#f0abfc"/>
      <defs>
        <linearGradient id="bg_t_ion" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#3b0764"/><stop offset="1" stop-color="#09090b"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  slot_empty: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="#0f172a" stroke="#334155" stroke-dasharray="4 3"/>
      <circle cx="32" cy="32" r="14" stroke="#38bdf8" stroke-width="2"/>
      <path d="M32 24V40M24 32H40" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,
  slot_locked: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="#1c1917" stroke="#451a03"/>
      <rect x="22" y="28" width="20" height="18" rx="3" fill="#eab308" stroke="#ca8a04"/>
      <path d="M26 28V22C26 18.7 28.7 16 32 16C35.3 16 38 18.7 38 22V28" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
      <circle cx="32" cy="36" r="2.5" fill="#713f12"/>
    </svg>
  `
};

export const ARMORY_AVATARS = {
  damage: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_up_dmg)"/>
      <path d="M18 46L46 18" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
      <polygon points="46,18 52,14 48,22" fill="#fbbf24"/>
      <path d="M14 42L22 50" stroke="#dc2626" stroke-width="3"/>
      <circle cx="16" cy="48" r="3" fill="#b91c1c"/>
      <path d="M32 32C36 28 42 26 44 22C42 28 46 30 40 34" stroke="#ef4444" stroke-width="2"/>
      <defs>
        <linearGradient id="bg_up_dmg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#7f1d1d"/><stop offset="1" stop-color="#18181b"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  armor: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_up_arm)"/>
      <path d="M20 18C28 16 36 16 44 18C44 32 38 46 32 50C26 46 20 32 20 18Z" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
      <path d="M26 24C30 22 34 22 38 24C38 32 35 40 32 42C29 40 26 32 26 24Z" fill="#3b82f6"/>
      <defs>
        <linearGradient id="bg_up_arm" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1e3a8a"/><stop offset="1" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  economy: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_up_eco)"/>
      <path d="M20 44L44 20" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
      <path d="M38 14L48 24L50 18L44 12L38 14Z" fill="#eab308" stroke="#ca8a04"/>
      <circle cx="20" cy="48" r="4" fill="#fbbf24"/>
      <circle cx="28" cy="50" r="3" fill="#f59e0b"/>
      <defs>
        <linearGradient id="bg_up_eco" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#713f12"/><stop offset="1" stop-color="#1c1917"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  training: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="url(#bg_up_train)"/>
      <path d="M34 10L18 34H32L28 54L46 28H32L34 10Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
      <defs>
        <linearGradient id="bg_up_train" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0369a1"/><stop offset="1" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
    </svg>
  `
};

export const BASE_FORT_AVATAR = `
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="10" fill="url(#bg_fort)"/>
    <rect x="16" y="32" width="32" height="24" fill="#475569" stroke="#334155" stroke-width="1.5"/>
    <rect x="12" y="24" width="10" height="16" fill="#64748b"/>
    <rect x="42" y="24" width="10" height="16" fill="#64748b"/>
    <polygon points="12,24 17,16 22,24" fill="#3b82f6"/>
    <polygon points="42,24 47,16 52,24" fill="#3b82f6"/>
    <path d="M26 42H38V56H26V42Z" fill="#1e293b"/>
    <defs>
      <linearGradient id="bg_fort" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1e293b"/><stop offset="1" stop-color="#020617"/>
      </linearGradient>
    </defs>
  </svg>
`;

export function getUnitAvatarSvg(unitKey) {
  return UNIT_AVATARS[unitKey] || `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="#1e293b"/>
      <circle cx="32" cy="32" r="16" fill="#38bdf8"/>
    </svg>
  `;
}

export function getTurretAvatarSvg(turretKey) {
  return TURRET_AVATARS[turretKey] || TURRET_AVATARS.slot_empty;
}

export function getArmoryAvatarSvg(upgradeKey) {
  return ARMORY_AVATARS[upgradeKey] || ARMORY_AVATARS.damage;
}

export function getBaseFortAvatarSvg() {
  return BASE_FORT_AVATAR;
}

