import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem, Product } from '@/types';
import { mockProducts } from '@/database/mockDb';

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  hasItem: (productId: string) => boolean;
  getCount: () => number;
}

// Default pre-populated wishlist items using the first two mock products
const initialItems: WishlistItem[] = mockProducts && mockProducts.length >= 2 ? [
  {
    productId: mockProducts[0].id,
    product: mockProducts[0],
    addedAt: new Date().toISOString(),
  },
  {
    productId: mockProducts[1].id,
    product: mockProducts[1],
    addedAt: new Date().toISOString(),
  }
] : [];

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: initialItems,

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
