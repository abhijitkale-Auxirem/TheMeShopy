import MainLayout from '@/layouts/MainLayout';
import { mockUsers, mockProducts } from '@/database/mockDb';
import { Award, Globe, Users, Package, TrendingUp, Heart } from 'lucide-react';

const team = [
  { name: 'James Wilson', role: 'Founder & CEO', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', bio: 'Serial entrepreneur with 15+ years in digital products and marketplaces.' },
  { name: 'Sarah Chen', role: 'Chief Design Officer', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face', bio: 'Award-winning designer previously at Figma and Adobe.' },
  { name: 'Marcus Johnson', role: 'CTO', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', bio: 'Full-stack engineer with expertise in marketplaces and developer tools.' },
  { name: 'Priya Sharma', role: 'Head of Creator Success', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face', bio: 'Passionate about empowering creators to build sustainable online businesses.' },
];

const values = [
  { icon: Heart, title: 'Creator First', desc: 'We put creators at the heart of everything we do. Fair revenue sharing, excellent tools, and genuine support.' },
  { icon: Award, title: 'Quality Standards', desc: 'Every product is reviewed by our expert team. We maintain the highest standards in the industry.' },
  { icon: Globe, title: 'Global Community', desc: 'We are building the most diverse and inclusive digital marketplace community in the world.' },
  { icon: TrendingUp, title: 'Continuous Growth', desc: 'We constantly improve our platform based on feedback from creators and buyers alike.' },
];

export default function About() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="py-20 gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading mb-6">We're Building the Future<br />of Digital Commerce</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">TheMeShopy is the premium marketplace connecting world-class creators with developers and businesses who need exceptional digital products.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '15,000+', label: 'Digital Products', icon: Package },
              { value: '250,000+', label: 'Happy Customers', icon: Users },
              { value: '5,000+', label: 'Expert Creators', icon: Award },
              { value: '180+', label: 'Countries Served', icon: Globe },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 dark:text-white font-heading">{s.value}</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            We believe that great design and development should be accessible to everyone. Our mission is to empower creators to monetize their skills and help businesses ship faster with premium digital assets — all while maintaining the highest quality standards in the industry.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="text-center p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-2">{member.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
