import { Icon } from './Icon';
import { cn } from '../../utils/classNames';
function Chip({ selected = false, icon, count, children, className, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'pressable inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-sm font-medium md:min-h-[38px]',
        selected
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-foreground hover:border-foreground/30 hover:bg-muted',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {icon && <Icon name={icon} className="h-4 w-4" aria-hidden />}
      {children}
      {typeof count === 'number' && count > 0 && (
        <span
          className={cn(
            'ml-0.5 grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-xs',
            selected ? 'bg-primary-foreground/20' : 'bg-muted'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
export { Chip };
