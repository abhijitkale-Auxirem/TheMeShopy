import DashboardLayout from '@/layouts/DashboardLayout';
import { ShoppingBag, Search, Eye, Download, FileText, TrendingUp, DollarSign, Package, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const ordersInit = [
  { id: 'o1', orderId: '#ORD-10045', buyer: { name: 'Sarah Williams', email: 'buyer@themeshopy.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face' }, product: 'Nexus Dashboard', seller: 'Alex Johnson', amount: 59, date: '2024-06-14', status: 'completed', license: 'Regular', paymentMethod: 'Stripe' },
  { id: 'o2', orderId: '#ORD-10044', buyer: { name: 'Carlos Rivera', email: 'carlos@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' }, product: 'LaunchKit Boilerplate', seller: 'Alex Johnson', amount: 149, date: '2024-06-13', status: 'completed', license: 'Regular', paymentMethod: 'PayPal' },
  { id: 'o3', orderId: '#ORD-10043', buyer: { name: 'Emma Thompson', email: 'emma@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }, product: 'DataVault Analytics', seller: 'Alex Johnson', amount: 89, date: '2024-06-12', status: 'completed', license: 'Regular', paymentMethod: 'Stripe' },
  { id: 'o4', orderId: '#ORD-10042', buyer: { name: 'Liam O\'Brien', email: 'liam@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' }, product: 'Prism UI Library', seller: 'Priya Patel', amount: 79, date: '2024-06-11', status: 'completed', license: 'Extended', paymentMethod: 'Razorpay' },
  { id: 'o5', orderId: '#ORD-10041', buyer: { name: 'Yuki Tanaka', email: 'yuki@example.com', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face' }, product: 'FlowChat AI', seller: 'Alex Johnson', amount: 199, date: '2024-06-10', status: 'processing', license: 'Extended', paymentMethod: 'Stripe' },
  { id: 'o6', orderId: '#ORD-10040', buyer: { name: 'David Park', email: 'david@example.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face' }, product: 'Aurora Landing Kit', seller: 'Stella Rodriguez', amount: 29, date: '2024-06-09', status: 'completed', license: 'Regular', paymentMethod: 'Stripe' },
  { id: 'o7', orderId: '#ORD-10039', buyer: { name: 'Nina Patel', email: 'nina@example.com', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face' }, product: 'Cosmos WordPress Theme', seller: 'David Kim', amount: 49, date: '2024-06-08', status: 'refunded', license: 'Regular', paymentMethod: 'PayPal' },
];

const statusColors: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  refunded: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState(ordersInit);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const filtered = orders.filter(o => {
    const matchSearch = o.product.toLowerCase().includes(search.toLowerCase()) || o.buyer.name.toLowerCase().includes(search.toLowerCase()) || o.orderId.includes(search);
    const matchStatus = status === 'all' || o.status === status;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.amount, 0);

  const handleExportCSV = () => {
    const csvRows = [
      ['Order ID', 'Buyer Name', 'Buyer Email', 'Product', 'Seller', 'Amount ($)', 'Date', 'License', 'Status', 'Payment Method'],
      ...filtered.map(o => [
        o.orderId,
        o.buyer.name,
        o.buyer.email,
        o.product,
        o.seller,
        o.amount,
        o.date,
        o.license,
        o.status,
        o.paymentMethod
      ])
    ];
    const csvContent = "data:text/csv;charset=utf-8," 
      + csvRows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "platform_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Orders list exported to Excel (CSV) successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Orders</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor all platform transactions</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-55 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl transition-colors shadow-sm"
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
            { label: 'Total Orders', value: orders.length, icon: ShoppingBag },
            { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, icon: TrendingUp },
            { label: 'Total Revenue', value: `$${totalRevenue}`, icon: DollarSign },
            { label: 'Refunds', value: orders.filter(o => o.status === 'refunded').length, icon: Package },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6 print:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={status} onChange={e => setStatus(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {['Order ID', 'Buyer', 'Product', 'Seller', 'Amount', 'Date', 'License', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">{order.orderId}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <img src={order.buyer.avatar} alt={order.buyer.name} className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{order.buyer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">{order.product}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{order.seller}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-emerald-600">${order.amount}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    <td className="px-4 py-4"><span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">{order.license}</span></td>
                    <td className="px-4 py-4"><span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColors[order.status]}`}>{order.status}</span></td>
                    <td className="px-4 py-4 print:hidden">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="View Order Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl w-full max-w-md p-6 relative animate-scale-in shadow-xl">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Details</h3>
              <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mt-1">{selectedOrder.orderId}</p>

              <div className="w-full space-y-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-left text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Buyer</span>
                  <div className="flex items-center gap-2">
                    <img src={selectedOrder.buyer.avatar} alt={selectedOrder.buyer.name} className="w-6 h-6 rounded-full" />
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedOrder.buyer.name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Buyer Email</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedOrder.buyer.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Product</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300 max-w-[200px] truncate">{selectedOrder.product}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Seller</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedOrder.seller}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Purchase Date</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedOrder.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">License</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedOrder.license} License</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Payment Method</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100 dark:border-gray-700">
                  <span className="text-gray-400 text-xs font-semibold">Total Amount</span>
                  <span className="text-base font-bold text-emerald-600">${selectedOrder.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Status</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded capitalize ${statusColors[selectedOrder.status]}`}>{selectedOrder.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
