import { Icon } from '../ui/Icon';
import { cn } from '../../utils/classNames';
const paymentMeta = {
  gcash: { label: 'GCash', detail: 'Pay with your GCash wallet', icon: 'wallet' },
  maya: { label: 'Maya', detail: 'Pay with your Maya wallet', icon: 'wallet-cards' },
  card: { label: 'Credit / debit card', detail: 'Visa, Mastercard, JCB', icon: 'credit-card' },
  venue: { label: 'Pay at venue', detail: 'Cash or card at the front desk', icon: 'store' }
};
function PaymentOptions({ value, onChange, methods = ['gcash', 'maya', 'card', 'venue'], name }) {
  return (
    <fieldset>
      <legend className="sr-only">Payment method</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {methods.map((m) => {
          const meta = paymentMeta[m];
          const checked = value === m;
          return (
            <label
              key={m}
              className={cn(
                'pressable flex min-h-[64px] cursor-pointer items-center gap-3 rounded-lg border bg-card px-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--ring)]',
                checked
                  ? 'border-brand ring-1 ring-brand dark:border-highlight dark:ring-highlight'
                  : 'border-border hover:border-foreground/30'
              )}
            >
              <input
                type="radio"
                name={name}
                value={m}
                checked={checked}
                onChange={() => onChange(m)}
                className="sr-only"
              />
              <span
                className={cn(
                  'grid h-10 w-10 place-items-center rounded-full',
                  checked ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                )}
              >
                <Icon name={meta.icon} className="h-5 w-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold">{meta.label}</span>
                <span className="block text-xs text-muted-foreground">{meta.detail}</span>
              </span>
              <span
                className={cn(
                  'grid h-5 w-5 place-items-center rounded-full border-2',
                  checked
                    ? 'border-brand bg-brand dark:border-highlight dark:bg-highlight'
                    : 'border-border'
                )}
                aria-hidden
              >
                {checked && <span className="h-2 w-2 rounded-full bg-white dark:bg-brand" />}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
export { PaymentOptions, paymentMeta };
