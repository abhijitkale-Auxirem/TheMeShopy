import DashboardLayout from '@/layouts/DashboardLayout';
import { Share2, Link as LinkIcon, Users, DollarSign, TrendingUp, Copy, Check, Search, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

const referrals = [
  { id: 'r1', name: 'John Smith', email: 'john@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-06-10', purchases: 2, commission: 34.40, status: 'active' },
  { id: 'r2', name: 'Emily Clark', email: 'emily@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-05-28', purchases: 1, commission: 17.40, status: 'active' },
  { id: 'r3', name: 'Marcus Brown', email: 'marcus@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-05-15', purchases: 3, commission: 62.70, status: 'active' },
  { id: 'r4', name: 'Nina Patel', email: 'nina@example.com', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-04-20', purchases: 0, commission: 0, status: 'pending' },
  { id: 'r5', name: 'David Lee', email: 'david@example.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face', joinedAt: '2024-04-05', purchases: 4, commission: 89.20, status: 'active' },
];

export default function AffiliateReferrals() {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');

  const refCode = user?.referralCode || 'MIKE20';
  const refLink = `https://themeshopy.com/register?ref=${refCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = referrals.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalCommission = referrals.reduce((s, r) => s + r.commission, 0);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Referrals</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your referrals and manage your affiliate links</p>
        </div>

        {/* Referral Link */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Share2 className="w-5 h-5" />
            <h3 className="font-semibold">Your Referral Link</h3>
          </div>
          <p className="text-white/80 text-sm mb-4">Share this link and earn 30% commission on every sale</p>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2.5">
              <LinkIcon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm truncate">{refLink}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Referrals', value: referrals.length, icon: Users },
            { label: 'Active Referrals', value: referrals.filter(r => r.status === 'active').length, icon: TrendingUp },
            { label: 'Total Purchases', value: referrals.reduce((s, r) => s + r.purchases, 0), icon: Share2 },
            { label: 'Total Commission', value: `$${totalCommission.toFixed(2)}`, icon: DollarSign },
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

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search referrals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Referrals Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  {['User', 'Joined', 'Purchases', 'Commission', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{r.name}</p>
                          <p className="text-xs text-gray-400">{r.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{r.joinedAt}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.purchases}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">${r.commission.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${r.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {r.status}
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
