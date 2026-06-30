import { useState } from 'react';
import { Wand2, Zap, Copy, RefreshCw, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import AIToolLayout from './AIToolLayout';

const stylePresets = [
  { id: 'minimal', label: 'Minimal & Clean', desc: 'Lots of whitespace, monochromatic' },
  { id: 'bold', label: 'Bold & Vibrant', desc: 'Rich colors, strong contrast' },
  { id: 'dark', label: 'Dark & Premium', desc: 'Dark background, neon accents' },
  { id: 'glassmorphism', label: 'Glassmorphism', desc: 'Frosted glass, blurred backgrounds' },
  { id: 'corporate', label: 'Corporate & Trust', desc: 'Blues, professional, structured' },
  { id: 'creative', label: 'Creative & Playful', desc: 'Gradients, rounded, energetic' },
];

const industryOptions = [
  'SaaS / Software', 'E-commerce', 'Agency / Portfolio', 'Healthcare', 'Finance', 'Education',
  'Real Estate', 'Restaurant / Food', 'Travel', 'Fitness', 'Media / Blog', 'NFT / Web3',
];

interface GeneratedTheme {
  name: string;
  tagline: string;
  colors: { name: string; hex: string; usage: string }[];
  fonts: { heading: string; body: string; mono: string };
  spacing: string;
  borderRadius: string;
  shadows: string;
  style: string;
  cssVariables: string;
  tailwindTokens: string;
}

function generateMockTheme(description: string, style: string, industry: string): GeneratedTheme {
  const themes: Record<string, GeneratedTheme> = {
    dark: {
      name: `${description || 'Premium'} Dark Theme`,
      tagline: 'Sleek, modern, and conversion-focused',
      colors: [
        { name: 'Primary', hex: '#6366F1', usage: 'CTAs, links, accents' },
        { name: 'Secondary', hex: '#8B5CF6', usage: 'Gradients, hover states' },
        { name: 'Background', hex: '#0F0F1A', usage: 'Page background' },
        { name: 'Surface', hex: '#1A1A2E', usage: 'Cards, modals' },
        { name: 'Accent', hex: '#10B981', usage: 'Success, highlights' },
        { name: 'Text', hex: '#F8FAFC', usage: 'Primary text' },
      ],
      fonts: { heading: 'Plus Jakarta Sans', body: 'Inter', mono: 'JetBrains Mono' },
      spacing: '4px base unit — 8, 12, 16, 24, 32, 48, 64px scale',
      borderRadius: 'xl (12px) for cards, 2xl (16px) for modals, full for pills',
      shadows: 'Colored shadows: shadow-indigo-500/20, shadow-purple-500/10',
      style: 'Dark premium with purple/indigo gradient accents',
      cssVariables: `--color-primary: #6366F1;\n--color-secondary: #8B5CF6;\n--color-bg: #0F0F1A;\n--color-surface: #1A1A2E;\n--color-accent: #10B981;\n--color-text: #F8FAFC;\n--radius-card: 12px;\n--radius-modal: 16px;`,
      tailwindTokens: `colors: {\n  primary: '#6366F1',\n  secondary: '#8B5CF6',\n  bg: '#0F0F1A',\n  surface: '#1A1A2E',\n  accent: '#10B981',\n}`,
    },
    minimal: {
      name: `${description || 'Clean'} Minimal Theme`,
      tagline: 'Clarity through simplicity',
      colors: [
        { name: 'Primary', hex: '#1E293B', usage: 'Headings, buttons' },
        { name: 'Secondary', hex: '#3B82F6', usage: 'Links, accents' },
        { name: 'Background', hex: '#FFFFFF', usage: 'Page background' },
        { name: 'Surface', hex: '#F8FAFC', usage: 'Cards, sections' },
        { name: 'Muted', hex: '#94A3B8', usage: 'Secondary text' },
        { name: 'Border', hex: '#E2E8F0', usage: 'Dividers, outlines' },
      ],
      fonts: { heading: 'Outfit', body: 'Inter', mono: 'Fira Code' },
      spacing: '4px base unit — generous whitespace at 64-96px section padding',
      borderRadius: 'lg (8px) for inputs, xl (12px) for cards, rounded-full for tags',
      shadows: 'Soft: shadow-sm (2px 2px 4px rgba(0,0,0,0.05))',
      style: 'Minimal white with slate accents and generous whitespace',
      cssVariables: `--color-primary: #1E293B;\n--color-secondary: #3B82F6;\n--color-bg: #FFFFFF;\n--color-surface: #F8FAFC;\n--color-muted: #94A3B8;\n--color-border: #E2E8F0;\n--radius-card: 12px;`,
      tailwindTokens: `colors: {\n  primary: '#1E293B',\n  secondary: '#3B82F6',\n  surface: '#F8FAFC',\n  muted: '#94A3B8',\n}`,
    },
    glassmorphism: {
      name: `${description || 'Glass'} Theme`,
      tagline: 'Frosted glass meets premium design',
      colors: [
        { name: 'Primary', hex: '#4F46E5', usage: 'CTAs, active states' },
        { name: 'Secondary', hex: '#7C3AED', usage: 'Gradients, hovers' },
        { name: 'Background', hex: '#0EA5E9', usage: 'Gradient mesh background' },
        { name: 'Glass', hex: 'rgba(255,255,255,0.12)', usage: 'Cards, panels' },
        { name: 'Accent', hex: '#F59E0B', usage: 'Highlights, badges' },
        { name: 'Text', hex: '#FFFFFF', usage: 'Text on glass' },
      ],
      fonts: { heading: 'Sora', body: 'Inter', mono: 'Fira Code' },
      spacing: 'Compact: 6, 10, 14, 20, 28, 40px for tight glass layouts',
      borderRadius: '2xl (16px) glass cards, 3xl (24px) for hero panels',
      shadows: 'Glass: 0 4px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
      style: 'Glassmorphism with vibrant gradient background and frosted panels',
      cssVariables: `--color-primary: #4F46E5;\n--color-secondary: #7C3AED;\n--color-glass: rgba(255,255,255,0.12);\n--glass-blur: blur(16px);\n--glass-border: rgba(255,255,255,0.2);\n--radius-glass: 16px;`,
      tailwindTokens: `colors: {\n  primary: '#4F46E5',\n  secondary: '#7C3AED',\n  accent: '#F59E0B',\n}`,
    },
  };

  return themes[style] || themes['minimal'];
}

export default function ThemeGenerator() {
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedTheme | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('colors');

  const canGenerate = description.trim() && selectedStyle && selectedIndustry;

  const handleGenerate = async () => {
    if (!canGenerate) { toast.error('Please complete all steps'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2200));
    setResult(generateMockTheme(description, selectedStyle, selectedIndustry));
    setStep(4);
    setLoading(false);
    toast.success('Theme generated successfully!');
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
    toast.success('Copied to clipboard!');
  };

  const reset = () => {
    setStep(1); setDescription(''); setSelectedStyle('');
    setSelectedIndustry(''); setResult(null);
  };

  return (
    <AIToolLayout
      title="AI Theme Generator"
      description="Generate complete theme concepts, color palettes, and design tokens"
      icon={Wand2}
      iconClass="text-indigo-600"
    >
      {/* Step Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => !loading && result === null ? setStep(s) : undefined}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s || result
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
            >
              {(step > s || result) ? <CheckCircle className="w-4 h-4" /> : s}
            </button>
            {s < 3 && <div className={`h-0.5 w-12 sm:w-20 rounded-full transition-all ${step > s || result ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </div>
        ))}
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          {result ? 'Theme Ready!' : step === 1 ? 'Describe your project' : step === 2 ? 'Choose visual style' : 'Select industry'}
        </span>
      </div>

      {!result ? (
        <div className="space-y-6">
          {/* Step 1: Describe */}
          <div className={`bg-white dark:bg-gray-900 border rounded-2xl p-6 transition-all ${step === 1 ? 'border-indigo-300 dark:border-indigo-700 shadow-lg' : 'border-gray-100 dark:border-gray-800'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Describe Your Project</h3>
            </div>
            <textarea
              value={description}
              onChange={e => { setDescription(e.target.value); setStep(Math.max(1, step)); }}
              onFocus={() => setStep(1)}
              placeholder='e.g., "A SaaS project management tool targeting remote development teams, modern and professional"'
              rows={3}
              className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            {description && (
              <button onClick={() => setStep(2)} className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                Continue <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Step 2: Style */}
          <div className={`bg-white dark:bg-gray-900 border rounded-2xl p-6 transition-all ${step === 2 ? 'border-indigo-300 dark:border-indigo-700 shadow-lg' : 'border-gray-100 dark:border-gray-800'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Choose Visual Style</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {stylePresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => { setSelectedStyle(preset.id); setStep(3); }}
                  className={`text-left p-3 rounded-xl border-2 transition-all ${
                    selectedStyle === preset.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{preset.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{preset.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Industry */}
          <div className={`bg-white dark:bg-gray-900 border rounded-2xl p-6 transition-all ${step === 3 ? 'border-indigo-300 dark:border-indigo-700 shadow-lg' : 'border-gray-100 dark:border-gray-800'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>3</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Select Industry</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {industryOptions.map(ind => (
                <button
                  key={ind}
                  onClick={() => { setSelectedIndustry(ind); setStep(3); }}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    selectedIndustry === ind
                      ? 'border-indigo-500 bg-indigo-600 text-white'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || loading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating your theme...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Generate Theme
              </>
            )}
          </button>
        </div>
      ) : (
        /* Result */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{result.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{result.tagline}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={reset} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <RefreshCw className="w-4 h-4" /> Regenerate
              </button>
            </div>
          </div>

          {/* Color Palette */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'colors' ? null : 'colors')}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white">🎨 Color Palette</span>
              {expandedSection === 'colors' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSection === 'colors' && (
              <div className="px-5 pb-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {result.colors.map(c => (
                    <div key={c.name} className="group">
                      <div
                        className="h-16 rounded-xl mb-2 cursor-pointer border border-gray-100 dark:border-gray-700 transition-transform group-hover:scale-105"
                        style={{ background: c.hex.includes('rgba') ? 'linear-gradient(135deg, #6366F1, #7C3AED)' : c.hex }}
                        onClick={() => copyToClipboard(c.hex, c.name)}
                      />
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{c.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{c.hex}</p>
                      <p className="text-xs text-gray-400">{c.usage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Typography */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'fonts' ? null : 'fonts')}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white">🔤 Typography</span>
              {expandedSection === 'fonts' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSection === 'fonts' && (
              <div className="px-5 pb-5 space-y-3">
                {Object.entries(result.fonts).map(([type, font]) => (
                  <div key={type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">{type}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{font}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(font, type)}
                      className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {copiedSection === type ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CSS Variables */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'css' ? null : 'css')}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white">📋 CSS Variables</span>
              {expandedSection === 'css' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSection === 'css' && (
              <div className="px-5 pb-5">
                <div className="relative">
                  <pre className="bg-gray-950 text-emerald-400 p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed">{`:root {\n  ${result.cssVariables}\n}`}</pre>
                  <button
                    onClick={() => copyToClipboard(`:root {\n  ${result.cssVariables}\n}`, 'css')}
                    className="absolute top-3 right-3 p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {copiedSection === 'css' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tailwind Config */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'tailwind' ? null : 'tailwind')}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white">⚙️ Tailwind Config Tokens</span>
              {expandedSection === 'tailwind' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSection === 'tailwind' && (
              <div className="px-5 pb-5">
                <div className="relative">
                  <pre className="bg-gray-950 text-blue-400 p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed">{`// tailwind.config.js\ntheme: {\n  extend: {\n    ${result.tailwindTokens}\n  }\n}`}</pre>
                  <button
                    onClick={() => copyToClipboard(result.tailwindTokens, 'tailwind')}
                    className="absolute top-3 right-3 p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {copiedSection === 'tailwind' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Design Specs */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📐 Design Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Spacing Scale</p>
                <p className="text-sm text-gray-900 dark:text-white">{result.spacing}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Border Radius</p>
                <p className="text-sm text-gray-900 dark:text-white">{result.borderRadius}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Shadows</p>
                <p className="text-sm text-gray-900 dark:text-white">{result.shadows}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AIToolLayout>
  );
}
