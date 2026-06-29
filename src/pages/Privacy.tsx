import MainLayout from '@/layouts/MainLayout';

export default function Privacy() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-heading mb-2">Privacy Policy</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">Last updated: June 2024</p>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {[
            { 
              title: '1. Information We Collect', 
              content: 'We collect personal information that you provide directly, such as your name, email address, password, billing information, and profile details when you register, make a purchase, or contact support. Additionally, we automatically collect tracking metrics like IP addresses, browser types, and usage data via cookies.' 
            },
            { 
              title: '2. How We Use Your Information', 
              content: 'We use your data to facilitate transaction processes, manage buyer/seller relationships, customize user dashboard metrics, send updates (such as code updates and notifications), improve platform algorithms, and prevent malicious actions or fraud.' 
            },
            { 
              title: '3. Data Sharing & Third-Parties', 
              content: 'We do not sell your personal data. We share information only with trusted service partners, such as payment gateways (Stripe, PayPal, Razorpay) to complete transactions, analytics trackers to evaluate traffic, and cloud service providers to host files.' 
            },
            { 
              title: '4. Cookies & Local Tracking', 
              content: 'TheMeShopy uses cookies and local browser storage to keep you logged in, save your shopping cart items, remember preferences, and analyze advertising success. You can control cookies inside your browser parameters.' 
            },
            { 
              title: '5. Security Protocols', 
              content: 'We secure communications using SSL encryption. Sensitive credentials like passwords and payment keys are encrypted. While we perform regular checks, no transmission over the web is 100% secure.' 
            },
            { 
              title: '6. User Control & Data Rights', 
              content: 'You can update your personal information inside the Profile Settings panel. You have the right to request a download copy of your platform data or require complete removal/deactivation of your account by contacting support.' 
            },
            { 
              title: '7. Updates to This Policy', 
              content: 'We update this Privacy Policy occasionally. We will notify you of material changes by placing a banner on the website or posting an announcement in the dashboard notifications.' 
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
