import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const faqCategories = [
  {
    category: 'Buying & Downloads',
    faqs: [
      { q: 'How do I download my purchase?', a: 'After completing your purchase, go to Dashboard > My Downloads. All purchased products will be available for immediate download.' },
      { q: 'Can I re-download my purchases?', a: 'Yes! All purchases give you lifetime access. You can re-download from your dashboard at any time.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, PayPal, and Apple Pay via our secure Stripe payment processor.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. We never store your card information. All payments are processed securely by Stripe, which is PCI DSS compliant.' },
    ],
  },
  {
    category: 'Licenses',
    faqs: [
      { q: 'What is the Regular License?', a: 'The Regular License allows you to use the product in one end product (website, app, etc.) for personal or commercial use. The end product is not sold.' },
      { q: 'What is the Extended License?', a: 'The Extended License allows you to use the product in unlimited end products. The end product can also be sold or redistributed.' },
      { q: 'Can I use products for client work?', a: 'Yes, with a Regular License you can use products for client work as long as only one end product is created per license.' },
    ],
  },
  {
    category: 'Selling',
    faqs: [
      { q: 'How do I become a seller?', a: 'Register an account, go to your profile settings and switch to Seller mode. Submit your first product for review — approval takes 1-2 business days.' },
      { q: 'How much can I earn?', a: 'Sellers keep 70-80% of every sale depending on their seller tier. There is no cap on earnings.' },
      { q: 'When do I get paid?', a: 'Payouts are processed every Monday for the previous week earnings, directly to your PayPal or bank account.' },
    ],
  },
  {
    category: 'Refunds & Support',
    faqs: [
      { q: 'What is the refund policy?', a: 'We offer 14-day refunds if the product has major technical issues that cannot be resolved by the seller. We review all refund requests case by case.' },
      { q: 'How do I contact support?', a: 'Use the live chat on our website, submit a ticket through the help center, or email support@themeshopy.com.' },
      { q: 'How do I get product support?', a: 'Each product comes with 6 months of free support from the creator. Go to your purchase history and click "Get Support" for any product.' },
    ],
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <MainLayout>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white font-heading mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to know about buying, selling, and using TheMeShopy.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {faqCategories.map(cat => (
            <div key={cat.category}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading mb-4">{cat.category}</h2>
              <div className="space-y-2">
                {cat.faqs.map((faq, i) => {
                  const key = `${cat.category}-${i}`;
                  const open = openItem === key;
                  return (
                    <div key={key} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                      <button onClick={() => setOpenItem(open ? null : key)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">{faq.q}</span>
                        <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
                      </button>
                      {open && <div className="px-6 pb-4"><p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
