import { venues } from '../data/venues';
import { playerNames } from '../data/user';
import { hourPrice, seeded, toLocalISO } from './slots';
const payments = ['gcash', 'card', 'maya', 'venue', 'gcash', 'card'];
function addDays(base, days) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}
function generateAdminBookings(count = 64, now = /* @__PURE__ */ new Date()) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const r = (k) => seeded(`adm|${i}|${k}`);
    const venue = venues[Math.floor(r('v') * venues.length)];
    const dayOffset = i < 34 ? 0 : Math.floor(r('d') * 7) - 3;
    const date = addDays(now, dayOffset);
    const span = venue.closeHour - venue.openHour - 1;
    const startHour = venue.openHour + Math.floor(r('h') * span);
    const hours = r('len') > 0.75 ? 2 : 1;
    const isPast = dayOffset < 0 || (dayOffset === 0 && startHour + hours <= now.getHours());
    const isNow =
      dayOffset === 0 && startHour <= now.getHours() && startHour + hours > now.getHours();
    const s = r('s');
    let status;
    if (isPast) status = s < 0.72 ? 'Completed' : s < 0.86 ? 'No-show' : 'Cancelled';
    else if (isNow) status = s < 0.8 ? 'Checked-in' : 'Confirmed';
    else status = s < 0.88 ? 'Confirmed' : 'Cancelled';
    const payment = payments[Math.floor(r('p') * payments.length)];
    const players = r('pl') > 0.3 ? 4 : 2;
    const paddle = r('pd') > 0.6 ? 2 : 0;
    const court = 1 + Math.floor(r('c') * venue.courts);
    const base = hourPrice(venue, startHour, date) * hours;
    const total = base + paddle * 150 + (r('b') > 0.7 ? 180 : 0);
    const created = addDays(date, -Math.ceil(r('cr') * 5));
    list.push({
      id: `bk-${1e3 + i}`,
      code: `DZ-${(48213 + i * 37).toString(36).toUpperCase()}`,
      venueId: venue.id,
      court,
      date: toLocalISO(date),
      startHour,
      hours,
      players,
      addOns: { paddle, balls: 0, water: 0 },
      total,
      payment,
      paymentStatus:
        status === 'Cancelled' ? 'Refunded' : payment === 'venue' ? 'Pay at venue' : 'Paid',
      status,
      playerName: playerNames[Math.floor(r('n') * playerNames.length)],
      createdAt: created.toISOString()
    });
  }
  return list.sort((a, b) =>
    a.date === b.date ? a.startHour - b.startHour : a.date.localeCompare(b.date)
  );
}
function initialPlayerBookings(now = /* @__PURE__ */ new Date()) {
  const today = toLocalISO(now);
  const startNow = Math.min(Math.max(now.getHours(), 6), 22);
  return [
    {
      id: 'my-1',
      code: 'DZ-7KQ2M',
      venueId: 'v-itpark',
      court: 3,
      date: today,
      startHour: startNow,
      hours: 1,
      players: 4,
      addOns: { paddle: 2, balls: 1, water: 4 },
      total: 1240,
      payment: 'gcash',
      paymentStatus: 'Paid',
      status: 'Confirmed',
      playerName: 'Migs Villanueva',
      createdAt: addDays(now, -2).toISOString()
    },
    {
      id: 'my-2',
      code: 'DZ-9PL4X',
      venueId: 'v-ayala',
      court: 2,
      date: toLocalISO(addDays(now, 3)),
      startHour: 17,
      hours: 2,
      players: 4,
      addOns: { paddle: 0, balls: 0, water: 0 },
      total: 1500,
      payment: 'card',
      paymentStatus: 'Paid',
      status: 'Confirmed',
      playerName: 'Migs Villanueva',
      createdAt: addDays(now, -1).toISOString()
    },
    {
      id: 'my-3',
      code: 'DZ-3HT8B',
      venueId: 'v-kasambagan',
      court: 5,
      date: toLocalISO(addDays(now, -4)),
      startHour: 19,
      hours: 1,
      players: 4,
      addOns: { paddle: 0, balls: 1, water: 0 },
      total: 830,
      payment: 'maya',
      paymentStatus: 'Paid',
      status: 'Completed',
      playerName: 'Migs Villanueva',
      createdAt: addDays(now, -6).toISOString()
    },
    {
      id: 'my-4',
      code: 'DZ-2WD6N',
      venueId: 'v-banilad',
      court: 1,
      date: toLocalISO(addDays(now, -9)),
      startHour: 7,
      hours: 2,
      players: 2,
      addOns: { paddle: 0, balls: 0, water: 0 },
      total: 840,
      payment: 'gcash',
      paymentStatus: 'Paid',
      status: 'Completed',
      playerName: 'Migs Villanueva',
      createdAt: addDays(now, -11).toISOString()
    },
    {
      id: 'my-5',
      code: 'DZ-5RM1C',
      venueId: 'v-srp',
      court: 4,
      date: toLocalISO(addDays(now, -14)),
      startHour: 18,
      hours: 1,
      players: 4,
      addOns: { paddle: 0, balls: 0, water: 0 },
      total: 700,
      payment: 'card',
      paymentStatus: 'Refunded',
      status: 'Cancelled',
      playerName: 'Migs Villanueva',
      createdAt: addDays(now, -16).toISOString()
    }
  ];
}
export { generateAdminBookings, initialPlayerBookings };
