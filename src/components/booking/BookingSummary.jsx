import { addOns } from '../../data/addOns';
import { formatDate, formatRange, peso } from '../../utils/format';
function BookingSummary({
  venue,
  date,
  court,
  startHour,
  hours,
  players,
  extras,
  courtPrice,
  serviceFee,
  total
}) {
  const lines = addOns.filter((a) => extras[a.id] > 0);
  return (
    <div>
      <div className="flex gap-3">
        <img src={venue.image} alt="" className="h-14 w-14 shrink-0 rounded-md object-cover" />
        <div className="min-w-0">
          <p className="truncate font-display font-bold">{venue.name}</p>
          <p className="text-sm text-muted-foreground">{venue.neighborhood}</p>
        </div>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Date</dt>
          <dd className="font-medium">{formatDate(date, 'EEE, MMM d')}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Time</dt>
          <dd className="font-medium tabular">
            {startHour != null && hours > 0 ? formatRange(startHour, hours) : '\u2014'}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Court</dt>
          <dd className="font-medium">{court ? `Court ${court}` : '\u2014'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Players</dt>
          <dd className="font-medium">{players}</dd>
        </div>
      </dl>
      <div className="my-4 border-t border-dashed border-border" />
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt>Court · {hours || 0} hr</dt>
          <dd className="tabular">{peso(courtPrice)}</dd>
        </div>
        {lines.map((a) => (
          <div key={a.id} className="flex justify-between gap-4">
            <dt>
              {a.name} × {extras[a.id]}
            </dt>
            <dd className="tabular">{peso(a.price * extras[a.id])}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 text-muted-foreground">
          <dt>Service fee</dt>
          <dd className="tabular">{peso(serviceFee)}</dd>
        </div>
      </dl>
      <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
        <span className="font-semibold">Total</span>
        <span className="font-display text-2xl font-extrabold tabular">{peso(total)}</span>
      </div>
    </div>
  );
}
export { BookingSummary };
