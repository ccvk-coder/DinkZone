import { Icon } from './Icon';
function QuantityStepper({ value, onChange, min = 0, max = 99, label }) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-card"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className="pressable grid h-11 w-11 place-items-center rounded-full hover:bg-muted disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
      >
        <Icon name="minus" className="h-4 w-4" />
      </button>
      <span className="w-6 text-center text-sm font-semibold tabular" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="pressable grid h-11 w-11 place-items-center rounded-full hover:bg-muted disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        <Icon name="plus" className="h-4 w-4" />
      </button>
    </div>
  );
}
export { QuantityStepper };
