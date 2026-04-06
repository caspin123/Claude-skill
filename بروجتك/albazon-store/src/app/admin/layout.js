import AdminSidebar from '@/components/AdminSidebar';

export const metadata = {
  title: 'Admin Panel | ALBAZON STORE',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-white/5 bg-surface-50/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10">
          <div />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-sm font-bold text-white">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">ALBAZON Admin</p>
              <p className="text-xs text-gray-500">Superadmin</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
