import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import { Terminal, Code, Webhook, BookOpen, Key, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Developers() {
  const [activeTab, setActiveTab] = useState<'curl' | 'js' | 'python'>('curl');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    curl: `curl -X GET "https://api.themeshopy.com/v1/products" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`,
    js: `const fetch = require('node-fetch');

fetch('https://api.themeshopy.com/v1/products', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Accept': 'application/json'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));`,
    python: `import requests

url = "https://api.themeshopy.com/v1/products"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Accept": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    toast.success('Code snippet copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Side Menu */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">API Reference</h3>
              <nav className="space-y-1">
                {[
                  { icon: BookOpen, label: 'Getting Started' },
                  { icon: Key, label: 'Authentication' },
                  { icon: Code, label: 'Products API' },
                  { icon: Webhook, label: 'Webhooks Sync' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={idx}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                        idx === 2 
                          ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Docs Content */}
          <main className="flex-1 min-w-0 space-y-8">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5" /> API Documentation
              </span>
              <h1 className="text-3xl font-extrabold font-heading text-gray-900 dark:text-white">Fetch Products List</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Retrieve a list of active products uploaded to the marketplace, complete with pricing, category tags, and average rating metrics.</p>
            </div>

            {/* HTTP Request Method Badge */}
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg uppercase tracking-wider">GET</span>
              <span className="font-mono text-xs text-gray-700 dark:text-gray-300">https://api.themeshopy.com/v1/products</span>
            </div>

            {/* Code Block Container */}
            <div className="bg-gray-950 rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
              {/* Header Tabs */}
              <div className="bg-gray-900 px-4 py-2 border-b border-gray-800 flex items-center justify-between">
                <div className="flex gap-2">
                  {(['curl', 'js', 'python'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors ${
                        activeTab === tab 
                          ? 'bg-gray-850 text-white border border-gray-700' 
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {tab === 'curl' ? 'cURL' : tab === 'js' ? 'JavaScript' : 'Python'}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleCopy}
                  className="p-1.5 text-gray-500 hover:text-white rounded-lg transition-colors"
                  title="Copy snippet"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Code Panel */}
              <pre className="p-5 overflow-x-auto text-xs font-mono text-gray-300 leading-relaxed bg-gray-950/80">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>

            {/* Response Scheme details */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Response Schema (JSON)</h3>
              <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 font-mono text-xs text-gray-700 dark:text-gray-300">
                {`{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "prod_1",
      "title": "Nexus Dashboard template",
      "price": 59.00,
      "category": "Admin Dashboards",
      "rating": 4.90,
      "sales": 1247
    }
  ]
}`}
              </div>
            </div>
          </main>

        </div>
      </div>
    </MainLayout>
  );
}
