import DashboardLayout from '@/layouts/DashboardLayout';
import { Settings, Save, Globe, Shield, DollarSign, Bell, Mail, Palette, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const settingSections = [
  { id: 'general', icon: Globe, label: 'General' },
  { id: 'payments', icon: DollarSign, label: 'Payments' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'email', icon: Mail, label: 'Email' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
];

const defaultSettings = {
  // General
  platformName: 'TheMeShopy',
  platformUrl: 'https://themeshopy.com',
  supportEmail: 'support@themeshopy.com',
  defaultCurrency: 'USD',
  platformDesc: 'The premium marketplace for digital products.',
  maintenanceMode: false,
  allowRegistrations: true,
  emailVerification: true,
  
  // Payments
  commissionRate: '20',
  minimumPayout: '50',
  payoutSchedule: 'Monthly',
  refundWindow: '14',
  
  // Security
  twoFactor: true,
  rateLimiting: true,
  ipWhitelisting: false,
  auditLogging: true,
  
  // Notifications
  notifySellerReg: true,
  notifyDisputes: true,
  notifyRefunds: true,
  notifyDailyDigest: false,
  notifySystemUpdate: true,
  
  // Email
  smtpHost: 'smtp.mailgun.org',
  smtpPort: '587',
  smtpUsername: 'postmaster@themeshopy.com',
  smtpPassword: 'password123',
  senderName: 'TheMeShopy Admin',
  senderEmail: 'noreply@themeshopy.com',
  
  // Appearance
  themeMode: 'dark',
  colorTheme: 'Indigo',
  fontFamily: 'Inter (Default)'
};

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const savedData = localStorage.getItem('themeshopy_admin_settings');
    if (savedData) {
      try {
        setSettings(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse admin settings', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('themeshopy_admin_settings', JSON.stringify(settings));
    setSaved(true);
    toast.success('Platform settings saved successfully!');
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
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
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              
              {/* General Tab */}
              {activeSection === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Platform Name</label>
                      <input type="text" value={settings.platformName} onChange={e => updateSetting('platformName', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Platform URL</label>
                      <input type="url" value={settings.platformUrl} onChange={e => updateSetting('platformUrl', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Support Email</label>
                      <input type="email" value={settings.supportEmail} onChange={e => updateSetting('supportEmail', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Default Currency</label>
                      <input type="text" value={settings.defaultCurrency} onChange={e => updateSetting('defaultCurrency', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Platform Description</label>
                    <textarea value={settings.platformDesc} onChange={e => updateSetting('platformDesc', e.target.value)} rows={3} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Temporarily disable the marketplace for maintenance' },
                      { key: 'allowRegistrations', label: 'Allow New Registrations', desc: 'Enable or disable new user sign-ups' },
                      { key: 'emailVerification', label: 'Email Verification Required', desc: 'Require email verification for new accounts' },
                    ].map(toggle => (
                      <div key={toggle.key} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{toggle.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{toggle.desc}</p>
                        </div>
                        <button 
                          onClick={() => updateSetting(toggle.key, !((settings as any)[toggle.key]))}
                          className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${((settings as any)[toggle.key]) ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${((settings as any)[toggle.key]) ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeSection === 'payments' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Settings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Platform Commission Rate</label>
                      <div className="flex">
                        <input type="text" value={settings.commissionRate} onChange={e => updateSetting('commissionRate', e.target.value)} className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-l-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <span className="px-3 py-2 bg-gray-100 dark:bg-gray-650 border border-l-0 border-gray-250 dark:border-gray-600 rounded-r-lg text-xs text-gray-500 dark:text-gray-400 flex items-center">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Minimum Payout Amount</label>
                      <div className="flex">
                        <input type="text" value={settings.minimumPayout} onChange={e => updateSetting('minimumPayout', e.target.value)} className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-l-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <span className="px-3 py-2 bg-gray-100 dark:bg-gray-650 border border-l-0 border-gray-250 dark:border-gray-600 rounded-r-lg text-xs text-gray-500 dark:text-gray-400 flex items-center">$</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Payout Schedule</label>
                      <select value={settings.payoutSchedule} onChange={e => updateSetting('payoutSchedule', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Weekly</option>
                        <option>Bi-weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Refund Window</label>
                      <div className="flex">
                        <input type="text" value={settings.refundWindow} onChange={e => updateSetting('refundWindow', e.target.value)} className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-l-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <span className="px-3 py-2 bg-gray-100 dark:bg-gray-650 border border-l-0 border-gray-250 dark:border-gray-600 rounded-r-lg text-xs text-gray-500 dark:text-gray-400 flex items-center">days</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 font-heading">Payment Gateways</h3>
                    {['Stripe', 'PayPal', 'Razorpay'].map(gateway => (
                      <div key={gateway} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{gateway}</p>
                            <p className="text-xs text-emerald-600">Connected</p>
                          </div>
                        </div>
                        <button onClick={() => toast.info(`${gateway} configuration modal triggered`)} className="text-xs text-indigo-600 font-medium hover:text-indigo-755">Configure</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h2>
                  <div className="space-y-3">
                    {[
                      { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Require 2FA for admin accounts' },
                      { key: 'rateLimiting', label: 'Rate Limiting', desc: 'Limit API requests per IP address' },
                      { key: 'ipWhitelisting', label: 'IP Whitelisting', desc: 'Restrict admin access to specific IPs' },
                      { key: 'auditLogging', label: 'Audit Logging', desc: 'Log all admin actions for compliance' },
                    ].map(toggle => (
                      <div key={toggle.key} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{toggle.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{toggle.desc}</p>
                        </div>
                        <button 
                          onClick={() => updateSetting(toggle.key, !((settings as any)[toggle.key]))}
                          className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${((settings as any)[toggle.key]) ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${((settings as any)[toggle.key]) ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications Settings</h2>
                  <div className="space-y-4">
                    {[
                      { key: 'notifySellerReg', label: 'New Seller Registrations', desc: 'Notify admins when a new seller signs up' },
                      { key: 'notifyDisputes', label: 'New Disputes Opened', desc: 'Send alert when a customer opens a dispute' },
                      { key: 'notifyRefunds', label: 'Refund Requests', desc: 'Alert when a buyer requests a refund' },
                      { key: 'notifyDailyDigest', label: 'Daily Digest Email', desc: 'Receive a daily summary of sales and sign-ups' },
                      { key: 'notifySystemUpdate', label: 'System Update Notifications', desc: 'Get updates regarding system updates and patches' },
                    ].map(toggle => (
                      <div key={toggle.key} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{toggle.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{toggle.desc}</p>
                        </div>
                        <button 
                          onClick={() => updateSetting(toggle.key, !((settings as any)[toggle.key]))}
                          className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${((settings as any)[toggle.key]) ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${((settings as any)[toggle.key]) ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Email Tab */}
              {activeSection === 'email' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email Settings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">SMTP Host</label>
                      <input type="text" value={settings.smtpHost} onChange={e => updateSetting('smtpHost', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">SMTP Port</label>
                      <input type="text" value={settings.smtpPort} onChange={e => updateSetting('smtpPort', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">SMTP Username</label>
                      <input type="text" value={settings.smtpUsername} onChange={e => updateSetting('smtpUsername', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">SMTP Password</label>
                      <input type="password" value={settings.smtpPassword} onChange={e => updateSetting('smtpPassword', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Sender Name</label>
                      <input type="text" value={settings.senderName} onChange={e => updateSetting('senderName', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Sender Email</label>
                      <input type="email" value={settings.senderEmail} onChange={e => updateSetting('senderEmail', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 font-heading">Email Templates</h3>
                    <div className="space-y-3">
                      {['Welcome Email', 'Purchase Receipt', 'Dispute Alert', 'Seller Approved'].map(t => (
                        <div key={t} className="flex items-center justify-between py-2 border-b border-gray-55 dark:border-gray-700/50 last:border-0">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{t}</span>
                          <button onClick={() => toast.info(`Email Template configuration details: ${t}`)} className="text-xs text-indigo-600 font-medium hover:underline">Edit Template</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeSection === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Default Theme Mode</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['light', 'dark', 'system'].map(mode => (
                          <button
                            key={mode}
                            onClick={() => updateSetting('themeMode', mode)}
                            className={`px-4 py-3 text-sm font-medium rounded-xl border text-center capitalize transition-colors ${
                              settings.themeMode === mode 
                                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                                : 'border-gray-100 dark:border-gray-700 hover:border-indigo-500 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Primary Color Theme</label>
                      <div className="flex flex-wrap gap-2">
                        {['Indigo', 'Violet', 'Blue', 'Emerald', 'Amber', 'Rose'].map(color => (
                          <button
                            key={color}
                            onClick={() => updateSetting('colorTheme', color)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                              settings.colorTheme === color
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-500 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">Primary Font Family</label>
                      <select value={settings.fontFamily} onChange={e => updateSetting('fontFamily', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Inter (Default)</option>
                        <option>Outfit</option>
                        <option>Roboto</option>
                        <option>Sans-Serif</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
