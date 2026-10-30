import { useMemo, useState } from 'react';
import { Icon } from '../ui/Icon';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Card, CardBody, CardHeader, CardTitle } from '../Card';
import { SegmentedControl } from '../ui/SegmentedControl';
import { compactPeso } from '../../utils/format';
import { cn } from '../../utils/classNames';
import { periodCompareHint, periodSummary } from '../../utils/venueStats';
const options = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' }
];
const tooltipStyle = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  fontSize: 12,
  color: 'var(--foreground)'
};
function BookingsPeriodCard({ venue }) {
  const [period, setPeriod] = useState('today');
  const summary = useMemo(() => periodSummary([venue], period), [venue, period]);
  const up = summary.delta.bookings >= 0;
  const stats = [
    { label: 'Court-hours', value: summary.hours.toLocaleString() },
    { label: 'Occupancy', value: `${Math.round(summary.occupancy * 100)}%` },
    { label: 'Court revenue', value: compactPeso(summary.revenue) }
  ];
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Bookings</CardTitle>
          <SegmentedControl
            label="Booking period"
            layoutId="staff-bookings-period"
            value={period}
            onChange={setPeriod}
            options={options}
          />
        </div>
      </CardHeader>
      <CardBody className="space-y-4 pt-0">
        <div className="flex items-end gap-3">
          <p className="font-display text-[34px] font-extrabold leading-none tabular">
            {summary.bookings.toLocaleString()}
          </p>
          <p className="pb-1 text-xs">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-semibold',
                up ? 'text-success' : 'text-destructive'
              )}
            >
              <Icon
                name={up ? 'arrow-up-right' : 'arrow-down-right'}
                className="h-3.5 w-3.5"
                aria-hidden
              />
              {Math.abs(summary.delta.bookings)}%
            </span>{' '}
            <span className="text-muted-foreground">{periodCompareHint[period]}</span>
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-md bg-muted px-3 py-2">
              <dt className="text-[11px] text-muted-foreground">{s.label}</dt>
              <dd className="font-semibold tabular">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary.series} margin={{ left: 0, right: 0, top: 4 }}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                tickLine={false}
                axisLine={false}
                interval={period === 'month' ? 6 : period === 'today' ? 2 : 0}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: 'var(--muted)' }}
                formatter={(v) => [`${v} court-hrs`, 'Booked']}
              />
              <Bar dataKey="hours" fill="var(--court)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}
export { BookingsPeriodCard };
