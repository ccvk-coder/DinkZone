import { useEffect, useState } from 'react';
function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => (target ? Math.max(0, target - Date.now()) : 0));
  useEffect(() => {
    if (!target) {
      setRemaining(0);
      return;
    }
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1e3);
    return () => window.clearInterval(id);
  }, [target]);
  return remaining;
}
function formatCountdown(ms) {
  const total = Math.ceil(ms / 1e3);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
export { formatCountdown, useCountdown };
