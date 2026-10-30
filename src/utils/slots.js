function seeded(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1e4) / 1e4;
}
function isPeakHour(hour, date) {
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  return (hour >= 17 && hour < 21) || (weekend && hour >= 7 && hour < 10);
}
function hourPrice(venue, hour, date) {
  return isPeakHour(hour, date) ? venue.peakPrice : venue.pricePerHour;
}
function getVenueSlots(venue, dateISO, now = /* @__PURE__ */ new Date()) {
  const date = /* @__PURE__ */ new Date(`${dateISO}T00:00:00`);
  const isToday = dateISO === toLocalISO(now);
  const rows = [];
  for (let hour = venue.openHour; hour < venue.closeHour; hour++) {
    const row = [];
    const peak = isPeakHour(hour, date);
    for (let court = 1; court <= venue.courts; court++) {
      const r = seeded(`${venue.id}|${dateISO}|${court}|${hour}`);
      const bookedChance = peak ? 0.82 : hour < 9 ? 0.35 : 0.28;
      let status = peak ? 'peak' : 'available';
      if (isToday && hour <= now.getHours()) status = 'past';
      else if (venue.id === 'v-kasambagan' && court === 8 && hour >= 10 && hour < 12)
        status = 'maintenance';
      else if (r < bookedChance) status = 'booked';
      row.push({ court, hour, status, price: hourPrice(venue, hour, date) });
    }
    rows.push(row);
  }
  return rows;
}
function openSlotsNow(venue, now = /* @__PURE__ */ new Date()) {
  const hour = now.getHours();
  const dateISO = toLocalISO(now);
  let count = 0;
  for (const h of [hour + 1, hour + 2]) {
    if (h < venue.openHour || h >= venue.closeHour) continue;
    const peak = isPeakHour(h, now);
    for (let court = 1; court <= venue.courts; court++) {
      const r = seeded(`${venue.id}|${dateISO}|${court}|${h}`);
      if (r >= (peak ? 0.82 : 0.28)) count++;
    }
  }
  return count;
}
function countOpenSlots(venue, dateISO, fromHour, toHour) {
  return getVenueSlots(venue, dateISO)
    .flat()
    .filter(
      (c) =>
        c.hour >= fromHour && c.hour < toHour && (c.status === 'available' || c.status === 'peak')
    ).length;
}
function toLocalISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
export { countOpenSlots, getVenueSlots, hourPrice, isPeakHour, openSlotsNow, seeded, toLocalISO };
