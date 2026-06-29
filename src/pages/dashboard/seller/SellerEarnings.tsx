import DashboardLayout from '@/layouts/DashboardLayout';
import { DollarSign, TrendingUp, Download, Calendar, BarChart3, ArrowUpRight, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const monthlyData = [
  { month: 'Jan', earnings: 1200, sales: 18 },
  { month: 'Feb', earnings: 1800, sales: 26 },
  { month: 'Mar', earnings: 2400, sales: 34 },
  { month: 'Apr', earnings: 2100, sales: 29 },
  { month: 'May', earnings: 3200, sales: 45 },
  { month: 'Jun', earnings: 4100, sales: 58 },
];

const transactions = [
  { id: 't1', product: 'Nexus Dashboard', buyer: 'Sarah W.', amount: 47.20, date: '2024-06-14', status: 'paid' },
  { id: 't2', product: 'LaunchKit Boilerplate', buyer: 'Carlos M.', amount: 119.20, date: '2024-06-13', status: 'paid' },
  { id: 't3', product: 'DataVault Analytics', buyer: 'Emma L.', amount: 71.20, date: '2024-06-12', status: 'paid' },
  { id: 't4', product: 'Nexus Dashboard', buyer: 'James K.', amount: 47.20, date: '2024-06-11', status: 'paid' },
  { id: 't5', product: 'FlowChat AI', buyer: 'Priya P.', amount: 159.20, date: '2024-06-10', status: 'processing' },
];

export default function SellerEarnings() {
  const totalEarnings = 24680;
  const thisMonth = 4100;
  const pendingPayout = 1240;
  const totalSales = 1247;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Earnings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Track your revenue and payouts</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Earnings', value: `$${totalEarnings.toLocaleString()}`, sub: '+18% all time', icon: DollarSign, color: 'emerald' },
            { label: 'This Month', value: `$${thisMonth.toLocaleString()}`, sub: '+28% vs last month', icon: TrendingUp, color: 'indigo' },
            { label: 'Pending Payout', value: `$${pendingPayout.toLocaleString()}`, sub: 'Next: July 1st', icon: Clock, color: 'amber' },
            { label: 'Total Sales', value: totalSales.toLocaleString(), sub: '58 this month', icon: BarChart3, color: 'blue' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-${s.color}-50 dark:bg-${s.color}-900/20 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${s.color}-600`} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
                <p className="text-xs text-emerald-600 mt-0.5">{s.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Revenue Over Time</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => [`$${v}`, 'Earnings']} />
                <Area type="monotone" dataKey="earnings" stroke="#4f46e5" fill="url(#earningsGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {['Product', 'Buyer', 'Amount', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{t.buyer}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">${t.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{t.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${t.status === 'paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {t.status}
                      </span>
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
