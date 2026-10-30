import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '../Card';
import { Badge } from '../Badge';
import { formatClock } from '../../utils/clock';
import { cn } from '../../utils/classNames';
const methodMeta = {
  QR: { label: 'QR code', icon: 'qr-code', bar: 'bg-court' },
  NFC: { label: 'NFC tap', icon: 'nfc', bar: 'bg-highlight' },
  Manual: { label: 'Manual', icon: 'keyboard', bar: 'bg-muted-foreground' }
};
const outcomeTone = {
  'Checked in': 'success',
  Expired: 'warning',
  'Wrong court': 'warning',
  'Not found': 'destructive'
};
function ScanSummary({ totals, recent }) {
  const total = totals.reduce((s, t) => s + t.count, 0);
  const rejected = totals.reduce((s, t) => s + t.rejected, 0);
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>QR & NFC scans</CardTitle>
            <CardDescription>
              {total} scans today · {rejected} rejected
            </CardDescription>
          </div>
          <Link
            to="/staff/scan"
            className="pressable inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold hover:bg-muted"
          >
            <Icon name="scan-line" className="h-4 w-4" aria-hidden />
            Scan
          </Link>
        </div>
      </CardHeader>
      <CardBody className="flex flex-1 flex-col gap-5 pt-0">
        <div className="grid grid-cols-3 gap-2">
          {totals.map((t) => (
            <div key={t.method} className="rounded-md border border-border p-3">
              <Icon
                name={methodMeta[t.method].icon}
                className="h-5 w-5 text-muted-foreground"
                aria-hidden
              />
              <p className="mt-2 font-display text-2xl font-extrabold leading-none tabular">
                {t.count}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{methodMeta[t.method].label}</p>
            </div>
          ))}
        </div>
        <div>
          <div
            className="flex h-2.5 overflow-hidden rounded-full bg-muted"
            role="img"
            aria-label={totals
              .map((t) => `${t.method} ${Math.round((t.count / total) * 100)}%`)
              .join(', ')}
          >
            {totals.map((t) => (
              <div
                key={t.method}
                className={methodMeta[t.method].bar}
                style={{ width: `${(t.count / total) * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {totals.map((t) => (
              <span key={t.method} className="inline-flex items-center gap-1.5">
                <span
                  className={cn('h-2 w-2 rounded-full', methodMeta[t.method].bar)}
                  aria-hidden
                />
                {t.method} {Math.round((t.count / total) * 100)}%
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Latest scans
          </p>
          <ul className="mt-2 divide-y divide-border">
            {recent.slice(0, 5).map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted">
                  <Icon
                    name={methodMeta[s.method].icon}
                    className="h-4 w-4"
                    aria-label={methodMeta[s.method].label}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{s.playerName}</span>
                  <span className="block text-xs text-muted-foreground tabular">
                    {formatClock(s.time)} · Court {s.court}
                  </span>
                </span>
                <Badge tone={outcomeTone[s.outcome]}>{s.outcome}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}
export { ScanSummary };
