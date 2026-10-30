import { images } from './images';
const cebuTeams = [
  {
    id: 't1',
    name: 'Kitchen Kings',
    players: ['Paolo Reyes', 'Kenji Abellana'],
    rating: 4.6,
    seed: 1
  },
  {
    id: 't2',
    name: 'Lechon Lobbers',
    players: ['Trish Mendoza', 'Gelo Sarmiento'],
    rating: 4.5,
    seed: 2
  },
  {
    id: 't3',
    name: 'Sugbo Smash',
    players: ['Carlo Villamor', 'Rafa Dizon'],
    rating: 4.4,
    seed: 3
  },
  {
    id: 't4',
    name: 'Dink Responsibly',
    players: ['Bea Gonzales', 'Nina Ocampo'],
    rating: 4.3,
    seed: 4
  },
  { id: 't5', name: 'Third Shot Drop', players: ['Mark Tan', 'Ian Cabrera'], rating: 4.2, seed: 5 },
  {
    id: 't6',
    name: 'Erne & Bert',
    players: ['Lito Flores', 'Rico Bautista'],
    rating: 4.1,
    seed: 6
  },
  { id: 't7', name: 'Mango Volley', players: ['Ana Lim', 'Joy Pacquiao'], rating: 4, seed: 7 },
  { id: 't8', name: 'Net Results', players: ['Dana Kho', 'Mae Torres'], rating: 3.9, seed: 8 }
];
const previewMatches = [
  { id: 'm1', round: 1, teamA: 't1', teamB: 't8', court: 1, time: '9:00 AM' },
  { id: 'm2', round: 1, teamA: 't4', teamB: 't5', court: 2, time: '9:00 AM' },
  { id: 'm3', round: 1, teamA: 't3', teamB: 't6', court: 3, time: '9:00 AM' },
  { id: 'm4', round: 1, teamA: 't2', teamB: 't7', court: 4, time: '9:00 AM' },
  { id: 'm5', round: 2, court: 1, time: '1:00 PM' },
  { id: 'm6', round: 2, court: 2, time: '1:00 PM' },
  { id: 'm7', round: 3, court: 1, time: '4:00 PM' }
];
const standardRules = [
  'Rally scoring to 11, win by 2. Finals are best of three games to 15.',
  'USA Pickleball 2026 rulebook applies; certified referees for semifinals and finals.',
  'Approved paddles only. Paddles are checked at registration.',
  'Teams must check in with their QR pass 30 minutes before their first match.'
];
const tournaments = [
  {
    id: 'cebu-open-2026',
    name: 'Cebu Open 2026',
    status: 'upcoming',
    venueId: 'v-kasambagan',
    date: '2026-11-14',
    endDate: '2026-11-15',
    entryFee: 2500,
    prizePool: 3e5,
    prizes: [
      { place: '1st', amount: 15e4 },
      { place: '2nd', amount: 9e4 },
      { place: '3rd', amount: 6e4 }
    ],
    skill: ['Intermediate', 'Advanced'],
    formats: ['Doubles', 'Mixed'],
    divisions: [
      {
        id: 'd-open-dbl',
        name: "Open Men's Doubles",
        skill: 'Advanced',
        format: 'Doubles',
        slots: 32,
        filled: 27
      },
      {
        id: 'd-open-mix',
        name: 'Open Mixed Doubles',
        skill: 'Advanced',
        format: 'Mixed',
        slots: 32,
        filled: 22
      },
      {
        id: 'd-int-dbl',
        name: '3.5 Doubles',
        skill: 'Intermediate',
        format: 'Doubles',
        slots: 32,
        filled: 30
      }
    ],
    banner: images.indoor,
    rules: standardRules,
    schedule: [
      { time: 'Sat 7:00 AM', label: 'Check-in & paddle inspection' },
      { time: 'Sat 8:00 AM', label: 'Pool play \u2014 all divisions' },
      { time: 'Sun 9:00 AM', label: 'Quarterfinals' },
      { time: 'Sun 1:00 PM', label: 'Semifinals' },
      { time: 'Sun 4:00 PM', label: 'Finals & awarding' }
    ],
    sponsors: ['JOOLA', 'Selkirk', 'Smart', 'Ayala Malls', 'Pocari Sweat'],
    teams: cebuTeams,
    matches: previewMatches,
    organizer: 'Cebu Pickleball Association'
  },
  {
    id: 'queen-city-classic',
    name: 'Queen City Doubles Classic',
    status: 'upcoming',
    venueId: 'v-itpark',
    date: '2026-11-28',
    endDate: '2026-11-28',
    entryFee: 1800,
    prizePool: 15e4,
    prizes: [
      { place: '1st', amount: 75e3 },
      { place: '2nd', amount: 45e3 },
      { place: '3rd', amount: 3e4 }
    ],
    skill: ['Beginner', 'Intermediate'],
    formats: ['Doubles'],
    divisions: [
      {
        id: 'd-qc-30',
        name: '3.0 Doubles',
        skill: 'Beginner',
        format: 'Doubles',
        slots: 24,
        filled: 15
      },
      {
        id: 'd-qc-35',
        name: '3.5 Doubles',
        skill: 'Intermediate',
        format: 'Doubles',
        slots: 24,
        filled: 19
      }
    ],
    banner: images.covered,
    rules: standardRules,
    schedule: [
      { time: '7:30 AM', label: 'Check-in' },
      { time: '8:30 AM', label: 'Round robin' },
      { time: '2:00 PM', label: 'Playoffs' },
      { time: '6:00 PM', label: 'Finals & awarding' }
    ],
    sponsors: ['Franklin', 'GCash', 'Cebu IT Park'],
    teams: cebuTeams,
    matches: previewMatches,
    organizer: 'The Kitchen at IT Park'
  },
  {
    id: 'srp-sunset-mixed',
    name: 'SRP Sunset Mixed Bash',
    status: 'upcoming',
    venueId: 'v-srp',
    date: '2026-12-06',
    endDate: '2026-12-06',
    entryFee: 1e3,
    prizePool: 5e4,
    prizes: [
      { place: '1st', amount: 25e3 },
      { place: '2nd', amount: 15e3 },
      { place: '3rd', amount: 1e4 }
    ],
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    formats: ['Mixed', 'Singles'],
    divisions: [
      {
        id: 'd-srp-mix',
        name: 'Mixed Doubles (all levels)',
        skill: 'Intermediate',
        format: 'Mixed',
        slots: 16,
        filled: 9
      },
      {
        id: 'd-srp-sgl',
        name: 'Open Singles',
        skill: 'Advanced',
        format: 'Singles',
        slots: 16,
        filled: 6
      }
    ],
    banner: images.night,
    rules: standardRules,
    schedule: [
      { time: '2:00 PM', label: 'Check-in' },
      { time: '3:00 PM', label: 'Pool play' },
      { time: '6:00 PM', label: 'Sunset finals' }
    ],
    sponsors: ['Maya', 'Il Corso', 'Onix'],
    teams: cebuTeams,
    matches: previewMatches,
    organizer: 'SRP Seaside Courts'
  },
  {
    id: 'ayala-thursday-showdown',
    name: 'Skycourt Thursday Showdown',
    status: 'live',
    venueId: 'v-ayala',
    date: '2026-10-22',
    endDate: '2026-10-22',
    entryFee: 800,
    prizePool: 25e3,
    prizes: [
      { place: '1st', amount: 12500 },
      { place: '2nd', amount: 7500 },
      { place: '3rd', amount: 5e3 }
    ],
    skill: ['Intermediate'],
    formats: ['Doubles'],
    divisions: [
      {
        id: 'd-ats',
        name: '3.5\u20134.0 Doubles',
        skill: 'Intermediate',
        format: 'Doubles',
        slots: 8,
        filled: 8
      }
    ],
    banner: images.rooftop,
    rules: standardRules,
    schedule: [
      { time: '5:00 PM', label: 'Quarterfinals' },
      { time: '7:00 PM', label: 'Semifinals' },
      { time: '8:30 PM', label: 'Final' }
    ],
    sponsors: ['Ayala Malls', 'Pocari Sweat'],
    teams: cebuTeams,
    matches: [
      {
        id: 'm1',
        round: 1,
        teamA: 't1',
        teamB: 't8',
        scoreA: [11, 11],
        scoreB: [6, 8],
        court: 1,
        time: '5:00 PM'
      },
      {
        id: 'm2',
        round: 1,
        teamA: 't4',
        teamB: 't5',
        scoreA: [9, 11, 11],
        scoreB: [11, 7, 9],
        court: 2,
        time: '5:00 PM'
      },
      {
        id: 'm3',
        round: 1,
        teamA: 't3',
        teamB: 't6',
        scoreA: [11, 12],
        scoreB: [5, 10],
        court: 3,
        time: '5:00 PM'
      },
      {
        id: 'm4',
        round: 1,
        teamA: 't2',
        teamB: 't7',
        scoreA: [11, 11],
        scoreB: [3, 9],
        court: 4,
        time: '5:00 PM'
      },
      {
        id: 'm5',
        round: 2,
        teamA: 't1',
        teamB: 't4',
        scoreA: [11, 7],
        scoreB: [8, 9],
        court: 1,
        time: '7:00 PM',
        live: true
      },
      {
        id: 'm6',
        round: 2,
        teamA: 't3',
        teamB: 't2',
        scoreA: [6],
        scoreB: [4],
        court: 2,
        time: '7:00 PM',
        live: true
      },
      { id: 'm7', round: 3, court: 1, time: '8:30 PM' }
    ],
    organizer: 'Ayala Skycourt'
  },
  {
    id: 'banilad-beginner-cup',
    name: 'Banilad Beginner Cup',
    status: 'past',
    venueId: 'v-banilad',
    date: '2026-10-04',
    endDate: '2026-10-04',
    entryFee: 600,
    prizePool: 15e3,
    prizes: [
      { place: '1st', amount: 8e3 },
      { place: '2nd', amount: 4500 },
      { place: '3rd', amount: 2500 }
    ],
    skill: ['Beginner'],
    formats: ['Doubles'],
    divisions: [
      {
        id: 'd-bbc',
        name: '2.5\u20133.0 Doubles',
        skill: 'Beginner',
        format: 'Doubles',
        slots: 8,
        filled: 8
      }
    ],
    banner: images.covered,
    rules: standardRules,
    schedule: [{ time: '8:00 AM', label: 'Single elimination' }],
    sponsors: ['Banilad Town Centre'],
    teams: cebuTeams,
    matches: [
      { id: 'm1', round: 1, teamA: 't1', teamB: 't8', scoreA: [11, 11], scoreB: [4, 7] },
      { id: 'm2', round: 1, teamA: 't4', teamB: 't5', scoreA: [7, 11, 8], scoreB: [11, 9, 11] },
      { id: 'm3', round: 1, teamA: 't3', teamB: 't6', scoreA: [11, 11], scoreB: [9, 6] },
      { id: 'm4', round: 1, teamA: 't2', teamB: 't7', scoreA: [11, 13], scoreB: [8, 11] },
      { id: 'm5', round: 2, teamA: 't1', teamB: 't5', scoreA: [11, 11], scoreB: [6, 9] },
      { id: 'm6', round: 2, teamA: 't3', teamB: 't2', scoreA: [8, 11, 11], scoreB: [11, 6, 9] },
      { id: 'm7', round: 3, teamA: 't1', teamB: 't3', scoreA: [15, 12, 15], scoreB: [11, 15, 13] }
    ],
    organizer: 'Banilad Dink Club'
  }
];
const leaderboard = [
  {
    rank: 1,
    name: 'Paolo Reyes',
    handle: '@paolodinks',
    rating: 4.71,
    wins: 48,
    losses: 9,
    points: 2840,
    trend: 0
  },
  {
    rank: 2,
    name: 'Trish Mendoza',
    handle: '@trishm',
    rating: 4.66,
    wins: 44,
    losses: 11,
    points: 2715,
    trend: 1
  },
  {
    rank: 3,
    name: 'Kenji Abellana',
    handle: '@kenji.a',
    rating: 4.58,
    wins: 41,
    losses: 12,
    points: 2602,
    trend: -1
  },
  {
    rank: 4,
    name: 'Carlo Villamor',
    handle: '@carlov',
    rating: 4.51,
    wins: 39,
    losses: 14,
    points: 2480,
    trend: 2
  },
  {
    rank: 5,
    name: 'Bea Gonzales',
    handle: '@beagonz',
    rating: 4.47,
    wins: 37,
    losses: 15,
    points: 2391,
    trend: 0
  },
  {
    rank: 6,
    name: 'Rafa Dizon',
    handle: '@rafad',
    rating: 4.42,
    wins: 35,
    losses: 16,
    points: 2288,
    trend: -2
  },
  {
    rank: 7,
    name: 'Gelo Sarmiento',
    handle: '@gelo',
    rating: 4.38,
    wins: 33,
    losses: 17,
    points: 2190,
    trend: 1
  },
  {
    rank: 8,
    name: 'Nina Ocampo',
    handle: '@ninao',
    rating: 4.31,
    wins: 30,
    losses: 18,
    points: 2054,
    trend: 3
  },
  {
    rank: 9,
    name: 'Mark Tan',
    handle: '@marktan',
    rating: 4.27,
    wins: 29,
    losses: 20,
    points: 1987,
    trend: -1
  },
  {
    rank: 10,
    name: 'Ian Cabrera',
    handle: '@iancab',
    rating: 4.22,
    wins: 27,
    losses: 21,
    points: 1910,
    trend: 0
  }
];
export { leaderboard, tournaments };
