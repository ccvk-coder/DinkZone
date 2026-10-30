import { useEffect, useState } from 'react';
import { Icon } from '../ui/Icon';
import { Sheet } from '../ui/Sheet';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { SuccessMark } from '../booking/SuccessMark';
import { useApp } from '../../contexts/AppContext';
import { supportsWebNfc } from '../../utils/feedback';
import { shortId } from '../../utils/format';
function NfcLinkSheet({ open, onClose }) {
  const { addNfcCard } = useApp();
  const supported = supportsWebNfc();
  const [phase, setPhase] = useState('ready');
  const [manualId, setManualId] = useState('');
  const [label, setLabel] = useState('My paddle-bag card');
  useEffect(() => {
    if (open) {
      setPhase(supported ? 'ready' : 'manual');
      setManualId('');
    }
  }, [open, supported]);
  const finish = (serial) => {
    addNfcCard({
      id: shortId('nfc'),
      label,
      last4: serial
        .replace(/[^A-Za-z0-9]/g, '')
        .slice(-4)
        .toUpperCase(),
      type: 'card',
      addedAt: /* @__PURE__ */ new Date().toLocaleDateString('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    });
    setPhase('done');
  };
  const scan = async () => {
    setPhase('scanning');
    try {
      const Reader = window.NDEFReader;
      const reader = new Reader();
      await reader.scan();
      reader.onreading = (e) => finish(e.serialNumber || shortId('x'));
    } catch {
      setPhase('error');
    }
  };
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Link an NFC card"
      description="Tap to enter any DinkZone venue."
    >
      {phase === 'done' ? (
        <div className="flex flex-col items-center py-6 text-center">
          <SuccessMark size={80} />
          <p className="mt-5 font-display text-2xl font-bold">Card linked</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap it on any gate reader to check in.
          </p>
          <Button className="pressable mt-6 min-h-[48px] w-full" onClick={onClose}>
            Done
          </Button>
        </div>
      ) : phase === 'manual' ? (
        <div className="space-y-4">
          <p className="flex gap-2 rounded-md bg-surface p-3 text-sm text-muted-foreground">
            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Web NFC works in Chrome on Android. On this device, enter the 8-character ID printed on
            the back of your DinkZone card.
          </p>
          <TextInput label="Card name" value={label} onChange={(e) => setLabel(e.target.value)} />
          <TextInput
            label="Card ID"
            placeholder="e.g. 04A1-7F2A"
            value={manualId}
            onChange={(e) => setManualId(e.target.value.toUpperCase())}
            error={
              manualId && manualId.replace(/[^A-Z0-9]/g, '').length < 8
                ? 'Card IDs have 8 characters'
                : void 0
            }
          />
          <Button
            className="pressable min-h-[48px] w-full"
            disabled={manualId.replace(/[^A-Z0-9]/g, '').length < 8}
            onClick={() => finish(manualId)}
          >
            Link card
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center py-4 text-center">
          <div className="relative grid h-36 w-36 place-items-center">
            {phase === 'scanning' && (
              <>
                <span
                  className="nfc-wave absolute inset-0 rounded-full border-2 border-court"
                  aria-hidden
                />
                <span
                  className="nfc-wave absolute inset-0 rounded-full border-2 border-court [animation-delay:0.7s]"
                  aria-hidden
                />
              </>
            )}
            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground">
              <Icon name="nfc" className="h-9 w-9" aria-hidden />
            </span>
          </div>
          <p className="mt-4 font-display text-xl font-bold" role="status">
            {phase === 'scanning'
              ? 'Hold your card to the back of your phone'
              : phase === 'error'
                ? 'Couldn\u2019t start NFC'
                : 'Ready to scan'}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {phase === 'error'
              ? 'Permission was denied or NFC is off in settings.'
              : 'Keep it still for a second.'}
          </p>
          <div className="mt-6 flex w-full flex-col gap-2">
            {phase !== 'scanning' && (
              <Button className="pressable min-h-[48px]" onClick={scan}>
                {phase === 'error' ? 'Try again' : 'Start scanning'}
              </Button>
            )}
            <Button variant="ghost" onClick={() => setPhase('manual')}>
              Enter card ID instead
            </Button>
          </div>
        </div>
      )}
    </Sheet>
  );
}
export { NfcLinkSheet };
