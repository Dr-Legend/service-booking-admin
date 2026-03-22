'use client';

import { useState } from 'react';
import { createUserAction } from '@/app/(dashboard)/users/actions';
import { User, UserRole } from '@/domain/entities/User';

interface Props {
  users: User[];
}

export default function UserManager({ users }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-slate-900 dark:text-white">Users</h1>
          <p className="text-slate-500 mt-1">Manage your agency's users, clients and staff.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full shadow-lg shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-transform active:scale-95"
        >
          + Add User
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {users.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No users found. Add a user to get started.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 dark:bg-slate-800/50 dark:border-slate-800 text-slate-500 font-medium">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Company</th>
                <th className="py-4 px-6 text-right">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">{user.name}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{user.email}</td>
                  <td className="py-4 px-6 text-slate-500">{user.company || '-'}</td>
                  <td className="py-4 px-6 text-right text-slate-500">{user.phone || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-lg font-outfit">Add New User</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form 
              action={(formData) => {
                createUserAction(formData);
                setModalOpen(false);
              }} 
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <input name="name" required placeholder="John Doe" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5">Role</label>
                <select name="role" required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                  <option value="CLIENT">Client</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input name="email" type="email" required placeholder="john@example.com" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone (Optional)</label>
                <input name="phone" placeholder="+1 (555) 000-0000" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Company (Optional)</label>
                <input name="company" placeholder="Acme Corp" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-medium bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95">Add User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
