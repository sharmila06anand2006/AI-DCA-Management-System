
import React, { useState, useMemo } from 'react';

const AuditLogs: React.FC = () => {
  const [filter, setFilter] = useState('All Actions');
  const [searchQuery, setSearchQuery] = useState('');

  const logs = [
    { id: 'LOG-40291', user: 'Marcus Vane', action: 'Case Reassignment', target: 'RE-8829-X', timestamp: 'Oct 26, 2023 14:22:10', ip: '192.168.1.45', status: 'SUCCESS' },
    { id: 'LOG-40292', user: 'System (AI)', action: 'Priority Scoring', target: 'Batch B-12', timestamp: 'Oct 26, 2023 13:00:00', ip: 'Internal', status: 'SUCCESS' },
    { id: 'LOG-40293', user: 'Julian V.', action: 'Bulk Upload', target: 'Q3_Recovery.csv', timestamp: 'Oct 26, 2023 11:45:12', ip: '10.0.4.122', status: 'SUCCESS' },
    { id: 'LOG-40294', user: 'Sarah Miller', action: 'Status Update', target: 'RE-7442-A', timestamp: 'Oct 26, 2023 09:12:05', ip: '172.16.0.8', status: 'WARNING' },
    { id: 'LOG-40295', user: 'System (SLA)', action: 'Breach Notification', target: 'RE-8840-X', timestamp: 'Oct 25, 2023 18:30:00', ip: 'Internal', status: 'CRITICAL' },
    { id: 'LOG-40296', user: 'Marcus Vane', action: 'Login', target: 'User Session', timestamp: 'Oct 25, 2023 08:00:00', ip: '192.168.1.45', status: 'SUCCESS' },
  ];

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Main Filter Logic
      let matchesFilter = true;
      if (filter === 'Login/Logout') {
        matchesFilter = log.action === 'Login' || log.action === 'Logout';
      } else if (filter === 'Case Management') {
        matchesFilter = ['Case Reassignment', 'Status Update', 'Bulk Upload'].includes(log.action);
      } else if (filter === 'System Tasks') {
        matchesFilter = log.user.includes('System') || ['Priority Scoring', 'Breach Notification'].includes(log.action);
      }

      // Search Query Logic
      const matchesSearch = 
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const handleExportCSV = () => {
    const headers = ['Event ID', 'User', 'Action', 'Target', 'Timestamp', 'IP', 'Status'];
    const rows = filteredLogs.map(l => [
      l.id, l.user, l.action, l.target, l.timestamp, l.ip, l.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RecoveryIQ_AuditTrail_${filter.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Audit & Compliance</h2>
          <p className="text-slate-500 font-medium mt-1 text-sm">Full immutable record of all system operations and user interventions.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-slate-50 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-xl">file_download</span>
            Export Filtered Trail
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/30 gap-4">
          <div className="relative w-full max-w-md">
             <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
             <input 
               type="text" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Search by User, Action or Case ID..." 
               className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-primary/20"
             />
          </div>
          <div className="flex gap-4">
             <select 
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 focus:ring-2 focus:ring-primary/20 cursor-pointer"
             >
                <option>All Actions</option>
                <option>Login/Logout</option>
                <option>Case Management</option>
                <option>System Tasks</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-8 py-5">Event ID</th>
                <th className="px-8 py-5">User Account</th>
                <th className="px-8 py-5">System Action</th>
                <th className="px-8 py-5">Target Entity</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">IP / Source</th>
                <th className="px-8 py-5 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 text-xs font-mono text-slate-400">{log.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`size-7 rounded-full flex items-center justify-center font-black text-[10px] ${
                        log.user.includes('System') ? 'bg-fedex-orange/10 text-fedex-orange' : 'bg-primary/10 text-primary'
                      }`}>
                        {log.user[0]}
                      </div>
                      <span className="text-sm font-black text-slate-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-700">{log.action}</span>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-primary hover:underline cursor-pointer">{log.target}</td>
                  <td className="px-8 py-5 text-xs text-slate-500">{log.timestamp}</td>
                  <td className="px-8 py-5 text-xs font-mono text-slate-400">{log.ip}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase px-2 py-1 rounded-md border ${
                      log.status === 'SUCCESS' ? 'bg-green-50 text-status-success border-green-100' : 
                      log.status === 'CRITICAL' ? 'bg-red-50 text-status-danger border-red-100 animate-pulse' : 'bg-amber-50 text-status-warning border-amber-100'
                    }`}>
                      <span className="material-symbols-outlined text-xs">verified</span>
                      {log.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-slate-400 font-black uppercase tracking-widest text-xs">
                    No logs match your current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-50/50 flex items-center gap-4">
           <div className="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">shield</span>
           </div>
           <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Compliance Assurance</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Logs are cryptographically signed and archived for 7 years according to SOX compliance.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
