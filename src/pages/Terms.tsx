import MainLayout from '@/layouts/MainLayout';

export default function Terms() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-heading mb-2">Terms of Service</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">Last updated: June 2024</p>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {[
            { title: '1. Acceptance of Terms', content: 'By accessing TheMeShopy, you agree to these Terms of Service. If you do not agree, please do not use our platform. These terms apply to all users, including buyers, sellers, and visitors.' },
            { title: '2. User Accounts', content: 'You must create an account to purchase or sell products. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Provide accurate information during registration.' },
            { title: '3. Marketplace Rules', content: 'Sellers must only upload original work or work they have rights to sell. All products must comply with our quality standards. We reserve the right to remove any product that violates our guidelines.' },
            { title: '4. Licenses', content: 'Each product comes with either a Regular or Extended License. Regular License permits use in one end product. Extended License permits use in unlimited products. Licenses are non-transferable.' },
            { title: '5. Payments and Fees', content: 'All prices are in USD. Sellers receive 70-80% of each sale depending on their tier. We process payments through Stripe. Payouts are made weekly.' },
            { title: '6. Refund Policy', content: 'Refunds are available within 14 days of purchase if the product has significant technical issues that cannot be resolved. We review all refund requests individually.' },
            { title: '7. Intellectual Property', content: 'All content on TheMeShopy remains the property of their respective creators. By using our platform, you agree not to copy, distribute, or create derivative works without proper licensing.' },
          ].map(section => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
