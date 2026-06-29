export { mockUsers } from './users';
export { mockProducts } from './products';
export { mockCategories } from './categories';
export { mockReviews } from './reviews';
export { mockOrders, getRevenueByMonth } from './orders';

export const mockNotifications = [
  {
    id: 'notif_1',
    userId: 'user_seller_1',
    type: 'sale' as const,
    title: 'New Sale!',
    message: 'You sold Nexus Dashboard to Sarah Williams for $59',
    isRead: false,
    createdAt: '2024-06-14T10:30:00Z',
    link: '/dashboard/seller/earnings',
  },
  {
    id: 'notif_2',
    userId: 'user_seller_1',
    type: 'review' as const,
    title: 'New Review',
    message: 'Sarah Williams left a 5-star review on Nexus Dashboard',
    isRead: false,
    createdAt: '2024-06-14T11:00:00Z',
    link: '/dashboard/seller/products',
  },
  {
    id: 'notif_3',
    userId: 'user_buyer_1',
    type: 'download' as const,
    title: 'Download Ready',
    message: 'Your purchase of Prism UI is ready to download',
    isRead: true,
    createdAt: '2024-06-13T15:20:00Z',
    link: '/dashboard/buyer/downloads',
  },
  {
    id: 'notif_4',
    userId: 'user_buyer_1',
    type: 'system' as const,
    title: 'Welcome to TheMeShopy!',
    message: 'Complete your profile to get personalized recommendations',
    isRead: true,
    createdAt: '2024-06-10T09:00:00Z',
  },
  {
    id: 'notif_5',
    userId: 'user_admin_1',
    type: 'system' as const,
    title: 'New Seller Registration',
    message: 'A new seller has registered and is pending approval',
    isRead: false,
    createdAt: '2024-06-14T08:00:00Z',
    link: '/dashboard/admin/sellers',
  },
];
