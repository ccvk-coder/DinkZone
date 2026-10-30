import { seeded, toLocalISO } from './slots';
import { shortHour } from './clock';
const periodOptions = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' }
];
const periodCompareHint = {
  today: 'vs yesterday',
  week: 'vs last week',
  month: 'vs last month'
};
const PERIOD_DAYS = { today: 1, week: 7, month: 30 };
const HOURS_PER_BOOKING = 1.35;
function periodSummary(list, period, now = /* @__PURE__ */ new Date()) {
  const days = PERIOD_DAYS[period];
  const current = totalsFor(list, 0, days, now);
  const previous = totalsFor(list, -days, days, now);
  const occ = current.capacity ? current.hours / current.capacity : 0;
  const prevOcc = previous.capacity ? previous.hours / previous.capacity : 0;
  return {
    ...current,
    occupancy: occ,
    series: seriesFor(list, period, now),
    delta: {
      bookings: pct(current.bookings, previous.bookings),
      revenue: pct(current.revenue, previous.revenue),
      occupancy: pct(occ, prevOcc),
      hours: pct(current.hours, previous.hours),
      cancelled: pct(current.cancelled, previous.cancelled)
    }
  };
}
function performanceRows(list, period, now = /* @__PURE__ */ new Date()) {
  const days = PERIOD_DAYS[period];
  if (list.length > 1) {
    return list.map((v) => {
      const t2 = totalsFor([v], 0, days, now);
      return {
        id: v.id,
        label: v.name,
        detail: `${v.courts} courts \xB7 ${v.setting}`,
        bookings: t2.bookings,
        hours: t2.hours,
        revenue: t2.revenue,
        occupancy: t2.capacity ? t2.hours / t2.capacity : 0
      };
    });
  }
  const venue = list[0];
  if (!venue) return [];
  const t = totalsFor([venue], 0, days, now);
  const weights = Array.from(
    { length: venue.courts },
    (_, i) => 0.75 + seeded(`court|${venue.id}|${i}`) * 0.5
  );
  const sum = weights.reduce((s, w) => s + w, 0);
  const courtCapacity = (venue.closeHour - venue.openHour) * days;
  return weights.map((w, i) => {
    const hours = Math.min(courtCapacity, Math.round((t.hours * w) / sum));
    return {
      id: `${venue.id}-c${i + 1}`,
      label: `Court ${i + 1}`,
      detail: venue.surface,
      bookings: Math.round(hours / HOURS_PER_BOOKING),
      hours,
      revenue: Math.round((t.revenue * w) / sum),
      occupancy: courtCapacity ? hours / courtCapacity : 0
    };
  });
}
function ancillaryRevenue(list, period, now = /* @__PURE__ */ new Date()) {
  const t = totalsFor(list, 0, PERIOD_DAYS[period], now);
  const key = `${list.map((v) => v.id).join(',')}|${period}`;
  return {
    rentals: Math.round(t.bookings * (95 + seeded(`rent|${key}`) * 40)),
    shop: Math.round(t.bookings * (120 + seeded(`shop|${key}`) * 80))
  };
}
function periodRangeLabel(period, now = /* @__PURE__ */ new Date()) {
  const fmt = (d) => d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
  if (period === 'today')
    return now.toLocaleDateString('en-PH', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  const start = addDays(now, -(PERIOD_DAYS[period] - 1));
  return `${fmt(start)} \u2013 ${fmt(now)}, ${now.getFullYear()}`;
}
function mixShare(key, min, spread) {
  return min + seeded(key) * spread;
}
function seriesFor(list, period, now) {
  if (period === 'today') {
    return Array.from({ length: 18 }, (_, i) => {
      const h = 6 + i;
      const point = list.reduce(
        (acc, v) => {
          const s = hourStats(v, now, h);
          return {
            hours: acc.hours + s.hours,
            revenue: acc.revenue + s.revenue,
            capacity: acc.capacity + s.capacity
          };
        },
        { hours: 0, revenue: 0, capacity: 0 }
      );
      return { label: shortHour(h), ...point };
    });
  }
  const days = PERIOD_DAYS[period];
  return Array.from({ length: days }, (_, i) => {
    const date = addDays(now, -(days - 1 - i));
    const s = dayStats(list, date);
    const label =
      period === 'week'
        ? date.toLocaleDateString('en-PH', { weekday: 'short' })
        : date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
    return { label, ...s };
  });
}
function totalsFor(list, endOffset, days, now) {
  let hours = 0;
  let revenue = 0;
  let capacity = 0;
  for (let i = 0; i < days; i++) {
    const s = dayStats(list, addDays(now, endOffset - i));
    hours += s.hours;
    revenue += s.revenue;
    capacity += s.capacity;
  }
  const bookings = Math.round(hours / HOURS_PER_BOOKING);
  const key = `${list.map((v) => v.id).join(',')}|${endOffset}|${days}`;
  const cancelled = Math.round(bookings * (0.035 + seeded(`cx|${key}`) * 0.05));
  return { bookings, hours, revenue, capacity, cancelled };
}
function dayStats(list, date) {
  let hours = 0;
  let revenue = 0;
  let capacity = 0;
  for (const v of list) {
    for (let h = v.openHour; h < v.closeHour; h++) {
      const s = hourStats(v, date, h);
      hours += s.hours;
      revenue += s.revenue;
      capacity += s.capacity;
    }
  }
  return { hours, revenue, capacity };
}
function hourStats(venue, date, h) {
  if (h < venue.openHour || h >= venue.closeHour) return { hours: 0, revenue: 0, capacity: 0 };
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  const jitter = (seeded(`${venue.id}|${toLocalISO(date)}|${h}`) - 0.5) * 0.26;
  const rate = Math.max(0, Math.min(1, hourDemand(h) * (weekend ? 1.12 : 1) + jitter));
  const hours = Math.round(venue.courts * rate);
  const price = h >= 17 && h < 21 ? venue.peakPrice : venue.pricePerHour;
  return { hours, revenue: hours * price, capacity: venue.courts };
}
function hourDemand(h) {
  if (h >= 17 && h < 21) return 0.9;
  if (h >= 6 && h < 9) return 0.66;
  if (h >= 21) return 0.5;
  if (h >= 11 && h < 14) return 0.42;
  return 0.32;
}
function addDays(base, n) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}
function pct(a, b) {
  if (!b) return 0;
  return Math.round(((a - b) / b) * 100);
}
export {
  ancillaryRevenue,
  mixShare,
  performanceRows,
  periodCompareHint,
  periodOptions,
  periodRangeLabel,
  periodSummary
};
