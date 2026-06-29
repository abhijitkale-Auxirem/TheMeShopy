import DashboardLayout from '@/layouts/DashboardLayout';
import { Megaphone, Plus, TrendingUp, MousePointer, DollarSign, Edit2, Play, Pause, X, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const initialCampaigns = [
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
  const [campaignList, setCampaignList] = useState(initialCampaigns);
  const [showNew, setShowNew] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<typeof initialCampaigns[0] | null>(null);

  // New Campaign Fields
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newDiscountVal, setNewDiscountVal] = useState('30');

  // Edit Campaign Fields
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [editDiscount, setEditDiscount] = useState('');

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'paused' : 'active';
    setCampaignList(prev => prev.map(c => c.id === id ? { ...c, status: nextStatus } : c));
    toast.success(`Campaign successfully ${nextStatus === 'paused' ? 'paused' : 'resumed'}!`);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) {
      toast.error('Please enter campaign name and promo code');
      return;
    }
    const newCamp = {
      id: `camp_${Date.now()}`,
      name: newName,
      code: newCode.toUpperCase(),
      discount: `${newDiscountVal}% OFF`,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      status: 'active',
      created: new Date().toISOString().split('T')[0],
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 Days expiration
    };
    setCampaignList(prev => [newCamp, ...prev]);
    setShowNew(false);
    setNewName('');
    setNewCode('');
    setNewDiscountVal('30');
    toast.success('Campaign created successfully!');
  };

  const handleStartEdit = (camp: typeof initialCampaigns[0]) => {
    setEditingCampaign(camp);
    setEditName(camp.name);
    setEditCode(camp.code);
    setEditDiscount(camp.discount);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;
    setCampaignList(prev => prev.map(c => c.id === editingCampaign.id ? {
      ...c,
      name: editName,
      code: editCode.toUpperCase(),
      discount: editDiscount
    } : c));
    setEditingCampaign(null);
    toast.success('Campaign updated successfully!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Campaigns</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Create and manage your promotional campaigns</p>
          </div>
          <button
            onClick={() => setShowNew(!showNew)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>

        {/* New Campaign Form */}
        {showNew && (
          <form onSubmit={handleCreateCampaign} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mb-8 shadow-xs">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Create New Campaign</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Campaign Name</label>
                <input required type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g., Summer Sale 2024" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Promo Code</label>
                <input required type="text" value={newCode} onChange={e => setNewCode(e.target.value)} placeholder="e.g., SUMMER30" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Discount Type</label>
                <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Percentage Discount</option>
                  <option>Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Discount Value (%)</label>
                <input required type="number" min="1" max="100" value={newDiscountVal} onChange={e => setNewDiscountVal(e.target.value)} placeholder="30" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-4 text-xs font-semibold">
              <button type="submit" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm">Create Campaign</button>
              <button type="button" onClick={() => setShowNew(false)} className="px-4 py-2.5 text-gray-650 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Cancel</button>
            </div>
          </form>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Campaigns', value: campaignList.length, icon: Megaphone },
            { label: 'Total Clicks', value: campaignList.reduce((s, c) => s + c.clicks, 0).toLocaleString(), icon: MousePointer },
            { label: 'Conversions', value: campaignList.reduce((s, c) => s + c.conversions, 0), icon: TrendingUp },
            { label: 'Total Revenue', value: `$${campaignList.reduce((s, c) => s + c.revenue, 0).toFixed(0)}`, icon: DollarSign },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-xs">
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
          {campaignList.map(camp => (
            <div key={camp.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-xs">
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
                    <button 
                      onClick={() => handleToggleStatus(camp.id, camp.status)}
                      className="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-semibold"
                    >
                      <Pause className="w-3.5 h-3.5" /> Pause
                    </button>
                  ) : camp.status === 'paused' ? (
                    <button 
                      onClick={() => handleToggleStatus(camp.id, camp.status)}
                      className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      <Play className="w-3.5 h-3.5" /> Resume
                    </button>
                  ) : null}
                  <button 
                    onClick={() => handleStartEdit(camp)}
                    className="flex items-center gap-1 text-gray-405 hover:text-indigo-650 font-semibold"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Campaign Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-750 rounded-2xl p-6 max-w-md w-full relative shadow-xl">
            <button 
              onClick={() => setEditingCampaign(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading mb-1">Edit Campaign</h3>
            <p className="text-xs text-gray-500 mb-4">Modify campaign settings for <strong>{editingCampaign.name}</strong></p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Campaign Name</label>
                <input 
                  type="text" 
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Promo Code</label>
                <input 
                  type="text" 
                  required
                  value={editCode}
                  onChange={e => setEditCode(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Discount Offer text</label>
                <input 
                  type="text" 
                  required
                  value={editDiscount}
                  onChange={e => setEditDiscount(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 text-xs font-semibold pt-2">
                <button 
                  type="button"
                  onClick={() => setEditingCampaign(null)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-250 dark:bg-gray-700 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
