import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { generateAdminBookings, initialPlayerBookings } from '../utils/mockBookings';
const BookingsContext = createContext(null);
function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState(() => initialPlayerBookings());
  const [adminBookings, setAdminBookings] = useState(() => generateAdminBookings());
  const [registrations, setRegistrations] = useState([]);
  const updateBooking = useCallback((id, patch) => {
    const apply = (list) => list.map((b) => (b.id === id ? { ...b, ...patch } : b));
    setBookings(apply);
    setAdminBookings(apply);
  }, []);
  const allBookings = useMemo(() => [...bookings, ...adminBookings], [bookings, adminBookings]);
  const value = useMemo(
    () => ({
      bookings,
      allBookings,
      addBooking: (b) => setBookings((list) => [b, ...list]),
      updateBooking,
      findByCode: (code) =>
        allBookings.find((b) => b.code.toLowerCase() === code.trim().toLowerCase()),
      registrations,
      addRegistration: (r) => setRegistrations((list) => [r, ...list])
    }),
    [bookings, allBookings, updateBooking, registrations]
  );
  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
}
function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error('useBookings must be used inside BookingsProvider');
  return ctx;
}
export { BookingsProvider, useBookings };
