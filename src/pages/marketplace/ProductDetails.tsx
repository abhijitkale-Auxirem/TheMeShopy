import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Download, ShoppingCart, Heart, ExternalLink, CheckCircle,
  Code2, RefreshCw, Shield, Tag, ChevronRight, Play, Award
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductCard from '@/components/marketplace/ProductCard';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { useReviewStore } from '@/store/reviewStore';
import { toast } from 'sonner';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const { addItem, hasItem } = useCartStore();
  const { toggleItem, hasItem: isWished } = useWishlistStore();
  const { isAuthenticated, user } = useAuthStore();
  const { reviews: allReviews, addReview } = useReviewStore();

  const product = products.find(p => p.slug === slug);
  const reviews = allReviews.filter(r => r.productId === product?.id);
  const related = products.filter(p => p.categorySlug === product?.categorySlug && p.id !== product?.id).slice(0, 4);

  const [selectedLicense, setSelectedLicense] = useState<'regular' | 'extended'>('regular');
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'faq'>('overview');

  if (!product) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
          <Link to="/marketplace" className="btn-primary">Browse Marketplace</Link>
        </div>
      </MainLayout>
    );
  }

  const price = selectedLicense === 'extended' ? (product.licensePrice || product.price * 2.5) : product.price;
  const inCart = hasItem(product.id);
  const wishlisted = isWished(product.id);

  const handleBuyNow = () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    addItem(product, selectedLicense);
    navigate('/cart');
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    addItem(product, selectedLicense);
    toast.success('Added to cart!');
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: 'Marketplace', href: '/marketplace' },
          { label: product.category, href: `/marketplace?cat=${product.categorySlug}` },
          { label: product.title },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-1 rounded-full">{product.category}</span>
                {product.isNew && <span className="badge-new">New</span>}
                {product.isTrending && <span className="badge-trending">Trending</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading mb-3">{product.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />)}
                  <span className="font-medium text-gray-900 dark:text-white ml-1">{product.rating}</span>
                  <span>({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1"><Download className="w-4 h-4" />{product.sales.toLocaleString()} sales</div>
                <div className="flex items-center gap-1"><RefreshCw className="w-4 h-4" />v{product.version}</div>
              </div>
            </div>

            {/* Preview Image */}
            <div className="relative rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800 aspect-video">
              <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
              {product.demoUrl && (
                <a href={product.demoUrl} target="_blank" rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-semibold">
                    <Play className="w-5 h-5" /> Live Preview
                  </div>
                </a>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
              {(['overview', 'reviews', 'faq'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
                  {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.longDescription}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.map(tech => (
                      <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                        <Code2 className="w-3.5 h-3.5 text-indigo-500" />{tech}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Write a Review Section */}
                {isAuthenticated && user ? (
                  <ReviewForm productId={product.id} user={user} onAddReview={addReview} />
                ) : (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Please{' '}
                      <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                        log in
                      </Link>{' '}
                      to leave a review.
                    </p>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No reviews yet. Be the first!</p>
                  ) : (
                    reviews.map(r => (
                      <div key={r.id} className="p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <img src={r.userAvatar} alt={r.userName} className="w-9 h-9 rounded-full" />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-900 dark:text-white text-sm">{r.userName}</p>
                                {r.verified && <span className="flex items-center gap-1 text-xs text-emerald-600"><CheckCircle className="w-3 h-3" />Verified</span>}
                              </div>
                              <div className="flex gap-0.5 mt-0.5">
                                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{r.createdAt}</span>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">{r.title}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{r.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                {[
                  { q: 'Is this template regularly updated?', a: `Yes! ${product.title} receives regular updates. Current version is v${product.version}.` },
                  { q: 'What support is included?', a: '6 months of free support with every purchase. Extended support available separately.' },
                  { q: 'Can I use this for client projects?', a: 'Yes, with a Regular License for one end product, or Extended License for unlimited commercial use.' },
                ].map((faq, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{faq.q}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Purchase Card */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                {/* License Selector */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">License Type</p>
                  <div className="space-y-2">
                    {[
                      { type: 'regular' as const, label: 'Regular License', price: product.price, features: ['1 end product', 'Personal or commercial use', 'No redistribution'] },
                      { type: 'extended' as const, label: 'Extended License', price: product.licensePrice || product.price * 2.5, features: ['Unlimited end products', 'Full commercial rights', 'Resell allowed'] },
                    ].map(l => (
                      <label key={l.type} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedLicense === l.type ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-100 dark:border-gray-700'}`}>
                        <input type="radio" name="license" value={l.type} checked={selectedLicense === l.type} onChange={() => setSelectedLicense(l.type)} className="mt-1 text-indigo-600" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{l.label}</span>
                            <span className="text-base font-bold text-indigo-600">${l.price}</span>
                          </div>
                          <ul className="mt-1 space-y-0.5">
                            {l.features.map(f => <li key={f} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />{f}</li>)}
                          </ul>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {product.originalPrice && <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>}
                  <span className="text-3xl font-bold text-indigo-600">${price}</span>
                  {product.isOnSale && <span className="badge-sale">{product.discount}% off</span>}
                </div>

                <button onClick={handleBuyNow} className="w-full btn-primary py-3 text-base mb-2">
                  Buy Now — ${price}
                </button>
                <button onClick={handleAddToCart} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-base transition-colors ${inCart ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'btn-secondary'}`}>
                  <ShoppingCart className="w-4 h-4" />
                  {inCart ? 'In Cart' : 'Add to Cart'}
                </button>

                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => { toggleItem(product); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-colors ${wishlisted ? 'border-rose-300 text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                    {wishlisted ? 'Wishlisted' : 'Wishlist'}
                  </button>
                  {product.demoUrl && (
                    <a href={product.demoUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <ExternalLink className="w-4 h-4" />Preview
                    </a>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                  {[
                    { icon: Shield, text: '14-day money-back guarantee' },
                    { icon: Download, text: 'Instant download after purchase' },
                    { icon: RefreshCw, text: `Last updated: ${product.lastUpdated}` },
                    { icon: Award, text: `v${product.version} · ${product.sales.toLocaleString()} sales` },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <item.icon className="w-3.5 h-3.5 text-indigo-400" />{item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Seller Card */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Creator</p>
                <div className="flex items-center gap-3">
                  <img src={product.sellerAvatar} alt={product.sellerName} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{product.sellerName}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />4.9 Creator</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">Related Products</h2>
              <Link to={`/marketplace?cat=${product.categorySlug}`} className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View more <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

function ReviewForm({ productId, user, onAddReview }: { productId: string; user: any; onAddReview: (r: any) => void }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    
    const newReview = {
      id: `rev_new_${Date.now()}`,
      productId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      rating,
      title: title.trim(),
      comment: comment.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: true,
    };
    
    onAddReview(newReview);
    setTitle('');
    setComment('');
    setRating(5);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 rounded-xl space-y-4 shadow-sm">
      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Write a Review</h4>
      
      {/* Stars Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Rating:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5 text-gray-300 hover:scale-110 transition-transform"
            >
              <Star
                className={`w-5 h-5 ${
                  star <= (hoverRating || rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Review Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience (e.g. Excellent code quality!)"
          className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Comment */}
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Detailed Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us what you liked or disliked about this product..."
          rows={3}
          className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
      >
        Submit Review
      </button>
    </form>
  );
}
