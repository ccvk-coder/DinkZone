import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { Table } from '../../components/Table';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusChip } from '../../components/ui/StatusChip';
import { BookingDrawer } from '../../components/admin/BookingDrawer';
import { paymentMeta } from '../../components/booking/PaymentOptions';
import { useBookings } from '../../contexts/BookingsContext';
import { venues } from '../../data/venues';
import { downloadFile, toCsv } from '../../utils/analytics';
import { formatDate, formatRange, peso } from '../../utils/format';
import { toLocalISO } from '../../utils/slots';
const PAGE = 15;
const statuses = ['Confirmed', 'Checked-in', 'Completed', 'Cancelled', 'No-show'];
function Bookings() {
  const { allBookings, updateBooking } = useBookings();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [venueId, setVenueId] = useState('all');
  const [status, setStatus] = useState('all');
  const [payment, setPayment] = useState('all');
  const [dateScope, setDateScope] = useState('all');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [drawer, setDrawer] = useState(null);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const today = toLocalISO(/* @__PURE__ */ new Date());
    return allBookings
      .filter((b) => (q ? `${b.code} ${b.playerName}`.toLowerCase().includes(q) : true))
      .filter((b) => (venueId === 'all' ? true : b.venueId === venueId))
      .filter((b) => (status === 'all' ? true : b.status === status))
      .filter((b) => (payment === 'all' ? true : b.payment === payment))
      .filter((b) =>
        dateScope === 'all'
          ? true
          : dateScope === 'today'
            ? b.date === today
            : dateScope === 'upcoming'
              ? b.date > today
              : b.date < today
      );
  }, [allBookings, query, venueId, status, payment, dateScope]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const rows = filtered.slice(page * PAGE, page * PAGE + PAGE);
  const allOnPage = rows.length > 0 && rows.every((r) => selected.includes(r.id));
  const bulk = (patch, label) => {
    selected.forEach((id) => updateBooking(id, patch));
    toast({ title: `${selected.length} bookings ${label}`, tone: 'success' });
    setSelected([]);
  };
  const exportCsv = (list) => {
    downloadFile(
      `dinkzone-bookings-${toLocalISO(/* @__PURE__ */ new Date())}.csv`,
      toCsv(
        list.map((b) => ({
          Code: b.code,
          Player: b.playerName,
          Venue: venues.find((v) => v.id === b.venueId)?.name ?? '',
          Court: b.court,
          Date: b.date,
          Time: formatRange(b.startHour, b.hours),
          Status: b.status,
          Payment: paymentMeta[b.payment].label,
          Total: b.total
        }))
      )
    );
    toast({ title: `Exported ${list.length} bookings`, tone: 'success' });
  };
  const setFilter = (fn) => {
    fn();
    setPage(0);
    setSelected([]);
  };
  return (
    <div>
      <PageHeader
        title="Bookings"
        subtitle={`${filtered.length} of ${allBookings.length} bookings`}
        actions={
          <Button variant="secondary" className="pressable" onClick={() => exportCsv(filtered)}>
            <span className="inline-flex items-center gap-2">
              <Icon name="download" className="h-4 w-4" aria-hidden />
              Export CSV
            </span>
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-3 rounded-lg border border-border bg-card p-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
        <div className="relative">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <label htmlFor="bk-search" className="sr-only">
            Search by code or player
          </label>
          <input
            id="bk-search"
            value={query}
            onChange={(e) => setFilter(() => setQuery(e.target.value))}
            placeholder="Search code or player"
            className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          />
        </div>
        <Select
          aria-label="Venue"
          value={venueId}
          onChange={(e) => setFilter(() => setVenueId(e.target.value))}
          options={[
            { label: 'All venues', value: 'all' },
            ...venues.map((v) => ({ label: v.name, value: v.id }))
          ]}
        />
        <Select
          aria-label="Status"
          value={status}
          onChange={(e) => setFilter(() => setStatus(e.target.value))}
          options={[
            { label: 'All statuses', value: 'all' },
            ...statuses.map((s) => ({ label: s, value: s }))
          ]}
        />
        <Select
          aria-label="Payment"
          value={payment}
          onChange={(e) => setFilter(() => setPayment(e.target.value))}
          options={[
            { label: 'All payments', value: 'all' },
            ...Object.keys(paymentMeta).map((p) => ({ label: paymentMeta[p].label, value: p }))
          ]}
        />
        <div
          className="flex rounded-md border border-border bg-background p-0.5"
          role="radiogroup"
          aria-label="Date range"
        >
          {['all', 'today', 'upcoming', 'past'].map((d) => (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={dateScope === d}
              onClick={() => setFilter(() => setDateScope(d))}
              className={`h-9 flex-1 rounded px-3 text-xs font-medium capitalize transition-colors duration-150 ${dateScope === d ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-white"
          >
            <span className="mr-auto text-sm font-semibold">{selected.length} selected</span>
            <button
              type="button"
              onClick={() => bulk({ status: 'Checked-in' }, 'checked in')}
              className="pressable min-h-[36px] rounded-md bg-white/10 px-3 text-sm hover:bg-white/20"
            >
              Mark checked in
            </button>
            <button
              type="button"
              onClick={() => exportCsv(allBookings.filter((b) => selected.includes(b.id)))}
              className="pressable min-h-[36px] rounded-md bg-white/10 px-3 text-sm hover:bg-white/20"
            >
              Export
            </button>
            <button
              type="button"
              onClick={() => bulk({ status: 'Cancelled' }, 'cancelled')}
              className="pressable min-h-[36px] rounded-md bg-destructive px-3 text-sm text-white hover:brightness-110"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10"
              aria-label="Clear selection"
            >
              <Icon name="x" className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-3 overflow-x-auto rounded-lg border border-border bg-card">
        {rows.length === 0 ? (
          <EmptyState
            className="py-12"
            title="No bookings match"
            description="Clear a filter to see more."
          />
        ) : (
          <Table
            data={rows}
            rowKey={(r) => r.id}
            columns={[
              {
                key: 'select',
                header: '',
                render: (r) => (
                  <Checkbox
                    aria-label={`Select ${r.code}`}
                    checked={selected.includes(r.id)}
                    onChange={(e) =>
                      setSelected((s) =>
                        e.target.checked ? [...s, r.id] : s.filter((x) => x !== r.id)
                      )
                    }
                  />
                )
              },
              {
                key: 'code',
                header: 'Code',
                sortValue: (r) => r.code,
                render: (r) => (
                  <button
                    type="button"
                    onClick={() => setDrawer(r)}
                    className="font-mono text-xs font-semibold text-court hover:underline dark:text-highlight"
                  >
                    {r.code}
                  </button>
                )
              },
              {
                key: 'player',
                header: 'Player',
                sortValue: (r) => r.playerName,
                render: (r) => <span className="whitespace-nowrap font-medium">{r.playerName}</span>
              },
              {
                key: 'venue',
                header: 'Venue \xB7 Court',
                sortValue: (r) => r.venueId,
                render: (r) => (
                  <span className="whitespace-nowrap">
                    {venues.find((v) => v.id === r.venueId)?.name}{' '}
                    <span className="text-muted-foreground">· C{r.court}</span>
                  </span>
                )
              },
              {
                key: 'when',
                header: 'When',
                sortValue: (r) => `${r.date}${String(r.startHour).padStart(2, '0')}`,
                render: (r) => (
                  <span className="whitespace-nowrap tabular">
                    {formatDate(r.date, 'MMM d')} · {formatRange(r.startHour, r.hours)}
                  </span>
                )
              },
              {
                key: 'status',
                header: 'Status',
                sortValue: (r) => r.status,
                render: (r) => <StatusChip status={r.status} />
              },
              {
                key: 'payment',
                header: 'Payment',
                sortValue: (r) => r.payment,
                render: (r) => (
                  <span className="whitespace-nowrap text-muted-foreground">
                    {paymentMeta[r.payment].label}
                  </span>
                )
              },
              {
                key: 'total',
                header: 'Total',
                sortValue: (r) => r.total,
                render: (r) => <span className="font-semibold tabular">{peso(r.total)}</span>
              },
              {
                key: 'actions',
                header: '',
                render: (r) => (
                  <button
                    type="button"
                    onClick={() => setDrawer(r)}
                    className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={`Open ${r.code}`}
                  >
                    <Icon name="panel-right-open" className="h-4 w-4" />
                  </button>
                )
              }
            ]}
          />
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <Checkbox
          label="Select page"
          checked={allOnPage}
          onChange={(e) =>
            setSelected((s) =>
              e.target.checked
                ? Array.from(/* @__PURE__ */ new Set([...s, ...rows.map((r) => r.id)]))
                : s.filter((id) => !rows.some((r) => r.id === id))
            )
          }
        />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            Page {page + 1} of {pages}
          </span>
          <Button
            size="sm"
            variant="secondary"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            aria-label="Previous page"
          >
            <Icon name="chevron-left" className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={page >= pages - 1}
            onClick={() => setPage(page + 1)}
            aria-label="Next page"
          >
            <Icon name="chevron-right" className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <BookingDrawer booking={drawer} onClose={() => setDrawer(null)} />
    </div>
  );
}
export { Bookings };
