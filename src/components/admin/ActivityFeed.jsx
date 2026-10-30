import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { venues } from '../../data/venues';
import { playerNames } from '../../data/user';
import { peso } from '../../utils/format';
const kinds = ['checkin', 'booking', 'checkin', 'order', 'booking', 'cancel'];
const meta = {
  checkin: { icon: 'scan-line', tone: 'bg-success/10 text-success', verb: 'checked in' },
  booking: {
    icon: 'calendar-plus',
    tone: 'bg-primary/10 text-court dark:text-highlight',
    verb: 'booked'
  },
  order: { icon: 'shopping-bag', tone: 'bg-warning/10 text-warning', verb: 'ordered' },
  cancel: { icon: 'calendar-x', tone: 'bg-destructive/10 text-destructive', verb: 'cancelled' }
};
let counter = 0;
function makeActivity(offsetMin = 0) {
  counter += 1;
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  const name = playerNames[Math.floor(Math.random() * playerNames.length)];
  const venue = venues[Math.floor(Math.random() * venues.length)];
  const court = 1 + Math.floor(Math.random() * venue.courts);
  const text =
    kind === 'order'
      ? `${name} ordered gear \xB7 ${peso(690 + Math.floor(Math.random() * 6) * 500)}`
      : kind === 'booking'
        ? `${name} booked Court ${court} \xB7 ${7 + Math.floor(Math.random() * 13)}:00`
        : `${name} ${meta[kind].verb} \xB7 Court ${court}`;
  return { id: counter, kind, text, venue: venue.name, at: new Date(Date.now() - offsetMin * 6e4) };
}
function ActivityFeed() {
  const [items, setItems] = useState(() =>
    Array.from({ length: 7 }, (_, i) => makeActivity(i * 3 + 1))
  );
  useEffect(() => {
    const t = window.setInterval(
      () => setItems((list) => [makeActivity(0), ...list].slice(0, 9)),
      6e3
    );
    return () => window.clearInterval(t);
  }, []);
  return (
    <ul className="divide-y divide-border" aria-live="polite" aria-label="Live activity">
      <AnimatePresence initial={false}>
        {items.map((a) => (
          <motion.li
            key={a.id}
            layout
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-start gap-3 py-3"
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${meta[a.kind].tone}`}
            >
              <Icon name={meta[a.kind].icon} className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{a.text}</p>
              <p className="truncate text-xs text-muted-foreground">{a.venue}</p>
            </div>
            <span className="shrink-0 text-xs tabular text-muted-foreground">
              {Math.round((Date.now() - a.at.getTime()) / 6e4) === 0
                ? 'now'
                : `${Math.round((Date.now() - a.at.getTime()) / 6e4)}m`}
            </span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
export { ActivityFeed };
