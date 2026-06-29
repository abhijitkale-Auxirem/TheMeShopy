import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order } from '@/types';
import { mockOrders } from '@/database/mockDb';

interface OrderState {
  orders: Order[];
  getUserOrders: (userId: string) => Order[];
  getSellerOrders: (sellerId: string) => Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: mockOrders,

      getUserOrders: (userId) =>
        get().orders.filter(o => o.buyerId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),

      getSellerOrders: (sellerId) =>
        get().orders.filter(o => o.sellerId === sellerId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),

      addOrder: (order) => {
        set({ orders: [order, ...get().orders] });
      },

      updateOrderStatus: (id, status) => {
        set({
          orders: get().orders.map(o => o.id === id ? { ...o, status } : o),
        });
      },
    }),
    { name: 'themeshopy-orders' }
  )
);
