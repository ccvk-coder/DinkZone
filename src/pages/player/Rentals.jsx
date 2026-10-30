import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { RentalItemCard } from '../../components/rentals/RentalItemCard';
import { PlayerRentalCard } from '../../components/rentals/PlayerRentalCard';
import { useBookings } from '../../contexts/BookingsContext';
import { usePlayerRentals, rentalTotal } from '../../hooks/usePlayerRentals';
import { rentalItems } from '../../data/rentals';
import { venues } from '../../data/venues';
import { isUpcoming } from '../../utils/checkin';
import { formatDate, formatRange, peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
function Rentals() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { bookings } = useBookings();
  const { rentals, reserve, cancel } = usePlayerRentals();
  const upcoming = useMemo(
    () =>
      bookings
        .filter((b) => isUpcoming(b))
        .sort((a, b) =>
          a.date === b.date ? a.startHour - b.startHour : a.date.localeCompare(b.date)
        ),
    [bookings]
  );
  const [bookingId, setBookingId] = useState(upcoming[0]?.id ?? '');
  const [qty, setQty] = useState({});
  const [tab, setTab] = useState('active');
  useEffect(() => {
    if (!upcoming.some((b) => b.id === bookingId)) setBookingId(upcoming[0]?.id ?? '');
  }, [upcoming, bookingId]);
  const booking = upcoming.find((b) => b.id === bookingId);
  const lines = Object.entries(qty)
    .filter(([, q]) => q > 0)
    .map(([itemId, q]) => ({ itemId, qty: q }));
  const total = rentalTotal(lines);
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);
  const active = rentals.filter((r) => r.status === 'Reserved' || r.status === 'Picked up');
  const history = rentals.filter((r) => r.status === 'Returned' || r.status === 'Cancelled');
  const shown = tab === 'active' ? active : history;
  function handleReserve() {
    if (!booking || lines.length === 0) return;
    const r = reserve(booking, lines);
    setQty({});
    setTab('active');
    toast({
      title: 'Gear reserved',
      description: `Pick up with code ${r.code} at the front desk.`,
      tone: 'success'
    });
  }
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8">
      <PageHeader
        back="/shop"
        title="Rent gear"
        subtitle="Reserve paddles, balls and more for your booking. Pick up at the front desk, pay at pickup."
      />
      {upcoming.length === 0 ? (
        <EmptyState
          icon={<Icon name="calendar-plus" className="h-8 w-8" />}
          title="Book a court to rent gear"
          description="Rentals are tied to a booking so the venue has your gear ready."
          action={<Button onClick={() => navigate('/courts')}>Find a court</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section aria-labelledby="rent-booking-h">
              <h2 id="rent-booking-h" className="mb-3 text-sm font-semibold">
                1. Choose your booking
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Booking">
                {upcoming.map((b) => {
                  const v = venues.find((x) => x.id === b.venueId);
                  const selected = b.id === bookingId;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setBookingId(b.id)}
                      className={cn(
                        'pressable flex items-center gap-3 rounded-lg border bg-card p-3 text-left',
                        selected
                          ? 'border-brand ring-1 ring-brand dark:border-highlight dark:ring-highlight'
                          : 'border-border hover:border-foreground/30'
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
                          selected
                            ? 'border-brand bg-brand dark:border-highlight dark:bg-highlight'
                            : 'border-border'
                        )}
                        aria-hidden
                      >
                        {selected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-black" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{v?.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {formatDate(b.date)} · {formatRange(b.startHour, b.hours)} · Court{' '}
                          {b.court}
                        </span>
                      </span>
                      {b.status === 'Checked-in' && <Badge tone="success">Live</Badge>}
                    </button>
                  );
                })}
              </div>
            </section>
            <section aria-labelledby="rent-items-h">
              <h2 id="rent-items-h" className="mb-3 text-sm font-semibold">
                2. Pick your gear
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {rentalItems.map((item) => (
                  <RentalItemCard
                    key={item.id}
                    item={item}
                    qty={qty[item.id] ?? 0}
                    onChange={(q) => setQty((s) => ({ ...s, [item.id]: q }))}
                  />
                ))}
              </ul>
            </section>
          </div>
          <aside className="lg:sticky lg:top-6 lg:self-start" aria-label="Rental summary">
            <div className="rounded-lg border border-border bg-card p-4">
              <h2 className="font-semibold">Your rental</h2>
              {booking && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {venues.find((v) => v.id === booking.venueId)?.name} · {formatDate(booking.date)}{' '}
                  · {formatRange(booking.startHour, booking.hours)}
                </p>
              )}
              {lines.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Add paddles, balls or other gear.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-border text-sm">
                  {lines.map((l) => {
                    const item = rentalItems.find((i) => i.id === l.itemId);
                    return (
                      <li key={l.itemId} className="flex items-center justify-between py-2">
                        <span>
                          {l.qty}× {item?.name}
                        </span>
                        <span className="tabular">{peso((item?.rate ?? 0) * l.qty)}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold">Total · pay at pickup</span>
                <span className="font-display text-xl font-extrabold tabular">{peso(total)}</span>
              </div>
              <Button
                className="mt-4 min-h-[48px] w-full"
                disabled={!booking || lines.length === 0}
                onClick={handleReserve}
              >
                {itemCount
                  ? `Reserve ${itemCount} item${itemCount === 1 ? '' : 's'}`
                  : 'Reserve gear'}
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Free to cancel before pickup.
              </p>
            </div>
          </aside>
        </div>
      )}
      <section className="mt-10" aria-labelledby="my-rentals-h">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 id="my-rentals-h" className="text-lg font-bold">
            My rentals
          </h2>
          <SegmentedControl
            label="Rental list"
            layoutId="player-rentals-tab"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'active', label: `Active ${active.length}` },
              { value: 'history', label: `History ${history.length}` }
            ]}
          />
        </div>
        {shown.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            {tab === 'active' ? 'No active rentals.' : 'No past rentals yet.'}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {shown.map((r) => (
              <PlayerRentalCard
                key={r.id}
                rental={r}
                onCancel={(x) => {
                  cancel(x.id);
                  toast({ title: 'Rental cancelled', description: x.code, tone: 'info' });
                }}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
export { Rentals };
