import { useCallback, useMemo, useState } from 'react';
import { addOns } from '../data/addOns';
import { getVenueSlots, toLocalISO } from '../utils/slots';
import { useCountdown } from './useCountdown';
const HOLD_MS = 5 * 60 * 1e3;
const MAX_HOURS = 3;
function useBookingFlow(venue, initial) {
  const [step, setStep] = useState(2);
  const [date, setDateState] = useState(initial.date ?? toLocalISO(/* @__PURE__ */ new Date()));
  const [court, setCourt] = useState(initial.court ?? (initial.hour != null ? 1 : null));
  const [hours, setHours] = useState(initial.hour != null ? [initial.hour] : []);
  const [activeCourt, setActiveCourt] = useState(initial.court ?? 1);
  const [players, setPlayers] = useState(4);
  const [extras, setExtras] = useState({ paddle: 0, balls: 0, water: 0 });
  const [payment, setPayment] = useState('gcash');
  const [holdUntil, setHoldUntil] = useState(null);
  const remaining = useCountdown(holdUntil);
  const holdExpired = holdUntil !== null && remaining === 0;
  const rows = useMemo(() => (venue ? getVenueSlots(venue, date) : []), [venue, date]);
  const setDate = useCallback((d) => {
    setDateState(d);
    setHours([]);
    setCourt(null);
  }, []);
  const toggleSlot = useCallback(
    (c, h) => {
      if (c !== court) {
        setCourt(c);
        setHours([h]);
        return;
      }
      setHours((prev) => {
        if (prev.includes(h)) {
          if (h === prev[0] || h === prev[prev.length - 1]) {
            const next = prev.filter((x) => x !== h);
            if (next.length === 0) setCourt(null);
            return next;
          }
          return [h];
        }
        const min = prev[0];
        const max = prev[prev.length - 1];
        if (prev.length < MAX_HOURS && (h === min - 1 || h === max + 1))
          return [...prev, h].sort((a, b) => a - b);
        return [h];
      });
    },
    [court]
  );
  const courtPrice = useMemo(() => {
    if (!court) return 0;
    return hours.reduce((sum, h) => {
      const row = rows.find((r) => r[0].hour === h);
      return sum + (row?.[court - 1]?.price ?? 0);
    }, 0);
  }, [court, hours, rows]);
  const extrasTotal = addOns.reduce((sum, a) => sum + extras[a.id] * a.price, 0);
  const serviceFee = court ? 25 : 0;
  const total = courtPrice + extrasTotal + serviceFee;
  const startHold = () => setHoldUntil(Date.now() + HOLD_MS);
  const releaseHold = () => setHoldUntil(null);
  return {
    step,
    setStep,
    date,
    setDate,
    court,
    hours,
    activeCourt,
    setActiveCourt,
    toggleSlot,
    rows,
    players,
    setPlayers,
    extras,
    setExtras,
    payment,
    setPayment,
    remaining,
    holdUntil,
    holdExpired,
    startHold,
    releaseHold,
    courtPrice,
    extrasTotal,
    serviceFee,
    total
  };
}
export { useBookingFlow };
