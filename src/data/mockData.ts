import type { Task, Student, Admin, Activity, BatchCompletionData } from '@/types';

// Define the 6 Onboarding Tasks
export const onboardingTasks: Task[] = [
  {
    id: 'task-1',
    order: 1,
    title: 'Upload Identity Documents',
    description: 'Submit Aadhaar, Passport, or Birth Certificate for verification',
    instructions: [
      'Scan or take a clear photo of your Aadhaar card (front and back)',
      'Alternatively, you can upload Passport or Birth Certificate',
      'Ensure all text is clearly readable',
      'File size should not exceed 10 MB',
      'Accepted formats: PDF, JPG, PNG'
    ],
    acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
    maxFileSize: 10,
    icon: 'IdCard'
  },
  {
    id: 'task-2',
    order: 2,
    title: 'Submit Marksheets',
    description: 'Upload Class 10 & 12 marksheets with self-attestation',
    instructions: [
      'Scan your Class 10 marksheet (clear, full page)',
      'Scan your Class 12 marksheet (clear, full page)',
      'Self-attest both marksheets before scanning',
      'Merge both into a single PDF or upload separately',
      'Ensure grades/marks are clearly visible'
    ],
    acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
    maxFileSize: 10,
    icon: 'FileText'
  },
  {
    id: 'task-3',
    order: 3,
    title: 'Fee Payment',
    description: 'Complete tuition and hostel fee payment, upload receipt',
    instructions: [
      'Check the fee structure in your admission letter',
      'Make payment via NEFT/RTGS to the college account',
      'Account Details: INNOV COLLEGE, A/C: 123456789, IFSC: INNO0001234',
      'Upload the payment receipt/transaction screenshot',
      'Keep the original receipt safe for verification'
    ],
    acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
    maxFileSize: 10,
    icon: 'CreditCard'
  },
  {
    id: 'task-4',
    order: 4,
    title: 'Course Registration',
    description: 'Select your elective subjects and confirm course registration',
    instructions: [
      'Review the course catalog for your department',
      'Select your preferred elective subjects',
      'Check for any prerequisites',
      'Consult with your faculty advisor if needed',
      'Submit your course selection form'
    ],
    acceptedFormats: ['.pdf', '.doc', '.docx'],
    maxFileSize: 10,
    icon: 'BookOpen'
  },
  {
    id: 'task-5',
    order: 5,
    title: 'Hostel Allocation',
    description: 'Choose room type and mess preference for hostel accommodation',
    instructions: [
      'Select your preferred room type (Single/Double/Triple sharing)',
      'Choose your mess preference (Veg/Non-veg/Special)',
      'Indicate any roommate preferences',
      'Mention any dietary restrictions or medical needs',
      'Submit hostel preference form'
    ],
    acceptedFormats: ['.pdf', '.doc', '.docx'],
    maxFileSize: 10,
    icon: 'Home'
  },
  {
    id: 'task-6',
    order: 6,
    title: 'Final Confirmation',
    description: 'Review all details and submit digital declaration',
    instructions: [
      'Review all your submitted documents and information',
      'Verify personal details: name, address, contact info',
      'Confirm course and hostel selections',
      'Read and accept the terms and conditions',
      'Sign the digital declaration to complete onboarding'
    ],
    acceptedFormats: ['.pdf'],
    maxFileSize: 10,
    icon: 'CheckCircle'
  }
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: 'student-1',
    email: 'arjun.sharma@innov.edu',
    name: 'Arjun Sharma',
    role: 'student',
    rollNumber: 'IN2025001',
    department: 'Computer Science & Engineering',
    batch: '2025-2029',
    admissionDate: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    tasks: [
      { ...onboardingTasks[0], status: 'approved', submittedAt: '2025-06-16T10:30:00Z', reviewedAt: '2025-06-16T14:20:00Z', fileName: 'aadhar_arjun.pdf' },
      { ...onboardingTasks[1], status: 'approved', submittedAt: '2025-06-16T11:45:00Z', reviewedAt: '2025-06-16T15:00:00Z', fileName: 'marksheets_arjun.pdf' },
      { ...onboardingTasks[2], status: 'approved', submittedAt: '2025-06-17T09:15:00Z', reviewedAt: '2025-06-17T11:30:00Z', fileName: 'fee_receipt_arjun.pdf' },
      { ...onboardingTasks[3], status: 'submitted', submittedAt: '2025-06-18T16:20:00Z', fileName: 'course_reg_arjun.pdf' },
      { ...onboardingTasks[4], status: 'pending' },
      { ...onboardingTasks[5], status: 'pending' }
    ]
  },
  {
    id: 'student-2',
    email: 'priya.patel@innov.edu',
    name: 'Priya Patel',
    role: 'student',
    rollNumber: 'IN2025002',
    department: 'Electronics & Communication',
    batch: '2025-2029',
    admissionDate: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    tasks: [
      { ...onboardingTasks[0], status: 'approved', submittedAt: '2025-06-16T08:00:00Z', reviewedAt: '2025-06-16T12:00:00Z', fileName: 'aadhar_priya.pdf' },
      { ...onboardingTasks[1], status: 'approved', submittedAt: '2025-06-16T14:30:00Z', reviewedAt: '2025-06-17T10:00:00Z', fileName: 'marksheets_priya.pdf' },
      { ...onboardingTasks[2], status: 'submitted', submittedAt: '2025-06-18T11:00:00Z', fileName: 'fee_receipt_priya.pdf' },
      { ...onboardingTasks[3], status: 'pending' },
      { ...onboardingTasks[4], status: 'pending' },
      { ...onboardingTasks[5], status: 'pending' }
    ]
  },
  {
    id: 'student-3',
    email: 'rahverma@innov.edu',
    name: 'Rahul Verma',
    role: 'student',
    rollNumber: 'IN2025003',
    department: 'Mechanical Engineering',
    batch: '2025-2029',
    admissionDate: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    tasks: [
      { ...onboardingTasks[0], status: 'approved', submittedAt: '2025-06-17T09:00:00Z', reviewedAt: '2025-06-17T13:00:00Z', fileName: 'aadhar_rahul.pdf' },
      { ...onboardingTasks[1], status: 'rejected', submittedAt: '2025-06-17T15:00:00Z', reviewedAt: '2025-06-18T09:00:00Z', reviewNote: 'Please upload clearer scans of your marksheets. Grades are not readable.', fileName: 'marksheets_rahul.pdf' },
      { ...onboardingTasks[2], status: 'pending' },
      { ...onboardingTasks[3], status: 'pending' },
      { ...onboardingTasks[4], status: 'pending' },
      { ...onboardingTasks[5], status: 'pending' }
    ]
  },
  {
    id: 'student-4',
    email: 'sneha.gupta@innov.edu',
    name: 'Sneha Gupta',
    role: 'student',
    rollNumber: 'IN2025004',
    department: 'Computer Science & Engineering',
    batch: '2025-2029',
    admissionDate: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    tasks: [
      { ...onboardingTasks[0], status: 'approved', submittedAt: '2025-06-16T12:00:00Z', reviewedAt: '2025-06-16T16:00:00Z', fileName: 'aadhar_sneha.pdf' },
      { ...onboardingTasks[1], status: 'approved', submittedAt: '2025-06-17T10:00:00Z', reviewedAt: '2025-06-17T14:00:00Z', fileName: 'marksheets_sneha.pdf' },
      { ...onboardingTasks[2], status: 'approved', submittedAt: '2025-06-18T08:00:00Z', reviewedAt: '2025-06-18T12:00:00Z', fileName: 'fee_receipt_sneha.pdf' },
      { ...onboardingTasks[3], status: 'approved', submittedAt: '2025-06-19T14:00:00Z', reviewedAt: '2025-06-19T16:00:00Z', fileName: 'course_reg_sneha.pdf' },
      { ...onboardingTasks[4], status: 'approved', submittedAt: '2025-06-20T11:00:00Z', reviewedAt: '2025-06-20T15:00:00Z', fileName: 'hostel_pref_sneha.pdf' },
      { ...onboardingTasks[5], status: 'submitted', submittedAt: '2025-06-21T10:00:00Z', fileName: 'declaration_sneha.pdf' }
    ]
  },
  {
    id: 'student-5',
    email: 'vikram.rao@innov.edu',
    name: 'Vikram Rao',
    role: 'student',
    rollNumber: 'IN2025005',
    department: 'Civil Engineering',
    batch: '2025-2029',
    admissionDate: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    tasks: [
      { ...onboardingTasks[0], status: 'submitted', submittedAt: '2025-06-20T16:00:00Z', fileName: 'aadhar_vikram.pdf' },
      { ...onboardingTasks[1], status: 'pending' },
      { ...onboardingTasks[2], status: 'pending' },
      { ...onboardingTasks[3], status: 'pending' },
      { ...onboardingTasks[4], status: 'pending' },
      { ...onboardingTasks[5], status: 'pending' }
    ]
  },
  {
    id: 'student-6',
    email: 'ananya.iyer@innov.edu',
    name: 'Ananya Iyer',
    role: 'student',
    rollNumber: 'IN2025006',
    department: 'Information Technology',
    batch: '2025-2029',
    admissionDate: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    tasks: [
      { ...onboardingTasks[0], status: 'approved', submittedAt: '2025-06-16T14:00:00Z', reviewedAt: '2025-06-16T18:00:00Z', fileName: 'aadhar_ananya.pdf' },
      { ...onboardingTasks[1], status: 'approved', submittedAt: '2025-06-17T11:00:00Z', reviewedAt: '2025-06-17T15:00:00Z', fileName: 'marksheets_ananya.pdf' },
      { ...onboardingTasks[2], status: 'approved', submittedAt: '2025-06-18T13:00:00Z', reviewedAt: '2025-06-18T17:00:00Z', fileName: 'fee_receipt_ananya.pdf' },
      { ...onboardingTasks[3], status: 'approved', submittedAt: '2025-06-19T09:00:00Z', reviewedAt: '2025-06-19T13:00:00Z', fileName: 'course_reg_ananya.pdf' },
      { ...onboardingTasks[4], status: 'submitted', submittedAt: '2025-06-20T15:00:00Z', fileName: 'hostel_pref_ananya.pdf' },
      { ...onboardingTasks[5], status: 'pending' }
    ]
  },
  {
    id: 'student-7',
    email: 'karan.malhotra@innov.edu',
    name: 'Karan Malhotra',
    role: 'student',
    rollNumber: 'IN2025007',
    department: 'Electrical Engineering',
    batch: '2025-2029',
    admissionDate: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karan',
    tasks: [
      { ...onboardingTasks[0], status: 'pending' },
      { ...onboardingTasks[1], status: 'pending' },
      { ...onboardingTasks[2], status: 'pending' },
      { ...onboardingTasks[3], status: 'pending' },
      { ...onboardingTasks[4], status: 'pending' },
      { ...onboardingTasks[5], status: 'pending' }
    ]
  },
  {
    id: 'student-8',
    email: 'meera.nair@innov.edu',
    name: 'Meera Nair',
    role: 'student',
    rollNumber: 'IN2025008',
    department: 'Computer Science & Engineering',
    batch: '2025-2029',
    admissionDate: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
    tasks: [
      { ...onboardingTasks[0], status: 'approved', submittedAt: '2025-06-17T10:00:00Z', reviewedAt: '2025-06-17T14:00:00Z', fileName: 'aadhar_meera.pdf' },
      { ...onboardingTasks[1], status: 'submitted', submittedAt: '2025-06-18T16:00:00Z', fileName: 'marksheets_meera.pdf' },
      { ...onboardingTasks[2], status: 'pending' },
      { ...onboardingTasks[3], status: 'pending' },
      { ...onboardingTasks[4], status: 'pending' },
      { ...onboardingTasks[5], status: 'pending' }
    ]
  }
];

// Mock Admin
export const mockAdmin: Admin = {
  id: 'admin-1',
  email: 'admin@innov.edu',
  name: 'Dr. Rajesh Kumar',
  role: 'admin',
  designation: 'Director of Admissions',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh'
};

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    studentId: 'student-4',
    studentName: 'Sneha Gupta',
    action: 'submitted Final Confirmation',
    taskName: 'Final Confirmation',
    timestamp: '2025-06-21T10:00:00Z'
  },
  {
    id: 'act-2',
    studentId: 'student-4',
    studentName: 'Sneha Gupta',
    action: 'completed Hostel Allocation',
    taskName: 'Hostel Allocation',
    timestamp: '2025-06-20T15:00:00Z'
  },
  {
    id: 'act-3',
    studentId: 'student-1',
    studentName: 'Arjun Sharma',
    action: 'submitted Course Registration',
    taskName: 'Course Registration',
    timestamp: '2025-06-18T16:20:00Z'
  },
  {
    id: 'act-4',
    studentId: 'student-2',
    studentName: 'Priya Patel',
    action: 'submitted Fee Payment',
    taskName: 'Fee Payment',
    timestamp: '2025-06-18T11:00:00Z'
  },
  {
    id: 'act-5',
    studentId: 'student-3',
    studentName: 'Rahul Verma',
    action: 'had Marksheets rejected',
    taskName: 'Submit Marksheets',
    timestamp: '2025-06-18T09:00:00Z'
  },
  {
    id: 'act-6',
    studentId: 'student-6',
    studentName: 'Ananya Iyer',
    action: 'submitted Hostel Allocation',
    taskName: 'Hostel Allocation',
    timestamp: '2025-06-20T15:00:00Z'
  },
  {
    id: 'act-7',
    studentId: 'student-5',
    studentName: 'Vikram Rao',
    action: 'submitted Identity Documents',
    taskName: 'Upload Identity Documents',
    timestamp: '2025-06-20T16:00:00Z'
  },
  {
    id: 'act-8',
    studentId: 'student-8',
    studentName: 'Meera Nair',
    action: 'submitted Marksheets',
    taskName: 'Submit Marksheets',
    timestamp: '2025-06-18T16:00:00Z'
  }
];

// Batch Completion Data for Chart
export const batchCompletionData: BatchCompletionData[] = [
  { name: 'Fully Onboarded', value: 2, color: '#10B981' },
  { name: 'In Progress', value: 5, color: '#F59E0B' },
  { name: 'Not Started', value: 1, color: '#94A3B8' }
];

// Demo Credentials
export const demoCredentials = {
  student: {
    email: 'arjun.sharma@innov.edu',
    password: 'student123',
    hint: 'Use email: arjun.sharma@innov.edu / password: student123'
  },
  admin: {
    email: 'admin@innov.edu',
    password: 'admin123',
    hint: 'Use email: admin@innov.edu / password: admin123'
  }
};

// Helper function to get student stats
export const getStudentStats = (student: Student) => {
  const totalTasks = student.tasks.length;
  const approved = student.tasks.filter(t => t.status === 'approved').length;
  const submitted = student.tasks.filter(t => t.status === 'submitted').length;
  const pending = student.tasks.filter(t => t.status === 'pending').length;
  const rejected = student.tasks.filter(t => t.status === 'rejected').length;
  
  return {
    totalTasks,
    completed: approved,
    pending: pending + rejected,
    submitted,
    progressPercentage: Math.round((approved / totalTasks) * 100)
  };
};

// Helper function to get admin stats
export const getAdminStats = () => {
  const totalStudents = mockStudents.length;
  const fullyOnboarded = mockStudents.filter(s => 
    s.tasks.every(t => t.status === 'approved')
  ).length;
  const notStarted = mockStudents.filter(s => 
    s.tasks.every(t => t.status === 'pending')
  ).length;
  const inProgress = totalStudents - fullyOnboarded - notStarted;
  
  return {
    totalStudents,
    fullyOnboarded,
    inProgress,
    notStarted
  };
};
