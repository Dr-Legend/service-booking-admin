'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/(auth)/login/actions';
import QRCode from 'react-qr-code';
import { Github, Globe, ExternalLink, LayoutDashboard, Server, Smartphone } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Bookings', href: '/bookings' },
    { name: 'Users', href: '/users' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col hidden md:flex">
      <div className="p-6">
        <h1 className="text-2xl font-bold font-outfit bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          ProCreator
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Admin Panel</p>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar">
        <nav className="px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2.5 rounded-lg font-medium transition-colors ${isActive
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              {item.name}
            </Link>
          );
        })}
        </nav>

        <div className="mt-6 mb-4 px-4">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">Project Resources</p>
          <div className="space-y-1">
            <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><LayoutDashboard size={12}/> Admin</p>
              <div className="flex gap-2 mt-1.5 ml-4">
                <a href="https://github.com/Dr-Legend/service-booking-admin" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors" title="Repo"><Github size={14} /></a>
                <a href="https://service-booking-admin-three.vercel.app" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors" title="Vercel"><Globe size={14} /></a>
                <a href="https://procreator-admin.vsaasify.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors" title="Production"><ExternalLink size={14} /></a>
              </div>
            </div>
            
            <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><Server size={12}/> Backend</p>
              <div className="flex gap-2 mt-1.5 ml-4">
                <a href="https://github.com/Dr-Legend/service-booking-core" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors" title="Repo"><Github size={14} /></a>
                <a href="https://service-booking-core.dev-03a.workers.dev" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors" title="Live API"><ExternalLink size={14} /></a>
              </div>
            </div>

            <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><Smartphone size={12}/> Client App</p>
              <div className="flex gap-2 mt-1.5 ml-4">
                <a href="https://github.com/Dr-Legend/service-booking-app" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors" title="Repo"><Github size={14} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 pb-2 px-4">
          <div className="p-4 bg-indigo-50 dark:bg-slate-800/80 rounded-xl flex flex-col items-center text-center border border-indigo-100 dark:border-slate-700/50">
            <h3 className="text-xs font-bold mb-2 text-indigo-900 dark:text-indigo-200 tracking-wide">CLIENT APP</h3>
            <div className="bg-white p-1.5 rounded-lg shadow-sm inline-block mb-2">
              <QRCode value="https://drive.google.com/file/d/1zMyvv2bhrRuNTqKZOSYstky1pQ6iztz8/view?usp=sharing" size={90} />
            </div>
            <p className="text-[10px] text-indigo-700/80 dark:text-indigo-300 font-medium leading-tight">Scan to download<br/>& test on mobile</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="flex-1 text-sm overflow-hidden">
            <p className="font-medium">Admin User</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-ellipsis overflow-hidden">
              admin@agency.com
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
              title="Log out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
