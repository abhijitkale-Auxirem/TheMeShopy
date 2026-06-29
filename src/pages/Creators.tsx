import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, DollarSign, Users, Award, ShieldCheck, Zap, ArrowRight, Star } from 'lucide-react';

export default function Creators() {
  const [sales, setSales] = useState(50);
  const [price, setPrice] = useState(49);
  
  // Calculate projected earnings based on sales count, price, and 80% commission
  const earnings = Math.round(sales * price * 0.8);

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_40%)]" />
          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Sell Your Themes & Templates
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading leading-tight tracking-tight">
              Turn your pixels & code into <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">recurring revenue</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg">
              TheMeShopy is the premium marketplace for designers and developer creators. Upload UI Kits, dashboards, CMS themes, or SaaS boilerplates and earn up to 80% per sale.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/register?role=seller" className="btn-primary flex items-center gap-2 px-6 py-3 text-base">
                Join as a Creator <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#calculator" className="btn-secondary px-6 py-3 text-base bg-gray-800 hover:bg-gray-700 text-white border-gray-700">
                Calculate Earnings
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">Built specifically for modern creators</h2>
              <p className="text-gray-500 dark:text-gray-400">Everything you need to list, sell, and support your premium products.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: DollarSign,
                  title: 'Industry-Leading Payouts',
                  desc: 'Keep up to 80% of your earnings with zero hidden transaction costs. Transparent tiers that reward higher volumes.'
                },
                {
                  icon: Users,
                  title: 'Global Audience',
                  desc: 'Get immediate exposure to thousands of buyers looking for React, Vue, HTML themes, and Figma component libraries.'
                },
                {
                  icon: Award,
                  title: 'Premium Product Tiers',
                  desc: 'We support Regular, Extended, and Subscription-based licenses, giving you maximum packaging flexibility.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Anti-Piracy & Licensing',
                  desc: 'Every download includes unique cryptographically-hashed license keys to limit illegal sharing.'
                },
                {
                  icon: Zap,
                  title: 'Instant Setup',
                  desc: 'Create your digital shop in under 5 minutes. Upload assets, paste your Stripe details, and start collecting payouts.'
                },
                {
                  icon: Star,
                  title: 'Community Reviews',
                  desc: 'Enable direct buyers feedback to increase trust, gather bug reports, and iterate on upgrades.'
                }
              ].map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <div key={i} className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-4 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dynamic Earnings Calculator */}
        <section id="calculator" className="py-20 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-10 blur-xl rounded-full" />
              
              <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">Estimate Your Earnings</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Drag the sliders to see what you could earn as a seller on TheMeShopy.</p>
              </div>

              <div className="space-y-8">
                {/* Product Price Slider */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Average Product Price</span>
                    <span className="text-indigo-600 dark:text-indigo-400">${price} USD</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="300" 
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$10</span>
                    <span>$300</span>
                  </div>
                </div>

                {/* Sales Per Month Slider */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Monthly Sales Volume</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{sales} Sales</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="500" 
                    value={sales}
                    onChange={e => setSales(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5</span>
                    <span>500</span>
                  </div>
                </div>

                {/* Projected Profit */}
                <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/20 rounded-2xl p-6 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Projected Earnings Per Month</p>
                  <p className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white font-heading mt-2">${earnings.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1.5">Based on an 80% creator commission tier.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white dark:bg-gray-900 text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">Ready to list your first product?</h2>
          <p className="max-w-md mx-auto text-sm text-gray-500 dark:text-gray-400">Join a growing community of design and engineering creators building premium themes.</p>
          <div className="pt-2">
            <Link to="/register?role=seller" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">
              Create Seller Account Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
