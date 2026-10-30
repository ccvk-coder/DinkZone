const scanTotalsToday = [
  { method: 'QR', count: 42, rejected: 3 },
  { method: 'NFC', count: 27, rejected: 1 },
  { method: 'Manual', count: 5, rejected: 0 }
];
const recentScans = [
  {
    id: 's-1',
    time: '18:04',
    playerName: 'Bea Villareal',
    court: 3,
    code: 'DZ-12XK9',
    method: 'NFC',
    outcome: 'Checked in'
  },
  {
    id: 's-2',
    time: '17:58',
    playerName: 'Paolo Dizon',
    court: 1,
    code: 'DZ-12Y4R',
    method: 'QR',
    outcome: 'Checked in'
  },
  {
    id: 's-3',
    time: '17:55',
    playerName: 'Kim Alcantara',
    court: 5,
    code: 'DZ-11ZQ2',
    method: 'QR',
    outcome: 'Wrong court'
  },
  {
    id: 's-4',
    time: '17:51',
    playerName: 'Joaquin Reyes',
    court: 2,
    code: 'DZ-12P8M',
    method: 'NFC',
    outcome: 'Checked in'
  },
  {
    id: 's-5',
    time: '17:02',
    playerName: 'Ria Fernandez',
    court: 4,
    code: 'DZ-12M3T',
    method: 'QR',
    outcome: 'Checked in'
  },
  {
    id: 's-6',
    time: '16:59',
    playerName: 'Mark Uy',
    court: 6,
    code: 'DZ-11W7D',
    method: 'QR',
    outcome: 'Expired'
  },
  {
    id: 's-7',
    time: '16:57',
    playerName: 'Lianne Go',
    court: 6,
    code: 'DZ-12L1F',
    method: 'Manual',
    outcome: 'Checked in'
  },
  {
    id: 's-8',
    time: '16:03',
    playerName: 'Carlo Tan',
    court: 1,
    code: 'DZ-12H5B',
    method: 'NFC',
    outcome: 'Checked in'
  }
];
const counterSales = [
  { id: 'cs-1', time: '18:06', productId: 'b-x40', qty: 3, payment: 'GCash' },
  { id: 'cs-2', time: '17:48', productId: 'x-overgrip', qty: 2, payment: 'Cash' },
  { id: 'cs-3', time: '17:31', productId: 'a-tee', qty: 1, payment: 'Card' },
  { id: 'cs-4', time: '16:52', productId: 'p-starter', qty: 1, payment: 'Card' },
  { id: 'cs-5', time: '16:20', productId: 'b-dura', qty: 2, payment: 'Maya' },
  { id: 'cs-6', time: '15:44', productId: 'x-wrist', qty: 1, payment: 'Cash' },
  { id: 'cs-7', time: '14:10', productId: 'a-visor', qty: 1, payment: 'GCash' },
  { id: 'cs-8', time: '11:35', productId: 'b-x40', qty: 2, payment: 'Cash' },
  { id: 'cs-9', time: '09:12', productId: 'x-edge', qty: 1, payment: 'GCash' }
];
const courtFeesCollectedToday = { amount: 8400, transactions: 14 };
export { counterSales, courtFeesCollectedToday, recentScans, scanTotalsToday };
