import { useOrderStore } from '@/store/orderStore';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Link } from 'react-router-dom';
import {
  Download, ShoppingBag, Heart, Star, ArrowRight, Package,
  TrendingUp, Clock, CheckCircle
} from 'lucide-react';

export default function BuyerDashboard() {
  const { user } = useAuthStore();
  const { getUserOrders } = useOrderStore();
  const { items: wishlistItems } = useWishlistStore();

  if (!user) return null;
  const orders = getUserOrders(user.id);

  const stats = [
    { label: 'Total Downloads', value: orders.length, icon: Download, color: 'indigo' },
    { label: 'Orders Made', value: orders.length, icon: ShoppingBag, color: 'blue' },
    { label: 'Wishlist Items', value: wishlistItems.length, icon: Heart, color: 'rose' },
    { label: 'Reviews Given', value: 3, icon: Star, color: 'amber' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's a summary of your account activity.</p>
        </div>
        <Link to="/marketplace" className="btn-primary flex items-center gap-2 hidden sm:flex">
          Browse Marketplace <ArrowRight className="w-4 h-4" />
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
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${s.color}-50 dark:bg-${s.color}-900/20`}>
                  <Icon className={`w-4 h-4 text-${s.color}-600 dark:text-${s.color}-400`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Purchases */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white font-heading">Recent Purchases</h2>
          <Link to="/dashboard/buyer/history" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all</Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
            <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">No purchases yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Browse our marketplace to find something you love</p>
            <Link to="/marketplace" className="btn-primary">Explore Products</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                <img src={order.productThumbnail} alt={order.productTitle} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{order.productTitle}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs capitalize bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />{order.status}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900 dark:text-white">${order.amount}</p>
                  <p className="text-xs text-gray-400 capitalize">{order.license} license</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wishlist Preview */}
      {wishlistItems.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white font-heading">Your Wishlist</h2>
            <Link to="/dashboard/buyer/wishlist" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.slice(0, 3).map(item => (
              <Link key={item.productId} to={`/marketplace/product/${item.product.slug}`} className="flex gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow">
                <img src={item.product.thumbnail} alt={item.product.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.product.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.product.category}</p>
                  <p className="text-sm font-bold text-indigo-600 mt-1">${item.product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white font-heading mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'My Downloads', href: '/dashboard/buyer/downloads', icon: Download, color: 'indigo' },
            { label: 'Purchase History', href: '/dashboard/buyer/history', icon: ShoppingBag, color: 'blue' },
            { label: 'Wishlist', href: '/dashboard/buyer/wishlist', icon: Heart, color: 'rose' },
            { label: 'My Reviews', href: '/dashboard/buyer/reviews', icon: Star, color: 'amber' },
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
    </div>
  );
}
