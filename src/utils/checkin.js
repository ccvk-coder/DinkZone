function slotWindow(booking) {
  const start = /* @__PURE__ */ new Date(`${booking.date}T00:00:00`);
  start.setHours(booking.startHour, 0, 0, 0);
  const validFrom = new Date(start.getTime() - 15 * 60 * 1e3);
  const validTo = new Date(start.getTime() + booking.hours * 60 * 60 * 1e3);
  return { validFrom, validTo, start };
}
function getPassState(booking, now = /* @__PURE__ */ new Date(), scannerVenueId) {
  if (booking.status === 'Cancelled' || booking.status === 'No-show') return 'cancelled';
  if (booking.status === 'Checked-in') return 'checked-in';
  if (scannerVenueId && scannerVenueId !== booking.venueId) return 'wrong-court';
  const { validFrom, validTo } = slotWindow(booking);
  if (booking.status === 'Completed' || now > validTo) return 'expired';
  if (now < validFrom) return 'upcoming';
  return 'ready';
}
function qrPayload(booking) {
  const { validFrom, validTo } = slotWindow(booking);
  const sig = btoa(`${booking.code}${booking.venueId}${booking.court}`).slice(0, 10);
  return `DZ1|${booking.code}|${booking.venueId}|C${booking.court}|${validFrom.toISOString()}|${validTo.toISOString()}|${sig}`;
}
function isUpcoming(booking, now = /* @__PURE__ */ new Date()) {
  const { validTo } = slotWindow(booking);
  return validTo > now && (booking.status === 'Confirmed' || booking.status === 'Checked-in');
}
export { getPassState, isUpcoming, qrPayload, slotWindow };
