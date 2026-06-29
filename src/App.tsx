import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Marketplace
import BrowseProducts from "./pages/marketplace/BrowseProducts";
import ProductDetails from "./pages/marketplace/ProductDetails";

// Cart
import Cart from "./pages/Cart";

// Dashboard Root
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";

// Buyer
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import MyDownloads from "./pages/dashboard/MyDownloads";
import Wishlist from "./pages/dashboard/Wishlist";
import PurchaseHistory from "./pages/dashboard/buyer/PurchaseHistory";
import BuyerReviews from "./pages/dashboard/buyer/BuyerReviews";
import BuyerLicenses from "./pages/dashboard/buyer/BuyerLicenses";

// Seller
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import SellerProducts from "./pages/dashboard/SellerProducts";
import UploadProduct from "./pages/dashboard/UploadProduct";
import SellerEarnings from "./pages/dashboard/seller/SellerEarnings";
import SellerCustomers from "./pages/dashboard/seller/SellerCustomers";
import SellerMessages from "./pages/dashboard/seller/SellerMessages";
import SellerAnalytics from "./pages/dashboard/seller/SellerAnalytics";

// Affiliate
import AffiliateDashboard from "./pages/dashboard/AffiliateDashboard";
import AffiliateReferrals from "./pages/dashboard/affiliate/AffiliateReferrals";
import AffiliateEarnings from "./pages/dashboard/affiliate/AffiliateEarnings";
import AffiliateCampaigns from "./pages/dashboard/affiliate/AffiliateCampaigns";

// Agency
import AgencyDashboard from "./pages/dashboard/AgencyDashboard";
import AgencyProjects from "./pages/dashboard/agency/AgencyProjects";
import AgencyTeamLicenses from "./pages/dashboard/agency/AgencyTeamLicenses";
import AgencyDownloads from "./pages/dashboard/agency/AgencyDownloads";

// Enterprise
import EnterpriseTeam from "./pages/dashboard/enterprise/EnterpriseTeam";
import EnterpriseCompliance from "./pages/dashboard/enterprise/EnterpriseCompliance";
import EnterpriseAssets from "./pages/dashboard/enterprise/EnterpriseAssets";

// Admin
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminSellers from "./pages/dashboard/admin/AdminSellers";
import AdminProducts from "./pages/dashboard/admin/AdminProducts";
import AdminOrders from "./pages/dashboard/admin/AdminOrders";
import AdminReviews from "./pages/dashboard/admin/AdminReviews";
import AdminDisputes from "./pages/dashboard/admin/AdminDisputes";
import AdminAnalytics from "./pages/dashboard/admin/AdminAnalytics";
import AdminRevenue from "./pages/dashboard/admin/AdminRevenue";
import AdminSettings from "./pages/dashboard/admin/AdminSettings";

// Public Pages
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Affiliate from "./pages/Affiliate";
import AITools from "./pages/ai/AITools";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Terms />} />
          <Route path="/refund-policy" element={<Terms />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/creators" element={<Affiliate />} />
          <Route path="/agencies" element={<About />} />
          <Route path="/enterprise" element={<About />} />
          <Route path="/developers" element={<About />} />
          <Route path="/blog" element={<About />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Login />} />
          <Route path="/reset-password" element={<Login />} />

          {/* Marketplace */}
          <Route path="/marketplace" element={<BrowseProducts />} />
          <Route path="/marketplace/categories" element={<BrowseProducts />} />
          <Route path="/marketplace/product/:slug" element={<ProductDetails />} />
          <Route path="/marketplace/trending" element={<BrowseProducts />} />
          <Route path="/marketplace/new-releases" element={<BrowseProducts />} />
          <Route path="/marketplace/recommended" element={<BrowseProducts />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* AI Tools */}
          <Route path="/ai/theme-generator" element={<AITools />} />
          <Route path="/ai/ui-generator" element={<AITools />} />
          <Route path="/ai/landing-generator" element={<AITools />} />
          <Route path="/ai/seo-generator" element={<AITools />} />
          <Route path="/ai/description-generator" element={<AITools />} />

          {/* Dashboard Root */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Buyer Routes */}
          <Route path="/dashboard/buyer" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/downloads" element={<ProtectedRoute><MyDownloads /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/history" element={<ProtectedRoute><PurchaseHistory /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/reviews" element={<ProtectedRoute><BuyerReviews /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/licenses" element={<ProtectedRoute><BuyerLicenses /></ProtectedRoute>} />

          {/* Seller Routes */}
          <Route path="/dashboard/seller" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/seller/products" element={<ProtectedRoute><SellerProducts /></ProtectedRoute>} />
          <Route path="/dashboard/seller/upload" element={<ProtectedRoute><UploadProduct /></ProtectedRoute>} />
          <Route path="/dashboard/seller/earnings" element={<ProtectedRoute><SellerEarnings /></ProtectedRoute>} />
          <Route path="/dashboard/seller/customers" element={<ProtectedRoute><SellerCustomers /></ProtectedRoute>} />
          <Route path="/dashboard/seller/messages" element={<ProtectedRoute><SellerMessages /></ProtectedRoute>} />
          <Route path="/dashboard/seller/analytics" element={<ProtectedRoute><SellerAnalytics /></ProtectedRoute>} />

          {/* Affiliate Routes */}
          <Route path="/dashboard/affiliate" element={<ProtectedRoute><AffiliateDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/affiliate/referrals" element={<ProtectedRoute><AffiliateReferrals /></ProtectedRoute>} />
          <Route path="/dashboard/affiliate/earnings" element={<ProtectedRoute><AffiliateEarnings /></ProtectedRoute>} />
          <Route path="/dashboard/affiliate/campaigns" element={<ProtectedRoute><AffiliateCampaigns /></ProtectedRoute>} />

          {/* Agency Routes */}
          <Route path="/dashboard/agency" element={<ProtectedRoute><AgencyDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/agency/projects" element={<ProtectedRoute><AgencyProjects /></ProtectedRoute>} />
          <Route path="/dashboard/agency/licenses" element={<ProtectedRoute><AgencyTeamLicenses /></ProtectedRoute>} />
          <Route path="/dashboard/agency/downloads" element={<ProtectedRoute><AgencyDownloads /></ProtectedRoute>} />

          {/* Enterprise Routes */}
          <Route path="/dashboard/enterprise" element={<ProtectedRoute><AgencyDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/enterprise/team" element={<ProtectedRoute><EnterpriseTeam /></ProtectedRoute>} />
          <Route path="/dashboard/enterprise/compliance" element={<ProtectedRoute><EnterpriseCompliance /></ProtectedRoute>} />
          <Route path="/dashboard/enterprise/assets" element={<ProtectedRoute><EnterpriseAssets /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
          <Route path="/dashboard/admin/sellers" element={<ProtectedRoute requiredRole="admin"><AdminSellers /></ProtectedRoute>} />
          <Route path="/dashboard/admin/products" element={<ProtectedRoute requiredRole="admin"><AdminProducts /></ProtectedRoute>} />
          <Route path="/dashboard/admin/orders" element={<ProtectedRoute requiredRole="admin"><AdminOrders /></ProtectedRoute>} />
          <Route path="/dashboard/admin/reviews" element={<ProtectedRoute requiredRole="admin"><AdminReviews /></ProtectedRoute>} />
          <Route path="/dashboard/admin/disputes" element={<ProtectedRoute requiredRole="admin"><AdminDisputes /></ProtectedRoute>} />
          <Route path="/dashboard/admin/analytics" element={<ProtectedRoute requiredRole="admin"><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/dashboard/admin/revenue" element={<ProtectedRoute requiredRole="admin"><AdminRevenue /></ProtectedRoute>} />
          <Route path="/dashboard/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
