const rentalItems = [
  {
    id: 'r-paddle',
    name: 'Standard paddle',
    detail: 'Graphite, per session',
    icon: 'hand',
    rate: 150,
    fleet: 24,
    out: 9,
    maintenance: 2,
    rentedToday: 31
  },
  {
    id: 'r-premium',
    name: 'Premium paddle',
    detail: 'Carbon fiber, per session',
    icon: 'sparkles',
    rate: 300,
    fleet: 8,
    out: 3,
    maintenance: 0,
    rentedToday: 11
  },
  {
    id: 'r-balls',
    name: 'Ball set',
    detail: '3 indoor balls, per session',
    icon: 'circle-dot',
    rate: 80,
    fleet: 30,
    out: 6,
    maintenance: 1,
    rentedToday: 22
  },
  {
    id: 'r-shoes',
    name: 'Court shoes',
    detail: 'Sizes 6\u201312, per session',
    icon: 'footprints',
    rate: 200,
    fleet: 12,
    out: 2,
    maintenance: 1,
    rentedToday: 5
  },
  {
    id: 'r-towel',
    name: 'Towel',
    detail: 'Freshly laundered',
    icon: 'shirt',
    rate: 50,
    fleet: 40,
    out: 7,
    maintenance: 0,
    rentedToday: 18
  },
  {
    id: 'r-locker',
    name: 'Locker',
    detail: 'Keyed, per visit',
    icon: 'lock',
    rate: 60,
    fleet: 20,
    out: 11,
    maintenance: 0,
    rentedToday: 14
  }
];
const rentalRecordsToday = [
  {
    id: 'rr-1',
    itemId: 'r-paddle',
    playerName: 'Bea Villareal',
    court: 3,
    qty: 2,
    since: '18:00',
    due: '19:00'
  },
  {
    id: 'rr-2',
    itemId: 'r-premium',
    playerName: 'Paolo Dizon',
    court: 1,
    qty: 2,
    since: '18:00',
    due: '20:00'
  },
  {
    id: 'rr-3',
    itemId: 'r-balls',
    playerName: 'Joaquin Reyes',
    court: 2,
    qty: 1,
    since: '17:50',
    due: '19:00'
  },
  {
    id: 'rr-4',
    itemId: 'r-paddle',
    playerName: 'Ria Fernandez',
    court: 4,
    qty: 4,
    since: '17:00',
    due: '18:00'
  },
  {
    id: 'rr-5',
    itemId: 'r-shoes',
    playerName: 'Lianne Go',
    court: 6,
    qty: 1,
    since: '17:00',
    due: '18:00'
  },
  {
    id: 'rr-6',
    itemId: 'r-towel',
    playerName: 'Carlo Tan',
    court: 1,
    qty: 2,
    since: '16:00',
    due: '18:00'
  },
  {
    id: 'rr-7',
    itemId: 'r-paddle',
    playerName: 'Mika Santos',
    court: 2,
    qty: 4,
    since: '15:00',
    due: '16:00',
    returnedAt: '16:04',
    condition: 'Good'
  },
  {
    id: 'rr-8',
    itemId: 'r-balls',
    playerName: 'Mika Santos',
    court: 2,
    qty: 1,
    since: '15:00',
    due: '16:00',
    returnedAt: '16:04',
    condition: 'Good'
  },
  {
    id: 'rr-9',
    itemId: 'r-premium',
    playerName: 'Gab Navarro',
    court: 5,
    qty: 1,
    since: '14:00',
    due: '15:00',
    returnedAt: '15:10',
    condition: 'Damaged'
  },
  {
    id: 'rr-10',
    itemId: 'r-shoes',
    playerName: 'Tina Abad',
    court: 3,
    qty: 1,
    since: '10:00',
    due: '12:00',
    returnedAt: '11:58',
    condition: 'Good'
  },
  {
    id: 'rr-11',
    itemId: 'r-paddle',
    playerName: 'Ken Yba\xF1ez',
    court: 1,
    qty: 2,
    since: '07:00',
    due: '08:00',
    returnedAt: '08:02',
    condition: 'Good'
  },
  {
    id: 'rr-12',
    itemId: 'r-locker',
    playerName: 'Ken Yba\xF1ez',
    court: 1,
    qty: 1,
    since: '07:00',
    due: '08:00',
    returnedAt: '08:05',
    condition: 'Good'
  }
];
export { rentalItems, rentalRecordsToday };
