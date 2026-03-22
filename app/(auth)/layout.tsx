export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-outfit bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            ProCreator
          </h1>
          <p className="text-slate-500 mt-2">Sign in to manage your services</p>
        </div>
        {children}
      </div>
    </div>
  );
}
