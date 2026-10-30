import { Icon } from '../ui/Icon';
import { StatusChip } from '../ui/StatusChip';
import { venues } from '../../data/venues';
import { formatDate, formatRange, peso } from '../../utils/format';
import { getPassState } from '../../utils/checkin';
function BookingCard({ booking, actions }) {
  const venue = venues.find((v) => v.id === booking.venueId);
  const live = getPassState(booking) === 'ready';
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-start gap-4">
        <div className="flex w-14 shrink-0 flex-col items-center rounded-md bg-surface py-2">
          <span className="text-[11px] font-semibold uppercase text-muted-foreground">
            {formatDate(booking.date, 'MMM')}
          </span>
          <span className="font-display text-2xl font-extrabold leading-none tabular">
            {formatDate(booking.date, 'd')}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {formatDate(booking.date, 'EEE')}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip status={booking.status} />
            {live && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                <span className="relative flex h-2 w-2">
                  <span className="pin-pulse absolute inset-0 rounded-full bg-success" />
                  <span className="relative h-2 w-2 rounded-full bg-success" />
                </span>
                Pass is live
              </span>
            )}
          </div>
          <h3 className="mt-1.5 line-clamp-2 font-display text-lg font-bold leading-tight">
            {venue?.name}
          </h3>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-muted-foreground">
            <span className="tabular">{formatRange(booking.startHour, booking.hours)}</span>
            <span>Court {booking.court}</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="users" className="h-3.5 w-3.5" aria-hidden />
              {booking.players}
            </span>
            <span className="tabular">{peso(booking.total)}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">{actions}</div>
    </article>
  );
}
export { BookingCard };
