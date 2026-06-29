import { useAuthStore } from '@/store/authStore';
import { useOrderStore } from '@/store/orderStore';
import { useProductStore } from '@/store/productStore';
import { Link } from 'react-router-dom';
import {
  DollarSign, Package, Download, Star, TrendingUp, ArrowRight,
  ArrowUpRight, BarChart2, Eye, Upload
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getRevenueByMonth } from '@/database/orders';

export default function SellerDashboard() {
  const { user } = useAuthStore();
  const { getSellerOrders } = useOrderStore();
  const { products } = useProductStore();

  if (!user) return null;

  const orders = getSellerOrders(user.id);
  const myProducts = products.filter(p => p.sellerId === user.id && p.status === 'active');
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const revenueData = getRevenueByMonth();

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, change: '+18%', color: 'emerald' },
    { label: 'Active Products', value: myProducts.length, icon: Package, change: '+2', color: 'indigo' },
    { label: 'Total Sales', value: orders.length, icon: Download, change: '+34', color: 'blue' },
    { label: 'Avg. Rating', value: '4.9', icon: Star, change: '+0.1', color: 'amber' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Seller Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your products, revenue, and customer activity.</p>
        </div>
        <Link to="/dashboard/seller/upload" className="btn-primary flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => {
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
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />{s.change} this month
              </p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white font-heading">Revenue Overview</h2>
          <div className="flex items-center gap-1 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" /> +24% vs last period
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(val) => [`$${val}`, 'Revenue']} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="revenue" fill="#4F46E5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* My Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white font-heading">My Products</h2>
          <Link to="/dashboard/seller/products" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          {myProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-4">No products yet</p>
              <Link to="/dashboard/seller/upload" className="btn-primary">Upload Your First Product</Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  {['Product', 'Price', 'Sales', 'Rating', 'Views'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {myProducts.slice(0, 5).map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.thumbnail} alt={p.title} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white truncate max-w-[180px]">{p.title}</p>
                          <p className="text-xs text-gray-400">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-indigo-600">${p.price}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{p.sales.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-amber-500 font-medium">
                        <Star className="w-3.5 h-3.5 fill-current" />{p.rating}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />{(p.sales * 8).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Upload Product', href: '/dashboard/seller/upload', icon: Upload },
          { label: 'View Earnings', href: '/dashboard/seller/earnings', icon: DollarSign },
          { label: 'Analytics', href: '/dashboard/seller/analytics', icon: BarChart2 },
          { label: 'All Products', href: '/dashboard/seller/products', icon: Package },
        ].map(a => {
          const Icon = a.icon;
          return (
            <Link key={a.href} to={a.href} className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all text-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{a.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
