import DashboardLayout from '@/layouts/DashboardLayout';
import { Users, Search, Star, ShoppingBag, Mail, Eye, Filter } from 'lucide-react';
import { useState } from 'react';

const customers = [
  { id: 'c1', name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', email: 'sarah@example.com', totalOrders: 3, totalSpent: 187, lastPurchase: '2024-06-10', rating: 5.0, country: 'US' },
  { id: 'c2', name: 'Carlos Rivera', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', email: 'carlos@example.com', totalOrders: 2, totalSpent: 268, lastPurchase: '2024-06-13', rating: 4.5, country: 'MX' },
  { id: 'c3', name: 'Emma Thompson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', email: 'emma@example.com', totalOrders: 1, totalSpent: 89, lastPurchase: '2024-06-12', rating: 4.0, country: 'UK' },
  { id: 'c4', name: 'Liam O\'Brien', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', email: 'liam@example.com', totalOrders: 4, totalSpent: 346, lastPurchase: '2024-05-28', rating: 5.0, country: 'IE' },
  { id: 'c5', name: 'Yuki Tanaka', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face', email: 'yuki@example.com', totalOrders: 2, totalSpent: 119, lastPurchase: '2024-05-20', rating: 4.5, country: 'JP' },
  { id: 'c6', name: 'Ahmed Hassan', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face', email: 'ahmed@example.com', totalOrders: 1, totalSpent: 199, lastPurchase: '2024-05-15', rating: 5.0, country: 'EG' },
];

export default function SellerCustomers() {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);
  const avgSpend = Math.round(totalRevenue / customers.length);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Customers</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">View and manage your buyers</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Customers', value: customers.length, icon: Users },
            { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: ShoppingBag },
            { label: 'Avg. Order Value', value: `$${avgSpend}`, icon: Star },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600" />
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
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  {['Customer', 'Orders', 'Total Spent', 'Last Purchase', 'Rating', 'Country', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{c.totalOrders}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">${c.totalSpent}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{c.lastPurchase}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{c.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">{c.country}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"><Mail className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
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
