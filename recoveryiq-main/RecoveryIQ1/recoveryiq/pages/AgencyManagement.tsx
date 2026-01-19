
import React, { useState } from 'react';
import { MOCK_AGENCIES } from '../constants.ts';

const AgencyManagement: React.FC = () => {
  const [agencies, setAgencies] = useState(MOCK_AGENCIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAgencyName, setNewAgencyName] = useState('');
  const [newAgencyRegion, setNewAgencyRegion] = useState('North America');

  const handleAddAgencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgencyName.trim()) return;
    
    const newAgency = {
      id: `DCA-00${agencies.length + 1}`,
      name: newAgencyName,
      region: newAgencyRegion,
      status: 'ACTIVE' as const,
      activeCases: 0,
      performanceScore: 100
    };
    
    setAgencies([newAgency, ...agencies]);
    setNewAgencyName('');
    setShowAddModal(false);
    alert("Agency onboarded successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Agency Management</h2>
          <p className="text-slate-500 font-medium mt-1">Monitor and manage third-party Debt Collection Agencies (DCAs).</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl shadow-primary/20"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add New Agency
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900">Onboard New Agency</h3>
              <button onClick={() => setShowAddModal(false)} className="material-symbols-outlined text-slate-400 hover:text-slate-600 transition-colors">close</button>
            </div>
            <form className="p-8 space-y-6" onSubmit={handleAddAgencySubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Agency Legal Name</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newAgencyName}
                  onChange={(e) => setNewAgencyName(e.target.value)}
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-primary/20" 
                  placeholder="e.g. Phoenix Recovery" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Region</label>
                <select 
                  value={newAgencyRegion}
                  onChange={(e) => setNewAgencyRegion(e.target.value)}
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-primary/20"
                >
                  <option>North America</option>
                  <option>EMEA</option>
                  <option>APAC</option>
                  <option>LATAM</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 text-xs font-black uppercase tracking-widest border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark">Onboard</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Agencies', value: agencies.length.toString(), trend: '2%', icon: 'group' },
          { label: 'Active Cases', value: agencies.reduce((acc, curr) => acc + curr.activeCases, 0).toLocaleString(), trend: '15%', icon: 'folder_shared' },
          { label: 'Avg. Performance', value: `${Math.round(agencies.reduce((acc, curr) => acc + curr.performanceScore, 0) / agencies.length)}%`, trend: '-1%', icon: 'trending_up', negative: true },
          { label: 'Pending Onboarding', value: '5', trend: '0%', icon: 'person_add' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <div className="size-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">{kpi.icon}</span>
               </div>
               <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                 kpi.negative ? 'text-status-danger bg-red-50' : 'text-status-success bg-green-50'
               }`}>
                 {kpi.negative ? '↓' : '↑'} {kpi.trend}
               </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{kpi.label}</p>
            <h3 className="text-3xl font-black text-slate-900">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
           <div className="flex gap-2">
              <button 
                onClick={() => alert("Agency filtering panel active...")}
                className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">filter_list</span>
              </button>
              <button 
                onClick={() => alert("Exporting agency directory...")}
                className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">download</span>
              </button>
           </div>
           <div className="flex items-center gap-3">
              <select className="bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2.5 focus:ring-2 focus:ring-primary/20 cursor-pointer">
                <option>Filter by Region</option>
                <option>North America</option>
                <option>EMEA</option>
              </select>
              <select className="bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2.5 focus:ring-2 focus:ring-primary/20 cursor-pointer">
                <option>Performance Tier</option>
                <option>Top Performers</option>
                <option>Below Target</option>
              </select>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-8 py-5">Agency Name</th>
                <th className="px-8 py-5">Region</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Active Cases</th>
                <th className="px-8 py-5">Performance Score</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-black text-sm">
                          {agency.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900">{agency.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {agency.id}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded bg-primary/5 text-primary">
                      {agency.region}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                       <div className={`size-2 rounded-full ${agency.status === 'ACTIVE' ? 'bg-status-success' : agency.status === 'WARNING' ? 'bg-status-warning' : 'bg-slate-400'}`} />
                       <span className={`text-[10px] font-black uppercase tracking-widest ${agency.status === 'ACTIVE' ? 'text-status-success' : agency.status === 'WARNING' ? 'text-status-warning' : 'text-slate-400'}`}>
                         {agency.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right text-sm font-black text-slate-900">{agency.activeCases.toLocaleString()}</td>
                  <td className="px-8 py-6 min-w-[200px]">
                    <div className="flex items-center gap-4">
                       <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${agency.performanceScore > 80 ? 'bg-primary' : 'bg-fedex-orange'}`} style={{ width: `${agency.performanceScore}%` }} />
                       </div>
                       <span className="text-sm font-black text-slate-900">{agency.performanceScore}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-slate-300 hover:text-primary transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgencyManagement;
