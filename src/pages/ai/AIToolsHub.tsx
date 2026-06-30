import MainLayout from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';
import {
  Sparkles, Wand2, Layout, Globe, FileText, Search,
  BookOpen, ArrowRight, Zap, Star, TrendingUp, ChevronRight
} from 'lucide-react';

const aiTools = [
  {
    id: 'theme-generator',
    icon: Wand2,
    title: 'AI Theme Generator',
    description: 'Generate complete theme concepts, color palettes, typography pairings, and design tokens for your next project.',
    href: '/ai/theme-generator',
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
    badge: 'Most Popular',
    time: '~10 sec',
    examples: ['SaaS startup dark theme', 'E-commerce minimal white', 'Agency bold portfolio'],
  },
  {
    id: 'ui-layout-generator',
    icon: Layout,
    title: 'UI Layout Generator',
    description: 'Generate structured UI layouts and component code for dashboards, landing pages, cards, and navigation systems.',
    href: '/ai/ui-layout-generator',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
    badge: 'New',
    time: '~15 sec',
    examples: ['Pricing table 3 tiers', 'Admin sidebar nav', 'Hero with stats'],
  },
  {
    id: 'landing-page-generator',
    icon: Globe,
    title: 'Landing Page Generator',
    description: 'Generate complete landing page copy — hero headline, subheadline, feature bullets, CTA, and full page structure.',
    href: '/ai/landing-page-generator',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    badge: null,
    time: '~20 sec',
    examples: ['Project management SaaS', 'Design agency', 'Mobile fitness app'],
  },
  {
    id: 'description-generator',
    icon: FileText,
    title: 'Product Description Generator',
    description: 'Craft compelling, conversion-focused product descriptions that highlight features, use cases, and value propositions.',
    href: '/ai/description-generator',
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    badge: null,
    time: '~8 sec',
    examples: ['React dashboard template', 'Flutter app kit', 'WordPress theme'],
  },
  {
    id: 'seo-generator',
    icon: Search,
    title: 'SEO Metadata Generator',
    description: 'Generate optimized title tags, meta descriptions, Open Graph tags, and structured keyword sets for any digital product.',
    href: '/ai/seo-generator',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    badge: null,
    time: '~8 sec',
    examples: ['Admin dashboard template', 'UI component kit', 'SaaS boilerplate'],
  },
  {
    id: 'docs-generator',
    icon: BookOpen,
    title: 'Documentation Generator',
    description: 'Generate professional installation guides, API references, usage examples, and technical documentation in Markdown.',
    href: '/ai/docs-generator',
    color: 'rose',
    gradient: 'from-rose-500 to-red-600',
    badge: null,
    time: '~25 sec',
    examples: ['React component library', 'REST API endpoints', 'Design token system'],
  },
];

const stats = [
  { label: 'Generations Today', value: '12,400+', icon: Zap },
  { label: 'Happy Creators', value: '5,200+', icon: Star },
  { label: 'Time Saved', value: '98,000+ hrs', icon: TrendingUp },
];

export default function AIToolsHub() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            AI-Powered Creator Suite
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading mb-5 leading-tight">
            AI Tools for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-300">
              Digital Creators
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Supercharge your workflow with 6 AI-powered tools built specifically for designers and developers selling on TheMeShopy.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            {stats.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                  <Icon className="w-4 h-4 text-yellow-300" />
                  <span className="font-bold">{s.value}</span>
                  <span className="text-white/70 text-sm">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading mb-2">Choose Your AI Tool</h2>
            <p className="text-gray-500 dark:text-gray-400">Select a tool below to start generating — no prompts experience required</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map(tool => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.href}
                  className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.gradient} rounded-t-2xl`} />

                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      {tool.badge && (
                        <span className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-2.5 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                        {tool.time}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* Example prompts */}
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Examples</p>
                    {tool.examples.map(ex => (
                      <div key={ex} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                        {ex}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-3 transition-all">
                    Launch Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 rounded-3xl p-10">
            <Sparkles className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading mb-3">
              More AI Tools Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              We're building AI Code Assistant, AI Marketplace Trend Analyzer, and AI UI Designer. Get early access by registering as a creator.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register?role=seller" className="btn-primary inline-flex items-center gap-2">
                Become a Creator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/marketplace" className="btn-secondary inline-flex items-center gap-2">
                Browse Marketplace <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
