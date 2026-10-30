import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { PageHeader } from '../../components/ui/PageHeader';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { StatusChip } from '../../components/ui/StatusChip';
import { KpiCard } from '../../components/admin/KpiCard';
import { PerformanceTable } from '../../components/owner/PerformanceTable';
import { BookingMixCard } from '../../components/owner/BookingMixCard';
import { OwnerReport } from '../../components/owner/OwnerReport';
import { Tab, TabList, TabPanel, Tabs } from '../../components/Tabs';
import { useBookings } from '../../contexts/BookingsContext';
import { venues } from '../../data/venues';
import { owners } from '../../data/owner';
import { compactPeso, formatRange, peso } from '../../utils/format';
import { toLocalISO } from '../../utils/slots';
import {
  performanceRows,
  periodCompareHint,
  periodOptions,
  periodSummary
} from '../../utils/venueStats';
const tooltipStyle = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  fontSize: 12,
  color: 'var(--foreground)'
};
function OwnerOverview({ venueId }) {
  const { allBookings } = useBookings();
  const [period, setPeriod] = useState('today');
  const [view, setView] = useState('overview');
  const venue = venues.find((v) => v.id === venueId) ?? venues[0];
  const owner = owners.find((o) => o.venueId === venue.id) ?? owners[0];
  const scope = useMemo(() => [venue], [venue]);
  const summary = useMemo(() => periodSummary(scope, period), [scope, period]);
  const rows = useMemo(() => performanceRows(scope, period), [scope, period]);
  const hint = periodCompareHint[period];
  const todayList = useMemo(() => {
    const today = toLocalISO(/* @__PURE__ */ new Date());
    return allBookings
      .filter((b) => b.date === today && b.venueId === venue.id && b.status !== 'Cancelled')
      .sort((a, b) => a.startHour - b.startHour);
  }, [allBookings, venue.id]);
  return (
    <div>
      <PageHeader
        eyebrow={`Owner view \xB7 ${owner.business}`}
        title={venue.name}
        subtitle={`Welcome back, ${owner.name.split(' ')[0]} \xB7 ${venue.courts} ${venue.setting.toLowerCase()} courts \xB7 ${venue.neighborhood}`}
        actions={
          <SegmentedControl
            label="Period"
            layoutId="owner-period"
            value={period}
            onChange={setPeriod}
            options={periodOptions}
          />
        }
      />
      <div className="mb-4 flex items-center gap-3 rounded-lg border border-border bg-card p-3">
        <img
          src={venue.image}
          alt=""
          className="h-12 w-16 shrink-0 rounded-md bg-muted object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{venue.address}</p>
          <p className="text-xs text-muted-foreground">
            Open {venue.openHour}:00–{venue.closeHour}:00 · {peso(venue.pricePerHour)}/hr ·{' '}
            {peso(venue.peakPrice)} peak
          </p>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground sm:inline-flex">
          <Icon name="lock" className="h-3.5 w-3.5" aria-hidden />
          Only your venue
        </span>
      </div>
      <Tabs value={view} onChange={setView}>
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="report">Report</Tab>
        </TabList>
        <TabPanel value="report">
          <div className="mt-4">
            <OwnerReport
              venue={venue}
              owner={owner}
              period={period}
              summary={summary}
              rows={rows}
            />
          </div>
        </TabPanel>
        <TabPanel value="overview">
          <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 xl:grid-cols-5">
            <KpiCard
              label="Court bookings"
              value={summary.bookings.toLocaleString()}
              delta={summary.delta.bookings}
              icon="calendar-check"
              hint={hint}
            />
            <KpiCard
              label="Court revenue"
              value={compactPeso(summary.revenue)}
              delta={summary.delta.revenue}
              icon="banknote"
              hint={hint}
            />
            <KpiCard
              label="Occupancy"
              value={`${Math.round(summary.occupancy * 100)}%`}
              delta={summary.delta.occupancy}
              icon="gauge"
              hint={hint}
            />
            <KpiCard
              label="Court-hours booked"
              value={summary.hours.toLocaleString()}
              delta={summary.delta.hours}
              icon="clock"
              hint={hint}
            />
            <KpiCard
              label="Cancellations"
              value={String(summary.cancelled)}
              delta={summary.delta.cancelled}
              icon="calendar-x"
              hint={hint}
              invert
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card className="flex h-full flex-col xl:col-span-2">
              <CardHeader>
                <CardTitle>
                  Court revenue ·{' '}
                  {periodOptions.find((p) => p.value === period)?.label.toLowerCase()}
                </CardTitle>
                <CardDescription>
                  {period === 'today' ? 'By hour, including upcoming bookings' : 'By day'}
                </CardDescription>
              </CardHeader>
              <CardBody className="flex flex-1 flex-col">
                <div className="h-64 xl:h-auto xl:min-h-[16rem] xl:flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summary.series} margin={{ left: -12, right: 8, top: 8 }}>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                        tickLine={false}
                        axisLine={false}
                        interval={period === 'month' ? 4 : period === 'today' ? 1 : 0}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) =>
                          v >= 1e3 ? `\u20B1${Math.round(v / 1e3)}K` : `\u20B1${v}`
                        }
                      />
                      <Tooltip
                        contentStyle={tooltipStyle}
                        cursor={{ fill: 'var(--muted)' }}
                        formatter={(v) => peso(v)}
                      />
                      <Bar
                        dataKey="revenue"
                        name="Revenue"
                        fill="var(--court)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
            <BookingMixCard summary={summary} scopeKey={`${venue.id}|${period}`} />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card className="flex h-full flex-col xl:col-span-2">
              <CardHeader>
                <CardTitle>Court performance</CardTitle>
                <CardDescription>Every court at {venue.name}</CardDescription>
              </CardHeader>
              <CardBody className="flex-1 pt-0">
                <PerformanceTable rows={rows} firstColumn="Court" />
              </CardBody>
            </Card>
            <Card className="flex h-full flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Booked today</CardTitle>
                  <Badge tone="primary">{todayList.length}</Badge>
                </div>
              </CardHeader>
              <CardBody className="flex flex-1 flex-col pt-0">
                {todayList.length === 0 ? (
                  <p className="flex flex-1 items-center justify-center py-8 text-center text-sm text-muted-foreground">
                    No bookings at {venue.name} today yet.
                  </p>
                ) : (
                  <ul className="max-h-[360px] flex-1 divide-y divide-border overflow-y-auto">
                    {todayList.map((b) => (
                      <li key={b.id} className="flex items-center gap-3 py-3 text-sm">
                        <span className="w-24 shrink-0 font-semibold tabular">
                          {formatRange(b.startHour, b.hours)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{b.playerName}</span>
                          <span className="block truncate text-xs text-muted-foreground">
                            Court {b.court} · {b.paymentStatus}
                          </span>
                        </span>
                        <StatusChip status={b.status} />
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  to="/admin/bookings"
                  className="mt-auto inline-block self-start pt-3 text-sm font-semibold text-court hover:underline dark:text-highlight"
                >
                  Manage bookings
                </Link>
              </CardBody>
            </Card>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
export { OwnerOverview };
