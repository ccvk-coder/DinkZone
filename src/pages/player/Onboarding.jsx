import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { Wordmark } from '../../components/ui/Wordmark';
import { HeroSlideshow } from '../../components/onboarding/HeroSlideshow';
import { LocationPicker } from '../../components/courts/LocationPicker';
import { useApp } from '../../contexts/AppContext';
const ease = [0.23, 1, 0.32, 1];
function Onboarding() {
  const navigate = useNavigate();
  const { requestGps, completeOnboarding, gpsStatus } = useApp();
  const [step, setStep] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const finish = () => {
    completeOnboarding();
    navigate('/courts', { replace: true });
  };
  const allow = async () => {
    await requestGps();
    finish();
  };
  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-background md:flex-row">
      <div className="relative flex min-h-[52vh] flex-col overflow-hidden bg-brand text-white md:sticky md:top-0 md:h-[100dvh] md:w-1/2">
        <HeroSlideshow />
        <div className="pointer-events-none absolute inset-0 bg-brand/55" aria-hidden />
        <div className="relative flex flex-1 flex-col p-6 pb-14 md:p-12 md:pb-20">
          <Wordmark inverted />
          <div className="mt-auto max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
              Cebu City · 14 venues · 58 courts
            </p>
            <h1 className="mt-3 text-[40px] font-extrabold leading-[0.95] md:text-6xl">
              Find a court.
              <br />
              Book in <span className="text-highlight">30 seconds.</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-8 md:px-14">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease }}
              className="mx-auto w-full max-w-md"
            >
              <ul className="space-y-5">
                {[
                  [
                    'map-pin',
                    'Nearest courts first',
                    'Live availability across every venue in the city.'
                  ],
                  [
                    'scan-line',
                    'Tap or scan to enter',
                    'Your booking is a QR pass \u2014 or link an NFC card.'
                  ],
                  [
                    'trophy',
                    'Play for real prizes',
                    'Join tournaments with prize pools up to \u20B1300,000.'
                  ]
                ].map(([icon, title, body]) => (
                  <li key={title} className="flex gap-4">
                    <Icon
                      name={icon}
                      className="mt-0.5 h-6 w-6 shrink-0 text-court dark:text-highlight"
                      aria-hidden
                    />
                    <div>
                      <p className="font-display text-lg font-bold leading-tight">{title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="pressable mt-10 min-h-[52px] w-full"
                onClick={() => setStep(1)}
              >
                Get started
              </Button>
              <button
                type="button"
                onClick={finish}
                className="mt-3 min-h-[44px] w-full text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Skip for now
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="location"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease }}
              className="mx-auto w-full max-w-md"
            >
              <div className="relative mb-6 grid h-24 w-24 place-items-center">
                <span className="nfc-wave absolute inset-0 rounded-full bg-court/20" aria-hidden />
                <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Icon name="navigation" className="h-7 w-7" aria-hidden />
                </span>
              </div>
              <h2 className="text-3xl font-extrabold leading-tight">See courts closest to you</h2>
              <p className="mt-3 text-muted-foreground">
                We use your location only to sort courts by distance and travel time. It’s never
                shared with venues, and you can turn it off anytime.
              </p>
              <Button
                size="lg"
                className="pressable mt-8 min-h-[52px] w-full"
                onClick={allow}
                disabled={gpsStatus === 'prompting'}
              >
                {gpsStatus === 'prompting' ? 'Waiting for permission\u2026' : 'Allow location'}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="pressable mt-3 min-h-[52px] w-full"
                onClick={() => setPickerOpen(true)}
              >
                Enter a location instead
              </Button>
              <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="shield-check" className="h-4 w-4" aria-hidden /> Your browser will ask
                next — tap “Allow while using”.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <LocationPicker
        open={pickerOpen}
        onClose={() => {
          setPickerOpen(false);
          finish();
        }}
      />
    </div>
  );
}
export { Onboarding };
