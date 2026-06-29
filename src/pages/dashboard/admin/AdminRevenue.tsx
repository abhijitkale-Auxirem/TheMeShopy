import DashboardLayout from '@/layouts/DashboardLayout';
import { DollarSign, TrendingUp, Download, ArrowUpRight, BarChart3, Users, Package } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const monthlyRevenue = [
  { month: 'Jan', gross: 18400, net: 3680, payouts: 14720 },
  { month: 'Feb', gross: 24100, net: 4820, payouts: 19280 },
  { month: 'Mar', gross: 29800, net: 5960, payouts: 23840 },
  { month: 'Apr', gross: 26500, net: 5300, payouts: 21200 },
  { month: 'May', gross: 38200, net: 7640, payouts: 30560 },
  { month: 'Jun', gross: 47600, net: 9520, payouts: 38080 },
];

const sellerPayouts = [
  { seller: 'Alex Johnson', products: 8, sales: 1247, payout: 24680, commission: 6170 },
  { seller: 'Stella Rodriguez', products: 5, sales: 934, payout: 18900, commission: 4725 },
  { seller: 'David Kim', products: 6, sales: 620, payout: 12450, commission: 3112 },
  { seller: 'Priya Patel', products: 3, sales: 490, payout: 9870, commission: 2467 },
];

export default function AdminRevenue() {
  const totalGross = monthlyRevenue.reduce((s, m) => s + m.gross, 0);
  const totalNet = monthlyRevenue.reduce((s, m) => s + m.net, 0);
  const totalPayouts = monthlyRevenue.reduce((s, m) => s + m.payouts, 0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Revenue</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Platform revenue breakdown and seller payouts</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

        {/* Revenue KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Gross Revenue', value: `$${totalGross.toLocaleString()}`, sub: 'All 6 months', icon: DollarSign, color: 'indigo' },
            { label: 'Platform Commission (20%)', value: `$${totalNet.toLocaleString()}`, sub: 'Net earnings', icon: TrendingUp, color: 'emerald' },
            { label: 'Seller Payouts (80%)', value: `$${totalPayouts.toLocaleString()}`, sub: 'Paid to sellers', icon: Users, color: 'blue' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`bg-gradient-to-br from-${s.color}-50 to-white dark:from-${s.color}-900/20 dark:to-gray-800 border border-${s.color}-100 dark:border-${s.color}-800/30 rounded-xl p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-${s.color}-100 dark:bg-${s.color}-900/30 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${s.color}-600`} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                </div>
                <p className={`text-2xl font-bold text-${s.color}-700 dark:text-${s.color}-400 font-heading`}>{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Gross vs Net Revenue</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="grossGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                <Area type="monotone" dataKey="gross" stroke="#4f46e5" fill="url(#grossGrad)" strokeWidth={2} name="Gross" />
                <Area type="monotone" dataKey="net" stroke="#10b981" fill="none" strokeWidth={2} strokeDasharray="4 4" name="Net" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Monthly Payouts</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Payouts']} />
                <Bar dataKey="payouts" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seller Payout Breakdown */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Seller Payout Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {['Seller', 'Products', 'Total Sales', 'Payout (80%)', 'Commission (20%)'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {sellerPayouts.map(s => (
                  <tr key={s.seller} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{s.seller}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{s.products}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{s.sales.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">${s.payout.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">${s.commission.toLocaleString()}</td>
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
