import Link from 'next/link';
import { Zap, Shield, Download, Headphones, Gamepad2 } from 'lucide-react';

const features = [
  { icon: Download, title: 'Instant Delivery', desc: 'Digital codes in seconds' },
  { icon: Shield, title: 'Secure Payment', desc: '256-bit encryption' },
  { icon: Zap, title: 'Best Prices', desc: 'Price match guarantee' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
];

const links = {
  Shop: [
    { label: 'All Games', href: '/products' },
    { label: 'PC Games', href: '/products?category=pc-games' },
    { label: 'Consoles', href: '/products?category=consoles' },
    { label: 'Accessories', href: '/products?category=accessories' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Refund Policy', href: '#' },
    { label: 'Track Order', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-50 border-t border-white/5">
      {/* Features bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                  <f.icon size={22} className="text-brand-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Gamepad2 size={18} className="text-white" />
              </div>
              <span className="text-lg font-black tracking-tight">ALBAZON</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Your ultimate destination for games, consoles, and gaming gear. Level up with us.
            </p>
            <div className="flex gap-3">
              {['X', 'Dc', 'Tw'].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-lg bg-surface-200 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white hover:bg-surface-300 transition-colors cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-brand-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} ALBAZON GAMES. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
