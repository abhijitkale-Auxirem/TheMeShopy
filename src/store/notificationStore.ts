import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockNotifications } from '@/database/mockDb';
import type { Notification } from '@/types';

interface NotificationState {
  notifications: Notification[];
  getUnreadCount: (userId: string) => number;
  getUserNotifications: (userId: string) => Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: (userId: string) => void;
  addNotification: (notif: Notification) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: mockNotifications as Notification[],

      getUnreadCount: (userId) =>
        get().notifications.filter(n => n.userId === userId && !n.isRead).length,

      getUserNotifications: (userId) =>
        get().notifications.filter(n => n.userId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),

      markAsRead: (id) => {
        set({
          notifications: get().notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        });
      },

      markAllAsRead: (userId) => {
        set({
          notifications: get().notifications.map(n =>
            n.userId === userId ? { ...n, isRead: true } : n
          ),
        });
      },

      addNotification: (notif) => {
        set({ notifications: [notif, ...get().notifications] });
      },
    }),
    { name: 'themeshopy-notifications' }
  )
);
