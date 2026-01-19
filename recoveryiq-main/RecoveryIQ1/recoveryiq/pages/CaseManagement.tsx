
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Case } from '../types.ts';

const ITEMS_PER_PAGE = 5;

const CaseManagement: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cases, setCases] = useState<Case[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('Any Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchCases = useCallback(async () => {
    setIsLoading(true);
    // Real App: const res = await fetch(`/api/cases?page=${currentPage}&limit=${ITEMS_PER_PAGE}&status=${statusFilter}&priority=${priorityFilter}`);
    await new Promise(resolve => setTimeout(resolve, 600)); 

    // Mocking API logic for filtering and pagination
    import('../constants.ts').then(({ MOCK_CASES }) => {
      const filtered = MOCK_CASES.filter(item => {
        const matchesMain = filter === 'ALL' || (filter === 'OVERDUE > 90' && item.daysOverdue > 90);
        const matchesStatus = statusFilter === 'Any Status' || item.status === statusFilter.toUpperCase().replace(' ', '_');
        const matchesPriority = priorityFilter === 'All Priorities' || item.priority === priorityFilter.toUpperCase();
        return matchesMain && matchesStatus && matchesPriority;
      });

      setTotalRecords(filtered.length);
      setCases(filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE));
      setIsLoading(false);
    });
  }, [currentPage, filter, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Recoveries</h2>
          <p className="text-slate-500 font-medium mt-1">Real-time status of high-priority debt management operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert("Downloading CSV from /api/cases/export...")}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-xl">file_download</span>
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-black uppercase tracking-wider hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl">add</span>
            Create Case
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm gap-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {['ALL', 'OVERDUE > 90'].map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setCurrentPage(1); }}
              className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all whitespace-nowrap ${
                filter === f ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <select 
             value={statusFilter}
             onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
             className="flex-1 md:flex-none bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 focus:ring-2 focus:ring-primary/20"
           >
             <option>Any Status</option>
             <option>Open</option>
             <option>In Progress</option>
             <option>Settled</option>
             <option>Escalated</option>
           </select>
           <select 
             value={priorityFilter}
             onChange={(e) => { setPriorityFilter(e.target.value); setCurrentPage(1); }}
             className="flex-1 md:flex-none bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 focus:ring-2 focus:ring-primary/20"
           >
             <option>All Priorities</option>
             <option>Critical</option>
             <option>Medium</option>
             <option>Routine</option>
           </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
             <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Case ID</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer Name</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount Due</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Days Overdue</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Priority</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cases.length > 0 ? cases.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-primary/5 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/cases/${item.id}`)}
                >
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-primary group-hover:underline">{item.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                        {item.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{item.customerName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-900">${item.amountDue.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`text-sm font-black ${item.daysOverdue > 90 ? 'text-status-danger' : 'text-slate-700'}`}>
                      {item.daysOverdue}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-lg flex items-center gap-1.5 w-fit ${
                      item.priority === 'CRITICAL' ? 'bg-red-50 text-status-danger border border-red-100' : 'bg-slate-50 text-slate-500'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2.5 py-1 bg-blue-50 text-primary text-[10px] font-black uppercase rounded-lg border border-primary/10">
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-1.5 hover:bg-slate-200 rounded text-slate-400">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </td>
                </tr>
              )) : !isLoading && (
                <tr>
                   <td colSpan={8} className="px-8 py-20 text-center">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No cases found.</p>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 bg-slate-50/50 flex flex-wrap items-center justify-between border-t border-slate-100 gap-4">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Showing {totalRecords === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalRecords)} of {totalRecords} records</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button 
              disabled={currentPage === 1 || isLoading}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="size-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all shadow-sm disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            
            <div className="flex items-center gap-1 px-2">
              <span className="text-xs font-black text-slate-900">{currentPage}</span>
              <span className="text-[10px] font-bold text-slate-400">of {totalPages || 1}</span>
            </div>

            <button 
              disabled={currentPage === totalPages || totalPages === 0 || isLoading}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="size-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all shadow-sm disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseManagement;
