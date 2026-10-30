const EARTH_RADIUS_KM = 6371;
function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}
function travelEstimate(km) {
  const mode = km < 1.2 ? 'walk' : 'drive';
  const speed = mode === 'walk' ? 4.5 : 20;
  const minutes = Math.max(2, Math.round((km / speed) * 60));
  const distance = km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km)} km`;
  return { distance, minutes, mode, label: `${distance} \xB7 ${minutes} min` };
}
const CEBU_CENTER = { lat: 10.311, lng: 123.893 };
function isWithinCebu(lat, lng) {
  return haversineKm(lat, lng, CEBU_CENTER.lat, CEBU_CENTER.lng) < 40;
}
export { CEBU_CENTER, haversineKm, isWithinCebu, travelEstimate };
