
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TREND_DATA = [
  { name: 'MAY', current: 110, previous: 120 },
  { name: 'JUN', current: 90, previous: 110 },
  { name: 'JUL', current: 100, previous: 130 },
  { name: 'AUG', current: 60, previous: 90 },
  { name: 'SEP', current: 70, previous: 100 },
  { name: 'OCT', current: 40, previous: 80 },
];

const PerformanceAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('6 Months');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    // Let the UI reflect "Generating..." before print dialog captures the frame
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 print:p-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Performance Analytics</h2>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">history</span>
            Last updated: Oct 26, 2023, 09:00 AM
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex-1 md:flex-none">
            {['6 Months', '90 Days'].map(tf => (
              <button 
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`flex-1 md:flex-none px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${timeframe === tf ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                {tf}
              </button>
            ))}
          </div>
          <button 
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className={`w-full md:w-auto px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <span className={`material-symbols-outlined text-xl ${isGenerating ? 'animate-spin' : ''}`}>
              {isGenerating ? 'refresh' : 'picture_as_pdf'}
            </span>
            {isGenerating ? 'Generating...' : 'Generate PDF'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Recovered', value: '$4.28M', sub: '+12.4% vs last period', icon: 'trending_up', color: 'status-success' },
          { label: 'Active Placements', value: '24,591', sub: '842 new this week', icon: 'description', color: 'primary' },
          { label: 'Avg. Collect Time', value: '42.5 Days', sub: '+2.1 days increase', icon: 'schedule', color: 'fedex-orange' },
          { label: 'Recovery %', value: '74.2%', sub: '+0.5% above target', icon: 'percent', color: 'status-success' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2 md:gap-3 group hover:border-primary/20 transition-all print-full">
             <div className="flex justify-between items-center">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">{kpi.label}</p>
                <div className={`p-1.5 rounded-lg bg-slate-50 text-${kpi.color} hidden md:block`}>
                  <span className="material-symbols-outlined text-sm">{kpi.icon}</span>
                </div>
             </div>
             <h3 className="text-xl md:text-2xl font-black text-slate-900">{kpi.value}</h3>
             <p className={`text-[9px] md:text-[10px] font-black ${kpi.sub.includes('+') && kpi.color === 'status-success' ? 'text-status-success' : 'text-slate-400'}`}>
               {kpi.sub}
             </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm print-full overflow-hidden">
           <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-4">
              <div>
                <h4 className="text-lg md:text-xl font-black text-slate-900">Overdue Trend ({timeframe})</h4>
                <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Volume of delinquent accounts</p>
              </div>
              <div className="flex gap-4 md:gap-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-slate-200" />
                  <span>Previous</span>
                </div>
              </div>
           </div>
           <div className="h-64 md:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="previous" stroke="#e2e8f0" fill="#f8fafc" strokeWidth={3} isAnimationActive={!isGenerating} />
                  <Area type="monotone" dataKey="current" stroke="#4f148a" fill="url(#colorCurrent)" strokeWidth={4} isAnimationActive={!isGenerating} />
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f148a" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f148a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center print-full">
           <div className="w-full flex justify-between items-center mb-10">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">SLA Compliance</h4>
              <span className="material-symbols-outlined text-primary hidden md:block">info</span>
           </div>
           <div className="relative size-48 md:size-64 flex flex-col items-center justify-center">
              <div className="size-full rounded-full border-[15px] md:border-[20px] border-slate-100 border-b-transparent rotate-[225deg]" />
              <div 
                className="absolute inset-0 size-full rounded-full border-[15px] md:border-[20px] border-primary border-b-transparent transition-all duration-1000 rotate-[350deg]" 
                style={{ clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-6 md:pt-8">
                 <span className="text-3xl md:text-5xl font-black text-slate-900">94.2%</span>
                 <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-status-success mt-1">Healthy</p>
              </div>
           </div>
           <div className="mt-8 space-y-2">
              <p className="text-sm font-black text-slate-900">Target: 92.0%</p>
              <p className="text-xs text-slate-400 font-medium">Compliance has improved by 2.4% over the last 30 days based on agency reporting.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
