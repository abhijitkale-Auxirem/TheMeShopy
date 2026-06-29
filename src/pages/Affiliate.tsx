import MainLayout from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Share2, DollarSign, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function Affiliate() {
  return (
    <MainLayout>
      <section className="py-20 gradient-hero text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Share2 className="w-14 h-14 mx-auto mb-6 text-white/80" />
          <h1 className="text-5xl font-extrabold font-heading mb-4">Earn With TheMeShopy</h1>
          <p className="text-xl text-white/80 mb-8">Refer buyers and earn 30% commission on every sale. No cap, no expiry.</p>
          <Link to="/register?role=affiliate" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
            Join Affiliate Program <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: DollarSign, title: '30% Commission', desc: 'Earn 30% on every sale made through your referral link. No minimum payout threshold.' },
              { icon: TrendingUp, title: 'Real-time Tracking', desc: 'Monitor clicks, conversions, and earnings in your affiliate dashboard in real time.' },
              { icon: Users, title: '60-Day Cookie', desc: 'Your referral cookie lasts 60 days. Get credit even if they buy weeks later.' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading mb-6">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Sign Up', desc: 'Create a free account and join the affiliate program in your dashboard.' },
                { step: '02', title: 'Share Your Link', desc: 'Get your unique referral link and share it on your blog, social media, or with clients.' },
                { step: '03', title: 'Earn Commissions', desc: 'Earn 30% commission on every purchase made through your link. Payout monthly.' },
              ].map(s => (
                <div key={s.step} className="flex gap-4">
                  <span className="text-4xl font-extrabold text-indigo-100 dark:text-indigo-900 font-heading flex-shrink-0">{s.step}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{s.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
