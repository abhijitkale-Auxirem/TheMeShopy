import DashboardLayout from '@/layouts/DashboardLayout';
import { FolderOpen, Plus, Users, Calendar, Package, ExternalLink, Search, X, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const initialProjects = [
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
  const [projectList, setProjectList] = useState(initialProjects);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showNew, setShowNew] = useState(false);
  const [viewingProject, setViewingProject] = useState<typeof initialProjects[0] | null>(null);

  // New Project Fields
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newBudget, setNewBudget] = useState('10000');
  const [newTeam, setNewTeam] = useState('3');
  const [newProducts, setNewProducts] = useState('2');
  const [newDeadline, setNewDeadline] = useState('2024-09-30');

  const filtered = projectList.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newClient.trim()) {
      toast.error('Please enter the project name and client info');
      return;
    }
    const newProj = {
      id: `proj_${Date.now()}`,
      name: newName,
      client: newClient,
      team: parseInt(newTeam) || 3,
      products: parseInt(newProducts) || 2,
      status: 'active',
      deadline: newDeadline,
      budget: parseInt(newBudget) || 10000,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop'
    };

    setProjectList(prev => [newProj, ...prev]);
    setShowNew(false);
    setNewName('');
    setNewClient('');
    setNewBudget('10000');
    setNewTeam('3');
    setNewProducts('2');
    setNewDeadline('2024-09-30');
    toast.success('Project created successfully!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Projects</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage client projects and assigned digital assets</p>
          </div>
          <button 
            onClick={() => setShowNew(!showNew)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>

        {/* New Project Form */}
        {showNew && (
          <form onSubmit={handleCreateProject} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mb-8 shadow-xs">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Create New Project</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Project Name</label>
                <input required type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g., FinanceFlow App" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Client Company</label>
                <input required type="text" value={newClient} onChange={e => setNewClient(e.target.value)} placeholder="e.g., FinanceFlow Inc." className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Budget ($)</label>
                <input required type="number" value={newBudget} onChange={e => setNewBudget(e.target.value)} placeholder="12500" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Team Size</label>
                <input required type="number" min="1" value={newTeam} onChange={e => setNewTeam(e.target.value)} placeholder="5" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Assigned Templates Count</label>
                <input required type="number" min="0" value={newProducts} onChange={e => setNewProducts(e.target.value)} placeholder="4" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Project Deadline</label>
                <input required type="date" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-750 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-4 text-xs font-semibold">
              <button type="submit" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm">Create Project</button>
              <button type="button" onClick={() => setShowNew(false)} className="px-4 py-2.5 text-gray-650 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Cancel</button>
            </div>
          </form>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Projects', value: projectList.length },
            { label: 'Active', value: projectList.filter(p => p.status === 'active').length },
            { label: 'Total Products Used', value: projectList.reduce((s, p) => s + p.products, 0) },
            { label: 'Budget Managed', value: `$${(projectList.reduce((s, p) => s + p.budget, 0) / 1000).toFixed(0)}k` },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-xs">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="planning">Planning</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(proj => (
            <div key={proj.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow group shadow-xs">
              <div className="relative">
                <img src={proj.thumbnail} alt={proj.name} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${statusColors[proj.status]}`}>{proj.status}</span>
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
                  <button 
                    onClick={() => setViewingProject(proj)}
                    className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:text-indigo-700 border border-transparent hover:border-indigo-100 px-2 py-1 rounded-lg transition-colors"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {viewingProject && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-750 rounded-2xl p-6 max-w-md w-full relative shadow-xl">
            <button 
              onClick={() => setViewingProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <FolderOpen className="w-6 h-6 text-indigo-655" />
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">Project Workspace</h3>
                <p className="text-xs text-gray-400">Client Account: {viewingProject.client}</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Project Name:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{viewingProject.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Assigned Team Size:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{viewingProject.team} Devs / Designers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Digital Assets Used:</span>
                <span className="font-semibold text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/10 px-1.5 py-0.5 rounded text-[10px]">{viewingProject.products} Products Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Allocated Budget:</span>
                <span className="font-bold text-indigo-650">${viewingProject.budget.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Milestone Deadline:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{viewingProject.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Project Status:</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${statusColors[viewingProject.status]}`}>{viewingProject.status}</span>
              </div>
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700 leading-relaxed text-[11px] text-gray-500">
                This project integrates active theme and template subscriptions purchased from TheMeShopy. All seat activations correspond to licensing parameters under compliance terms.
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setViewingProject(null)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-250 dark:bg-gray-700 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
