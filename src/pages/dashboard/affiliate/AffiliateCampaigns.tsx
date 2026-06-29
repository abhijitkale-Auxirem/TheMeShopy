import DashboardLayout from '@/layouts/DashboardLayout';
import { Megaphone, Plus, TrendingUp, Eye, MousePointer, DollarSign, MoreVertical, Edit2, Trash2, Play, Pause } from 'lucide-react';
import { useState } from 'react';

const campaigns = [
  { id: 'camp_1', name: 'Summer Sale 2024', code: 'SUMMER30', discount: '30% OFF', clicks: 2340, conversions: 87, revenue: 1508.60, status: 'active', created: '2024-06-01', expires: '2024-07-31' },
  { id: 'camp_2', name: 'Developer Tools Promo', code: 'DEVTOOLS', discount: '20% OFF', clicks: 1250, conversions: 45, revenue: 781.50, status: 'active', created: '2024-05-15', expires: '2024-08-15' },
  { id: 'camp_3', name: 'SaaS Starter Pack', code: 'SAAS20', discount: '20% OFF', clicks: 890, conversions: 28, revenue: 486.40, status: 'paused', created: '2024-04-01', expires: '2024-09-01' },
  { id: 'camp_4', name: 'Spring Launch', code: 'SPRING25', discount: '25% OFF', clicks: 3120, conversions: 134, revenue: 2325.60, status: 'expired', created: '2024-03-01', expires: '2024-05-31' },
];

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  paused: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  expired: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

export default function AffiliateCampaigns() {
  const [showNew, setShowNew] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Campaigns</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Create and manage your promotional campaigns</p>
          </div>
          <button
            onClick={() => setShowNew(!showNew)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>

        {/* New Campaign Form */}
        {showNew && (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Create New Campaign</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Campaign Name</label>
                <input type="text" placeholder="e.g., Summer Sale 2024" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Promo Code</label>
                <input type="text" placeholder="e.g., SUMMER30" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Discount Type</label>
                <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Percentage Discount</option>
                  <option>Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Discount Value</label>
                <input type="number" placeholder="30" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">Create Campaign</button>
              <button onClick={() => setShowNew(false)} className="px-4 py-2 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Cancel</button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Campaigns', value: campaigns.length, icon: Megaphone },
            { label: 'Total Clicks', value: campaigns.reduce((s, c) => s + c.clicks, 0).toLocaleString(), icon: MousePointer },
            { label: 'Conversions', value: campaigns.reduce((s, c) => s + c.conversions, 0), icon: TrendingUp },
            { label: 'Total Revenue', value: `$${campaigns.reduce((s, c) => s + c.revenue, 0).toFixed(0)}`, icon: DollarSign },
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

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {campaigns.map(camp => (
            <div key={camp.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{camp.name}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <code className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded font-mono">{camp.code}</code>
                    <span className="text-xs text-indigo-600 font-medium">{camp.discount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[camp.status]}`}>{camp.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Clicks', value: camp.clicks.toLocaleString(), icon: MousePointer },
                  { label: 'Conversions', value: camp.conversions, icon: TrendingUp },
                  { label: 'Revenue', value: `$${camp.revenue.toFixed(0)}`, icon: DollarSign },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{s.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Expires: {camp.expires}</span>
                <div className="flex gap-2">
                  {camp.status === 'active' ? (
                    <button className="flex items-center gap-1 text-amber-500 hover:text-amber-600"><Pause className="w-3.5 h-3.5" /> Pause</button>
                  ) : camp.status === 'paused' ? (
                    <button className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700"><Play className="w-3.5 h-3.5" /> Resume</button>
                  ) : null}
                  <button className="flex items-center gap-1 text-gray-400 hover:text-indigo-600"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
