import { GetAllCategoriesUseCase } from '@/application/use-cases/services/GetAllCategoriesUseCase';
import { serviceRepository } from '@/infrastructure/di/container';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const getCategoriesUseCase = new GetAllCategoriesUseCase(serviceRepository);
  const categories = await getCategoriesUseCase.execute();

  return (
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-4xl font-bold font-outfit text-slate-900 dark:text-white">Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back! Here's what's happening today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-6 rounded-2xl shadow-sm glow-hover relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 relative z-10">Active Inquiries</h3>
          <p className="text-3xl font-bold font-outfit relative z-10">12</p>
          <div className="mt-4 text-xs font-medium text-emerald-500 relative z-10 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +2 this week
          </div>
        </div>
        
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-6 rounded-2xl shadow-sm glow-hover relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 relative z-10">Total Revenue (Pipeline)</h3>
          <p className="text-3xl font-bold font-outfit relative z-10">$45,200</p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-6 rounded-2xl shadow-sm glow-hover relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 relative z-10">Service Capacity</h3>
          <p className="text-3xl font-bold font-outfit relative z-10">85%</p>
          <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative z-10">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: '85%' }} />
          </div>
        </div>
      </div>

      {/* Services Section showing Clean Architecture fetch */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">Managed Service Categories</h2>
          <button className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-sm transition-all shadow-indigo-500/20 active:scale-95">
            + New Category
          </button>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {categories.map(category => (
              <li key={category.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{category.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                    Active
                  </span>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {categories.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No categories found.
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
