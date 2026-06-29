import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, Star, Heart, DollarSign,
  Users, BarChart3, Settings, LogOut, Menu, X, Bell, ChevronRight,
  Upload, MessageSquare, Share2, Building2, FileText, Shield, Download,
  TrendingUp, UserCheck, AlertTriangle, Layers
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Package as PackageIcon } from 'lucide-react';
import type { UserRole } from '@/types';

const getSidebarLinks = (role: UserRole) => {
  const common = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  ];

  const byRole: Record<UserRole, { icon: React.ComponentType<{ className?: string }>, label: string, href: string }[]> = {
    buyer: [
      { icon: Download, label: 'My Downloads', href: '/dashboard/buyer/downloads' },
      { icon: ShoppingBag, label: 'Purchase History', href: '/dashboard/buyer/history' },
      { icon: Heart, label: 'Wishlist', href: '/dashboard/buyer/wishlist' },
      { icon: Star, label: 'My Reviews', href: '/dashboard/buyer/reviews' },
      { icon: FileText, label: 'Licenses', href: '/dashboard/buyer/licenses' },
    ],
    seller: [
      { icon: Package, label: 'My Products', href: '/dashboard/seller/products' },
      { icon: Upload, label: 'Upload Product', href: '/dashboard/seller/upload' },
      { icon: DollarSign, label: 'Earnings', href: '/dashboard/seller/earnings' },
      { icon: Users, label: 'Customers', href: '/dashboard/seller/customers' },
      { icon: MessageSquare, label: 'Messages', href: '/dashboard/seller/messages' },
      { icon: BarChart3, label: 'Analytics', href: '/dashboard/seller/analytics' },
    ],
    affiliate: [
      { icon: Share2, label: 'Referrals', href: '/dashboard/affiliate/referrals' },
      { icon: DollarSign, label: 'Earnings', href: '/dashboard/affiliate/earnings' },
      { icon: TrendingUp, label: 'Campaigns', href: '/dashboard/affiliate/campaigns' },
    ],
    agency: [
      { icon: Building2, label: 'Projects', href: '/dashboard/agency/projects' },
      { icon: FileText, label: 'Team Licenses', href: '/dashboard/agency/licenses' },
      { icon: Download, label: 'Downloads', href: '/dashboard/agency/downloads' },
    ],
    enterprise: [
      { icon: Users, label: 'Team', href: '/dashboard/enterprise/team' },
      { icon: Shield, label: 'Compliance', href: '/dashboard/enterprise/compliance' },
      { icon: Layers, label: 'Asset Library', href: '/dashboard/enterprise/assets' },
    ],
    admin: [
      { icon: Users, label: 'Users', href: '/dashboard/admin/users' },
      { icon: UserCheck, label: 'Sellers', href: '/dashboard/admin/sellers' },
      { icon: Package, label: 'Products', href: '/dashboard/admin/products' },
      { icon: ShoppingBag, label: 'Orders', href: '/dashboard/admin/orders' },
      { icon: Star, label: 'Reviews', href: '/dashboard/admin/reviews' },
      { icon: AlertTriangle, label: 'Disputes', href: '/dashboard/admin/disputes' },
      { icon: BarChart3, label: 'Analytics', href: '/dashboard/admin/analytics' },
      { icon: DollarSign, label: 'Revenue', href: '/dashboard/admin/revenue' },
      { icon: Settings, label: 'Settings', href: '/dashboard/admin/settings' },
    ],
  };

  return [...common, ...(byRole[role] || [])];
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuthStore();
  const { getUnreadCount } = useNotificationStore();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const links = getSidebarLinks(user.role);
  const unread = getUnreadCount(user.id);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100 dark:border-gray-700">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
            <PackageIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-bold font-heading">
            <span className="text-indigo-600">The</span>
            <span className="text-gray-900 dark:text-white">Me</span>
            <span className="text-emerald-500">Shopy</span>
          </span>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
            <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full capitalize">{user.role}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
        {links.map(link => {
          const Icon = link.icon;
          const active = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`sidebar-item ${active ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{link.label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-700 space-y-0.5">
        <Link to="/profile" className="sidebar-item sidebar-item-inactive">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
        <button onClick={handleLogout} className="w-full sidebar-item text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex-shrink-0 fixed h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-60 bg-white dark:bg-gray-800 flex flex-col h-full z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-60 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
              {links.find(l => l.href === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/marketplace" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative text-gray-600 dark:text-gray-400">
              <Bell className="w-4 h-4" />
              {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />}
            </Link>
            <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full cursor-pointer" onClick={() => navigate('/profile')} />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
