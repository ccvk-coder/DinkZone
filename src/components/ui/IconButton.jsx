import { Icon } from './Icon';
import { cn } from '../../utils/classNames';
function IconButton({ icon, label, tone = 'default', badge, className, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'pressable relative grid h-11 w-11 shrink-0 place-items-center rounded-full disabled:opacity-50',
        tone === 'default' && 'text-foreground hover:bg-muted',
        tone === 'overlay' && 'bg-black/45 text-white backdrop-blur hover:bg-black/60',
        tone === 'solid' && 'border border-border bg-card text-foreground shadow-sm hover:bg-muted',
        className
      )}
      {...props}
    >
      <Icon name={icon} className="h-5 w-5" aria-hidden />
      {typeof badge === 'number' && badge > 0 && (
        <span className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-highlight px-1 text-[11px] font-bold text-highlight-foreground">
          {badge}
        </span>
      )}
    </button>
  );
}
export { IconButton };
