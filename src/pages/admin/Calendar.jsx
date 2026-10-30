import { useMemo, useState } from 'react';
import { addDays, format } from 'date-fns';
import { motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { Select } from '../../components/Select';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { Chip } from '../../components/ui/Chip';
import { BookingDrawer } from '../../components/admin/BookingDrawer';
import { useBookings } from '../../contexts/BookingsContext';
import { venues } from '../../data/venues';
import { formatHour } from '../../utils/format';
import { toLocalISO } from '../../utils/slots';
import { cn } from '../../utils/classNames';
const HOUR_W = 84;
const ROW_H = 64;
const LABEL_W = 92;
function Calendar() {
  const { allBookings, updateBooking } = useBookings();
  const { toast } = useToast();
  const [venueId, setVenueId] = useState('v-kasambagan');
  const [date, setDate] = useState(toLocalISO(/* @__PURE__ */ new Date()));
  const [maintenance, setMaintenance] = useState(['v-kasambagan|8|10', 'v-kasambagan|8|11']);
  const [drawer, setDrawer] = useState(null);
  const venue = venues.find((v) => v.id === venueId);
  const hours = Array.from(
    { length: venue.closeHour - venue.openHour },
    (_, i) => venue.openHour + i
  );
  const dayBookings = useMemo(
    () =>
      allBookings.filter(
        (b) => b.venueId === venueId && b.date === date && b.status !== 'Cancelled'
      ),
    [allBookings, venueId, date]
  );
  const mKey = (court, hour) => `${venueId}|${court}|${hour}`;
  const conflicts = (b, court, start) => {
    if (
      court < 1 ||
      court > venue.courts ||
      start < venue.openHour ||
      start + b.hours > venue.closeHour
    )
      return 'Outside opening hours';
    for (let h = start; h < start + b.hours; h++)
      if (maintenance.includes(mKey(court, h))) return 'Court is blocked for maintenance';
    const clash = dayBookings.find(
      (o) =>
        o.id !== b.id &&
        o.court === court &&
        start < o.startHour + o.hours &&
        o.startHour < start + b.hours
    );
    return clash ? `Overlaps ${clash.playerName}\u2019s booking` : null;
  };
  const onDrop = (b, dx, dy) => {
    const dh = Math.round(dx / HOUR_W);
    const dc = Math.round(dy / ROW_H);
    if (dh === 0 && dc === 0) return;
    const court = b.court + dc;
    const start = b.startHour + dh;
    const err = conflicts(b, court, start);
    if (err) {
      toast({ title: 'Can\u2019t move booking', description: err, tone: 'error' });
      return;
    }
    updateBooking(b.id, { court, startHour: start });
    toast({
      title: 'Booking rescheduled',
      description: `${b.playerName} \u2192 Court ${court}, ${formatHour(start)}. Player notified.`,
      tone: 'success'
    });
  };
  const toggleMaintenance = (court, hour) => {
    const k = mKey(court, hour);
    setMaintenance((m) => (m.includes(k) ? m.filter((x) => x !== k) : [...m, k]));
    toast({
      title: maintenance.includes(k) ? 'Slot reopened' : 'Blocked for maintenance',
      description: `Court ${court} \xB7 ${formatHour(hour)}`,
      tone: 'info'
    });
  };
  return (
    <div>
      <PageHeader
        title="Calendar"
        subtitle="Drag a booking to move it. Click an empty slot to block it for maintenance."
      />
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-64">
          <Select
            label="Venue"
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
            options={venues.map((v) => ({ label: `${v.name} (${v.courts})`, value: v.id }))}
          />
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {Array.from({ length: 7 }, (_, i) => addDays(/* @__PURE__ */ new Date(), i - 1)).map(
            (d, i) => {
              const iso = toLocalISO(d);
              return (
                <Chip key={iso} selected={date === iso} onClick={() => setDate(iso)}>
                  {i === 1 ? 'Today' : format(d, 'EEE d')}
                </Chip>
              );
            }
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-5 rounded bg-primary/15 ring-1 ring-primary/30 dark:bg-highlight/20" />
          Confirmed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-5 rounded bg-success/20 ring-1 ring-success/40" />
          Checked in
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-5 rounded bg-warning/20 ring-1 ring-warning/40" />
          No-show
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="wrench" className="h-3.5 w-3.5" />
          Maintenance
        </span>
      </div>
      <div className="mt-3 overflow-x-auto rounded-lg border border-border bg-card">
        <div className="relative" style={{ width: LABEL_W + hours.length * HOUR_W }}>
          <div className="sticky top-0 z-10 flex border-b border-border bg-surface">
            <div
              className="shrink-0 px-3 py-2 text-xs font-semibold text-muted-foreground"
              style={{ width: LABEL_W }}
            >
              Court
            </div>
            {hours.map((h) => (
              <div
                key={h}
                className="shrink-0 border-l border-border px-2 py-2 text-xs font-semibold tabular text-muted-foreground"
                style={{ width: HOUR_W }}
              >
                {formatHour(h)}
              </div>
            ))}
          </div>
          {Array.from({ length: venue.courts }, (_, ci) => {
            const court = ci + 1;
            return (
              <div
                key={court}
                className="relative flex border-b border-border last:border-0"
                style={{ height: ROW_H }}
              >
                <div
                  className="sticky left-0 z-[5] flex shrink-0 items-center bg-card px-3 text-sm font-semibold"
                  style={{ width: LABEL_W }}
                >
                  Court {court}
                </div>
                {hours.map((h) => {
                  const blocked = maintenance.includes(mKey(court, h));
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => toggleMaintenance(court, h)}
                      aria-label={
                        blocked
                          ? `Reopen court ${court} at ${formatHour(h)}`
                          : `Block court ${court} at ${formatHour(h)} for maintenance`
                      }
                      className={cn(
                        'group shrink-0 border-l border-border transition-colors duration-150',
                        blocked ? 'bg-muted' : 'hover:bg-muted/60'
                      )}
                      style={{ width: HOUR_W }}
                    >
                      {blocked ? (
                        <span className="flex h-full flex-col items-center justify-center gap-0.5 border border-dashed border-muted-foreground/40 text-[11px] text-muted-foreground">
                          <Icon name="wrench" className="h-3.5 w-3.5" aria-hidden />
                          Blocked
                        </span>
                      ) : (
                        <Icon
                          name="wrench"
                          className="mx-auto h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-60"
                          aria-hidden
                        />
                      )}
                    </button>
                  );
                })}
                {dayBookings
                  .filter((b) => b.court === court)
                  .map((b) => (
                    <motion.div
                      key={`${b.id}-${b.court}-${b.startHour}`}
                      drag
                      dragMomentum={false}
                      dragSnapToOrigin
                      whileDrag={{
                        scale: 1.03,
                        zIndex: 30,
                        boxShadow: '0 12px 28px rgba(0,0,0,.25)'
                      }}
                      onDragEnd={(_2, info) => onDrop(b, info.offset.x, info.offset.y)}
                      onTap={() => setDrawer(b)}
                      className={cn(
                        'absolute top-1.5 z-10 flex cursor-grab flex-col justify-center overflow-hidden rounded-md px-2.5 text-xs ring-1 active:cursor-grabbing',
                        b.status === 'Checked-in' || b.status === 'Completed'
                          ? 'bg-success/20 ring-success/40'
                          : b.status === 'No-show'
                            ? 'bg-warning/20 ring-warning/40'
                            : 'bg-primary/15 ring-primary/30 dark:bg-highlight/20 dark:ring-highlight/40'
                      )}
                      style={{
                        left: LABEL_W + (b.startHour - venue.openHour) * HOUR_W + 3,
                        width: b.hours * HOUR_W - 6,
                        height: ROW_H - 12
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`${b.playerName}, ${formatHour(b.startHour)}, ${b.status}. Drag to reschedule.`}
                      onKeyDown={(e) => e.key === 'Enter' && setDrawer(b)}
                    >
                      <span className="truncate font-semibold">{b.playerName}</span>
                      <span className="truncate text-[11px] text-muted-foreground">
                        {b.status} · {b.players}p
                      </span>
                    </motion.div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
      {dayBookings.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          No bookings on this day yet at {venue.name}.
        </p>
      )}
      <BookingDrawer booking={drawer} onClose={() => setDrawer(null)} />
    </div>
  );
}
export { Calendar };
