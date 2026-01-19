
import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('Last 30 Days');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{ trends: any[], distribution: any[], kpis: any[] }>({
    trends: [],
    distribution: [],
    kpis: []
  });

  // Simulated API Fetch
  useEffect(() => {
    setIsLoading(true);
    const fetchDashboardData = async () => {
      // In a real app: const response = await fetch(`/api/dashboard/stats?tf=${timeframe}`);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency
      
      const mockTrends = timeframe === 'Yearly' 
        ? [{ month: '21', v: 12 }, { month: '22', v: 15 }, { month: '23', v: 18 }, { month: '24', v: 22 }]
        : [{ month: 'W1', v: 1.2 }, { month: 'W2', v: 1.8 }, { month: 'W3', v: 2.1 }, { month: 'W4', v: 3.4 }];

      setData({
        trends: mockTrends,
        distribution: [
          { name: 'High', value: 42, color: '#4f148a' },
          { name: 'Medium', value: 88, color: '#9333ea' },
          { name: 'Low', value: 12, color: '#ede8f3' },
        ],
        kpis: [
          { label: 'Overdue Amt', value: timeframe === 'Yearly' ? '$142M' : '$12.5M', trend: '+2.4%', icon: 'payments' },
          { label: 'Active Cases', value: '142', trend: '-1.2%', icon: 'folder_open' },
          { label: 'Recovery Rate', value: '68%', trend: '+5.0%', icon: 'task_alt' },
          { label: 'Escalated', value: '12', trend: '+8%', icon: 'priority_high' },
        ]
      });
      setIsLoading(false);
    };

    fetchDashboardData();
  }, [timeframe]);

  const totalCases = useMemo(() => data.distribution.reduce((acc, curr) => acc + curr.value, 0), [data.distribution]);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Fetching Recovery Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 no-print">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Executive Dashboard</h2>
          <p className="text-slate-500 font-medium mt-1 text-sm">Real-time recovery performance across all regions.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
          {['Last 30 Days', 'Quarterly', 'Yearly'].map((tf) => (
            <button 
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 md:px-4 py-2 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                timeframe === tf ? 'bg-slate-100 text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {data.kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm group transition-all hover:border-primary/20">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div className="p-2 rounded-xl bg-primary/5 text-primary hidden sm:block">
                <span className="material-symbols-outlined text-xl md:text-2xl">{kpi.icon}</span>
              </div>
              <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded ${
                kpi.trend.startsWith('+') ? 'text-status-success bg-green-50' : 'text-status-danger bg-red-50'
              }`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h4 className="text-base md:text-lg font-black text-slate-900">Recovery Trends</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">USD Millions</p>
            </div>
          </div>
          <div className="h-60 md:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.trends} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} barSize={32}>
                  {data.trends.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.trends.length - 1 ? '#4f148a' : '#ede8f3'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="w-full mb-6 md:mb-8 text-center sm:text-left">
            <h4 className="text-base md:text-lg font-black text-slate-900">Priority Breakdown</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Active distribution</p>
          </div>
          <div className="h-40 w-40 md:h-48 md:w-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {data.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl md:text-3xl font-black text-slate-900">{totalCases}</span>
              <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="w-full space-y-2 mt-6 md:mt-8">
            {data.distribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="size-2 md:size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs md:text-sm font-bold text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs md:text-sm font-black text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
