import DashboardLayout from '@/layouts/DashboardLayout';
import { Star, ThumbsUp, Edit2, Trash2, Package, Search } from 'lucide-react';
import { useState } from 'react';
import { mockReviews } from '@/database/mockDb';

const myReviews = [
  { id: 'rev_1', productName: 'Nexus - Modern SaaS Dashboard', productThumb: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=80&h=60&fit=crop', rating: 5, title: 'Absolutely stunning dashboard template!', comment: 'I have been using Nexus for 3 months now and I am blown away by the quality. The components are well-documented, clean code, and top-notch design. Highly recommend!', createdAt: '2024-05-15', helpful: 47 },
  { id: 'rev_2', productName: 'Prism UI - React Component Library', productThumb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=80&h=60&fit=crop', rating: 5, title: 'The most comprehensive UI kit available', comment: 'Prism UI has everything I need. 200+ components, excellent Figma integration, and superb code quality. Definitely worth every penny.', createdAt: '2024-05-01', helpful: 29 },
  { id: 'rev_3', productName: 'IconFlow - 5000+ SVG Icons Pack', productThumb: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=80&h=60&fit=crop', rating: 5, title: 'The only icon pack you will ever need', comment: '5000+ icons and they are all perfectly consistent. The Figma plugin is a game changer. I use IconFlow on every project now.', createdAt: '2024-06-01', helpful: 56 },
  { id: 'rev_4', productName: 'Aurora - Landing Page Kit', productThumb: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=80&h=60&fit=crop', rating: 4, title: 'Great landing page kit', comment: 'Aurora has beautiful animations and the sections are well-designed. Would love a few more section options but overall very happy with the purchase.', createdAt: '2024-04-10', helpful: 18 },
];

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
}

export default function BuyerReviews() {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<string | null>(null);

  const filtered = myReviews.filter(r =>
    r.productName.toLowerCase().includes(search.toLowerCase()) ||
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const avgRating = (myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length).toFixed(1);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">My Reviews</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your product reviews and ratings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
            <p className="text-3xl font-bold text-gray-900 dark:text-white font-heading">{myReviews.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Reviews</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white font-heading">{avgRating}</p>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Avg Rating Given</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
            <p className="text-3xl font-bold text-gray-900 dark:text-white font-heading">{myReviews.reduce((s, r) => s + r.helpful, 0)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Helpful Votes Received</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filtered.map(review => (
            <div key={review.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <img src={review.productThumb} alt={review.productName} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-sm font-medium text-indigo-600 mb-1">{review.productName}</p>
                      <StarRating rating={review.rating} />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(editing === review.id ? null : review.id)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mt-2">{review.title}</h3>
                  {editing === review.id ? (
                    <div className="mt-3">
                      <textarea
                        defaultValue={review.comment}
                        rows={3}
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white resize-none"
                      />
                      <div className="flex gap-2 mt-2">
                        <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700" onClick={() => setEditing(null)}>Save</button>
                        <button className="px-3 py-1.5 text-gray-500 text-xs font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setEditing(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{review.comment}</p>
                  )}
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-gray-400">{review.createdAt}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{review.helpful} found helpful</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No reviews found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
