'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, { error: '' } as any);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
      <form action={formAction} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email address</label>
          <input 
            id="email"
            name="email" 
            type="email" 
            autoComplete="email" 
            required 
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition-all" 
            placeholder="admin@agency.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="password">Password</label>
          <input 
            id="password"
            name="password" 
            type="password" 
            autoComplete="current-password" 
            required 
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition-all" 
            placeholder="••••••••"
          />
        </div>

        {state?.error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-sm font-medium">
            {state.error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full px-5 py-2.5 rounded-xl font-medium bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center"
        >
          {isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
