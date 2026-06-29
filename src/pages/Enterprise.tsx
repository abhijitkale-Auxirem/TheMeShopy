import MainLayout from '@/layouts/MainLayout';
import { ShieldCheck, Server, FileLock2, HeartHandshake, CheckCircle2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Enterprise() {
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '', size: '50-200' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoForm.name && demoForm.email) {
      setSubmitted(true);
      toast.success('Enterprise demo request received! Sales team will follow up.');
    }
  };

  return (
    <MainLayout>
      <div className="animate-fade-in text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-950/20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%)]" />
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Hero Details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Enterprise Grade
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight tracking-tight text-white">
                Premium digital assets, secure licensing at <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Scale</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
                Empower your engineering organizations with pre-approved source files, custom master service agreements (MSA), compliance reviews, and centralized billing.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {['SOC-2 Certified', 'GDPR Compliant', 'Custom MSA Support', 'SSO Integrated'].map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Demo Form */}
            <div className="lg:col-span-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 shadow-xl text-gray-900 dark:text-white">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold font-heading">Thank You!</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Our Enterprise Account Manager will email you within 4 hours to arrange your custom dashboard demonstration.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold font-heading">Request Enterprise Demo</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Fill in the form to download a custom trial package of our React & Admin templates.</p>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={demoForm.name}
                      onChange={e => setDemoForm({ ...demoForm, name: e.target.value })}
                      placeholder="Jane Doe" 
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Work Email</label>
                    <input 
                      type="email" 
                      required
                      value={demoForm.email}
                      onChange={e => setDemoForm({ ...demoForm, email: e.target.value })}
                      placeholder="jane@company.com" 
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Company Name</label>
                      <input 
                        type="text" 
                        required
                        value={demoForm.company}
                        onChange={e => setDemoForm({ ...demoForm, company: e.target.value })}
                        placeholder="ACME Corp" 
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Team Size</label>
                      <select 
                        value={demoForm.size}
                        onChange={e => setDemoForm({ ...demoForm, size: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>10-50</option>
                        <option>50-200</option>
                        <option>200-500</option>
                        <option>500+</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 mt-2">
                    Submit Request <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Enterprise Perks */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">Enterprise Capability Matrix</h2>
            <p className="text-gray-550 dark:text-gray-400">Engineered to support corporate governance and risk management compliance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Server,
                title: 'High Availability Storage',
                desc: 'Access code repositories directly from geo-replicated private packages. Guaranteed 99.9% uptime for download files access.'
              },
              {
                icon: FileLock2,
                title: 'Custom Legal Addendums',
                desc: 'Incorporate your own terms of service, custom liability clauses, and transfer copyrights to corporate holding firms.'
              },
              {
                icon: HeartHandshake,
                title: 'Dedicated Account Manager',
                desc: 'Work with a single contact point for setup assistance, licensing support, custom billing/invoicing, and security checks.'
              }
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
