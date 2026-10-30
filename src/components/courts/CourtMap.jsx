import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../contexts/AppContext';
import { availabilityLevel } from './AvailabilityPill';
import { peso } from '../../utils/format';
const pinColors = {
  high: { bg: '#15803D', fg: '#FFFFFF' },
  low: { bg: '#B45309', fg: '#FFFFFF' },
  none: { bg: '#6B7A70', fg: '#FFFFFF' }
};
function pinIcon(venue, active) {
  const level = availabilityLevel(venue.openNow);
  const c = active ? { bg: '#D4F23A', fg: '#0B1F17' } : pinColors[level];
  const glyph = level === 'none' ? '\xD7' : level === 'low' ? '!' : '\u2713';
  const html = `<div style="transform:translate(-50%,-100%);position:absolute;left:0;top:0;display:flex;flex-direction:column;align-items:center;">
    <div style="display:flex;align-items:center;gap:4px;white-space:nowrap;background:${c.bg};color:${c.fg};font:700 12px Inter,system-ui;padding:5px 9px;border-radius:999px;box-shadow:0 4px 12px rgba(0,0,0,.25);border:2px solid ${active ? '#0E3B2C' : '#fff'};${active ? 'transform:scale(1.1)' : ''}">
      <span aria-hidden="true" style="font-size:10px;opacity:.9">${glyph}</span>${peso(venue.pricePerHour)}
    </div>
    <div style="width:2px;height:6px;background:${active ? '#0E3B2C' : '#fff'}"></div>
  </div>`;
  return L.divIcon({ html, className: 'dz-pin', iconSize: [0, 0] });
}
const userIcon = L.divIcon({
  className: 'dz-pin',
  iconSize: [0, 0],
  html: `<div style="position:absolute;left:-9px;top:-9px;width:18px;height:18px;">
    <span class="pin-pulse" style="position:absolute;inset:0;border-radius:999px;background:rgba(29,107,78,.45)"></span>
    <span style="position:absolute;inset:2px;border-radius:999px;background:#0E3B2C;border:3px solid #D4F23A"></span>
  </div>`
});
function FlyTo({ venue }) {
  const map = useMap();
  useEffect(() => {
    if (venue) map.flyTo([venue.lat, venue.lng], Math.max(map.getZoom(), 14), { duration: 0.45 });
  }, [venue, map]);
  return null;
}
function FitOnUser({ user }) {
  const map = useMap();
  useEffect(() => {
    map.setView([user.lat, user.lng], 13, { animate: true });
  }, [user.lat, user.lng, map]);
  return null;
}
function InvalidateOnResize() {
  const map = useMap();
  useEffect(() => {
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map]);
  return null;
}
function CourtMap({ venues, user, selectedId, highlightId, onSelect, className }) {
  const { theme } = useApp();
  const selected = useMemo(() => venues.find((v) => v.id === selectedId), [venues, selectedId]);
  const tiles =
    theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  return (
    <div className={`isolate ${className ?? ''}`}>
      <MapContainer
        center={[user.lat, user.lng]}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
        attributionControl
      >
        <TileLayer
          key={theme}
          url={tiles}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO'
        />
        <FitOnUser user={user} />
        <FlyTo venue={selected} />
        <InvalidateOnResize />
        <Marker position={[user.lat, user.lng]} icon={userIcon} interactive={false} />
        {venues.map((v) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            icon={pinIcon(v, v.id === selectedId || v.id === highlightId)}
            zIndexOffset={v.id === selectedId ? 1e3 : 0}
            eventHandlers={{ click: () => onSelect(v.id) }}
            title={`${v.name}, ${v.openNow} slots open`}
            keyboard
          />
        ))}
      </MapContainer>
    </div>
  );
}
function MapLegend() {
  return (
    <div className="flex items-center gap-3 rounded-full bg-card/95 px-3 py-1.5 text-[11px] font-medium shadow-md backdrop-blur">
      <span className="flex items-center gap-1">
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#15803D] text-[8px] text-white">
          ✓
        </span>
        Open
      </span>
      <span className="flex items-center gap-1">
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#B45309] text-[8px] text-white">
          !
        </span>
        Few left
      </span>
      <span className="flex items-center gap-1">
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#6B7A70] text-[8px] text-white">
          ×
        </span>
        Full
      </span>
    </div>
  );
}
export { CourtMap, MapLegend };
