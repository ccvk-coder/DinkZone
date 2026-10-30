import { Link } from 'react-router-dom';
import { Rating } from '../ui/Rating';
import { peso } from '../../utils/format';
function stockLevel(p) {
  const total = Object.values(p.stock).reduce((a, b) => a + b, 0);
  if (total === 0) return 'out';
  return total <= 6 ? 'low' : 'ok';
}
function ProductCard({ product }) {
  const level = stockLevel(product);
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#EFEDE4]">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 ease-snap group-hover:scale-[1.04]"
        />
        {level !== 'ok' && (
          <span
            className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${level === 'out' ? 'bg-ink text-background' : 'bg-card text-warning'}`}
          >
            {level === 'out' ? 'Sold out' : 'Low stock'}
          </span>
        )}
        {product.compareAt && (
          <span className="absolute right-2 top-2 rounded-full bg-highlight px-2 py-0.5 text-[11px] font-bold text-highlight-foreground">
            Sale
          </span>
        )}
      </div>
      <div className="mt-2.5 flex flex-1 flex-col">
        <p className="text-xs font-medium text-muted-foreground">{product.brand}</p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">
          <Link
            to={`/shop/${product.id}`}
            className="after:absolute after:inset-0 focus:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <p className="leading-none">
            <span className="font-display text-lg font-extrabold tabular">
              {peso(product.price)}
            </span>
            {product.compareAt && (
              <span className="ml-1.5 text-xs text-muted-foreground line-through tabular">
                {peso(product.compareAt)}
              </span>
            )}
          </p>
          <Rating value={product.rating} />
        </div>
      </div>
    </article>
  );
}
export { ProductCard, stockLevel };
