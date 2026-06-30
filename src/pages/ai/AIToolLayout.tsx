import MainLayout from '@/layouts/MainLayout';
import { Link, useLocation } from 'react-router-dom';
import {
  Wand2, Layout, Globe, FileText, Search, BookOpen, ChevronRight, Sparkles, ArrowLeft
} from 'lucide-react';

const sidebarTools = [
  { id: 'theme-generator', icon: Wand2, label: 'Theme Generator', href: '/ai/theme-generator', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { id: 'ui-layout-generator', icon: Layout, label: 'UI Layout Generator', href: '/ai/ui-layout-generator', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'landing-page-generator', icon: Globe, label: 'Landing Page Generator', href: '/ai/landing-page-generator', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { id: 'description-generator', icon: FileText, label: 'Description Generator', href: '/ai/description-generator', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { id: 'seo-generator', icon: Search, label: 'SEO Meta Generator', href: '/ai/seo-generator', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { id: 'docs-generator', icon: BookOpen, label: 'Docs Generator', href: '/ai/docs-generator', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
];

interface AIToolLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass?: string;
}

export default function AIToolLayout({ children, title, description, icon: Icon, iconClass = 'text-indigo-600' }: AIToolLayoutProps) {
  const { pathname } = useLocation();

  return (
    <MainLayout>
      {/* Breadcrumb / top bar */}
      <div className="bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm">
          <Link to="/ai-tools" className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium">
            <Sparkles className="w-4 h-4" /> AI Tools
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400 font-medium">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <Link
                to="/ai-tools"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> All AI Tools
              </Link>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Switch Tool</p>
              <nav className="space-y-1">
                {sidebarTools.map(tool => {
                  const ToolIcon = tool.icon;
                  const isActive = pathname === tool.href;
                  return (
                    <Link
                      key={tool.id}
                      to={tool.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/30'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'bg-white/20' : tool.bg
                      }`}>
                        <ToolIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tool.color}`} />
                      </div>
                      {tool.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Tool Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${iconClass}`} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{title}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                </div>
              </div>

              {/* Mobile tool switcher */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mt-4">
                {sidebarTools.map(tool => {
                  const ToolIcon = tool.icon;
                  const isActive = pathname === tool.href;
                  return (
                    <Link
                      key={tool.id}
                      to={tool.href}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      <ToolIcon className="w-3 h-3" />
                      {tool.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {children}
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
