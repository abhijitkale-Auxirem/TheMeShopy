import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';
import { mockProducts } from '@/database/mockDb';

interface ProductState {
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  priceRange: [number, number];
  currentPage: number;
  itemsPerPage: number;
  selectedTechStack: string[];
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (c: string) => void;
  setSortBy: (s: string) => void;
  setPriceRange: (r: [number, number]) => void;
  setCurrentPage: (p: number) => void;
  toggleTechStack: (t: string) => void;
  setSelectedTechStack: (ts: string[]) => void;
  getFilteredProducts: () => Product[];
  getPaginatedProducts: () => { products: Product[]; totalPages: number; total: number };
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'featured',
      priceRange: [0, 500],
      currentPage: 1,
      itemsPerPage: 12,
      selectedTechStack: [],

      setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
      setSelectedCategory: (c) => set({ selectedCategory: c, currentPage: 1 }),
      setSortBy: (s) => set({ sortBy: s }),
      setPriceRange: (r) => set({ priceRange: r }),
      setCurrentPage: (p) => set({ currentPage: p }),
      toggleTechStack: (t) => {
        const current = get().selectedTechStack;
        const next = current.includes(t) ? current.filter(item => item !== t) : [...current, t];
        set({ selectedTechStack: next, currentPage: 1 });
      },
      setSelectedTechStack: (ts) => set({ selectedTechStack: ts, currentPage: 1 }),

      getFilteredProducts: () => {
        const { products, searchQuery, selectedCategory, sortBy, priceRange, selectedTechStack } = get();
        let filtered = products.filter(p => p.status === 'active');

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tags.some(t => t.includes(q)) ||
            p.category.toLowerCase().includes(q)
          );
        }

        if (selectedCategory) {
          filtered = filtered.filter(p => p.categorySlug === selectedCategory);
        }

        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        if (selectedTechStack && selectedTechStack.length > 0) {
          filtered = filtered.filter(p =>
            selectedTechStack.some(t =>
              p.techStack.some(pt => pt.toLowerCase() === t.toLowerCase())
            )
          );
        }

        switch (sortBy) {
          case 'newest':
            filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'price-low':
            filtered = filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filtered = filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered = filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'trending':
            filtered = filtered.sort((a, b) => b.sales - a.sales);
            break;
          case 'featured':
          default:
            filtered = filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        }

        return filtered;
      },

      getPaginatedProducts: () => {
        const { currentPage, itemsPerPage } = get();
        const filtered = get().getFilteredProducts();
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        return {
          products: filtered.slice(start, start + itemsPerPage),
          totalPages,
          total: filtered.length,
        };
      },

      addProduct: (product) => {
        set({ products: [...get().products, product] });
      },

      updateProduct: (id, updates) => {
        set({
          products: get().products.map(p => p.id === id ? { ...p, ...updates } : p),
        });
      },

      deleteProduct: (id) => {
        set({ products: get().products.filter(p => p.id !== id) });
      },
    }),
    { name: 'themeshopy-products' }
  )
);
