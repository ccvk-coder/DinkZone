import { compactPeso } from '../../utils/format';
import { cn } from '../../utils/classNames';
function PerformanceTable({ rows, firstColumn }) {
  const best = Math.max(...rows.map((r) => r.occupancy), 0);
  const isTop = (r) => r.occupancy === best && rows.length > 1;
  return (
    <>
      {/* Mobile: stacked rows */}
      <ul className="divide-y divide-border md:hidden" aria-label={`${firstColumn} performance`}>
        {rows.map((r) => {
          const rate = Math.round(r.occupancy * 100);
          return (
            <li key={r.id} className="py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 truncate text-sm font-semibold">
                    <span className="truncate">{r.label}</span>
                    {isTop(r) && <TopBadge />}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{r.detail}</p>
                </div>
                <p className="shrink-0 text-sm font-bold tabular">{compactPeso(r.revenue)}</p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <OccupancyBar rate={rate} className="flex-1" />
                <span className="w-9 text-right text-xs font-semibold tabular">{rate}%</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground tabular">
                {r.bookings.toLocaleString()} bookings · {r.hours.toLocaleString()} court-hrs
              </p>
            </li>
          );
        })}
      </ul>
      {/* Tablet & desktop: full table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="py-2 pr-3 font-semibold">
                {firstColumn}
              </th>
              <th scope="col" className="px-3 py-2 text-right font-semibold">
                Bookings
              </th>
              <th scope="col" className="px-3 py-2 text-right font-semibold">
                Court-hrs
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Occupancy
              </th>
              <th scope="col" className="py-2 pl-3 text-right font-semibold">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => {
              const rate = Math.round(r.occupancy * 100);
              return (
                <tr key={r.id}>
                  <td className="py-3 pr-3">
                    <p className="font-semibold">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.detail}</p>
                  </td>
                  <td className="px-3 py-3 text-right tabular">{r.bookings.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right tabular">{r.hours.toLocaleString()}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <OccupancyBar rate={rate} className="w-24" />
                      <span className="w-9 text-right font-semibold tabular">{rate}%</span>
                      {isTop(r) && <TopBadge />}
                    </div>
                  </td>
                  <td className="py-3 pl-3 text-right font-semibold tabular">
                    {compactPeso(r.revenue)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
function OccupancyBar({ rate, className }) {
  return (
    <div className={cn('h-2 rounded-full bg-muted', className)} aria-hidden>
      <div
        className={cn(
          'h-full rounded-full',
          rate >= 75 ? 'bg-court' : rate >= 50 ? 'bg-court opacity-70' : 'bg-warning'
        )}
        style={{ width: `${rate}%` }}
      />
    </div>
  );
}
function TopBadge() {
  return (
    <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
      Top
    </span>
  );
}
export { PerformanceTable };
