import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { mockUsers } from '@/database/mockDb';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        await new Promise(r => setTimeout(r, 800));

        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } else {
          set({ isLoading: false });
          return { success: false, error: 'Invalid email or password' };
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        await new Promise(r => setTimeout(r, 1000));

        const existingUser = mockUsers.find(u => u.email === data.email);
        if (existingUser) {
          set({ isLoading: false });
          return { success: false, error: 'Email already in use' };
        }

        const newUser: User = {
          id: `user_${Date.now()}`,
          email: data.email!,
          password: data.password,
          name: data.name || 'New User',
          role: data.role || 'buyer',
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
          joinedAt: new Date().toISOString().split('T')[0],
          isVerified: false,
          earnings: 0,
          totalSales: 0,
          totalPurchases: 0,
        };

        mockUsers.push(newUser);
        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: 'themeshopy-auth',
    }
  )
);
