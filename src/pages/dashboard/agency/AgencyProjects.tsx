import DashboardLayout from '@/layouts/DashboardLayout';
import { FolderOpen, Plus, Users, Calendar, Package, ExternalLink, MoreVertical, Search } from 'lucide-react';
import { useState } from 'react';

const projects = [
  { id: 'proj_1', name: 'FinanceFlow SaaS App', client: 'FinanceFlow Inc.', team: 5, products: 4, status: 'active', deadline: '2024-08-15', budget: 12500, thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop' },
  { id: 'proj_2', name: 'HealthCare Portal', client: 'MedTech Solutions', team: 3, products: 2, status: 'active', deadline: '2024-07-30', budget: 8200, thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=200&h=120&fit=crop' },
  { id: 'proj_3', name: 'E-Commerce Platform', client: 'ShopPlus Ltd.', team: 7, products: 6, status: 'completed', deadline: '2024-05-31', budget: 24000, thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=200&h=120&fit=crop' },
  { id: 'proj_4', name: 'Corporate Website', client: 'TechCorp Global', team: 2, products: 1, status: 'planning', deadline: '2024-09-01', budget: 5500, thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=200&h=120&fit=crop' },
  { id: 'proj_5', name: 'Agency Portfolio', client: 'Internal', team: 4, products: 3, status: 'active', deadline: '2024-07-15', budget: 9800, thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&h=120&fit=crop' },
];

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  planning: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  completed: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

export default function AgencyProjects() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Projects</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage client projects and assigned digital assets</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Projects', value: projects.length },
            { label: 'Active', value: projects.filter(p => p.status === 'active').length },
            { label: 'Total Products Used', value: projects.reduce((s, p) => s + p.products, 0) },
            { label: 'Budget Managed', value: `$${(projects.reduce((s, p) => s + p.budget, 0) / 1000).toFixed(0)}k` },
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
            <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="planning">Planning</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(proj => (
            <div key={proj.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative">
                <img src={proj.thumbnail} alt={proj.name} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${statusColors[proj.status]}`}>{proj.status}</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{proj.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{proj.client}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{proj.team} members</div>
                  <div className="flex items-center gap-1"><Package className="w-3.5 h-3.5" />{proj.products} products</div>
                  <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{proj.deadline}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">${proj.budget.toLocaleString()}</span>
                  <button className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium hover:text-indigo-700">
                    View <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
