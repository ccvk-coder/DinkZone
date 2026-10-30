import { useMemo, useState } from 'react';
import { Icon } from '../ui/Icon';
import { Sheet } from '../ui/Sheet';
import { TextInput } from '../TextInput';
import { places } from '../../data/places';
import { useApp } from '../../contexts/AppContext';
import { useToast } from '../Toast';
function LocationPicker({ open, onClose }) {
  const { requestGps, setManualLocation, gpsStatus, location } = useApp();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? places.filter((p) => `${p.label} ${p.area}`.toLowerCase().includes(q)) : places;
  }, [query]);
  const useGps = async () => {
    const status = await requestGps();
    if (status === 'granted') {
      toast({ title: 'Using your current location', tone: 'success' });
      onClose();
    } else if (status === 'outside') {
      toast({
        title: 'You\u2019re outside Cebu City',
        description: 'Showing distances from Fuente Osme\xF1a Circle instead.',
        tone: 'info'
      });
      onClose();
    } else {
      toast({
        title: 'Location unavailable',
        description: 'Allow location in your browser settings, or pick a spot below.',
        tone: 'error'
      });
    }
  };
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Set your location"
      description="We sort courts by distance from here."
    >
      <button
        type="button"
        onClick={useGps}
        disabled={gpsStatus === 'prompting'}
        className="pressable mb-4 flex min-h-[56px] w-full items-center gap-3 rounded-lg border border-border bg-surface px-4 text-left hover:border-court disabled:opacity-60"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
          <Icon
            name={gpsStatus === 'prompting' ? 'loader-circle' : 'locate-fixed'}
            className={gpsStatus === 'prompting' ? 'h-4 w-4 animate-spin' : 'h-4 w-4'}
            aria-hidden
          />
        </span>
        <span>
          <span className="block text-sm font-semibold">
            {gpsStatus === 'prompting' ? 'Finding you\u2026' : 'Use my current location'}
          </span>
          <span className="block text-xs text-muted-foreground">
            Most accurate — updates as you move
          </span>
        </span>
      </button>
      <TextInput
        label="Search a place or neighborhood"
        placeholder="e.g. Ayala, Banilad, SM Seaside"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="mt-3 divide-y divide-border">
        {results.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => {
                setManualLocation(p);
                onClose();
              }}
              className="pressable flex min-h-[52px] w-full items-center gap-3 py-2 text-left hover:text-court"
            >
              <Icon name="map-pin" className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <span className="flex-1">
                <span className="block text-sm font-medium">{p.label}</span>
                <span className="block text-xs text-muted-foreground">{p.area}</span>
              </span>
              {location.label === p.label && (
                <Icon name="check" className="h-4 w-4 text-court" aria-label="Selected" />
              )}
            </button>
          </li>
        ))}
        {results.length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">
            No places match “{query}”. Try a neighborhood name.
          </li>
        )}
      </ul>
    </Sheet>
  );
}
export { LocationPicker };
