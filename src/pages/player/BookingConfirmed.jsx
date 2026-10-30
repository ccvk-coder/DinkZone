import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { BookingQR } from '../../components/booking/BookingQR';
import { SuccessMark } from '../../components/booking/SuccessMark';
import { CourtLines } from '../../components/ui/CourtLines';
import { paymentMeta } from '../../components/booking/PaymentOptions';
import { useBookings } from '../../contexts/BookingsContext';
import { useApp } from '../../contexts/AppContext';
import { venues } from '../../data/venues';
import { qrPayload, slotWindow } from '../../utils/checkin';
import { downloadCalendarEvent } from '../../utils/calendar';
import { formatDate, formatHour, formatRange, peso } from '../../utils/format';
function BookingConfirmed() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { bookings } = useBookings();
  const { nfcCards } = useApp();
  const booking = bookings.find((b) => b.id === id);
  const venue = venues.find((v) => v.id === booking?.venueId);
  if (!booking || !venue) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          title="Booking not found"
          action={<Button onClick={() => navigate('/bookings')}>My bookings</Button>}
        />
      </div>
    );
  }
  const { validFrom } = slotWindow(booking);
  const fromLabel = validFrom.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' });
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-6 md:px-8 md:pt-10">
      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:gap-5 md:text-left">
        <SuccessMark size={72} />
        <div className="mt-4 md:mt-0">
          <h1 className="text-3xl font-extrabold md:text-4xl">You’re booked.</h1>
          <p className="mt-1 text-muted-foreground">
            {formatDate(booking.date, 'EEEE, MMM d')} ·{' '}
            {formatRange(booking.startHour, booking.hours)} · Court {booking.court}
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,380px)_1fr] md:items-start">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1], delay: 0.08 }}
          className="overflow-hidden rounded-lg border border-border bg-card shadow-md"
          aria-label="Entry pass"
        >
          <div className="net-texture relative overflow-hidden bg-brand p-5 text-white">
            <CourtLines className="absolute -right-10 -top-6 w-56 text-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight">
              Entry pass
            </p>
            <p className="relative mt-1 font-display text-xl font-bold leading-tight">
              {venue.name}
            </p>
            <div className="relative mt-4 grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-white/60">Date</p>
                <p className="font-semibold">{formatDate(booking.date, 'MMM d')}</p>
              </div>
              <div>
                <p className="text-white/60">Time</p>
                <p className="font-semibold tabular">{formatHour(booking.startHour)}</p>
              </div>
              <div>
                <p className="text-white/60">Court</p>
                <p className="font-semibold">{booking.court}</p>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center p-5">
            <span
              className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-background"
              aria-hidden
            />
            <span
              className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-background"
              aria-hidden
            />
            <BookingQR
              value={qrPayload(booking)}
              size={200}
              className="w-[232px] border border-border"
              label={`QR entry pass for booking ${booking.code}`}
            />
            <p className="mt-3 font-mono text-sm font-semibold tracking-wider">{booking.code}</p>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              Valid from {fromLabel} until your slot ends
            </p>
          </div>
        </motion.article>
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            className="pressable min-h-[52px]"
            onClick={() => navigate(`/bookings/${booking.id}/checkin`)}
          >
            Open check-in pass
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              className="pressable min-h-[48px]"
              onClick={() => {
                downloadCalendarEvent(booking, venue);
                toast({ title: 'Calendar event downloaded', tone: 'success' });
              }}
            >
              <span className="inline-flex items-center gap-2">
                <Icon name="calendar-plus" className="h-4 w-4" aria-hidden />
                Add to calendar
              </span>
            </Button>
            <Button
              variant="secondary"
              className="pressable min-h-[48px]"
              onClick={() => navigate('/profile?section=nfc')}
            >
              <span className="inline-flex items-center gap-2">
                <Icon name="nfc" className="h-4 w-4" aria-hidden />
                {nfcCards.length ? 'Manage NFC' : 'Add NFC card'}
              </span>
            </Button>
          </div>
          {nfcCards.length > 0 && (
            <p className="flex items-center gap-2 rounded-md bg-accent px-3 py-2.5 text-sm text-accent-foreground">
              <Icon name="nfc" className="h-4 w-4" aria-hidden /> Tap-to-enter is on with card •
              {nfcCards[0].last4}
            </p>
          )}
          <div className="mt-2 rounded-lg border border-border bg-card p-5">
            <h2 className="text-lg font-bold">Summary</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {[
                ['Address', venue.address],
                ['Players', `${booking.players}`],
                ['Payment', `${paymentMeta[booking.payment].label} \xB7 ${booking.paymentStatus}`],
                ['Total', peso(booking.total)]
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Link
            to="/bookings"
            className="mt-1 text-center text-sm font-semibold text-court hover:underline dark:text-highlight md:text-left"
          >
            View all bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
export { BookingConfirmed };
