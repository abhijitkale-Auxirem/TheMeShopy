import DashboardLayout from '@/layouts/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useOrderStore } from '@/store/orderStore';
import { Download, ExternalLink, FileArchive } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function MyDownloads() {
  const { user } = useAuthStore();
  const { getUserOrders } = useOrderStore();
  
  if (!user) return null;
  const orders = getUserOrders(user.id).filter(o => o.status === 'completed');

  const handleDownload = (productTitle: string) => {
    toast.success(`Downloading code archive for ${productTitle}...`);
    // Create simulated file download
    const element = document.createElement('a');
    const file = new Blob(['Mock ZIP content'], {type: 'application/zip'});
    element.href = URL.createObjectURL(file);
    element.download = `${productTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}_package.zip`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">My Downloads</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{orders.length} products available for download</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm">
            <FileArchive className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 font-heading">No downloads yet</h3>
            <p className="text-sm text-gray-500 mb-4">Purchase products from the marketplace to see them here</p>
            <Link to="/marketplace" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xs">
                <img src={order.productThumbnail} alt={order.productTitle} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{order.productTitle}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="capitalize">{order.license} License</span>
                    <span>·</span>
                    <span>Purchased {new Date(order.createdAt).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>${order.amount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button 
                    onClick={() => handleDownload(order.productTitle)} 
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
