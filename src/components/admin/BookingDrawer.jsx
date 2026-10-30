import { Icon } from '../ui/Icon';
import { Sheet } from '../ui/Sheet';
import { StatusChip } from '../ui/StatusChip';
import { Button } from '../Button';
import { useToast } from '../Toast';
import { paymentMeta } from '../booking/PaymentOptions';
import { useBookings } from '../../contexts/BookingsContext';
import { venues } from '../../data/venues';
import { formatDate, formatRange, peso } from '../../utils/format';
function BookingDrawer({ booking, onClose }) {
  const { updateBooking } = useBookings();
  const { toast } = useToast();
  const venue = venues.find((v) => v.id === booking?.venueId);
  const act = (patch, msg) => {
    if (!booking) return;
    updateBooking(booking.id, patch);
    toast({ title: msg, tone: 'success' });
    onClose();
  };
  return (
    <Sheet
      open={!!booking}
      onClose={onClose}
      side="right"
      title={booking ? booking.code : ''}
      description={
        booking ? `Created ${formatDate(booking.createdAt.slice(0, 10), 'MMM d, yyyy')}` : void 0
      }
      footer={
        booking && (
          <div className="flex flex-wrap gap-2">
            {booking.status === 'Confirmed' && (
              <Button
                className="pressable flex-1"
                onClick={() => act({ status: 'Checked-in' }, 'Checked in')}
              >
                Check in
              </Button>
            )}
            {booking.status === 'Confirmed' && (
              <Button
                variant="secondary"
                onClick={() => act({ status: 'No-show' }, 'Marked as no-show')}
              >
                No-show
              </Button>
            )}
            {(booking.status === 'Confirmed' || booking.status === 'Checked-in') && (
              <Button
                variant="destructive"
                onClick={() =>
                  act(
                    {
                      status: 'Cancelled',
                      paymentStatus:
                        booking.paymentStatus === 'Paid' ? 'Refunded' : booking.paymentStatus
                    },
                    booking.paymentStatus === 'Paid'
                      ? `Cancelled \xB7 ${peso(booking.total)} refunded`
                      : 'Cancelled'
                  )
                }
              >
                Cancel & refund
              </Button>
            )}
            {(booking.status === 'Completed' ||
              booking.status === 'Cancelled' ||
              booking.status === 'No-show') && (
              <p className="text-sm text-muted-foreground">
                No actions available for {booking.status.toLowerCase()} bookings.
              </p>
            )}
          </div>
        )
      }
    >
      {booking && venue && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <StatusChip status={booking.status} />
            <span className="text-sm text-muted-foreground">
              {paymentMeta[booking.payment].label} · {booking.paymentStatus}
            </span>
          </div>
          <div className="flex gap-3 rounded-lg bg-surface p-3">
            <img src={venue.image} alt="" className="h-14 w-14 rounded-md object-cover" />
            <div>
              <p className="font-semibold">{venue.name}</p>
              <p className="text-sm text-muted-foreground">
                Court {booking.court} · {venue.neighborhood}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['Player', booking.playerName],
              ['Players', String(booking.players)],
              ['Date', formatDate(booking.date, 'EEE, MMM d')],
              ['Time', formatRange(booking.startHour, booking.hours)],
              ['Paddle rentals', String(booking.addOns.paddle)],
              ['Total', peso(booking.total)]
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <p className="mb-2 text-sm font-semibold">Timeline</p>
            <ol className="space-y-3 border-l border-border pl-4 text-sm">
              <li className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-court" />
                Booked via app · {formatDate(booking.createdAt.slice(0, 10), 'MMM d')}
              </li>
              {booking.paymentStatus === 'Paid' && (
                <li className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-court" />
                  Payment captured · {paymentMeta[booking.payment].label}
                </li>
              )}
              {booking.status === 'Checked-in' && (
                <li className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-success" />
                  Checked in at gate
                </li>
              )}
              {booking.status === 'Cancelled' && (
                <li className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-destructive" />
                  Cancelled{booking.paymentStatus === 'Refunded' ? ' \xB7 refund issued' : ''}
                </li>
              )}
            </ol>
          </div>
          <a
            href={`mailto:?subject=Your DinkZone booking ${booking.code}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-court hover:underline dark:text-highlight"
          >
            <Icon name="mail" className="h-4 w-4" aria-hidden />
            Message player
          </a>
        </div>
      )}
    </Sheet>
  );
}
export { BookingDrawer };
