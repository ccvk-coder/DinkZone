import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { Wordmark } from '../ui/Wordmark';
import { useApp } from '../../contexts/AppContext';
import { useShop } from '../../contexts/ShopContext';
import { cn } from '../../utils/classNames';
const tabs = [
  { to: '/courts', label: 'Courts', icon: 'map-pin' },
  { to: '/shop', label: 'Shop', icon: 'shopping-bag' },
  { to: '/events', label: 'Events', icon: 'trophy' },
  { to: '/bookings', label: 'Bookings', icon: 'calendar-days' },
  { to: '/profile', label: 'Profile', icon: 'circle-user-round' }
];
const focusRoutes = [/^\/book\//, /\/checkin$/, /\/register$/, /^\/cart/];
function PlayerShell() {
  const { pathname } = useLocation();
  const { online, role, theme, toggleTheme } = useApp();
  const { cartCount } = useShop();
  const hideTabBar = focusRoutes.some((r) => r.test(pathname));
  return (
    <div className="min-h-full w-full bg-background text-foreground">
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col border-r border-border bg-card md:flex lg:w-60"
        aria-label="Main navigation"
      >
        <Link
          to="/courts"
          className="flex h-20 items-center justify-center px-5 lg:justify-start"
          aria-label="DinkZone home"
        >
          <Wordmark className="lg:hidden" compact />
          <Wordmark className="hidden lg:inline-flex" />
        </Link>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) =>
                cn(
                  'pressable relative flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-md px-2 text-[11px] font-medium lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:text-sm',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )
              }
            >
              <span className="relative">
                <Icon name={t.icon} className="h-5 w-5" aria-hidden />
                {t.to === '/shop' && cartCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-highlight px-1 text-[10px] font-bold text-highlight-foreground">
                    {cartCount}
                  </span>
                )}
              </span>
              {t.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-col gap-1 border-t border-border p-3">
          <p className="hidden px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground lg:block">
            Workspaces
          </p>
          {[
            { to: '/admin/owner', label: 'Owner view', icon: 'crown', role: 'owner' },
            { to: '/staff/overview', label: 'Staff overview', icon: 'scan-line', role: 'staff' },
            { to: '/admin', label: 'Admin dashboard', icon: 'layout-dashboard', role: 'admin' }
          ].map((w) => (
            <Link
              key={w.to}
              to={w.to}
              title={w.label}
              className={cn(
                'pressable flex min-h-[44px] items-center justify-center gap-3 rounded-md px-3 text-sm hover:bg-muted hover:text-foreground lg:justify-start',
                role === w.role ? 'font-semibold text-foreground' : 'text-muted-foreground'
              )}
            >
              <Icon name={w.icon} className="h-5 w-5" aria-hidden />
              <span className="hidden lg:inline">{w.label}</span>
              <span className="sr-only lg:hidden">{w.label}</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="pressable flex min-h-[44px] items-center justify-center gap-3 rounded-md px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground lg:justify-start"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5" aria-hidden />
            <span className="hidden lg:inline">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
            <span className="sr-only lg:hidden">Toggle theme</span>
          </button>
        </div>
      </aside>
      <div className="md:pl-20 lg:pl-60">
        {!online && (
          <div
            role="status"
            className="sticky top-0 z-30 flex items-center justify-center gap-2 bg-warning px-4 py-2 text-center text-sm font-medium text-white dark:text-black"
          >
            <Icon name="wifi-off" className="h-4 w-4" aria-hidden />
            You’re offline. Saved passes still work for check-in.
          </div>
        )}
        <main className={cn('min-w-0', hideTabBar ? 'pb-0' : 'pb-28 md:pb-0')}>
          <Outlet />
        </main>
      </div>
      {!hideTabBar && (
        <nav
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/98 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 backdrop-blur md:hidden"
          aria-label="Main navigation"
        >
          <ul className="grid grid-cols-5">
            {tabs.map((t) => (
              <li key={t.to}>
                <NavLink
                  to={t.to}
                  className="relative flex min-h-[60px] flex-col items-center justify-center gap-1 text-[11px] font-medium"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="tab-pill"
                          className="absolute top-1.5 h-8 w-14 rounded-full bg-accent"
                          transition={{ type: 'spring', damping: 30, stiffness: 420 }}
                        />
                      )}
                      <span className="relative">
                        <Icon
                          name={t.icon}
                          className={cn(
                            'h-5 w-5',
                            isActive ? 'text-accent-foreground' : 'text-muted-foreground'
                          )}
                          aria-hidden
                        />
                        {t.to === '/shop' && cartCount > 0 && (
                          <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                            {cartCount}
                          </span>
                        )}
                      </span>
                      <span
                        className={cn(
                          'relative',
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        )}
                      >
                        {t.label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
export { PlayerShell };
