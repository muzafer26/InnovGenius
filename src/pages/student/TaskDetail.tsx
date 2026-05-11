import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Info,
  Download,
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
import { onboardingTasks } from '@/data/mockData';
import { toast } from 'sonner';

interface TaskDetailPageProps {
  taskId: string;
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
    submitted: 'Submitted - Awaiting Review',
    approved: 'Approved',
    rejected: 'Rejected - Please Resubmit'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${styles[status as keyof typeof styles]}`}>
      {status === 'approved' && <CheckCircle className="w-4 h-4" />}
      {status === 'rejected' && <AlertCircle className="w-4 h-4" />}
      {labels[status as keyof typeof labels]}
    </span>
  );
}

export function TaskDetailPage({ taskId, onBack }: TaskDetailPageProps) {
  const student = useStudent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!student) return null;

  const task = student.tasks.find(t => t.id === taskId);
  const taskDef = onboardingTasks.find(t => t.id === taskId);
  
  if (!task || !taskDef) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-danger mx-auto mb-4" />
          <h2 className="text-xl font-bold text-navy-dark mb-2">Task Not Found</h2>
          <Button onClick={onBack} className="bg-brand-blue text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[task.icon] || CheckCircle;
  const isReadOnly = task.status === 'approved' || task.status === 'submitted';

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!isReadOnly) setIsDragging(true);
  }, [isReadOnly]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (isReadOnly) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  }, [isReadOnly]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit');
      return;
    }
    
    // Check file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only PDF, JPG, and PNG files are allowed');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsUploading(false);
    toast.success('Task submitted successfully!');
    onBack();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <AppShell 
      userRole="student" 
      activePage="tasks"
      onNavigate={(page) => {
        if (page === 'dashboard') onBack();
      }}
      pageTitle={task.title}
    >
      <div className="max-w-3xl mx-auto">
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

        {/* Task Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 border border-slate-100 shadow-card mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center
                ${task.status === 'approved' ? 'bg-success-pale' : 
                  task.status === 'submitted' ? 'bg-amber-pale' : 
                  task.status === 'rejected' ? 'bg-danger-pale' : 'bg-brand-pale'}
              `}>
                <Icon className={`w-7 h-7 ${
                  task.status === 'approved' ? 'text-success' : 
                  task.status === 'submitted' ? 'text-amber-700' : 
                  task.status === 'rejected' ? 'text-danger' : 'text-brand-blue'
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-400">Task #{task.order}</span>
                </div>
                <h1 className="text-xl font-bold text-navy-dark">{task.title}</h1>
              </div>
            </div>
            <StatusBadge status={task.status} />
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-brand-pale/50 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-brand-blue" />
            <h3 className="font-semibold text-navy-dark">Instructions</h3>
          </div>
          <ul className="space-y-3">
            {task.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-5 h-5 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm text-slate-700">{instruction}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* File Upload Section */}
        {!isReadOnly && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-100 shadow-card mb-6"
          >
            <h3 className="font-semibold text-navy-dark mb-4">Upload Document</h3>
            
            {!selectedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  upload-zone ${isDragging ? 'upload-zone-active' : ''}
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="w-14 h-14 bg-brand-pale rounded-full flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-brand-blue" />
                </div>
                <p className="text-sm font-semibold text-navy-dark">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500">
                  PDF, JPG, or PNG (max. 10MB)
                </p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-pale rounded-lg flex items-center justify-center">
                    <File className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy-dark truncate">{selectedFile.name}</p>
                    <p className="text-sm text-slate-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="w-8 h-8 bg-slate-100 hover:bg-danger-pale rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <X className="w-4 h-4 text-slate-500 group-hover:text-danger" />
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!selectedFile || isUploading}
              className="w-full mt-4 bg-brand-blue hover:bg-brand-light text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Task
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Submitted File Info */}
        {(task.status === 'submitted' || task.status === 'approved') && task.fileName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-success-pale/50 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="font-semibold text-navy-dark">Submitted Document</h3>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-success/20">
              <div className="w-12 h-12 bg-success-pale rounded-lg flex items-center justify-center">
                <File className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-navy-dark">{task.fileName}</p>
                <p className="text-sm text-slate-500">
                  Submitted on {task.submittedAt ? new Date(task.submittedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-success hover:text-success hover:bg-success-pale">
                <Download className="w-4 h-4 mr-1" />
                View
              </Button>
            </div>
            {task.status === 'submitted' && (
              <p className="text-sm text-slate-600 mt-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Your submission is being reviewed by the admin. You'll be notified once it's approved.
              </p>
            )}
          </motion.div>
        )}

        {/* Rejected Info */}
        {task.status === 'rejected' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-danger-pale/50 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-danger" />
              <h3 className="font-semibold text-navy-dark">Submission Rejected</h3>
            </div>
            {task.reviewNote && (
              <div className="p-4 bg-white rounded-xl border border-danger/20">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Admin Note:</span> {task.reviewNote}
                </p>
              </div>
            )}
            <p className="text-sm text-slate-600 mt-4">
              Please review the feedback above and resubmit your document.
            </p>
          </motion.div>
        )}

        {/* Approved Info */}
        {task.status === 'approved' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-success-pale/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="font-semibold text-navy-dark">Task Completed</h3>
            </div>
            <p className="text-sm text-slate-600">
              Congratulations! This task has been approved by the admin on{' '}
              {task.reviewedAt ? new Date(task.reviewedAt).toLocaleDateString() : 'N/A'}.
            </p>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
