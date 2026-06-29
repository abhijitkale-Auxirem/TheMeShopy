import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem, Product } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  hasItem: (productId: string) => boolean;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        if (get().hasItem(product.id)) return;
        set({
          items: [...get().items, {
            productId: product.id,
            product,
            addedAt: new Date().toISOString(),
          }],
        });
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter(i => i.productId !== productId) });
      },

      toggleItem: (product: Product) => {
        if (get().hasItem(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      hasItem: (productId: string) => get().items.some(i => i.productId === productId),

      getCount: () => get().items.length,
    }),
    { name: 'themeshopy-wishlist' }
  )
);
