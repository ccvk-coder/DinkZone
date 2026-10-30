import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaultPlace } from '../data/places';
import { defaultNfcCards, defaultPaymentCards, defaultUser } from '../data/user';
import { isWithinCebu } from '../utils/geo';
import { usePersistentState } from '../hooks/usePersistentState';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
const AppContext = createContext(null);
const fallbackLocation = {
  lat: defaultPlace.lat,
  lng: defaultPlace.lng,
  label: defaultPlace.label,
  source: 'default'
};
function AppProvider({ children }) {
  const [theme, setTheme] = usePersistentState('theme', 'light');
  const [onboarded, setOnboarded] = usePersistentState('onboarded', false);
  const [role, setRole] = usePersistentState('role', 'player');
  const [location, setLocation] = usePersistentState('location', fallbackLocation);
  const [gpsStatus, setGpsStatus] = useState('idle');
  const [user, setUser] = useState(defaultUser);
  const [nfcCards, setNfcCards] = usePersistentState('nfc', defaultNfcCards);
  const [savedVenues, setSavedVenues] = usePersistentState('saved', ['v-itpark', 'v-kasambagan']);
  const online = useOnlineStatus();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  const applyPosition = useCallback(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      if (!isWithinCebu(latitude, longitude)) {
        setLocation(fallbackLocation);
        return 'outside';
      }
      setLocation({ lat: latitude, lng: longitude, label: 'Current location', source: 'gps' });
      return 'granted';
    },
    [setLocation]
  );
  const requestGps = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setGpsStatus('unsupported');
      return Promise.resolve('unsupported');
    }
    setGpsStatus('prompting');
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const status = applyPosition(pos);
          setGpsStatus(status);
          resolve(status);
        },
        () => {
          setGpsStatus('denied');
          resolve('denied');
        },
        { enableHighAccuracy: true, timeout: 1e4, maximumAge: 6e4 }
      );
    });
  }, [applyPosition]);
  useEffect(() => {
    if (gpsStatus !== 'granted' || location.source !== 'gps') return;
    const id = navigator.geolocation.watchPosition((pos) => applyPosition(pos), void 0, {
      enableHighAccuracy: true,
      maximumAge: 15e3
    });
    return () => navigator.geolocation.clearWatch(id);
  }, [gpsStatus, location.source, applyPosition]);
  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
      onboarded,
      completeOnboarding: () => setOnboarded(true),
      role,
      setRole,
      location,
      gpsStatus,
      requestGps,
      setManualLocation: (place) =>
        setLocation({ lat: place.lat, lng: place.lng, label: place.label, source: 'manual' }),
      user,
      updateUser: (patch) => setUser((u) => ({ ...u, ...patch })),
      nfcCards,
      addNfcCard: (card) => setNfcCards((c) => [...c, card]),
      removeNfcCard: (id) => setNfcCards((c) => c.filter((x) => x.id !== id)),
      paymentCards: defaultPaymentCards,
      savedVenues,
      toggleSavedVenue: (id) =>
        setSavedVenues((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
      online
    }),
    [
      theme,
      onboarded,
      role,
      location,
      gpsStatus,
      requestGps,
      user,
      nfcCards,
      savedVenues,
      online,
      setTheme,
      setOnboarded,
      setRole,
      setLocation,
      setNfcCards,
      setSavedVenues
    ]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
export { AppProvider, useApp };
