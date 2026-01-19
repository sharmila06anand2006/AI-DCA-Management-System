
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [assignmentMode, setAssignmentMode] = useState('Performance Based');
  const [weights, setWeights] = useState([
    { label: 'Historical Default Weight', val: 85 },
    { label: 'Industry Risk Index', val: 40 },
    { label: 'Payment Velocity Variance', val: 65 },
    { label: 'Communication Responsiveness', val: 92 },
  ]);

  const updateWeight = (index: number, newVal: number) => {
    const newWeights = [...weights];
    newWeights[index].val = newVal;
    setWeights(newWeights);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Configuration</h2>
          <p className="text-slate-500 font-medium mt-1">Manage recovery workflows, SLA rules, and AI parameters.</p>
        </div>
        <button 
          onClick={() => alert("Settings saved successfully!")}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 transition-all"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Workflow Automation Rules</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">Define how cases move through the recovery pipeline.</p>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-slate-900">Auto-Escalation Engine</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">Automatically escalate cases to management if no agency action within 15 days.</p>
                </div>
                <button 
                  onClick={() => setAutoEscalate(!autoEscalate)}
                  className={`w-14 h-7 rounded-full transition-all relative ${autoEscalate ? 'bg-primary' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 size-5 bg-white rounded-full transition-all ${autoEscalate ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">High-Risk Threshold (DPD)</label>
                  <input type="number" defaultValue={60} className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm font-black focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legal Review Trigger (Days Overdue)</label>
                  <input type="number" defaultValue={120} className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm font-black focus:ring-primary/20" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Default DCA Assignment Logic</p>
                <div className="flex flex-wrap gap-4">
                  {['Performance Based', 'Regional Only', 'Round Robin'].map((mode) => (
                    <button 
                      key={mode} 
                      onClick={() => setAssignmentMode(mode)}
                      className={`flex-1 py-4 border-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all min-w-[120px] ${
                      assignmentMode === mode ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}>
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">AI Model Tuning</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">Adjust risk score calculation weights.</p>
            </div>
            <div className="p-8 space-y-6">
              {weights.map((slider, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-700">{slider.label}</span>
                    <span className="text-xs font-black text-primary">{slider.val}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={slider.val}
                    onChange={(e) => updateWeight(i, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
             <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-fedex-orange">security</span>
                <h4 className="text-lg font-black tracking-tight">Governance Lockdown</h4>
             </div>
             <p className="text-white/60 text-sm leading-relaxed mb-8">
               Changes to core recovery rules require L4 Director approval. Your current access level allows staging these changes for next-cycle deployment.
             </p>
             <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                   <div className="size-2 bg-status-success rounded-full" />
                   <p className="text-[10px] font-black uppercase tracking-widest">Global Audit Mode: ON</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                   <div className="size-2 bg-status-warning rounded-full" />
                   <p className="text-[10px] font-black uppercase tracking-widest">Rule Version: v2.4.1</p>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Regional Exceptions</h4>
            <div className="space-y-4">
              {['North America', 'EMEA', 'APAC', 'LATAM'].map((reg) => (
                <div key={reg} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <span className="text-sm font-black text-slate-900">{reg}</span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline cursor-pointer">Edit Rules</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
