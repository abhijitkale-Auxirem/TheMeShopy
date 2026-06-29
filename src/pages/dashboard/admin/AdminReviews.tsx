import DashboardLayout from '@/layouts/DashboardLayout';
import { Star, Search, CheckCircle, XCircle, ThumbsUp, Flag } from 'lucide-react';
import { useState } from 'react';
import { useReviewStore } from '@/store/reviewStore';
import { toast } from 'sonner';

export default function AdminReviews() {
  const { reviews, updateReview, deleteReview } = useReviewStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = reviews.filter(r => {
    const matchSearch = r.userName.toLowerCase().includes(search.toLowerCase()) || r.title.toLowerCase().includes(search.toLowerCase());
    const status = r.status || 'approved';
    const matchStatus = statusFilter === 'all' || status === statusFilter;
    return matchSearch && matchStatus;
  });

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Reviews</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Moderate product reviews and ratings</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Reviews', value: reviews.length },
            { label: 'Approved', value: reviews.filter(r => (r.status || 'approved') === 'approved').length },
            { label: 'Flagged', value: reviews.filter(r => r.status === 'flagged').length },
            { label: 'Avg Rating', value: avgRating },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search reviews..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none">
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>

        <div className="space-y-4">
          {filtered.map(review => (
            <div key={review.id} className={`bg-white dark:bg-gray-800 border rounded-xl p-6 ${review.status === 'flagged' ? 'border-red-200 dark:border-red-800' : 'border-gray-100 dark:border-gray-700'}`}>
              <div className="flex items-start gap-4">
                <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{review.userName}</span>
                        {review.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                        {review.status === 'flagged' && <Flag className="w-3.5 h-3.5 text-red-500" />}
                      </div>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${review.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>{review.status || 'approved'}</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">{review.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{review.comment}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{review.createdAt}</span>
                      <div className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{review.helpful}</div>
                    </div>
                    <div className="flex gap-2">
                      {review.status === 'flagged' && (
                        <button 
                          onClick={() => {
                            updateReview(review.id, { status: 'approved' });
                            toast.success('Review approved');
                          }}
                          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg" 
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {review.status !== 'flagged' && (
                        <button 
                          onClick={() => {
                            updateReview(review.id, { status: 'flagged' });
                            toast.success('Review flagged');
                          }}
                          className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg" 
                          title="Flag"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          deleteReview(review.id);
                          toast.success('Review deleted');
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" 
                        title="Remove"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
