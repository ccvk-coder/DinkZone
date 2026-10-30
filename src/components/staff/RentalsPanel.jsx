import { Icon } from '../ui/Icon';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '../Card';
import { Badge } from '../Badge';
import { peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
function RentalsPanel({ items }) {
  const revenue = items.reduce((s, i) => s + i.rentedToday * i.rate, 0);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>Rental products</CardTitle>
            <CardDescription>
              {items.reduce((s, i) => s + i.rentedToday, 0)} rentals today · {peso(revenue)}
            </CardDescription>
          </div>
          <Badge tone="primary">{items.reduce((s, i) => s + i.out, 0)} out now</Badge>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {items.map((i) => {
            const available = Math.max(0, i.fleet - i.out - i.maintenance);
            const low = available / i.fleet < 0.25;
            return (
              <li key={i.id} className="rounded-md border border-border p-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-muted">
                    <Icon name={i.icon} className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{i.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {peso(i.rate)} · {i.rentedToday} today
                    </span>
                  </span>
                </div>
                <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
                  <div className="bg-court" style={{ width: `${(i.out / i.fleet) * 100}%` }} />
                  <div
                    className="bg-warning"
                    style={{ width: `${(i.maintenance / i.fleet) * 100}%` }}
                  />
                </div>
                <p
                  className={cn(
                    'mt-1.5 text-xs tabular',
                    low ? 'font-semibold text-warning' : 'text-muted-foreground'
                  )}
                >
                  {available} of {i.fleet} available{i.out ? ` \xB7 ${i.out} out` : ''}
                  {i.maintenance ? ` \xB7 ${i.maintenance} repair` : ''}
                </p>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
export { RentalsPanel };
