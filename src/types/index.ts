export type UserRole = 'admin' | 'seller' | 'buyer' | 'affiliate' | 'agency' | 'enterprise';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  website?: string;
  location?: string;
  joinedAt: string;
  isVerified: boolean;
  earnings?: number;
  totalSales?: number;
  totalPurchases?: number;
  referralCode?: string;
  commissionRate?: number;
  teamSize?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
  color: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  sales: number;
  downloads: number;
  license: 'regular' | 'extended';
  licensePrice?: number;
  version: string;
  lastUpdated: string;
  createdAt: string;
  isNew: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  discount?: number;
  techStack: string[];
  demoUrl?: string;
  status: 'active' | 'pending' | 'draft' | 'rejected';
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
  verified: boolean;
  status?: 'approved' | 'flagged';
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  sellerId: string;
  productId: string;
  productTitle: string;
  productThumbnail: string;
  amount: number;
  license: 'regular' | 'extended';
  status: 'completed' | 'pending' | 'refunded' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  downloadUrl?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  license: 'regular' | 'extended';
  price: number;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'sale' | 'review' | 'download' | 'system' | 'payment';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueByMonth: { month: string; revenue: number; orders: number }[];
  topProducts: { productId: string; title: string; sales: number; revenue: number }[];
  categoryBreakdown: { category: string; count: number; revenue: number }[];
}

export interface Store {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  totalProducts: number;
  totalSales: number;
  rating: number;
  followers: number;
  joinedAt: string;
  isVerified: boolean;
}

export interface License {
  type: 'regular' | 'extended';
  price: number;
  features: string[];
}

export interface AffiliateData {
  id: string;
  userId: string;
  referralCode: string;
  totalReferrals: number;
  pendingEarnings: number;
  totalEarnings: number;
  paidEarnings: number;
  commissionRate: number;
  referrals: ReferralRecord[];
}

export interface ReferralRecord {
  id: string;
  referredUserId: string;
  referredUserName: string;
  orderId: string;
  orderAmount: number;
  commission: number;
  status: 'pending' | 'approved' | 'paid';
  createdAt: string;
}
