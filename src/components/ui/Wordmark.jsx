import { cn } from '../../utils/classNames';
function Wordmark({ className, compact = false, inverted = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-display font-extrabold tracking-tight',
        className
      )}
    >
      <span
        className="relative grid h-8 w-8 place-items-center rounded-[10px] bg-brand"
        aria-hidden
      >
        <span className="h-3.5 w-3.5 rounded-full bg-highlight ring-2 ring-brand" />
        <span className="absolute inset-x-1.5 top-1/2 h-px -translate-y-1/2 bg-white/25" />
      </span>
      {!compact && (
        <span className={cn('text-xl leading-none', inverted ? 'text-white' : 'text-foreground')}>
          Dink
          <span className={inverted ? 'text-highlight' : 'text-court dark:text-highlight'}>
            Zone
          </span>
        </span>
      )}
    </span>
  );
}
export { Wordmark };
