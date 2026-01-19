
import React from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_CASES } from '../constants';

const CaseDetail: React.FC = () => {
  const { id } = useParams();
  const caseData = MOCK_CASES.find(c => c.id === id) || MOCK_CASES[0];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
      <div className="flex items-end justify-between border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Case: {caseData.id}</h2>
          <p className="text-slate-500 font-bold mt-1 flex items-center gap-3">
            {caseData.customerName} 
            <span className="size-1.5 bg-slate-300 rounded-full" /> 
            {caseData.priority} Recovery
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-slate-200 rounded-xl text-sm font-black uppercase tracking-widest bg-white hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-xl">file_download</span>
            Export PDF
          </button>
          <button className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black flex items-center gap-3 text-slate-900">
                <span className="material-symbols-outlined text-primary text-2xl">corporate_fare</span>
                Customer Details
              </h3>
              <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View CRM Profile</button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: 'Company', value: caseData.customerName },
                  { label: 'Primary Contact', value: 'John Doe' },
                  { label: 'Credit Limit', value: '$50,000.00' },
                  { label: 'Recovery Rate', value: '94%', color: 'status-success' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">{item.label}</p>
                    <p className={`text-sm font-black ${item.color ? `text-${item.color}` : 'text-slate-900'}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <h3 className="text-xl font-black flex items-center gap-3 text-slate-900">
                <span className="material-symbols-outlined text-primary text-2xl">payments</span>
                Payment Information
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                    <th className="px-8 py-4">Invoice ID</th>
                    <th className="px-8 py-4">Total Amount</th>
                    <th className="px-8 py-4">Due Date</th>
                    <th className="px-8 py-4">DPD</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="text-sm font-bold">
                    <td className="px-8 py-6 text-primary">INV-88921</td>
                    <td className="px-8 py-6 text-lg font-black">${caseData.amountDue.toLocaleString()}</td>
                    <td className="px-8 py-6 text-slate-500">{caseData.dueDate}</td>
                    <td className="px-8 py-6 text-status-danger font-black">{caseData.daysOverdue} Days</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1.5 bg-red-50 text-status-danger text-[10px] font-black uppercase rounded-lg border border-red-100">OVERDUE</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  <span className="font-black text-slate-900 uppercase tracking-widest text-xs mr-2">Notes:</span> 
                  Customer claims discrepancy in freight weight for the Memphis-Dallas lane. Pending POD verification from warehouse terminal 4.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-3 text-slate-900">
                <span className="material-symbols-outlined text-primary text-2xl">history</span>
                Case Timeline
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filter: All Events</span>
                <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">filter_list</span>
              </div>
            </div>
            <div className="p-10 space-y-10 relative">
              <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 z-0"></div>
              {[
                { title: 'Assigned to Recovery Agent', time: 'Oct 24, 09:12 AM', desc: 'Case automatically escalated and assigned to Sarah Miller based on risk score.', icon: 'assignment_ind', active: true },
                { title: 'L2 Automation Reminder Sent', time: 'Oct 20, 02:30 PM', desc: 'Automated stern reminder delivered to accounting@abclogistics.com.', icon: 'mail', active: false },
                { title: 'Invoice Issued', time: 'Sep 12, 10:00 AM', desc: 'Original invoice generated and synced from FedEx Core billing.', icon: 'receipt', active: false },
              ].map((item, i) => (
                <div key={i} className="flex gap-8 relative z-10">
                  <div className={`size-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${item.active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                      <time className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.time}</time>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-primary text-white rounded-3xl shadow-2xl p-8 relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 size-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-black uppercase tracking-widest">AI Engine</span>
                <span className="size-2 bg-status-success rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white/60 tracking-[0.2em] uppercase">Live Insight</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Priority Score</p>
                <span className="bg-fedex-orange text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest">HIGH RISK</span>
              </div>
              <div className="flex items-baseline gap-3 mb-6">
                <h3 className="text-7xl font-black leading-none">{caseData.aiScore}</h3>
                <span className="text-2xl font-bold text-white/40">/ 1.0</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-white/90 italic mb-8">
                "Declining payment trend detected over 3 quarters. Model recommends legal escalation within 48h."
              </p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">visibility</span>
                View Risk Factors
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Quick Actions</h4>
            <div className="space-y-3">
              {[
                { icon: 'person_add', label: 'Reassign Case', color: 'primary' },
                { icon: 'outgoing_mail', label: 'Send Reminder', color: 'primary' },
                { icon: 'gavel', label: 'Mark Dispute', color: 'status-danger' },
              ].map((action, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all group">
                  <div className="flex items-center gap-4">
                    <span className={`material-symbols-outlined text-${action.color} size-6 flex items-center justify-center`}>{action.icon}</span>
                    <span className="text-sm font-black text-slate-700">{action.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
