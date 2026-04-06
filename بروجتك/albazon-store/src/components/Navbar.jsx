'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Gamepad2 } from 'lucide-react';
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
    { href: '/products', label: 'All Games' },
    { href: '/products?category=pc-games', label: 'PC Games' },
    { href: '/products?category=consoles', label: 'Consoles' },
    { href: '/products?category=accessories', label: 'Gear' },
  ];

  return (
    <>
      {/* Top promo bar */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-accent-dark text-white text-center text-sm py-2.5 px-4 font-medium">
        <span className="opacity-90">Instant digital delivery on all game codes</span>
        {' — '}
        <span className="font-bold">GAMER24</span>
        <span className="opacity-90"> for 10% off</span>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-xl border-b border-brand-900/30 shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent flex items-center justify-center shadow-neon group-hover:shadow-glow transition-shadow duration-300">
                <Gamepad2 size={22} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-wider text-white leading-none">
                  ALBAZON
                </span>
                <span className="hidden sm:block font-heading text-[10px] text-brand-400 tracking-[0.3em] uppercase leading-none mt-0.5">
                  Games
                </span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Search games"
              >
                <Search size={20} />
              </button>

              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl text-muted hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 bg-accent text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-fade-in shadow-neon-accent">
                    {count}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Toggle menu"
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
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark" size={18} />
                <input
                  type="text"
                  placeholder="Search games, consoles, accessories..."
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
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
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
