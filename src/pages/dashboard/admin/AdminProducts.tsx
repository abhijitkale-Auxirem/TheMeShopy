import DashboardLayout from '@/layouts/DashboardLayout';
import { Package, Search, Eye, CheckCircle, XCircle, Star, TrendingUp, Filter } from 'lucide-react';
import { useState } from 'react';
import { mockProducts } from '@/database/mockDb';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  const categories = [...new Set(mockProducts.map(p => p.category))];
  const filtered = mockProducts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.sellerName.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || p.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Products</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Review and manage all marketplace products</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: mockProducts.length },
            { label: 'Active', value: mockProducts.filter(p => p.status === 'active').length },
            { label: 'Featured', value: mockProducts.filter(p => p.isFeatured).length },
            { label: 'On Sale', value: mockProducts.filter(p => p.isOnSale).length },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none">
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {['Product', 'Seller', 'Category', 'Price', 'Sales', 'Rating', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.slice(0, 16).map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.thumbnail} alt={product.title} className="w-12 h-9 rounded-lg object-cover" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <img src={product.sellerAvatar} alt={product.sellerName} className="w-6 h-6 rounded-full" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{product.sellerName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">{product.category}</span></td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">${product.price}</td>
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">{product.sales.toLocaleString()}</td>
                    <td className="px-5 py-4"><div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span className="text-sm">{product.rating}</span></div></td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {product.isFeatured && <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-1.5 py-0.5 rounded">Featured</span>}
                        {product.isOnSale && <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded">Sale</span>}
                        <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded">Active</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><XCircle className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
