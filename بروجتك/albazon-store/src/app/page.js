import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Flame,
  Gamepad2,
  ChevronRight,
  Zap,
  Trophy,
} from 'lucide-react';

const featuredProducts = [
  {
    id: '1',
    name: 'Cyber Horizon 2077',
    slug: 'cyber-horizon-2077',
    price: 69.99,
    salePrice: 49.99,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600',
    stock: 999,
    featured: true,
    rating: 4.8,
    reviews: 12847,
    category: { name: 'PC Games' },
  },
  {
    id: '2',
    name: 'Shadow Legends: Rebirth',
    slug: 'shadow-legends-rebirth',
    price: 59.99,
    salePrice: null,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600',
    stock: 999,
    featured: true,
    rating: 4.9,
    reviews: 8523,
    category: { name: 'PC Games' },
  },
  {
    id: '3',
    name: 'PlayStation 5 Pro Console',
    slug: 'ps5-pro-console',
    price: 699.99,
    salePrice: 649.99,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600',
    stock: 45,
    featured: true,
    rating: 4.9,
    reviews: 6234,
    category: { name: 'Consoles' },
  },
  {
    id: '4',
    name: 'RGB Mechanical Keyboard',
    slug: 'rgb-mechanical-keyboard',
    price: 189.99,
    salePrice: 149.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600',
    stock: 250,
    featured: true,
    rating: 4.7,
    reviews: 4567,
    category: { name: 'Accessories' },
  },
  {
    id: '5',
    name: 'Galactic Wars: Frontier',
    slug: 'galactic-wars-frontier',
    price: 49.99,
    salePrice: null,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=600',
    stock: 999,
    featured: false,
    rating: 4.6,
    reviews: 3241,
    category: { name: 'PC Games' },
  },
  {
    id: '6',
    name: 'Xbox Series X Bundle',
    slug: 'xbox-series-x-bundle',
    price: 599.99,
    salePrice: 499.99,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600',
    stock: 30,
    featured: true,
    rating: 4.8,
    reviews: 3456,
    category: { name: 'Consoles' },
  },
  {
    id: '7',
    name: 'Pro Gaming Headset 7.1',
    slug: 'pro-gaming-headset',
    price: 299.99,
    salePrice: 229.99,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600',
    stock: 120,
    featured: true,
    rating: 4.8,
    reviews: 5678,
    category: { name: 'Accessories' },
  },
  {
    id: '8',
    name: 'Dragon Age: Dark Realm',
    slug: 'dragon-age-dark-realm',
    price: 69.99,
    salePrice: 54.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
    stock: 999,
    featured: true,
    rating: 4.7,
    reviews: 7892,
    category: { name: 'PC Games' },
  },
];

const categories = [
  {
    name: 'PC Games',
    slug: 'pc-games',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
    count: 3500,
  },
  {
    name: 'Console Games',
    slug: 'console-games',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600',
    count: 2800,
  },
  {
    name: 'Consoles & Hardware',
    slug: 'consoles',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600',
    count: 450,
  },
  {
    name: 'Gaming Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600',
    count: 1200,
  },
];

export default function HomePage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <section className="py-20 bg-surface-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-brand-400" />
                <span className="section-label text-brand-400">Browse</span>
              </div>
              <h2 className="section-heading">Shop by Category</h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-muted hover:text-brand-400 transition-colors duration-200"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/30 transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="font-heading text-sm sm:text-base font-bold text-white mb-0.5 tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted">{cat.count.toLocaleString()} items</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-500/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                  <ArrowRight size={18} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame size={16} className="text-accent" />
                <span className="section-label text-accent">Hot Right Now</span>
              </div>
              <h2 className="section-heading">Top Sellers</h2>
            </div>
            <Link
              href="/products?featured=true"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-muted hover:text-brand-400 transition-colors duration-200"
            >
              See All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-surface to-accent-dark/20" />
            <div className="absolute inset-0 bg-hero-glow" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/20 mb-6">
                <Gamepad2 size={14} className="text-brand-400" />
                <span className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-300">
                  Summer Sale Event
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                Up to 50% Off Top Games
              </h2>
              <p className="text-lg text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
                Join 200,000+ gamers and grab the best deals on AAA titles,
                indie gems, and gaming gear. Limited time only.
              </p>
              <Link
                href="/products"
                className="btn-accent text-base px-8 py-4 group"
              >
                Shop the Sale
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-surface-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap size={16} className="text-neon-cyan" />
            <span className="section-label text-neon-cyan">Newsletter</span>
          </div>
          <h2 className="section-heading mb-3">Stay in the Game</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Subscribe for exclusive deals, new releases, and gamer-only discounts.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
