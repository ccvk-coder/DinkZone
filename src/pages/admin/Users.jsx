import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Table } from '../../components/Table';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { TextInput } from '../../components/TextInput';
import { Select } from '../../components/Select';
import { useToast } from '../../components/Toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { rolePermissions, staffMembers } from '../../data/user';
import { venues } from '../../data/venues';
function Users() {
  const { toast } = useToast();
  const [staff, setStaff] = useState(staffMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invite, setInvite] = useState({ email: '', role: 'Front Desk', venue: venues[0].name });
  const [emailError, setEmailError] = useState();
  const send = () => {
    if (!/^\S+@\S+\.\S+$/.test(invite.email)) {
      setEmailError('Enter a valid email');
      return;
    }
    setStaff((s) => [
      ...s,
      {
        id: `s-${Date.now()}`,
        name: invite.email.split('@')[0],
        email: invite.email,
        role: invite.role,
        venue: invite.venue,
        lastActive: '\u2014',
        status: 'Invited'
      }
    ]);
    toast({ title: 'Invite sent', description: invite.email, tone: 'success' });
    setInviteOpen(false);
    setInvite({ ...invite, email: '' });
  };
  return (
    <div>
      <PageHeader
        title="Users & staff"
        subtitle="12,480 players · 8 staff accounts"
        actions={
          <Button className="pressable" onClick={() => setInviteOpen(true)}>
            <span className="inline-flex items-center gap-2">
              <Icon name="user-plus" className="h-4 w-4" aria-hidden />
              Invite staff
            </span>
          </Button>
        }
      />
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <Table
          className="w-max min-w-full"
          data={staff}
          rowKey={(s) => s.id}
          columns={[
            {
              key: 'name',
              header: 'Name',
              sortValue: (s) => s.name,
              render: (s) => (
                <span className="flex items-center gap-3">
                  <Avatar name={s.name} size="sm" />
                  <span>
                    <span className="block whitespace-nowrap font-medium">{s.name}</span>
                    <span className="block text-xs text-muted-foreground">{s.email}</span>
                  </span>
                </span>
              )
            },
            {
              key: 'role',
              header: 'Role',
              sortValue: (s) => s.role,
              render: (s) => (
                <Badge tone={s.role === 'Super Admin' ? 'primary' : 'neutral'}>{s.role}</Badge>
              )
            },
            {
              key: 'venue',
              header: 'Venue',
              sortValue: (s) => s.venue,
              render: (s) => <span className="whitespace-nowrap">{s.venue}</span>
            },
            {
              key: 'active',
              header: 'Last active',
              render: (s) => <span className="text-muted-foreground">{s.lastActive}</span>
            },
            {
              key: 'status',
              header: 'Status',
              sortValue: (s) => s.status,
              render: (s) => (
                <Badge
                  tone={
                    s.status === 'Active'
                      ? 'success'
                      : s.status === 'Invited'
                        ? 'warning'
                        : 'destructive'
                  }
                >
                  {s.status}
                </Badge>
              )
            }
          ]}
        />
      </div>
      <section
        className="mt-6 overflow-x-auto rounded-lg border border-border bg-card"
        aria-labelledby="perm-h"
      >
        <h2 id="perm-h" className="border-b border-border px-4 py-3 font-bold">
          Roles & permissions
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-2.5 font-semibold">Permission</th>
              <th className="px-4 py-2.5 text-center font-semibold">Super Admin</th>
              <th className="px-4 py-2.5 text-center font-semibold">Venue Owner</th>
              <th className="px-4 py-2.5 text-center font-semibold">Front Desk</th>
            </tr>
          </thead>
          <tbody>
            {rolePermissions.map((p) => (
              <tr key={p.permission} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5">{p.permission}</td>
                {[p.superAdmin, p.owner, p.desk].map((v, i) => (
                  <td key={i} className="px-4 py-2.5 text-center">
                    {v ? (
                      <Icon
                        name="check"
                        className="mx-auto h-4 w-4 text-success"
                        aria-label="Allowed"
                      />
                    ) : (
                      <Icon
                        name="minus"
                        className="mx-auto h-4 w-4 text-muted-foreground"
                        aria-label="Not allowed"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite staff"
        description="They’ll get an email to set up their account."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={send}>Send invite</Button>
          </div>
        }
      >
        <div className="space-y-3">
          <TextInput
            label="Email"
            type="email"
            placeholder="name@venue.ph"
            value={invite.email}
            error={emailError}
            onChange={(e) => {
              setInvite({ ...invite, email: e.target.value });
              setEmailError(void 0);
            }}
          />
          <Select
            label="Role"
            value={invite.role}
            onChange={(e) => setInvite({ ...invite, role: e.target.value })}
            options={['Venue Owner', 'Front Desk', 'Coach'].map((r) => ({ label: r, value: r }))}
          />
          <Select
            label="Venue"
            value={invite.venue}
            onChange={(e) => setInvite({ ...invite, venue: e.target.value })}
            options={venues.map((v) => ({ label: v.name, value: v.name }))}
          />
        </div>
      </Modal>
    </div>
  );
}
export { Users };
