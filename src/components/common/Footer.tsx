import { Link } from 'react-router-dom';
import { Package, Twitter, Github, Linkedin, Youtube, Mail } from 'lucide-react';

const footerLinks = {
  Marketplace: [
    { label: 'Browse All', href: '/marketplace' },
    { label: 'Website Themes', href: '/marketplace?cat=website-themes' },
    { label: 'React Templates', href: '/marketplace?cat=react-templates' },
    { label: 'UI Kits', href: '/marketplace?cat=ui-kits' },
    { label: 'SaaS Boilerplates', href: '/marketplace?cat=saas-boilerplates' },
    { label: 'Trending', href: '/marketplace?sort=trending' },
  ],
  Creators: [
    { label: 'Become a Seller', href: '/register?role=seller' },
    { label: 'Seller Dashboard', href: '/dashboard/seller' },
    { label: 'Upload Product', href: '/dashboard/seller/upload' },
    { label: 'Affiliate Program', href: '/affiliate' },
    { label: 'Creator Resources', href: '/creators' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Careers', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Enterprise', href: '/enterprise' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Cookie Policy', href: '/privacy' },
    { label: 'Licenses', href: '/pricing' },
  ],
};

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-heading">
                <span className="text-indigo-400">The</span>
                <span className="text-white">Me</span>
                <span className="text-emerald-400">Shopy</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              The premier marketplace for premium digital products. Discover themes, templates, UI kits, and more from top creators worldwide.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
                >
                  <s.icon className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-1">Stay updated</h4>
              <p className="text-sm">Get the latest products and offers delivered to your inbox.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button type="submit" className="btn-primary whitespace-nowrap text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2024 TheMeShopy. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
