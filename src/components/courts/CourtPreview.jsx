import { useNavigate } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { Button } from '../Button';
import { Rating } from '../ui/Rating';
import { AvailabilityPill } from './AvailabilityPill';
import { AmenityIcons } from './AmenityIcons';
import { travelEstimate } from '../../utils/geo';
import { peso } from '../../utils/format';
function CourtPreview({ venue, onClose }) {
  const navigate = useNavigate();
  const travel = travelEstimate(venue.distanceKm);
  return (
    <div className="flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-muted">
        <img
          src={venue.image}
          alt={`${venue.name} courts`}
          className="h-full w-full object-cover"
        />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="pressable absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-tight">{venue.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Icon
              name={travel.mode === 'walk' ? 'footprints' : 'car'}
              className="h-4 w-4"
              aria-hidden
            />
            {travel.label} · {venue.neighborhood}
          </p>
        </div>
        <p className="shrink-0 text-right leading-none">
          <span className="font-display text-2xl font-extrabold tabular">
            {peso(venue.pricePerHour)}
          </span>
          <span className="block pt-1 text-xs text-muted-foreground">per hour</span>
        </p>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <AvailabilityPill count={venue.openNow} />
        <Rating value={venue.rating} count={venue.reviews} />
        <span className="text-muted-foreground">
          {venue.setting} · {venue.courts} courts
        </span>
      </div>
      <AmenityIcons amenities={venue.amenities} className="mt-3" max={6} />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          className="pressable min-h-[48px]"
          onClick={() => navigate(`/courts/${venue.id}`)}
        >
          Details
        </Button>
        <Button className="pressable min-h-[48px]" onClick={() => navigate(`/book/${venue.id}`)}>
          Book a slot
        </Button>
      </div>
    </div>
  );
}
export { CourtPreview };
