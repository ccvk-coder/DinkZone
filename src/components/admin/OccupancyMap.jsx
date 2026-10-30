import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet';
import { venues } from '../../data/venues';
import { useApp } from '../../contexts/AppContext';
import { occupancy } from '../../utils/analytics';
function colorFor(rate) {
  if (rate >= 0.8) return '#B91C1C';
  if (rate >= 0.6) return '#D97706';
  if (rate >= 0.4) return '#65A30D';
  return '#15803D';
}
function OccupancyMap({ bookings }) {
  const { theme } = useApp();
  return (
    <div className="isolate h-full w-full">
      <MapContainer
        center={[10.322, 123.9]}
        zoom={12}
        className="h-full w-full"
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          key={theme}
          url={
            theme === 'dark'
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          }
          attribution="&copy; OpenStreetMap &copy; CARTO"
        />
        {venues.map((v) => {
          const rate = occupancy(bookings, v);
          return (
            <CircleMarker
              key={v.id}
              center={[v.lat, v.lng]}
              radius={8 + v.courts * 2.2}
              pathOptions={{
                color: colorFor(rate),
                fillColor: colorFor(rate),
                fillOpacity: 0.35 + rate * 0.4,
                weight: 2
              }}
            >
              <Tooltip direction="top">
                <strong>{v.name}</strong>
                <br />
                {Math.round(rate * 100)}% occupied · {v.courts} courts
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
function OccupancyLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      {[
        ['#15803D', '< 40%'],
        ['#65A30D', '40\u201360%'],
        ['#D97706', '60\u201380%'],
        ['#B91C1C', '80%+']
      ].map(([c, l]) => (
        <li key={l} className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ background: c }} aria-hidden />
          {l}
        </li>
      ))}
    </ul>
  );
}
export { OccupancyLegend, OccupancyMap };
