import DashboardLayout from '@/layouts/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Wishlist() {
  const { user } = useAuthStore();
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">My Wishlist</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{items.length} saved products</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
            <Heart className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-gray-500 mb-4">Save products you love while browsing the marketplace</p>
            <Link to="/marketplace" className="btn-primary">Explore Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(item => (
              <div key={item.productId} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.product.thumbnail} alt={item.product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <button onClick={() => { removeItem(item.productId); toast.success('Removed from wishlist'); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-indigo-600 mb-1">{item.product.category}</p>
                  <Link to={`/marketplace/product/${item.product.slug}`} className="font-semibold text-gray-900 dark:text-white text-sm hover:text-indigo-600 transition-colors line-clamp-1">{item.product.title}</Link>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-indigo-600">${item.product.price}</span>
                    <button onClick={() => { addItem(item.product); toast.success('Added to cart!'); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors">
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
