import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { IconButton } from '../../components/ui/IconButton';
import { Chip } from '../../components/ui/Chip';
import { Sheet } from '../../components/ui/Sheet';
import { Skeleton } from '../../components/ui/Skeleton';
import { ProductCard } from '../../components/shop/ProductCard';
import { products, productCategories } from '../../data/products';
import { useShop } from '../../contexts/ShopContext';
const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
const priceBands = [
  { label: 'Any price', max: 0 },
  { label: 'Under \u20B11,000', max: 1e3 },
  { label: 'Under \u20B15,000', max: 5e3 },
  { label: 'Under \u20B110,000', max: 1e4 }
];
function ShopHome() {
  const navigate = useNavigate();
  const { cartCount } = useShop();
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');
  const [selBrands, setSelBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [skill, setSkill] = useState('any');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, []);
  const filterCount = selBrands.length + (maxPrice ? 1 : 0) + (skill !== 'any' ? 1 : 0);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products
      .filter((p) => category === 'All' || p.category === category)
      .filter((p) => (q ? `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q) : true))
      .filter((p) => (selBrands.length ? selBrands.includes(p.brand) : true))
      .filter((p) => (maxPrice ? p.price <= maxPrice : true))
      .filter((p) => (skill === 'any' ? true : p.skill.includes(skill)));
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (sort === 'popular') sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    return sorted;
  }, [category, query, sort, selBrands, maxPrice, skill]);
  const reset = () => {
    setSelBrands([]);
    setMaxPrice(0);
    setSkill('any');
    setQuery('');
    setCategory('All');
  };
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
      <PageHeader
        title="Pro shop"
        subtitle="Pre-order and pick up at your court, or get it delivered in Cebu."
        actions={
          <>
            <IconButton icon="package" label="My orders" onClick={() => navigate('/orders')} />
            <IconButton
              icon="shopping-cart"
              label="Cart"
              badge={cartCount}
              onClick={() => navigate('/cart')}
              tone="solid"
            />
          </>
        }
      />
      <button
        type="button"
        onClick={() => navigate('/rentals')}
        className="pressable mb-4 flex w-full items-center gap-4 rounded-lg border border-border bg-card p-4 text-left hover:border-foreground/30"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-highlight text-highlight-foreground">
          <Icon name="hand" className="h-6 w-6" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">Rent gear for your next game</span>
          <span className="block text-sm text-muted-foreground">
            Paddles from ₱150, ball sets, shoes and more — ready at the front desk.
          </span>
        </span>
        <span className="hidden items-center gap-1 text-sm font-semibold text-court dark:text-highlight sm:inline-flex">
          Rent now <Icon name="arrow-right" className="h-4 w-4" aria-hidden />
        </span>
        <Icon
          name="chevron-right"
          className="h-5 w-5 text-muted-foreground sm:hidden"
          aria-hidden
        />
      </button>
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <label htmlFor="shop-search" className="sr-only">
            Search products
          </label>
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search paddles, shoes, brands…"
            className="h-12 w-full rounded-full border border-border bg-card pl-10 pr-4 text-[15px] placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          />
        </div>
        <div className="flex items-end gap-2">
          <div className="w-44">
            <Select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              options={[
                { label: 'Most popular', value: 'popular' },
                { label: 'Top rated', value: 'rating' },
                { label: 'Price: low to high', value: 'price-asc' },
                { label: 'Price: high to low', value: 'price-desc' }
              ]}
            />
          </div>
          <Chip
            icon="sliders-horizontal"
            count={filterCount}
            selected={filterCount > 0}
            onClick={() => setFiltersOpen(true)}
          >
            Filters
          </Chip>
        </div>
      </div>
      <div
        className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0"
        role="tablist"
        aria-label="Categories"
      >
        {productCategories.map((c) => (
          <Chip
            key={c}
            role="tab"
            aria-selected={category === c}
            selected={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </Chip>
        ))}
      </div>
      <p className="mb-4 mt-5 text-xs font-medium text-muted-foreground" aria-live="polite">
        {loading
          ? 'Loading products\u2026'
          : `${results.length} product${results.length === 1 ? '' : 's'}`}
      </p>
      {loading ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="mt-3 h-3 w-1/3" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <EmptyState
          icon={<Icon name="search-x" className="h-8 w-8" />}
          title="Nothing matches yet"
          description="Try another brand or price range."
          action={
            <Button variant="secondary" onClick={reset}>
              Reset filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 pb-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {results.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.22,
                ease: [0.23, 1, 0.32, 1],
                delay: Math.min(i, 10) * 0.03
              }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      )}
      <Sheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filter products"
        footer={
          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="min-h-[48px]"
              onClick={() => {
                setSelBrands([]);
                setMaxPrice(0);
                setSkill('any');
              }}
            >
              Reset
            </Button>
            <Button className="pressable min-h-[48px] flex-1" onClick={() => setFiltersOpen(false)}>
              Show {results.length} products
            </Button>
          </div>
        }
      >
        <fieldset className="border-b border-border py-5">
          <legend className="mb-3 text-sm font-semibold">Brand</legend>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <Chip
                key={b}
                selected={selBrands.includes(b)}
                onClick={() =>
                  setSelBrands((s) => (s.includes(b) ? s.filter((x) => x !== b) : [...s, b]))
                }
              >
                {b}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset className="border-b border-border py-5">
          <legend className="mb-3 text-sm font-semibold">Price</legend>
          <div className="flex flex-wrap gap-2">
            {priceBands.map((b) => (
              <Chip key={b.label} selected={maxPrice === b.max} onClick={() => setMaxPrice(b.max)}>
                {b.label}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset className="py-5">
          <legend className="mb-3 text-sm font-semibold">Skill level</legend>
          <div className="flex flex-wrap gap-2">
            {['any', 'Beginner', 'Intermediate', 'Advanced'].map((s) => (
              <Chip key={s} selected={skill === s} onClick={() => setSkill(s)}>
                {s === 'any' ? 'All levels' : s}
              </Chip>
            ))}
          </div>
        </fieldset>
      </Sheet>
    </div>
  );
}
export { ShopHome };
