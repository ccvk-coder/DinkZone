import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { IconButton } from '../../components/ui/IconButton';
import { CourtLines } from '../../components/ui/CourtLines';
import { Bracket } from '../../components/events/Bracket';
import { slotsLeft } from '../../components/events/EventCard';
import { BookingQR } from '../../components/booking/BookingQR';
import { tournaments } from '../../data/tournaments';
import { venues } from '../../data/venues';
import { useBookings } from '../../contexts/BookingsContext';
import { useApp } from '../../contexts/AppContext';
import { formatDate, peso } from '../../utils/format';
const pin = L.divIcon({
  className: 'dz-pin',
  iconSize: [0, 0],
  html: '<div style="position:absolute;left:-11px;top:-11px;width:22px;height:22px;border-radius:999px;background:#0E3B2C;border:4px solid #D4F23A"></div>'
});
function Section({ id, title, children, action }) {
  return (
    <section className="mt-10" aria-labelledby={id}>
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 id={id} className="text-2xl font-extrabold">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { registrations } = useBookings();
  const { theme } = useApp();
  const t = tournaments.find((x) => x.id === id);
  const venue = venues.find((v) => v.id === t?.venueId);
  if (!t || !venue) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          title="Event not found"
          action={<Button onClick={() => navigate('/events')}>All events</Button>}
        />
      </div>
    );
  }
  const reg = registrations.find((r) => r.tournamentId === t.id);
  const maxPrize = Math.max(...t.prizes.map((p) => p.amount));
  const cta =
    t.status === 'upcoming'
      ? reg
        ? {
            label: 'You\u2019re registered',
            onClick: () =>
              document.getElementById('entry-pass')?.scrollIntoView({ behavior: 'smooth' }),
            disabled: false
          }
        : {
            label: `Register \xB7 ${peso(t.entryFee)}`,
            onClick: () => navigate(`/events/${t.id}/register`),
            disabled: slotsLeft(t) === 0
          }
      : {
          label: t.status === 'live' ? 'Watch live bracket' : 'See results',
          onClick: () => navigate(`/events/${t.id}/bracket`),
          disabled: false
        };
  return (
    <div className="pb-28 md:pb-12">
      <div className="relative overflow-hidden bg-brand text-white">
        <img
          src={t.banner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="net-texture absolute inset-0" aria-hidden />
        <CourtLines className="absolute -right-20 top-6 hidden w-[520px] text-white/10 md:block" />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-3 md:px-8 md:pb-12 md:pt-8">
          <IconButton
            icon="arrow-left"
            label="Back"
            tone="overlay"
            onClick={() => navigate('/events')}
          />
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {t.status === 'live' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-2.5 py-1 uppercase">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    Live now
                  </span>
                )}
                <span className="rounded-full bg-white/10 px-2.5 py-1">
                  {t.formats.join(' \xB7 ')}
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1">
                  {t.skill.join(' \xB7 ')}
                </span>
              </div>
              <h1 className="mt-3 text-4xl font-extrabold leading-[0.98] md:text-6xl">{t.name}</h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="calendar" className="h-4 w-4" aria-hidden />
                  {formatDate(t.date, 'EEE, MMM d')}
                  {t.endDate !== t.date && ` \u2013 ${formatDate(t.endDate, 'MMM d')}`}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="map-pin" className="h-4 w-4" aria-hidden />
                  {venue.name}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Prize pool
              </p>
              <p className="font-display text-5xl font-extrabold leading-none tabular text-highlight md:text-7xl">
                {peso(t.prizePool)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <Section id="prizes-h" title="Prize breakdown">
              <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {t.prizes.map((p, i) => (
                  <li
                    key={p.place}
                    className={`rounded-lg border p-4 ${i === 0 ? 'border-brand bg-brand text-white dark:border-highlight' : 'border-border bg-card'}`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.14em] ${i === 0 ? 'text-highlight' : 'text-muted-foreground'}`}
                    >
                      {p.place} place
                    </p>
                    <p className="mt-1 font-display text-3xl font-extrabold tabular">
                      {peso(p.amount)}
                    </p>
                    <div
                      className={`mt-3 h-1.5 rounded-full ${i === 0 ? 'bg-white/15' : 'bg-muted'}`}
                    >
                      <div
                        className={`h-full rounded-full ${i === 0 ? 'bg-highlight' : 'bg-court'}`}
                        style={{ width: `${(p.amount / maxPrize) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
            <Section id="div-h" title="Divisions">
              <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                {t.divisions.map((d) => {
                  const left = d.slots - d.filled;
                  return (
                    <li key={d.id} className="flex flex-wrap items-center gap-3 p-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{d.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {d.skill} · {d.format}
                        </p>
                      </div>
                      <div className="w-40">
                        <div className="h-1.5 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-court"
                            style={{ width: `${(d.filled / d.slots) * 100}%` }}
                          />
                        </div>
                        <p
                          className={`mt-1 text-right text-xs ${left <= 5 ? 'font-semibold text-warning' : 'text-muted-foreground'}`}
                        >
                          {left === 0 ? 'Full' : `${left} of ${d.slots} slots left`}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Section>
            <Section
              id="bracket-h"
              title={t.status === 'upcoming' ? 'Bracket preview' : 'Bracket'}
              action={
                <Link
                  to={`/events/${t.id}/bracket`}
                  className="text-sm font-semibold text-court hover:underline dark:text-highlight"
                >
                  Full bracket
                </Link>
              }
            >
              <Bracket matches={t.matches} teams={t.teams} />
            </Section>
            <Section id="teams-h" title={`Registered teams (${t.teams.length})`}>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {t.teams.map((team) => (
                  <li
                    key={team.id}
                    className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-bold tabular">
                      {team.seed}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{team.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {team.players.join(' & ')}
                      </p>
                    </div>
                    <span className="text-xs font-medium tabular text-muted-foreground">
                      {team.rating.toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section id="rules-h" title="Rules">
              <ul className="space-y-2">
                {t.rules.map((r) => (
                  <li key={r} className="flex gap-3 text-sm">
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-court dark:text-highlight"
                      aria-hidden
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>
            <Section id="sponsors-h" title="Sponsors">
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                {t.sponsors.map((s) => (
                  <li
                    key={s}
                    className="grid h-16 place-items-center rounded-md border border-border bg-card font-display text-base font-bold tracking-tight text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
          <aside className="lg:pt-10">
            <div className="space-y-4 lg:sticky lg:top-6">
              {reg && (
                <div
                  id="entry-pass"
                  className="flex flex-col items-center rounded-lg border border-border bg-card p-5 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-court dark:text-highlight">
                    Entry pass
                  </p>
                  <BookingQR
                    value={`DZT|${reg.code}|${t.id}|${reg.divisionId}`}
                    size={160}
                    className="mt-3 w-[188px] border border-border"
                    label={`Tournament entry QR ${reg.code}`}
                  />
                  <p className="mt-2 font-mono text-sm font-semibold">{reg.code}</p>
                  <p className="text-xs text-muted-foreground">
                    With {reg.partner || 'solo entry'}
                  </p>
                </div>
              )}
              <div className="rounded-lg border border-border bg-card p-5">
                <h2 className="font-bold">Schedule</h2>
                <ol className="mt-3 space-y-3 border-l border-border pl-4">
                  {t.schedule.map((s) => (
                    <li key={s.time + s.label} className="relative">
                      <span
                        className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-court"
                        aria-hidden
                      />
                      <p className="text-xs font-semibold tabular text-muted-foreground">
                        {s.time}
                      </p>
                      <p className="text-sm">{s.label}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="isolate h-40">
                  <MapContainer
                    center={[venue.lat, venue.lng]}
                    zoom={14}
                    className="h-full w-full"
                    dragging={false}
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
                    <Marker position={[venue.lat, venue.lng]} icon={pin} />
                  </MapContainer>
                </div>
                <div className="p-4">
                  <p className="font-semibold">{venue.name}</p>
                  <p className="text-sm text-muted-foreground">{venue.address}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Organized by {t.organizer}</p>
                </div>
              </div>
              <Button
                size="lg"
                className="pressable hidden min-h-[52px] w-full lg:block"
                disabled={cta.disabled}
                onClick={cta.onClick}
              >
                {cta.label}
              </Button>
            </div>
          </aside>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-[calc(60px+env(safe-area-inset-bottom))] z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:bottom-0 md:left-20 lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Entry
            </p>
            <p className="font-display text-xl font-extrabold leading-none tabular">
              {peso(t.entryFee)}
            </p>
          </div>
          <Button
            size="lg"
            className="pressable min-h-[52px] flex-1"
            disabled={cta.disabled}
            onClick={cta.onClick}
          >
            {cta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
export { EventDetail };
