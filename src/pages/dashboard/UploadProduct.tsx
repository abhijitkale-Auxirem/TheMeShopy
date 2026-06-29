import DashboardLayout from '@/layouts/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useProductStore } from '@/store/productStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Upload, ImageIcon, Plus, X, Save, FileArchive } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/types';
import { mockCategories } from '@/database/mockDb';

export default function UploadProduct() {
  const { user } = useAuthStore();
  const { addProduct, updateProduct, products } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const thumbInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<string | null>(null);
  const [thumbnailName, setThumbnailName] = useState('');
  const [zipName, setZipName] = useState('');

  const [form, setForm] = useState({
    title: '', description: '', longDescription: '',
    price: '', originalPrice: '', category: '',
    license: 'regular' as 'regular' | 'extended',
    licensePrice: '', version: '1.0.0',
    techStack: '', demoUrl: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      const product = products.find(p => p.id === id);
      if (product) {
        setForm({
          title: product.title,
          description: product.description,
          longDescription: product.longDescription,
          price: String(product.price),
          originalPrice: product.originalPrice ? String(product.originalPrice) : '',
          category: product.category,
          license: product.license,
          licensePrice: product.licensePrice ? String(product.licensePrice) : '',
          version: product.version,
          techStack: product.techStack.join(', '),
          demoUrl: product.demoUrl || '',
        });
        setTags(product.tags);
      } else {
        toast.error('Product not found');
        navigate('/dashboard/seller/products');
      }
    }
  }, [id, isEdit, products, navigate]);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput(''); }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Thumbnail size must be less than 5MB');
        return;
      }
      setThumbnailName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailFile(reader.result as string);
        toast.success('Thumbnail image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setZipName(file.name);
      toast.success(`Template code package (${file.name}) uploaded successfully!`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    if (isEdit && id) {
      updateProduct(id, {
        title: form.title,
        slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: form.description,
        longDescription: form.longDescription || form.description,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        category: form.category,
        categorySlug: form.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        license: form.license,
        licensePrice: form.licensePrice ? Number(form.licensePrice) : undefined,
        version: form.version,
        lastUpdated: new Date().toISOString().split('T')[0],
        techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean),
        demoUrl: form.demoUrl || undefined,
        ...(thumbnailFile ? { thumbnail: thumbnailFile } : {})
      });
      setLoading(false);
      toast.success('Product updated successfully!');
      navigate('/dashboard/seller/products');
      return;
    }

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
      thumbnail: thumbnailFile || 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">
            {isEdit ? 'Edit Product' : 'Upload Product'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isEdit ? 'Update your product details and technical information.' : 'Submit your product for review. Our team will review it within 1-2 business days.'}
          </p>
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
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center space-y-4">
              <input 
                type="file" 
                ref={thumbInputRef} 
                accept="image/*" 
                className="hidden" 
                onChange={handleThumbnailUpload} 
              />
              <input 
                type="file" 
                ref={zipInputRef} 
                accept=".zip" 
                className="hidden" 
                onChange={handleZipUpload} 
              />
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div 
                  onClick={() => thumbInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-4 border border-gray-150 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-850 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10 cursor-pointer transition-colors sm:w-1/2"
                >
                  <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Choose Thumbnail</span>
                  <span className="text-[10px] text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                </div>
                <div 
                  onClick={() => zipInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-4 border border-gray-150 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-850 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10 cursor-pointer transition-colors sm:w-1/2"
                >
                  <FileArchive className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Choose Source Code</span>
                  <span className="text-[10px] text-gray-500 mt-1">ZIP package</span>
                </div>
              </div>

              {(thumbnailName || zipName) && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 text-left space-y-2 text-xs">
                  <p className="font-semibold text-gray-900 dark:text-white">Selected Files:</p>
                  {thumbnailName && (
                    <div className="flex items-center justify-between bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100/30 px-3 py-2 rounded-lg">
                      <span className="truncate text-gray-700 dark:text-gray-300">🖼️ {thumbnailName}</span>
                      <button type="button" onClick={() => { setThumbnailName(''); setThumbnailFile(null); }} className="text-red-500 hover:text-red-700"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                  {zipName && (
                    <div className="flex items-center justify-between bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100/30 px-3 py-2 rounded-lg">
                      <span className="truncate text-gray-700 dark:text-gray-300">📦 {zipName}</span>
                      <button type="button" onClick={() => setZipName('')} className="text-red-500 hover:text-red-700"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-base">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isEdit ? <Save className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                {isEdit ? 'Save Changes' : 'Submit for Review'}
              </>
            )}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
