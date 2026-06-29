import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye, Download } from 'lucide-react';
import type { Product } from '@/types';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
}

export default function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const { toggleItem, hasItem } = useWishlistStore();
  const { addItem, hasItem: inCart } = useCartStore();

  const isWishlisted = hasItem(product.id);
  const isInCart = inCart(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) {
      addItem(product);
      toast.success('Added to cart!');
    }
  };

  if (view === 'list') {
    return (
      <Link to={`/marketplace/product/${product.slug}`} className="flex gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group">
        <div className="relative flex-shrink-0 w-40 h-28 rounded-lg overflow-hidden">
          <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {product.isNew && <span className="absolute top-2 left-2 badge-new">New</span>}
          {product.isOnSale && <span className="absolute top-2 left-2 badge-sale">-{product.discount}%</span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-indigo-600 font-medium mb-1">{product.category}</p>
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{product.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{product.description}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              {product.originalPrice && (
                <p className="text-xs text-gray-400 line-through">${product.originalPrice}</p>
              )}
              <p className="text-lg font-bold text-indigo-600">${product.price}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{product.rating}</span>
              <span className="flex items-center gap-1"><Download className="w-3 h-3" />{product.sales.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleWishlist} className={`p-1.5 rounded-lg transition-colors ${isWishlisted ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}>
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button onClick={handleAddToCart} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${isInCart ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                {isInCart ? 'In Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/marketplace/product/${product.slug}`} className="group block">
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden product-card-hover">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              onClick={handleWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isWishlisted ? 'bg-rose-500 text-white' : 'bg-white text-gray-900 hover:bg-rose-500 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-900">
              <Eye className="w-4 h-4" />
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isInCart ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <span className="badge-new">New</span>}
            {product.isTrending && !product.isNew && <span className="badge-trending">Trending</span>}
            {product.isOnSale && <span className="badge-sale">-{product.discount}%</span>}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-indigo-600 font-medium mb-1">{product.category}</p>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-sm mb-1">{product.title}</h3>

          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.rating} ({product.reviewCount})
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {product.sales.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
              )}
              <span className="text-lg font-bold text-indigo-600">${product.price}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={product.sellerAvatar} alt={product.sellerName} className="w-5 h-5 rounded-full" />
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[80px]">{product.sellerName.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
