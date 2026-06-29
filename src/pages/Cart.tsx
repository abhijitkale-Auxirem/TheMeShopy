import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, Tag, Shield, Download } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useOrderStore } from '@/store/orderStore';
import { toast } from 'sonner';
import type { Order } from '@/types';

export default function Cart() {
  const { items, removeItem, clearCart, getTotal } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { addOrder } = useOrderStore();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [checkingOut, setCheckingOut] = useState(false);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(10);
      toast.success('Promo code applied! 10% off');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setCheckingOut(true);
    await new Promise(r => setTimeout(r, 1500));

    items.forEach(item => {
      const order: Order = {
        id: `ord_${Date.now()}_${item.productId}`,
        buyerId: user!.id,
        buyerName: user!.name,
        buyerEmail: user!.email,
        sellerId: item.product.sellerId,
        productId: item.productId,
        productTitle: item.product.title,
        productThumbnail: item.product.thumbnail,
        amount: item.price,
        license: item.license,
        status: 'completed',
        paymentMethod: 'Stripe',
        createdAt: new Date().toISOString(),
        downloadUrl: `/downloads/${item.product.slug}.zip`,
      };
      addOrder(order);
    });

    clearCart();
    setCheckingOut(false);
    toast.success('Purchase successful! Check your downloads.');
    navigate('/dashboard/buyer/downloads');
  };

  const subtotal = getTotal();
  const discountAmt = (subtotal * discount) / 100;
  const total = subtotal - discountAmt;

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Browse our marketplace and add products you love.</p>
          <Link to="/marketplace" className="btn-primary inline-flex items-center gap-2">
            Explore Marketplace <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading mb-8">Shopping Cart ({items.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.productId} className="flex gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                <img src={item.product.thumbnail} alt={item.product.title} className="w-24 h-18 rounded-lg object-cover flex-shrink-0" style={{ height: '72px' }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-indigo-600 mb-0.5">{item.product.category}</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{item.product.title}</h3>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full capitalize mt-1 inline-block">{item.license} License</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-lg font-bold text-indigo-600">${item.price}</span>
                  <button onClick={() => { removeItem(item.productId); toast.success('Removed from cart'); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 sticky top-20">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>

              {/* Promo */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Promo code" className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button onClick={applyPromo} className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">Apply</button>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.length} items)</span><span>${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Promo Discount ({discount}%)</span><span>-${discountAmt.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span><span>$0</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-700 pt-2">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleCheckout} disabled={checkingOut} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                {checkingOut ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Shield className="w-4 h-4" />Secure Checkout</>}
              </button>

              <div className="mt-4 space-y-1.5">
                {['SSL Encrypted Payment', '14-day Refund Policy', 'Instant Download'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Download className="w-3 h-3 text-emerald-500" />{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
