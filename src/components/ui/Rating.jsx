import { Icon } from './Icon';
function Rating({ value, count, size = 'sm' }) {
  return (
    <span className={`inline-flex items-center gap-1 ${size === 'md' ? 'text-sm' : 'text-xs'}`}>
      <Icon name="star" className="h-3.5 w-3.5 fill-current text-warning" aria-hidden />
      <span className="font-semibold tabular">{value.toFixed(1)}</span>
      {typeof count === 'number' && <span className="text-muted-foreground">({count})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>
  );
}
export { Rating };
