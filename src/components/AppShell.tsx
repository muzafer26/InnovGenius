import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  LayoutDashboard, 
  CheckSquare, 
  MessageCircle, 
  HelpCircle, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  Bell,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

interface AppShellProps {
  children: React.ReactNode;
  userRole: UserRole;
  activePage: string;
  onNavigate: (page: string) => void;
  pageTitle: string;
}

const studentNavItems: { section: string; items: NavItem[] }[] = [
  {
    section: 'MAIN',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: 'dashboard' },
      { label: 'My Tasks', icon: CheckSquare, href: 'tasks', badge: 0 },
    ]
  },
  {
    section: 'SUPPORT',
    items: [
      { label: 'AI Assistant', icon: MessageCircle, href: 'assistant' },
      { label: 'Contact Admin', icon: HelpCircle, href: 'contact' },
    ]
  }
];

const adminNavItems: { section: string; items: NavItem[] }[] = [
  {
    section: 'OVERVIEW',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: 'dashboard' },
      { label: 'All Students', icon: Users, href: 'students', badge: 0 },
    ]
  },
  {
    section: 'MANAGEMENT',
    items: [
      { label: 'Reports', icon: FileText, href: 'reports' },
      { label: 'Settings', icon: Settings, href: 'settings' },
    ]
  }
];

export function AppShell({ children, userRole, activePage, onNavigate, pageTitle }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = userRole === 'student' ? studentNavItems : adminNavItems;

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          x: sidebarOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[260px] bg-navy-dark flex flex-col
          lg:translate-x-0
          ${sidebarOpen ? 'shadow-2xl' : ''}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">InnovGenius</span>
              <span className="block text-xs text-white/50">
                {userRole === 'student' ? 'Student Portal' : 'Admin Panel'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          {navItems.map((section) => (
            <div key={section.section} className="mb-6">
              <span className="text-xs font-bold text-white/40 uppercase tracking-wider px-4 mb-3 block">
                {section.section}
              </span>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = activePage === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <li key={item.href}>
                      <button
                        onClick={() => {
                          onNavigate(item.href);
                          setSidebarOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
                          text-sm font-medium transition-all duration-150
                          ${isActive 
                            ? 'bg-brand-blue text-white shadow-sm' 
                            : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className={`
                            px-2 py-0.5 rounded-full text-xs font-bold
                            ${isActive ? 'bg-white/20 text-white' : 'bg-brand-blue/20 text-brand-light'}
                          `}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 mb-3">
            <img 
              src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
              alt={user?.name}
              className="w-9 h-9 rounded-full bg-slate-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-white/50 truncate">
                {userRole === 'student' ? (user as any)?.rollNumber : (user as any)?.designation}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white/90 hover:bg-white/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Menu + Title */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-navy-dark hidden sm:block">{pageTitle}</h1>
            </div>

            {/* Right: Search + Notifications + Profile */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-40"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative text-slate-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
              </Button>

              {/* Mobile Profile */}
              <div className="lg:hidden">
                <img 
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                  alt={user?.name}
                  className="w-9 h-9 rounded-full bg-slate-200"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
