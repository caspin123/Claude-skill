'use client';
import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Grid3X3, LayoutGrid, Gamepad2 } from 'lucide-react';

const allProducts = [
  { id: '1', name: 'Cyber Horizon 2077', slug: 'cyber-horizon-2077', price: 69.99, salePrice: 49.99, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600', stock: 999, featured: true, rating: 4.8, reviews: 12847, category: { name: 'PC Games', slug: 'pc-games' } },
  { id: '2', name: 'Shadow Legends: Rebirth', slug: 'shadow-legends-rebirth', price: 59.99, salePrice: null, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600', stock: 999, featured: true, rating: 4.9, reviews: 8523, category: { name: 'PC Games', slug: 'pc-games' } },
  { id: '3', name: 'PlayStation 5 Pro Console', slug: 'ps5-pro-console', price: 699.99, salePrice: 649.99, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600', stock: 45, featured: true, rating: 4.9, reviews: 6234, category: { name: 'Consoles', slug: 'consoles' } },
  { id: '4', name: 'RGB Mechanical Keyboard', slug: 'rgb-mechanical-keyboard', price: 189.99, salePrice: 149.99, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600', stock: 250, featured: true, rating: 4.7, reviews: 4567, category: { name: 'Accessories', slug: 'accessories' } },
  { id: '5', name: 'Galactic Wars: Frontier', slug: 'galactic-wars-frontier', price: 49.99, salePrice: null, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=600', stock: 999, featured: false, rating: 4.6, reviews: 3241, category: { name: 'PC Games', slug: 'pc-games' } },
  { id: '6', name: 'Xbox Series X Bundle', slug: 'xbox-series-x-bundle', price: 599.99, salePrice: 499.99, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600', stock: 30, featured: true, rating: 4.8, reviews: 3456, category: { name: 'Consoles', slug: 'consoles' } },
  { id: '7', name: 'Pro Gaming Headset 7.1', slug: 'pro-gaming-headset', price: 299.99, salePrice: 229.99, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600', stock: 120, featured: true, rating: 4.8, reviews: 5678, category: { name: 'Accessories', slug: 'accessories' } },
  { id: '8', name: 'Dragon Age: Dark Realm', slug: 'dragon-age-dark-realm', price: 69.99, salePrice: 54.99, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600', stock: 999, featured: true, rating: 4.7, reviews: 7892, category: { name: 'PC Games', slug: 'pc-games' } },
  { id: '9', name: 'Nintendo Switch OLED', slug: 'nintendo-switch-oled', price: 349.99, salePrice: null, image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600', stock: 80, featured: false, rating: 4.8, reviews: 9876, category: { name: 'Consoles', slug: 'consoles' } },
  { id: '10', name: 'Ultra Gaming Mouse', slug: 'ultra-gaming-mouse', price: 129.99, salePrice: 99.99, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600', stock: 300, featured: false, rating: 4.6, reviews: 4521, category: { name: 'Accessories', slug: 'accessories' } },
  { id: '11', name: 'Neon Racer: Turbo', slug: 'neon-racer-turbo', price: 39.99, salePrice: 29.99, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600', stock: 999, featured: false, rating: 4.5, reviews: 2103, category: { name: 'Console Games', slug: 'console-games' } },
  { id: '12', name: 'Gaming Monitor 27" 4K', slug: 'gaming-monitor-27-4k', price: 799.99, salePrice: 649.99, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600', stock: 55, featured: false, rating: 4.7, reviews: 3890, category: { name: 'Accessories', slug: 'accessories' } },
];

const categories = ['All', 'PC Games', 'Console Games', 'Consoles', 'Accessories'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function ProductsPage() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [cols, setCols] = useState(4);

  const filtered = useMemo(() => {
    let items = [...allProducts];
    if (category !== 'All') {
      items = items.filter((p) => p.category.name === category);
    }
    switch (sort) {
      case 'price-asc':
        items.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        items.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      default:
        items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return items;
  }, [category, sort]);

  return (
    <main>
      <Navbar />

      {/* Header */}
      <div className="bg-surface-50/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Gamepad2 size={28} className="text-brand-400" />
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Game Store
            </h1>
          </div>
          <p className="text-muted">
            Showing {filtered.length} items
            {category !== 'All' && ` in ${category}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  category === cat
                    ? 'bg-brand-500 text-white shadow-glow-sm'
                    : 'bg-surface-200/80 text-muted border border-surface-300/50 hover:text-white hover:bg-surface-300/80 hover:border-surface-400/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & view */}
          <div className="flex items-center gap-3">
            <label className="sr-only" htmlFor="sort-select">Sort by</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 bg-surface-200/80 border border-surface-300/50 rounded-xl text-sm text-gray-300 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="hidden lg:flex items-center gap-1 bg-surface-200/80 rounded-xl p-1 border border-surface-300/50">
              <button
                onClick={() => setCols(3)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${cols === 3 ? 'bg-brand-500/20 text-brand-400' : 'text-muted-dark hover:text-white'}`}
                aria-label="3 columns"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setCols(4)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${cols === 4 ? 'bg-brand-500/20 text-brand-400' : 'text-muted-dark hover:text-white'}`}
                aria-label="4 columns"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div
          className={`grid gap-4 sm:gap-6 ${
            cols === 3
              ? 'grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Gamepad2 size={48} className="text-surface-300 mx-auto mb-4" />
            <p className="text-muted text-lg mb-4">No games found in this category.</p>
            <button
              onClick={() => setCategory('All')}
              className="btn-secondary cursor-pointer"
            >
              View All Games
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
