import DashboardLayout from '@/layouts/DashboardLayout';
import { TrendingUp, Eye, ShoppingBag, Star, ArrowUpRight, ArrowDownRight, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 1200, views: 4500 },
  { month: 'Feb', revenue: 1800, views: 6200 },
  { month: 'Mar', revenue: 2400, views: 7800 },
  { month: 'Apr', revenue: 2100, views: 6900 },
  { month: 'May', revenue: 3200, views: 9400 },
  { month: 'Jun', revenue: 4100, views: 12100 },
];

const productPerformance = [
  { name: 'Nexus Dashboard', sales: 58, revenue: 3422, views: 4200, rating: 4.9 },
  { name: 'LaunchKit', sales: 23, revenue: 3427, views: 2100, rating: 4.8 },
  { name: 'DataVault', sales: 17, revenue: 1513, views: 1800, rating: 4.8 },
  { name: 'FlowChat AI', sales: 8, revenue: 1592, views: 950, rating: 4.9 },
];

const categoryData = [
  { name: 'Admin Templates', value: 45, color: '#4f46e5' },
  { name: 'SaaS Boilerplates', value: 25, color: '#10b981' },
  { name: 'Source Code', value: 20, color: '#f59e0b' },
  { name: 'Analytics', value: 10, color: '#3b82f6' },
];

export default function SellerAnalytics() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Deep insights into your product performance</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Views', value: '47,300', change: '+24%', up: true, icon: Eye },
            { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', up: true, icon: TrendingUp },
            { label: 'Total Sales', value: '1,247', change: '+18%', up: true, icon: ShoppingBag },
            { label: 'Avg. Rating', value: '4.87', change: '-0.02', up: false, icon: Star },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {s.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Revenue & Views Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fill="url(#revGrad)" strokeWidth={2} name="Revenue ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {categoryData.map(c => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-gray-600 dark:text-gray-400">{c.name}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Performance Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Product Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {['Product', 'Sales', 'Revenue', 'Views', 'Rating'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {productPerformance.map(p => (
                  <tr key={p.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{p.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{p.sales}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">${p.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{p.views.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm">{p.rating}</span>
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
