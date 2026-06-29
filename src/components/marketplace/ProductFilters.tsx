import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { mockCategories } from '@/database/mockDb';
import { useProductStore } from '@/store/productStore';

interface FiltersProps {
  onClose?: () => void;
  mobile?: boolean;
}

export default function ProductFilters({ onClose, mobile }: FiltersProps) {
  const { 
    selectedCategory, setSelectedCategory, 
    sortBy, setSortBy, 
    priceRange, setPriceRange,
    selectedTechStack, toggleTechStack, setSelectedTechStack,
    products
  } = useProductStore();

  const [catOpen, setCatOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [techOpen, setTechOpen] = useState(true); // Open by default for easier desktop filter visibility

  const techStackOptions = ['React', 'Vue', 'Angular', 'Next.js', 'WordPress', 'Flutter', 'Figma', 'TypeScript'];

  const clearAll = () => {
    setSelectedCategory('');
    setSortBy('featured');
    setPriceRange([0, 500]);
    setSelectedTechStack([]);
  };

  const getDynamicProductCount = (categorySlug: string) => {
    return products.filter(p => p.categorySlug === categorySlug && p.status === 'active').length;
  };

  return (
    <div className={`${mobile ? '' : 'sticky top-20'} bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="font-semibold text-gray-900 dark:text-white text-sm">Filters</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearAll} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Clear all</button>
          {mobile && onClose && (
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest First</option>
          <option value="trending">Most Popular</option>
          <option value="rating">Top Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="w-full flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2"
        >
          Categories
          {catOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {catOpen && (
          <div className="space-y-1 max-h-60 overflow-y-auto">
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="text-indigo-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">All Categories</span>
              </div>
              <span className="text-xs text-gray-400">{products.filter(p => p.status === 'active').length}</span>
            </label>
            {mockCategories.map(cat => {
              const count = getDynamicProductCount(cat.slug);
              return (
                <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                      className="text-indigo-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{count}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2"
        >
          Price Range
          {priceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {priceOpen && (
          <div>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
            <input
              type="range"
              min={0}
              max={500}
              step={10}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-indigo-600"
            />
            <div className="grid grid-cols-3 gap-1 mt-2">
              {[['Free', 0, 0], ['Under $29', 0, 29], ['$29-$79', 29, 79], ['$79-$149', 79, 149], ['$150+', 150, 500]].map(([label, min, max]) => (
                <button
                  key={label as string}
                  onClick={() => setPriceRange([min as number, max as number])}
                  className={`px-2 py-1 text-xs rounded-lg border transition-colors ${
                    priceRange[0] === min && priceRange[1] === max
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-indigo-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tech Stack */}
      <div className="px-4 py-3">
        <button
          onClick={() => setTechOpen(!techOpen)}
          className="w-full flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2"
        >
          Tech Stack {selectedTechStack.length > 0 && `(${selectedTechStack.length})`}
          {techOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {techOpen && (
          <div className="flex flex-wrap gap-1.5">
            {techStackOptions.map(tech => {
              const isTechActive = selectedTechStack.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => toggleTechStack(tech)}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                    isTechActive 
                      ? 'bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500' 
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
