import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  UserX,
  Search,
  Download,
  Eye,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/AppShell';
import { mockStudents, getAdminStats, mockActivities, batchCompletionData } from '@/data/mockData';
import { getStudentStats } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { toast } from 'sonner';

interface AdminDashboardProps {
  onViewStudent: (studentId: string) => void;
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const styles = {
    completed: 'bg-success-pale text-emerald-700',
    inprogress: 'bg-amber-pale text-amber-700',
    notstarted: 'bg-slate-100 text-slate-600'
  };

  const labels = {
    completed: 'Completed',
    inprogress: 'In Progress',
    notstarted: 'Not Started'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
}

// Mini Progress Bar
function MiniProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-500">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-brand-blue to-brand-light rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function AdminDashboard({ onViewStudent }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'inprogress' | 'notstarted'>('all');
  const [isExporting, setIsExporting] = useState(false);

  const stats = getAdminStats();

  // Filter students
  const filteredStudents = mockStudents.filter(student => {
    const studentStats = getStudentStats(student);
    let studentStatus = 'notstarted';
    if (studentStats.progressPercentage === 100) studentStatus = 'completed';
    else if (studentStats.progressPercentage > 0) studentStatus = 'inprogress';

    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || statusFilter === studentStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsExporting(false);
    toast.success('Report exported successfully!');
  };

  const statCards = [
    { 
      label: 'Total Students', 
      value: stats.totalStudents, 
      icon: Users, 
      color: 'bg-brand-pale text-brand-blue',
      trend: '+12% from last month'
    },
    { 
      label: 'Fully Onboarded', 
      value: stats.fullyOnboarded, 
      icon: CheckCircle, 
      color: 'bg-success-pale text-success',
      trend: `${Math.round((stats.fullyOnboarded / stats.totalStudents) * 100)}% completion rate`
    },
    { 
      label: 'In Progress', 
      value: stats.inProgress, 
      icon: Clock, 
      color: 'bg-amber-pale text-amber-700',
      trend: 'Active now'
    },
    { 
      label: 'Not Started', 
      value: stats.notStarted, 
      icon: UserX, 
      color: 'bg-slate-100 text-slate-600',
      trend: 'Needs follow-up'
    }
  ];

  return (
    <AppShell 
      userRole="admin" 
      activePage="dashboard"
      onNavigate={() => {}}
      pageTitle="Admin Dashboard"
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-navy-dark">Welcome back, Dr. Kumar</h2>
            <p className="text-slate-500">
              Here's what's happening with your student onboarding today.
            </p>
          </div>
          <Button 
            onClick={handleExport}
            disabled={isExporting}
            className="bg-brand-blue hover:bg-brand-light text-white"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </>
            )}
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map((stat, index) => (
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
              <div className="text-sm text-slate-500 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-400">{stat.trend}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid xl:grid-cols-3 gap-6">
          {/* Students Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:col-span-2 bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden"
          >
            {/* Table Header */}
            <div className="p-5 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-navy-dark">Student Onboarding Status</h3>
                  <p className="text-sm text-slate-500">Track and manage student progress</p>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 w-full sm:w-64"
                  />
                </div>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { value: 'all', label: 'All Students' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'inprogress', label: 'In Progress' },
                  { value: 'notstarted', label: 'Not Started' }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value as any)}
                    className={`
                      px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                      ${statusFilter === filter.value
                        ? 'bg-brand-blue text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }
                    `}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student, index) => {
                    const studentStats = getStudentStats(student);
                    let status = 'notstarted';
                    if (studentStats.progressPercentage === 100) status = 'completed';
                    else if (studentStats.progressPercentage > 0) status = 'inprogress';
                    
                    return (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.03 }}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={student.avatar} 
                              alt={student.name}
                              className="w-9 h-9 rounded-full bg-slate-200"
                            />
                            <div>
                              <div className="font-semibold text-navy-dark">{student.name}</div>
                              <div className="text-xs text-slate-500">{student.rollNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-sm text-slate-700">{student.department}</div>
                          <div className="text-xs text-slate-500">{student.batch}</div>
                        </td>
                        <td className="px-5 py-4">
                          <MiniProgressBar percentage={studentStats.progressPercentage} />
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={status} />
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => onViewStudent(student.id)}
                              className="w-8 h-8 bg-brand-pale hover:bg-brand-blue/20 rounded-lg flex items-center justify-center transition-colors group"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-brand-blue" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-navy-dark mb-2">No students found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Batch Completion Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-5 border border-slate-100 shadow-card"
            >
              <h3 className="text-lg font-bold text-navy-dark mb-4">Batch Completion</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={batchCompletionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {batchCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {batchCompletionData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-navy-dark">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-5 border border-slate-100 shadow-card"
            >
              <h3 className="text-lg font-bold text-navy-dark mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {mockActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-pale rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">{activity.studentName}</span>{' '}
                        {activity.action}
                      </p>
                      <p className="text-xs text-slate-400">
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' • '}
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
