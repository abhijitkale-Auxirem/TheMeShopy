import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart, Heart, Bell, Search, Sun, Moon, Menu, X,
  LogOut, User, LayoutDashboard, ChevronDown, Package
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useTheme } from '@/hooks/useTheme';
import { useProductStore } from '@/store/productStore';

const navLinks = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'AI Tools', href: '/ai/theme-generator' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getCount: getCartCount } = useCartStore();
  const { getCount: getWishCount } = useWishlistStore();
  const { getUnreadCount } = useNotificationStore();
  const { theme, toggleTheme } = useTheme();
  const { setSearchQuery } = useProductStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setSearchQuery(searchVal);
      navigate(`/marketplace?search=${encodeURIComponent(searchVal)}`);
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  const cartCount = getCartCount();
  const wishCount = getWishCount();
  const unreadCount = isAuthenticated && user ? getUnreadCount(user.id) : 0;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-sm border-b border-gray-100 dark:border-gray-800' :
        'bg-white dark:bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold font-heading">
              <span className="text-indigo-600">The</span>
              <span className="text-gray-900 dark:text-white">Me</span>
              <span className="text-emerald-500">Shopy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname.startsWith(link.href)
                    ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Wishlist */}
                <Link to="/dashboard/buyer/wishlist" className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Heart className="w-5 h-5" />
                  {wishCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                      {wishCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link to="/cart" className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Notifications */}
                <Link to="/dashboard/notifications" className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>

                {/* Profile */}
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full" />
                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg py-2 z-50 animate-scale-in">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        <span className="inline-block mt-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/marketplace" className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors">
                  Visit Marketplace
                </Link>
                <Link to="/login" className="btn-secondary hidden sm:block text-sm py-2 px-4">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                autoFocus
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search themes, templates, plugins..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-indigo-600">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 dark:border-gray-800 pt-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 text-center text-sm py-2">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-center text-sm py-2">
                    Get Started
                  </Link>
                </div>
              )}
              {isAuthenticated && (
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
