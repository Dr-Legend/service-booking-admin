'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, { error: '' } as any);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300" htmlFor="email">Email address</label>
        <input 
          id="email"
          name="email" 
          type="email" 
          autoComplete="email" 
          required 
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" 
          placeholder="admin@agency.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
        <input 
          id="password"
          name="password" 
          type="password" 
          autoComplete="current-password" 
          required 
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" 
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <div className="p-3.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-sm font-medium flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {state.error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full px-5 py-3 rounded-xl font-medium bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/40 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center mt-2 text-[15px]"
      >
        {isPending ? 'Authenticating...' : 'Sign In'}
      </button>
    </form>
  );
}
