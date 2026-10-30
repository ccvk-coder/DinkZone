import { useCallback, useEffect, useRef, useState } from 'react';
import { useBookings } from '../contexts/BookingsContext';
import { useApp } from '../contexts/AppContext';
import { getPassState, slotWindow } from '../utils/checkin';
import { haptic, playCue } from '../utils/feedback';
import { formatHour, shortId } from '../utils/format';
import { toLocalISO } from '../utils/slots';
function useScanner(venueId) {
  const { allBookings, findByCode, updateBooking } = useBookings();
  const { online } = useApp();
  const [result, setResult] = useState(null);
  const [log, setLog] = useState([]);
  const [camera, setCamera] = useState('idle');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const report = useCallback((r) => {
    setResult(r);
    setLog((l) => [r, ...l].slice(0, 12));
    const ok = r.outcome === 'valid';
    playCue(ok ? 'success' : 'error');
    haptic(ok ? 'success' : 'error');
  }, []);
  const validate = useCallback(
    (booking, method) => {
      const base = { id: shortId('scan'), method, at: /* @__PURE__ */ new Date() };
      if (!booking)
        return report({
          ...base,
          outcome: 'invalid',
          title: 'Pass not found',
          reason: 'No booking matches this code.'
        });
      const state = getPassState(booking, /* @__PURE__ */ new Date(), venueId);
      switch (state) {
        case 'ready':
          updateBooking(booking.id, { status: 'Checked-in' });
          return report({
            ...base,
            outcome: 'valid',
            title: 'Welcome in',
            reason: `Court ${booking.court} \xB7 ${booking.players} players`,
            booking,
            queued: !online
          });
        case 'checked-in':
          return report({
            ...base,
            outcome: 'warning',
            title: 'Already checked in',
            reason: 'This pass was used earlier today.',
            booking
          });
        case 'upcoming':
          return report({
            ...base,
            outcome: 'warning',
            title: 'Too early',
            reason: `Opens at ${slotWindow(booking).validFrom.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' })}`,
            booking
          });
        case 'wrong-court':
          return report({
            ...base,
            outcome: 'invalid',
            title: 'Wrong venue',
            reason: 'This pass is for another venue.',
            booking
          });
        case 'cancelled':
          return report({
            ...base,
            outcome: 'invalid',
            title: 'Booking cancelled',
            reason: 'Ask the player to rebook.',
            booking
          });
        default:
          return report({
            ...base,
            outcome: 'invalid',
            title: 'Pass expired',
            reason: `Slot ended at ${formatHour(booking.startHour + booking.hours)}.`,
            booking
          });
      }
    },
    [report, updateBooking, venueId, online]
  );
  const scanCode = useCallback(
    (raw, method = 'QR') => {
      const code = raw.startsWith('DZ1|') ? raw.split('|')[1] : raw;
      const byCode = findByCode(code);
      const byName = byCode
        ? void 0
        : allBookings.find(
            (b) =>
              b.playerName.toLowerCase().includes(raw.trim().toLowerCase()) &&
              b.venueId === venueId &&
              b.date === toLocalISO(/* @__PURE__ */ new Date())
          );
      validate(byCode ?? byName, method);
    },
    [findByCode, allBookings, venueId, validate]
  );
  const simulate = useCallback(
    (kind) => {
      const today = toLocalISO(/* @__PURE__ */ new Date());
      const now = /* @__PURE__ */ new Date();
      if (kind === 'wrong')
        return validate(
          allBookings.find((b) => b.venueId !== venueId && getPassState(b, now) === 'ready') ??
            allBookings.find((b) => b.venueId !== venueId),
          'QR'
        );
      if (kind === 'expired')
        return validate(
          allBookings.find(
            (b) => b.venueId === venueId && getPassState(b, now, venueId) === 'expired'
          ) ?? allBookings.find((b) => getPassState(b, now) === 'expired'),
          'QR'
        );
      const live = allBookings.find(
        (b) =>
          b.venueId === venueId && b.date === today && getPassState(b, now, venueId) === 'ready'
      );
      if (live) return validate(live, kind === 'nfc' ? 'NFC' : 'QR');
      const walkIn = {
        id: shortId('bk'),
        code: shortId('DZ'),
        venueId,
        court: 1,
        date: today,
        startHour: now.getHours(),
        hours: 1,
        players: 4,
        addOns: { paddle: 0, balls: 0, water: 0 },
        total: 450,
        payment: 'gcash',
        paymentStatus: 'Paid',
        status: 'Checked-in',
        playerName: 'Jasper Go',
        createdAt: now.toISOString()
      };
      report({
        id: shortId('scan'),
        outcome: 'valid',
        title: 'Welcome in',
        reason: 'Court 1 \xB7 4 players',
        booking: walkIn,
        method: kind === 'nfc' ? 'NFC' : 'QR',
        at: now,
        queued: !online
      });
    },
    [allBookings, venueId, validate, report, online]
  );
  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) return setCamera('unsupported');
    setCamera('starting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => void 0);
      }
      setCamera('live');
    } catch {
      setCamera('denied');
    }
  }, []);
  useEffect(() => {
    if (camera !== 'live' || !('BarcodeDetector' in window)) return;
    const Detector = window.BarcodeDetector;
    const detector = new Detector({ formats: ['qr_code'] });
    let last = '';
    const id = window.setInterval(async () => {
      if (!videoRef.current) return;
      try {
        const codes = await detector.detect(videoRef.current);
        if (codes[0] && codes[0].rawValue !== last) {
          last = codes[0].rawValue;
          scanCode(codes[0].rawValue, 'QR');
        }
      } catch {}
    }, 600);
    return () => window.clearInterval(id);
  }, [camera, scanCode]);
  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);
  return {
    result,
    setResult,
    log,
    camera,
    videoRef,
    startCamera,
    scanCode,
    simulate,
    queuedCount: log.filter((l) => l.queued).length
  };
}
export { useScanner };
