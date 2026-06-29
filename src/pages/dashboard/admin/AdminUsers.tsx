import DashboardLayout from '@/layouts/DashboardLayout';
import { Users, Search, Filter, Eye, Ban, CheckCircle, Mail, MoreVertical, Shield } from 'lucide-react';
import { useState } from 'react';
import { mockUsers } from '@/database/mockDb';

const allUsers = [
  ...mockUsers.map(u => ({ ...u, status: 'active', totalOrders: Math.floor(Math.random() * 50) })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `extra_${i}`,
    name: `User ${i + 10}`,
    email: `user${i + 10}@example.com`,
    role: ['buyer', 'seller', 'buyer', 'buyer'][i % 4] as 'buyer' | 'seller',
    avatar: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'][i % 2],
    joinedAt: '2024-0' + ((i % 6) + 1) + '-15',
    isVerified: i % 3 !== 0,
    status: i % 7 === 0 ? 'suspended' : 'active',
    totalOrders: (i + 1) * 3,
    totalPurchases: (i + 1) * 3,
    earnings: 0,
    totalSales: 0,
  })),
];

const roleColors: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  seller: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  buyer: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  affiliate: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  agency: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
};

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = allUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Users</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage all registered users on the platform</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Users', value: allUsers.length },
            { label: 'Buyers', value: allUsers.filter(u => u.role === 'buyer').length },
            { label: 'Sellers', value: allUsers.filter(u => u.role === 'seller').length },
            { label: 'Affiliates', value: allUsers.filter(u => u.role === 'affiliate').length },
            { label: 'Suspended', value: allUsers.filter(u => (u as any).status === 'suspended').length },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none">
            <option value="all">All Roles</option>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
            <option value="affiliate">Affiliates</option>
            <option value="agency">Agencies</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  {['User', 'Role', 'Joined', 'Verified', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.slice(0, 15).map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${roleColors[user.role] || roleColors.buyer}`}>{user.role}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{user.joinedAt}</td>
                    <td className="px-5 py-4">
                      {user.isVerified ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <span className="text-xs text-amber-500">Pending</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${(user as any).status === 'suspended' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                        {(user as any).status || 'active'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg"><Mail className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Ban className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
