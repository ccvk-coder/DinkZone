function formatClock(time) {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}
function shortHour(h) {
  if (h === 12) return '12p';
  if (h === 0 || h === 24) return '12a';
  return h > 12 ? `${h - 12}p` : `${h}a`;
}
export { formatClock, shortHour };
