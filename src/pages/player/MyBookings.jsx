import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { Icon } from '../../components/ui/Icon';
import { Tabs, TabList, Tab, TabPanel } from '../../components/Tabs';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { Sheet } from '../../components/ui/Sheet';
import { Chip } from '../../components/ui/Chip';
import { BookingCard } from '../../components/booking/BookingCard';
import { useBookings } from '../../contexts/BookingsContext';
import { venues } from '../../data/venues';
import { cancellationPolicy } from '../../data/addOns';
import { getPassState, isUpcoming, slotWindow } from '../../utils/checkin';
import { getVenueSlots, toLocalISO } from '../../utils/slots';
import { formatHour, peso } from '../../utils/format';
function refundFor(b) {
  const hoursAway = (slotWindow(b).start.getTime() - Date.now()) / 36e5;
  const pct = hoursAway >= 24 ? 100 : hoursAway >= 6 ? 50 : 0;
  return { pct, amount: b.paymentStatus === 'Paid' ? Math.round((b.total * pct) / 100) : 0 };
}
function MyBookings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { bookings, updateBooking } = useBookings();
  const [tab, setTab] = useState('upcoming');
  const [cancelTarget, setCancelTarget] = useState(null);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [newDate, setNewDate] = useState(toLocalISO(/* @__PURE__ */ new Date()));
  const [newHour, setNewHour] = useState(null);
  const upcoming = useMemo(
    () =>
      bookings
        .filter((b) => isUpcoming(b))
        .sort((a, b) => slotWindow(a).start.getTime() - slotWindow(b).start.getTime()),
    [bookings]
  );
  const past = useMemo(
    () =>
      bookings
        .filter((b) => !isUpcoming(b))
        .sort((a, b) => slotWindow(b).start.getTime() - slotWindow(a).start.getTime()),
    [bookings]
  );
  const rescheduleVenue = venues.find((v) => v.id === rescheduleTarget?.venueId);
  const openHours = useMemo(() => {
    if (!rescheduleTarget || !rescheduleVenue) return [];
    return getVenueSlots(rescheduleVenue, newDate)
      .map((row) => row[rescheduleTarget.court - 1])
      .filter((c) => c && (c.status === 'available' || c.status === 'peak'));
  }, [rescheduleTarget, rescheduleVenue, newDate]);
  const rebook = (b) => {
    const today = /* @__PURE__ */ new Date();
    const diff =
      (/* @__PURE__ */ new Date(`${b.date}T00:00:00`).getDay() - today.getDay() + 7) % 7 || 7;
    const next = addDays(today, diff);
    navigate(`/book/${b.venueId}?date=${toLocalISO(next)}&hour=${b.startHour}&court=${b.court}`);
  };
  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
      <PageHeader title="My bookings" subtitle="Passes, reschedules, and your play history." />
      <Tabs value={tab} onChange={setTab}>
        <TabList>
          <Tab value="upcoming">Upcoming ({upcoming.length})</Tab>
          <Tab value="past">Past ({past.length})</Tab>
        </TabList>
        <TabPanel value="upcoming">
          <div className="mt-4 flex flex-col gap-3">
            {upcoming.length === 0 ? (
              <EmptyState
                icon={<Icon name="calendar-plus" className="h-8 w-8" />}
                title="No upcoming games"
                description="Courts near you have open slots tonight."
                action={<Button onClick={() => navigate('/courts')}>Find a court</Button>}
              />
            ) : (
              upcoming.map((b) => {
                const state = getPassState(b);
                return (
                  <BookingCard
                    key={b.id}
                    booking={b}
                    actions={
                      <>
                        <Button
                          size="sm"
                          variant={
                            state === 'ready' || state === 'checked-in' ? 'primary' : 'secondary'
                          }
                          className="pressable min-h-[44px]"
                          onClick={() => navigate(`/bookings/${b.id}/checkin`)}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <Icon name="qr-code" className="h-4 w-4" aria-hidden />
                            {state === 'checked-in' ? 'Pass' : 'Check in'}
                          </span>
                        </Button>
                        {b.status === 'Confirmed' && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="pressable min-h-[44px]"
                              onClick={() => {
                                setRescheduleTarget(b);
                                setNewDate(b.date);
                                setNewHour(null);
                              }}
                            >
                              Reschedule
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="pressable min-h-[44px] text-destructive"
                              onClick={() => setCancelTarget(b)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </>
                    }
                  />
                );
              })
            )}
          </div>
        </TabPanel>
        <TabPanel value="past">
          <div className="mt-4 flex flex-col gap-3">
            {past.length === 0 ? (
              <EmptyState
                title="No past bookings yet"
                description="Your games will show up here after you play."
              />
            ) : (
              past.map((b) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  actions={
                    <Button
                      size="sm"
                      variant="secondary"
                      className="pressable min-h-[44px]"
                      onClick={() => rebook(b)}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="rotate-ccw" className="h-4 w-4" aria-hidden />
                        Rebook
                      </span>
                    </Button>
                  }
                />
              ))
            )}
          </div>
        </TabPanel>
      </Tabs>
      <Modal
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        title="Cancel this booking?"
        description={
          cancelTarget
            ? `${venues.find((v) => v.id === cancelTarget.venueId)?.name} \xB7 ${format(/* @__PURE__ */ new Date(`${cancelTarget.date}T00:00:00`), 'EEE, MMM d')} \xB7 ${formatHour(cancelTarget.startHour)}`
            : void 0
        }
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setCancelTarget(null)}>
              Keep booking
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!cancelTarget) return;
                const r = refundFor(cancelTarget);
                updateBooking(cancelTarget.id, {
                  status: 'Cancelled',
                  paymentStatus: r.amount > 0 ? 'Refunded' : cancelTarget.paymentStatus
                });
                toast({
                  title: 'Booking cancelled',
                  description:
                    r.amount > 0
                      ? `${peso(r.amount)} will be refunded in 3\u20135 days.`
                      : 'The slot has been released.',
                  tone: 'success'
                });
                setCancelTarget(null);
              }}
            >
              Cancel booking
            </Button>
          </div>
        }
      >
        {cancelTarget && (
          <div className="space-y-3 text-sm">
            <p className="rounded-md bg-surface p-3">
              Refund: <span className="font-semibold">{refundFor(cancelTarget).pct}%</span>
              {cancelTarget.paymentStatus === 'Paid' && (
                <>
                  {' '}
                  ·{' '}
                  <span className="font-semibold tabular">
                    {peso(refundFor(cancelTarget).amount)}
                  </span>
                </>
              )}
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {cancellationPolicy.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
      <Sheet
        open={!!rescheduleTarget}
        onClose={() => setRescheduleTarget(null)}
        title="Reschedule"
        description={
          rescheduleTarget
            ? `Court ${rescheduleTarget.court} \xB7 ${rescheduleVenue?.name}`
            : void 0
        }
        footer={
          <Button
            className="pressable min-h-[48px] w-full"
            disabled={newHour === null}
            onClick={() => {
              if (!rescheduleTarget || newHour === null) return;
              updateBooking(rescheduleTarget.id, { date: newDate, startHour: newHour });
              toast({
                title: 'Booking moved',
                description: `${format(/* @__PURE__ */ new Date(`${newDate}T00:00:00`), 'EEE, MMM d')} at ${formatHour(newHour)}. Your QR pass was updated.`,
                tone: 'success'
              });
              setRescheduleTarget(null);
            }}
          >
            {newHour === null ? 'Pick a new time' : `Move to ${formatHour(newHour)}`}
          </Button>
        }
      >
        <p className="mb-2 text-sm font-semibold">Date</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 7 }, (_, i) => addDays(/* @__PURE__ */ new Date(), i)).map(
            (d, i) => {
              const iso = toLocalISO(d);
              return (
                <Chip
                  key={iso}
                  selected={newDate === iso}
                  onClick={() => {
                    setNewDate(iso);
                    setNewHour(null);
                  }}
                >
                  {i === 0 ? 'Today' : format(d, 'EEE d')}
                </Chip>
              );
            }
          )}
        </div>
        <p className="mb-2 mt-5 text-sm font-semibold">
          Open times on Court {rescheduleTarget?.court}
        </p>
        {openHours.length === 0 ? (
          <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
            No open times on this court for that day. Try another date.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {openHours.map((c) => (
              <Chip
                key={c.hour}
                selected={newHour === c.hour}
                onClick={() => setNewHour(c.hour)}
                className="justify-center"
              >
                {formatHour(c.hour)}
              </Chip>
            ))}
          </div>
        )}
      </Sheet>
    </div>
  );
}
export { MyBookings };
