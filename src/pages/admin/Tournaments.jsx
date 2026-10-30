import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { Select } from '../../components/Select';
import { Modal } from '../../components/Modal';
import { Badge } from '../../components/Badge';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { Sheet } from '../../components/ui/Sheet';
import { Bracket } from '../../components/events/Bracket';
import { tournaments as seed } from '../../data/tournaments';
import { venues } from '../../data/venues';
import { images } from '../../data/images';
import { formatDate, peso } from '../../utils/format';
import { cn } from '../../utils/classNames';
const splits = [0.5, 0.3, 0.2];
function Tournaments() {
  const { toast } = useToast();
  const [list, setList] = useState(seed);
  const [selectedId, setSelectedId] = useState(seed[0].id);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({
    name: '',
    venueId: 'v-kasambagan',
    date: '2026-12-13',
    entryFee: 1500,
    prizePool: 1e5
  });
  const [scoreMatch, setScoreMatch] = useState(null);
  const [scores, setScores] = useState({ a: '', b: '' });
  const t = list.find((x) => x.id === selectedId);
  const create = () => {
    if (!draft.name.trim()) return;
    const n = {
      ...seed[2],
      id: `t-${Date.now()}`,
      name: draft.name,
      venueId: draft.venueId,
      date: draft.date,
      endDate: draft.date,
      entryFee: draft.entryFee,
      prizePool: draft.prizePool,
      prizes: ['1st', '2nd', '3rd'].map((place, i) => ({
        place,
        amount: Math.round(draft.prizePool * splits[i])
      })),
      status: 'upcoming',
      banner: images.indoor,
      divisions: seed[2].divisions.map((d) => ({ ...d, filled: 0 })),
      matches: seed[2].matches.map((m) => ({ ...m, teamA: void 0, teamB: void 0 })),
      organizer: 'DinkZone'
    };
    setList((l) => [n, ...l]);
    setSelectedId(n.id);
    setCreating(false);
    toast({
      title: 'Tournament created',
      description: `${n.name} \xB7 ${peso(n.prizePool)} prize pool`,
      tone: 'success'
    });
  };
  const generateBracket = () => {
    const seeds = [...t.teams].sort((a, b) => a.seed - b.seed);
    const pairs = [
      [0, 7],
      [3, 4],
      [2, 5],
      [1, 6]
    ];
    const matches = [
      ...pairs.map(([a, b], i) => ({
        id: `m${i + 1}`,
        round: 1,
        teamA: seeds[a].id,
        teamB: seeds[b].id,
        court: i + 1,
        time: '9:00 AM'
      })),
      { id: 'm5', round: 2, court: 1, time: '1:00 PM' },
      { id: 'm6', round: 2, court: 2, time: '1:00 PM' },
      { id: 'm7', round: 3, court: 1, time: '4:00 PM' }
    ];
    setList((l) => l.map((x) => (x.id === t.id ? { ...x, matches } : x)));
    toast({
      title: 'Bracket generated',
      description: 'Seeded by DUPR-style rating.',
      tone: 'success'
    });
  };
  const saveScore = () => {
    if (!scoreMatch) return;
    const a = scores.a
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number);
    const b = scores.b
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number);
    if (!a.length || a.length !== b.length || a.some(isNaN) || b.some(isNaN)) {
      toast({
        title: 'Check the scores',
        description: 'Enter games like \u201C11, 9, 11\u201D for each team.',
        tone: 'error'
      });
      return;
    }
    setList((l) =>
      l.map((x) =>
        x.id === t.id
          ? {
              ...x,
              matches: x.matches.map((m) =>
                m.id === scoreMatch.id ? { ...m, scoreA: a, scoreB: b, live: false } : m
              )
            }
          : x
      )
    );
    toast({ title: 'Score saved', tone: 'success' });
    setScoreMatch(null);
  };
  const filled = t.divisions.reduce((s, d) => s + d.filled, 0);
  const slots = t.divisions.reduce((s, d) => s + d.slots, 0);
  return (
    <div>
      <PageHeader
        title="Tournaments"
        subtitle="Create events, manage registrations, run brackets."
        actions={
          <Button className="pressable" onClick={() => setCreating(true)}>
            <span className="inline-flex items-center gap-2">
              <Icon name="plus" className="h-4 w-4" aria-hidden />
              New tournament
            </span>
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
        <ul className="space-y-2">
          {list.map((x) => (
            <li key={x.id}>
              <button
                type="button"
                onClick={() => setSelectedId(x.id)}
                className={cn(
                  'pressable w-full rounded-lg border bg-card p-3 text-left',
                  x.id === selectedId
                    ? 'border-brand ring-1 ring-brand dark:border-highlight dark:ring-highlight'
                    : 'border-border hover:border-foreground/30'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-semibold">{x.name}</p>
                  <Badge
                    tone={
                      x.status === 'live'
                        ? 'destructive'
                        : x.status === 'upcoming'
                          ? 'primary'
                          : 'neutral'
                    }
                  >
                    {x.status}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {formatDate(x.date)} · {venues.find((v) => v.id === x.venueId)?.name}
                </p>
                <p className="mt-1 font-display text-lg font-extrabold tabular">
                  {peso(x.prizePool)}
                </p>
              </button>
            </li>
          ))}
        </ul>
        <div className="min-w-0 space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ['Prize pool', peso(t.prizePool)],
              ['Entry fee', peso(t.entryFee)],
              ['Registrations', `${filled}/${slots}`],
              ['Entry revenue', peso(filled * t.entryFee)]
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">{k}</p>
                <p className="mt-1 font-display text-2xl font-extrabold tabular">{v}</p>
              </div>
            ))}
          </div>
          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-bold">Prize split</h2>
            <div className="mt-3 flex h-3 overflow-hidden rounded-full">
              {t.prizes.map((p, i) => (
                <div
                  key={p.place}
                  className={['bg-court', 'bg-court/60', 'bg-court/30'][i]}
                  style={{ width: `${(p.amount / t.prizePool) * 100}%` }}
                />
              ))}
            </div>
            <ul className="mt-3 grid grid-cols-3 gap-2 text-sm">
              {t.prizes.map((p) => (
                <li key={p.place}>
                  <span className="text-muted-foreground">{p.place}</span>{' '}
                  <span className="font-semibold tabular">{peso(p.amount)}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold">Divisions & registrations</h2>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  toast({
                    title: 'Reminder sent',
                    description: 'Unpaid teams were notified.',
                    tone: 'success'
                  })
                }
              >
                Remind unpaid
              </Button>
            </div>
            <ul className="mt-3 divide-y divide-border">
              {t.divisions.map((d) => (
                <li key={d.id} className="flex items-center gap-3 py-2.5 text-sm">
                  <span className="flex-1 font-medium">{d.name}</span>
                  <div className="h-1.5 w-28 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-court"
                      style={{ width: `${(d.filled / d.slots) * 100}%` }}
                    />
                  </div>
                  <span className="w-14 text-right tabular text-muted-foreground">
                    {d.filled}/{d.slots}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold">Bracket</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={generateBracket}>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="shuffle" className="h-4 w-4" aria-hidden />
                    Generate
                  </span>
                </Button>
              </div>
            </div>
            <Bracket matches={t.matches} teams={t.teams} />
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Enter scores
              </p>
              <div className="flex flex-wrap gap-2">
                {t.matches
                  .filter((m) => m.teamA && m.teamB)
                  .map((m) => (
                    <Button
                      key={m.id}
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setScoreMatch(m);
                        setScores({ a: m.scoreA?.join(', ') ?? '', b: m.scoreB?.join(', ') ?? '' });
                      }}
                    >
                      {t.teams.find((x) => x.id === m.teamA)?.name} vs{' '}
                      {t.teams.find((x) => x.id === m.teamB)?.name}
                    </Button>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Sheet
        open={creating}
        onClose={() => setCreating(false)}
        side="right"
        title="New tournament"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setCreating(false)}>
              Cancel
            </Button>
            <Button className="pressable" disabled={!draft.name.trim()} onClick={create}>
              Create
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <TextInput
            label="Event name"
            placeholder="e.g. Cebu Christmas Classic"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
          <Select
            label="Venue"
            value={draft.venueId}
            onChange={(e) => setDraft({ ...draft, venueId: e.target.value })}
            options={venues.map((v) => ({ label: v.name, value: v.id }))}
          />
          <TextInput
            label="Date"
            type="date"
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Entry fee (₱)"
              type="number"
              value={draft.entryFee}
              onChange={(e) => setDraft({ ...draft, entryFee: Number(e.target.value) })}
            />
            <TextInput
              label="Prize pool (₱)"
              type="number"
              value={draft.prizePool}
              onChange={(e) => setDraft({ ...draft, prizePool: Number(e.target.value) })}
            />
          </div>
          <div className="rounded-lg bg-brand p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-highlight">
              Prize pool preview
            </p>
            <p className="font-display text-3xl font-extrabold tabular">{peso(draft.prizePool)}</p>
            <ul className="mt-2 grid grid-cols-3 gap-2 text-sm text-white/80">
              {['1st', '2nd', '3rd'].map((p, i) => (
                <li key={p}>
                  {p} · <span className="tabular">{peso(draft.prizePool * splits[i])}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Sheet>
      <Modal
        open={!!scoreMatch}
        onClose={() => setScoreMatch(null)}
        title="Enter match score"
        description="Separate games with commas."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setScoreMatch(null)}>
              Cancel
            </Button>
            <Button onClick={saveScore}>Save score</Button>
          </div>
        }
      >
        {scoreMatch && (
          <div className="space-y-3">
            <TextInput
              label={t.teams.find((x) => x.id === scoreMatch.teamA)?.name ?? 'Team A'}
              placeholder="11, 9, 11"
              value={scores.a}
              onChange={(e) => setScores({ ...scores, a: e.target.value })}
            />
            <TextInput
              label={t.teams.find((x) => x.id === scoreMatch.teamB)?.name ?? 'Team B'}
              placeholder="7, 11, 8"
              value={scores.b}
              onChange={(e) => setScores({ ...scores, b: e.target.value })}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
export { Tournaments };
