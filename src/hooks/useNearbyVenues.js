import { useMemo } from 'react';
import { venues } from '../data/venues';
import { useApp } from '../contexts/AppContext';
import { haversineKm } from '../utils/geo';
import { countOpenSlots, openSlotsNow, toLocalISO } from '../utils/slots';
const defaultFilters = () => ({
  maxKm: 0,
  maxPrice: 0,
  setting: 'all',
  lights: false,
  availableNow: false,
  date: toLocalISO(/* @__PURE__ */ new Date()),
  timeOfDay: 'any'
});
const timeWindows = {
  any: [0, 24],
  morning: [6, 12],
  afternoon: [12, 17],
  evening: [17, 24]
};
function activeFilterCount(f) {
  const today = toLocalISO(/* @__PURE__ */ new Date());
  return [
    f.maxKm > 0,
    f.maxPrice > 0,
    f.setting !== 'all',
    f.lights,
    f.availableNow,
    f.date !== today,
    f.timeOfDay !== 'any'
  ].filter(Boolean).length;
}
function computeNearby(origin, filters, query) {
  const today = toLocalISO(/* @__PURE__ */ new Date());
  const useNow = filters.date === today && filters.timeOfDay === 'any';
  const [from, to] = timeWindows[filters.timeOfDay];
  const q = query.trim().toLowerCase();
  return venues
    .map((v) => ({
      ...v,
      distanceKm: haversineKm(origin.lat, origin.lng, v.lat, v.lng),
      openNow: useNow ? openSlotsNow(v) : countOpenSlots(v, filters.date, from, to)
    }))
    .filter((v) => (q ? `${v.name} ${v.neighborhood}`.toLowerCase().includes(q) : true))
    .filter((v) => (filters.maxKm ? v.distanceKm <= filters.maxKm : true))
    .filter((v) => (filters.maxPrice ? v.pricePerHour <= filters.maxPrice : true))
    .filter((v) => (filters.setting === 'all' ? true : v.setting === filters.setting))
    .filter((v) => (filters.lights ? v.amenities.includes('lights') : true))
    .filter((v) => (filters.availableNow ? v.openNow > 0 : true))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
function useNearbyVenues(filters, query) {
  const { location } = useApp();
  return useMemo(() => computeNearby(location, filters, query), [location, filters, query]);
}
function useVenueDistance(venueId) {
  const { location } = useApp();
  return useMemo(
    () => computeNearby(location, defaultFilters(), '').find((v) => v.id === venueId),
    [location, venueId]
  );
}
export {
  activeFilterCount,
  computeNearby,
  defaultFilters,
  timeWindows,
  useNearbyVenues,
  useVenueDistance
};
