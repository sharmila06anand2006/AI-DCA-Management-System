
import React, { useState, useMemo } from 'react';

const WorkflowSLA: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [alerts, setAlerts] = useState([
    { id: '#FDX-882910', msg: 'Breached SLA: Commercial debt > 60d.', type: 'error', color: 'status-danger' },
    { id: '#FDX-882915', msg: 'Deadline Warning: Window closes in 14h.', type: 'schedule', color: 'status-warning' },
    { id: 'Batch X-44', msg: '240 automated SMS reminders sent.', type: 'info', color: 'primary' },
  ]);

  const allSlaCases = [
    { id: '#FDX-882910', name: 'Logistics Hub SE', amount: '$12,450', stage: 'Agent Queue', time: '-02 Days', status: 'BREACHED', sColor: 'status-danger', stageP: 75 },
    { id: '#FDX-882915', name: 'Global Forwarders Ltd.', amount: '$4,120', stage: 'Digital Outreach', time: '14 Hours', status: 'APPROACHING', sColor: 'status-warning', stageP: 25 },
    { id: '#FDX-883021', name: 'Omni Retail Group', amount: '$28,900', stage: 'Legal Review', time: '08 Days', status: 'ON TRACK', sColor: 'status-success', stageP: 50 },
    { id: '#FDX-883100', name: 'Northern Allied', amount: '$5,200', stage: 'Initial Contact', time: '12 Days', status: 'ON TRACK', sColor: 'status-success', stageP: 10 },
  ];

  const filteredCases = useMemo(() => {
    if (activeFilter === 'ALL') return allSlaCases;
    return allSlaCases.filter(c => c.status === activeFilter);
  }, [activeFilter]);

  const handleExportCSV = () => {
    const headers = ['Case ID', 'Entity', 'Amount', 'Stage', 'Time Remaining', 'Status'];
    const rows = filteredCases.map(c => [c.id, c.name, c.amount, c.stage, c.time, c.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SLA_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAlerts = () => {
    setAlerts([]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Workflow & SLA Tracking</h2>
          <p className="text-slate-500 font-medium mt-1">Real-time monitoring of active debt recovery lifecycles.</p>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm"
          >
            Export CSV
          </button>
          <div className="flex-1 md:flex-none flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
             {['ALL', 'BREACHED', 'ON TRACK'].map(f => (
               <button 
                 key={f}
                 onClick={() => setActiveFilter(f)}
                 className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeFilter === f ? 'bg-primary text-white' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 {f}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Active Cases', value: '1,284', trend: '+4%', color: 'primary' },
          { label: 'Near Breach', value: '42', color: 'status-warning' },
          { label: 'SLA Breached', value: '15', color: 'status-danger' },
          { label: 'Avg. Recovery', value: '8.4 Days', color: 'slate-900' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            {kpi.color !== 'primary' && kpi.color !== 'slate-900' && (
              <div className={`absolute top-0 right-0 w-1.5 h-full bg-${kpi.color}`} />
            )}
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 md:mb-2">{kpi.label}</p>
            <div className="flex items-end gap-2 md:gap-3">
              <h3 className={`text-xl md:text-3xl font-black text-${kpi.color === 'primary' ? 'primary' : kpi.color === 'slate-900' ? 'slate-900' : kpi.color}`}>{kpi.value}</h3>
              {kpi.trend && <span className="text-[9px] md:text-[10px] font-black text-status-success pb-1.5">{kpi.trend} ↑</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-8 py-5">Case ID</th>
                <th className="px-8 py-5">Debtor Entity</th>
                <th className="px-8 py-5 text-right">Amount</th>
                <th className="px-8 py-5">Current Stage</th>
                <th className="px-8 py-5 text-center">Remaining</th>
                <th className="px-8 py-5 text-center">SLA Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {filteredCases.length > 0 ? filteredCases.map((row, idx) => (
                 <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                   <td className="px-8 py-6 font-black text-primary text-xs font-mono">{row.id}</td>
                   <td className="px-8 py-6">
                     <p className="text-sm font-black text-slate-900 truncate max-w-[150px]">{row.name}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Commercial Account</p>
                   </td>
                   <td className="px-8 py-6 text-right text-sm font-black text-slate-900">{row.amount}</td>
                   <td className="px-8 py-6">
                     <div className="flex items-center gap-3">
                       <div className="hidden md:block w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{ width: `${row.stageP}%` }} />
                       </div>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{row.stage}</span>
                     </div>
                   </td>
                   <td className={`px-8 py-6 text-center text-sm font-black text-${row.sColor}`}>{row.time}</td>
                   <td className="px-8 py-6 text-center">
                     <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 w-fit mx-auto ${
                       row.status === 'BREACHED' ? 'bg-red-50 text-status-danger' : 
                       row.status === 'APPROACHING' ? 'bg-amber-50 text-status-warning' : 'bg-green-50 text-status-success'
                     }`}>
                       <span className="material-symbols-outlined text-sm">{row.status === 'BREACHED' ? 'error' : row.status === 'APPROACHING' ? 'schedule' : 'check_circle'}</span>
                       {row.status}
                     </span>
                   </td>
                   <td className="px-8 py-6 text-right">
                     <button className="opacity-0 group-hover:opacity-100 transition-all p-2 text-slate-400 hover:text-primary">
                       <span className="material-symbols-outlined">visibility</span>
                     </button>
                   </td>
                 </tr>
               )) : (
                 <tr><td colSpan={7} className="px-8 py-10 text-center text-xs font-black text-slate-400 uppercase">No cases found</td></tr>
               )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm overflow-x-auto custom-scrollbar">
           <div className="flex items-center justify-between mb-10 min-w-[500px]">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Automation Workflow Visualization</h4>
              <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">Live Instance</span>
           </div>
           <div className="relative flex justify-between items-center px-4 min-w-[600px] mb-4">
              <div className="absolute top-10 left-0 right-0 h-0.5 bg-slate-100 -z-0" />
              {[
                { label: 'Validation', status: 'COMPLETED', icon: 'fact_check', color: 'primary' },
                { label: 'Outreach', status: 'COMPLETED', icon: 'send', color: 'primary' },
                { label: 'Engagement', status: 'IN PROGRESS', icon: 'support_agent', color: 'primary', pulse: true },
                { label: 'Escalation', status: 'PENDING', icon: 'gavel', color: 'slate-300' },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-4 relative z-10 w-1/4">
                   <div className={`size-16 md:size-20 rounded-full flex items-center justify-center border-4 border-white shadow-xl transition-all duration-500 ${
                     step.status === 'COMPLETED' ? 'bg-primary text-white' : 
                     step.status === 'IN PROGRESS' ? 'bg-primary/5 border-primary text-primary' : 'bg-slate-50 text-slate-300'
                   } ${step.pulse ? 'animate-pulse' : ''}`}>
                      <span className="material-symbols-outlined text-2xl md:text-3xl">{step.icon}</span>
                   </div>
                   <div className="text-center">
                      <p className="text-xs md:text-sm font-black text-slate-900">{step.label}</p>
                      <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-0.5 ${
                        step.status === 'COMPLETED' ? 'text-status-success' : 
                        step.status === 'IN PROGRESS' ? 'text-primary' : 'text-slate-400'
                      }`}>{step.status}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Recent SLA Breach Alerts</h4>
          <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-2">
            {alerts.length > 0 ? alerts.map((alert, i) => (
              <div key={i} className={`flex gap-4 p-4 rounded-2xl border-l-4 border-${alert.color} bg-slate-50`}>
                 <span className={`material-symbols-outlined text-${alert.color}`}>{alert.type}</span>
                 <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900">{alert.id}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 line-clamp-2">{alert.msg}</p>
                 </div>
              </div>
            )) : (
              <div className="py-10 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest">No active alerts</div>
            )}
          </div>
          <button 
            onClick={handleClearAlerts}
            className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-primary hover:underline border-t border-slate-100"
          >
            Clear All Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSLA;
