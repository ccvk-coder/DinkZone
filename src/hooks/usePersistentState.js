import { useEffect, useState } from 'react';
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(`dinkzone:${key}`);
      if (raw) return JSON.parse(raw);
    } catch {}
    return typeof initial === 'function' ? initial() : initial;
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(`dinkzone:${key}`, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}
export { usePersistentState };
