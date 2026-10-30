import { motion } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { formatHour, peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
const isOpen = (c) => c.status === 'available' || c.status === 'peak';
function SlotButton({ cell, selected, onClick, compact }) {
  const open = isOpen(cell);
  const label = `${formatHour(cell.hour)}, court ${cell.court}, ${selected ? 'selected' : cell.status === 'booked' ? 'booked' : cell.status === 'past' ? 'past' : cell.status === 'maintenance' ? 'maintenance' : `${cell.status === 'peak' ? 'peak ' : ''}${peso(cell.price)}`}`;
  return (
    <motion.button
      type="button"
      disabled={!open}
      aria-pressed={selected}
      aria-label={label}
      onClick={onClick}
      animate={selected ? { scale: [0.94, 1.02, 1] } : { scale: 1 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      whileTap={open ? { scale: 0.96 } : void 0}
      className={cn(
        'relative flex min-h-[56px] flex-col items-start justify-center rounded-md border px-2.5 text-left transition-colors duration-150',
        compact && 'min-h-[44px] items-center px-1',
        open && !selected && 'border-border bg-card hover:border-court hover:bg-accent/40',
        open && !selected && cell.status === 'peak' && 'border-warning/40',
        selected && 'border-brand bg-highlight text-highlight-foreground',
        cell.status === 'booked' &&
          'cursor-not-allowed border-transparent bg-muted text-muted-foreground',
        cell.status === 'past' &&
          'cursor-not-allowed border-transparent bg-transparent text-muted-foreground/50',
        cell.status === 'maintenance' &&
          'cursor-not-allowed border-dashed border-border bg-transparent text-muted-foreground'
      )}
    >
      {!compact && (
        <span
          className={cn(
            'text-sm font-semibold tabular',
            cell.status === 'booked' && 'line-through decoration-1'
          )}
        >
          {formatHour(cell.hour)}
        </span>
      )}
      <span
        className={cn(
          'flex items-center gap-1 text-[11px] tabular',
          compact && 'text-xs font-medium'
        )}
      >
        {selected ? (
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 500 }}
            className="inline-flex items-center gap-1 font-semibold"
          >
            <Icon name="check" className="h-3.5 w-3.5" aria-hidden />
            {compact ? '' : 'Selected'}
          </motion.span>
        ) : cell.status === 'booked' ? (
          <>
            <Icon name="lock" className="h-3 w-3" aria-hidden />
            {!compact && 'Booked'}
          </>
        ) : cell.status === 'maintenance' ? (
          <>
            <Icon name="wrench" className="h-3 w-3" aria-hidden />
            {!compact && 'Maintenance'}
          </>
        ) : cell.status === 'past' ? (
          !compact && 'Past'
        ) : (
          <>
            {cell.status === 'peak' && (
              <Icon name="flame" className="h-3 w-3 text-warning" aria-hidden />
            )}
            {peso(cell.price)}
          </>
        )}
      </span>
    </motion.button>
  );
}
function SlotLegend() {
  const items = [
    {
      label: 'Available',
      el: <span className="h-3.5 w-3.5 rounded border border-border bg-card" />
    },
    { label: 'Peak', el: <Icon name="flame" className="h-3.5 w-3.5 text-warning" /> },
    { label: 'Booked', el: <Icon name="lock" className="h-3.5 w-3.5 text-muted-foreground" /> },
    {
      label: 'Selected',
      el: (
        <span className="grid h-3.5 w-3.5 place-items-center rounded bg-highlight">
          <Icon name="check" className="h-2.5 w-2.5 text-highlight-foreground" />
        </span>
      )
    }
  ];
  return (
    <ul
      className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground"
      aria-label="Legend"
    >
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5" aria-hidden={false}>
          <span aria-hidden>{i.el}</span>
          {i.label}
        </li>
      ))}
    </ul>
  );
}
function SlotGrid({
  rows,
  courts,
  selectedCourt,
  selectedHours,
  onToggle,
  layout,
  activeCourt,
  onActiveCourtChange
}) {
  const isSelected = (c) => c.court === selectedCourt && selectedHours.includes(c.hour);
  if (layout === 'matrix') {
    return (
      <div
        className="overflow-hidden rounded-lg border border-border bg-card"
        role="grid"
        aria-label="Court time slots"
      >
        <div
          className="grid border-b border-border bg-surface text-xs font-semibold text-muted-foreground"
          style={{ gridTemplateColumns: `64px repeat(${courts}, minmax(0, 1fr))` }}
          role="row"
        >
          <span className="px-3 py-2.5" role="columnheader">
            Time
          </span>
          {Array.from({ length: courts }, (_, i) => (
            <span key={i} className="px-1 py-2.5 text-center" role="columnheader">
              Court {i + 1}
            </span>
          ))}
        </div>
        <div className="max-h-[520px] overflow-y-auto p-2">
          {rows.map((row) => (
            <div
              key={row[0].hour}
              className="grid items-center gap-1.5 py-0.5"
              style={{ gridTemplateColumns: `56px repeat(${courts}, minmax(0, 1fr))` }}
              role="row"
            >
              <span
                className="pl-1 text-xs font-semibold tabular text-muted-foreground"
                role="rowheader"
              >
                {formatHour(row[0].hour)}
              </span>
              {row.map((cell) => (
                <div key={cell.court} role="gridcell">
                  <SlotButton
                    cell={cell}
                    selected={isSelected(cell)}
                    onClick={() => onToggle(cell.court, cell.hour)}
                    compact
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  const courtRows = rows.map((r) => r[activeCourt - 1]).filter(Boolean);
  return (
    <div>
      {courts > 1 && (
        <div
          className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4"
          role="tablist"
          aria-label="Court"
        >
          {Array.from({ length: courts }, (_, i) => {
            const n = i + 1;
            const open = rows.filter((r) => isOpen(r[i])).length;
            const active = n === activeCourt;
            return (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onActiveCourtChange(n)}
                className={cn(
                  'pressable flex min-h-[48px] shrink-0 flex-col items-center justify-center rounded-md border px-4',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card'
                )}
              >
                <span className="text-sm font-semibold">Court {n}</span>
                <span
                  className={cn('text-[11px]', active ? 'opacity-80' : 'text-muted-foreground')}
                >
                  {open} open
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 xs:grid-cols-4">
        {courtRows.map((cell) => (
          <SlotButton
            key={cell.hour}
            cell={cell}
            selected={isSelected(cell)}
            onClick={() => onToggle(cell.court, cell.hour)}
          />
        ))}
      </div>
    </div>
  );
}
export { SlotGrid, SlotLegend };
