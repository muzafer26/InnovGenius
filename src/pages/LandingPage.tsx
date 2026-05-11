import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  CheckCircle, 
  MessageCircle, 
  Shield, 
  Clock, 
  Users,
  ArrowRight,
  BarChart3,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onStudentLogin: () => void;
  onAdminLogin: () => void;
}

const features = [
  {
    icon: CheckCircle,
    title: '6-Step Onboarding',
    description: 'Structured workflow covering documents, fees, courses, and hostel allocation.'
  },
  {
    icon: MessageCircle,
    title: 'AI Assistant',
    description: 'Get instant answers to your admission queries from our intelligent EduBot.'
  },
  {
    icon: Shield,
    title: 'Secure & Verified',
    description: 'Document uploads with admin verification ensure data integrity.'
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Monitor your onboarding progress with visual indicators and status updates.'
  },
  {
    icon: Users,
    title: 'Admin Dashboard',
    description: 'College staff can review, approve, and manage all student submissions.'
  },
  {
    icon: Zap,
    title: 'Fast & Efficient',
    description: 'Complete your entire onboarding in under 48 hours from anywhere.'
  }
];

const stats = [
  { value: '90%', label: 'Completion Rate' },
  { value: '<48h', label: 'Avg. Onboarding Time' },
  { value: '70%', label: 'Less Admin Work' },
  { value: '4.5/5', label: 'Student Satisfaction' }
];

export function LandingPage({ onStudentLogin, onAdminLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-blue to-brand-light rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-navy-dark">InnovGenius</span>
            </div>
            
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">Features</a>
              <a href="#about" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">About</a>
              <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">Contact</a>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={onAdminLogin}
                className="hidden sm:flex text-sm font-medium text-slate-600 hover:text-slate-800"
              >
                Admin
              </Button>
              <Button 
                onClick={onStudentLogin}
                className="bg-brand-blue hover:bg-brand-light text-white text-sm font-semibold px-5"
              >
                Student Portal
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-navy">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/20" />
        </div>
        
        {/* Decorative Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/4 left-10 w-32 h-32 bg-brand-light rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
          className="absolute bottom-1/4 right-10 w-40 h-40 bg-amber-accent rounded-full blur-3xl"
        />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white/90">Smart Student Onboarding Agent</span>
            </div>
            
            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Your College Journey
              <span className="block text-brand-light">Starts Here</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              A seamless, AI-powered onboarding experience for engineering students. 
              Complete your admission process in under 48 hours with guided assistance.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button 
                onClick={onStudentLogin}
                size="lg"
                className="bg-brand-blue hover:bg-brand-light text-white text-base font-semibold px-8 py-6 rounded-xl shadow-lg shadow-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/30 transition-all hover:-translate-y-0.5"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Student Login
              </Button>
              <Button 
                onClick={onAdminLogin}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-base font-semibold px-8 py-6 rounded-xl"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Admin Dashboard
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold uppercase tracking-wider text-brand-blue mb-3 block">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark mb-4">
              Everything You Need for Smooth Onboarding
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform streamlines the entire admission process with intelligent automation 
              and real-time collaboration between students and administrators.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-pale rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-navy-dark mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-bold uppercase tracking-wider text-brand-blue mb-3 block">How It Works</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark mb-6">
                Simple Steps to Get Started
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our 6-step onboarding process ensures you don't miss anything important. 
                From document submission to final confirmation, we've got you covered.
              </p>
              
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Login with your credentials', desc: 'Use the email and password provided in your admission letter' },
                  { step: 2, title: 'Complete the 6 tasks', desc: 'Upload documents, pay fees, select courses, and choose hostel preferences' },
                  { step: 3, title: 'Get AI assistance anytime', desc: 'Ask EduBot for help with any questions during the process' },
                  { step: 4, title: 'Wait for admin approval', desc: 'College staff will review and approve your submissions' },
                  { step: 5, title: 'Receive confirmation', desc: "Once all tasks are approved, you're officially onboarded!" }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-dark mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                {/* Mock Dashboard Preview */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-10 h-10 bg-brand-pale rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy-dark">Welcome back, Arjun</div>
                    <div className="text-xs text-slate-500">Computer Science & Engineering</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Total Tasks', value: '6', color: 'bg-slate-100' },
                    { label: 'Completed', value: '3', color: 'bg-success-pale text-success' },
                    { label: 'Pending', value: '2', color: 'bg-slate-100' },
                    { label: 'Submitted', value: '1', color: 'bg-amber-pale text-amber-700' }
                  ].map((stat) => (
                    <div key={stat.label} className={`p-4 rounded-xl ${stat.color}`}>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs font-medium opacity-70">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: 'Upload Identity Documents', status: 'approved' },
                    { title: 'Submit Marksheets', status: 'approved' },
                    { title: 'Fee Payment', status: 'approved' },
                    { title: 'Course Registration', status: 'submitted' },
                    { title: 'Hostel Allocation', status: 'pending' },
                    { title: 'Final Confirmation', status: 'pending' }
                  ].map((task) => (
                    <div key={task.title} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          task.status === 'approved' ? 'bg-success' : 
                          task.status === 'submitted' ? 'bg-amber-accent' : 'bg-slate-300'
                        }`} />
                        <span className="text-sm text-slate-700">{task.title}</span>
                      </div>
                      {task.status === 'approved' && <CheckCircle className="w-4 h-4 text-success" />}
                    </div>
                  ))}
                </div>
                
                {/* Floating AI Button */}
                <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-amber-accent rounded-full flex items-center justify-center shadow-lg shadow-amber-accent/30">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl gradient-navy-blue p-12 sm:p-16 text-center"
          >
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/70 max-w-xl mx-auto mb-8">
                Join thousands of students who have successfully completed their onboarding 
                with InnovGenius. Your future awaits!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={onStudentLogin}
                  size="lg"
                  className="bg-white text-brand-blue hover:bg-slate-100 text-base font-semibold px-8 py-6 rounded-xl"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-light/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-navy-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">InnovGenius</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm">
                Smart Student Onboarding Agent - Streamlining the admission process 
                for engineering colleges with AI-powered assistance.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">Student Login</a></li>
                <li><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">Admin Dashboard</a></li>
                <li><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-slate-400 text-sm">admissions@innov.edu</li>
                <li className="text-slate-400 text-sm">+91 12345 67890</li>
                <li className="text-slate-400 text-sm">Innov College Campus</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 InnovGenius. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 text-sm hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
