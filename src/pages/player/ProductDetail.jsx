import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { IconButton } from '../../components/ui/IconButton';
import { Rating } from '../../components/ui/Rating';
import { QuantityStepper } from '../../components/ui/QuantityStepper';
import { ProductCard } from '../../components/shop/ProductCard';
import { products } from '../../data/products';
import { useShop } from '../../contexts/ShopContext';
import { peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
const views = ['center', 'left', 'right', 'top'];
function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, cartCount } = useShop();
  const product = products.find((p) => p.id === productId);
  const firstInStock = product?.sizes?.find((s) => (product.stock[s] ?? 0) > 0) ?? null;
  const [size, setSize] = useState(firstInStock);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState('center');
  const [adding, setAdding] = useState(false);
  useEffect(() => {
    setSize(firstInStock);
    setQty(1);
    setView('center');
    window.scrollTo({ top: 0 });
  }, [productId]);
  if (!product) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          title="Product not found"
          action={<Button onClick={() => navigate('/shop')}>Back to shop</Button>}
        />
      </div>
    );
  }
  const stock = size ? (product.stock[size] ?? 0) : 0;
  const soldOut = Object.values(product.stock).every((n) => n === 0);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const add = () => {
    if (!size) return;
    setAdding(true);
    window.setTimeout(() => {
      addToCart({ productId: product.id, size, qty });
      setAdding(false);
      toast({
        title: 'Added to cart',
        description: `${product.name} \xB7 ${size} \xD7 ${qty}`,
        tone: 'success'
      });
    }, 350);
  };
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-32 md:px-8 md:pb-12">
      <PageHeader
        title=""
        back
        actions={
          <IconButton
            icon="shopping-cart"
            label="Cart"
            badge={cartCount}
            onClick={() => navigate('/cart')}
            tone="solid"
          />
        }
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg bg-[#EFEDE4]">
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                'h-full w-full object-cover transition-transform duration-300 ease-snap',
                view === 'left' && 'origin-left scale-125',
                view === 'right' && 'origin-right scale-125',
                view === 'top' && 'origin-top scale-150'
              )}
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2" role="group" aria-label="Product images">
            {views.map((v, i) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-label={`Image ${i + 1}`}
                aria-pressed={view === v}
                className={cn(
                  'pressable aspect-square overflow-hidden rounded-md border-2 bg-[#EFEDE4]',
                  view === v ? 'border-brand dark:border-highlight' : 'border-transparent'
                )}
              >
                <img
                  src={product.image}
                  alt=""
                  className={cn(
                    'h-full w-full object-cover',
                    v === 'left' && 'origin-left scale-125',
                    v === 'right' && 'origin-right scale-125',
                    v === 'top' && 'origin-top scale-150'
                  )}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {product.brand} · {product.category}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight md:text-4xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviewCount} size="md" />
            <span className="text-sm text-muted-foreground">
              For {product.skill.join(', ').toLowerCase()} players
            </span>
          </div>
          <p className="mt-5 leading-none">
            <span className="font-display text-4xl font-extrabold tabular">
              {peso(product.price)}
            </span>
            {product.compareAt && (
              <span className="ml-2 text-lg text-muted-foreground line-through tabular">
                {peso(product.compareAt)}
              </span>
            )}
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>
          {product.sizes && product.sizes.length > 1 && (
            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-semibold">
                {product.category === 'Paddles'
                  ? 'Grip size'
                  : product.category === 'Balls'
                    ? 'Pack'
                    : 'Size'}
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const out = (product.stock[s] ?? 0) === 0;
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={out}
                      aria-pressed={size === s}
                      onClick={() => {
                        setSize(s);
                        setQty(1);
                      }}
                      className={cn(
                        'pressable min-h-[44px] min-w-[64px] rounded-md border px-3 text-sm font-medium',
                        size === s
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card hover:border-foreground/30',
                        out && 'cursor-not-allowed text-muted-foreground line-through opacity-60'
                      )}
                    >
                      {s}
                      <span className="sr-only">{out ? ', sold out' : ''}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}
          <p
            className={cn(
              'mt-4 inline-flex items-center gap-1.5 text-sm font-medium',
              soldOut ? 'text-destructive' : stock <= 3 ? 'text-warning' : 'text-success'
            )}
          >
            <Icon
              name={soldOut ? 'circle-x' : stock <= 3 ? 'triangle-alert' : 'circle-check'}
              className="h-4 w-4"
              aria-hidden
            />
            {soldOut
              ? 'Sold out \u2014 back in stock soon'
              : stock <= 3
                ? `Only ${stock} left in this size`
                : 'In stock \xB7 ready for pickup today'}
          </p>
          <div className="mt-6 hidden items-center gap-3 md:flex">
            <QuantityStepper
              label="Quantity"
              value={qty}
              min={1}
              max={Math.max(1, stock)}
              onChange={setQty}
            />
            <Button
              size="lg"
              className="pressable min-h-[52px] flex-1"
              disabled={soldOut || !size || adding}
              onClick={add}
            >
              {adding ? 'Adding\u2026' : soldOut ? 'Sold out' : 'Add to cart'}
            </Button>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
            <li className="flex items-center gap-2 rounded-md bg-surface p-3">
              <Icon name="store" className="h-4 w-4 text-court dark:text-highlight" aria-hidden />
              Free pickup at 5 courts
            </li>
            <li className="flex items-center gap-2 rounded-md bg-surface p-3">
              <Icon name="truck" className="h-4 w-4 text-court dark:text-highlight" aria-hidden />
              Same-day Cebu delivery
            </li>
          </ul>
          <section className="mt-8" aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="text-lg font-bold">
              Specs
            </h2>
            <dl className="mt-2 divide-y divide-border rounded-lg border border-border">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="text-right font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="mt-8" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="text-lg font-bold">
              Reviews
            </h2>
            {product.reviews.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No reviews yet. Buy it, play it, tell Cebu what you think.
              </p>
            ) : (
              <ul className="mt-3 space-y-4">
                {product.reviews.map((r) => (
                  <li key={r.author + r.date} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{r.author}</p>
                      <Rating value={r.rating} />
                    </div>
                    <p className="mt-1.5 text-sm">{r.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-bold">
            More {product.category.toLowerCase()}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
      <div className="fixed inset-x-0 bottom-[calc(60px+env(safe-area-inset-bottom))] z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <QuantityStepper
            label="Quantity"
            value={qty}
            min={1}
            max={Math.max(1, stock)}
            onChange={setQty}
          />
          <Button
            size="lg"
            className="pressable min-h-[52px] flex-1"
            disabled={soldOut || !size || adding}
            onClick={add}
          >
            {adding
              ? 'Adding\u2026'
              : soldOut
                ? 'Sold out'
                : `Add \xB7 ${peso(product.price * qty)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
export { ProductDetail };
