
import React, { useState } from 'react';
import { UserRole } from '../types.ts';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
          <h2 className="text-slate-900 text-xl font-black tracking-tight">RecoveryIQ</h2>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold tracking-wider uppercase">
          <span className="material-symbols-outlined text-base">verified_user</span>
          Secure Enterprise Gateway
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="p-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center size-16 bg-primary/5 rounded-full mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">lock_open</span>
              </div>
              <h1 className="text-slate-900 text-3xl font-black tracking-tight mb-2">Welcome Back</h1>
              <p className="text-slate-500 text-sm font-medium">Secure access to FedEx recovery management</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Access Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['ADMIN', 'MANAGER', 'DCA'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all ${
                        role === r 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl mb-1">
                        {r === 'ADMIN' ? 'admin_panel_settings' : r === 'MANAGER' ? 'manage_accounts' : 'business_center'}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{r}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Corporate Email</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">mail</span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@fedex.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-slate-200 bg-slate-50 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</button>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">lock</span>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border-slate-200 bg-slate-50 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-slate-900"
                  />
                  <button type="button" className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors">visibility</button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="remember" className="rounded border-slate-300 text-primary focus:ring-primary size-4" />
                <label htmlFor="remember" className="text-sm text-slate-500 font-medium">Remember for 30 days</label>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
              >
                Sign In as {role}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          </div>
          <div className="bg-slate-50 px-10 py-4 border-t border-slate-100 flex justify-center gap-2 items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            <span className="material-symbols-outlined text-sm">shield</span>
            256-bit AES Encrypted Session
          </div>
        </div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          © 2024 FedEx Corp. | RecoveryIQ Enterprise v2.4.1-Stable
        </p>
      </footer>
    </div>
  );
}
