import { Icon } from '../ui/Icon';
import { cn } from '../../utils/classNames';
const amenityMeta = {
  lights: { icon: 'lightbulb', label: 'Night lights' },
  parking: { icon: 'square-parking', label: 'Parking' },
  showers: { icon: 'shower-head', label: 'Showers' },
  proShop: { icon: 'shopping-bag', label: 'Pro shop' },
  aircon: { icon: 'snowflake', label: 'Air-conditioned' },
  cafe: { icon: 'coffee', label: 'Caf\xE9' }
};
function AmenityIcons({ amenities, max = 5, className, withLabels = false }) {
  const shown = amenities.slice(0, max);
  if (withLabels) {
    return (
      <ul className={cn('grid grid-cols-2 gap-2 sm:grid-cols-3', className)}>
        {amenities.map((a) => (
          <li key={a} className="flex items-center gap-2 rounded-md bg-surface px-3 py-2.5 text-sm">
            <Icon
              name={amenityMeta[a].icon}
              className="h-4 w-4 text-court dark:text-highlight"
              aria-hidden
            />
            {amenityMeta[a].label}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul
      className={cn('flex items-center gap-2 text-muted-foreground', className)}
      aria-label="Amenities"
    >
      {shown.map((a) => (
        <li key={a} title={amenityMeta[a].label}>
          <Icon name={amenityMeta[a].icon} className="h-4 w-4" aria-hidden />
          <span className="sr-only">{amenityMeta[a].label}</span>
        </li>
      ))}
      {amenities.length > max && <li className="text-xs">+{amenities.length - max}</li>}
    </ul>
  );
}
export { AmenityIcons, amenityMeta };
