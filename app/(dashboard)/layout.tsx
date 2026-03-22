import Sidebar from '@/presentation/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full relative">
        {children}
      </main>
    </>
  );
}
