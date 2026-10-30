import { Icon } from '../ui/Icon';
import { formatCountdown } from '../../hooks/useCountdown';
import { cn } from '../../utils/classNames';
function HoldTimer({ remaining }) {
  const urgent = remaining < 6e4;
  return (
    <div
      role="timer"
      aria-live={urgent ? 'assertive' : 'off'}
      aria-label={`Slot held for ${formatCountdown(remaining)}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tabular transition-colors duration-200',
        urgent ? 'bg-destructive text-white' : 'bg-accent text-accent-foreground'
      )}
    >
      <Icon name="timer" className="h-3.5 w-3.5" aria-hidden />
      Held {formatCountdown(remaining)}
    </div>
  );
}
export { HoldTimer };
