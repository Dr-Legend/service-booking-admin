import QRCode from 'react-qr-code';
import { Github, Globe, ExternalLink, LayoutDashboard, Server, Smartphone } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950">
      {/* Left Pane - Auth Form */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center items-center p-6 sm:p-12 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 relative z-20 shadow-xl lg:shadow-none">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-outfit bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              ProCreator
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Sign in to manage your services</p>
          </div>
          {children}
        </div>
      </div>

      {/* Right Pane - Info / Links */}
      <div className="w-full lg:w-[55%] xl:w-[60%] p-6 sm:p-12 pb-16 flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-white to-white dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950 -z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten pointer-events-none"></div>
        
        <div className="w-full max-w-2xl relative z-10 mt-8 lg:mt-0">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-800 dark:text-slate-100">Welcome to the Platform</h2>
            <p className="text-slate-500 mt-3 max-w-md mx-auto">Access the source code, live deployments, and test the client applications easily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Project Resources Column */}
            <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-5">
                <Globe size={16} /> Project Links
              </h3>
              
              <div className="space-y-4 flex-1">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80 transition-all hover:border-indigo-200 dark:hover:border-indigo-800/50">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2"><LayoutDashboard size={14}/> Admin Panel</h4>
                  <div className="flex flex-wrap gap-2">
                    <a href="https://github.com/Dr-Legend/service-booking-admin" target="_blank" rel="noreferrer" className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center gap-1.5 font-medium shadow-sm"><Github size={12}/> Repo</a>
                    <a href="https://service-booking-admin-three.vercel.app" target="_blank" rel="noreferrer" className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center gap-1.5 font-medium shadow-sm"><Globe size={12}/> Vercel</a>
                    <a href="https://procreator-admin.vsaasify.com" target="_blank" rel="noreferrer" className="text-xs px-2.5 py-1.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 font-medium shadow-sm"><ExternalLink size={12}/> Prod</a>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80 transition-all hover:border-indigo-200 dark:hover:border-indigo-800/50">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2"><Server size={14}/> Backend API</h4>
                  <div className="flex flex-wrap gap-2">
                    <a href="https://github.com/Dr-Legend/service-booking-core" target="_blank" rel="noreferrer" className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center gap-1.5 font-medium shadow-sm"><Github size={12}/> Repo</a>
                    <a href="https://service-booking-core.dev-03a.workers.dev" target="_blank" rel="noreferrer" className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center gap-1.5 font-medium shadow-sm"><ExternalLink size={12}/> Live</a>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80 transition-all hover:border-indigo-200 dark:hover:border-indigo-800/50">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2"><Smartphone size={14}/> Client App</h4>
                  <div className="flex flex-wrap gap-2">
                    <a href="https://github.com/Dr-Legend/service-booking-app" target="_blank" rel="noreferrer" className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center gap-1.5 font-medium shadow-sm"><Github size={12}/> Repo</a>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Column */}
            <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="flex-1 flex flex-col items-center justify-center w-full mt-4">
                <div className="w-14 h-14 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-indigo-100 dark:border-slate-700">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Client App Demo</h3>
                <p className="text-sm text-slate-500 mb-8 px-4 leading-relaxed">Scan the QR code to install the testing application on your iOS or Android device.</p>
                
                <div className="bg-white p-3.5 rounded-2xl shadow-md border border-slate-100 shadow-indigo-500/10 mb-4 transition-transform hover:scale-105 duration-300">
                  <QRCode value="https://drive.google.com/file/d/1zMyvv2bhrRuNTqKZOSYstky1pQ6iztz8/view?usp=sharing" size={150} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
