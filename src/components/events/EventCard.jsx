import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { venues } from '../../data/venues';
import { formatDate, peso } from '../../utils/format';
function slotsLeft(t) {
  return t.divisions.reduce((n, d) => n + (d.slots - d.filled), 0);
}
function EventCard({ tournament: t }) {
  const venue = venues.find((v) => v.id === t.venueId);
  const left = slotsLeft(t);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-200 ease-snap hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden bg-brand">
        <img
          src={t.banner}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-transform duration-300 ease-snap group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div className="absolute left-3 top-3 flex gap-2">
          {t.status === 'live' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden /> Live
            </span>
          )}
          <span className="rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            {t.formats.join(' \xB7 ')}
          </span>
        </div>
        <div className="absolute inset-x-3 bottom-3 text-white">
          <p className="text-xs font-medium text-white/80">
            {formatDate(t.date, 'EEE, MMM d')}
            {t.endDate !== t.date && ` \u2013 ${formatDate(t.endDate, 'MMM d')}`}
          </p>
          <h3 className="font-display text-xl font-extrabold leading-tight">
            <Link
              to={`/events/${t.id}`}
              className="after:absolute after:inset-0 focus:outline-none"
            >
              {t.name}
            </Link>
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Icon name="map-pin" className="h-4 w-4" aria-hidden />
          {venue?.name}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {t.skill.map((s) => (
            <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Prize pool
            </p>
            <p className="font-display text-[28px] font-extrabold leading-none tabular text-court dark:text-highlight">
              {peso(t.prizePool)}
            </p>
          </div>
          <div className="text-right text-xs">
            <p className="font-semibold tabular">{peso(t.entryFee)} entry</p>
            <p
              className={
                t.status !== 'upcoming'
                  ? 'text-muted-foreground'
                  : left <= 10
                    ? 'font-semibold text-warning'
                    : 'text-muted-foreground'
              }
            >
              {t.status === 'upcoming'
                ? `${left} slots left`
                : t.status === 'live'
                  ? 'In progress'
                  : 'Completed'}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
export { EventCard, slotsLeft };
