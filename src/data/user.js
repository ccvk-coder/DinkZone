const defaultUser = {
  name: 'Migs Villanueva',
  handle: '@migsdinks',
  email: 'migs.villanueva@gmail.com',
  phone: '+63 917 812 4420',
  skill: 'Intermediate',
  rating: 3.72,
  memberSince: 'March 2025',
  stats: { matches: 142, wins: 87, tournaments: 6, hoursPlayed: 214, cityRank: 38 }
};
const defaultNfcCards = [
  {
    id: 'nfc-1',
    label: 'DinkZone member card',
    last4: '7F2A',
    type: 'card',
    addedAt: 'Aug 14, 2026'
  }
];
const defaultPaymentCards = [
  { id: 'pm-1', label: 'GCash', detail: '0917 \u2022\u2022\u2022 4420', kind: 'gcash' },
  { id: 'pm-2', label: 'BPI Visa', detail: '\u2022\u2022\u2022\u2022 8812', kind: 'card' }
];
const notifications = [
  {
    id: 'n1',
    title: 'Your court is in 1 hour',
    body: 'The Kitchen at IT Park \xB7 Court 3. Your QR goes live 15 min before.',
    time: '12 min ago',
    read: false,
    icon: 'alarm-clock'
  },
  {
    id: 'n2',
    title: 'Cebu Open: 5 slots left in 3.5 Doubles',
    body: 'Registration closes Nov 7. \u20B1300,000 prize pool.',
    time: '2 h ago',
    read: false,
    icon: 'trophy'
  },
  {
    id: 'n3',
    title: 'Order ready for pickup',
    body: 'Your Franklin X-40 balls are waiting at Kasambagan Sports Hub.',
    time: 'Yesterday',
    read: true,
    icon: 'package-check'
  }
];
const staffMembers = [
  {
    id: 's1',
    name: 'Andrea Lopez',
    email: 'andrea@dinkzone.ph',
    role: 'Super Admin',
    venue: 'All venues',
    lastActive: 'Now',
    status: 'Active'
  },
  {
    id: 's2',
    name: 'Ramon Uy',
    email: 'ramon@kitchenitpark.ph',
    role: 'Venue Owner',
    venue: 'The Kitchen at IT Park',
    lastActive: '5 min ago',
    status: 'Active'
  },
  {
    id: 's3',
    name: 'Cheska Lim',
    email: 'cheska@kasambaganhub.ph',
    role: 'Venue Owner',
    venue: 'Kasambagan Sports Hub',
    lastActive: '1 h ago',
    status: 'Active'
  },
  {
    id: 's4',
    name: 'Jun Alcantara',
    email: 'jun@kitchenitpark.ph',
    role: 'Front Desk',
    venue: 'The Kitchen at IT Park',
    lastActive: 'Now',
    status: 'Active'
  },
  {
    id: 's5',
    name: 'Pia Navarro',
    email: 'pia@ayalaskycourt.ph',
    role: 'Front Desk',
    venue: 'Ayala Skycourt',
    lastActive: '20 min ago',
    status: 'Active'
  },
  {
    id: 's6',
    name: 'Coach Benjie Ramos',
    email: 'benjie@dinkzone.ph',
    role: 'Coach',
    venue: 'Banilad Dink Club',
    lastActive: 'Yesterday',
    status: 'Active'
  },
  {
    id: 's7',
    name: 'Lea Yap',
    email: 'lea@srpcourts.ph',
    role: 'Front Desk',
    venue: 'SRP Seaside Courts',
    lastActive: '\u2014',
    status: 'Invited'
  },
  {
    id: 's8',
    name: 'Toto Garcia',
    email: 'toto@pardocourts.ph',
    role: 'Front Desk',
    venue: 'Pardo Covered Courts',
    lastActive: '3 weeks ago',
    status: 'Suspended'
  }
];
const rolePermissions = [
  { permission: 'View all venues', superAdmin: true, owner: false, desk: false },
  { permission: 'Edit venue & pricing', superAdmin: true, owner: true, desk: false },
  { permission: 'Manage bookings', superAdmin: true, owner: true, desk: true },
  { permission: 'Scan & check in players', superAdmin: true, owner: true, desk: true },
  { permission: 'Create tournaments', superAdmin: true, owner: true, desk: false },
  { permission: 'Issue refunds', superAdmin: true, owner: true, desk: false },
  { permission: 'Manage staff & roles', superAdmin: true, owner: false, desk: false }
];
const playerNames = [
  'Paolo Reyes',
  'Trish Mendoza',
  'Kenji Abellana',
  'Gelo Sarmiento',
  'Carlo Villamor',
  'Rafa Dizon',
  'Bea Gonzales',
  'Nina Ocampo',
  'Mark Tan',
  'Ian Cabrera',
  'Lito Flores',
  'Rico Bautista',
  'Ana Lim',
  'Joy Pacquiao',
  'Dana Kho',
  'Mae Torres',
  'Jasper Go',
  'Kat Sy',
  'Miko Dela Cruz',
  'Bianca Uy',
  'Enzo Chiong',
  'Sam Gaisano',
  'Lia Osme\xF1a',
  'Vince Aboitiz'
];
export {
  defaultNfcCards,
  defaultPaymentCards,
  defaultUser,
  notifications,
  playerNames,
  rolePermissions,
  staffMembers
};
