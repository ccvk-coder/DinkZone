import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { Wordmark } from '../ui/Wordmark';
import { IconButton } from '../ui/IconButton';
import { Sheet } from '../ui/Sheet';
import { Avatar } from '../Avatar';
import { useApp } from '../../contexts/AppContext';
import { cn } from '../../utils/classNames';
const SIDEBAR_PHOTO = '/ed878101e90a368b4dabdde592885bc9.jpg';
const nav = [
  { to: '/admin', label: 'Overview', icon: 'layout-dashboard', end: true },
  { to: '/admin/owner', label: 'Owner view', icon: 'crown' },
  { to: '/admin/bookings', label: 'Bookings', icon: 'list-checks' },
  { to: '/admin/calendar', label: 'Calendar', icon: 'calendar-range' },
  { to: '/admin/venues', label: 'Venues & courts', icon: 'building-2' },
  { to: '/admin/tournaments', label: 'Tournaments', icon: 'trophy' },
  { to: '/admin/shop', label: 'Shop & inventory', icon: 'package' },
  { to: '/admin/users', label: 'Users & staff', icon: 'users-round' },
  { to: '/admin/reports', label: 'Reports', icon: 'chart-column' }
];
function NavItems({ onNavigate, compact }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {nav.map((n) => (
        <NavLink
          key={n.to}
          to={n.to}
          end={n.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'pressable flex min-h-[44px] items-center gap-3 rounded-md px-3 text-sm font-medium',
              compact && 'justify-center lg:justify-start',
              isActive
                ? 'bg-white/10 text-white'
                : 'text-white/65 hover:bg-white/5 hover:text-white'
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                name={n.icon}
                className={cn('h-[18px] w-[18px] shrink-0', isActive && 'text-highlight')}
                aria-hidden
              />
              <span className={cn(compact && 'hidden lg:inline')}>{n.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
function AdminShell() {
  const { theme, toggleTheme } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-full w-full bg-background text-foreground">
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col overflow-hidden bg-brand md:flex lg:w-64"
        aria-label="Admin navigation"
      >
        <img
          src={SIDEBAR_PHOTO}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[60%_center]"
        />
        <div className="pointer-events-none absolute inset-0 bg-brand/80" aria-hidden />
        <div className="relative flex h-full flex-col p-3">
          <Link to="/admin" className="flex h-14 items-center justify-center px-2 lg:justify-start">
            <Wordmark compact className="lg:hidden" />
            <Wordmark inverted className="hidden lg:inline-flex" />
          </Link>
          <p className="mb-2 mt-4 hidden px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 lg:block">
            Operations
          </p>
          <NavItems compact />
          <div className="mt-auto flex flex-col gap-0.5 border-t border-white/10 pt-3">
            <Link
              to="/staff/overview"
              className="pressable flex min-h-[44px] items-center justify-center gap-3 rounded-md px-3 text-sm text-white/65 hover:bg-white/5 hover:text-white lg:justify-start"
            >
              <Icon name="scan-line" className="h-[18px] w-[18px]" aria-hidden />
              <span className="hidden lg:inline">Staff overview</span>
            </Link>
            <Link
              to="/courts"
              className="pressable flex min-h-[44px] items-center justify-center gap-3 rounded-md px-3 text-sm text-white/65 hover:bg-white/5 hover:text-white lg:justify-start"
            >
              <Icon name="smartphone" className="h-[18px] w-[18px]" aria-hidden />
              <span className="hidden lg:inline">Player app</span>
            </Link>
          </div>
        </div>
      </aside>
      <div className="md:pl-20 lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
          <IconButton
            icon="menu"
            label="Open menu"
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
          />
          <Wordmark compact className="md:hidden" />
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <label htmlFor="admin-search" className="sr-only">
              Search bookings, players, venues
            </label>
            <input
              id="admin-search"
              placeholder="Search bookings, players, venues…"
              className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 text-[11px] text-muted-foreground">
              ⌘K
            </kbd>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="mr-2 hidden items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground lg:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden /> All 14 venues
              online
            </span>
            <IconButton
              icon={theme === 'dark' ? 'sun' : 'moon'}
              label="Toggle theme"
              onClick={toggleTheme}
            />
            <IconButton icon="bell" label="Notifications" badge={3} />
            <div className="ml-1 flex items-center gap-2">
              <Avatar name="Andrea Lopez" size="sm" />
              <div className="hidden leading-tight xl:block">
                <p className="text-sm font-semibold">Andrea Lopez</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 pb-12 md:px-6 xl:px-8">
          <Outlet />
        </main>
      </div>
      <Sheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Admin"
        side="right"
        width="w-[300px]"
      >
        <div className="-mx-2 rounded-lg bg-brand p-2">
          <NavItems onNavigate={() => setMenuOpen(false)} />
        </div>
      </Sheet>
    </div>
  );
}
export { AdminShell };
