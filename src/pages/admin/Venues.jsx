import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { Select } from '../../components/Select';
import { Checkbox } from '../../components/Checkbox';
import { Badge } from '../../components/Badge';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { Sheet } from '../../components/ui/Sheet';
import { amenityMeta } from '../../components/courts/AmenityIcons';
import { venues as seedVenues } from '../../data/venues';
import { images } from '../../data/images';
import { formatHour, peso } from '../../utils/format';
const hourOptions = Array.from({ length: 25 }, (_, h) => ({
  label: h === 24 ? 'Midnight' : formatHour(h),
  value: String(h)
}));
const blankVenue = () => ({
  id: `v-new-${Date.now()}`,
  name: '',
  neighborhood: '',
  address: '',
  lat: 10.31,
  lng: 123.89,
  courts: 2,
  setting: 'Outdoor',
  surface: 'Hard court',
  pricePerHour: 300,
  peakPrice: 400,
  rating: 0,
  reviews: 0,
  amenities: ['lights'],
  image: images.day,
  gallery: [images.day],
  openHour: 6,
  closeHour: 22,
  description: '',
  phone: ''
});
function Venues() {
  const { toast } = useToast();
  const [list, setList] = useState(seedVenues);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const isNew = editing ? !list.some((v) => v.id === editing.id) : false;
  const set = (k, v) => setEditing((e) => (e ? { ...e, [k]: v } : e));
  const save = () => {
    if (!editing) return;
    const errs = {};
    if (!editing.name.trim()) errs.name = 'Venue name is required';
    if (!editing.neighborhood.trim()) errs.neighborhood = 'Add a neighborhood';
    if (editing.peakPrice < editing.pricePerHour) errs.peakPrice = 'Peak should be \u2265 off-peak';
    if (editing.closeHour <= editing.openHour) errs.closeHour = 'Must close after opening';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setList((l) => (isNew ? [editing, ...l] : l.map((v) => (v.id === editing.id ? editing : v))));
    toast({
      title: isNew ? 'Venue added' : 'Venue saved',
      description: editing.name,
      tone: 'success'
    });
    setEditing(null);
  };
  return (
    <div>
      <PageHeader
        title="Venues & courts"
        subtitle={`${list.length} venues \xB7 ${list.reduce((s, v) => s + v.courts, 0)} courts`}
        actions={
          <Button
            className="pressable"
            onClick={() => {
              setErrors({});
              setEditing(blankVenue());
            }}
          >
            <span className="inline-flex items-center gap-2">
              <Icon name="plus" className="h-4 w-4" aria-hidden />
              Add venue
            </span>
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {list.map((v) => (
          <article key={v.id} className="flex gap-3 rounded-lg border border-border bg-card p-3">
            <img src={v.image} alt="" className="h-24 w-24 shrink-0 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-2 font-semibold leading-snug">
                  {v.name || 'Untitled venue'}
                </h3>
                <Badge tone={v.setting === 'Indoor' ? 'primary' : 'neutral'}>{v.setting}</Badge>
              </div>
              <p className="truncate text-xs text-muted-foreground">{v.neighborhood}</p>
              <p className="mt-2 text-sm">
                <span className="font-semibold tabular">{peso(v.pricePerHour)}</span>
                <span className="text-muted-foreground"> off-peak · </span>
                <span className="font-semibold tabular">{peso(v.peakPrice)}</span>
                <span className="text-muted-foreground"> peak</span>
              </p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {v.courts} courts · {formatHour(v.openHour)}–{formatHour(v.closeHour)}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setErrors({});
                    setEditing(v);
                  }}
                  className="pressable inline-flex min-h-[36px] items-center gap-1 rounded-md px-2 text-sm font-semibold text-court hover:bg-muted dark:text-highlight"
                >
                  <Icon name="pencil" className="h-3.5 w-3.5" aria-hidden />
                  Edit
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <Sheet
        open={!!editing}
        onClose={() => setEditing(null)}
        side="right"
        width="md:w-[520px]"
        title={isNew ? 'Add venue' : 'Edit venue'}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button className="pressable" onClick={save}>
              {isNew ? 'Add venue' : 'Save changes'}
            </Button>
          </div>
        }
      >
        {editing && (
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Details
              </h3>
              <TextInput
                label="Venue name"
                value={editing.name}
                error={errors.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Mandaue Dink Hub"
              />
              <TextInput
                label="Neighborhood"
                value={editing.neighborhood}
                error={errors.neighborhood}
                onChange={(e) => set('neighborhood', e.target.value)}
                placeholder="e.g. Banilad"
              />
              <TextInput
                label="Address"
                value={editing.address}
                onChange={(e) => set('address', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Setting"
                  value={editing.setting}
                  onChange={(e) => set('setting', e.target.value)}
                  options={[
                    { label: 'Indoor', value: 'Indoor' },
                    { label: 'Outdoor', value: 'Outdoor' }
                  ]}
                />
                <TextInput
                  label="Number of courts"
                  type="number"
                  min={1}
                  max={12}
                  value={editing.courts}
                  onChange={(e) => set('courts', Math.max(1, Math.min(12, Number(e.target.value))))}
                />
              </div>
            </section>
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Pricing rules
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <TextInput
                  label="Off-peak / hr (₱)"
                  type="number"
                  value={editing.pricePerHour}
                  onChange={(e) => set('pricePerHour', Number(e.target.value))}
                />
                <TextInput
                  label="Peak / hr (₱)"
                  type="number"
                  value={editing.peakPrice}
                  error={errors.peakPrice}
                  onChange={(e) => set('peakPrice', Number(e.target.value))}
                />
              </div>
              <p className="rounded-md bg-surface p-3 text-xs text-muted-foreground">
                Peak applies weekdays 5–9 PM and weekends 7–10 AM.
              </p>
            </section>
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Opening hours
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Opens"
                  value={String(editing.openHour)}
                  onChange={(e) => set('openHour', Number(e.target.value))}
                  options={hourOptions.slice(0, 24)}
                />
                <Select
                  label="Closes"
                  value={String(editing.closeHour)}
                  error={errors.closeHour}
                  onChange={(e) => set('closeHour', Number(e.target.value))}
                  options={hourOptions.slice(1)}
                />
              </div>
            </section>
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Amenities
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(amenityMeta).map((a) => (
                  <Checkbox
                    key={a}
                    label={amenityMeta[a].label}
                    checked={editing.amenities.includes(a)}
                    onChange={(e) =>
                      set(
                        'amenities',
                        e.target.checked
                          ? [...editing.amenities, a]
                          : editing.amenities.filter((x) => x !== a)
                      )
                    }
                  />
                ))}
              </div>
            </section>
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Photos
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {editing.gallery.map((src, i) => (
                  <img
                    key={src + i}
                    src={src}
                    alt=""
                    className="aspect-square rounded-md object-cover"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => set('gallery', [...editing.gallery, images.covered])}
                  className="pressable grid aspect-square place-items-center rounded-md border border-dashed border-border text-muted-foreground hover:border-court hover:text-foreground"
                  aria-label="Add photo"
                >
                  <Icon name="image-plus" className="h-5 w-5" />
                </button>
              </div>
            </section>
          </div>
        )}
      </Sheet>
    </div>
  );
}
export { Venues };
