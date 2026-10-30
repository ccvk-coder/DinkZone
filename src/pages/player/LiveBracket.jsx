import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Tabs, TabList, Tab, TabPanel } from '../../components/Tabs';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { Bracket } from '../../components/events/Bracket';
import { tournaments, leaderboard } from '../../data/tournaments';
import { useApp } from '../../contexts/AppContext';
import { peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
function LiveBracket() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useApp();
  const t = tournaments.find((x) => x.id === id);
  const [tab, setTab] = useState(params.get('tab') ?? 'bracket');
  const [matches, setMatches] = useState(t?.matches ?? []);
  useEffect(() => {
    if (t?.status !== 'live') return;
    const timer = window.setInterval(() => {
      setMatches((ms) =>
        ms.map((m) => {
          if (!m.live || !m.scoreA || !m.scoreB) return m;
          const g = m.scoreA.length - 1;
          const a = [...m.scoreA];
          const b = [...m.scoreB];
          if (Math.random() > 0.5) a[g] += 1;
          else b[g] += 1;
          if (a[g] >= 11 || b[g] >= 11) {
            const winsA = a.filter((s, i) => s > b[i]).length;
            const winsB = a.length - winsA;
            if (winsA === 2 || winsB === 2) return { ...m, scoreA: a, scoreB: b, live: false };
            a.push(0);
            b.push(0);
          }
          return { ...m, scoreA: a, scoreB: b };
        })
      );
    }, 4e3);
    return () => window.clearInterval(timer);
  }, [t?.status]);
  if (!t)
    return (
      <div className="px-4 py-16">
        <EmptyState
          title="Event not found"
          action={<Button onClick={() => navigate('/events')}>All events</Button>}
        />
      </div>
    );
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-8">
      <PageHeader
        back={`/events/${t.id}`}
        eyebrow={
          t.status === 'live'
            ? '\u25CF Live'
            : t.status === 'past'
              ? 'Final results'
              : 'Bracket preview'
        }
        title={t.name}
        subtitle={`${t.divisions[0].name} \xB7 ${peso(t.prizePool)} prize pool`}
      />
      <Tabs value={tab} onChange={setTab}>
        <TabList>
          <Tab value="bracket">Bracket</Tab>
          <Tab value="leaderboard">Cebu rankings</Tab>
        </TabList>
        <TabPanel value="bracket">
          <div className="mt-5">
            {t.status === 'live' && (
              <p
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive"
                role="status"
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive"
                  aria-hidden
                />{' '}
                Scores update live
              </p>
            )}
            <Bracket matches={matches} teams={t.teams} />
          </div>
        </TabPanel>
        <TabPanel value="leaderboard">
          <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card">
            <div className="hidden grid-cols-[48px_1fr_80px_80px_90px_40px] gap-2 border-b border-border bg-surface px-4 py-2.5 text-xs font-semibold text-muted-foreground sm:grid">
              <span>Rank</span>
              <span>Player</span>
              <span className="text-right">Rating</span>
              <span className="text-right">W–L</span>
              <span className="text-right">Points</span>
              <span />
            </div>
            <ol>
              {leaderboard.map((p) => (
                <li
                  key={p.handle}
                  className={cn(
                    'grid grid-cols-[40px_1fr_auto] items-center gap-2 border-b border-border px-4 py-3 last:border-0 sm:grid-cols-[48px_1fr_80px_80px_90px_40px]',
                    p.rank <= 3 && 'bg-accent/30'
                  )}
                >
                  <span
                    className={cn(
                      'font-display text-lg font-extrabold tabular',
                      p.rank === 1 && 'text-court dark:text-highlight'
                    )}
                  >
                    {p.rank}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{p.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {p.handle}
                      <span className="sm:hidden">
                        {' '}
                        · {p.wins}–{p.losses}
                      </span>
                    </span>
                  </span>
                  <span className="text-right text-sm font-semibold tabular">
                    {p.rating.toFixed(2)}
                  </span>
                  <span className="hidden text-right text-sm tabular text-muted-foreground sm:block">
                    {p.wins}–{p.losses}
                  </span>
                  <span className="hidden text-right text-sm tabular sm:block">
                    {p.points.toLocaleString()}
                  </span>
                  <span className="hidden justify-end sm:flex">
                    {p.trend > 0 ? (
                      <Icon
                        name="trending-up"
                        className="h-4 w-4 text-success"
                        aria-label={`Up ${p.trend}`}
                      />
                    ) : p.trend < 0 ? (
                      <Icon
                        name="trending-down"
                        className="h-4 w-4 text-destructive"
                        aria-label={`Down ${-p.trend}`}
                      />
                    ) : (
                      <Icon
                        name="minus"
                        className="h-4 w-4 text-muted-foreground"
                        aria-label="No change"
                      />
                    )}
                  </span>
                </li>
              ))}
              <li className="grid grid-cols-[40px_1fr_auto] items-center gap-2 border-t-2 border-dashed border-border bg-highlight/20 px-4 py-3 sm:grid-cols-[48px_1fr_80px_80px_90px_40px]">
                <span className="font-display text-lg font-extrabold tabular">
                  {user.stats.cityRank}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{user.name} (you)</span>
                  <span className="block text-xs text-muted-foreground">{user.handle}</span>
                </span>
                <span className="text-right text-sm font-semibold tabular">
                  {user.rating.toFixed(2)}
                </span>
                <span className="hidden text-right text-sm tabular text-muted-foreground sm:block">
                  {user.stats.wins}–{user.stats.matches - user.stats.wins}
                </span>
                <span className="hidden text-right text-sm tabular sm:block">1,204</span>
                <span className="hidden justify-end sm:flex">
                  <Icon name="trending-up" className="h-4 w-4 text-success" aria-label="Up 4" />
                </span>
              </li>
            </ol>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
export { LiveBracket };
