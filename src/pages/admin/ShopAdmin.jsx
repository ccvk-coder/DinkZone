import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Tabs, TabList, Tab, TabPanel } from '../../components/Tabs';
import { Table } from '../../components/Table';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { products as seed } from '../../data/products';
import { venues } from '../../data/venues';
import { useShop } from '../../contexts/ShopContext';
import { peso } from '../../utils/format';
const flow = ['Placed', 'Packed', 'Ready for pickup', 'Completed'];
function ShopAdmin() {
  const { toast } = useToast();
  const { orders } = useShop();
  const [tab, setTab] = useState('inventory');
  const [items, setItems] = useState(seed);
  const [orderStatus, setOrderStatus] = useState({});
  const total = (p) => Object.values(p.stock).reduce((a, b) => a + b, 0);
  const low = items.filter((p) => total(p) <= 6);
  const restock = (id) => {
    setItems((list) =>
      list.map((p) =>
        p.id === id
          ? {
              ...p,
              stock: Object.fromEntries(Object.entries(p.stock).map(([k, v]) => [k, v + 10]))
            }
          : p
      )
    );
    toast({ title: 'Restock ordered', description: '+10 per variant', tone: 'success' });
  };
  return (
    <div>
      <PageHeader
        title="Shop & inventory"
        subtitle={`${items.length} products \xB7 ${low.length} need restocking`}
      />
      <Tabs value={tab} onChange={setTab}>
        <TabList>
          <Tab value="inventory">Inventory</Tab>
          <Tab value="orders">Orders ({orders.length})</Tab>
        </TabList>
        <TabPanel value="inventory">
          {low.length > 0 && (
            <p className="mt-4 flex items-center gap-2 rounded-md border border-warning/30 bg-warning/10 px-3 py-2.5 text-sm text-warning">
              <Icon name="triangle-alert" className="h-4 w-4" aria-hidden />
              {low.length} products are low or out of stock.
            </p>
          )}
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <Table
              className="w-max min-w-full"
              data={items}
              rowKey={(p) => p.id}
              columns={[
                {
                  key: 'product',
                  header: 'Product',
                  sortValue: (p) => p.name,
                  render: (p) => (
                    <span className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt=""
                        className="h-10 w-10 rounded-md bg-[#EFEDE4] object-cover"
                      />
                      <span>
                        <span className="block font-medium">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">{p.brand}</span>
                      </span>
                    </span>
                  )
                },
                {
                  key: 'category',
                  header: 'Category',
                  sortValue: (p) => p.category,
                  render: (p) => p.category
                },
                {
                  key: 'price',
                  header: 'Price',
                  sortValue: (p) => p.price,
                  render: (p) => <span className="tabular">{peso(p.price)}</span>
                },
                {
                  key: 'variants',
                  header: 'Stock by variant',
                  render: (p) => (
                    <span className="flex max-w-[240px] flex-wrap gap-1">
                      {Object.entries(p.stock).map(([k, v]) => (
                        <span
                          key={k}
                          className={`whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] tabular ${v === 0 ? 'bg-destructive/10 text-destructive line-through' : 'bg-muted'}`}
                        >
                          {k}: {v}
                        </span>
                      ))}
                    </span>
                  )
                },
                {
                  key: 'stock',
                  header: 'Total',
                  sortValue: (p) => total(p),
                  render: (p) => (
                    <Badge
                      tone={total(p) === 0 ? 'destructive' : total(p) <= 6 ? 'warning' : 'success'}
                    >
                      {total(p) === 0 ? 'Out' : total(p)}
                    </Badge>
                  )
                },
                {
                  key: 'act',
                  header: '',
                  render: (p) => (
                    <Button size="sm" variant="ghost" onClick={() => restock(p.id)}>
                      Restock
                    </Button>
                  )
                }
              ]}
            />
          </div>
        </TabPanel>
        <TabPanel value="orders">
          <ul className="mt-4 space-y-2">
            {orders.map((o) => {
              const status = orderStatus[o.id] ?? o.status;
              const idx = flow.indexOf(status);
              const next = idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : null;
              return (
                <li
                  key={o.id}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-semibold">{o.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.items.reduce((n, i) => n + i.qty, 0)} items ·{' '}
                      {o.fulfillment === 'pickup'
                        ? `Pickup \xB7 ${venues.find((v) => v.id === o.pickupVenueId)?.name}`
                        : 'Delivery'}
                    </p>
                  </div>
                  <span className="font-semibold tabular">{peso(o.total)}</span>
                  <Badge
                    tone={
                      status === 'Completed'
                        ? 'neutral'
                        : status === 'Ready for pickup'
                          ? 'success'
                          : 'primary'
                    }
                  >
                    {status}
                  </Badge>
                  {next && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setOrderStatus((s) => ({ ...s, [o.id]: next }));
                        toast({ title: `${o.id} \u2192 ${next}`, tone: 'success' });
                      }}
                    >
                      Mark {next.toLowerCase()}
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </TabPanel>
      </Tabs>
    </div>
  );
}
export { ShopAdmin };
