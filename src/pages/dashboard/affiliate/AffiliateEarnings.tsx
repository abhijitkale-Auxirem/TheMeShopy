import DashboardLayout from '@/layouts/DashboardLayout';
import { DollarSign, Clock, TrendingUp, CheckCircle, Download, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jan', earnings: 120 },
  { month: 'Feb', earnings: 280 },
  { month: 'Mar', earnings: 420 },
  { month: 'Apr', earnings: 310 },
  { month: 'May', earnings: 590 },
  { month: 'Jun', earnings: 780 },
];

const payouts = [
  { id: 'p1', amount: 500, date: '2024-05-31', method: 'PayPal', status: 'paid', period: 'May 2024' },
  { id: 'p2', amount: 380, date: '2024-04-30', method: 'PayPal', status: 'paid', period: 'Apr 2024' },
  { id: 'p3', amount: 290, date: '2024-03-31', method: 'Bank Transfer', status: 'paid', period: 'Mar 2024' },
  { id: 'p4', amount: 780, date: '2024-07-01', method: 'PayPal', status: 'pending', period: 'Jun 2024' },
];

export default function AffiliateEarnings() {
  const totalEarned = 3420;
  const thisMonth = 780;
  const pendingPayout = 780;
  const commissionRate = 30;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Affiliate Earnings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Track your affiliate commissions and payouts</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Earned', value: `$${totalEarned.toLocaleString()}`, icon: DollarSign, color: 'emerald' },
            { label: 'This Month', value: `$${thisMonth}`, icon: TrendingUp, color: 'indigo' },
            { label: 'Pending Payout', value: `$${pendingPayout}`, icon: Clock, color: 'amber' },
            { label: 'Commission Rate', value: `${commissionRate}%`, icon: CheckCircle, color: 'blue' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                <div className={`w-10 h-10 rounded-xl bg-${s.color}-50 dark:bg-${s.color}-900/20 flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 text-${s.color}-600`} />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Earnings Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="affGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => [`$${v}`, 'Earnings']} />
              <Area type="monotone" dataKey="earnings" stroke="#10b981" fill="url(#affGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Payout History */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Payout History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {['Period', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {payouts.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{p.period}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">${p.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{p.method}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{p.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.status === 'paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {p.status}
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
