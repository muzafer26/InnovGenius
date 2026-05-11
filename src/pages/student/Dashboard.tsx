import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Upload, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  IdCard,
  FileText,
  CreditCard,
  BookOpen,
  Home,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/AppShell';
import { useStudent } from '@/hooks/useAuth';
import { getStudentStats } from '@/data/mockData';

interface StudentDashboardProps {
  onViewTask: (taskId: string) => void;
  onViewAllTasks: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  IdCard,
  FileText,
  CreditCard,
  BookOpen,
  Home,
  CheckCircle2
};

// Circular Progress Component
function CircularProgress({ percentage, size = 160 }: { percentage: number; size?: number }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A56DB" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-navy-dark">{percentage}%</span>
        <span className="text-xs text-slate-500 mt-1">Complete</span>
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: 'bg-slate-100 text-slate-600',
    submitted: 'bg-amber-pale text-amber-700',
    approved: 'bg-success-pale text-emerald-700',
    rejected: 'bg-danger-pale text-red-700'
  };

  const labels = {
    pending: 'Pending',
    submitted: 'Submitted',
    approved: 'Approved',
    rejected: 'Rejected'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
}

export function StudentDashboard({ onViewTask, onViewAllTasks }: StudentDashboardProps) {
  const student = useStudent();
  
  if (!student) return null;

  const stats = getStudentStats(student);
  const pendingTasks = student.tasks.filter(t => t.status === 'pending' || t.status === 'rejected');
  const nextTask = pendingTasks.length > 0 ? pendingTasks[0] : null;

  return (
    <AppShell 
      userRole="student" 
      activePage="dashboard"
      onNavigate={(page) => {
        if (page === 'tasks') onViewAllTasks();
      }}
      pageTitle="Dashboard"
    >
      <div className="space-y-6">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl gradient-navy-blue p-6 sm:p-8"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-light/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-20 w-24 h-24 bg-amber-accent/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white/70 text-sm">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {student.name.split(' ')[0]}!
              </h2>
              <p className="text-white/70">
                {student.department} • Batch {student.batch}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-white/70 text-sm">Roll Number</div>
                <div className="text-white font-mono font-semibold">{student.rollNumber}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Tasks', value: stats.totalTasks, icon: CheckCircle, color: 'bg-slate-100 text-slate-600' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'bg-success-pale text-success' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-slate-100 text-slate-600' },
            { label: 'Submitted', value: stats.submitted, icon: Upload, color: 'bg-amber-pale text-amber-700' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl p-5 border border-slate-100 shadow-card"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-navy-dark">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-100 shadow-card"
          >
            <h3 className="text-lg font-bold text-navy-dark mb-6">Your Progress</h3>
            
            <div className="flex flex-col items-center">
              <CircularProgress percentage={stats.progressPercentage} />
              
              {/* Linear Progress */}
              <div className="w-full mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-600">Overall Completion</span>
                  <span className="font-semibold text-navy-dark">{stats.completed}/{stats.totalTasks} tasks</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-light rounded-full"
                  />
                </div>
              </div>
              
              {/* Next Step */}
              {nextTask && (
                <div className="w-full mt-6 p-4 bg-brand-muted rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm font-semibold text-brand-blue">Next Step</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{nextTask.title}</p>
                  <Button 
                    onClick={() => onViewTask(nextTask.id)}
                    size="sm"
                    className="w-full bg-brand-blue hover:bg-brand-light text-white"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
              
              {stats.progressPercentage === 100 && (
                <div className="w-full mt-6 p-4 bg-success-pale rounded-xl text-center">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="text-sm font-semibold text-success">Congratulations!</p>
                  <p className="text-sm text-slate-600">You've completed all tasks</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Task Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-navy-dark">Onboarding Checklist</h3>
                <p className="text-sm text-slate-500">Complete all 6 steps to finish your onboarding</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={onViewAllTasks}
                className="text-brand-blue hover:text-brand-light"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {student.tasks.map((task, index) => {
                const Icon = iconMap[task.icon] || CheckCircle;
                
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    onClick={() => onViewTask(task.id)}
                    className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    {/* Task Number / Status Icon */}
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${task.status === 'approved' ? 'bg-success-pale' : 
                        task.status === 'submitted' ? 'bg-amber-pale' : 
                        task.status === 'rejected' ? 'bg-danger-pale' : 'bg-slate-100'}
                    `}>
                      {task.status === 'approved' ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : task.status === 'rejected' ? (
                        <AlertCircle className="w-5 h-5 text-danger" />
                      ) : (
                        <Icon className={`w-5 h-5 ${
                          task.status === 'submitted' ? 'text-amber-700' : 'text-slate-500'
                        }`} />
                      )}
                    </div>
                    
                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-400">#{task.order}</span>
                        <h4 className={`font-semibold truncate ${
                          task.status === 'approved' ? 'text-slate-500 line-through' : 'text-navy-dark'
                        }`}>
                          {task.title}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-500 truncate">{task.description}</p>
                    </div>
                    
                    {/* Status Badge */}
                    <StatusBadge status={task.status} />
                    
                    {/* Arrow */}
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-brand-muted rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-navy-dark mb-1">Need Help?</h4>
              <p className="text-sm text-slate-600 mb-3">
                Our AI Assistant EduBot is available 24/7 to answer your questions about documents, 
                fees, courses, and more. Click the chat button in the bottom right corner.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Document requirements', 'Fee payment', 'Hostel info', 'Course selection'].map((tip) => (
                  <span key={tip} className="px-3 py-1 bg-white rounded-full text-xs text-slate-600 border border-slate-200">
                    {tip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
