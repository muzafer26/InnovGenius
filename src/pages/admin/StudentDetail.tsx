import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle,
  FileText,
  Download,
  Mail,
  Calendar,
  Building2,
  User,
  CheckSquare,
  XSquare,
  IdCard,
  CreditCard,
  BookOpen,
  Home,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/AppShell';
import { mockStudents, getStudentStats } from '@/data/mockData';
import type { StudentTask } from '@/types';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface StudentDetailPageProps {
  studentId: string;
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

export function StudentDetailPage({ studentId, onBack }: StudentDetailPageProps) {
  const student = mockStudents.find(s => s.id === studentId);
  const [selectedTask, setSelectedTask] = useState<StudentTask | null>(null);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectNote, setRejectNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-navy-dark mb-2">Student Not Found</h2>
          <Button onClick={onBack} className="bg-brand-blue text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const stats = getStudentStats(student);

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsProcessing(false);
    setIsApproveDialogOpen(false);
    setSelectedTask(null);
    toast.success(`Task "${selectedTask?.title}" approved successfully!`);
  };

  const handleReject = async () => {
    if (!rejectNote.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsProcessing(false);
    setIsRejectDialogOpen(false);
    setSelectedTask(null);
    setRejectNote('');
    toast.success(`Task "${selectedTask?.title}" rejected with feedback`);
  };

  const openApproveDialog = (task: StudentTask) => {
    setSelectedTask(task);
    setIsApproveDialogOpen(true);
  };

  const openRejectDialog = (task: StudentTask) => {
    setSelectedTask(task);
    setIsRejectDialogOpen(true);
  };

  return (
    <AppShell 
      userRole="admin" 
      activePage="students"
      onNavigate={() => onBack()}
      pageTitle="Student Details"
    >
      <div className="max-w-5xl mx-auto">
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

        {/* Student Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 border border-slate-100 shadow-card mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <img 
                src={student.avatar} 
                alt={student.name}
                className="w-20 h-20 rounded-2xl bg-slate-200"
              />
              <div className="lg:hidden">
                <h1 className="text-xl font-bold text-navy-dark">{student.name}</h1>
                <p className="text-slate-500">{student.rollNumber}</p>
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="hidden lg:block mb-4">
                <h1 className="text-2xl font-bold text-navy-dark">{student.name}</h1>
                <p className="text-slate-500">{student.rollNumber}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{student.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{student.batch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 truncate">{student.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">
                    Admitted {new Date(student.admissionDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="lg:text-right">
              <div className="text-3xl font-bold text-brand-blue">{stats.progressPercentage}%</div>
              <div className="text-sm text-slate-500 mb-2">Complete</div>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-light rounded-full"
                  style={{ width: `${stats.progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          {[
            { label: 'Total Tasks', value: stats.totalTasks, color: 'text-slate-600' },
            { label: 'Approved', value: stats.completed, color: 'text-success' },
            { label: 'Submitted', value: stats.submitted, color: 'text-amber-700' },
            { label: 'Pending', value: stats.pending, color: 'text-slate-400' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-card text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tasks Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden"
        >
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-lg font-bold text-navy-dark">Task Submissions</h3>
            <p className="text-sm text-slate-500">Review and approve student task submissions</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Task</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Document</th>
                  <th className="px-5 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {student.tasks.map((task, index) => {
                  const Icon = iconMap[task.icon] || FileText;
                  
                  return (
                    <motion.tr
                      key={task.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-10 h-10 rounded-lg flex items-center justify-center
                            ${task.status === 'approved' ? 'bg-success-pale' : 
                              task.status === 'submitted' ? 'bg-amber-pale' : 
                              task.status === 'rejected' ? 'bg-danger-pale' : 'bg-slate-100'}
                          `}>
                            <Icon className={`w-5 h-5 ${
                              task.status === 'approved' ? 'text-success' : 
                              task.status === 'submitted' ? 'text-amber-700' : 
                              task.status === 'rejected' ? 'text-danger' : 'text-slate-500'
                            }`} />
                          </div>
                          <div>
                            <div className="font-semibold text-navy-dark">{task.title}</div>
                            <div className="text-xs text-slate-500">#{task.order}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={task.status} />
                      </td>
                      <td className="px-5 py-4">
                        {task.submittedAt ? (
                          <div className="text-sm text-slate-600">
                            {new Date(task.submittedAt).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {task.fileName ? (
                          <button className="flex items-center gap-2 text-sm text-brand-blue hover:text-brand-light transition-colors">
                            <FileText className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{task.fileName}</span>
                            <Download className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-sm text-slate-400">No file</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {task.status === 'submitted' && (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => openApproveDialog(task)}
                              className="w-8 h-8 bg-success-pale hover:bg-success/20 rounded-lg flex items-center justify-center transition-colors"
                              title="Approve"
                            >
                              <CheckSquare className="w-4 h-4 text-success" />
                            </button>
                            <button 
                              onClick={() => openRejectDialog(task)}
                              className="w-8 h-8 bg-danger-pale hover:bg-danger/20 rounded-lg flex items-center justify-center transition-colors"
                              title="Reject"
                            >
                              <XSquare className="w-4 h-4 text-danger" />
                            </button>
                          </div>
                        )}
                        {task.status === 'approved' && (
                          <span className="text-sm text-success font-medium flex items-center justify-end gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Approved
                          </span>
                        )}
                        {task.status === 'rejected' && (
                          <div>
                            <span className="text-sm text-danger font-medium flex items-center justify-end gap-1 mb-1">
                              <XCircle className="w-4 h-4" />
                              Rejected
                            </span>
                            {task.reviewNote && (
                              <p className="text-xs text-slate-500 max-w-[200px] ml-auto">
                                "{task.reviewNote}"
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Approve Dialog */}
        <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Approve Task
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to approve "{selectedTask?.title}"?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleApprove}
                disabled={isProcessing}
                className="bg-success hover:bg-emerald-600 text-white"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckSquare className="w-4 h-4 mr-2" />
                    Approve
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-danger" />
                Reject Task
              </DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting "{selectedTask?.title}".
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <textarea
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 resize-none"
                rows={4}
              />
            </div>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleReject}
                disabled={isProcessing}
                className="bg-danger hover:bg-red-600 text-white"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <XSquare className="w-4 h-4 mr-2" />
                    Reject
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
