import { Icon } from '../ui/Icon';
import { cn } from '../../utils/classNames';
function KpiCard({ label, value, delta, icon, hint = 'vs yesterday', invert = false }) {
  const up = delta >= 0;
  const good = invert ? !up : up;
  return (
    <div className="h-full min-w-0 rounded-lg border border-border bg-card p-3 sm:p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 truncate text-xs leading-tight text-muted-foreground sm:text-sm">
          {label}
        </p>
        <Icon
          name={icon}
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground sm:h-4 sm:w-4"
          aria-hidden
        />
      </div>
      <p className="mt-1.5 truncate font-display text-xl font-extrabold leading-none tabular sm:mt-2 sm:text-2xl lg:text-[28px]">
        {value}
      </p>
      <p className="mt-1.5 flex min-w-0 items-center gap-1 text-[11px] leading-tight sm:mt-2 sm:text-xs">
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-0.5 font-semibold',
            good ? 'text-success' : 'text-destructive'
          )}
        >
          <Icon
            name={up ? 'arrow-up-right' : 'arrow-down-right'}
            className="h-3 w-3 sm:h-3.5 sm:w-3.5"
            aria-hidden
          />
          {Math.abs(delta)}%<span className="sr-only">{up ? 'increase' : 'decrease'}</span>
        </span>
        <span className="min-w-0 truncate text-muted-foreground">{hint}</span>
      </p>
    </div>
  );
}
export { KpiCard };
