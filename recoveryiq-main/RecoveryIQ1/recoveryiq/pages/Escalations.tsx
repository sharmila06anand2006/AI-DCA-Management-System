
import React, { useState, useMemo } from 'react';

const Escalations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Escalations');
  const allEscalations = [
    { id: '#FX-88902', name: 'Global Logistics Inc.', acct: '4402-1192', reason: 'No Response', amount: '$12,450', age: '18d', agent: 'John Carter', ageP: 85 },
    { id: '#FX-88941', name: 'Pinnacle Sourcing', acct: '2110-0042', reason: 'Legal Hold', amount: '$45,120', age: '42d', agent: 'Sarah Jenkins', ageP: 95 },
    { id: '#FX-88982', name: 'Velvet Tech Solutions', acct: '5521-9981', reason: 'Disputed Debt', amount: '$2,100', age: '4d', agent: 'Mike Ross', ageP: 40 },
  ];

  const filteredEscalations = useMemo(() => {
    if (activeTab === 'All Escalations') return allEscalations;
    if (activeTab === 'No Agency Response') return allEscalations.filter(esc => esc.reason === 'No Response');
    if (activeTab === 'Legal Hold') return allEscalations.filter(esc => esc.reason === 'Legal Hold');
    return allEscalations;
  }, [activeTab]);

  const handleExportCSV = () => {
    const headers = ['Case ID', 'Name', 'Account', 'Reason', 'Amount', 'Aging', 'Agent'];
    const rows = filteredEscalations.map(esc => [esc.id, esc.name, esc.acct, esc.reason, esc.amount, esc.age, esc.agent]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Escalations_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateCase = () => {
    alert("Opening rapid escalation intake form...");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Escalation Management</h2>
          <p className="text-slate-500 font-medium mt-1">Direct intervention for high-priority stalled cases.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCreateCase}
            className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 transition-transform active:scale-95"
          >
            Create Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Escalated', value: '142', trend: '+5.2%', icon: 'warning' },
          { label: 'Avg. Resolution', value: '14.2d', trend: '-2.1%', icon: 'timer' },
          { label: 'Pending Action', value: '28', trend: 'Critical', icon: 'pending_actions' },
          { label: 'Efficiency Score', value: '88%', progress: 88 },
        ].map((kpi, i) => (
          <div key={i} className={`p-4 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group ${i === 3 ? 'bg-primary text-white col-span-2 md:col-span-1' : 'bg-white'}`}>
             {i !== 3 ? (
               <>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 md:mb-2">{kpi.label}</p>
                 <div className="flex items-baseline gap-2">
                    <h3 className="text-xl md:text-3xl font-black text-slate-900">{kpi.value}</h3>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${kpi.trend?.startsWith('+') ? 'text-status-danger' : 'text-status-success'}`}>{kpi.trend}</span>
                 </div>
               </>
             ) : (
               <>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-2">Efficiency Score</p>
                 <div className="flex items-center gap-4">
                    <h3 className="text-2xl md:text-4xl font-black text-white">88%</h3>
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                       <div className="bg-fedex-orange h-full" style={{ width: '88%' }} />
                    </div>
                 </div>
               </>
             )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 md:px-8 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div className="flex gap-1 md:gap-2 overflow-x-auto no-scrollbar py-1">
              {['All Escalations', 'No Agency Response', 'Legal Hold'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 md:px-5 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${
                    activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
                  }`}>
                  {tab}
                </button>
              ))}
           </div>
           <div className="flex items-center gap-4">
              <button 
                onClick={handleExportCSV}
                className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary flex items-center gap-2"
              >
                 <span className="material-symbols-outlined text-lg">download</span> <span className="hidden md:inline">Export</span>
              </button>
           </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-8 py-5">Case ID</th>
                <th className="px-8 py-5">Debtor Details</th>
                <th className="px-8 py-5">Escalation Reason</th>
                <th className="px-8 py-5 text-right">Amount</th>
                <th className="px-8 py-5">Aging</th>
                <th className="px-8 py-5">Assigned Agent</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEscalations.length > 0 ? filteredEscalations.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-black text-primary text-xs font-mono">{row.id}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-900 truncate max-w-[150px]">{row.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Acct: {row.acct}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-50 text-status-warning border border-amber-100 whitespace-nowrap">{row.reason}</span>
                  </td>
                  <td className="px-8 py-6 text-right text-sm font-black text-slate-900">{row.amount}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="hidden lg:block w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${row.ageP > 80 ? 'bg-status-danger' : 'bg-status-warning'}`} style={{ width: `${row.ageP}%` }} />
                       </div>
                       <span className={`text-xs font-black whitespace-nowrap ${row.ageP > 80 ? 'text-status-danger' : 'text-status-warning'}`}>{row.age}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className="size-6 rounded-full bg-slate-200 overflow-hidden border border-slate-100 flex-shrink-0">
                          <img src={`https://picsum.photos/seed/${row.agent}/50`} className="w-full h-full object-cover" />
                       </div>
                       <span className="text-xs font-bold text-slate-600 whitespace-nowrap">{row.agent}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="bg-primary hover:bg-primary-dark text-white px-4 md:px-5 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95">Reassign</button>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={7} className="px-8 py-20 text-center text-slate-400 font-black uppercase tracking-widest text-xs">No escalations in this category.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Escalations;
