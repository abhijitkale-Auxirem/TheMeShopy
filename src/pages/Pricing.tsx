import MainLayout from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Check, Zap, Building2, Crown, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter', icon: Zap, price: 0, period: 'Free forever',
    color: 'gray', popular: false,
    features: ['Access to free products', 'Basic support', 'Community access', '1 active download'],
    cta: 'Get Started Free', href: '/register',
  },
  {
    name: 'Professional', icon: Crown, price: 29, period: '/month',
    color: 'indigo', popular: true,
    features: ['Unlimited downloads', 'Premium support', 'All product categories', 'Commercial use', 'Regular license included', 'Early access to new products'],
    cta: 'Start Free Trial', href: '/register',
  },
  {
    name: 'Agency', icon: Building2, price: 79, period: '/month',
    color: 'purple', popular: false,
    features: ['Everything in Professional', 'Extended licenses', 'Team seats (up to 25)', 'Client project use', 'Bulk download', 'Priority support', 'Agency branding removal'],
    cta: 'Start Agency Trial', href: '/register?role=agency',
  },
];

const faqs = [
  { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel anytime. Your access continues until the end of your billing period.' },
  { q: 'What is the difference between Regular and Extended License?', a: 'Regular License allows use in one end product. Extended License allows unlimited commercial use and resale.' },
  { q: 'Do I get updates for purchased products?', a: 'Yes, all purchased products include lifetime free updates from the creator.' },
  { q: 'Is there a student discount?', a: 'Yes! Students get 50% off Professional plans with a valid .edu email.' },
];

export default function Pricing() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white font-heading mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include access to our marketplace and community.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(plan => {
              const Icon = plan.icon;
              return (
                <div key={plan.name} className={`relative bg-white dark:bg-gray-800 rounded-2xl border-2 p-8 ${plan.popular ? 'border-indigo-600 shadow-xl shadow-indigo-500/10' : 'border-gray-100 dark:border-gray-700'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${plan.popular ? 'bg-indigo-600' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    <Icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-heading mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.href} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-colors ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-400 text-gray-700 dark:text-gray-300'}`}>
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading text-center mb-10">Pricing FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
