import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { StatusChip } from '../../components/ui/StatusChip';
import { useBookings } from '../../contexts/BookingsContext';
import { venues } from '../../data/venues';
import { formatHour, formatRange } from '../../utils/format';
import { toLocalISO } from '../../utils/slots';
import { cn } from '../../utils/classNames';
function Schedule() {
  const { venueId } = useOutletContext();
  const { allBookings, updateBooking } = useBookings();
  const { toast } = useToast();
  const venue = venues.find((v) => v.id === venueId);
  const today = toLocalISO(/* @__PURE__ */ new Date());
  const nowHour = /* @__PURE__ */ new Date().getHours();
  const todays = useMemo(
    () =>
      allBookings
        .filter((b) => b.venueId === venueId && b.date === today)
        .sort((a, b) => a.startHour - b.startHour),
    [allBookings, venueId, today]
  );
  const hours = Array.from(
    { length: venue.closeHour - venue.openHour },
    (_, i) => venue.openHour + i
  );
  const checkedIn = todays.filter(
    (b) => b.status === 'Checked-in' || b.status === 'Completed'
  ).length;
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight [text-wrap:balance] sm:text-[28px] lg:text-[32px]">
            Today at {venue.name}
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground sm:text-sm">
            {/* @__PURE__ */ new Date().toLocaleDateString('en-PH', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}{' '}
            · {venue.courts} courts
          </p>
        </div>
        <dl className="grid shrink-0 grid-cols-3 gap-2 md:flex md:gap-6">
          {[
            ['Bookings', todays.length],
            ['Checked in', checkedIn],
            ['Next hour', todays.filter((b) => b.startHour === nowHour + 1).length]
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-lg border border-border bg-card px-3 py-2 md:border-0 md:bg-transparent md:p-0"
            >
              <dt className="truncate text-[11px] text-muted-foreground sm:text-xs">{k}</dt>
              <dd className="font-display text-xl font-extrabold leading-tight tabular sm:text-2xl">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {todays.length === 0 ? (
        <EmptyState
          className="mt-10"
          icon={<Icon name="calendar-x" className="h-8 w-8" />}
          title="No bookings today yet"
          description="Walk-ins can be booked from the player app."
        />
      ) : (
        <>
          <div className="mt-6 hidden overflow-hidden rounded-lg border border-border bg-card md:block">
            <div
              className="grid border-b border-border bg-surface text-xs font-semibold text-muted-foreground"
              style={{ gridTemplateColumns: `72px repeat(${venue.courts}, minmax(0,1fr))` }}
            >
              <span className="px-3 py-2.5">Time</span>
              {Array.from({ length: venue.courts }, (_, i) => (
                <span key={i} className="px-2 py-2.5">
                  Court {i + 1}
                </span>
              ))}
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {hours.map((h) => (
                <div
                  key={h}
                  className={cn(
                    'grid border-b border-border last:border-0',
                    h === nowHour && 'bg-accent/30'
                  )}
                  style={{ gridTemplateColumns: `72px repeat(${venue.courts}, minmax(0,1fr))` }}
                >
                  <span className="flex items-center gap-1 px-3 py-2 text-xs font-semibold tabular text-muted-foreground">
                    {formatHour(h)}
                    {h === nowHour && (
                      <span className="h-1.5 w-1.5 rounded-full bg-success" aria-label="Now" />
                    )}
                  </span>
                  {Array.from({ length: venue.courts }, (_, c) => {
                    const b = todays.find(
                      (x) => x.court === c + 1 && h >= x.startHour && h < x.startHour + x.hours
                    );
                    if (!b) return <span key={c} className="border-l border-border" />;
                    const first = b.startHour === h;
                    return (
                      <div key={c} className="border-l border-border p-1">
                        {first ? (
                          <div
                            className={cn(
                              'rounded-md px-2 py-1.5 text-xs',
                              b.status === 'Cancelled'
                                ? 'bg-muted text-muted-foreground line-through'
                                : b.status === 'Checked-in'
                                  ? 'bg-success/15'
                                  : b.status === 'No-show'
                                    ? 'bg-warning/15'
                                    : 'bg-primary/10 dark:bg-highlight/15'
                            )}
                          >
                            <p className="truncate font-semibold">{b.playerName}</p>
                            <p className="truncate text-[11px] text-muted-foreground">
                              {b.status} · {b.hours}h
                            </p>
                          </div>
                        ) : (
                          <div className="h-full rounded-md bg-muted/60" aria-hidden />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <ul className="mt-6 space-y-2 md:mt-6">
            {todays.map((b) => (
              <li
                key={b.id}
                className="flex flex-wrap items-center gap-x-3 gap-y-2.5 rounded-lg border border-border bg-card p-3"
              >
                <span className="w-[88px] shrink-0 text-[13px] font-semibold leading-tight tabular sm:w-28 sm:text-sm">
                  {formatRange(b.startHour, b.hours)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold leading-tight">{b.playerName}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    Court {b.court} · {b.players} players · {b.code}
                  </p>
                </div>
                <StatusChip status={b.status} />
                {b.status === 'Confirmed' && (
                  <div className="flex w-full gap-2 sm:w-auto">
                    <Button
                      size="sm"
                      className="pressable min-h-[40px] flex-1 sm:flex-none"
                      onClick={() => {
                        updateBooking(b.id, { status: 'Checked-in' });
                        toast({ title: `${b.playerName} checked in`, tone: 'success' });
                      }}
                    >
                      Check in
                    </Button>
                    {b.startHour <= nowHour && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="min-h-[40px] flex-1 sm:flex-none"
                        onClick={() => {
                          updateBooking(b.id, { status: 'No-show' });
                          toast({ title: 'Marked as no-show', tone: 'info' });
                        }}
                      >
                        No-show
                      </Button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
export { Schedule };
