
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types.ts';
import { MOCK_CASES } from '../constants.ts';

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: 'High Priority Escalation', desc: 'Case #FDX-90214 reached legal threshold.', time: '2m ago', type: 'critical' },
    { id: 2, title: 'Bulk Upload Success', desc: 'Q3 Batch A (1,250 records) processed.', time: '1h ago', type: 'info' },
    { id: 3, title: 'SLA Warning', desc: 'Summit Distribution near 24h breach.', time: '3h ago', type: 'warning' },
  ];

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : MOCK_CASES.filter(c => 
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (id: string) => {
    navigate(`/cases/${id}`);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-40 sticky top-0 no-print">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="flex-1 max-w-xl relative" ref={searchRef}>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Search..."
              className="w-full bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 transition-all md:placeholder:text-slate-400"
            />
          </div>

          {showResults && searchQuery.trim() !== '' && (
            <div className="fixed md:absolute left-4 right-4 md:left-0 md:right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 z-[60]">
              <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Results</span>
              </div>
              <div className="max-h-[60vh] md:max-h-64 overflow-y-auto custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleResultClick(c.id)}
                      className="w-full text-left p-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors truncate max-w-[150px] md:max-w-none">{c.customerName}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-slate-900">${c.amountDue.toLocaleString()}</p>
                        <span className={`text-[9px] font-black uppercase ${c.priority === 'CRITICAL' ? 'text-status-danger' : 'text-slate-400'}`}>{c.priority}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <span className="material-symbols-outlined text-slate-200 text-4xl mb-2">search_off</span>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No matching records</p>
                  </div>
                )}
              </div>
              {searchResults.length > 0 && (
                <button 
                  onClick={() => { navigate('/cases'); setShowResults(false); }}
                  className="w-full p-3 text-center text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 border-t border-slate-100"
                >
                  View all cases
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-4">
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-full transition-colors ${showNotifications ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-fedex-orange rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notifications</span>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Mark all read</button>
              </div>
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                      <p className={`text-xs font-black ${n.type === 'critical' ? 'text-status-danger' : 'text-slate-900'}`}>{n.title}</p>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium group-hover:text-slate-700">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 text-center">
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        <button className="hidden sm:flex p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <span className="material-symbols-outlined">help</span>
        </button>
        <div className="hidden sm:block h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold leading-none">{user.name}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{user.role}</p>
          </div>
          <div 
            className="size-8 md:size-9 rounded-full bg-slate-200 border-2 border-primary/10 overflow-hidden"
            style={{ backgroundImage: `url(${user.avatar})`, backgroundSize: 'cover' }}
          />
        </div>
      </div>
    </header>
  );
}
