import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { IconButton } from '../../components/ui/IconButton';
import { BookingQR } from '../../components/booking/BookingQR';
import { SuccessMark } from '../../components/booking/SuccessMark';
import { useBookings } from '../../contexts/BookingsContext';
import { useApp } from '../../contexts/AppContext';
import { venues } from '../../data/venues';
import { getPassState, qrPayload, slotWindow } from '../../utils/checkin';
import { formatDate, formatRange } from '../../utils/format';
import { haptic, playCue, supportsWebNfc } from '../../utils/feedback';
import { useCountdown, formatCountdown } from '../../hooks/useCountdown';
const stateMeta = {
  ready: {
    label: 'Ready to enter',
    detail: 'Show this QR at the gate or tap your NFC card.',
    icon: 'circle-check',
    tone: 'bg-success/10 text-success'
  },
  upcoming: {
    label: 'Not open yet',
    detail: 'Your pass activates 15 minutes before your slot.',
    icon: 'clock',
    tone: 'bg-muted text-muted-foreground'
  },
  'checked-in': {
    label: 'Checked in',
    detail: 'Enjoy your game. Your court is ready.',
    icon: 'badge-check',
    tone: 'bg-success/10 text-success'
  },
  expired: {
    label: 'Pass expired',
    detail: 'This slot has ended. Rebook from My bookings.',
    icon: 'circle-x',
    tone: 'bg-muted text-muted-foreground'
  },
  'wrong-court': {
    label: 'Wrong venue',
    detail: 'This pass is for a different venue.',
    icon: 'triangle-alert',
    tone: 'bg-warning/10 text-warning'
  },
  cancelled: {
    label: 'Booking cancelled',
    detail: 'This pass is no longer valid.',
    icon: 'ban',
    tone: 'bg-destructive/10 text-destructive'
  }
};
function CheckIn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { bookings, updateBooking } = useBookings();
  const { nfcCards, online } = useApp();
  const booking = bookings.find((b) => b.id === id);
  const venue = venues.find((v) => v.id === booking?.venueId);
  const [now, setNow] = useState(() => /* @__PURE__ */ new Date());
  const [nfcListening, setNfcListening] = useState(false);
  const [justCheckedIn, setJustCheckedIn] = useState(false);
  useEffect(() => {
    const t = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 15e3);
    return () => window.clearInterval(t);
  }, []);
  const opensAt = booking ? slotWindow(booking).validFrom.getTime() : null;
  const untilOpen = useCountdown(
    booking && getPassState(booking, now) === 'upcoming' ? opensAt : null
  );
  if (!booking || !venue) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          title="Pass not found"
          action={<Button onClick={() => navigate('/bookings')}>My bookings</Button>}
        />
      </div>
    );
  }
  const state = getPassState(booking, now);
  const meta = stateMeta[state];
  const qrActive = state === 'ready' || state === 'checked-in';
  const completeCheckIn = () => {
    updateBooking(booking.id, { status: 'Checked-in' });
    setJustCheckedIn(true);
    playCue('success');
    haptic('success');
  };
  const startNfc = async () => {
    if (!supportsWebNfc()) {
      toast({
        title: 'NFC isn\u2019t available in this browser',
        description: nfcCards.length
          ? `Use your QR, or tap your linked card \u2022${nfcCards[0].last4} on the reader.`
          : 'Use your QR pass at the gate instead.',
        tone: 'info'
      });
      return;
    }
    try {
      setNfcListening(true);
      const Reader = window.NDEFReader;
      const reader = new Reader();
      await reader.scan();
      reader.onreading = () => {
        setNfcListening(false);
        if (state === 'ready') completeCheckIn();
      };
    } catch {
      setNfcListening(false);
      toast({
        title: 'NFC permission was blocked',
        description: 'Use your QR pass instead.',
        tone: 'error'
      });
    }
  };
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-10 md:px-8">
        <header className="flex items-center gap-2 py-3">
          <IconButton
            icon="x"
            label="Close pass"
            onClick={() => navigate('/bookings')}
            className="-ml-2.5"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-bold">{venue.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(booking.date)} · {formatRange(booking.startHour, booking.hours)} · Court{' '}
              {booking.court}
            </p>
          </div>
          {!online && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-warning">
              <Icon name="wifi-off" className="h-3.5 w-3.5" aria-hidden />
              Saved offline
            </span>
          )}
        </header>
        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-10">
          <section
            className="flex flex-col items-center rounded-lg border border-border bg-card p-6"
            aria-labelledby="pass-status"
          >
            <div
              role="status"
              aria-live="polite"
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ${meta.tone}`}
            >
              <Icon name={meta.icon} className="h-4 w-4" aria-hidden />
              <span id="pass-status">{meta.label}</span>
            </div>
            <AnimatePresence mode="wait">
              {justCheckedIn || state === 'checked-in' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col items-center py-10"
                >
                  <SuccessMark size={120} />
                  <p className="mt-6 font-display text-3xl font-extrabold">
                    Court {booking.court} is yours
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Checked in at{' '}
                    {/* @__PURE__ */ new Date().toLocaleTimeString('en-PH', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                </motion.div>
              ) : (
                <motion.div key="qr" className="mt-5 flex w-full flex-col items-center">
                  <div className="relative w-full max-w-[300px]">
                    <BookingQR
                      value={qrPayload(booking)}
                      size={268}
                      dimmed={!qrActive}
                      className="w-full border border-border"
                      label={`QR code for booking ${booking.code}. ${meta.label}`}
                    />
                    {state === 'upcoming' && (
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="rounded-lg bg-card px-5 py-3 text-center shadow-lg">
                          <p className="text-xs font-medium text-muted-foreground">Opens in</p>
                          <p className="font-display text-3xl font-extrabold tabular">
                            {untilOpen > 36e5
                              ? `${Math.floor(untilOpen / 36e5)}h ${Math.floor((untilOpen % 36e5) / 6e4)}m`
                              : formatCountdown(untilOpen)}
                          </p>
                        </div>
                      </div>
                    )}
                    {(state === 'expired' || state === 'cancelled') && (
                      <div className="absolute inset-0 grid place-items-center">
                        <Icon
                          name={meta.icon}
                          className="h-16 w-16 text-muted-foreground"
                          aria-hidden
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-4 font-mono text-base font-semibold tracking-widest">
                    {booking.code}
                  </p>
                  <p className="mt-1 max-w-xs text-center text-sm text-muted-foreground">
                    {meta.detail}
                  </p>
                  {qrActive && (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium">
                      <Icon name="sun" className="h-4 w-4 text-warning" aria-hidden />
                      Turn your screen brightness up for faster scanning
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
          <section className="flex flex-col gap-4" aria-labelledby="nfc-heading">
            <div className="net-texture relative overflow-hidden rounded-lg bg-brand p-6 text-white">
              <h2 id="nfc-heading" className="text-xl font-bold">
                Tap to enter
              </h2>
              <p className="mt-1 text-sm text-white/70">
                Hold your phone or linked card near the gate reader.
              </p>
              <div className="relative mx-auto my-8 grid h-32 w-32 place-items-center">
                {(nfcListening || state === 'ready') && (
                  <>
                    <span
                      className="nfc-wave absolute inset-0 rounded-full border-2 border-highlight/60"
                      aria-hidden
                    />
                    <span
                      className="nfc-wave absolute inset-0 rounded-full border-2 border-highlight/40 [animation-delay:0.7s]"
                      aria-hidden
                    />
                  </>
                )}
                <span className="grid h-20 w-20 place-items-center rounded-full bg-highlight text-highlight-foreground">
                  <Icon name="nfc" className="h-9 w-9" aria-hidden />
                </span>
              </div>
              {nfcCards.length > 0 ? (
                <p className="flex items-center gap-2 text-sm">
                  <Icon name="credit-card" className="h-4 w-4 text-highlight" aria-hidden />
                  Linked: {nfcCards[0].label} •{nfcCards[0].last4}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/profile?section=nfc')}
                  className="text-sm font-semibold text-highlight underline-offset-2 hover:underline"
                >
                  Link an NFC card
                </button>
              )}
              <button
                type="button"
                onClick={startNfc}
                disabled={!qrActive || state === 'checked-in'}
                className="pressable mt-4 min-h-[48px] w-full rounded-full bg-white/10 text-sm font-semibold hover:bg-white/15 disabled:opacity-40"
              >
                {nfcListening
                  ? 'Listening for tap\u2026'
                  : supportsWebNfc()
                    ? 'Use phone NFC'
                    : 'Phone NFC (not supported here)'}
              </button>
            </div>
            {state === 'ready' && (
              <button
                type="button"
                onClick={completeCheckIn}
                className="pressable min-h-[44px] rounded-md border border-dashed border-border text-sm text-muted-foreground hover:border-court hover:text-foreground"
              >
                Demo: simulate gate scan
              </button>
            )}
            <div className="rounded-lg border border-border bg-card p-4 text-sm">
              <p className="font-semibold">Gate tips</p>
              <ul className="mt-2 space-y-1.5 text-muted-foreground">
                <li className="flex gap-2">
                  <Icon name="wifi-off" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  Works offline — the pass is stored on this device.
                </li>
                <li className="flex gap-2">
                  <Icon name="users" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  One scan admits all {booking.players} players.
                </li>
                <li className="flex gap-2">
                  <Icon name="life-buoy" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  Trouble? Front desk can look you up by code {booking.code}.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export { CheckIn };
