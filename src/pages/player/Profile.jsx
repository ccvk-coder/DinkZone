import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Switch } from '../../components/Switch';
import { useToast } from '../../components/Toast';
import { Chip } from '../../components/ui/Chip';
import { CourtLines } from '../../components/ui/CourtLines';
import { NfcLinkSheet } from '../../components/profile/NfcLinkSheet';
import { useApp } from '../../contexts/AppContext';
import { useBookings } from '../../contexts/BookingsContext';
import { useShop } from '../../contexts/ShopContext';
import { venues } from '../../data/venues';
import { tournaments } from '../../data/tournaments';
import { notifications } from '../../data/user';
import { peso } from '../../utils/format';
function Card({ id, title, action, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-6 rounded-lg border border-border bg-card p-5"
      aria-labelledby={`${id}-h`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id={`${id}-h`} className="text-lg font-bold">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
function Profile() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { toast } = useToast();
  const {
    user,
    updateUser,
    nfcCards,
    removeNfcCard,
    paymentCards,
    savedVenues,
    theme,
    toggleTheme,
    role,
    setRole
  } = useApp();
  const { bookings, registrations } = useBookings();
  const { orders } = useShop();
  const [nfcOpen, setNfcOpen] = useState(false);
  const winRate = Math.round((user.stats.wins / user.stats.matches) * 100);
  const saved = venues.filter((v) => savedVenues.includes(v.id));
  useEffect(() => {
    if (params.get('section') === 'nfc')
      document.getElementById('nfc')?.scrollIntoView({ behavior: 'smooth' });
  }, [params]);
  const switchRole = (r) => {
    setRole(r);
    if (r === 'staff') navigate('/staff/overview');
    else if (r === 'owner') navigate('/admin/owner');
    else if (r === 'admin') navigate('/admin');
    else toast({ title: 'Back to player mode', tone: 'info' });
  };
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-4 md:px-8 md:pt-8">
      <div className="net-texture relative overflow-hidden rounded-lg bg-brand p-5 text-white md:p-7">
        <CourtLines className="absolute -right-16 -top-8 w-80 text-white/10" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} size="lg" />
            <div>
              <h1 className="text-2xl font-extrabold md:text-3xl">{user.name}</h1>
              <p className="text-sm text-white/70">
                {user.handle} · Member since {user.memberSince}
              </p>
            </div>
          </div>
          <div className="flex gap-6 md:ml-auto">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                Rating
              </p>
              <p className="font-display text-4xl font-extrabold leading-none tabular text-highlight">
                {user.rating.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                Cebu rank
              </p>
              <p className="font-display text-4xl font-extrabold leading-none tabular">
                #{user.stats.cityRank}
              </p>
            </div>
          </div>
        </div>
        <dl className="relative mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/10 sm:grid-cols-4">
          {[
            ['Matches', user.stats.matches],
            ['Win rate', `${winRate}%`],
            ['Tournaments', user.stats.tournaments],
            ['Hours played', user.stats.hoursPlayed]
          ].map(([k, v]) => (
            <div key={k} className="bg-brand px-4 py-3">
              <dt className="text-xs text-white/60">{k}</dt>
              <dd className="font-display text-2xl font-bold tabular">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card id="skill" title="Skill level">
          <div className="flex flex-wrap gap-2">
            {['Beginner', 'Intermediate', 'Advanced'].map((s) => (
              <Chip key={s} selected={user.skill === s} onClick={() => updateUser({ skill: s })}>
                {s}
              </Chip>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Used to recommend open play, clinics, and tournament divisions.
          </p>
        </Card>
        <Card
          id="nfc"
          title="NFC access"
          action={
            <Button
              size="sm"
              variant="secondary"
              className="pressable min-h-[40px]"
              onClick={() => setNfcOpen(true)}
            >
              Link card
            </Button>
          }
        >
          {nfcCards.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No cards linked. Link a DinkZone card or sticker to tap into any venue.
            </p>
          ) : (
            <ul className="space-y-2">
              {nfcCards.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center gap-3 rounded-md bg-surface px-3 py-2.5"
                >
                  <Icon name="nfc" className="h-5 w-5 text-court dark:text-highlight" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {c.label} •{c.last4}
                    </p>
                    <p className="text-xs text-muted-foreground">Added {c.addedAt}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      removeNfcCard(c.id);
                      toast({ title: 'Card removed', tone: 'info' });
                    }}
                    className="pressable grid h-11 w-11 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-destructive"
                    aria-label={`Remove ${c.label}`}
                  >
                    <Icon name="trash-2" className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card
          id="saved"
          title="Saved courts"
          action={
            <Link
              to="/courts"
              className="text-sm font-semibold text-court hover:underline dark:text-highlight"
            >
              Find more
            </Link>
          }
        >
          {saved.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Tap the heart on any court to save it here.
            </p>
          ) : (
            <ul className="space-y-2">
              {saved.map((v) => (
                <li key={v.id}>
                  <Link
                    to={`/courts/${v.id}`}
                    className="pressable flex items-center gap-3 rounded-md p-1.5 hover:bg-muted"
                  >
                    <img src={v.image} alt="" className="h-11 w-11 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{v.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {v.neighborhood} · {peso(v.pricePerHour)}/hr
                      </p>
                    </div>
                    <Icon
                      name="chevron-right"
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card id="payments" title="Payment methods">
          <ul className="space-y-2">
            {paymentCards.map((p) => (
              <li key={p.id} className="flex items-center gap-3 rounded-md bg-surface px-3 py-2.5">
                <Icon
                  name={p.kind === 'card' ? 'credit-card' : 'wallet'}
                  className="h-5 w-5"
                  aria-hidden
                />
                <span className="flex-1 text-sm font-semibold">{p.label}</span>
                <span className="text-sm tabular text-muted-foreground">{p.detail}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card id="history" title="History">
          <ul className="divide-y divide-border">
            {[
              {
                to: '/bookings',
                icon: 'calendar-days',
                label: 'Booking history',
                meta: `${bookings.length} bookings`
              },
              {
                to: '/orders',
                icon: 'package',
                label: 'Order history',
                meta: `${orders.length} orders`
              },
              {
                to: '/events',
                icon: 'trophy',
                label: 'Tournament history',
                meta: `${user.stats.tournaments + registrations.length} entries`
              }
            ].map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="flex min-h-[52px] items-center gap-3 hover:text-court">
                  <Icon name={r.icon} className="h-5 w-5 text-muted-foreground" aria-hidden />
                  <span className="flex-1 text-sm font-medium">{r.label}</span>
                  <span className="text-xs text-muted-foreground">{r.meta}</span>
                  <Icon
                    name="chevron-right"
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
          {registrations.length > 0 && (
            <p className="mt-3 rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground">
              Registered:{' '}
              {registrations
                .map((r) => tournaments.find((t) => t.id === r.tournamentId)?.name)
                .join(', ')}
            </p>
          )}
        </Card>
        <Card id="notifications" title="Notifications">
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li key={n.id} className="flex gap-3">
                <span className="relative mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted">
                  <Icon name={n.icon} className="h-4 w-4" aria-hidden />
                  {!n.read && (
                    <span
                      className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-court"
                      aria-label="Unread"
                    />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card id="settings" title="Settings">
          <div className="space-y-4">
            <Switch label="Dark mode" checked={theme === 'dark'} onChange={toggleTheme} />
            <div>
              <p className="mb-2 text-sm font-medium">Account mode</p>
              <div className="flex flex-wrap gap-2">
                {[
                  ['player', 'Player', 'user'],
                  ['staff', 'Court staff', 'scan-line'],
                  ['owner', 'Court owner', 'crown'],
                  ['admin', 'Super admin', 'layout-dashboard']
                ].map(([r, l, i]) => (
                  <Chip key={r} icon={i} selected={role === r} onClick={() => switchRole(r)}>
                    {l}
                  </Chip>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Staff and admin access is granted by your venue. Demo accounts have all roles.
              </p>
            </div>
          </div>
        </Card>
      </div>
      <NfcLinkSheet open={nfcOpen} onClose={() => setNfcOpen(false)} />
    </div>
  );
}
export { Profile };
