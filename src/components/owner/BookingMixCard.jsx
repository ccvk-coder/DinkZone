import { Icon } from '../ui/Icon';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '../Card';
import { peso } from '../../utils/format';
import { mixShare } from '../../utils/venueStats';
function BookingMixCard({ summary, scopeKey }) {
  const online = mixShare(`online|${scopeKey}`, 0.66, 0.14);
  const peak = mixShare(`peak|${scopeKey}`, 0.48, 0.12);
  const repeat = mixShare(`repeat|${scopeKey}`, 0.52, 0.16);
  const avg = summary.bookings ? summary.revenue / summary.bookings : 0;
  const rows = [
    {
      label: 'Paid online',
      value: online,
      icon: 'smartphone',
      note: `${Math.round((1 - online) * 100)}% pay at venue`
    },
    {
      label: 'Peak hours (5\u20139 PM)',
      value: peak,
      icon: 'sunset',
      note: 'of booked court-hours'
    },
    { label: 'Repeat players', value: repeat, icon: 'repeat', note: 'booked 2+ times' }
  ];
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Booking mix</CardTitle>
        <CardDescription>How players book your courts</CardDescription>
      </CardHeader>
      <CardBody className="flex-1 space-y-5 pt-0">
        <div className="rounded-md bg-muted p-4">
          <p className="text-xs text-muted-foreground">Average booking value</p>
          <p className="mt-1 font-display text-2xl font-extrabold tabular">
            {peso(Math.round(avg))}
          </p>
        </div>
        <ul className="space-y-4">
          {rows.map((r) => (
            <li key={r.label}>
              <div className="flex items-center gap-2 text-sm">
                <Icon name={r.icon} className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span className="flex-1 font-medium">{r.label}</span>
                <span className="font-semibold tabular">{Math.round(r.value * 100)}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted" aria-hidden>
                <div
                  className="h-full rounded-full bg-court"
                  style={{ width: `${r.value * 100}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{r.note}</p>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
export { BookingMixCard };
