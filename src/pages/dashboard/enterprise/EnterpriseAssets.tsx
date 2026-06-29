import DashboardLayout from '@/layouts/DashboardLayout';
import { Layers, Search, Filter, Download, Grid, List, Package, Star, Tag, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const assets = [
  { id: 'a1', name: 'Nexus Dashboard', category: 'Admin Templates', type: 'React', version: '3.2.1', assignedTeams: ['Engineering', 'Design'], rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=300&h=200&fit=crop', tags: ['react', 'dashboard', 'typescript'], usageCount: 12, lastUsed: '2024-06-14' },
  { id: 'a2', name: 'Prism UI Library', category: 'UI Kits', type: 'React', version: '5.0.2', assignedTeams: ['Design', 'Engineering'], rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=200&fit=crop', tags: ['ui-kit', 'figma', 'components'], usageCount: 24, lastUsed: '2024-06-12' },
  { id: 'a3', name: 'LaunchKit Boilerplate', category: 'SaaS Boilerplates', type: 'Next.js', version: '2.3.0', assignedTeams: ['Engineering'], rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&h=200&fit=crop', tags: ['saas', 'nextjs', 'stripe'], usageCount: 5, lastUsed: '2024-06-10' },
  { id: 'a4', name: 'IconFlow Icons', category: 'Design Assets', type: 'SVG', version: '7.0.0', assignedTeams: ['Design', 'Marketing'], rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=200&fit=crop', tags: ['icons', 'svg', 'figma'], usageCount: 87, lastUsed: '2024-06-14' },
  { id: 'a5', name: 'DataVault Analytics', category: 'Admin Templates', type: 'React', version: '2.1.0', assignedTeams: ['Product', 'Engineering'], rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop', tags: ['analytics', 'charts', 'dashboard'], usageCount: 8, lastUsed: '2024-06-08' },
  { id: 'a6', name: 'Aurora Landing Kit', category: 'Landing Pages', type: 'React', version: '2.0.0', assignedTeams: ['Marketing'], rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop', tags: ['landing', 'marketing', 'animation'], usageCount: 6, lastUsed: '2024-05-28' },
];

export default function EnterpriseAssets() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [category, setCategory] = useState('all');

  const categories = [...new Set(assets.map(a => a.category))];
  const filtered = assets.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || a.category === category;
    return matchSearch && matchCat;
  });

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Asset Library</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Enterprise-wide digital asset repository</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500'}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Assets', value: assets.length },
            { label: 'Categories', value: categories.length },
            { label: 'Total Usage', value: assets.reduce((s, a) => s + a.usageCount, 0) },
            { label: 'Avg Rating', value: (assets.reduce((s, a) => s + a.rating, 0) / assets.length).toFixed(1) },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search assets..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Assets */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(asset => (
              <div key={asset.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={asset.thumbnail} alt={asset.name} className="w-full h-36 object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <span className="absolute top-2 right-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded font-mono">v{asset.version}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{asset.name}</h3>
                  <p className="text-xs text-indigo-600 mb-2">{asset.category}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {asset.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{asset.rating}</div>
                      <span>Used {asset.usageCount}x</span>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700">
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {['Asset', 'Category', 'Type', 'Version', 'Usage', 'Rating', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(asset => (
                  <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={asset.thumbnail} alt={asset.name} className="w-10 h-8 rounded object-cover" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{asset.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{asset.category}</td>
                    <td className="px-5 py-3"><span className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 px-2 py-0.5 rounded">{asset.type}</span></td>
                    <td className="px-5 py-3 text-xs font-mono text-gray-500 dark:text-gray-400">v{asset.version}</td>
                    <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{asset.usageCount}x</td>
                    <td className="px-5 py-3"><div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span className="text-sm">{asset.rating}</span></div></td>
                    <td className="px-5 py-3"><button className="p-1.5 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg"><Download className="w-4 h-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
