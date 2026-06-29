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

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import MyDownloads from "./pages/dashboard/MyDownloads";
import Wishlist from "./pages/dashboard/Wishlist";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import SellerProducts from "./pages/dashboard/SellerProducts";
import UploadProduct from "./pages/dashboard/UploadProduct";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AffiliateDashboard from "./pages/dashboard/AffiliateDashboard";
import AgencyDashboard from "./pages/dashboard/AgencyDashboard";
import Profile from "./pages/dashboard/Profile";

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

// Dashboard Wrappers
import DashboardLayout from "./layouts/DashboardLayout";

function SellerDashboardWrapper() {
  return <DashboardLayout><SellerDashboard /></DashboardLayout>;
}
function BuyerDashboardWrapper() {
  return <DashboardLayout><BuyerDashboard /></DashboardLayout>;
}
function AdminDashboardWrapper() {
  return <DashboardLayout><AdminDashboard /></DashboardLayout>;
}
function AffiliateDashboardWrapper() {
  return <DashboardLayout><AffiliateDashboard /></DashboardLayout>;
}
function AgencyDashboardWrapper() {
  return <DashboardLayout><AgencyDashboard /></DashboardLayout>;
}

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

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Buyer */}
          <Route path="/dashboard/buyer" element={<ProtectedRoute><BuyerDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/downloads" element={<ProtectedRoute><MyDownloads /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/history" element={<ProtectedRoute><MyDownloads /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/reviews" element={<ProtectedRoute><BuyerDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/buyer/licenses" element={<ProtectedRoute><MyDownloads /></ProtectedRoute>} />

          {/* Seller */}
          <Route path="/dashboard/seller" element={<ProtectedRoute><SellerDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/seller/products" element={<ProtectedRoute><SellerProducts /></ProtectedRoute>} />
          <Route path="/dashboard/seller/upload" element={<ProtectedRoute><UploadProduct /></ProtectedRoute>} />
          <Route path="/dashboard/seller/earnings" element={<ProtectedRoute><SellerDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/seller/customers" element={<ProtectedRoute><SellerDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/seller/messages" element={<ProtectedRoute><SellerDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/seller/analytics" element={<ProtectedRoute><SellerDashboardWrapper /></ProtectedRoute>} />

          {/* Affiliate */}
          <Route path="/dashboard/affiliate" element={<ProtectedRoute><AffiliateDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/affiliate/referrals" element={<ProtectedRoute><AffiliateDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/affiliate/earnings" element={<ProtectedRoute><AffiliateDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/affiliate/campaigns" element={<ProtectedRoute><AffiliateDashboardWrapper /></ProtectedRoute>} />

          {/* Agency */}
          <Route path="/dashboard/agency" element={<ProtectedRoute><AgencyDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/agency/projects" element={<ProtectedRoute><AgencyDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/agency/licenses" element={<ProtectedRoute><AgencyDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/agency/downloads" element={<ProtectedRoute><AgencyDashboardWrapper /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/admin/sellers" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/admin/products" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/admin/orders" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/admin/reviews" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/admin/disputes" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/admin/analytics" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/admin/revenue" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />
          <Route path="/dashboard/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminDashboardWrapper /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
