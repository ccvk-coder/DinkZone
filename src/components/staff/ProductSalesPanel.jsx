import { useMemo } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '../Card';
import { Badge } from '../Badge';
import { products } from '../../data/products';
import { peso } from '../../utils/format';
import { formatClock } from '../../utils/clock';
function ProductSalesPanel({ sales }) {
  const top = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const s of sales) {
      const p = products.find((x) => x.id === s.productId);
      if (!p) continue;
      const prev = map.get(s.productId) ?? { qty: 0, revenue: 0 };
      map.set(s.productId, { qty: prev.qty + s.qty, revenue: prev.revenue + p.price * s.qty });
    }
    return [...map.entries()]
      .map(([id, v]) => ({ product: products.find((p) => p.id === id), ...v }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 4);
  }, [sales]);
  const units = sales.reduce((s, x) => s + x.qty, 0);
  const revenue = sales.reduce(
    (s, x) => s + (products.find((p) => p.id === x.productId)?.price ?? 0) * x.qty,
    0
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>Pro shop sales</CardTitle>
            <CardDescription>
              {units} items sold today · {peso(revenue)}
            </CardDescription>
          </div>
          <Badge tone="neutral">{sales.length} orders</Badge>
        </div>
      </CardHeader>
      <CardBody className="space-y-6 pt-0">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Top sellers
          </p>
          <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {top.map(({ product, qty, revenue: r }) => (
              <li
                key={product.id}
                className="flex items-center gap-3 rounded-md border border-border p-2.5"
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-md bg-muted object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{product.name}</span>
                  <span className="block text-xs text-muted-foreground tabular">
                    {qty} sold · {peso(r)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Recent sales
          </p>
          <ul className="mt-2 divide-y divide-border">
            {sales.slice(0, 6).map((s) => {
              const p = products.find((x) => x.id === s.productId);
              if (!p) return null;
              return (
                <li key={s.id} className="flex items-center gap-3 py-2.5 text-sm">
                  <span className="w-16 shrink-0 text-xs text-muted-foreground tabular">
                    {formatClock(s.time)}
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    {s.qty}× <span className="font-medium">{p.name}</span>
                  </span>
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    {s.payment}
                  </span>
                  <span className="w-20 text-right font-semibold tabular">
                    {peso(p.price * s.qty)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}
export { ProductSalesPanel };
