import { Icon } from '../ui/Icon';
import { cn } from '../../utils/classNames';
function availabilityLevel(count) {
  if (count === 0) return 'none';
  return count <= 3 ? 'low' : 'high';
}
function AvailabilityPill({ count, label = 'open now', className }) {
  const level = availabilityLevel(count);
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
        level === 'high' && 'bg-success/10 text-success',
        level === 'low' && 'bg-warning/10 text-warning',
        level === 'none' && 'bg-muted text-muted-foreground',
        className
      )}
    >
      <Icon
        name={level === 'none' ? 'circle-slash' : level === 'low' ? 'flame' : 'circle-check'}
        className="h-3.5 w-3.5"
        aria-hidden
      />
      {level === 'none' ? 'Fully booked' : `${count} slot${count === 1 ? '' : 's'} ${label}`}
    </span>
  );
}
export { AvailabilityPill, availabilityLevel };
