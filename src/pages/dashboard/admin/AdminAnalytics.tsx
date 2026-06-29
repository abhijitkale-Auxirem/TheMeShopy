import DashboardLayout from '@/layouts/DashboardLayout';
import { BarChart3, Users, Package, TrendingUp, ArrowUpRight, Globe, ShoppingBag } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 18400, users: 234, products: 12 },
  { month: 'Feb', revenue: 24100, users: 312, products: 18 },
  { month: 'Mar', revenue: 29800, users: 445, products: 24 },
  { month: 'Apr', revenue: 26500, users: 389, products: 19 },
  { month: 'May', revenue: 38200, users: 521, products: 31 },
  { month: 'Jun', revenue: 47600, users: 687, products: 42 },
];

const categoryRevenue = [
  { name: 'Admin Templates', revenue: 42000, color: '#4f46e5' },
  { name: 'UI Kits', revenue: 31000, color: '#10b981' },
  { name: 'SaaS Boilerplates', revenue: 28000, color: '#f59e0b' },
  { name: 'Source Code', revenue: 22000, color: '#3b82f6' },
  { name: 'WordPress Themes', revenue: 18000, color: '#8b5cf6' },
  { name: 'Other', revenue: 12000, color: '#6b7280' },
];

const topProducts = [
  { name: 'Nexus Dashboard', sales: 58, revenue: 3422 },
  { name: 'Prism UI Library', sales: 45, revenue: 3555 },
  { name: 'LaunchKit', sales: 32, revenue: 4768 },
  { name: 'IconFlow Icons', sales: 89, revenue: 3471 },
  { name: 'FlowChat AI', sales: 18, revenue: 3582 },
];

export default function AdminAnalytics() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Platform Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Comprehensive overview of platform performance</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Monthly Revenue', value: '$47,600', change: '+24.6%', icon: TrendingUp, color: 'emerald' },
            { label: 'New Users (June)', value: '687', change: '+31.8%', icon: Users, color: 'indigo' },
            { label: 'Products Listed', value: '46+', change: '+35.5%', icon: Package, color: 'blue' },
            { label: 'Avg Order Value', value: '$68.40', change: '+8.2%', icon: ShoppingBag, color: 'purple' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-${s.color}-50 dark:bg-${s.color}-900/20 flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 text-${s.color}-600`} />
                  </div>
                  <div className="flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" />{s.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Platform Revenue</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fill="url(#adminRevGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Revenue by Category</h3>
            <div className="space-y-3">
              {categoryRevenue.map(cat => (
                <div key={cat.name}>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>{cat.name}</span>
                    <span className="font-medium">${(cat.revenue / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${(cat.revenue / 42000) * 100}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Growth + Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">New Users Growth</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Performing Products</h3>
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.sales} sales</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 flex-shrink-0">${p.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
