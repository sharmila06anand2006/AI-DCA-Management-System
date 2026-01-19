
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../types.ts';

interface SidebarProps {
  onLogout: () => void;
  userRole: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ onLogout, userRole, isOpen, onClose }: SidebarProps) {
  const allNavItems = [
    { to: '/', icon: 'dashboard', label: 'Dashboard', roles: ['ADMIN', 'MANAGER', 'DCA'] },
    { to: '/cases', icon: 'work', label: 'Case Management', roles: ['ADMIN', 'MANAGER', 'DCA'] },
    { to: '/upload', icon: 'upload_file', label: 'Bulk Upload', roles: ['ADMIN'] },
    { to: '/ai-insights', icon: 'psychology', label: 'AI Insights', roles: ['ADMIN', 'MANAGER'] },
    { to: '/workflow', icon: 'account_tree', label: 'Workflow & SLA', roles: ['ADMIN', 'MANAGER'] },
    { to: '/escalations', icon: 'warning', label: 'Escalations', roles: ['ADMIN', 'MANAGER'] },
    { to: '/agencies', icon: 'corporate_fare', label: 'Agencies', roles: ['ADMIN', 'MANAGER'] },
    { to: '/analytics', icon: 'insights', label: 'Analytics', roles: ['ADMIN', 'MANAGER'] },
    { to: '/audit', icon: 'gavel', label: 'Audit & Compliance', roles: ['ADMIN'] },
    { to: '/settings', icon: 'settings', label: 'Settings', roles: ['ADMIN'] },
  ];

  const filteredNavItems = allNavItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className={`
      fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col h-full z-50 transition-transform duration-300 transform
      lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-primary leading-none">RecoveryIQ</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">FedEx Debt Mgmt</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => { if (window.innerWidth < 1024) onClose(); }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`
            }
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-status-danger hover:bg-red-50 rounded-lg transition-colors font-semibold"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
