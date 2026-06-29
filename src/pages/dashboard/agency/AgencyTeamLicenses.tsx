import DashboardLayout from '@/layouts/DashboardLayout';
import { FileText, Shield, Users, Calendar, Search, Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const teamLicenses = [
  { id: 'tl_1', product: 'Nexus - Modern SaaS Dashboard', assignedTo: ['Alice Johnson', 'Bob Smith', 'Carol White'], seats: 5, usedSeats: 3, licenseType: 'Agency', expiresAt: 'Lifetime', purchaseDate: '2024-06-01', value: 199 },
  { id: 'tl_2', product: 'Prism UI - Component Library', assignedTo: ['Carol White', 'David Lee'], seats: 10, usedSeats: 2, licenseType: 'Agency', expiresAt: 'Lifetime', purchaseDate: '2024-05-15', value: 299 },
  { id: 'tl_3', product: 'LaunchKit - SaaS Boilerplate', assignedTo: ['Alice Johnson', 'Eve Martinez'], seats: 3, usedSeats: 2, licenseType: 'Agency', expiresAt: 'Lifetime', purchaseDate: '2024-04-20', value: 449 },
  { id: 'tl_4', product: 'IconFlow - SVG Icons Pack', assignedTo: ['Bob Smith', 'Carol White', 'David Lee', 'Frank Chen'], seats: 25, usedSeats: 4, licenseType: 'Extended', expiresAt: 'Lifetime', purchaseDate: '2024-03-10', value: 99 },
];

const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
];

export default function AgencyTeamLicenses() {
  const [search, setSearch] = useState('');

  const filtered = teamLicenses.filter(l =>
    l.product.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = teamLicenses.reduce((s, l) => s + l.value, 0);
  const totalSeats = teamLicenses.reduce((s, l) => s + l.seats, 0);
  const usedSeats = teamLicenses.reduce((s, l) => s + l.usedSeats, 0);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Team Licenses</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage product licenses across your team</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Licenses', value: teamLicenses.length, icon: FileText, color: 'indigo' },
            { label: 'Total Seats', value: `${usedSeats}/${totalSeats}`, icon: Users, color: 'blue' },
            { label: 'License Portfolio Value', value: `$${totalValue.toLocaleString()}`, icon: Shield, color: 'emerald' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-${s.color}-50 dark:bg-${s.color}-900/20 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${s.color}-600`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search licenses..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        {/* Licenses */}
        <div className="space-y-4">
          {filtered.map(lic => (
            <div key={lic.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{lic.product}</h3>
                    <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded-full">{lic.licenseType} License</span>
                  </div>

                  {/* Seat Usage Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Seats Used</span>
                      <span>{lic.usedSeats} / {lic.seats}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${(lic.usedSeats / lic.seats) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Assigned Team */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {lic.assignedTo.slice(0, 3).map((name, i) => (
                        <img key={name} src={avatars[i % avatars.length]} alt={name} title={name} className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800" />
                      ))}
                      {lic.assignedTo.length > 3 && (
                        <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">+{lic.assignedTo.length - 3}</div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">assigned</span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>Purchased: {lic.purchaseDate}</span>
                    <span>Expires: {lic.expiresAt}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">${lic.value}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 dark:border-indigo-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                    <Users className="w-3.5 h-3.5" /> Assign Seat
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
