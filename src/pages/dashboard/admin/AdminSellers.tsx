import DashboardLayout from '@/layouts/DashboardLayout';
import { Users, Search, CheckCircle, XCircle, Eye, Star, TrendingUp, DollarSign, Package } from 'lucide-react';
import { useState } from 'react';

const sellers = [
  { id: 's1', name: 'Alex Johnson', email: 'seller@themeshopy.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', products: 8, totalSales: 1247, earnings: 24680, rating: 4.9, joinedAt: '2023-03-15', status: 'verified', store: 'AlexDesigns' },
  { id: 's2', name: 'Stella Rodriguez', email: 'stella@themeshopy.com', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face', products: 5, totalSales: 934, earnings: 18900, rating: 4.8, joinedAt: '2023-05-01', status: 'verified', store: 'StellaStudio' },
  { id: 's3', name: 'David Kim', email: 'david@themeshopy.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face', products: 6, totalSales: 620, earnings: 12450, rating: 4.7, joinedAt: '2023-07-12', status: 'verified', store: 'DKTemplates' },
  { id: 's4', name: 'Priya Patel', email: 'priya@themeshopy.com', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face', products: 3, totalSales: 490, earnings: 9870, rating: 4.8, joinedAt: '2023-08-05', status: 'verified', store: 'PriyaUI' },
  { id: 's5', name: 'James Martinez', email: 'james@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', products: 1, totalSales: 0, earnings: 0, rating: 0, joinedAt: '2024-06-10', status: 'pending', store: 'JamesDesign' },
  { id: 's6', name: 'Emma Wilson', email: 'emma@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', products: 2, totalSales: 45, earnings: 1280, rating: 4.5, joinedAt: '2024-05-20', status: 'verified', store: 'EmmaCreates' },
];

export default function AdminSellers() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = sellers.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.store.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Sellers</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage seller accounts and approvals</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Sellers', value: sellers.length, icon: Users },
            { label: 'Pending Review', value: sellers.filter(s => s.status === 'pending').length, icon: Package },
            { label: 'Total Products', value: sellers.reduce((s, x) => s + x.products, 0), icon: TrendingUp },
            { label: 'Platform Revenue', value: `$${sellers.reduce((s, x) => s + x.earnings * 0.2, 0).toFixed(0)}`, icon: DollarSign },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search sellers..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none">
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {['Seller', 'Store', 'Products', 'Sales', 'Earnings', 'Rating', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(seller => (
                  <tr key={seller.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={seller.avatar} alt={seller.name} className="w-9 h-9 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{seller.name}</p>
                          <p className="text-xs text-gray-400">{seller.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-indigo-600 font-medium">{seller.store}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">{seller.products}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">{seller.totalSales.toLocaleString()}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-emerald-600">${seller.earnings.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      {seller.rating > 0 ? (
                        <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span className="text-sm">{seller.rating}</span></div>
                      ) : <span className="text-xs text-gray-400">N/A</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${seller.status === 'verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>{seller.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                        {seller.status === 'pending' && <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg"><CheckCircle className="w-3.5 h-3.5" /></button>}
                        <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><XCircle className="w-3.5 h-3.5" /></button>
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
