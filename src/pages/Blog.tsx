import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import { Search, Calendar, Clock, User, X, ArrowRight, BookOpen } from 'lucide-react';

const mockArticles = [
  {
    id: 'b1',
    title: 'Top 10 Design Trends for SaaS Dashboards in 2026',
    desc: 'Explore micro-interactions, sleek dark interfaces, HSL-tailored accents, glassmorphic card overlays, and dynamic container layouts dominating UI/UX layouts this year.',
    content: `SaaS dashboard design has entered a new era in 2026. Buyers expect more than just static data tables and standard charts; they demand interfaces that feel alive, premium, and wowed at first glance. 

Here are the key trends you should be building into your React templates and admin dashboard designs:
1. Glassmorphism & Backdrop Filters: Subtly layered card modules that blend with active gradients, establishing clear depth.
2. Micro-Animations: Micro-interactions that give visual feedback on hovers, toggle switches, and input entries.
3. Custom Typography: A move away from standard fonts (Arial/Roboto) to premium Google Fonts like Outfit or Inter.
4. Curated Color Palettes: Tailored HSL colors, dark modes, and soft indigo-emerald balances.`,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    date: 'June 24, 2024',
    readTime: '5 min read',
    author: { name: 'Sarah Rivera', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' }
  },
  {
    id: 'b2',
    title: 'Why We Built TheMeShopy: Solving Creator Payouts & Licensing',
    desc: 'The backend problems that plague standard digital marketplaces, and how cryptographically-hashed license keys can help code sellers protect assets.',
    content: `When developers build digital products like React templates or custom Tailwind kits, selling them on generic files host repositories is often painful. They face excessive platform fees (often up to 50%), slow monthly payouts, and zero protection against code piracy.

We designed TheMeShopy to resolve these core issues:
- 80% Commission Tiers: Making sure digital creators retain their hard earned capital.
- Instant Stripe Payouts: Automatically triggering payouts.
- Crypto Hashed Licenses: Attaching unique license certificates to purchases.`,
    category: 'SaaS',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    date: 'June 18, 2024',
    readTime: '8 min read',
    author: { name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' }
  },
  {
    id: 'b3',
    title: 'How to Write Clean React Component Libraries for Commercial Resell',
    desc: 'A checklist for engineering reusable, robust npm component packages with clean TypeScript types, Tailwind classes, and customizable props.',
    content: `Creating component libraries for commercial resell requires a strong focus on modularity and standard guidelines. Buyers will customize your code to fit their existing projects.

Follow these standard guidelines:
1. Strong TypeScript Typings: Avoid "any". Declare strict interface models for all props.
2. Modular Structure: Keep components centered on a single task. Avoid deep file-tree nesting.
3. Clean Theme Classes: Use standard vanilla CSS variables or tailwind configuration. Avoid ad-hoc utility classes.
4. JSDoc documentation: Annotate functions so developers get instant autocomplete descriptions inside VS Code.`,
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    date: 'June 12, 2024',
    readTime: '6 min read',
    author: { name: 'Stella Rodriguez', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face' }
  },
  {
    id: 'b4',
    title: 'Digital Marketing Playbook: Promoting Your UI Kits on Socials',
    desc: 'How to build campaigns, write engaging posts, construct landing views, and recruit affiliates to drive conversion on your digital code assets.',
    content: `Listing your UI Kit or layout theme on a marketplace is only half the battle. To generate premium recurring revenue, you need an audience engine.

Here is a simple template to promote your components:
1. Video Demos: Record quick visual screen captures showing theme toggle actions or dashboard filters.
2. Free Boilerplates: Create a lightweight, free version of your item. Add links to upgrade inside the README.md.
3. Recruit Affiliates: Offer a 30% payout commission to marketing influencers to review and share your links.`,
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
    date: 'June 05, 2024',
    readTime: '4 min read',
    author: { name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' }
  }
];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const categories = ['All', 'Design', 'SaaS', 'Development', 'Marketing'];

  const filtered = mockArticles.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-full uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Platform Blog
          </span>
          <h1 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white tracking-tight">TheMeShopy Insights</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base">Guides, templates tutorials, and trends from our design and coding experts.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:border-indigo-550'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-750 rounded-2xl">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">No articles match your search parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map(post => (
              <article 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6 space-y-3">
                    <span className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{post.category}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{post.desc}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /><span>{post.date}</span></div>
                    <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /><span>{post.readTime}</span></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/55 z-55 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700 rounded-3xl w-full max-w-2xl p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto animate-scale-in shadow-2xl">
            <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white bg-gray-50 dark:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-6">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover rounded-2xl shadow-sm" />
              
              <div className="space-y-3">
                <span className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{selectedPost.category}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white leading-tight">{selectedPost.title}</h2>
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="flex items-center gap-1.5">
                    <img src={selectedPost.author.avatar} alt={selectedPost.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /><span>{selectedPost.date}</span></div>
                  <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /><span>{selectedPost.readTime}</span></div>
                </div>
              </div>

              {/* Text content */}
              <div className="prose prose-gray dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
