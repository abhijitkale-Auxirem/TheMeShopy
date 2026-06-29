import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, license?: 'regular' | 'extended') => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
  hasItem: (productId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, license: 'regular' | 'extended' = 'regular') => {
        const items = get().items;
        const existing = items.find(i => i.productId === product.id && i.license === license);
        if (existing) return;

        const price = license === 'extended' ? (product.licensePrice || product.price * 2) : product.price;
        set({
          items: [...items, {
            productId: product.id,
            product,
            license,
            price,
            quantity: 1,
          }],
        });
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter(i => i.productId !== productId) });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => get().items.reduce((sum, item) => sum + item.price, 0),

      getCount: () => get().items.length,

      hasItem: (productId: string) => get().items.some(i => i.productId === productId),
    }),
    { name: 'themeshopy-cart' }
  )
);
