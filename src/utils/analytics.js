import { venues } from '../data/venues';
import { seeded, toLocalISO } from './slots';
function todaysBookings(list) {
  const today = toLocalISO(/* @__PURE__ */ new Date());
  return list.filter((b) => b.date === today);
}
function revenueOf(list) {
  return list.filter((b) => b.status !== 'Cancelled').reduce((s, b) => s + b.total, 0);
}
function occupancy(list, venue) {
  const scope = venue ? [venue] : venues;
  const capacity = scope.reduce((s, v) => s + v.courts * (v.closeHour - v.openHour), 0);
  const used = list
    .filter((b) => b.status !== 'Cancelled' && (!venue || b.venueId === venue.id))
    .reduce((s, b) => s + b.hours, 0);
  return Math.min(0.97, (used / capacity) * 9 + (venue ? seeded(venue.id) * 0.35 : 0.18));
}
function revenueSeries(days = 14) {
  return Array.from({ length: days }, (_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    const base = weekend ? 168e3 : 118e3;
    return {
      day: d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }),
      courts: Math.round(base + seeded(`rev${i}`) * 42e3),
      shop: Math.round(18e3 + seeded(`shop${i}`) * 16e3 + (weekend ? 9e3 : 0))
    };
  });
}
function utilizationByHour() {
  return Array.from({ length: 18 }, (_, i) => {
    const h = 6 + i;
    const curve = h >= 17 && h < 21 ? 0.88 : h >= 6 && h < 9 ? 0.62 : h >= 21 ? 0.48 : 0.34;
    const label = h === 12 ? '12p' : h > 12 ? `${h - 12}p` : `${h}a`;
    return { hour: label, rate: Math.round((curve + seeded(`u${h}`) * 0.1) * 100) };
  });
}
function heatGrid() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, di) => ({
    day,
    values: Array.from({ length: 18 }, (_, i) => {
      const h = 6 + i;
      const weekend = di >= 5;
      const base = h >= 17 && h < 21 ? 0.85 : weekend && h < 11 ? 0.8 : h < 9 ? 0.55 : 0.3;
      return Math.min(1, base + seeded(`hg${di}${h}`) * 0.18);
    })
  }));
}
function toCsv(rows) {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  return [headers.join(','), ...rows.map((r) => headers.map((h) => esc(r[h])).join(','))].join(
    '\n'
  );
}
function downloadFile(name, content, type = 'text/csv') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
export {
  downloadFile,
  heatGrid,
  occupancy,
  revenueOf,
  revenueSeries,
  toCsv,
  todaysBookings,
  utilizationByHour
};
