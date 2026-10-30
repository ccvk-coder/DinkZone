import { Icon } from '../ui/Icon';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '../Card';
import { peso } from '../../utils/format';
const lineColors = ['bg-court', 'bg-highlight', 'bg-warning'];
function SalesTodayCard({ lines, payments }) {
  const total = lines.reduce((s, l) => s + l.amount, 0);
  const payTotal = payments.reduce((s, p) => s + p.amount, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales today</CardTitle>
        <CardDescription>Front desk, rentals and pro shop</CardDescription>
      </CardHeader>
      <CardBody className="space-y-5 pt-0">
        <div>
          <p className="font-display text-[34px] font-extrabold leading-none tabular">
            {peso(total)}
          </p>
          <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden>
            {lines.map((l, i) => (
              <div
                key={l.label}
                className={lineColors[i % lineColors.length]}
                style={{ width: `${(l.amount / total) * 100}%` }}
              />
            ))}
          </div>
        </div>
        <ul className="space-y-3">
          {lines.map((l, i) => (
            <li key={l.label} className="flex items-center gap-3 text-sm">
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${lineColors[i % lineColors.length]}`}
                aria-hidden
              />
              <Icon name={l.icon} className="h-4 w-4 text-muted-foreground" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{l.label}</span>
                <span className="block text-xs text-muted-foreground">{l.detail}</span>
              </span>
              <span className="font-semibold tabular">{peso(l.amount)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Pro shop by payment
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {payments.map((p) => (
              <div
                key={p.method}
                className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm"
              >
                <span className="text-muted-foreground">{p.method}</span>
                <span className="font-semibold tabular">
                  {payTotal ? Math.round((p.amount / payTotal) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
export { SalesTodayCard };
