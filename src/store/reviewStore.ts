import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Review } from '@/types';
import { mockReviews } from '@/database/mockDb';
import { useProductStore } from './productStore';

interface ReviewState {
  reviews: Review[];
  addReview: (review: Review) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => {
      const syncProductStats = (productId: string, currentReviews: Review[]) => {
        const productReviews = currentReviews.filter(r => r.productId === productId);
        const count = productReviews.length;
        const avgRating = count > 0 
          ? Number((productReviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1)) 
          : 0;
        
        useProductStore.getState().updateProduct(productId, {
          rating: avgRating,
          reviewCount: count,
        });
      };

      return {
        reviews: mockReviews.map((r, i) => ({
          ...r,
          status: r.status || (i % 5 === 0 ? 'flagged' : 'approved')
        })),
        
        addReview: (review) => {
          const updatedReviews = [review, ...get().reviews];
          set({ reviews: updatedReviews });
          syncProductStats(review.productId, updatedReviews);
        },
        
        updateReview: (id, updates) => {
          const updatedReviews = get().reviews.map(r => r.id === id ? { ...r, ...updates } : r);
          set({ reviews: updatedReviews });
          const review = updatedReviews.find(r => r.id === id);
          if (review) {
            syncProductStats(review.productId, updatedReviews);
          }
        },
        
        deleteReview: (id) => {
          const review = get().reviews.find(r => r.id === id);
          const updatedReviews = get().reviews.filter(r => r.id !== id);
          set({ reviews: updatedReviews });
          if (review) {
            syncProductStats(review.productId, updatedReviews);
          }
        },
      };
    },
    { name: 'themeshopy-reviews' }
  )
);
