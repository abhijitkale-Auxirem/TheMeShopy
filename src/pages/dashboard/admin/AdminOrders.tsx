import DashboardLayout from '@/layouts/DashboardLayout';
import { ShoppingBag, Search, Eye, Download, TrendingUp, DollarSign, Package, Users } from 'lucide-react';
import { useState } from 'react';

const orders = [
  { id: 'o1', orderId: '#ORD-10045', buyer: { name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face' }, product: 'Nexus Dashboard', seller: 'Alex Johnson', amount: 59, date: '2024-06-14', status: 'completed', license: 'Regular' },
  { id: 'o2', orderId: '#ORD-10044', buyer: { name: 'Carlos Rivera', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' }, product: 'LaunchKit Boilerplate', seller: 'Alex Johnson', amount: 149, date: '2024-06-13', status: 'completed', license: 'Regular' },
  { id: 'o3', orderId: '#ORD-10043', buyer: { name: 'Emma Thompson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }, product: 'DataVault Analytics', seller: 'Alex Johnson', amount: 89, date: '2024-06-12', status: 'completed', license: 'Regular' },
  { id: 'o4', orderId: '#ORD-10042', buyer: { name: 'Liam O\'Brien', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' }, product: 'Prism UI Library', seller: 'Priya Patel', amount: 79, date: '2024-06-11', status: 'completed', license: 'Extended' },
  { id: 'o5', orderId: '#ORD-10041', buyer: { name: 'Yuki Tanaka', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face' }, product: 'FlowChat AI', seller: 'Alex Johnson', amount: 199, date: '2024-06-10', status: 'processing', license: 'Extended' },
  { id: 'o6', orderId: '#ORD-10040', buyer: { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face' }, product: 'Aurora Landing Kit', seller: 'Stella Rodriguez', amount: 29, date: '2024-06-09', status: 'completed', license: 'Regular' },
  { id: 'o7', orderId: '#ORD-10039', buyer: { name: 'Nina Patel', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face' }, product: 'Cosmos WordPress Theme', seller: 'David Kim', amount: 49, date: '2024-06-08', status: 'refunded', license: 'Regular' },
];

const statusColors: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  refunded: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminOrders() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = orders.filter(o => {
    const matchSearch = o.product.toLowerCase().includes(search.toLowerCase()) || o.buyer.name.toLowerCase().includes(search.toLowerCase()) || o.orderId.includes(search);
    const matchStatus = status === 'all' || o.status === status;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.amount, 0);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Orders</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor all platform transactions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, icon: ShoppingBag },
            { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, icon: TrendingUp },
            { label: 'Total Revenue', value: `$${totalRevenue}`, icon: DollarSign },
            { label: 'Refunds', value: orders.filter(o => o.status === 'refunded').length, icon: Package },
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

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={status} onChange={e => setStatus(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {['Order ID', 'Buyer', 'Product', 'Seller', 'Amount', 'Date', 'License', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">{order.orderId}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <img src={order.buyer.avatar} alt={order.buyer.name} className="w-7 h-7 rounded-full" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{order.buyer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">{order.product}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{order.seller}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-emerald-600">${order.amount}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    <td className="px-4 py-4"><span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">{order.license}</span></td>
                    <td className="px-4 py-4"><span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColors[order.status]}`}>{order.status}</span></td>
                    <td className="px-4 py-4"><button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg"><Eye className="w-3.5 h-3.5" /></button></td>
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
