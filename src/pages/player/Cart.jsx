import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { TextInput } from '../../components/TextInput';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { QuantityStepper } from '../../components/ui/QuantityStepper';
import { PaymentOptions } from '../../components/booking/PaymentOptions';
import { SuccessMark } from '../../components/booking/SuccessMark';
import { useShop } from '../../contexts/ShopContext';
import { products } from '../../data/products';
import { venues } from '../../data/venues';
import { peso, shortId } from '../../utils/format';
import { cn } from '../../utils/classNames';
const pickupVenues = venues.filter((v) => v.amenities.includes('proShop'));
const DELIVERY_FEE = 120;
function Cart() {
  const navigate = useNavigate();
  const { cart, cartTotal, updateQty, clearCart, placeOrder } = useShop();
  const [fulfillment, setFulfillment] = useState('pickup');
  const [pickupVenueId, setPickupVenueId] = useState(pickupVenues[0].id);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState();
  const [payment, setPayment] = useState('gcash');
  const [placing, setPlacing] = useState(false);
  const [placedId, setPlacedId] = useState(null);
  const fee = fulfillment === 'delivery' ? DELIVERY_FEE : 0;
  const total = cartTotal + fee;
  if (placedId) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <SuccessMark size={84} />
        <h1 className="mt-6 text-3xl font-extrabold">Order placed</h1>
        <p className="mt-2 text-muted-foreground">
          {placedId} ·{' '}
          {fulfillment === 'pickup'
            ? `We\u2019ll text you when it\u2019s ready at ${venues.find((v) => v.id === pickupVenueId)?.name}.`
            : 'Arriving today via Lalamove.'}
        </p>
        <div className="mt-8 flex w-full flex-col gap-3">
          <Button size="lg" className="pressable min-h-[52px]" onClick={() => navigate('/orders')}>
            Track order
          </Button>
          <Button variant="ghost" onClick={() => navigate('/shop')}>
            Keep shopping
          </Button>
        </div>
      </div>
    );
  }
  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <PageHeader title="Cart" back="/shop" />
        <EmptyState
          icon={<Icon name="shopping-cart" className="h-8 w-8" />}
          title="Your cart is empty"
          description="Grab balls or a paddle and pick them up at your next game."
          action={<Button onClick={() => navigate('/shop')}>Browse the shop</Button>}
        />
      </div>
    );
  }
  const place = () => {
    if (fulfillment === 'delivery' && address.trim().length < 8) {
      setAddressError('Enter a full Cebu City address');
      return;
    }
    setPlacing(true);
    window.setTimeout(() => {
      const id = shortId('ORD');
      placeOrder({
        id,
        items: cart,
        total,
        fulfillment,
        pickupVenueId: fulfillment === 'pickup' ? pickupVenueId : void 0,
        address: fulfillment === 'delivery' ? address : void 0,
        status: 'Placed',
        createdAt: /* @__PURE__ */ new Date().toISOString()
      });
      clearCart();
      setPlacing(false);
      setPlacedId(id);
    }, 1100);
  };
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-32 md:px-8 lg:pb-12">
      <PageHeader title="Cart & checkout" back="/shop" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-8">
          <section aria-labelledby="items-heading">
            <h2 id="items-heading" className="sr-only">
              Items
            </h2>
            <ul className="divide-y divide-border rounded-lg border border-border bg-card">
              {cart.map((item) => {
                const p = products.find((x) => x.id === item.productId);
                if (!p) return null;
                return (
                  <li key={item.productId + item.size} className="flex gap-3 p-3 sm:p-4">
                    <img
                      src={p.image}
                      alt=""
                      className="h-20 w-20 shrink-0 rounded-md bg-[#EFEDE4] object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/shop/${p.id}`}
                        className="line-clamp-2 text-sm font-semibold hover:underline"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {p.brand} · {item.size}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                        <QuantityStepper
                          label={`${p.name} quantity`}
                          value={item.qty}
                          max={p.stock[item.size] ?? 1}
                          onChange={(q) => updateQty(p.id, item.size, q)}
                        />
                        <span className="font-display text-lg font-extrabold tabular">
                          {peso(p.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
          <section aria-labelledby="fulfillment-heading">
            <h2 id="fulfillment-heading" className="text-xl font-bold">
              How do you want it?
            </h2>
            <div
              className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2"
              role="radiogroup"
              aria-label="Fulfillment"
            >
              {[
                ['pickup', 'Pick up at court', 'Free \xB7 ready in 2 hours', 'store'],
                [
                  'delivery',
                  'Deliver to me',
                  `${peso(DELIVERY_FEE)} \xB7 same day in Cebu City`,
                  'truck'
                ]
              ].map(([v, label, detail, icon]) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={fulfillment === v}
                  onClick={() => {
                    setFulfillment(v);
                    if (v === 'delivery' && payment === 'venue') setPayment('gcash');
                  }}
                  className={cn(
                    'pressable flex min-h-[64px] items-center gap-3 rounded-lg border bg-card px-4 text-left',
                    fulfillment === v
                      ? 'border-brand ring-1 ring-brand dark:border-highlight dark:ring-highlight'
                      : 'border-border hover:border-foreground/30'
                  )}
                >
                  <Icon
                    name={icon}
                    className="h-5 w-5 text-court dark:text-highlight"
                    aria-hidden
                  />
                  <span>
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className="block text-xs text-muted-foreground">{detail}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4">
              {fulfillment === 'pickup' ? (
                <Select
                  label="Pickup venue"
                  value={pickupVenueId}
                  onChange={(e) => setPickupVenueId(e.target.value)}
                  options={pickupVenues.map((v) => ({
                    label: `${v.name} \u2014 ${v.neighborhood}`,
                    value: v.id
                  }))}
                />
              ) : (
                <TextInput
                  label="Delivery address"
                  placeholder="Unit, building, street, barangay"
                  value={address}
                  error={addressError}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressError(void 0);
                  }}
                />
              )}
            </div>
          </section>
          <section aria-labelledby="pay-heading">
            <h2 id="pay-heading" className="text-xl font-bold">
              Payment
            </h2>
            <div className="mt-3">
              <PaymentOptions
                name="shop-payment"
                value={payment}
                onChange={setPayment}
                methods={
                  fulfillment === 'pickup'
                    ? ['gcash', 'maya', 'card', 'venue']
                    : ['gcash', 'maya', 'card']
                }
              />
            </div>
          </section>
        </div>
        <aside>
          <div className="rounded-lg border border-border bg-card p-5 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="tabular">{peso(cartTotal)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>{fulfillment === 'pickup' ? 'Pickup' : 'Delivery'}</dt>
                <dd className="tabular">{fee ? peso(fee) : 'Free'}</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
              <span className="font-semibold">Total</span>
              <span className="font-display text-3xl font-extrabold tabular">{peso(total)}</span>
            </div>
            <Button
              size="lg"
              className="pressable mt-5 hidden min-h-[52px] w-full lg:block"
              disabled={placing}
              onClick={place}
            >
              {placing
                ? 'Placing order\u2026'
                : payment === 'venue'
                  ? 'Reserve & pay at pickup'
                  : `Pay ${peso(total)}`}
            </Button>
          </div>
        </aside>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:left-20 lg:hidden">
        <Button
          size="lg"
          className="pressable min-h-[52px] w-full"
          disabled={placing}
          onClick={place}
        >
          {placing
            ? 'Placing order\u2026'
            : payment === 'venue'
              ? `Reserve \xB7 ${peso(total)}`
              : `Pay ${peso(total)}`}
        </Button>
      </div>
    </div>
  );
}
export { Cart };
