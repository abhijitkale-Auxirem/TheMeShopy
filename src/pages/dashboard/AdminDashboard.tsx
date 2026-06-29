import { mockProducts, mockUsers, mockOrders } from '@/database/mockDb';
import { Link } from 'react-router-dom';
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, ArrowUpRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { getRevenueByMonth } from '@/database/orders';

const COLORS = ['#4F46E5', '#2563EB', '#10B981', '#F59E0B', '#EF4444'];

export default function AdminDashboard() {
  const sellers = mockUsers.filter(u => u.role === 'seller');
  const buyers = mockUsers.filter(u => u.role === 'buyer' || u.role === 'agency' || u.role === 'enterprise');
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.amount, 0);
  const revenueData = getRevenueByMonth();

  const categoryData = [
    { name: 'Admin Templates', value: 187 },
    { name: 'React Templates', value: 256 },
    { name: 'UI Kits', value: 175 },
    { name: 'Landing Pages', value: 198 },
    { name: 'WordPress', value: 298 },
  ];

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, change: '+24%', bg: 'from-indigo-500 to-indigo-700' },
    { label: 'Total Products', value: mockProducts.length, icon: Package, change: '+12', bg: 'from-blue-500 to-blue-700' },
    { label: 'Total Users', value: mockUsers.length, icon: Users, change: '+8', bg: 'from-emerald-500 to-emerald-700' },
    { label: 'Orders', value: mockOrders.length, icon: ShoppingBag, change: '+34', bg: 'from-purple-500 to-purple-700' },
  ];

  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Platform overview and management tools.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`bg-gradient-to-br ${s.bg} rounded-xl p-5 text-white`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-white/80">{s.label}</p>
                <Icon className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-3xl font-bold font-heading">{s.value}</p>
              <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />{s.change} this month
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Revenue Trend</h2>
            <div className="flex items-center gap-1 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" /> +24%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} contentStyle={{ borderRadius: '8px' }} />
              <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="45%" outerRadius={70} dataKey="value">
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {categoryData.slice(0, 3).map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} /><span className="text-gray-600 dark:text-gray-400">{d.name}</span></div>
                <span className="font-medium text-gray-900 dark:text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white">Recent Orders</h2>
          <Link to="/dashboard/admin/orders" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all</Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              {['Order ID', 'Product', 'Buyer', 'Amount', 'Status', 'Date'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentOrders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">#{o.id.slice(-8)}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white max-w-[160px] truncate">{o.productTitle}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{o.buyerName}</td>
                <td className="px-4 py-3 font-semibold text-indigo-600">${o.amount}</td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1 w-fit text-xs font-medium px-2 py-0.5 rounded-full ${
                    o.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' :
                    o.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {o.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : o.status === 'pending' ? <Clock className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
          { label: 'Sellers', href: '/dashboard/admin/sellers', icon: CheckCircle },
          { label: 'Products', href: '/dashboard/admin/products', icon: Package },
          { label: 'Disputes', href: '/dashboard/admin/disputes', icon: AlertTriangle },
          { label: 'Revenue', href: '/dashboard/admin/revenue', icon: DollarSign },
        ].map(a => {
          const Icon = a.icon;
          return (
            <Link key={a.href} to={a.href} className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all text-center">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{a.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
