import DashboardLayout from '@/layouts/DashboardLayout';
import { Settings, Save, Globe, Shield, DollarSign, Bell, Mail, Palette, CreditCard, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const settingSections = [
  { id: 'general', icon: Globe, label: 'General' },
  { id: 'payments', icon: DollarSign, label: 'Payments' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'email', icon: Mail, label: 'Email' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
];

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Platform Settings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Configure global platform settings</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${saved ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-2">
              {settingSections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${activeSection === section.id ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
              {activeSection === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Platform Name', value: 'TheMeShopy', type: 'text' },
                      { label: 'Platform URL', value: 'https://themeshopy.com', type: 'url' },
                      { label: 'Support Email', value: 'support@themeshopy.com', type: 'email' },
                      { label: 'Default Currency', value: 'USD', type: 'text' },
                    ].map(field => (
                      <div key={field.label}>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">{field.label}</label>
                        <input type={field.type} defaultValue={field.value} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Platform Description</label>
                    <textarea defaultValue="The premium marketplace for digital products." rows={3} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Maintenance Mode', desc: 'Temporarily disable the marketplace for maintenance' },
                      { label: 'Allow New Registrations', desc: 'Enable or disable new user sign-ups' },
                      { label: 'Email Verification Required', desc: 'Require email verification for new accounts' },
                    ].map(toggle => (
                      <div key={toggle.label} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{toggle.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{toggle.desc}</p>
                        </div>
                        <button className="relative w-11 h-6 bg-indigo-600 rounded-full transition-colors focus:outline-none">
                          <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'payments' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Settings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Platform Commission Rate', value: '20', unit: '%' },
                      { label: 'Minimum Payout Amount', value: '50', unit: '$' },
                      { label: 'Payout Schedule', value: 'Monthly', unit: '' },
                      { label: 'Refund Window (days)', value: '14', unit: 'days' },
                    ].map(field => (
                      <div key={field.label}>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">{field.label}</label>
                        <div className="flex">
                          <input type="text" defaultValue={field.value} className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-l-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                          {field.unit && <span className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-200 dark:border-gray-600 rounded-r-lg text-xs text-gray-500 dark:text-gray-400">{field.unit}</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Payment Gateways</h3>
                    {['Stripe', 'PayPal', 'Razorpay'].map(gateway => (
                      <div key={gateway} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{gateway}</p>
                            <p className="text-xs text-emerald-600">Connected</p>
                          </div>
                        </div>
                        <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">Configure</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h2>
                  <div className="space-y-3">
                    {[
                      { label: 'Two-Factor Authentication', desc: 'Require 2FA for admin accounts', enabled: true },
                      { label: 'Rate Limiting', desc: 'Limit API requests per IP address', enabled: true },
                      { label: 'IP Whitelisting', desc: 'Restrict admin access to specific IPs', enabled: false },
                      { label: 'Audit Logging', desc: 'Log all admin actions for compliance', enabled: true },
                    ].map(toggle => (
                      <div key={toggle.label} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{toggle.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{toggle.desc}</p>
                        </div>
                        <button className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${toggle.enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}>
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggle.enabled ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection !== 'general' && activeSection !== 'payments' && activeSection !== 'security' && (
                <div className="py-16 text-center">
                  <Settings className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 capitalize">{activeSection} settings coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
