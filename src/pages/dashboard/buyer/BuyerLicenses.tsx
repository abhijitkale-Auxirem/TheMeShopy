import DashboardLayout from '@/layouts/DashboardLayout';
import { FileText, Download, Shield, Calendar, ExternalLink, Search, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const licenses = [
  { id: 'lic_1', productName: 'Nexus - Modern SaaS Dashboard', productThumb: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=80&h=60&fit=crop', licenseKey: 'NXS-A1B2-C3D4-E5F6', type: 'Regular', purchaseDate: '2024-06-10', expiresAt: 'Lifetime', uses: 1, maxUses: 1, status: 'active' },
  { id: 'lic_2', productName: 'Prism UI - React Component Library', productThumb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=80&h=60&fit=crop', licenseKey: 'PRM-G7H8-I9J0-K1L2', type: 'Regular', purchaseDate: '2024-05-28', expiresAt: 'Lifetime', uses: 1, maxUses: 1, status: 'active' },
  { id: 'lic_3', productName: 'IconFlow - 5000+ SVG Icons Pack', productThumb: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=80&h=60&fit=crop', licenseKey: 'ICF-M3N4-O5P6-Q7R8', type: 'Extended', purchaseDate: '2024-05-14', expiresAt: 'Lifetime', uses: 3, maxUses: 'Unlimited', status: 'active' },
  { id: 'lic_4', productName: 'Aurora - Landing Page Kit', productThumb: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=80&h=60&fit=crop', licenseKey: 'AUR-S9T0-U1V2-W3X4', type: 'Regular', purchaseDate: '2024-04-20', expiresAt: 'Lifetime', uses: 1, maxUses: 1, status: 'active' },
];

export default function BuyerLicenses() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const filtered = licenses.filter(l =>
    l.productName.toLowerCase().includes(search.toLowerCase()) ||
    l.licenseKey.includes(search.toUpperCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">My Licenses</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and view your product license keys</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Licenses', value: licenses.filter(l => l.status === 'active').length, icon: Shield, color: 'emerald' },
            { label: 'Regular Licenses', value: licenses.filter(l => l.type === 'Regular').length, icon: FileText, color: 'indigo' },
            { label: 'Extended Licenses', value: licenses.filter(l => l.type === 'Extended').length, icon: Calendar, color: 'purple' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-${s.color}-50 dark:bg-${s.color}-900/20 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${s.color}-600`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search licenses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* License Cards */}
        <div className="space-y-4">
          {filtered.map(lic => (
            <div key={lic.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <img src={lic.productThumb} alt={lic.productName} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{lic.productName}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${lic.type === 'Extended' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'}`}>{lic.type} License</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 capitalize">{lic.status}</span>
                  </div>

                  {/* License Key */}
                  <div className="flex items-center gap-2 mb-3">
                    <code className="flex-1 text-xs font-mono bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
                      {lic.licenseKey}
                    </code>
                    <button
                      onClick={() => handleCopy(lic.licenseKey, lic.id)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors flex-shrink-0"
                    >
                      {copied === lic.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>Purchased: {lic.purchaseDate}</span>
                    <span>Expires: {lic.expiresAt}</span>
                    <span>Uses: {lic.uses}/{lic.maxUses}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 dark:border-indigo-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                    <Download className="w-3 h-3" /> Download
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <ExternalLink className="w-3 h-3" /> View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* License Terms Info */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-300">About Licenses</p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5 leading-relaxed">
                Regular License allows use in one end product. Extended License allows unlimited commercial use. All licenses are lifetime and include free updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
