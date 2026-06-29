import DashboardLayout from '@/layouts/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useProductStore } from '@/store/productStore';
import { Link } from 'react-router-dom';
import { Plus, Edit, Eye, Trash2, ExternalLink, Star, Download, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export default function SellerProducts() {
  const { user } = useAuthStore();
  const { products, deleteProduct } = useProductStore();

  if (!user) return null;

  const myProducts = products.filter(p => p.sellerId === user.id);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">My Products</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{myProducts.length} products listed</p>
          </div>
          <Link to="/dashboard/seller/upload" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Upload Product
          </Link>
        </div>

        {myProducts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">No products yet</h3>
            <Link to="/dashboard/seller/upload" className="btn-primary mt-4 inline-flex items-center gap-2"><Plus className="w-4 h-4" />Upload Your First Product</Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>{['Product', 'Category', 'Price', 'Sales', 'Rating', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {myProducts.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.thumbnail} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.category}</td>
                    <td className="px-4 py-3 font-semibold text-indigo-600">${p.price}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 flex items-center gap-1"><Download className="w-3.5 h-3.5" />{p.sales}</td>
                    <td className="px-4 py-3"><span className="flex items-center gap-1 text-amber-500 font-medium"><Star className="w-3.5 h-3.5 fill-current" />{p.rating}</span></td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link to={`/marketplace/product/${p.slug}`} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"><Eye className="w-4 h-4" /></Link>
                        <button onClick={() => toast.info('Edit feature coming soon!')} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => { deleteProduct(p.id); toast.success('Product deleted'); }} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
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
