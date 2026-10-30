import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { addDays, format } from 'date-fns';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { Modal } from '../../components/Modal';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { IconButton } from '../../components/ui/IconButton';
import { Chip } from '../../components/ui/Chip';
import { QuantityStepper } from '../../components/ui/QuantityStepper';
import { SlotGrid, SlotLegend } from '../../components/booking/SlotGrid';
import { StepIndicator } from '../../components/booking/StepIndicator';
import { HoldTimer } from '../../components/booking/HoldTimer';
import { PaymentOptions } from '../../components/booking/PaymentOptions';
import { BookingSummary } from '../../components/booking/BookingSummary';
import { venues } from '../../data/venues';
import { addOns } from '../../data/addOns';
import { products } from '../../data/products';
import { useBookingFlow } from '../../hooks/useBookingFlow';
import { useIsTablet } from '../../hooks/useMediaQuery';
import { useBookings } from '../../contexts/BookingsContext';
import { useShop } from '../../contexts/ShopContext';
import { useApp } from '../../contexts/AppContext';
import { formatRange, peso, shortId } from '../../utils/format';
import { toLocalISO } from '../../utils/slots';
const ease = [0.23, 1, 0.32, 1];
const days = Array.from({ length: 10 }, (_, i) => addDays(/* @__PURE__ */ new Date(), i));
const upsell = products.find((p) => p.id === 'p-z5');
function BookCourt() {
  const { venueId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const isTablet = useIsTablet();
  const { toast } = useToast();
  const { addBooking } = useBookings();
  const { addToCart } = useShop();
  const { user } = useApp();
  const venue = venues.find((v) => v.id === venueId);
  const hourParam = params.get('hour');
  const flow = useBookingFlow(venue, {
    date: params.get('date'),
    hour: hourParam ? Number(hourParam) : null,
    court: params.get('court') ? Number(params.get('court')) : null
  });
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' });
  const [cardErrors, setCardErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [payError, setPayError] = useState(null);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [flow.step]);
  if (!venue) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          title="Court not found"
          description="This venue may have been removed."
          action={<Button onClick={() => navigate('/courts')}>Browse courts</Button>}
        />
      </div>
    );
  }
  const startHour = flow.hours[0] ?? null;
  const hasSlot = flow.court !== null && flow.hours.length > 0;
  const validateCard = () => {
    const errs = {};
    if (card.number.replace(/\s/g, '').length !== 16)
      errs.number = 'Enter the 16-digit card number';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) errs.expiry = 'Use MM/YY';
    if (!/^\d{3,4}$/.test(card.cvc)) errs.cvc = '3 or 4 digits';
    setCardErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const pay = () => {
    setPayError(null);
    if (flow.payment === 'card' && !validateCard()) return;
    setProcessing(true);
    window.setTimeout(() => {
      if (flow.payment === 'card' && card.number.replace(/\s/g, '') === '4000000000000002') {
        setProcessing(false);
        setPayError('Your card was declined. Try another card or switch to GCash.');
        return;
      }
      const id = shortId('bk');
      addBooking({
        id,
        code: shortId('DZ'),
        venueId: venue.id,
        court: flow.court,
        date: flow.date,
        startHour,
        hours: flow.hours.length,
        players: flow.players,
        addOns: flow.extras,
        total: flow.total,
        payment: flow.payment,
        paymentStatus: flow.payment === 'venue' ? 'Pay at venue' : 'Paid',
        status: 'Confirmed',
        playerName: user.name,
        createdAt: /* @__PURE__ */ new Date().toISOString()
      });
      flow.releaseHold();
      navigate(`/bookings/${id}/confirmed`, { replace: true });
    }, 1300);
  };
  const goBack = () => {
    if (flow.step === 2) navigate(-1);
    else {
      if (flow.step === 3) flow.releaseHold();
      flow.setStep(flow.step - 1);
    }
  };
  const primary =
    flow.step === 2
      ? {
          label: hasSlot ? `Hold ${formatRange(startHour, flow.hours.length)}` : 'Pick a time slot',
          disabled: !hasSlot,
          onClick: () => {
            flow.startHold();
            flow.setStep(3);
          }
        }
      : flow.step === 3
        ? { label: 'Continue to payment', disabled: false, onClick: () => flow.setStep(4) }
        : {
            label: processing
              ? 'Processing\u2026'
              : flow.payment === 'venue'
                ? 'Confirm booking'
                : `Pay ${peso(flow.total)}`,
            disabled: processing,
            onClick: pay
          };
  const summary = (
    <BookingSummary
      venue={venue}
      date={flow.date}
      court={flow.court}
      startHour={startHour}
      hours={flow.hours.length}
      players={flow.players}
      extras={flow.extras}
      courtPrice={flow.courtPrice}
      serviceFee={flow.serviceFee}
      total={flow.total}
    />
  );
  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 pb-3 pt-2 backdrop-blur md:px-8">
        <div className="flex items-center gap-2">
          <IconButton icon="arrow-left" label="Back" onClick={goBack} className="-ml-2.5" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-bold leading-tight">{venue.name}</p>
            <p className="text-xs text-muted-foreground">Step {flow.step} of 4</p>
          </div>
          {flow.holdUntil && <HoldTimer remaining={flow.remaining} />}
        </div>
        <div className="mt-2">
          <StepIndicator current={flow.step} />
        </div>
      </header>
      <div className="grid grid-cols-1 gap-8 px-4 pb-32 pt-5 md:px-8 lg:grid-cols-[1fr_340px] lg:pb-12">
        <AnimatePresence mode="wait">
          <motion.section
            key={flow.step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2, ease }}
            className="min-w-0"
          >
            {flow.step === 2 && (
              <>
                <div className="mb-5 flex items-center justify-between rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center gap-3">
                    <Icon name="circle-check" className="h-5 w-5 text-success" aria-hidden />
                    <span className="text-sm">
                      <span className="text-muted-foreground">Court · </span>
                      <span className="font-semibold">{venue.name}</span>
                    </span>
                  </div>
                  <Link
                    to="/courts"
                    className="text-sm font-semibold text-court hover:underline dark:text-highlight"
                  >
                    Change
                  </Link>
                </div>
                <h2 className="text-2xl font-extrabold">Pick a date &amp; time</h2>
                <div
                  className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0"
                  role="listbox"
                  aria-label="Date"
                >
                  {days.map((d, i) => {
                    const iso = toLocalISO(d);
                    const active = iso === flow.date;
                    return (
                      <button
                        key={iso}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => flow.setDate(iso)}
                        className={`pressable flex min-h-[64px] w-[60px] shrink-0 flex-col items-center justify-center rounded-lg border ${active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-foreground/30'}`}
                      >
                        <span className="text-[11px] font-medium uppercase opacity-80">
                          {i === 0 ? 'Today' : format(d, 'EEE')}
                        </span>
                        <span className="font-display text-xl font-bold tabular">
                          {format(d, 'd')}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mb-3 mt-6 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium">1-hour blocks · select up to 3 in a row</p>
                  <SlotLegend />
                </div>
                <SlotGrid
                  rows={flow.rows}
                  courts={venue.courts}
                  selectedCourt={flow.court}
                  selectedHours={flow.hours}
                  onToggle={flow.toggleSlot}
                  layout={isTablet && venue.courts > 1 ? 'matrix' : 'tiles'}
                  activeCourt={flow.activeCourt}
                  onActiveCourtChange={flow.setActiveCourt}
                />
                {flow.rows.every((r) =>
                  r.every((c) => c.status !== 'available' && c.status !== 'peak')
                ) && (
                  <p className="mt-4 rounded-md bg-muted p-3 text-sm text-muted-foreground">
                    Every court is booked for this day. Try tomorrow — mornings usually have space.
                  </p>
                )}
              </>
            )}
            {flow.step === 3 && (
              <>
                <h2 className="text-2xl font-extrabold">Players &amp; add-ons</h2>
                <div className="mt-5 rounded-lg border border-border bg-card p-4">
                  <p className="text-sm font-semibold">How many players?</p>
                  <div className="mt-3 flex gap-2">
                    {[2, 3, 4].map((n) => (
                      <Chip
                        key={n}
                        selected={flow.players === n}
                        onClick={() => flow.setPlayers(n)}
                      >
                        {n} players
                      </Chip>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Up to 4 per court. Everyone gets the same QR pass.
                  </p>
                </div>
                <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
                  {addOns.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 p-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted">
                        <Icon name={a.icon} className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{a.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {a.detail} · <span className="tabular">{peso(a.price)}</span>
                        </p>
                      </div>
                      <QuantityStepper
                        label={a.name}
                        value={flow.extras[a.id]}
                        max={a.id === 'paddle' ? flow.players : 8}
                        onChange={(v) => flow.setExtras((e) => ({ ...e, [a.id]: v }))}
                      />
                    </li>
                  ))}
                </ul>
                {flow.extras.paddle > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease }}
                    className="mt-4 flex items-center gap-4 rounded-lg bg-brand p-4 text-white"
                  >
                    <img
                      src={upsell.image}
                      alt=""
                      className="h-16 w-16 rounded-md bg-white object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-highlight">
                        Stop renting
                      </p>
                      <p className="font-display font-bold leading-tight">
                        {upsell.brand} {upsell.name}
                      </p>
                      <p className="text-sm text-white/70">
                        {peso(upsell.price)} · pick up at the court
                      </p>
                    </div>
                    <button
                      type="button"
                      className="pressable min-h-[44px] rounded-full bg-highlight px-4 text-sm font-semibold text-highlight-foreground hover:brightness-95"
                      onClick={() => {
                        addToCart({ productId: upsell.id, size: '4.25"', qty: 1 });
                        toast({
                          title: 'Added to cart',
                          description: 'Check out from the Shop to collect it at your court.',
                          tone: 'success'
                        });
                      }}
                    >
                      Add
                    </button>
                  </motion.div>
                )}
              </>
            )}
            {flow.step === 4 && (
              <>
                <h2 className="text-2xl font-extrabold">Pay &amp; confirm</h2>
                <div className="mt-5">
                  <PaymentOptions
                    name="booking-payment"
                    value={flow.payment}
                    onChange={flow.setPayment}
                  />
                </div>
                {flow.payment === 'card' && (
                  <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-[1fr_120px_100px]">
                    <TextInput
                      label="Card number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      value={card.number}
                      error={cardErrors.number}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          number: e.target.value
                            .replace(/[^\d]/g, '')
                            .slice(0, 16)
                            .replace(/(.{4})/g, '$1 ')
                            .trim()
                        })
                      }
                    />
                    <TextInput
                      label="Expiry"
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      value={card.expiry}
                      error={cardErrors.expiry}
                      onChange={(e) => setCard({ ...card, expiry: e.target.value.slice(0, 5) })}
                    />
                    <TextInput
                      label="CVC"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={card.cvc}
                      error={cardErrors.cvc}
                      onChange={(e) =>
                        setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })
                      }
                    />
                  </div>
                )}
                {(flow.payment === 'gcash' || flow.payment === 'maya') && (
                  <p className="mt-4 flex items-center gap-2 rounded-md bg-surface p-3 text-sm text-muted-foreground">
                    <Icon name="smartphone" className="h-4 w-4" aria-hidden /> You’ll approve the
                    payment in {flow.payment === 'gcash' ? 'GCash' : 'Maya'} — it takes a few
                    seconds.
                  </p>
                )}
                {flow.payment === 'venue' && (
                  <p className="mt-4 flex items-center gap-2 rounded-md bg-surface p-3 text-sm text-muted-foreground">
                    <Icon name="info" className="h-4 w-4" aria-hidden /> Unpaid bookings are
                    released if you don’t check in within 10 minutes of start time.
                  </p>
                )}
                {payError && (
                  <p
                    role="alert"
                    className="mt-4 flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm font-medium text-destructive"
                  >
                    <Icon name="circle-alert" className="h-4 w-4" aria-hidden /> {payError}
                  </p>
                )}
                <div className="mt-6 rounded-lg border border-border bg-card p-4 lg:hidden">
                  {summary}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Free cancellation up to 24 hours before. Payments are simulated in this prototype.
                </p>
              </>
            )}
          </motion.section>
        </AnimatePresence>
        <aside className="hidden lg:block">
          <div className="sticky top-32 rounded-lg border border-border bg-card p-5">
            {summary}
            <Button
              size="lg"
              className="pressable mt-5 min-h-[52px] w-full"
              disabled={primary.disabled}
              onClick={primary.onClick}
            >
              {primary.label}
            </Button>
          </div>
        </aside>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:left-20 lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl font-extrabold leading-none tabular">
              {peso(flow.total)}
            </p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {hasSlot
                ? `Court ${flow.court} \xB7 ${formatRange(startHour, flow.hours.length)}`
                : 'No slot selected'}
            </p>
          </div>
          <Button
            size="lg"
            className="pressable min-h-[52px] flex-1"
            disabled={primary.disabled}
            onClick={primary.onClick}
          >
            {primary.label}
          </Button>
        </div>
      </div>
      <Modal
        open={flow.holdExpired && flow.step > 2}
        onClose={() => {
          flow.releaseHold();
          flow.setStep(2);
        }}
        title="Your hold expired"
        description="We release slots after 5 minutes so others can book. Your slot may still be free."
        footer={
          <Button
            onClick={() => {
              flow.releaseHold();
              flow.setStep(2);
            }}
          >
            Pick a time again
          </Button>
        }
      />
    </div>
  );
}
export { BookCourt };
