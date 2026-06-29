import { useAuthStore } from '@/store/authStore';
import { useOrderStore } from '@/store/orderStore';
import { Link } from 'react-router-dom';
import { Building2, Users, Download, FileText, ShoppingBag, ArrowRight } from 'lucide-react';

export default function AgencyDashboard() {
  const { user } = useAuthStore();
  const { getUserOrders } = useOrderStore();
  if (!user) return null;
  const orders = getUserOrders(user.id);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Agency Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage team licenses, projects, and downloads.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Team Members', value: user.teamSize || 24, icon: Users },
          { label: 'Active Projects', value: 12, icon: Building2 },
          { label: 'Licenses', value: orders.length + 18, icon: FileText },
          { label: 'Downloads', value: orders.length + 87, icon: Download },
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
              <p className="text-3xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Projects', desc: 'Manage all client projects and assign licenses.', href: '/dashboard/agency/projects', icon: Building2 },
          { title: 'Team Licenses', desc: 'View and manage team-wide product licenses.', href: '/dashboard/agency/licenses', icon: FileText },
          { title: 'Downloads', desc: 'Access all purchased products and source files.', href: '/dashboard/agency/downloads', icon: Download },
        ].map(card => {
          const Icon = card.icon;
          return (
            <Link key={card.href} to={card.href} className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md hover:border-indigo-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{card.desc}</p>
              <div className="flex items-center gap-1 text-sm text-indigo-600 font-medium">
                Open <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="font-bold text-xl mb-2">Need More Seats?</h3>
        <p className="text-white/80 mb-4">Upgrade to Enterprise for unlimited team members, compliance tools, and priority support.</p>
        <Link to="/enterprise" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm">
          Upgrade to Enterprise <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 dark:text-white">Recent Purchases</h2>
          <Link to="/dashboard/agency/downloads" className="text-sm text-indigo-600 font-medium">View all</Link>
        </div>
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-4">No purchases yet</p>
            <Link to="/marketplace" className="btn-primary">Browse Marketplace</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                <img src={o.productThumbnail} alt={o.productTitle} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{o.productTitle}</p>
                  <p className="text-xs text-gray-500 mt-0.5 capitalize">{o.license} License · {new Date(o.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="font-bold text-indigo-600">${o.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
