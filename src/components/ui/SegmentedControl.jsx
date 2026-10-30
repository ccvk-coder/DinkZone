import { motion } from 'framer-motion';
import { Icon } from './Icon';
import { cn } from '../../utils/classNames';
function SegmentedControl({ value, onChange, options, label, className, layoutId }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('inline-flex rounded-full border border-border bg-card p-1', className)}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors duration-150',
              active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', damping: 30, stiffness: 420 }}
              />
            )}
            {opt.icon && <Icon name={opt.icon} className="relative h-4 w-4" aria-hidden />}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
export { SegmentedControl };
