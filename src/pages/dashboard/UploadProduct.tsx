import DashboardLayout from '@/layouts/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useProductStore } from '@/store/productStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Upload, ImageIcon, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/types';
import { mockCategories } from '@/database/mockDb';

export default function UploadProduct() {
  const { user } = useAuthStore();
  const { addProduct } = useProductStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [form, setForm] = useState({
    title: '', description: '', longDescription: '',
    price: '', originalPrice: '', category: '',
    license: 'regular' as 'regular' | 'extended',
    licensePrice: '', version: '1.0.0',
    techStack: '', demoUrl: '',
  });

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput(''); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));

    const newProduct: Product = {
      id: `prod_new_${Date.now()}`,
      title: form.title,
      slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: form.description,
      longDescription: form.longDescription || form.description,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      category: form.category,
      categorySlug: form.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sellerId: user.id,
      sellerName: user.name,
      sellerAvatar: user.avatar,
      thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      images: [],
      tags,
      rating: 0,
      reviewCount: 0,
      sales: 0,
      downloads: 0,
      license: form.license,
      licensePrice: form.licensePrice ? Number(form.licensePrice) : undefined,
      version: form.version,
      lastUpdated: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      isNew: true,
      isTrending: false,
      isFeatured: false,
      isOnSale: false,
      techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean),
      demoUrl: form.demoUrl || undefined,
      status: 'pending',
    };

    addProduct(newProduct);
    setLoading(false);
    toast.success('Product submitted for review! It will be live within 1-2 business days.');
    navigate('/dashboard/seller/products');
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Upload Product</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Submit your product for review. Our team will review it within 1-2 business days.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Product Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Product Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="e.g., Aurora - Modern React Dashboard" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Short Description *</label>
              <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required placeholder="Brief description (shown in product listings)" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Description</label>
              <textarea value={form.longDescription} onChange={e => setForm({ ...form, longDescription: e.target.value })} rows={4} placeholder="Detailed product description, features, and what's included..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Pricing & Category</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Regular Price ($) *</label>
                <input type="number" min="1" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required placeholder="29" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Extended License Price ($)</label>
                <input type="number" min="1" value={form.licensePrice} onChange={e => setForm({ ...form, licensePrice: e.target.value })} placeholder="79" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select category</option>
                  {mockCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Version</label>
                <input value={form.version} onChange={e => setForm({ ...form, version: e.target.value })} placeholder="1.0.0" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>

          {/* Tech Stack & Tags */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Technical Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tech Stack (comma separated)</label>
              <input value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} placeholder="React, TypeScript, Tailwind CSS" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Demo URL</label>
              <input type="url" value={form.demoUrl} onChange={e => setForm({ ...form, demoUrl: e.target.value })} placeholder="https://demo.yourproduct.com" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tags</label>
              <div className="flex gap-2 mb-2">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add a tag..." className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="button" onClick={addTag} className="px-3 py-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-200">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs rounded-full">
                    #{tag}
                    <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Upload File */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Thumbnail & Files</h2>
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
              <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Drop files here or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB for thumbnail. ZIP for product files.</p>
              <button type="button" className="mt-3 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-sm font-medium rounded-lg hover:bg-indigo-100 transition-colors">
                Choose Files
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-base">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Upload className="w-5 h-5" />Submit for Review</>}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
