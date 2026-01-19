
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import CaseManagement from './pages/CaseManagement.tsx';
import CaseDetail from './pages/CaseDetail.tsx';
import BulkUpload from './pages/BulkUpload.tsx';
import AIInsights from './pages/AIInsights.tsx';
import WorkflowSLA from './pages/WorkflowSLA.tsx';
import Escalations from './pages/Escalations.tsx';
import AgencyManagement from './pages/AgencyManagement.tsx';
import PerformanceAnalytics from './pages/PerformanceAnalytics.tsx';
import AuditLogs from './pages/AuditLogs.tsx';
import Settings from './pages/Settings.tsx';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import { MOCK_USER } from './constants.ts';
import { UserRole } from './types.ts';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('ADMIN');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => setIsAuthenticated(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const activeUser = { ...MOCK_USER, role: currentRole };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
            onClick={closeSidebar}
          />
        )}

        <Sidebar 
          onLogout={handleLogout} 
          userRole={currentRole} 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header user={activeUser} onMenuClick={toggleSidebar} />
          <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cases" element={<CaseManagement />} />
              <Route path="/cases/:id" element={<CaseDetail />} />
              <Route path="/upload" element={<BulkUpload />} />
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="/workflow" element={<WorkflowSLA />} />
              <Route path="/escalations" element={<Escalations />} />
              <Route path="/agencies" element={<AgencyManagement />} />
              <Route path="/analytics" element={<PerformanceAnalytics />} />
              <Route path="/audit" element={<AuditLogs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
