import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { IconButton } from '../../components/ui/IconButton';
import { PaymentOptions } from '../../components/booking/PaymentOptions';
import { BookingQR } from '../../components/booking/BookingQR';
import { SuccessMark } from '../../components/booking/SuccessMark';
import { tournaments, leaderboard } from '../../data/tournaments';
import { useBookings } from '../../contexts/BookingsContext';
import { peso, shortId } from '../../utils/format';
import { cn } from '../../utils/classNames';
const ease = [0.23, 1, 0.32, 1];
function EventRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addRegistration } = useBookings();
  const t = tournaments.find((x) => x.id === id);
  const [step, setStep] = useState(1);
  const [divisionId, setDivisionId] = useState(null);
  const [partner, setPartner] = useState('');
  const [payment, setPayment] = useState('gcash');
  const [processing, setProcessing] = useState(false);
  const [code, setCode] = useState(null);
  const division = t?.divisions.find((d) => d.id === divisionId);
  const isSingles = division?.format === 'Singles';
  const suggestions = useMemo(() => {
    const q = partner.replace('@', '').toLowerCase();
    if (!q || q.length < 2) return [];
    return leaderboard.filter((p) => `${p.name} ${p.handle}`.toLowerCase().includes(q)).slice(0, 4);
  }, [partner]);
  if (!t) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          title="Event not found"
          action={<Button onClick={() => navigate('/events')}>All events</Button>}
        />
      </div>
    );
  }
  const totalSteps = isSingles ? 2 : 3;
  const payStep = isSingles ? 2 : 3;
  const pay = () => {
    setProcessing(true);
    window.setTimeout(() => {
      const c = shortId('CEB');
      addRegistration({
        id: shortId('reg'),
        tournamentId: t.id,
        divisionId,
        partner: isSingles ? '' : partner,
        code: c,
        createdAt: /* @__PURE__ */ new Date().toISOString()
      });
      setProcessing(false);
      setCode(c);
    }, 1200);
  };
  if (code) {
    return (
      <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col items-center justify-center px-4 py-10 text-center">
        <SuccessMark size={72} />
        <h1 className="mt-5 text-3xl font-extrabold">You’re in the draw</h1>
        <p className="mt-1 text-muted-foreground">
          {t.name} · {division?.name}
        </p>
        {!isSingles && partner && (
          <p className="mt-1 text-sm text-muted-foreground">
            Invite sent to {partner}. They’ll confirm from their app.
          </p>
        )}
        <BookingQR
          value={`DZT|${code}|${t.id}|${divisionId}`}
          size={200}
          className="mt-6 w-[232px] border border-border"
          label={`Tournament entry QR ${code}`}
        />
        <p className="mt-3 font-mono font-semibold tracking-wider">{code}</p>
        <p className="text-xs text-muted-foreground">Show this pass at check-in on match day.</p>
        <Button
          size="lg"
          className="pressable mt-8 min-h-[52px] w-full"
          onClick={() => navigate(`/events/${t.id}`)}
        >
          Back to event
        </Button>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-32 md:px-8">
      <header className="flex items-center gap-2 py-3">
        <IconButton
          icon="arrow-left"
          label="Back"
          className="-ml-2.5"
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-bold">{t.name}</p>
          <p className="text-xs text-muted-foreground">
            Step {step} of {divisionId ? totalSteps : 3}
          </p>
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2, ease }}
        >
          {step === 1 && (
            <>
              <h1 className="mt-2 text-3xl font-extrabold">Choose a division</h1>
              <div className="mt-5 space-y-2" role="radiogroup" aria-label="Division">
                {t.divisions.map((d) => {
                  const left = d.slots - d.filled;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      role="radio"
                      aria-checked={divisionId === d.id}
                      disabled={left === 0}
                      onClick={() => setDivisionId(d.id)}
                      className={cn(
                        'pressable flex min-h-[72px] w-full items-center gap-4 rounded-lg border bg-card p-4 text-left disabled:opacity-50',
                        divisionId === d.id
                          ? 'border-brand ring-1 ring-brand dark:border-highlight dark:ring-highlight'
                          : 'border-border hover:border-foreground/30'
                      )}
                    >
                      <Icon
                        name={d.format === 'Singles' ? 'user' : 'users'}
                        className="h-5 w-5 text-court dark:text-highlight"
                        aria-hidden
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{d.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {d.skill} · {d.format}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'text-xs',
                          left <= 5 ? 'font-semibold text-warning' : 'text-muted-foreground'
                        )}
                      >
                        {left === 0 ? 'Full' : `${left} left`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {step === 2 && !isSingles && (
            <>
              <h1 className="mt-2 text-3xl font-extrabold">Invite your partner</h1>
              <p className="mt-2 text-muted-foreground">
                They’ll get a notification to confirm. You can swap partners until registration
                closes.
              </p>
              <div className="relative mt-5">
                <TextInput
                  label="Partner’s DinkZone username"
                  placeholder="@username"
                  value={partner}
                  onChange={(e) => setPartner(e.target.value)}
                />
                {suggestions.length > 0 && !suggestions.some((s) => s.handle === partner) && (
                  <ul
                    className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-md border border-border bg-card shadow-lg"
                    role="listbox"
                  >
                    {suggestions.map((s) => (
                      <li key={s.handle}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={false}
                          onClick={() => setPartner(s.handle)}
                          className="flex min-h-[48px] w-full items-center justify-between px-4 text-left text-sm hover:bg-muted"
                        >
                          <span>
                            <span className="font-medium">{s.name}</span>{' '}
                            <span className="text-muted-foreground">{s.handle}</span>
                          </span>
                          <span className="text-xs tabular text-muted-foreground">
                            {s.rating.toFixed(2)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or
                <span className="h-px flex-1 bg-border" />
              </div>
              <Button
                variant="secondary"
                className="pressable min-h-[48px] w-full"
                onClick={() => {
                  navigator.clipboard
                    ?.writeText(`https://dinkzone.ph/join/${t.id}?from=migsdinks`)
                    .catch(() => void 0);
                  setPartner('Invite link');
                  toast({
                    title: 'Invite link copied',
                    description: 'Send it on Messenger or Viber.',
                    tone: 'success'
                  });
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="link" className="h-4 w-4" aria-hidden />
                  Copy invite link
                </span>
              </Button>
            </>
          )}
          {step === payStep && (
            <>
              <h1 className="mt-2 text-3xl font-extrabold">Pay entry fee</h1>
              <div className="mt-4 flex items-center justify-between rounded-lg bg-surface p-4">
                <div>
                  <p className="text-sm font-semibold">{division?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {isSingles ? 'Solo entry' : `With ${partner}`}
                  </p>
                </div>
                <p className="font-display text-2xl font-extrabold tabular">{peso(t.entryFee)}</p>
              </div>
              <div className="mt-5">
                <PaymentOptions
                  name="entry-payment"
                  value={payment}
                  onChange={setPayment}
                  methods={['gcash', 'maya', 'card']}
                />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Entry fees are refundable until 7 days before the event.
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:left-20 lg:left-60">
        <div className="mx-auto max-w-2xl">
          {step === 1 && (
            <Button
              size="lg"
              className="pressable min-h-[52px] w-full"
              disabled={!divisionId}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          )}
          {step === 2 && !isSingles && (
            <Button
              size="lg"
              className="pressable min-h-[52px] w-full"
              disabled={partner.trim().length < 3}
              onClick={() => setStep(3)}
            >
              Continue to payment
            </Button>
          )}
          {step === payStep && (
            <Button
              size="lg"
              className="pressable min-h-[52px] w-full"
              disabled={processing}
              onClick={pay}
            >
              {processing ? 'Processing\u2026' : `Pay ${peso(t.entryFee)}`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
export { EventRegister };
