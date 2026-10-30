import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { AmenityIcons } from './AmenityIcons';
import { Rating } from '../ui/Rating';
import { AvailabilityPill } from './AvailabilityPill';
import { useApp } from '../../contexts/AppContext';
import { travelEstimate } from '../../utils/geo';
import { peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
function CourtCard({ venue, selected, onHover, availabilityLabel = 'open now' }) {
  const { savedVenues, toggleSavedVenue } = useApp();
  const travel = travelEstimate(venue.distanceKm);
  const saved = savedVenues.includes(venue.id);
  return (
    <article
      className={cn(
        'group relative flex gap-3 rounded-lg border bg-card p-2.5 transition-[border-color,box-shadow] duration-200 ease-snap hover:shadow-md',
        selected ? 'border-court ring-1 ring-court' : 'border-border'
      )}
      onMouseEnter={() => onHover?.(venue.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="relative aspect-[4/5] w-[104px] shrink-0 overflow-hidden rounded-md bg-muted xs:w-[116px]">
        <img
          src={venue.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 ease-snap group-hover:scale-[1.04]"
          loading="lazy"
        />
        <span className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
          {venue.setting}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <div className="flex items-start gap-2 pr-9">
          <h3 className="text-[15px] font-bold leading-snug">
            <Link
              to={`/courts/${venue.id}`}
              className="after:absolute after:inset-0 after:rounded-lg focus:outline-none"
            >
              {venue.name}
            </Link>
          </h3>
        </div>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon
            name={travel.mode === 'walk' ? 'footprints' : 'car'}
            className="h-3.5 w-3.5"
            aria-hidden
          />
          <span className="tabular">{travel.label}</span>
          <span aria-hidden>·</span>
          <span className="truncate">{venue.neighborhood}</span>
        </p>
        <div className="mt-1.5 flex items-center gap-3 text-xs">
          <Rating value={venue.rating} count={venue.reviews} />
          <span className="text-muted-foreground">{venue.courts} courts</span>
        </div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-1.5 pt-2">
          <div className="flex min-w-0 flex-col items-start gap-1.5">
            <AvailabilityPill count={venue.openNow} label={availabilityLabel} />
            <AmenityIcons amenities={venue.amenities} max={4} />
          </div>
          <p className="shrink-0 text-right leading-none">
            <span className="font-display text-xl font-extrabold tabular">
              {peso(venue.pricePerHour)}
            </span>
            <span className="text-xs text-muted-foreground">/hr</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => toggleSavedVenue(venue.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${venue.name} from saved` : `Save ${venue.name}`}
        className="pressable absolute right-1 top-1 z-10 grid h-11 w-11 place-items-center rounded-full text-muted-foreground hover:text-foreground"
      >
        <Icon
          name="heart"
          className={cn('h-[18px] w-[18px]', saved && 'fill-current text-destructive')}
        />
      </button>
    </article>
  );
}
export { CourtCard };
