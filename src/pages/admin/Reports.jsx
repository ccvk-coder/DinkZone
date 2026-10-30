import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '../../components/Card';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { Chip } from '../../components/ui/Chip';
import { useBookings } from '../../contexts/BookingsContext';
import { venues } from '../../data/venues';
import {
  downloadFile,
  heatGrid,
  revenueSeries,
  toCsv,
  utilizationByHour
} from '../../utils/analytics';
import { compactPeso, peso } from '../../utils/format';
import { seeded } from '../../utils/slots';
const tooltipStyle = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  fontSize: 12,
  color: 'var(--foreground)'
};
function Reports() {
  const { toast } = useToast();
  const { allBookings } = useBookings();
  const [range, setRange] = useState(14);
  const series = useMemo(() => revenueSeries(range), [range]);
  const grid = useMemo(() => heatGrid(), []);
  const hours = useMemo(() => utilizationByHour(), []);
  const total = series.reduce((s, d) => s + d.courts + d.shop, 0);
  const byVenue = useMemo(
    () =>
      venues
        .map((v) => ({
          name: v.name.replace(/^The /, '').split(' ').slice(0, 2).join(' '),
          revenue: Math.round(
            v.courts * v.pricePerHour * 9 * range * (0.55 + seeded(v.id + range) * 0.35)
          )
        }))
        .sort((a, b) => b.revenue - a.revenue),
    [range]
  );
  const topCourts = useMemo(
    () =>
      venues
        .flatMap((v) =>
          Array.from({ length: v.courts }, (_, i) => ({
            venue: v.name,
            court: i + 1,
            util: 0.5 + seeded(`${v.id}c${i}`) * 0.48,
            revenue: Math.round(v.pricePerHour * 11 * range * (0.6 + seeded(`${v.id}r${i}`) * 0.4))
          }))
        )
        .sort((a, b) => b.util - a.util)
        .slice(0, 8),
    [range]
  );
  const exportCsv = () => {
    downloadFile(
      `dinkzone-revenue-${range}d.csv`,
      toCsv(series.map((d) => ({ Day: d.day, 'Court revenue': d.courts, 'Shop revenue': d.shop })))
    );
    toast({ title: 'CSV exported', tone: 'success' });
  };
  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle={`${compactPeso(total)} revenue \xB7 ${allBookings.length} bookings sampled`}
        actions={
          <>
            <Button variant="secondary" className="pressable" onClick={exportCsv}>
              <span className="inline-flex items-center gap-2">
                <Icon name="file-spreadsheet" className="h-4 w-4" aria-hidden />
                CSV
              </span>
            </Button>
            <Button variant="secondary" className="pressable" onClick={() => window.print()}>
              <span className="inline-flex items-center gap-2">
                <Icon name="file-text" className="h-4 w-4" aria-hidden />
                PDF
              </span>
            </Button>
          </>
        }
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {[7, 14, 30].map((r) => (
          <Chip key={r} selected={range === r} onClick={() => setRange(r)}>
            Last {r} days
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by venue</CardTitle>
            <CardDescription>Court bookings, last {range} days</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byVenue} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid stroke="var(--border)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => compactPeso(v)}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v) => peso(v)}
                    cursor={{ fill: 'var(--muted)' }}
                  />
                  <Bar dataKey="revenue" fill="var(--court)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Utilization by hour</CardTitle>
            <CardDescription>All courts, this week</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hours} margin={{ left: -16 }}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    unit="%"
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v) => `${v}%`}
                    cursor={{ fill: 'var(--muted)' }}
                  />
                  <Bar dataKey="rate" fill="var(--court)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Weekly demand heatmap</CardTitle>
          <CardDescription>Share of courts booked, by day and hour</CardDescription>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table
              className="w-full min-w-[640px] border-separate border-spacing-1 text-xs"
              aria-label="Demand heatmap"
            >
              <thead>
                <tr>
                  <th />
                  {Array.from({ length: 18 }, (_, i) => (
                    <th key={i} className="font-medium text-muted-foreground">
                      {(6 + i) % 12 === 0 ? 12 : (6 + i) % 12}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grid.map((row) => (
                  <tr key={row.day}>
                    <th className="pr-2 text-left font-medium text-muted-foreground">{row.day}</th>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className="h-7 rounded"
                        style={{
                          background: `color-mix(in srgb, var(--court) ${Math.round(v * 100)}%, transparent)`
                        }}
                        title={`${row.day} ${6 + i}:00 \xB7 ${Math.round(v * 100)}%`}
                      >
                        <span className="sr-only">{Math.round(v * 100)}%</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Top courts</CardTitle>
          <CardDescription>Highest utilization, last {range} days</CardDescription>
        </CardHeader>
        <CardBody className="pt-0">
          <ol className="divide-y divide-border">
            {topCourts.map((c, i) => (
              <li key={c.venue + c.court} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="w-6 font-display font-extrabold tabular text-muted-foreground">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {c.venue} <span className="text-muted-foreground">· Court {c.court}</span>
                </span>
                <div className="hidden h-1.5 w-32 rounded-full bg-muted sm:block">
                  <div
                    className="h-full rounded-full bg-court"
                    style={{ width: `${c.util * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right font-semibold tabular">
                  {Math.round(c.util * 100)}%
                </span>
                <span className="w-20 text-right tabular text-muted-foreground">
                  {compactPeso(c.revenue)}
                </span>
              </li>
            ))}
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}
export { Reports };
