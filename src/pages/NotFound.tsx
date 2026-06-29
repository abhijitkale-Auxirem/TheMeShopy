import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Package, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-8xl font-extrabold text-indigo-600 font-heading mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading mb-3">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/marketplace" className="btn-secondary flex items-center gap-2 justify-center">
            <Search className="w-4 h-4" /> Browse Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
