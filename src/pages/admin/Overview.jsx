import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Icon } from '../../components/ui/Icon';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '../../components/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusChip } from '../../components/ui/StatusChip';
import { KpiCard } from '../../components/admin/KpiCard';
import { ActivityFeed } from '../../components/admin/ActivityFeed';
import { OccupancyLegend, OccupancyMap } from '../../components/admin/OccupancyMap';
import { useBookings } from '../../contexts/BookingsContext';
import { venues } from '../../data/venues';
import { tournaments } from '../../data/tournaments';
import {
  occupancy,
  revenueOf,
  revenueSeries,
  todaysBookings,
  utilizationByHour
} from '../../utils/analytics';
import { compactPeso, formatRange, peso } from '../../utils/format';
const tooltipStyle = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  fontSize: 12,
  color: 'var(--foreground)'
};
function Overview() {
  const { allBookings } = useBookings();
  const today = useMemo(() => todaysBookings(allBookings), [allBookings]);
  const series = useMemo(() => revenueSeries(14), []);
  const hours = useMemo(() => utilizationByHour(), []);
  const shopToday = series[series.length - 1].shop;
  const active = today.filter((b) => b.status !== 'Cancelled');
  const checkIns = today.filter(
    (b) => b.status === 'Checked-in' || b.status === 'Completed'
  ).length;
  const noShows = today.filter((b) => b.status === 'No-show').length;
  const nextUp = today
    .filter((b) => b.status === 'Confirmed' && b.startHour > /* @__PURE__ */ new Date().getHours())
    .slice(0, 5);
  const topVenues = venues
    .map((v) => ({ v, rate: occupancy(today, v) }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 5);
  const hour = /* @__PURE__ */ new Date().getHours();
  return (
    <div>
      <PageHeader
        eyebrow={/* @__PURE__ */ new Date().toLocaleDateString('en-PH', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })}
        title={`Good ${hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'}, Andrea`}
        subtitle="Live across 14 venues and 58 courts in Cebu City."
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        <KpiCard
          label="Bookings today"
          value={String(active.length)}
          delta={12}
          icon="calendar-check"
        />
        <KpiCard
          label="Revenue today"
          value={compactPeso(revenueOf(today) + shopToday)}
          delta={8}
          icon="banknote"
        />
        <KpiCard
          label="Occupancy"
          value={`${Math.round(occupancy(today) * 100)}%`}
          delta={5}
          icon="gauge"
        />
        <KpiCard label="Check-ins" value={String(checkIns)} delta={15} icon="scan-line" />
        <KpiCard label="No-shows" value={String(noShows)} delta={-22} icon="user-x" invert />
        <KpiCard label="Shop sales" value={compactPeso(shopToday)} delta={-4} icon="shopping-bag" />
        <KpiCard
          label="Tournaments"
          value={String(tournaments.filter((t) => t.status !== 'past').length)}
          delta={33}
          icon="trophy"
          hint="vs last month"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue · last 14 days</CardTitle>
            <CardDescription>Court bookings and pro shop, all venues</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series} margin={{ left: -12, right: 8, top: 8 }}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    tickLine={false}
                    axisLine={false}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `\u20B1${v / 1e3}K`}
                  />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => peso(v)} />
                  <Area
                    type="monotone"
                    dataKey="courts"
                    name="Courts"
                    stroke="var(--court)"
                    strokeWidth={2}
                    fill="var(--court)"
                    fillOpacity={0.12}
                  />
                  <Area
                    type="monotone"
                    dataKey="shop"
                    name="Shop"
                    stroke="#A16207"
                    strokeWidth={2}
                    fill="#A16207"
                    fillOpacity={0.08}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live activity</CardTitle>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" aria-hidden />
                Live
              </span>
            </div>
          </CardHeader>
          <CardBody className="max-h-72 overflow-y-auto pt-0">
            <ActivityFeed />
          </CardBody>
        </Card>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle>City occupancy right now</CardTitle>
                <CardDescription>Circle size = number of courts</CardDescription>
              </div>
              <OccupancyLegend />
            </div>
          </CardHeader>
          <CardBody>
            <div className="h-80 overflow-hidden rounded-md border border-border">
              <OccupancyMap bookings={today} />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Utilization by hour</CardTitle>
            <CardDescription>Average this week</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hours} margin={{ left: -20, right: 0, top: 8 }}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                    tickLine={false}
                    axisLine={false}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                    tickLine={false}
                    axisLine={false}
                    unit="%"
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v) => `${v}%`}
                    cursor={{ fill: 'var(--muted)' }}
                  />
                  <Bar
                    dataKey="rate"
                    name="Utilization"
                    fill="var(--court)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Coming up next</CardTitle>
              <Link
                to="/admin/bookings"
                className="text-sm font-semibold text-court hover:underline dark:text-highlight"
              >
                All bookings
              </Link>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            {nextUp.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No more confirmed bookings today.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {nextUp.map((b) => (
                  <li key={b.id} className="flex items-center gap-3 py-3 text-sm">
                    <span className="w-24 font-semibold tabular">
                      {formatRange(b.startHour, b.hours)}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {b.playerName} ·{' '}
                      <span className="text-muted-foreground">
                        {venues.find((v) => v.id === b.venueId)?.name}, C{b.court}
                      </span>
                    </span>
                    <StatusChip status={b.status} />
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Busiest venues today</CardTitle>
          </CardHeader>
          <CardBody className="pt-0">
            <ul className="space-y-3">
              {topVenues.map(({ v, rate }) => (
                <li key={v.id} className="flex items-center gap-3">
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{v.name}</span>
                  <div className="h-2 w-32 rounded-full bg-muted sm:w-48">
                    <div
                      className="h-full rounded-full bg-court"
                      style={{ width: `${rate * 100}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-semibold tabular">
                    {Math.round(rate * 100)}%
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/admin/reports"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-court hover:underline dark:text-highlight"
            >
              Open reports <Icon name="arrow-right" className="h-4 w-4" aria-hidden />
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
export { Overview };
