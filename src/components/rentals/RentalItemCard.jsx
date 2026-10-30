import { Icon } from '../ui/Icon';
import { QuantityStepper } from '../ui/QuantityStepper';
import { peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
function RentalItemCard({ item, qty, onChange }) {
  const available = Math.max(0, item.fleet - item.out - item.maintenance);
  const soldOut = available === 0;
  const low = !soldOut && available <= 3;
  return (
    <li
      className={cn(
        'flex flex-col rounded-lg border bg-card p-4 transition-colors',
        qty > 0
          ? 'border-brand ring-1 ring-brand dark:border-highlight dark:ring-highlight'
          : 'border-border'
      )}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
          <Icon name={item.icon} className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.detail}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="font-display text-lg font-extrabold tabular">{peso(item.rate)}</p>
          <p
            className={cn(
              'text-xs',
              soldOut
                ? 'font-semibold text-destructive'
                : low
                  ? 'font-semibold text-warning'
                  : 'text-muted-foreground'
            )}
          >
            {soldOut ? 'All rented out' : low ? `Only ${available} left` : `${available} available`}
          </p>
        </div>
        <QuantityStepper
          label={item.name}
          value={qty}
          onChange={onChange}
          max={Math.min(available, 8)}
        />
      </div>
    </li>
  );
}
export { RentalItemCard };
