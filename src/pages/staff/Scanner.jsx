import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { SuccessMark } from '../../components/booking/SuccessMark';
import { useScanner } from '../../hooks/useScanner';
import { useApp } from '../../contexts/AppContext';
import { venues } from '../../data/venues';
import { formatRange } from '../../utils/format';
import { cn } from '../../utils/classNames';
const outcomeStyle = {
  valid: { panel: 'bg-success text-white', icon: 'circle-check', label: 'VALID' },
  warning: {
    panel: 'bg-warning text-white dark:text-black',
    icon: 'triangle-alert',
    label: 'CHECK'
  },
  invalid: { panel: 'bg-destructive text-white dark:text-black', icon: 'circle-x', label: 'DENIED' }
};
function Scanner() {
  const { venueId } = useOutletContext();
  const { online } = useApp();
  const venue = venues.find((v) => v.id === venueId);
  const s = useScanner(venueId);
  const [lookup, setLookup] = useState('');
  const { result, setResult } = s;
  useEffect(() => {
    if (!result) return;
    const t = window.setTimeout(() => setResult(null), 5e3);
    return () => window.clearTimeout(t);
  }, [result, setResult]);
  const style = s.result ? outcomeStyle[s.result.outcome] : null;
  return (
    <div className="grid grid-cols-1 min-h-[calc(100dvh-72px)] gap-4 p-4 md:grid-cols-[1.15fr_1fr] md:p-6">
      <section
        className="relative flex min-h-[340px] flex-col overflow-hidden rounded-lg bg-[#06110C] text-white"
        aria-label="Camera scanner"
      >
        <video
          ref={s.videoRef}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            s.camera !== 'live' && 'hidden'
          )}
          muted
          playsInline
          aria-hidden
        />
        <div className="net-texture absolute inset-0" aria-hidden />
        <div className="relative flex items-center justify-between p-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                s.camera === 'live' ? 'bg-success' : 'bg-white/40'
              )}
              aria-hidden
            />
            {s.camera === 'live' ? 'Camera on' : 'Camera off'}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <Icon name="nfc" className="h-3.5 w-3.5 text-highlight" aria-hidden /> NFC reader ready
          </span>
        </div>
        <div className="relative flex flex-1 items-center justify-center p-6">
          <div className="relative aspect-square w-full max-w-[280px]">
            {[
              'left-0 top-0 border-l-4 border-t-4 rounded-tl-xl',
              'right-0 top-0 border-r-4 border-t-4 rounded-tr-xl',
              'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl',
              'bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl'
            ].map((c) => (
              <span key={c} className={`absolute h-12 w-12 border-highlight ${c}`} aria-hidden />
            ))}
            {s.camera === 'live' ? (
              <motion.span
                className="absolute inset-x-4 h-0.5 bg-highlight shadow-[0_0_12px_2px_rgba(212,242,58,0.7)]"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-center">
                <div className="px-4">
                  <Icon
                    name={
                      s.camera === 'denied' || s.camera === 'unsupported'
                        ? 'camera-off'
                        : 'scan-qr-code'
                    }
                    className="mx-auto h-10 w-10 text-white/50"
                    aria-hidden
                  />
                  <p className="mt-3 text-sm text-white/70">
                    {s.camera === 'denied'
                      ? 'Camera blocked \u2014 use NFC or manual lookup.'
                      : s.camera === 'unsupported'
                        ? 'No camera on this device.'
                        : 'Point the player\u2019s QR inside the frame.'}
                  </p>
                  {(s.camera === 'idle' || s.camera === 'starting') && (
                    <button
                      type="button"
                      onClick={s.startCamera}
                      disabled={s.camera === 'starting'}
                      className="pressable mt-4 min-h-[48px] rounded-full bg-highlight px-5 text-sm font-semibold text-highlight-foreground disabled:opacity-60"
                    >
                      {s.camera === 'starting' ? 'Starting\u2026' : 'Start camera'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative border-t border-white/10 p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Demo scans
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['valid', 'Valid QR', 'qr-code'],
              ['nfc', 'NFC tap', 'nfc'],
              ['expired', 'Expired', 'clock-alert'],
              ['wrong', 'Wrong venue', 'map-pin-x']
            ].map(([k, l, i]) => (
              <button
                key={k}
                type="button"
                onClick={() => s.simulate(k)}
                className="pressable inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-white/10 px-3 text-sm font-medium hover:bg-white/15"
              >
                <Icon name={i} className="h-4 w-4" aria-hidden />
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4" aria-label="Scan result">
        <div
          className="relative min-h-[260px] overflow-hidden rounded-lg border border-border bg-card"
          role="status"
          aria-live="assertive"
        >
          <AnimatePresence mode="wait">
            {s.result && style ? (
              <motion.div
                key={s.result.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className={cn('flex h-full min-h-[260px] flex-col p-6', style.panel)}
              >
                <div className="flex items-center gap-4">
                  {s.result.outcome === 'valid' ? (
                    <SuccessMark size={72} className="[&>span:nth-child(2)]:bg-white/20" />
                  ) : s.result.outcome === 'invalid' ? (
                    <SuccessMark
                      size={72}
                      tone="error"
                      className="[&>span:nth-child(2)]:bg-white/20"
                    />
                  ) : (
                    <Icon name={style.icon} className="h-16 w-16" aria-hidden />
                  )}
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] opacity-80">
                      {style.label} · {s.result.method}
                    </p>
                    <p className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
                      {s.result.title}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-lg font-medium opacity-90">{s.result.reason}</p>
                {s.result.booking && (
                  <dl className="mt-auto grid grid-cols-3 gap-3 rounded-md bg-black/15 p-3 text-sm">
                    <div>
                      <dt className="opacity-70">Player</dt>
                      <dd className="truncate font-semibold">{s.result.booking.playerName}</dd>
                    </div>
                    <div>
                      <dt className="opacity-70">Time</dt>
                      <dd className="font-semibold tabular">
                        {formatRange(s.result.booking.startHour, s.result.booking.hours)}
                      </dd>
                    </div>
                    <div>
                      <dt className="opacity-70">Code</dt>
                      <dd className="font-mono font-semibold">{s.result.booking.code}</dd>
                    </div>
                  </dl>
                )}
                {s.result.queued && (
                  <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
                    <Icon name="cloud-off" className="h-4 w-4" aria-hidden />
                    Saved offline · will sync when back online
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full min-h-[260px] flex-col items-center justify-center p-6 text-center"
              >
                <Icon name="scan-line" className="h-12 w-12 text-muted-foreground" aria-hidden />
                <p className="mt-3 font-display text-2xl font-bold">Ready to scan</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {venue?.name} ·{' '}
                  {online ? 'Live validation' : 'Offline \u2014 validating signed passes locally'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (lookup.trim()) s.scanCode(lookup.trim(), 'Manual');
            setLookup('');
          }}
        >
          <label htmlFor="manual-lookup" className="sr-only">
            Booking code or player name
          </label>
          <input
            id="manual-lookup"
            value={lookup}
            onChange={(e) => setLookup(e.target.value)}
            placeholder="Booking code or player name"
            className="h-12 min-w-0 flex-1 rounded-md border border-border bg-card px-4 text-[15px] placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          />
          <Button
            type="submit"
            size="lg"
            className="pressable min-h-[48px]"
            disabled={!lookup.trim()}
          >
            Look up
          </Button>
        </form>
        <div className="flex-1 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-bold">Recent scans</h2>
            {s.queuedCount > 0 && (
              <span className="text-xs font-medium text-warning">
                {s.queuedCount} waiting to sync
              </span>
            )}
          </div>
          {s.log.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">Scans will appear here.</p>
          ) : (
            <ul className="max-h-64 divide-y divide-border overflow-y-auto">
              {s.log.map((l) => (
                <li key={l.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                  <Icon
                    name={outcomeStyle[l.outcome].icon}
                    className={cn(
                      'h-4 w-4 shrink-0',
                      l.outcome === 'valid'
                        ? 'text-success'
                        : l.outcome === 'warning'
                          ? 'text-warning'
                          : 'text-destructive'
                    )}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 truncate">
                    <span className="font-medium">{l.booking?.playerName ?? 'Unknown'}</span>{' '}
                    <span className="text-muted-foreground">· {l.title}</span>
                  </span>
                  <span className="text-xs tabular text-muted-foreground">
                    {l.method} ·{' '}
                    {l.at.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
export { Scanner };
