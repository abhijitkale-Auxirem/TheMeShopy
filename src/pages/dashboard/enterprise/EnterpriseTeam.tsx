import DashboardLayout from '@/layouts/DashboardLayout';
import { Users, Plus, Search, Shield, Mail, Edit2, Trash2, Crown } from 'lucide-react';
import { useState } from 'react';

const teamMembers = [
  { id: 'tm1', name: 'Alexandra Chen', email: 'a.chen@corp.com', role: 'admin', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-01-15', licenses: 8, status: 'active' },
  { id: 'tm2', name: 'Robert Martinez', email: 'r.martinez@corp.com', role: 'member', department: 'Design', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-02-20', licenses: 5, status: 'active' },
  { id: 'tm3', name: 'Jessica Park', email: 'j.park@corp.com', role: 'member', department: 'Marketing', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-03-10', licenses: 3, status: 'active' },
  { id: 'tm4', name: 'Michael Wong', email: 'm.wong@corp.com', role: 'viewer', department: 'Product', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-04-05', licenses: 2, status: 'active' },
  { id: 'tm5', name: 'Sophia Patel', email: 's.patel@corp.com', role: 'member', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-04-20', licenses: 6, status: 'active' },
  { id: 'tm6', name: 'Daniel Johnson', email: 'd.johnson@corp.com', role: 'member', department: 'Design', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-05-01', licenses: 4, status: 'inactive' },
];

const roleColors: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  member: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  viewer: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

export default function EnterpriseTeam() {
  const [search, setSearch] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  const filtered = teamMembers.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Team Management</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage enterprise team members and their access</p>
          </div>
          <button onClick={() => setShowInvite(!showInvite)} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> Invite Member
          </button>
        </div>

        {showInvite && (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Invite Team Member</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Email Address</label>
                <input type="email" placeholder="name@company.com" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Department</label>
                <input type="text" placeholder="Engineering" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Role</label>
                <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Member</option>
                  <option>Admin</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">Send Invite</button>
              <button onClick={() => setShowInvite(false)} className="px-4 py-2 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Cancel</button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Members', value: teamMembers.length },
            { label: 'Admins', value: teamMembers.filter(m => m.role === 'admin').length },
            { label: 'Active', value: teamMembers.filter(m => m.status === 'active').length },
            { label: 'Total Licenses', value: teamMembers.reduce((s, m) => s + m.licenses, 0) },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search team members..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(member => (
            <div key={member.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={member.avatar} alt={member.name} className="w-11 h-11 rounded-full" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{member.name}</p>
                      {member.role === 'admin' && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                    </div>
                    <p className="text-xs text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${roleColors[member.role]}`}>{member.role}</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">{member.department}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${member.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>{member.status}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Joined {member.joinedAt}</span>
                <span>{member.licenses} licenses</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
