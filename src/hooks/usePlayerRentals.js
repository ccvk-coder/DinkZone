import { useCallback } from 'react';
import { usePersistentState } from './usePersistentState';
import { useBookings } from '../contexts/BookingsContext';
import { rentalItems } from '../data/rentals';
import { shortId } from '../utils/format';
function rentalTotal(lines) {
  return lines.reduce(
    (s, l) => s + (rentalItems.find((i) => i.id === l.itemId)?.rate ?? 0) * l.qty,
    0
  );
}
function fromBooking(b, lines, status, code) {
  return {
    id: `rent-${b.id}-${code}`,
    code,
    bookingId: b.id,
    venueId: b.venueId,
    court: b.court,
    date: b.date,
    startHour: b.startHour,
    hours: b.hours,
    items: lines,
    total: rentalTotal(lines),
    status,
    createdAt: /* @__PURE__ */ new Date().toISOString()
  };
}
function seed(bookings) {
  const out = [];
  const live = bookings.find((b) => b.id === 'my-1');
  const past = bookings.find((b) => b.id === 'my-3');
  if (live)
    out.push(
      fromBooking(
        live,
        [
          { itemId: 'r-paddle', qty: 2 },
          { itemId: 'r-balls', qty: 1 }
        ],
        'Picked up',
        'RN-7K2P'
      )
    );
  if (past)
    out.push(
      fromBooking(
        past,
        [
          { itemId: 'r-premium', qty: 2 },
          { itemId: 'r-towel', qty: 2 }
        ],
        'Returned',
        'RN-3QW9'
      )
    );
  return out;
}
function usePlayerRentals() {
  const { bookings } = useBookings();
  const [rentals, setRentals] = usePersistentState('player-rentals', () => seed(bookings));
  const reserve = useCallback(
    (booking, lines) => {
      const rental = fromBooking(booking, lines, 'Reserved', shortId('RN'));
      setRentals((list) => [rental, ...list]);
      return rental;
    },
    [setRentals]
  );
  const cancel = useCallback(
    (id) =>
      setRentals((list) => list.map((r) => (r.id === id ? { ...r, status: 'Cancelled' } : r))),
    [setRentals]
  );
  return { rentals, reserve, cancel };
}
export { rentalTotal, usePlayerRentals };
