import { Link, NavLink, Outlet } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { Wordmark } from '../ui/Wordmark';
import { venues } from '../../data/venues';
import { usePersistentState } from '../../hooks/usePersistentState';
import { useApp } from '../../contexts/AppContext';
import { cn } from '../../utils/classNames';
function StaffShell() {
  const [venueId, setVenueId] = usePersistentState('staff-venue', 'v-itpark');
  const { online } = useApp();
  return (
    <div className="flex min-h-full w-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:px-6">
          <Wordmark compact />
          <div className="min-w-0 flex-1 sm:flex-none">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]">
              Staff mode
            </p>
            <label htmlFor="staff-venue" className="sr-only">
              Venue
            </label>
            <select
              id="staff-venue"
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
              className="-ml-1 w-full max-w-full truncate rounded-md bg-transparent px-1 py-0.5 font-display text-[15px] font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] sm:w-auto sm:text-base"
            >
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <nav
            className="order-last grid w-full grid-cols-3 gap-1 rounded-full border border-border bg-background p-1 sm:order-none sm:ml-auto sm:flex sm:w-auto"
            aria-label="Staff"
          >
            {[
              {
                to: '/staff/overview',
                label: 'Overview',
                short: 'Overview',
                icon: 'layout-dashboard'
              },
              { to: '/staff/scan', label: 'Scanner', short: 'Scan', icon: 'scan-line' },
              {
                to: '/staff/schedule',
                label: "Today's schedule",
                short: 'Schedule',
                icon: 'calendar-clock'
              }
            ].map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    'pressable inline-flex min-h-[40px] min-w-0 items-center justify-center gap-1.5 rounded-full px-2 text-[13px] font-medium sm:gap-2 sm:px-4 sm:text-sm',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )
                }
              >
                <Icon name={n.icon} className="h-4 w-4 shrink-0" aria-hidden />
                <span className="truncate sm:hidden">{n.short}</span>
                <span className="hidden whitespace-nowrap sm:inline">{n.label}</span>
              </NavLink>
            ))}
          </nav>
          <span
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:px-3',
              online ? 'bg-accent text-accent-foreground' : 'bg-warning/15 text-warning'
            )}
            role="status"
            aria-label={online ? 'Online' : 'Offline, queueing'}
          >
            <Icon name={online ? 'wifi' : 'wifi-off'} className="h-3.5 w-3.5" aria-hidden />
            <span className={cn(online && 'hidden sm:inline')}>
              {online ? (
                'Online'
              ) : (
                <>
                  <span className="sm:hidden">Offline</span>
                  <span className="hidden sm:inline">Offline · queueing</span>
                </>
              )}
            </span>
          </span>
          <Link
            to="/admin"
            className="pressable -mr-1 grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground sm:mr-0"
            aria-label="Exit staff mode"
          >
            <Icon name="log-out" className="h-5 w-5" />
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet context={{ venueId }} />
      </main>
    </div>
  );
}
export { StaffShell };
