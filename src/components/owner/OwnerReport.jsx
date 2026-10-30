import { useMemo } from 'react';
import { Icon } from '../ui/Icon';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '../Card';
import { Button } from '../Button';
import { useToast } from '../Toast';
import { peso } from '../../utils/format';
import { downloadFile, toCsv } from '../../utils/analytics';
import {
  ancillaryRevenue,
  mixShare,
  periodOptions,
  periodRangeLabel
} from '../../utils/venueStats';
const PLATFORM_FEE = 0.06;
function OwnerReport({ venue, owner, period, summary, rows }) {
  const { toast } = useToast();
  const periodLabel = periodOptions.find((p) => p.value === period)?.label ?? '';
  const range = periodRangeLabel(period);
  const extra = useMemo(() => ancillaryRevenue([venue], period), [venue, period]);
  const avgBooking = summary.bookings ? summary.revenue / summary.bookings : 0;
  const online = mixShare(`online|${venue.id}|${period}`, 0.66, 0.14);
  const refunds = Math.round(summary.cancelled * avgBooking * 0.5);
  const fee = Math.round(summary.revenue * online * PLATFORM_FEE);
  const gross = summary.revenue + extra.rentals + extra.shop;
  const net = gross - refunds - fee;
  const statement = [
    {
      label: 'Court bookings',
      detail: `${summary.bookings.toLocaleString()} bookings \xB7 ${summary.hours.toLocaleString()} court-hours`,
      amount: summary.revenue
    },
    {
      label: 'Gear rentals',
      detail: 'Paddles, balls, shoes, towels, lockers',
      amount: extra.rentals
    },
    { label: 'Pro shop', detail: 'Front-desk and pickup orders', amount: extra.shop }
  ];
  const deductions = [
    {
      label: 'Refunds',
      detail: `${summary.cancelled} cancellations, avg. 50% refunded`,
      amount: -refunds
    },
    {
      label: 'DinkZone booking fee',
      detail: `6% of online-paid court bookings (${Math.round(online * 100)}%)`,
      amount: -fee
    }
  ];
  const breakdown = summary.series
    .filter((p) => p.capacity > 0)
    .map((p) => ({
      label: p.label,
      bookings: Math.round(p.hours / 1.35),
      hours: p.hours,
      occupancy: p.capacity ? p.hours / p.capacity : 0,
      revenue: p.revenue
    }));
  const busiest = breakdown.reduce((a, b) => (b.revenue > a.revenue ? b : a), breakdown[0]);
  const quietest = breakdown.reduce((a, b) => (b.revenue < a.revenue ? b : a), breakdown[0]);
  const topCourt = rows.reduce((a, b) => (b.occupancy > a.occupancy ? b : a), rows[0]);
  const lowCourt = rows.reduce((a, b) => (b.occupancy < a.occupancy ? b : a), rows[0]);
  const unit = period === 'today' ? 'hour' : 'day';
  const insights = [
    {
      icon: 'flame',
      label: `Busiest ${unit}`,
      value: busiest?.label ?? '\u2014',
      note: busiest ? peso(busiest.revenue) : ''
    },
    {
      icon: 'moon',
      label: `Quietest ${unit}`,
      value: quietest?.label ?? '\u2014',
      note: quietest ? `${Math.round(quietest.occupancy * 100)}% occupied` : ''
    },
    {
      icon: 'trophy',
      label: 'Top court',
      value: topCourt?.label ?? '\u2014',
      note: topCourt ? `${Math.round(topCourt.occupancy * 100)}% occupancy` : ''
    },
    {
      icon: 'trending-down',
      label: 'Needs a boost',
      value: lowCourt?.label ?? '\u2014',
      note: lowCourt ? `${Math.round(lowCourt.occupancy * 100)}% occupancy` : ''
    }
  ];
  function exportCsv() {
    const csv = toCsv([
      ...breakdown.map((b) => ({
        [unit === 'hour' ? 'Hour' : 'Day']: b.label,
        Bookings: b.bookings,
        'Court-hours': b.hours,
        'Occupancy %': Math.round(b.occupancy * 100),
        'Court revenue (PHP)': b.revenue
      })),
      {
        [unit === 'hour' ? 'Hour' : 'Day']: 'Total',
        Bookings: summary.bookings,
        'Court-hours': summary.hours,
        'Occupancy %': Math.round(summary.occupancy * 100),
        'Court revenue (PHP)': summary.revenue
      }
    ]);
    downloadFile(`${venue.id}-${period}-report.csv`, csv);
    toast({
      title: 'Report downloaded',
      description: `${venue.name} \xB7 ${periodLabel}`,
      tone: 'success'
    });
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {periodLabel} report
          </p>
          <p className="font-display text-lg font-extrabold">{venue.name}</p>
          <p className="text-sm text-muted-foreground">
            {range} · Prepared for {owner.name}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => window.print()}>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="printer" className="h-4 w-4" aria-hidden />
              Print
            </span>
          </Button>
          <Button size="sm" onClick={exportCsv}>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="download" className="h-4 w-4" aria-hidden />
              Export CSV
            </span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Income statement</CardTitle>
            <CardDescription>What your venue earned and what you'll be paid out</CardDescription>
          </CardHeader>
          <CardBody className="pt-0">
            <dl className="divide-y divide-border text-sm">
              {statement.map((s) => (
                <div key={s.label} className="flex items-center gap-3 py-3">
                  <dt className="min-w-0 flex-1">
                    <span className="block font-medium">{s.label}</span>
                    <span className="block text-xs text-muted-foreground">{s.detail}</span>
                  </dt>
                  <dd className="font-semibold tabular">{peso(s.amount)}</dd>
                </div>
              ))}
              <div className="flex items-center gap-3 py-3">
                <dt className="flex-1 font-semibold">Gross income</dt>
                <dd className="font-semibold tabular">{peso(gross)}</dd>
              </div>
              {deductions.map((s) => (
                <div key={s.label} className="flex items-center gap-3 py-3">
                  <dt className="min-w-0 flex-1">
                    <span className="block font-medium">{s.label}</span>
                    <span className="block text-xs text-muted-foreground">{s.detail}</span>
                  </dt>
                  <dd className="font-semibold tabular text-destructive">
                    −{peso(Math.abs(s.amount))}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-2 flex items-center justify-between rounded-md bg-muted p-4">
              <div>
                <p className="text-sm font-semibold">Net payout</p>
                <p className="text-xs text-muted-foreground">Sent to your bank every Monday</p>
              </div>
              <p className="font-display text-[28px] font-extrabold leading-none tabular">
                {peso(net)}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
            <CardDescription>{range}</CardDescription>
          </CardHeader>
          <CardBody className="pt-0">
            <ul className="space-y-3">
              {insights.map((i) => (
                <li
                  key={i.label}
                  className="flex items-center gap-3 rounded-md border border-border p-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted">
                    <Icon name={i.icon} className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted-foreground">{i.label}</span>
                    <span className="block truncate font-semibold">{i.value}</span>
                  </span>
                  <span className="text-xs font-medium text-muted-foreground tabular">
                    {i.note}
                  </span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{unit === 'hour' ? 'Hourly' : 'Daily'} breakdown</CardTitle>
          <CardDescription>Court bookings only · {range}</CardDescription>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    {unit === 'hour' ? 'Hour' : 'Day'}
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">
                    Bookings
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">
                    Court-hrs
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">
                    Occupancy
                  </th>
                  <th scope="col" className="py-2 pl-3 text-right font-semibold">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {breakdown.map((b, i) => (
                  <tr key={`${b.label}-${i}`}>
                    <td className="py-2.5 pr-3 font-medium">{b.label}</td>
                    <td className="px-3 py-2.5 text-right tabular">{b.bookings}</td>
                    <td className="px-3 py-2.5 text-right tabular">{b.hours}</td>
                    <td className="px-3 py-2.5 text-right tabular">
                      {Math.round(b.occupancy * 100)}%
                    </td>
                    <td className="py-2.5 pl-3 text-right font-semibold tabular">
                      {peso(b.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border font-semibold">
                  <td className="py-3 pr-3">Total</td>
                  <td className="px-3 py-3 text-right tabular">
                    {summary.bookings.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 text-right tabular">{summary.hours.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right tabular">
                    {Math.round(summary.occupancy * 100)}%
                  </td>
                  <td className="py-3 pl-3 text-right tabular">{peso(summary.revenue)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
export { OwnerReport };
