'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Settings, LogOut, ChevronLeft, BarChart3, Gamepad2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-surface-50 border-r border-white/5 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent flex items-center justify-center shadow-neon">
            <Gamepad2 size={20} className="text-white" />
          </div>
          <div>
            <span className="font-heading text-sm font-bold tracking-wider text-white">ALBAZON</span>
            <span className="block font-heading text-[9px] text-brand-400 tracking-[0.25em] uppercase">Games Admin</span>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="font-heading text-[9px] text-muted-dark uppercase tracking-[0.2em] font-semibold px-3 mb-3">
          Main Menu
        </p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-neon'
                  : 'text-muted hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-white hover:bg-white/5 transition-colors duration-200">
          <ChevronLeft size={18} />
          Back to Store
        </Link>
        <button
          onClick={() => {
            document.cookie = 'albazon_admin_token=; max-age=0; path=/';
            window.location.href = '/admin/login';
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-accent hover:text-accent-light hover:bg-accent/10 transition-colors duration-200 cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
