import MainLayout from '@/layouts/MainLayout';
import { Sparkles, Wand2, Layout, Search, FileText, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

interface AIToolProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  placeholder: string;
  outputExample: string;
  color: string;
}

function AITool({ icon: Icon, title, description, placeholder, outputExample, color }: AIToolProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input.trim()) { toast.error('Please enter a prompt'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setOutput(outputExample.replace('[INPUT]', input));
    setLoading(false);
    toast.success('Generated successfully!');
  };

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 border-t-4 border-t-${color}-500`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-3"
      />
      <button onClick={generate} disabled={loading} className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors disabled:opacity-60">
        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Zap className="w-4 h-4" />Generate</>}
      </button>
      {output && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Generated Output:</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{output}</p>
        </div>
      )}
    </div>
  );
}

const tools: AIToolProps[] = [
  {
    icon: Wand2, title: 'AI Theme Generator', description: 'Generate theme concepts and color palettes',
    placeholder: 'Describe your website theme (e.g., "SaaS startup with minimal dark design")',
    outputExample: 'Theme for "[INPUT]":\n• Primary: #4F46E5 (Indigo)\n• Secondary: #10B981 (Emerald)\n• Font: Plus Jakarta Sans + Inter\n• Style: Modern minimal with glass morphism\n• Key Features: Gradient hero, floating cards, smooth animations',
    color: 'indigo',
  },
  {
    icon: Layout, title: 'AI UI Builder', description: 'Generate UI component code snippets',
    placeholder: 'Describe the UI component (e.g., "pricing table with 3 tiers")',
    outputExample: 'Generated React component for "[INPUT]":\n\nA responsive 3-column pricing grid with gradient backgrounds, feature checkmarks, and CTA buttons. Uses Tailwind CSS with hover animations and dark mode support.',
    color: 'blue',
  },
  {
    icon: Sparkles, title: 'Landing Page Generator', description: 'Generate landing page copy and structure',
    placeholder: 'Describe your product (e.g., "project management tool for remote teams")',
    outputExample: 'Landing page for "[INPUT]":\n\nHero: "Collaborate Without Boundaries" — [input] that keeps your team in sync\nSubheadline: Ship projects 3x faster with AI-powered task management\nCTA: "Start Free Trial" / "Watch Demo"\nKey Sections: Features, Pricing, Testimonials, FAQ',
    color: 'purple',
  },
  {
    icon: Search, title: 'SEO Meta Generator', description: 'Generate optimized meta tags and descriptions',
    placeholder: 'Describe your page content (e.g., "React admin dashboard template")',
    outputExample: 'SEO tags for "[INPUT]":\n\ntitle: Premium [INPUT] | TheMeShopy\ndescription: Download professional [INPUT] with 50+ components, TypeScript support, dark mode, and lifetime updates. Used by 10,000+ developers.\nkeywords: [INPUT], react template, typescript, tailwind css, dashboard',
    color: 'emerald',
  },
  {
    icon: FileText, title: 'Product Description Generator', description: 'Generate compelling product descriptions',
    placeholder: 'Describe your digital product briefly',
    outputExample: 'Product description for "[INPUT]":\n\n🎯 Built for developers who value quality and speed.\n\n[INPUT] delivers a premium development experience with battle-tested components, comprehensive TypeScript types, and a pixel-perfect design system that adapts to your brand.',
    color: 'orange',
  },
  {
    icon: FileText, title: 'AI Documentation Generator', description: 'Generate installation and technical documentation',
    placeholder: 'Enter library/module title and stack details (e.g. "React slider, TypeScript, Tailwind")',
    outputExample: 'Documentation for "[INPUT]":\n\n## Installation\n```bash\nnpm install [INPUT]\n```\n\n## Usage\nImport it directly into your layout and supply components data. Supports fully responsive container queries and dark mode presets.',
    color: 'rose',
  }
];

export default function AITools() {
  return (
    <MainLayout>
      <section className="py-16 gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />AI-Powered Tools
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-4">AI Tools for Creators</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Supercharge your workflow with AI-powered tools for generating themes, UI components, landing page copy, and more.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => <AITool key={tool.title} {...tool} />)}
          </div>
          <div className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-8">
            <Sparkles className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-heading mb-2">More AI Tools Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">We're building advanced AI tools for code generation, design system creation, and more.</p>
            <Link to="/register" className="btn-primary inline-flex items-center gap-2">
              Get Early Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
