let audioCtx = null;
function playCue(kind) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioCtx = audioCtx ?? new Ctx();
    const ctx = audioCtx;
    const notes = kind === 'success' ? [880, 1320] : [196, 196];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = kind === 'success' ? 'sine' : 'square';
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(1e-4, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(1e-4, start + 0.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.11);
    });
  } catch {}
}
function haptic(kind) {
  if ('vibrate' in navigator) navigator.vibrate(kind === 'success' ? 40 : [80, 60, 80]);
}
function supportsWebNfc() {
  return typeof window !== 'undefined' && 'NDEFReader' in window;
}
export { haptic, playCue, supportsWebNfc };
