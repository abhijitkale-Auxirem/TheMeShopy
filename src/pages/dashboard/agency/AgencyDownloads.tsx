import DashboardLayout from '@/layouts/DashboardLayout';
import { Download, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const downloads = [
  { id: 'd1', product: 'Nexus - Modern SaaS Dashboard', project: 'FinanceFlow SaaS App', version: '3.2.1', downloadedBy: 'Alice Johnson', downloadedAt: '2024-06-14', size: '12.4 MB', format: 'ZIP' },
  { id: 'd2', product: 'Prism UI - Component Library', project: 'HealthCare Portal', version: '5.0.2', downloadedBy: 'Bob Smith', downloadedAt: '2024-06-12', size: '28.7 MB', format: 'ZIP' },
  { id: 'd3', product: 'LaunchKit - SaaS Boilerplate', project: 'FinanceFlow SaaS App', version: '2.3.0', downloadedBy: 'Alice Johnson', downloadedAt: '2024-06-10', size: '45.2 MB', format: 'ZIP' },
  { id: 'd4', product: 'IconFlow - SVG Icons Pack', project: 'E-Commerce Platform', version: '7.0.0', downloadedBy: 'Carol White', downloadedAt: '2024-06-08', size: '89.1 MB', format: 'ZIP' },
  { id: 'd5', product: 'Nexus - Modern SaaS Dashboard', project: 'Agency Portfolio', version: '3.2.1', downloadedBy: 'David Lee', downloadedAt: '2024-06-05', size: '12.4 MB', format: 'ZIP' },
  { id: 'd6', product: 'Prism UI - Component Library', project: 'FinanceFlow SaaS App', version: '5.0.2', downloadedBy: 'Eve Martinez', downloadedAt: '2024-06-01', size: '28.7 MB', format: 'ZIP' },
];

export default function AgencyDownloads() {
  const [search, setSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');

  const projects = [...new Set(downloads.map(d => d.project))];
  
  const filtered = downloads.filter(d => {
    const matchSearch = d.product.toLowerCase().includes(search.toLowerCase()) || d.downloadedBy.toLowerCase().includes(search.toLowerCase());
    const matchProject = projectFilter === 'all' || d.project === projectFilter;
    return matchSearch && matchProject;
  });

  const handleDownload = (product: string, project: string) => {
    toast.success(`Downloading package: ${product} (${project})`);
    const element = document.createElement('a');
    const file = new Blob(['Demo Source Code'], {type: 'application/zip'});
    element.href = URL.createObjectURL(file);
    element.download = `${product.toLowerCase().replace(/[^a-z0-9]+/g, '-')}_package.zip`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExport = () => {
    if (filtered.length === 0) {
      toast.error('No download log entries to export');
      return;
    }
    const headers = ['Product', 'Project', 'Downloaded By', 'Version', 'Date', 'Size'];
    const csvRows = [headers.join(',')];
    for (const d of filtered) {
      csvRows.push([
        `"${d.product}"`,
        `"${d.project}"`,
        `"${d.downloadedBy}"`,
        `"v${d.version}"`,
        `"${d.downloadedAt}"`,
        `"${d.size}"`
      ].join(','));
    }
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "agency_downloads_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Agency downloads log exported to CSV successfully!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Downloads</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Track all team downloads across projects</p>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" /> Export Log
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Downloads', value: downloads.length },
            { label: 'Unique Products', value: new Set(downloads.map(d => d.product)).size },
            { label: 'Active Projects', value: projects.length },
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
            <input type="text" placeholder="Search downloads..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={projectFilter} onChange={e => setProjectFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="all">All Projects</option>
            {projects.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  {['Product', 'Project', 'Downloaded By', 'Version', 'Date', 'Size', 'Action'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">{d.product}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full">{d.project}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">{d.downloadedBy}</td>
                    <td className="px-5 py-4 text-xs font-mono text-gray-500 dark:text-gray-400">v{d.version}</td>
                    <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{d.downloadedAt}</td>
                    <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{d.size}</td>
                    <td className="px-5 py-4">
                      <button 
                        onClick={() => handleDownload(d.product, d.project)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-xs text-gray-400">
              No matching team download entries found.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
