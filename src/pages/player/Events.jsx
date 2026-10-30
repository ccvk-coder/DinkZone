import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { Tabs, TabList, Tab, TabPanel } from '../../components/Tabs';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { Chip } from '../../components/ui/Chip';
import { EventCard } from '../../components/events/EventCard';
import { tournaments } from '../../data/tournaments';
import { peso } from '../../utils/format';
function Events() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('upcoming');
  const [skill, setSkill] = useState('all');
  const [format, setFormat] = useState('all');
  const [month, setMonth] = useState('all');
  const filtered = useMemo(
    () =>
      tournaments
        .filter((t) => (skill === 'all' ? true : t.skill.includes(skill)))
        .filter((t) => (format === 'all' ? true : t.formats.includes(format)))
        .filter((t) => (month === 'all' ? true : t.date.slice(5, 7) === month)),
    [skill, format, month]
  );
  const totalPrize = tournaments
    .filter((t) => t.status !== 'past')
    .reduce((s, t) => s + t.prizePool, 0);
  const grid = (status) => {
    const list = filtered.filter((t) => t.status === status);
    if (list.length === 0)
      return (
        <EmptyState
          icon={<Icon name="trophy" className="h-8 w-8" />}
          title={status === 'live' ? 'Nothing live right now' : 'No events match'}
          description="Try another skill level or format."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setSkill('all');
                setFormat('all');
                setMonth('all');
              }}
            >
              Clear filters
            </Button>
          }
        />
      );
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], delay: i * 0.04 }}
          >
            <EventCard tournament={t} />
          </motion.div>
        ))}
      </div>
    );
  };
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-8">
      <PageHeader
        title="Tournaments"
        subtitle={`${peso(totalPrize)} in prize money up for grabs in Cebu.`}
        actions={
          <Button
            variant="secondary"
            size="sm"
            className="pressable min-h-[44px]"
            onClick={() => navigate('/events/ayala-thursday-showdown/bracket?tab=leaderboard')}
          >
            <span className="inline-flex items-center gap-1.5">
              <Icon name="medal" className="h-4 w-4" aria-hidden />
              Rankings
            </span>
          </Button>
        }
      />
      <div
        className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0"
        role="toolbar"
        aria-label="Event filters"
      >
        {['all', 'Beginner', 'Intermediate', 'Advanced'].map((s) => (
          <Chip key={s} selected={skill === s} onClick={() => setSkill(s)}>
            {s === 'all' ? 'All levels' : s}
          </Chip>
        ))}
        <span className="mx-1 w-px shrink-0 self-stretch bg-border" aria-hidden />
        {['Singles', 'Doubles', 'Mixed'].map((f) => (
          <Chip key={f} selected={format === f} onClick={() => setFormat(format === f ? 'all' : f)}>
            {f}
          </Chip>
        ))}
        <span className="mx-1 w-px shrink-0 self-stretch bg-border" aria-hidden />
        {[
          ['10', 'Oct'],
          ['11', 'Nov'],
          ['12', 'Dec']
        ].map(([m, l]) => (
          <Chip
            key={m}
            icon="calendar"
            selected={month === m}
            onClick={() => setMonth(month === m ? 'all' : m)}
          >
            {l}
          </Chip>
        ))}
      </div>
      <Tabs value={tab} onChange={(v) => setTab(v)}>
        <TabList>
          <Tab value="upcoming">Upcoming</Tab>
          <Tab value="live">Live</Tab>
          <Tab value="past">Past</Tab>
        </TabList>
        <div className="mt-5">
          <TabPanel value="upcoming">{grid('upcoming')}</TabPanel>
          <TabPanel value="live">{grid('live')}</TabPanel>
          <TabPanel value="past">{grid('past')}</TabPanel>
        </div>
      </Tabs>
    </div>
  );
}
export { Events };
