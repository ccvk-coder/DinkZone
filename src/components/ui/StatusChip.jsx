import { Icon } from './Icon';
import { Badge } from '../Badge';
const config = {
  Confirmed: { tone: 'primary', icon: 'calendar-check' },
  'Checked-in': { tone: 'success', icon: 'badge-check' },
  Completed: { tone: 'neutral', icon: 'check' },
  Cancelled: { tone: 'destructive', icon: 'circle-x' },
  'No-show': { tone: 'warning', icon: 'user-x' }
};
function StatusChip({ status }) {
  const c = config[status];
  return (
    <Badge tone={c.tone} className="inline-flex items-center gap-1 whitespace-nowrap">
      <Icon name={c.icon} className="h-3.5 w-3.5" aria-hidden />
      {status}
    </Badge>
  );
}
export { StatusChip };
