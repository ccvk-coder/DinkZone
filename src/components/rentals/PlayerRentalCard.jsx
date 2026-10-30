import { Icon } from '../ui/Icon';
import { Badge } from '../Badge';
import { venues } from '../../data/venues';
import { rentalItems } from '../../data/rentals';
import { formatDate, formatRange, peso } from '../../utils/format';
const statusMeta = {
  Reserved: { tone: 'primary', hint: 'Show this code at the front desk to pick up.' },
  'Picked up': { tone: 'warning', hint: 'Return to the front desk when your game ends.' },
  Returned: { tone: 'success', hint: 'All gear returned. Thanks for playing!' },
  Cancelled: { tone: 'neutral', hint: 'This rental was cancelled.' }
};
function PlayerRentalCard({ rental, onCancel }) {
  const venue = venues.find((v) => v.id === rental.venueId);
  const meta = statusMeta[rental.status];
  return (
    <li className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-semibold">{venue?.name ?? 'Venue'}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(rental.date)} · {formatRange(rental.startHour, rental.hours)} · Court{' '}
            {rental.court}
          </p>
        </div>
        <Badge tone={meta.tone}>{rental.status}</Badge>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {rental.items.map((l) => {
          const item = rentalItems.find((i) => i.id === l.itemId);
          return (
            <li
              key={l.itemId}
              className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium"
            >
              <Icon name={item?.icon ?? 'package'} className="h-3.5 w-3.5" aria-hidden />
              {l.qty}× {item?.name}
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
        <div>
          <p className="font-mono text-sm font-semibold tracking-wide">{rental.code}</p>
          <p className="text-xs text-muted-foreground">{meta.hint}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold tabular">{peso(rental.total)}</span>
          {rental.status === 'Reserved' && onCancel && (
            <button
              type="button"
              onClick={() => onCancel(rental)}
              className="pressable min-h-[36px] rounded-full border border-border px-3 text-xs font-semibold text-destructive hover:bg-muted"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
export { PlayerRentalCard };
