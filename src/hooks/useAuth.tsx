import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole, Student, Admin } from '@/types';
import { mockStudents, mockAdmin, demoCredentials } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string, role: UserRole): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      if (role === 'student') {
        // Check demo credentials
        if (email === demoCredentials.student.email && password === demoCredentials.student.password) {
          const student = mockStudents.find(s => s.email === email);
          if (student) {
            setUser(student);
            setIsLoading(false);
            return { success: true };
          }
        }
        
        // Check if student exists in mock data
        const student = mockStudents.find(s => s.email === email);
        if (student && password === 'student123') {
          setUser(student);
          setIsLoading(false);
          return { success: true };
        }
      } else if (role === 'admin') {
        // Check demo credentials
        if (email === demoCredentials.admin.email && password === demoCredentials.admin.password) {
          setUser(mockAdmin);
          setIsLoading(false);
          return { success: true };
        }
        
        // Check if admin
        if (email === mockAdmin.email && password === 'admin123') {
          setUser(mockAdmin);
          setIsLoading(false);
          return { success: true };
        }
      }
      
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password. Please try again.' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'An error occurred. Please try again.' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export demo credentials
export { demoCredentials };

// Helper hook for student-specific data
export function useStudent() {
  const { user } = useAuth();
  return user?.role === 'student' ? user as Student : null;
}

// Helper hook for admin-specific data
export function useAdmin() {
  const { user } = useAuth();
  return user?.role === 'admin' ? user as Admin : null;
}
