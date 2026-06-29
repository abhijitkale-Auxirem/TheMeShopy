import MainLayout from '@/layouts/MainLayout';
import { Shield, Sparkles, Building, Briefcase, RefreshCw, Key, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Agencies() {
  return (
    <MainLayout>
      <div className="animate-fade-in bg-gray-50 dark:bg-gray-900/30">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.05),transparent_50%)]" />
          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" /> Agency Solutions
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading leading-tight tracking-tight text-gray-900 dark:text-white">
              Accelerate your client workflows with <span className="bg-gradient-to-r from-emerald-500 to-indigo-600 bg-clip-text text-transparent">Agency Licensing</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-base sm:text-lg">
              Empower your developers and designers to launch projects faster. Get bulk seats, extended client handoff licensing, and team-wide assets access.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/register?role=agency" className="btn-primary flex items-center gap-2 px-6 py-3 text-base">
                Create Agency Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn-secondary px-6 py-3 text-base border-gray-200 dark:border-gray-700">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">Designed for collaborative teams</h2>
            <p className="text-gray-500 dark:text-gray-400">Standardize your UI layouts, theme customizers, and codebases across clients.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Client Handoff License',
                desc: 'Transfer theme licenses to clients smoothly. We provide automated certificate generation for billing clarity.'
              },
              {
                icon: RefreshCw,
                title: 'Unlimited Worksheets',
                desc: 'Use components in drafts, mockups, and live prototypes. No limits on testing code sandbox configurations.'
              },
              {
                icon: Key,
                title: 'Team Shared Keys',
                desc: 'Provide single sign-on access to product updates and downloads. Access shared licenses from one central portal.'
              },
              {
                icon: Shield,
                title: 'Priority Security Tiers',
                desc: 'Dedicated technical ticket responses in under 2 hours, custom codebase patches, and direct developer slack support.'
              }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm space-y-4 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{feat.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Solutions Comparison / Pricing Grid */}
        <section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl font-bold text-gray-950 dark:text-white font-heading">Choose the right plan for your agency</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Scale up seats and support as your agency client pipeline grows.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Boutique Plan */}
              <div className="bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 relative flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Boutique Team</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For small studios and local design shops.</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white font-heading">$149</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">/ month</span>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">✓ Up to 5 Team Seats</li>
                    <li className="flex items-center gap-2">✓ 15 Client Handoff Licenses / mo</li>
                    <li className="flex items-center gap-2">✓ Regular Support SLA (24h)</li>
                    <li className="flex items-center gap-2">✓ Figma UI Library access</li>
                  </ul>
                </div>
                <Link to="/register?role=agency" className="btn-secondary w-full text-center mt-8 py-3 border-gray-300 dark:border-gray-700">
                  Get Started
                </Link>
              </div>

              {/* Growth Plan */}
              <div className="bg-white dark:bg-gray-800 border-2 border-emerald-500 rounded-3xl p-8 relative flex flex-col justify-between shadow-lg">
                <span className="absolute -top-3.5 right-6 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                  Popular Solution
                </span>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Growth Agency</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For medium-to-large development agencies.</p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white font-heading">$299</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">/ month</span>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">✓ Unlimited Team Seats</li>
                    <li className="flex items-center gap-2">✓ Unlimited Client Handoff Licenses</li>
                    <li className="flex items-center gap-2">✓ Priority SLA Support (2h response)</li>
                    <li className="flex items-center gap-2">✓ Direct Slack Developer channel</li>
                    <li className="flex items-center gap-2">✓ 1-on-1 Theme customizer calls</li>
                  </ul>
                </div>
                <Link to="/register?role=agency" className="btn-primary w-full text-center mt-8 py-3 bg-emerald-600 hover:bg-emerald-700 border-emerald-600">
                  Select Growth Plan
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
