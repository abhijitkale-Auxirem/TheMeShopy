import DashboardLayout from '@/layouts/DashboardLayout';
import { Package, Search, Eye, CheckCircle, XCircle, Star, Trash2, Download, FileText, X } from 'lucide-react';
import { useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminProducts() {
  const { products, updateProduct, deleteProduct } = useProductStore();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const categories = [...new Set(products.map(p => p.category))];
  
  const filtered = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.sellerName.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleExportCSV = () => {
    const csvRows = [
      ['ID', 'Title', 'Seller', 'Category', 'Price ($)', 'Sales', 'Rating', 'Status'],
      ...filtered.map(p => [
        p.id,
        p.title,
        p.sellerName,
        p.category,
        p.price,
        p.sales,
        p.rating,
        p.status
      ])
    ];
    const csvContent = "data:text/csv;charset=utf-8," 
      + csvRows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "platform_products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Products list exported to Excel (CSV) successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Products</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Review and manage all marketplace products</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Export CSV (Excel)
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" /> Export PDF (Print)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 print:hidden">
          {[
            { label: 'Total Products', value: products.length },
            { label: 'Active', value: products.filter(p => p.status === 'active').length },
            { label: 'Pending/Draft', value: products.filter(p => p.status !== 'active').length },
            { label: 'Featured', value: products.filter(p => p.isFeatured).length },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6 print:hidden">
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
                {filtered.map(product => (
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
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          product.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : product.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" 
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {product.status !== 'active' ? (
                          <button 
                            onClick={() => {
                              updateProduct(product.id, { status: 'active' });
                              toast.success('Product approved and is now active!');
                            }}
                            className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg" 
                            title="Approve / Activate"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              updateProduct(product.id, { status: 'rejected' });
                              toast.success('Product deactivated / rejected');
                            }}
                            className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg" 
                            title="Deactivate / Reject"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            deleteProduct(product.id);
                            toast.success('Product deleted permanently');
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" 
                          title="Delete Permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl w-full max-w-lg p-6 relative animate-scale-in shadow-xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4 text-gray-900 dark:text-white">
              <div className="flex gap-4">
                <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-24 h-18 rounded-lg object-cover border border-gray-100 dark:border-gray-700 shadow-sm" />
                <div>
                  <h3 className="text-lg font-bold leading-snug">{selectedProduct.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Category: <span className="font-semibold text-gray-750 dark:text-gray-300">{selectedProduct.category}</span></p>
                  <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded capitalize ${
                    selectedProduct.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-yellow-100 text-yellow-750 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>{selectedProduct.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Seller Name</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <img src={selectedProduct.sellerAvatar} alt={selectedProduct.sellerName} className="w-5 h-5 rounded-full" />
                    <span className="font-semibold text-gray-750 dark:text-gray-300">{selectedProduct.sellerName}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Price</p>
                  <p className="font-bold text-emerald-600 mt-1">${selectedProduct.price}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Total Sales</p>
                  <p className="font-semibold text-gray-750 dark:text-gray-300 mt-0.5">{selectedProduct.sales.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Average Rating</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-750 dark:text-gray-300">{selectedProduct.rating}</span>
                  </div>
                </div>
              </div>

              {selectedProduct.description && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-400 text-xs mb-1">Description</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">{selectedProduct.description}</p>
                </div>
              )}

              {selectedProduct.techStack && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-400 text-xs mb-1.5">Tech Stack</p>
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(selectedProduct.techStack) 
                      ? selectedProduct.techStack 
                      : typeof selectedProduct.techStack === 'string'
                      ? (selectedProduct.techStack as string).split(',')
                      : []
                    ).map((t: string) => (
                      <span key={t} className="text-xs bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-gray-650 dark:text-gray-300 px-2 py-0.5 rounded-full">{t.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
