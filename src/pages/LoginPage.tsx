import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  User, 
  Shield, 
  AlertCircle,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { demoCredentials } from '@/data/mockData';
import type { UserRole } from '@/types';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export function LoginPage({ onBack, onLoginSuccess }: LoginPageProps) {
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password, activeRole);
    
    if (result.success) {
      onLoginSuccess(activeRole);
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  const fillDemoCredentials = () => {
    if (activeRole === 'student') {
      setEmail(demoCredentials.student.email);
      setPassword(demoCredentials.student.password);
    } else {
      setEmail(demoCredentials.admin.email);
      setPassword(demoCredentials.admin.password);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-[45%] xl:w-[40%] gradient-navy-blue flex-col justify-between p-12 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Decorative */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-brand-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-amber-accent/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">InnovGenius</span>
          </div>
          
          <h1 className="font-display text-4xl xl:text-5xl text-white mb-6 leading-tight">
            Welcome to Your
            <span className="block text-brand-light">Onboarding Journey</span>
          </h1>
          
          <p className="text-white/70 text-lg max-w-md leading-relaxed">
            Complete your admission process seamlessly with our AI-powered platform. 
            Track progress, upload documents, and get instant assistance.
          </p>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex -space-x-3">
              {['Arjun', 'Priya', 'Sneha', 'Rahul'].map((name) => (
                <div 
                  key={name}
                  className="w-10 h-10 rounded-full border-2 border-navy-dark bg-gradient-to-br from-brand-pale to-brand-blue flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-navy-dark">{name[0]}</span>
                </div>
              ))}
            </div>
            <div className="text-white/80 text-sm">
              <span className="font-semibold text-white">500+</span> students onboarded
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <CheckCircle className="w-4 h-4 text-success" />
            <span>Secure & Verified Process</span>
          </div>
        </div>
      </motion.div>
      
      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Back Button */}
          <button 
            onClick={onBack}
            className="lg:hidden flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-card p-8 border border-slate-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-brand-pale rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-7 h-7 text-brand-blue" />
              </div>
              <h2 className="text-2xl font-bold text-navy-dark mb-1">Sign In</h2>
              <p className="text-slate-500 text-sm">Access your onboarding dashboard</p>
            </div>
            
            {/* Role Toggle */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveRole('student');
                  setEmail('');
                  setPassword('');
                  setError('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  activeRole === 'student' 
                    ? 'bg-white text-brand-blue shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <User className="w-4 h-4" />
                Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveRole('admin');
                  setEmail('');
                  setPassword('');
                  setError('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  activeRole === 'admin' 
                    ? 'bg-white text-brand-blue shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="label-innov">
                  {activeRole === 'student' ? 'Roll Number / Email' : 'Email Address'}
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeRole === 'student' ? 'e.g., IN2025001' : 'admin@innov.edu'}
                  className="input-innov"
                  required
                />
              </div>
              
              {/* Password Field */}
              <div>
                <label className="label-innov">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input-innov pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-danger-pale rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 text-danger flex-shrink-0" />
                  <span className="text-sm text-danger">{error}</span>
                </motion.div>
              )}
              
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-blue hover:bg-brand-light text-white font-semibold py-3 rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full flex items-center justify-center gap-2 p-3 bg-brand-muted rounded-xl text-sm text-brand-blue hover:bg-brand-pale transition-colors"
              >
                <span className="font-medium">Try Demo Account</span>
                <span className="text-slate-500">
                  {activeRole === 'student' ? '(Student)' : '(Admin)'}
                </span>
              </button>
              <p className="text-center text-xs text-slate-400 mt-2">
                Click to auto-fill demo credentials
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Need help?{' '}
            <a href="#" className="text-brand-blue hover:underline font-medium">
              Contact Support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
