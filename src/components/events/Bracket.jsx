import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { Chip } from '../ui/Chip';
import { cn } from '../../utils/classNames';
const roundNames = { 1: 'Quarterfinals', 2: 'Semifinals', 3: 'Final' };
function matchWinner(m) {
  if (!m.scoreA || !m.scoreB || m.live) return null;
  let a = 0;
  let b = 0;
  m.scoreA.forEach((s, i) => (s > (m.scoreB?.[i] ?? 0) ? a++ : b++));
  return a > b ? 'A' : 'B';
}
function TeamRow({ team, scores, win, lose }) {
  return (
    <div className={cn('flex items-center gap-2 px-3 py-2', lose && 'text-muted-foreground')}>
      {team ? (
        <>
          <span className="w-4 text-[11px] tabular text-muted-foreground">{team.seed}</span>
          <span className={cn('min-w-0 flex-1 truncate text-sm', win && 'font-bold')}>
            {team.name}
          </span>
        </>
      ) : (
        <span className="flex-1 text-sm italic text-muted-foreground">TBD</span>
      )}
      <span className="flex gap-1.5">
        {scores?.map((s, i) => (
          <span key={i} className={cn('w-5 text-right text-sm tabular', win && 'font-bold')}>
            {s}
          </span>
        ))}
      </span>
      {win && (
        <Icon
          name="chevron-left"
          className="h-3.5 w-3.5 text-court dark:text-highlight"
          aria-label="Winner"
        />
      )}
    </div>
  );
}
function MatchCard({ match, teams }) {
  const a = teams.find((t) => t.id === match.teamA);
  const b = teams.find((t) => t.id === match.teamB);
  const w = matchWinner(match);
  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border bg-card',
        match.live ? 'border-destructive/50 ring-1 ring-destructive/30' : 'border-border'
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-surface px-3 py-1 text-[11px] text-muted-foreground">
        <span>
          {match.court ? `Court ${match.court}` : roundNames[match.round]}
          {match.time ? ` \xB7 ${match.time}` : ''}
        </span>
        {match.live && (
          <span className="inline-flex items-center gap-1 font-bold uppercase text-destructive">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" aria-hidden />{' '}
            Live
          </span>
        )}
      </div>
      <TeamRow team={a} scores={match.scoreA} win={w === 'A'} lose={w === 'B'} />
      <div className="h-px bg-border" />
      <TeamRow team={b} scores={match.scoreB} win={w === 'B'} lose={w === 'A'} />
    </div>
  );
}
function Bracket({ matches, teams }) {
  const rounds = Array.from(new Set(matches.map((m) => m.round))).sort();
  const [mobileRound, setMobileRound] = useState(
    rounds.find((r) => matches.some((m) => m.round === r && m.live)) ?? rounds[0]
  );
  return (
    <>
      <div className="md:hidden">
        <div
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4"
          role="tablist"
          aria-label="Round"
        >
          {rounds.map((r) => (
            <Chip
              key={r}
              role="tab"
              aria-selected={mobileRound === r}
              selected={mobileRound === r}
              onClick={() => setMobileRound(r)}
            >
              {roundNames[r]}
            </Chip>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {matches
            .filter((m) => m.round === mobileRound)
            .map((m) => (
              <MatchCard key={m.id} match={m} teams={teams} />
            ))}
        </div>
      </div>
      <div
        className="hidden gap-6 md:grid"
        style={{ gridTemplateColumns: `repeat(${rounds.length}, minmax(0, 1fr))` }}
      >
        {rounds.map((r) => {
          const ms = matches.filter((m) => m.round === r);
          return (
            <div key={r} className="flex flex-col">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {roundNames[r]}
              </p>
              <div className="flex flex-1 flex-col justify-around gap-4">
                {ms.map((m) => (
                  <MatchCard key={m.id} match={m} teams={teams} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export { Bracket, MatchCard, matchWinner };
