import { useAuthStore } from '@/store/authStore';
import { Link } from 'react-router-dom';
import { DollarSign, Users, TrendingUp, Share2, ArrowUpRight, Copy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const referralData = [
  { month: 'Jan', referrals: 12, earnings: 340 },
  { month: 'Feb', referrals: 19, earnings: 520 },
  { month: 'Mar', referrals: 15, earnings: 430 },
  { month: 'Apr', referrals: 24, earnings: 680 },
  { month: 'May', referrals: 31, earnings: 890 },
  { month: 'Jun', referrals: 28, earnings: 760 },
];

const recentReferrals = [
  { name: 'Alex K.', product: 'Nexus Dashboard', amount: 59, commission: 17.70, date: '2024-06-12' },
  { name: 'Maria S.', product: 'Prism UI Kit', amount: 79, commission: 23.70, date: '2024-06-10' },
  { name: 'David L.', product: 'LaunchKit', amount: 149, commission: 44.70, date: '2024-06-08' },
  { name: 'Emma R.', product: 'Aurora Landing', amount: 29, commission: 8.70, date: '2024-06-05' },
];

export default function AffiliateDashboard() {
  const { user } = useAuthStore();
  if (!user) return null;

  const referralLink = `https://themeshopy.com/ref/${user.referralCode || 'MIKE20'}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied!');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Affiliate Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track your referrals and commissions.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Earnings', value: '$3,420', icon: DollarSign, change: '+$890' },
          { label: 'Pending Payout', value: '$760', icon: TrendingUp, change: 'Payout due' },
          { label: 'Total Referrals', value: '129', icon: Users, change: '+28 this month' },
          { label: 'Commission Rate', value: '30%', icon: Share2, change: 'Your rate' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stats-card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Referral Link */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="font-bold mb-1">Your Referral Link</h3>
        <p className="text-white/80 text-sm mb-4">Share this link and earn 30% commission on every sale.</p>
        <div className="flex gap-2">
          <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2.5 text-sm font-mono text-white/90 truncate">
            {referralLink}
          </div>
          <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4">Referrals & Earnings</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={referralData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
            <Bar dataKey="referrals" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Referrals" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-white">Recent Referrals</h2>
          <Link to="/dashboard/affiliate/referrals" className="text-sm text-indigo-600 font-medium">View all</Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>{['Customer', 'Product', 'Sale Amount', 'Commission', 'Date'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentReferrals.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{r.name}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{r.product}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">${r.amount}</td>
                <td className="px-4 py-3 font-semibold text-emerald-600">+${r.commission}</td>
                <td className="px-4 py-3 text-gray-500">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
