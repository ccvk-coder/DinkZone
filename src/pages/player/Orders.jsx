import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { useShop } from '../../contexts/ShopContext';
import { products } from '../../data/products';
import { venues } from '../../data/venues';
import { peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
function stepsFor(o) {
  return o.fulfillment === 'pickup'
    ? ['Placed', 'Packed', 'Ready for pickup', 'Completed']
    : ['Placed', 'Packed', 'Out for delivery', 'Completed'];
}
function Orders() {
  const navigate = useNavigate();
  const { orders } = useShop();
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-10 md:px-8">
      <PageHeader title="Orders" subtitle="Track pickups and deliveries." back="/shop" />
      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          action={<Button onClick={() => navigate('/shop')}>Shop gear</Button>}
        />
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => {
            const steps = stepsFor(o);
            const current = steps.indexOf(o.status);
            const venue = venues.find((v) => v.id === o.pickupVenueId);
            return (
              <li key={o.id} className="rounded-lg border border-border bg-card p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-sm font-semibold">{o.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(o.createdAt), 'MMM d, yyyy \xB7 h:mm a')}
                    </p>
                  </div>
                  <span className="font-display text-xl font-extrabold tabular">
                    {peso(o.total)}
                  </span>
                </div>
                <div className="mt-3 flex -space-x-2">
                  {o.items.map((i) => {
                    const p = products.find((x) => x.id === i.productId);
                    return p ? (
                      <img
                        key={i.productId + i.size}
                        src={p.image}
                        alt={p.name}
                        className="h-11 w-11 rounded-md border-2 border-card bg-[#EFEDE4] object-cover"
                      />
                    ) : null;
                  })}
                </div>
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <Icon
                    name={o.fulfillment === 'pickup' ? 'store' : 'truck'}
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                  {o.fulfillment === 'pickup'
                    ? `Pickup at ${venue?.name}`
                    : `Delivery to ${o.address}`}
                </p>
                <ol className="mt-4 grid grid-cols-4 gap-1" aria-label="Order progress">
                  {steps.map((s, i) => (
                    <li
                      key={s}
                      className="flex flex-col gap-1.5"
                      aria-current={i === current ? 'step' : void 0}
                    >
                      <span
                        className={cn(
                          'h-1.5 rounded-full',
                          i <= current ? 'bg-court dark:bg-highlight' : 'bg-muted'
                        )}
                      />
                      <span
                        className={cn(
                          'text-[11px] leading-tight',
                          i === current ? 'font-semibold text-foreground' : 'text-muted-foreground'
                        )}
                      >
                        {i < current && (
                          <Icon name="check" className="mr-0.5 inline h-3 w-3" aria-hidden />
                        )}
                        {s}
                      </span>
                    </li>
                  ))}
                </ol>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export { Orders };
