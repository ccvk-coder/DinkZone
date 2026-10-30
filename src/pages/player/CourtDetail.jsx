import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { IconButton } from '../../components/ui/IconButton';
import { Rating } from '../../components/ui/Rating';
import { AmenityIcons } from '../../components/courts/AmenityIcons';
import { AvailabilityPill } from '../../components/courts/AvailabilityPill';
import { useApp } from '../../contexts/AppContext';
import { useVenueDistance } from '../../hooks/useNearbyVenues';
import { tournaments } from '../../data/tournaments';
import { getVenueSlots, toLocalISO } from '../../utils/slots';
import { travelEstimate } from '../../utils/geo';
import { compactPeso, formatDate, formatHour, peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
const venuePin = L.divIcon({
  className: 'dz-pin',
  iconSize: [0, 0],
  html: '<div style="position:absolute;left:-12px;top:-12px;width:24px;height:24px;border-radius:999px;background:#0E3B2C;border:4px solid #D4F23A;box-shadow:0 4px 10px rgba(0,0,0,.3)"></div>'
});
function CourtDetail() {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { savedVenues, toggleSavedVenue, theme } = useApp();
  const venue = useVenueDistance(venueId);
  const todayStrip = useMemo(() => {
    if (!venue) return [];
    const now = /* @__PURE__ */ new Date().getHours();
    return getVenueSlots(venue, toLocalISO(/* @__PURE__ */ new Date()))
      .filter((row) => row[0].hour > now)
      .slice(0, 8)
      .map((row) => ({
        hour: row[0].hour,
        open: row.filter((c) => c.status === 'available' || c.status === 'peak').length,
        peak: row[0].status === 'peak' || row.some((c) => c.status === 'peak')
      }));
  }, [venue]);
  if (!venue) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          title="Court not found"
          action={<Button onClick={() => navigate('/courts')}>Browse courts</Button>}
        />
      </div>
    );
  }
  const travel = travelEstimate(venue.distanceKm);
  const saved = savedVenues.includes(venue.id);
  const events = tournaments.filter((t) => t.venueId === venue.id && t.status !== 'past');
  return (
    <div className="mx-auto w-full max-w-6xl pb-24 md:px-8 md:pb-28 lg:pb-12">
      <div className="relative">
        <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:mt-6 md:grid md:grid-cols-[2fr_1fr] md:grid-rows-2 md:gap-2 md:overflow-hidden md:rounded-lg">
          {venue.gallery.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt={i === 0 ? `${venue.name} courts` : ''}
              className={cn(
                'aspect-[4/3] w-full shrink-0 snap-center object-cover sm:aspect-[16/9] md:aspect-auto md:h-full',
                i === 0 ? 'md:row-span-2 md:h-[380px]' : 'md:h-[186px]',
                i > 2 && 'md:hidden'
              )}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 md:hidden">
          <IconButton icon="arrow-left" label="Back" tone="overlay" onClick={() => navigate(-1)} />
          <div className="flex gap-2">
            <IconButton
              icon="share-2"
              label="Share"
              tone="overlay"
              onClick={() => toast({ title: 'Link copied', tone: 'success' })}
            />
            <IconButton
              icon="heart"
              label={saved ? 'Unsave' : 'Save'}
              tone="overlay"
              onClick={() => toggleSavedVenue(venue.id)}
              className={saved ? 'text-highlight' : ''}
            />
          </div>
        </div>
        {venue.gallery.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white md:hidden">
            {venue.gallery.length} photos
          </span>
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-8 px-4 md:px-0 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/courts"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <Icon name="arrow-left" className="h-4 w-4" aria-hidden /> All courts
            </Link>
            <div className="ml-auto flex gap-1">
              <IconButton
                icon="share-2"
                label="Share"
                onClick={() => toast({ title: 'Link copied', tone: 'success' })}
              />
              <IconButton
                icon="heart"
                label={saved ? 'Unsave' : 'Save'}
                onClick={() => toggleSavedVenue(venue.id)}
                className={saved ? 'text-destructive' : ''}
              />
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-court dark:text-highlight">
            {venue.setting} · {venue.surface}
          </p>
          <h1 className="mt-1 text-[32px] font-extrabold leading-[1.05] md:text-5xl">
            {venue.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Rating value={venue.rating} count={venue.reviews} size="md" />
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Icon
                name={travel.mode === 'walk' ? 'footprints' : 'car'}
                className="h-4 w-4"
                aria-hidden
              />
              {travel.label}
            </span>
            <span className="text-muted-foreground">{venue.courts} courts</span>
            <AvailabilityPill count={venue.openNow} />
          </div>
          <section className="mt-8" aria-labelledby="today-heading">
            <div className="flex items-end justify-between">
              <h2 id="today-heading" className="text-xl font-bold">
                Open today
              </h2>
              <Link
                to={`/book/${venue.id}`}
                className="text-sm font-semibold text-court hover:underline dark:text-highlight"
              >
                Full schedule
              </Link>
            </div>
            {todayStrip.length === 0 ? (
              <p className="mt-3 rounded-md bg-muted p-4 text-sm text-muted-foreground">
                Closed for the rest of today. Tomorrow opens at {formatHour(venue.openHour)}.
              </p>
            ) : (
              <ul className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-8 md:px-0">
                {todayStrip.map((s) => (
                  <li key={s.hour} className="shrink-0">
                    <button
                      type="button"
                      disabled={s.open === 0}
                      onClick={() => navigate(`/book/${venue.id}?hour=${s.hour}`)}
                      className="pressable flex min-h-[64px] w-[76px] flex-col items-center justify-center rounded-md border border-border bg-card hover:border-court disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 md:w-full"
                    >
                      <span className="text-sm font-semibold tabular">{formatHour(s.hour)}</span>
                      <span
                        className={cn(
                          'mt-0.5 inline-flex items-center gap-1 text-[11px]',
                          s.open === 0
                            ? 'text-muted-foreground'
                            : s.open <= 1
                              ? 'text-warning'
                              : 'text-success'
                        )}
                      >
                        {s.peak && s.open > 0 && (
                          <Icon name="flame" className="h-3 w-3" aria-hidden />
                        )}
                        {s.open === 0 ? 'Full' : `${s.open} open`}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="mt-8" aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-xl font-bold">
              About
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{venue.description}</p>
            <AmenityIcons amenities={venue.amenities} withLabels className="mt-4" />
          </section>
          {events.length > 0 && (
            <section className="mt-8" aria-labelledby="events-heading">
              <h2 id="events-heading" className="text-xl font-bold">
                Tournaments here
              </h2>
              <ul className="mt-3 space-y-2">
                {events.map((t) => (
                  <li key={t.id}>
                    <Link
                      to={`/events/${t.id}`}
                      className="pressable flex items-center gap-4 rounded-lg border border-border bg-card p-3 hover:border-court"
                    >
                      <Icon
                        name="trophy"
                        className="h-5 w-5 text-court dark:text-highlight"
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(t.date)}</p>
                      </div>
                      <span className="font-display text-lg font-extrabold tabular">
                        {compactPeso(t.prizePool)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="mt-8" aria-labelledby="location-heading">
            <h2 id="location-heading" className="text-xl font-bold">
              Location
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{venue.address}, Cebu City</p>
            <div className="isolate mt-3 h-52 overflow-hidden rounded-lg border border-border">
              <MapContainer
                center={[venue.lat, venue.lng]}
                zoom={15}
                className="h-full w-full"
                scrollWheelZoom={false}
                dragging={false}
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
                <Marker position={[venue.lat, venue.lng]} icon={venuePin} />
              </MapContainer>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`https://www.openstreetmap.org/directions?to=${venue.lat}%2C${venue.lng}`}
                target="_blank"
                rel="noreferrer"
                className="pressable inline-flex min-h-[44px] items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium hover:bg-muted"
              >
                <Icon name="navigation" className="h-4 w-4" aria-hidden /> Directions
              </a>
              <a
                href={`tel:${venue.phone.replace(/\s/g, '')}`}
                className="pressable inline-flex min-h-[44px] items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium hover:bg-muted"
              >
                <Icon name="phone" className="h-4 w-4" aria-hidden /> {venue.phone}
              </a>
            </div>
          </section>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-lg border border-border bg-card p-5">
            <PriceBlock offPeak={venue.pricePerHour} peak={venue.peakPrice} />
            <p className="mt-3 text-sm text-muted-foreground">
              Open {formatHour(venue.openHour)} – {formatHour(venue.closeHour)} daily
            </p>
            <Button
              size="lg"
              className="pressable mt-5 min-h-[52px] w-full"
              onClick={() => navigate(`/book/${venue.id}`)}
            >
              Book a slot
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free cancellation up to 24 hours before
            </p>
          </div>
        </aside>
      </div>
      <div className="fixed inset-x-0 bottom-[calc(60px+env(safe-area-inset-bottom))] z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:bottom-0 md:left-20 lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <PriceBlock offPeak={venue.pricePerHour} peak={venue.peakPrice} compact />
          <Button
            size="lg"
            className="pressable min-h-[52px] flex-1"
            onClick={() => navigate(`/book/${venue.id}`)}
          >
            Book a slot
          </Button>
        </div>
      </div>
    </div>
  );
}
function PriceBlock({ offPeak, peak, compact }) {
  return (
    <div>
      <p className="leading-none">
        <span
          className={cn('font-display font-extrabold tabular', compact ? 'text-2xl' : 'text-4xl')}
        >
          {peso(offPeak)}
        </span>
        <span className="text-sm text-muted-foreground"> /hr</span>
      </p>
      <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
        <Icon name="flame" className="h-3 w-3 text-warning" aria-hidden /> Peak {peso(peak)} · 5–9
        PM
      </p>
    </div>
  );
}
export { CourtDetail };
