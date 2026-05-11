import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  Upload, 
  AlertCircle,
  ArrowRight,
  Filter,
  IdCard,
  FileText,
  CreditCard,
  BookOpen,
  Home,
  CheckCircle2,
  Search
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { useStudent } from '@/hooks/useAuth';

interface MyTasksPageProps {
  onViewTask: (taskId: string) => void;
  onBack: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  IdCard,
  FileText,
  CreditCard,
  BookOpen,
  Home,
  CheckCircle2
};

type FilterStatus = 'all' | 'pending' | 'submitted' | 'approved' | 'rejected';

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

export function MyTasksPage({ onViewTask, onBack }: MyTasksPageProps) {
  const student = useStudent();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!student) return null;

  const filteredTasks = student.tasks.filter(task => {
    const matchesFilter = activeFilter === 'all' || task.status === activeFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterCounts = {
    all: student.tasks.length,
    pending: student.tasks.filter(t => t.status === 'pending').length,
    submitted: student.tasks.filter(t => t.status === 'submitted').length,
    approved: student.tasks.filter(t => t.status === 'approved').length,
    rejected: student.tasks.filter(t => t.status === 'rejected').length
  };

  const filters: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  return (
    <AppShell 
      userRole="student" 
      activePage="tasks"
      onNavigate={(page) => {
        if (page === 'dashboard') onBack();
      }}
      pageTitle="My Tasks"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-navy-dark mb-2">My Onboarding Tasks</h1>
          <p className="text-slate-600">
            Complete all 6 tasks to finish your admission process. Track your progress and submit documents.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
            />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${activeFilter === filter.value
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-blue hover:text-brand-blue'
                }
              `}
            >
              {filter.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                activeFilter === filter.value ? 'bg-white/20' : 'bg-slate-100'
              }`}>
                {filterCounts[filter.value]}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Tasks List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-navy-dark mb-2">No tasks found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query</p>
            </div>
          ) : (
            filteredTasks.map((task, index) => {
              const Icon = iconMap[task.icon] || CheckCircle;
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  onClick={() => onViewTask(task.id)}
                  className="bg-white rounded-xl p-5 border border-slate-100 shadow-card hover:shadow-lg hover:border-brand-blue/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${task.status === 'approved' ? 'bg-success-pale' : 
                        task.status === 'submitted' ? 'bg-amber-pale' : 
                        task.status === 'rejected' ? 'bg-danger-pale' : 'bg-brand-pale'}
                    `}>
                      {task.status === 'approved' ? (
                        <CheckCircle className="w-6 h-6 text-success" />
                      ) : task.status === 'rejected' ? (
                        <AlertCircle className="w-6 h-6 text-danger" />
                      ) : (
                        <Icon className={`w-6 h-6 ${
                          task.status === 'submitted' ? 'text-amber-700' : 'text-brand-blue'
                        }`} />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400 font-medium">#{task.order}</span>
                          <h3 className={`font-semibold ${
                            task.status === 'approved' ? 'text-slate-500 line-through' : 'text-navy-dark'
                          }`}>
                            {task.title}
                          </h3>
                        </div>
                        <StatusBadge status={task.status} />
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3">{task.description}</p>
                      
                      {/* Task Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        {task.submittedAt && (
                          <span className="flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            Submitted {new Date(task.submittedAt).toLocaleDateString()}
                          </span>
                        )}
                        {task.reviewedAt && (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Reviewed {new Date(task.reviewedAt).toLocaleDateString()}
                          </span>
                        )}
                        {task.reviewNote && (
                          <span className="flex items-center gap-1 text-danger">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Has feedback
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-white rounded-xl p-6 border border-slate-100 shadow-card"
        >
          <h3 className="font-semibold text-navy-dark mb-4">Progress Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Approved', count: filterCounts.approved, color: 'text-success', bgColor: 'bg-success-pale' },
              { label: 'Submitted', count: filterCounts.submitted, color: 'text-amber-700', bgColor: 'bg-amber-pale' },
              { label: 'Pending', count: filterCounts.pending, color: 'text-slate-600', bgColor: 'bg-slate-100' },
              { label: 'Rejected', count: filterCounts.rejected, color: 'text-danger', bgColor: 'bg-danger-pale' }
            ].map((item) => (
              <div key={item.label} className={`${item.bgColor} rounded-xl p-4 text-center`}>
                <div className={`text-2xl font-bold ${item.color}`}>{item.count}</div>
                <div className="text-xs text-slate-600">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
