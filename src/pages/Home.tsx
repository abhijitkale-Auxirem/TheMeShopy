import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Search, ArrowRight, Star, TrendingUp, Shield, Zap, Globe, Users,
  Package, Award, CheckCircle, ChevronRight, Play
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import ProductCard from '@/components/marketplace/ProductCard';
import { mockProducts, mockCategories } from '@/database/mockDb';
import { useProductStore } from '@/store/productStore';
import heroBanner from '@/assets/hero-banner.jpg';

const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 6);
const trendingProducts = mockProducts.filter(p => p.isTrending).slice(0, 4);
const newProducts = mockProducts.filter(p => p.isNew).slice(0, 4);

const stats = [
  { label: 'Digital Products', value: '15,000+', icon: Package },
  { label: 'Happy Customers', value: '250,000+', icon: Users },
  { label: 'Expert Creators', value: '5,000+', icon: Award },
  { label: 'Countries Served', value: '180+', icon: Globe },
];

const features = [
  { icon: Shield, title: 'Quality Guaranteed', desc: 'Every product is reviewed and approved by our expert team before listing.' },
  { icon: Zap, title: 'Instant Download', desc: 'Purchase and immediately access your files with lightning-fast delivery.' },
  { icon: Star, title: 'Top Creators', desc: 'Work with the best designers and developers from around the world.' },
  { icon: CheckCircle, title: 'Lifetime Updates', desc: 'Get free updates for all products you purchase, forever.' },
];

const testimonials = [
  {
    name: 'Jordan Lee', role: 'Product Manager, TechCorp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test1',
    rating: 5,
    text: 'TheMeShopy transformed how we build products. The quality of templates is unmatched and saves us weeks of development.',
  },
  {
    name: 'Ava Thompson', role: 'Founder, StartupLab',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test2',
    rating: 5,
    text: 'I launched my SaaS in 2 weeks using templates from TheMeShopy. The LaunchKit boilerplate alone saved me $10,000 in development.',
  },
  {
    name: 'Carlos Rivera', role: 'Creative Director, DesignStudio',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test3',
    rating: 5,
    text: 'As a seller, TheMeShopy has been life-changing. I earn a full-time income selling UI kits and templates.',
  },
];

const faqs = [
  { q: 'What licenses are available?', a: 'We offer Regular and Extended licenses. Regular allows single end-product use, Extended allows unlimited commercial use.' },
  { q: 'Can I get a refund?', a: 'Yes, we offer 14-day refunds if the product has major technical issues that cannot be resolved.' },
  { q: 'How do I download my purchases?', a: 'After purchase, go to Dashboard > My Downloads to access all your purchased products.' },
  { q: 'How do I become a seller?', a: 'Register an account, switch to Seller mode, and submit your first product for review. It takes 1-2 business days to get approved.' },
];

export default function Home() {
  const [searchVal, setSearchVal] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { setSearchQuery } = useProductStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setSearchQuery(searchVal);
      navigate(`/marketplace?search=${encodeURIComponent(searchVal)}`);
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/95 via-purple-900/85 to-blue-900/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-8">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>15,000+ Premium Digital Products</span>
              <ArrowRight className="w-4 h-4" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 font-heading">
              The Premium
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">
                Digital Marketplace
              </span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
              Discover exceptional website themes, templates, UI kits, and source code from the world's top creators. Launch faster. Build better.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search themes, templates, UI kits..."
                  className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                />
              </div>
              <button type="submit" className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors whitespace-nowrap">
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-white/60">Popular:</span>
              {['React Templates', 'Admin Dashboard', 'UI Kit', 'SaaS Boilerplate', 'Landing Page'].map(tag => (
                <button
                  key={tag}
                  onClick={() => { setSearchVal(tag); setSearchQuery(tag); navigate('/marketplace'); }}
                  className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                    <Icon className="w-5 h-5 text-indigo-300 flex-shrink-0" />
                    <div>
                      <p className="text-xl font-bold text-white font-heading">{s.value}</p>
                      <p className="text-xs text-white/70">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Browse by Category</h2>
            <Link to="/marketplace" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {mockCategories.slice(0, 6).map(cat => (
              <Link
                key={cat.id}
                to={`/marketplace?cat=${cat.slug}`}
                className="group flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                  <Package className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.productCount}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Handpicked premium products by our team</p>
            </div>
            <Link to="/marketplace?sort=featured" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why TheMeShopy?</h2>
            <p className="section-subtitle mt-3">Everything you need to build incredible digital products faster</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h2 className="section-title">Trending This Week</h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400">Most popular products this week</p>
            </div>
            <Link to="/marketplace?sort=trending" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA - Become a Seller */}
      <section className="py-20 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm mb-6">
              <Award className="w-4 h-4 text-yellow-300" />
              <span>Join 5,000+ creators earning on TheMeShopy</span>
            </div>
            <h2 className="text-4xl font-bold text-white font-heading mb-4">
              Start Selling Your Digital Products
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Turn your design and development skills into income. Set your own prices, keep up to 80% of revenue, and reach 250,000+ buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register?role=seller" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                Start Selling Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/creators" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors">
                <Play className="w-4 h-4" />
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Loved by Thousands</h2>
            <p className="section-subtitle mt-3">See what our customers and creators are saying</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm">{t.text}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Fresh products added this week</p>
            </div>
            <Link to="/marketplace?sort=newest" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mt-3">Got questions? We have answers.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join 250,000+ developers and designers who trust TheMeShopy for their projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace" className="btn-primary py-4 px-8 text-base inline-flex items-center gap-2 justify-center">
              Explore Marketplace
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/register" className="inline-flex items-center gap-2 justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
