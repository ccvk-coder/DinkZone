import { format, parseISO } from 'date-fns';
function peso(value) {
  return `\u20B1${Math.round(value).toLocaleString('en-PH')}`;
}
function formatHour(hour) {
  const h = hour % 24;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display} ${suffix}`;
}
function formatRange(startHour, hours) {
  return `${formatHour(startHour)} \u2013 ${formatHour(startHour + hours)}`;
}
function formatDate(iso, pattern = 'EEE, MMM d') {
  return format(parseISO(iso), pattern);
}
function toISODate(date) {
  return format(date, 'yyyy-MM-dd');
}
function shortId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
function compactPeso(value) {
  if (value >= 1e6) return `\u20B1${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `\u20B1${(value / 1e3).toFixed(value >= 1e4 ? 0 : 1)}K`;
  return peso(value);
}
export { compactPeso, formatDate, formatHour, formatRange, peso, shortId, toISODate };
