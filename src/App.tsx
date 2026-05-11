import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { StudentDashboard } from '@/pages/student/Dashboard';
import { TaskDetailPage } from '@/pages/student/TaskDetail';
import { MyTasksPage } from '@/pages/student/MyTasks';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { StudentDetailPage } from '@/pages/admin/StudentDetail';
import { AIChatbot } from '@/components/AIChatbot';
import { Toaster } from '@/components/ui/sonner';

// Route guard component
function ProtectedRoute({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode; 
  requiredRole?: 'student' | 'admin';
}) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginPage 
        onBack={() => window.location.reload()}
        onLoginSuccess={() => {}}
      />
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Main App Content
function AppContent() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'student-dashboard' | 'student-tasks' | 'student-task-detail' | 'admin-dashboard' | 'admin-student-detail'>('landing');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  // Handle navigation
  const navigateTo = (page: typeof currentPage, params?: { taskId?: string; studentId?: string }) => {
    if (params?.taskId) setSelectedTaskId(params.taskId);
    if (params?.studentId) setSelectedStudentId(params.studentId);
    setCurrentPage(page);
  };

  // Auto-redirect based on auth state
  useEffect(() => {
    if (isAuthenticated && currentPage === 'landing') {
      if (user?.role === 'student') {
        setCurrentPage('student-dashboard');
      } else if (user?.role === 'admin') {
        setCurrentPage('admin-dashboard');
      }
    }
  }, [isAuthenticated, user, currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage 
            onStudentLogin={() => setCurrentPage('login')} 
            onAdminLogin={() => setCurrentPage('login')} 
          />
        );
      case 'login':
        return (
          <LoginPage 
            onBack={() => setCurrentPage('landing')} 
            onLoginSuccess={(role) => {
              if (role === 'student') setCurrentPage('student-dashboard');
              else setCurrentPage('admin-dashboard');
            }}
          />
        );
      case 'student-dashboard':
        return (
          <ProtectedRoute requiredRole="student">
            <StudentDashboard 
              onViewTask={(taskId) => navigateTo('student-task-detail', { taskId })}
              onViewAllTasks={() => setCurrentPage('student-tasks')}
            />
          </ProtectedRoute>
        );
      case 'student-tasks':
        return (
          <ProtectedRoute requiredRole="student">
            <MyTasksPage 
              onViewTask={(taskId) => navigateTo('student-task-detail', { taskId })}
              onBack={() => setCurrentPage('student-dashboard')}
            />
          </ProtectedRoute>
        );
      case 'student-task-detail':
        return (
          <ProtectedRoute requiredRole="student">
            <TaskDetailPage 
              taskId={selectedTaskId || 'task-1'}
              onBack={() => setCurrentPage('student-dashboard')}
            />
          </ProtectedRoute>
        );
      case 'admin-dashboard':
        return (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard 
              onViewStudent={(studentId) => navigateTo('admin-student-detail', { studentId })}
            />
          </ProtectedRoute>
        );
      case 'admin-student-detail':
        return (
          <ProtectedRoute requiredRole="admin">
            <StudentDetailPage 
              studentId={selectedStudentId || 'student-1'}
              onBack={() => setCurrentPage('admin-dashboard')}
            />
          </ProtectedRoute>
        );
      default:
        return <LandingPage onStudentLogin={() => setCurrentPage('login')} onAdminLogin={() => setCurrentPage('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="min-h-screen"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      
      {/* AI Chatbot - Only show for authenticated students */}
      {isAuthenticated && user?.role === 'student' && <AIChatbot />}
      
      <Toaster position="bottom-left" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
