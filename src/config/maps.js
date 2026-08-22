export const BATTLE_MAPS = {
  map_primeval_valley: {
    id: 'map_primeval_valley',
    nameVi: 'Thung Lũng Cổ Đại',
    subtitleVi: 'Thảo nguyên xanh ngát, khí hậu trong lành',
    icon: '🌿',
    weatherType: 'clear', // 'clear' | 'snow' | 'sandstorm' | 'ember'
    groundColor: '#365314',
    groundSubColor: '#1a2e05',
    roadColor: '#78350f',
    distantColor: '#1e3a5f',
    midColor: '#166534',
    skyColors: {
      1: ['#3b1808', '#782d12', '#ea580c'],
      2: ['#1e3a8a', '#38bdf8', '#bae6fd'],
      3: ['#1c1917', '#78350f', '#d97706'],
      4: ['#0f172a', '#334155', '#64748b'],
      5: ['#030712', '#312e81', '#a855f7']
    }
  },

  map_red_dunes: {
    id: 'map_red_dunes',
    nameVi: 'Sa Mạc Bão Cát',
    subtitleVi: 'Cát đỏ mênh mông, bão bụi cuộn bay',
    icon: '🏜️',
    weatherType: 'sandstorm',
    groundColor: '#7c2d12',
    groundSubColor: '#451a03',
    roadColor: '#9a3412',
    distantColor: '#7c2d12',
    midColor: '#c2410c',
    skyColors: {
      1: ['#451a03', '#9a3412', '#ea580c'],
      2: ['#7c2d12', '#c2410c', '#fb923c'],
      3: ['#3f1a0a', '#854d0e', '#ca8a04'],
      4: ['#1c1917', '#44403c', '#78716c'],
      5: ['#180828', '#581c87', '#ec4899']
    }
  },

  map_frozen_tundra: {
    id: 'map_frozen_tundra',
    nameVi: 'Tundra Băng Giá',
    subtitleVi: 'Núi băng vĩnh cửu, bão tuyết lất phất',
    icon: '❄️',
    weatherType: 'snow',
    groundColor: '#0f2942',
    groundSubColor: '#081726',
    roadColor: '#38bdf8',
    distantColor: '#1e3a8a',
    midColor: '#0284c7',
    skyColors: {
      1: ['#0c4a6e', '#0284c7', '#7dd3fc'],
      2: ['#1e3a8a', '#60a5fa', '#e0f2fe'],
      3: ['#0f172a', '#38bdf8', '#bae6fd'],
      4: ['#020617', '#1e293b', '#64748b'],
      5: ['#020617', '#1e1b4b', '#818cf8']
    }
  },

  map_volcanic_rift: {
    id: 'map_volcanic_rift',
    nameVi: 'Vực Thẳm Dung Nham',
    subtitleVi: 'Dung nham nóng chảy, tàn tro khói lửa',
    icon: '🌋',
    weatherType: 'ember',
    groundColor: '#450a0a',
    groundSubColor: '#260404',
    roadColor: '#dc2626',
    distantColor: '#450a0a',
    midColor: '#991b1b',
    skyColors: {
      1: ['#450a0a', '#991b1b', '#ef4444'],
      2: ['#3b0764', '#9333ea', '#f43f5e'],
      3: ['#1c1917', '#7f1d1d', '#f97316'],
      4: ['#09090b', '#27272a', '#52525b'],
      5: ['#050505', '#450a0a', '#e11d48']
    }
  }
};

export const DEFAULT_MAP_ID = 'map_primeval_valley';
