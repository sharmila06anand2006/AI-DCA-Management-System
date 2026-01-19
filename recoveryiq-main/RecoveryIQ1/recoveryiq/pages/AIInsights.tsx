
import React from 'react';

const AIInsights: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">AI Prioritization Engine</h2>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            Intelligent case scoring and risk distribution.
            <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tight">Model v2.4 Live</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-xl">refresh</span>
            Re-run Model
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Cases Scanned', value: '14,280', icon: 'fact_check', sub: 'Last run: 14 mins ago' },
          { label: 'Systemic Risk', value: '0.68', icon: 'bolt', sub: 'Average Score', progress: 68 },
          { label: 'Projected Recovery', value: '$4.21M', icon: 'payments', sub: 'Based on 0.8+ score' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-primary/5 text-primary rounded-2xl">
                <span className="material-symbols-outlined text-3xl">{kpi.icon}</span>
              </div>
              <span className="text-status-success text-[10px] font-black uppercase bg-green-50 px-2 py-1 rounded-lg">+12.4%</span>
            </div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">{kpi.label}</p>
            <h3 className="text-4xl font-black text-slate-900">{kpi.value}</h3>
            {kpi.progress ? (
              <div className="w-full bg-slate-100 h-2 rounded-full mt-6 overflow-hidden">
                <div className="bg-fedex-orange h-full rounded-full" style={{ width: `${kpi.progress}%` }} />
              </div>
            ) : (
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">{kpi.sub}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-xl font-black text-slate-900 mb-8">Risk Factors Analyzed</h4>
          <div className="space-y-6">
            {[
              { label: 'Velocity Signals', desc: 'Time delta between partial payments. High variance = Risk.', score: 85 },
              { label: 'Successive Default', desc: 'History of missed payments across multiple service lines.', score: 64 },
              { label: 'Liquidity Markers', desc: 'External cross-referencing of seasonal cash flow constraints.', score: 42 },
              { label: 'Communication Lag', desc: 'Non-responsiveness duration to digital outreach cycles.', score: 91 },
            ].map((factor, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-black text-slate-900">{factor.label}</span>
                  <span className="text-xs font-black text-primary uppercase">{factor.score}% Impact</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${factor.score}%` }} />
                </div>
                <p className="text-xs text-slate-500 font-medium">{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
           <div className="absolute -right-20 -bottom-20 size-80 bg-white/10 rounded-full blur-3xl" />
           <div className="relative z-10">
              <h4 className="text-2xl font-black mb-4">Strategic AI Recommendation</h4>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Currently, <strong>14 cases</strong> in the North America region are showing a "Successive Default" pattern. 
                Immediate reassignment to Legal Liaison <strong>Tier 1</strong> is suggested to secure 85% of projected recovery.
              </p>
              <div className="p-6 bg-white/10 border border-white/20 rounded-2xl">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-3">Model Confidence</p>
                 <div className="flex items-center gap-4">
                    <span className="text-4xl font-black">98.2%</span>
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                       <div className="bg-status-success h-full" style={{ width: '98%' }} />
                    </div>
                 </div>
              </div>
           </div>
           <button className="mt-10 w-full py-4 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all">Apply Strategy</button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
