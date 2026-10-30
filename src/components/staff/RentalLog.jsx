import { useMemo, useState } from 'react';
import { Icon } from '../ui/Icon';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '../Card';
import { Badge } from '../Badge';
import { SegmentedControl } from '../ui/SegmentedControl';
import { peso } from '../../utils/format';
import { formatClock } from '../../utils/clock';
function RentalLog({ records, items, onReturn }) {
  const [filter, setFilter] = useState('all');
  const now = /* @__PURE__ */ new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const isOverdue = (r) => !r.returnedAt && toMinutes(r.due) < nowMinutes;
  const counts = {
    out: records.filter((r) => !r.returnedAt).length,
    returned: records.filter((r) => r.returnedAt).length,
    overdue: records.filter(isOverdue).length,
    damaged: records.filter((r) => r.condition === 'Damaged').length
  };
  const visible = useMemo(() => {
    const list = records.filter((r) =>
      filter === 'all' ? true : filter === 'out' ? !r.returnedAt : !!r.returnedAt
    );
    return [...list].sort((a, b) => {
      if (!a.returnedAt !== !b.returnedAt) return a.returnedAt ? 1 : -1;
      if (!a.returnedAt) return toMinutes(a.due) - toMinutes(b.due);
      return toMinutes(b.returnedAt ?? '0:0') - toMinutes(a.returnedAt ?? '0:0');
    });
  }, [records, filter]);
  const summary = [
    { label: 'Out now', value: counts.out, icon: 'package-open', tone: 'text-foreground' },
    { label: 'Returned', value: counts.returned, icon: 'package-check', tone: 'text-success' },
    { label: 'Overdue', value: counts.overdue, icon: 'alarm-clock', tone: 'text-destructive' },
    { label: 'Damaged', value: counts.damaged, icon: 'wrench', tone: 'text-warning' }
  ];
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Rentals & returns</CardTitle>
            <CardDescription>Every rental handed out today and when it came back</CardDescription>
          </div>
          <SegmentedControl
            label="Filter rentals"
            layoutId="rental-log-filter"
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: `All ${records.length}` },
              { value: 'out', label: `Out ${counts.out}` },
              { value: 'returned', label: `Returned ${counts.returned}` }
            ]}
          />
        </div>
      </CardHeader>
      <CardBody className="space-y-4 pt-0">
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {summary.map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-md bg-muted px-3 py-2.5">
              <Icon name={s.icon} className={`h-5 w-5 ${s.tone}`} aria-hidden />
              <div>
                <dt className="text-[11px] text-muted-foreground">{s.label}</dt>
                <dd className="font-display text-lg font-extrabold leading-none tabular">
                  {s.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
        {visible.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {filter === 'out' ? 'All gear is back on the rack.' : 'No returns logged yet today.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Item
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Player
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Out
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Due
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Returned
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">
                    Amount
                  </th>
                  <th scope="col" className="py-2 pl-3 text-right font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visible.map((r) => {
                  const item = items.find((i) => i.id === r.itemId);
                  const overdue = isOverdue(r);
                  return (
                    <tr key={r.id}>
                      <td className="py-3 pr-3">
                        <span className="flex items-center gap-2">
                          <Icon
                            name={item?.icon ?? 'package'}
                            className="h-4 w-4 text-muted-foreground"
                            aria-hidden
                          />
                          <span className="font-medium">
                            {r.qty}× {item?.name}
                          </span>
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="block font-medium">{r.playerName}</span>
                        <span className="block text-xs text-muted-foreground">Court {r.court}</span>
                      </td>
                      <td className="px-3 py-3 tabular text-muted-foreground">
                        {formatClock(r.since)}
                      </td>
                      <td
                        className={`px-3 py-3 tabular ${overdue ? 'font-semibold text-destructive' : 'text-muted-foreground'}`}
                      >
                        {formatClock(r.due)}
                      </td>
                      <td className="px-3 py-3 tabular">
                        {r.returnedAt ? (
                          formatClock(r.returnedAt)
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        {r.returnedAt ? (
                          <Badge tone={r.condition === 'Damaged' ? 'warning' : 'success'}>
                            {r.condition === 'Damaged' ? 'Returned \xB7 damaged' : 'Returned'}
                          </Badge>
                        ) : (
                          <Badge tone={overdue ? 'destructive' : 'primary'}>
                            {overdue ? 'Overdue' : 'Out'}
                          </Badge>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold tabular">
                        {peso((item?.rate ?? 0) * r.qty)}
                      </td>
                      <td className="py-3 pl-3">
                        {!r.returnedAt && (
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => onReturn(r, 'Good')}
                              className="pressable inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground"
                            >
                              <Icon name="undo-2" className="h-3.5 w-3.5" aria-hidden />
                              Returned
                            </button>
                            <button
                              type="button"
                              onClick={() => onReturn(r, 'Damaged')}
                              className="pressable grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                              aria-label={`Returned damaged: ${item?.name} from ${r.playerName}`}
                              title="Returned damaged"
                            >
                              <Icon name="wrench" className="h-4 w-4" aria-hidden />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
function toMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}
export { RentalLog };
