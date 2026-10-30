import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { CourtCard } from '../../components/courts/CourtCard';
import { CourtMap, MapLegend } from '../../components/courts/CourtMap';
import { CourtPreview } from '../../components/courts/CourtPreview';
import { FilterSheet } from '../../components/courts/FilterSheet';
import { LocationPicker } from '../../components/courts/LocationPicker';
import { Chip } from '../../components/ui/Chip';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { CourtCardSkeleton } from '../../components/ui/Skeleton';
import { Sheet } from '../../components/ui/Sheet';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';
import { useApp } from '../../contexts/AppContext';
import {
  activeFilterCount,
  computeNearby,
  defaultFilters,
  useNearbyVenues
} from '../../hooks/useNearbyVenues';
import { useIsTablet } from '../../hooks/useMediaQuery';
import { formatDate } from '../../utils/format';
import { toLocalISO } from '../../utils/slots';
function Home() {
  const { location, gpsStatus } = useApp();
  const isTablet = useIsTablet();
  const [view, setView] = useState('list');
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [loading, setLoading] = useState(true);
  const results = useNearbyVenues(filters, query);
  const selected = results.find((v) => v.id === selectedId);
  const filterCount = activeFilterCount(filters);
  useEffect(() => {
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), 550);
    return () => window.clearTimeout(id);
  }, [location.lat, location.lng]);
  const availabilityLabel = useMemo(() => {
    const today = toLocalISO(/* @__PURE__ */ new Date());
    if (filters.date === today && filters.timeOfDay === 'any') return 'open now';
    const when = filters.date === today ? 'today' : formatDate(filters.date, 'EEE');
    return filters.timeOfDay === 'any' ? `open ${when}` : `open ${when} ${filters.timeOfDay}`;
  }, [filters.date, filters.timeOfDay]);
  const toggle = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const list = (
    <div className="flex flex-col gap-3">
      {loading ? (
        Array.from({ length: 5 }).map((_, i) => <CourtCardSkeleton key={i} />)
      ) : results.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={<Icon name="map-pin-off" className="h-8 w-8" />}
          title="No courts match those filters"
          description="Try a wider distance or a different time — evenings in Cebu book up fast."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setFilters(defaultFilters());
                setQuery('');
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <AnimatePresence initial={true}>
          {results.map((v, i) => (
            <motion.div
              key={v.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.22,
                ease: [0.23, 1, 0.32, 1],
                delay: Math.min(i, 8) * 0.035
              }}
            >
              <CourtCard
                venue={v}
                selected={v.id === selectedId}
                onHover={isTablet ? setHoverId : void 0}
                availabilityLabel={availabilityLabel}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
  return (
    <div className="md:flex md:h-[100dvh]">
      {/* List column */}
      <section
        className="px-4 md:w-[420px] md:shrink-0 md:overflow-y-auto md:border-r md:border-border lg:w-[460px] lg:px-6"
        aria-labelledby="courts-heading"
      >
        <div className="sticky top-0 z-20 -mx-4 bg-background/95 px-4 pb-3 pt-4 backdrop-blur md:static md:mx-0 md:bg-transparent md:px-0 md:pt-6 md:backdrop-blur-none lg:-mx-6 lg:px-6">
          <button
            type="button"
            onClick={() => setLocationOpen(true)}
            className="pressable -ml-1 flex min-h-[44px] items-center gap-1.5 rounded-md px-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Icon
              name={location.source === 'gps' ? 'navigation' : 'map-pin'}
              className="h-4 w-4 text-court dark:text-highlight"
              aria-hidden
            />
            <span className="max-w-[240px] truncate">Near {location.label}</span>
            <Icon name="chevron-down" className="h-4 w-4" aria-hidden />
          </button>
          <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
            <h1
              id="courts-heading"
              className="text-[26px] font-extrabold leading-[1.05] xs:text-[30px] md:text-[34px]"
            >
              Courts near you
            </h1>
            <SegmentedControl
              className="md:hidden"
              layoutId="home-view"
              label="View"
              value={view}
              onChange={setView}
              options={[
                { value: 'list', label: 'List', icon: 'list' },
                { value: 'map', label: 'Map', icon: 'map' }
              ]}
            />
          </div>
          <div className="relative mt-4">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <label htmlFor="court-search" className="sr-only">
              Search courts or neighborhoods
            </label>
            <input
              id="court-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courts or neighborhoods"
              className="h-12 w-full rounded-full border border-border bg-card pl-10 pr-4 text-[15px] placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            />
          </div>
          <div
            className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 lg:-mx-6 lg:px-6"
            role="toolbar"
            aria-label="Quick filters"
          >
            <Chip
              icon="sliders-horizontal"
              count={filterCount}
              selected={filterCount > 0}
              onClick={() => setFiltersOpen(true)}
            >
              Filters
            </Chip>
            <Chip
              icon="zap"
              selected={filters.availableNow}
              onClick={() => toggle({ availableNow: !filters.availableNow })}
            >
              Available now
            </Chip>
            <Chip
              selected={filters.setting === 'Indoor'}
              onClick={() => toggle({ setting: filters.setting === 'Indoor' ? 'all' : 'Indoor' })}
            >
              Indoor
            </Chip>
            <Chip
              selected={filters.setting === 'Outdoor'}
              onClick={() => toggle({ setting: filters.setting === 'Outdoor' ? 'all' : 'Outdoor' })}
            >
              Outdoor
            </Chip>
            <Chip selected={filters.lights} onClick={() => toggle({ lights: !filters.lights })}>
              Night lights
            </Chip>
            <Chip
              selected={filters.maxPrice === 300}
              onClick={() => toggle({ maxPrice: filters.maxPrice === 300 ? 0 : 300 })}
            >
              Under ₱300
            </Chip>
          </div>
        </div>
        {(gpsStatus === 'denied' || gpsStatus === 'outside') && location.source === 'default' && (
          <div
            role="status"
            className="mb-3 flex items-start gap-3 rounded-lg border border-border bg-surface p-3 text-sm"
          >
            <Icon name="map-pin-off" className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden />
            <p className="flex-1 text-muted-foreground">
              {gpsStatus === 'denied' ? 'Location is off.' : 'You seem to be outside Cebu City.'}{' '}
              Showing distances from{' '}
              <span className="font-medium text-foreground">Fuente Osmeña Circle</span>.
            </p>
            <button
              type="button"
              onClick={() => setLocationOpen(true)}
              className="font-semibold text-court underline-offset-2 hover:underline dark:text-highlight"
            >
              Change
            </button>
          </div>
        )}
        <p className="mb-3 text-xs font-medium text-muted-foreground" aria-live="polite">
          {loading
            ? 'Finding courts\u2026'
            : `${results.length} venue${results.length === 1 ? '' : 's'} \xB7 sorted by distance`}
        </p>
        <div className={view === 'map' ? 'hidden md:block' : ''}>
          {list}
          <div className="h-6" />
        </div>
      </section>
      {/* Map — full-screen on mobile map view, persistent pane on tablet+ */}
      <section
        className={`${view === 'map' ? 'block' : 'hidden'} relative h-[calc(100dvh-300px)] min-h-[360px] md:block md:h-auto md:flex-1`}
        aria-label="Map of courts"
      >
        <CourtMap
          className="absolute inset-0"
          venues={results}
          user={location}
          selectedId={selectedId}
          highlightId={hoverId}
          onSelect={setSelectedId}
        />
        <div className="pointer-events-none absolute inset-x-0 top-3 z-[500] flex justify-center md:justify-start md:pl-4">
          <div className="pointer-events-auto">
            <MapLegend />
          </div>
        </div>
        {isTablet && (
          <AnimatePresence>
            {selected && (
              <motion.aside
                key={selected.id}
                className="absolute bottom-4 right-4 top-4 z-[600] w-[340px] overflow-y-auto rounded-lg border border-border bg-card p-3 shadow-lg"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                aria-label={`${selected.name} preview`}
              >
                <CourtPreview venue={selected} onClose={() => setSelectedId(null)} />
              </motion.aside>
            )}
          </AnimatePresence>
        )}
      </section>
      {!isTablet && (
        <Sheet open={!!selected} onClose={() => setSelectedId(null)}>
          {selected && <CourtPreview venue={selected} />}
        </Sheet>
      )}
      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onApply={setFilters}
        previewCount={(f) => computeNearby(location, f, query).length}
      />
      <LocationPicker open={locationOpen} onClose={() => setLocationOpen(false)} />
    </div>
  );
}
export { Home };
