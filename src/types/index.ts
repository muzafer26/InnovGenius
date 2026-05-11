// User Types
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  department: string;
  batch: string;
  admissionDate: string;
  tasks: StudentTask[];
}

export interface Admin extends User {
  role: 'admin';
  designation: string;
}

// Task Types
export type TaskStatus = 'pending' | 'submitted' | 'approved' | 'rejected';

export interface Task {
  id: string;
  order: number;
  title: string;
  description: string;
  instructions: string[];
  acceptedFormats: string[];
  maxFileSize: number; // in MB
  icon: string;
}

export interface StudentTask extends Task {
  status: TaskStatus;
  submittedAt?: string;
  reviewedAt?: string;
  reviewNote?: string;
  fileUrl?: string;
  fileName?: string;
}

// Activity Types
export interface Activity {
  id: string;
  studentId: string;
  studentName: string;
  action: string;
  taskName?: string;
  timestamp: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Stats Types
export interface StudentStats {
  totalTasks: number;
  completed: number;
  pending: number;
  submitted: number;
  progressPercentage: number;
}

export interface AdminStats {
  totalStudents: number;
  fullyOnboarded: number;
  inProgress: number;
  notStarted: number;
}

export interface BatchCompletionData {
  name: string;
  value: number;
  color: string;
}
