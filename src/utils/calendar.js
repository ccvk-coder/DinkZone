import { slotWindow } from './checkin';
function icsDate(d) {
  return d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}
function downloadCalendarEvent(booking, venue) {
  const { start, validTo } = slotWindow(booking);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DinkZone//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${booking.code}@dinkzone.ph`,
    `DTSTAMP:${icsDate(/* @__PURE__ */ new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(validTo)}`,
    `SUMMARY:Pickleball \xB7 ${venue.name} (Court ${booking.court})`,
    `LOCATION:${venue.address}, Cebu City`,
    `DESCRIPTION:Booking ${booking.code}. Open your DinkZone pass to check in.`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `dinkzone-${booking.code}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
export { downloadCalendarEvent };
