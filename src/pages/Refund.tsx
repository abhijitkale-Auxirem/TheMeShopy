import MainLayout from '@/layouts/MainLayout';

export default function Refund() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-heading mb-2">Refund Policy</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">Last updated: June 2024</p>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {[
            { 
              title: '1. Standard 14-Day Guarantee', 
              content: 'Because our themes and digital templates are downloadable code assets, they are typically non-tangible. However, to maintain high quality, we offer a 14-day refund window from the date of purchase under specific technical eligibility conditions.' 
            },
            { 
              title: '2. Eligibility Conditions for Refunds', 
              content: 'You are eligible to claim a refund if: (a) The item is broken, buggy, or does not function as described; (b) The seller is unable to fix the technical issue within a reasonable period; (c) The asset is missing critical files detailed in the product details.' 
            },
            { 
              title: '3. Ineligibility Cases', 
              content: 'Refunds will not be issued if: (a) You simply changed your mind after downloading; (b) You do not have the required skills/tech stack (e.g. React, Node) to configure the asset; (c) The product is working but does not suit your project design anymore.' 
            },
            { 
              title: '4. Refund Request Procedure', 
              content: 'To submit a request, open the Disputes tab in your buyer dashboard or contact refund-claims@themeshopy.com. You must provide a description of the bug, screenshots of console logs, and order receipt ID.' 
            },
            { 
              title: '5. Resolution and Appeals', 
              content: 'Our team evaluates claims alongside the seller. If we verify a technical discrepancy, the refund is processed directly to your credit card or payment gateway within 5-10 business days, and access to download the item will be suspended.' 
            },
          ].map(section => (
            <div key={section.title} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
