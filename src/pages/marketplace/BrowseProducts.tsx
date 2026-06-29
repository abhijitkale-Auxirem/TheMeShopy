import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Grid, List, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProductCard from '@/components/marketplace/ProductCard';
import ProductFilters from '@/components/marketplace/ProductFilters';
import { ProductCardSkeleton } from '@/components/common/LoadingSkeleton';
import Breadcrumb from '@/components/common/Breadcrumb';
import { useProductStore } from '@/store/productStore';

interface BrowseProductsProps {
  insideDashboard?: boolean;
}

export default function BrowseProducts({ insideDashboard = false }: BrowseProductsProps) {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [mobileFilters, setMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    setSearchQuery, setSelectedCategory, setSortBy, currentPage, setCurrentPage,
    getPaginatedProducts, searchQuery, selectedCategory
  } = useProductStore();

  useEffect(() => {
    const search = searchParams.get('search');
    const cat = searchParams.get('cat');
    const sort = searchParams.get('sort');
    
    setSearchQuery(search || '');
    setSelectedCategory(cat || '');
    if (sort) setSortBy(sort);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [searchParams]);

  const { products, totalPages, total } = getPaginatedProducts();

  const Layout = insideDashboard ? DashboardLayout : MainLayout;

  return (
    <Layout>
      <div className={`${insideDashboard ? 'max-w-6xl mx-auto' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} py-8`}>
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Marketplace', href: '/marketplace' }, { label: selectedCategory ? selectedCategory.replace(/-/g, ' ') : 'Browse All' }]} />
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">
                {searchQuery ? `Search: "${searchQuery}"` : selectedCategory ? selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All Products'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{total} products found</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setMobileFilters(true)} className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}><Grid className="w-4 h-4" /></button>
                <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}><List className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          {/* Mobile Filters Overlay */}
          {mobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="fixed inset-0 bg-black/50" onClick={() => setMobileFilters(false)} />
              <div className="relative w-80 max-w-full bg-white dark:bg-gray-900 h-full overflow-y-auto z-10 p-4">
                <ProductFilters mobile onClose={() => setMobileFilters(false)} />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className={`grid gap-5 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try different keywords or clear your filters</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategory(''); }} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className={`grid gap-5 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {products.map(p => <ProductCard key={p.id} product={p} view={view} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                      const page = i + 1;
                      return (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-indigo-600 text-white' : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                          {page}
                        </button>
                      );
                    })}
                    {totalPages > 5 && <span className="text-gray-400">...</span>}
                    <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
