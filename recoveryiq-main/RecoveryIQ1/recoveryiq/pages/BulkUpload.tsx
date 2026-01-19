
import React, { useState, useRef } from 'react';

const BulkUpload: React.FC = () => {
  const [view, setView] = useState<'UPLOAD' | 'MANUAL'>('UPLOAD');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseFiles = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`File "${file.name}" selected. Initiating secure validation and upload sequence...`);
      // Reset input so the same file can be selected again
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {view === 'UPLOAD' ? 'Upload New Cases' : 'Manual Case Entry'}
          </h2>
          <p className="text-slate-500 font-medium mt-1 text-sm">
            {view === 'UPLOAD' 
              ? 'Ingest high-volume debt records into the recovery pipeline.' 
              : 'Manually create a single recovery case for specialized processing.'}
          </p>
        </div>
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
          <button 
            onClick={() => setView('UPLOAD')}
            className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
              view === 'UPLOAD' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            Bulk Upload
          </button>
          <button 
            onClick={() => setView('MANUAL')}
            className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
              view === 'MANUAL' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            Manual Entry
          </button>
        </div>
      </div>

      {view === 'UPLOAD' ? (
        <div 
          onClick={() => handleBrowseFiles()}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden border-2 border-dashed border-slate-200 hover:border-primary/40 transition-all cursor-pointer group"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
            accept=".csv"
          />
          <div className="p-10 md:p-20 flex flex-col items-center justify-center text-center">
            <div className="size-16 md:size-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-primary text-3xl md:text-4xl">cloud_upload</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">Drag & drop CSV files here</h3>
            <p className="text-slate-500 font-medium mb-8 md:mb-10 max-w-xs md:max-w-sm text-sm">Support for batches up to 50,000 records. Validates automatically against global compliance rules.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-6">
              <button 
                onClick={(e) => handleBrowseFiles(e)}
                className="bg-primary hover:bg-primary-dark text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all"
              >
                Browse Local Files
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); alert("Establishing secure SFTP tunnel to server..."); }}
                className="text-primary font-black text-[10px] md:text-xs uppercase tracking-[0.2em] px-6 py-3 md:py-4 border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Use SFTP
              </button>
            </div>
          </div>
          <div className="bg-slate-50/80 px-4 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/50 gap-4">
            <div className="flex items-center gap-4 md:gap-6">
              <button 
                onClick={(e) => { e.stopPropagation(); alert("Downloading latest CSV structure template..."); }}
                className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Download Template
              </button>
              <div className="hidden sm:block size-1 bg-slate-300 rounded-full" />
              <button className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">description</span>
                Dictionary
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Auto-map headers</span>
              <div className="w-10 h-5 bg-primary/20 rounded-full relative">
                <div className="absolute right-1 top-1 size-3 bg-primary rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right-5 duration-300">
          <div className="p-6 md:p-8 border-b border-slate-100">
             <h3 className="text-lg font-black text-slate-900">Case Information</h3>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Manual entry for specialized processing.</p>
          </div>
          <form className="p-6 md:p-10 space-y-6 md:space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Manual case created and queued for validation!'); setView('UPLOAD'); }}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Customer Name *</label>
                   <input required type="text" className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-primary/20" placeholder="e.g. Acme Corp" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Number *</label>
                   <input required type="text" className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-primary/20" placeholder="0000-0000" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Amount Due (USD) *</label>
                   <input required type="number" className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-primary/20" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Due Date *</label>
                   <input required type="date" className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-primary/20" />
                </div>
             </div>
             <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 pt-4">
                <button type="button" onClick={() => setView('UPLOAD')} className="w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="w-full sm:w-auto px-10 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-transform active:scale-95">Create Case</button>
             </div>
          </form>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Activity History</h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:underline">
            View Logs
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-4">Item Details</th>
                  <th className="px-8 py-4">Timestamp</th>
                  <th className="px-8 py-4 text-center">Status</th>
                  <th className="px-8 py-4 text-right">Count</th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Q3_Recovery_Batch_A.csv', user: 'Julian V.', time: 'Oct 24, 14:30 EST', status: 'SUCCESS', records: '1,250' },
                  { name: 'Manual Case: Acme Corp', user: 'Julian V.', time: 'Oct 21, 18:45 EST', status: 'SUCCESS', records: '1' },
                ].map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-slate-300">
                          {log.name.includes('.csv') ? 'table_view' : 'description'}
                        </span>
                        <div>
                          <p className="text-sm font-black text-slate-900 truncate max-w-[120px] md:max-w-none">{log.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">By {log.user}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-600 whitespace-nowrap">{log.time}</td>
                    <td className="px-8 py-5 text-center">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        log.status === 'SUCCESS' ? 'bg-green-50 text-status-success border border-green-100' : 'bg-red-50 text-status-danger border border-red-100'
                      }`}>
                        <div className={`size-1.5 rounded-full ${log.status === 'SUCCESS' ? 'bg-status-success' : 'bg-status-danger'}`} />
                        {log.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right font-black text-slate-900">{log.records}</td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
