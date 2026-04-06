'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, User, ChevronDown } from 'lucide-react';
import useCart from '@/hooks/useCart';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const items = useCart((s) => s.items);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/products?category=electronics', label: 'Electronics' },
    { href: '/products?category=fashion', label: 'Fashion' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-600 text-white text-center text-sm py-2 px-4 font-medium">
        Free shipping on orders over $99 — Use code <span className="font-bold">ALBAZON24</span>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-black text-white text-lg shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
                A
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  ALBAZON
                </span>
                <span className="hidden sm:inline text-xs text-gray-500 block -mt-1 tracking-widest uppercase">
                  store
                </span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                    {count}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-white/5 bg-surface-50/95 backdrop-blur-xl animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field pl-12"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/5 bg-surface-50/95 backdrop-blur-xl animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
