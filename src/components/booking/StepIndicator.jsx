import { Icon } from '../ui/Icon';
import { cn } from '../../utils/classNames';
const steps = ['Court', 'Time', 'Players', 'Pay'];
function StepIndicator({ current }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Booking progress">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li
            key={label}
            className="flex flex-1 items-center gap-2"
            aria-current={active ? 'step' : void 0}
          >
            <span
              className={cn(
                'grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors duration-200',
                done && 'bg-primary text-primary-foreground',
                active && 'bg-highlight text-highlight-foreground ring-2 ring-brand/20',
                !done && !active && 'bg-muted text-muted-foreground'
              )}
            >
              {done ? <Icon name="check" className="h-3.5 w-3.5" aria-hidden /> : n}
            </span>
            <span
              className={cn(
                'hidden text-xs font-medium sm:inline',
                active ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {label}
            </span>
            <span className="sr-only sm:hidden">
              {label}
              {done ? ', done' : ''}
            </span>
            {n < steps.length && (
              <span className={cn('h-px flex-1', done ? 'bg-primary' : 'bg-border')} aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}
export { StepIndicator };
