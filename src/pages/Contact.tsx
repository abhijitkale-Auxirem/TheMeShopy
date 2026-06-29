import MainLayout from '@/layouts/MainLayout';
import { Mail, MapPin, Phone, Send, MessageSquare, HeadphonesIcon, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <MainLayout>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white font-heading mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">We'd love to hear from you. Send us a message and we'll respond promptly.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Contact Information</h2>
            {[
              { icon: Mail, title: 'Email', value: 'support@themeshopy.com', sub: 'We reply within 24 hours' },
              { icon: Phone, title: 'Phone', value: '+1 (555) 000-1234', sub: 'Mon–Fri 9am–6pm EST' },
              { icon: MapPin, title: 'Office', value: '123 Market Street', sub: 'San Francisco, CA 94102' },
            ].map(c => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{c.title}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{c.value}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{c.sub}</p>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Other Support Options</h3>
              {[
                { icon: MessageSquare, label: 'Live Chat', sub: 'Available 9am-6pm EST' },
                { icon: HeadphonesIcon, label: 'Priority Support', sub: 'For Pro subscribers' },
                { icon: BookOpen, label: 'Help Center', sub: 'Browse our documentation' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-indigo-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.label}</p>
                      <p className="text-xs text-gray-400">{s.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required placeholder="How can we help?"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5} placeholder="Tell us more about your question or issue..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary py-3 px-8 flex items-center gap-2">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" />Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
