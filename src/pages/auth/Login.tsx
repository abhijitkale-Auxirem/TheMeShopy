import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Package, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

const demoCredentials = [
  { role: 'Admin', email: 'admin@themeshopy.com', password: 'Password123' },
  { role: 'Seller', email: 'seller@themeshopy.com', password: 'Password123' },
  { role: 'Buyer', email: 'buyer@themeshopy.com', password: 'Password123' },
  { role: 'Affiliate', email: 'affiliate@themeshopy.com', password: 'Password123' },
  { role: 'Agency', email: 'agency@themeshopy.com', password: 'Password123' },
];

export default function Login() {
  const [loginMode, setLoginMode] = useState<'credentials' | 'otp'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (loginMode === 'otp') {
      if (!otpSent) {
        setError('Please click Send OTP first.');
        return;
      }
      if (otp === '123456') {
        toast.success('Mobile verification successful!');
        // Log in as buyer mock for demo
        await login('buyer@themeshopy.com', 'Password123');
        navigate(from, { replace: true });
      } else {
        setError('Invalid OTP code. Use "123456" for demo validation.');
      }
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const fillDemo = (cred: typeof demoCredentials[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setLoginMode('credentials');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-center text-white px-12">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold font-heading">TheMeShopy</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 font-heading">Welcome Back!</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Access your dashboard, manage products, and track your earnings all in one place.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 text-left">
            {[
              { label: 'Products', value: '15,000+' },
              { label: 'Creators', value: '5,000+' },
              { label: 'Customers', value: '250,000+' },
              { label: 'Countries', value: '180+' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-white/5 rounded-full" />
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold font-heading">
              <span className="text-indigo-600">The</span>MeShopy
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heading mb-2">Sign In</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">Create one free</Link>
          </p>

          {/* Login Mode Switch */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6 shadow-sm">
            <button 
              type="button" 
              onClick={() => { setError(''); setLoginMode('credentials'); }} 
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${loginMode === 'credentials' ? 'bg-white dark:bg-gray-700 text-indigo-650 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              Email Login
            </button>
            <button 
              type="button" 
              onClick={() => { setError(''); setLoginMode('otp'); }} 
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${loginMode === 'otp' ? 'bg-white dark:bg-gray-700 text-indigo-650 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              Mobile OTP
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl shadow-sm">
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-2 uppercase tracking-wide">Demo Credentials</p>
            <div className="flex flex-wrap gap-2">
              {demoCredentials.map(cred => (
                <button
                  key={cred.role}
                  onClick={() => fillDemo(cred)}
                  className="text-xs px-3 py-1.5 bg-white dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors font-medium shadow-xs"
                >
                  {cred.role}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMode === 'credentials' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-semibold">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 font-semibold">Password</label>
                    <Link to="/forgot-password" className="text-xs text-indigo-650 hover:text-indigo-700">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-semibold">Mobile Number</label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        if (phone.trim()) {
                          setOtpSent(true);
                          toast.success('Verification OTP code sent to your phone! Use "123456" to check.');
                        } else {
                          toast.error('Please enter a mobile phone number.');
                        }
                      }} 
                      className="px-4 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-650 dark:text-indigo-400 text-xs font-semibold rounded-xl border border-indigo-250 dark:border-indigo-700 hover:bg-indigo-100/50"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-semibold">Verification Code</label>
                    <input
                      type="text"
                      required
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center tracking-[0.5em] font-bold text-sm"
                    />
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-md text-sm mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8 pt-6 border-t border-gray-150 dark:border-gray-800 space-y-4">
            <p className="text-center text-xs text-gray-400 font-semibold uppercase tracking-wider">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                onClick={() => {
                  login('buyer@themeshopy.com', 'Password123').then(() => {
                    toast.success('Signed in with Google (Mock)');
                    navigate(from, { replace: true });
                  });
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.187 4.114-3.518 0-6.386-2.87-6.386-6.386 0-3.517 2.868-6.386 6.386-6.386 1.572 0 2.991.572 4.093 1.517l3.14-3.14C19.167 2.204 15.86 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.898 0 10.87-4.143 11.51-9.96H12.24z"/>
                </svg>
                Google
              </button>
              <button 
                type="button"
                onClick={() => {
                  login('seller@themeshopy.com', 'Password123').then(() => {
                    toast.success('Signed in with GitHub (Mock)');
                    navigate(from, { replace: true });
                  });
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
