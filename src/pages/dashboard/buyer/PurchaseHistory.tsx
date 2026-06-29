import DashboardLayout from '@/layouts/DashboardLayout';
import { ShoppingBag, Download, Star, Eye, Calendar, Search, X, Send, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  refunded: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const demoOrders = [
  { id: 'ord_1', productName: 'Nexus - Modern SaaS Dashboard', productThumb: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=80&h=60&fit=crop', price: 59, date: '2024-06-10', status: 'completed', license: 'Regular', orderId: '#ORD-10021' },
  { id: 'ord_2', productName: 'Prism UI - React Component Library', productThumb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=80&h=60&fit=crop', price: 79, date: '2024-05-28', status: 'completed', license: 'Regular', orderId: '#ORD-10019' },
  { id: 'ord_3', productName: 'IconFlow - 5000+ SVG Icons Pack', productThumb: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=80&h=60&fit=crop', price: 39, date: '2024-05-14', status: 'completed', license: 'Extended', orderId: '#ORD-10015' },
  { id: 'ord_4', productName: 'Aurora - Landing Page Kit', productThumb: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=80&h=60&fit=crop', price: 29, date: '2024-04-20', status: 'completed', license: 'Regular', orderId: '#ORD-10008' },
  { id: 'ord_5', productName: 'DataVault - Analytics Dashboard', productThumb: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=60&fit=crop', price: 89, date: '2024-03-15', status: 'refunded', license: 'Regular', orderId: '#ORD-10003' },
];

export default function PurchaseHistory() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState<typeof demoOrders[0] | null>(null);
  const [reviewOrder, setReviewOrder] = useState<typeof demoOrders[0] | null>(null);
  
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');

  const filtered = demoOrders.filter(o => {
    const matchSearch = o.productName.toLowerCase().includes(search.toLowerCase()) || o.orderId.includes(search);
    const matchFilter = filter === 'all' || o.status === filter;
    return matchSearch && matchFilter;
  });

  const total = demoOrders.reduce((sum, o) => o.status !== 'refunded' ? sum + o.price : sum, 0);

  const handleDownload = (productName: string) => {
    toast.success(`Downloading package source code: ${productName}`);
    const element = document.createElement('a');
    const file = new Blob(['Demo Package'], {type: 'application/zip'});
    element.href = URL.createObjectURL(file);
    element.download = `${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}_code.zip`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewText.trim()) {
      toast.error('Please enter review title and comment');
      return;
    }
    toast.success(`Your 5-star review has been submitted for ${reviewOrder?.productName}!`);
    setReviewOrder(null);
    setReviewTitle('');
    setReviewText('');
    setRating(5);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Purchase History</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">View all your past orders and transactions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: demoOrders.length, icon: ShoppingBag, color: 'indigo' },
            { label: 'Total Spent', value: `$${total}`, icon: Calendar, color: 'emerald' },
            { label: 'Downloads', value: demoOrders.filter(o => o.status === 'completed').length, icon: Download, color: 'blue' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-xs">
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Orders</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-6 py-3">Product</th>
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">Order ID</th>
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">License</th>
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">Price</th>
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={order.productThumb} alt={order.productName} className="w-12 h-9 rounded-lg object-cover flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{order.productName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{order.orderId}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">{order.license}</span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white">${order.price}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColors[order.status]}`}>{order.status}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {order.status === 'completed' && (
                          <button 
                            onClick={() => handleDownload(order.productName)}
                            className="p-1.5 text-indigo-650 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" 
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedReceipt(order)}
                          className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" 
                          title="View Receipt"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {order.status === 'completed' && (
                          <button 
                            onClick={() => setReviewOrder(order)}
                            className="p-1.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors" 
                            title="Leave Review"
                          >
                            <Star className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* View Receipt Details Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-750 rounded-2xl p-6 max-w-md w-full relative shadow-xl">
            <button 
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <CreditCard className="w-6 h-6 text-indigo-650" />
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">Order Receipt</h3>
                <p className="text-xs text-gray-400">Transaction ID: {selectedReceipt.orderId}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Item:</span>
                <span className="font-semibold text-gray-800 dark:text-white text-right truncate max-w-[250px]">{selectedReceipt.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Purchase Date:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">License Tier:</span>
                <span className="font-semibold text-gray-800 dark:text-white bg-blue-50 dark:bg-blue-900/10 px-1.5 py-0.5 rounded text-[10px]">{selectedReceipt.license}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Gateway:</span>
                <span className="font-semibold text-gray-800 dark:text-white">Stripe Checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Order Status:</span>
                <span className="font-semibold text-emerald-600 capitalize">{selectedReceipt.status}</span>
              </div>
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">Total Charge:</span>
                <span className="font-bold text-indigo-650">${selectedReceipt.price}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2 justify-end text-xs font-semibold">
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-250 dark:bg-gray-700 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
              >
                Close Receipt
              </button>
              {selectedReceipt.status === 'completed' && (
                <button 
                  onClick={() => { setSelectedReceipt(null); handleDownload(selectedReceipt.productName); }}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Code
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Leave Product Review Modal */}
      {reviewOrder && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-750 rounded-2xl p-6 max-w-md w-full relative shadow-xl">
            <button 
              onClick={() => setReviewOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading mb-1">Write Review</h3>
            <p className="text-xs text-gray-500 mb-4">Share your feedback for <strong>{reviewOrder.productName}</strong></p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Rating Score</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Headline</label>
                <input 
                  type="text" 
                  required
                  value={reviewTitle} 
                  onChange={e => setReviewTitle(e.target.value)} 
                  placeholder="e.g., Outstanding code quality!" 
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Review Comments</label>
                <textarea 
                  required
                  rows={4}
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Tell us what you liked or how developers can improve this product..."
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 text-xs font-semibold">
                <button 
                  type="button"
                  onClick={() => setReviewOrder(null)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-250 dark:bg-gray-700 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
