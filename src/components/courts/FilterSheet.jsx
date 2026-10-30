import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';
import { Sheet } from '../ui/Sheet';
import { Chip } from '../ui/Chip';
import { Button } from '../Button';
import { Switch } from '../Switch';
import { defaultFilters } from '../../hooks/useNearbyVenues';
import { toLocalISO } from '../../utils/slots';
const days = Array.from({ length: 7 }, (_, i) => addDays(/* @__PURE__ */ new Date(), i));
function Group({ title, children }) {
  return (
    <fieldset className="border-b border-border py-5 last:border-0">
      <legend className="mb-3 text-sm font-semibold">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}
function FilterSheet({ open, onClose, filters, onApply, previewCount }) {
  const [draft, setDraft] = useState(filters);
  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);
  const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }));
  const count = previewCount(draft);
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Filters"
      footer={
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setDraft(defaultFilters())}
            className="pressable min-h-[48px]"
          >
            Reset
          </Button>
          <Button
            className="pressable min-h-[48px] flex-1"
            disabled={count === 0}
            onClick={() => {
              onApply(draft);
              onClose();
            }}
          >
            {count === 0 ? 'No courts match' : `Show ${count} court${count === 1 ? '' : 's'}`}
          </Button>
        </div>
      }
    >
      <Group title="Date">
        {days.map((d, i) => {
          const iso = toLocalISO(d);
          return (
            <Chip key={iso} selected={draft.date === iso} onClick={() => set('date', iso)}>
              {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : format(d, 'EEE d')}
            </Chip>
          );
        })}
      </Group>
      <Group title="Time of day">
        {[
          ['any', 'Any time', 'clock'],
          ['morning', 'Morning', 'sunrise'],
          ['afternoon', 'Afternoon', 'sun'],
          ['evening', 'Evening', 'moon']
        ].map(([v, l, i]) => (
          <Chip
            key={v}
            icon={i}
            selected={draft.timeOfDay === v}
            onClick={() => set('timeOfDay', v)}
          >
            {l}
          </Chip>
        ))}
      </Group>
      <Group title="Distance">
        {[0, 2, 5, 10].map((km) => (
          <Chip key={km} selected={draft.maxKm === km} onClick={() => set('maxKm', km)}>
            {km === 0 ? 'Any' : `Within ${km} km`}
          </Chip>
        ))}
      </Group>
      <Group title="Price per hour">
        {[0, 300, 450, 600].map((p) => (
          <Chip key={p} selected={draft.maxPrice === p} onClick={() => set('maxPrice', p)}>
            {p === 0 ? 'Any' : `Up to \u20B1${p}`}
          </Chip>
        ))}
      </Group>
      <Group title="Court type">
        {['all', 'Indoor', 'Outdoor'].map((s) => (
          <Chip
            key={s}
            icon={s === 'Indoor' ? 'warehouse' : s === 'Outdoor' ? 'trees' : void 0}
            selected={draft.setting === s}
            onClick={() => set('setting', s)}
          >
            {s === 'all' ? 'All' : s}
          </Chip>
        ))}
      </Group>
      <div className="flex flex-col gap-4 py-5">
        <Switch label="Night lights" checked={draft.lights} onChange={(v) => set('lights', v)} />
        <Switch
          label="Has open slots for the selected time"
          checked={draft.availableNow}
          onChange={(v) => set('availableNow', v)}
        />
      </div>
    </Sheet>
  );
}
export { FilterSheet };
