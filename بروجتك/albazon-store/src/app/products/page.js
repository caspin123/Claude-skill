'use client';
import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react';

const allProducts = [
  { id: '1', name: 'Pro Wireless Headphones', slug: 'pro-wireless-headphones', price: 349.99, salePrice: 279.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', stock: 150, featured: true, rating: 4.8, reviews: 2847, category: { name: 'Electronics', slug: 'electronics' } },
  { id: '2', name: 'Ultra Smart Watch X', slug: 'ultra-smart-watch-x', price: 499.99, salePrice: 399.99, image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600', stock: 89, featured: true, rating: 4.9, reviews: 1523, category: { name: 'Electronics', slug: 'electronics' } },
  { id: '3', name: '4K Drone Pro Max', slug: '4k-drone-pro-max', price: 1299.99, salePrice: null, image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600', stock: 34, featured: true, rating: 4.7, reviews: 892, category: { name: 'Electronics', slug: 'electronics' } },
  { id: '4', name: 'Designer Leather Jacket', slug: 'designer-leather-jacket', price: 899.99, salePrice: 699.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600', stock: 45, featured: true, rating: 4.6, reviews: 567, category: { name: 'Fashion', slug: 'fashion' } },
  { id: '5', name: 'Limited Edition Sneakers', slug: 'limited-edition-sneakers', price: 299.99, salePrice: null, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', stock: 120, featured: false, rating: 4.8, reviews: 3241, category: { name: 'Fashion', slug: 'fashion' } },
  { id: '6', name: 'Premium Sunglasses', slug: 'premium-sunglasses', price: 249.99, salePrice: 199.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600', stock: 200, featured: false, rating: 4.5, reviews: 1876, category: { name: 'Fashion', slug: 'fashion' } },
  { id: '7', name: 'Modular Smart Sofa', slug: 'modular-smart-sofa', price: 2499.99, salePrice: 1999.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', stock: 12, featured: true, rating: 4.9, reviews: 234, category: { name: 'Home & Living', slug: 'home-living' } },
  { id: '8', name: 'Smart Home Hub Pro', slug: 'smart-home-hub-pro', price: 449.99, salePrice: null, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600', stock: 78, featured: false, rating: 4.4, reviews: 1102, category: { name: 'Home & Living', slug: 'home-living' } },
  { id: '9', name: 'Carbon Fiber Road Bike', slug: 'carbon-fiber-road-bike', price: 3499.99, salePrice: 2999.99, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600', stock: 18, featured: true, rating: 4.9, reviews: 445, category: { name: 'Sports', slug: 'sports' } },
  { id: '10', name: 'Smart Fitness Tracker', slug: 'smart-fitness-tracker', price: 179.99, salePrice: 129.99, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600', stock: 300, featured: false, rating: 4.6, reviews: 4521, category: { name: 'Sports', slug: 'sports' } },
  { id: '11', name: 'Mechanical Gaming Keyboard', slug: 'mechanical-gaming-keyboard', price: 199.99, salePrice: 159.99, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600', stock: 250, featured: false, rating: 4.7, reviews: 2103, category: { name: 'Electronics', slug: 'electronics' } },
  { id: '12', name: 'Wireless Earbuds Elite', slug: 'wireless-earbuds-elite', price: 229.99, salePrice: null, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600', stock: 180, featured: false, rating: 4.5, reviews: 3890, category: { name: 'Electronics', slug: 'electronics' } },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports'];
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">
            Showing {filtered.length} products
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
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-brand-500 text-white shadow-glow-sm'
                    : 'bg-surface-200 text-gray-400 hover:text-white hover:bg-surface-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & view */}
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 bg-surface-200 border border-surface-300 rounded-xl text-sm text-gray-300 outline-none focus:border-brand-500"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="hidden lg:flex items-center gap-1 bg-surface-200 rounded-xl p-1">
              <button
                onClick={() => setCols(3)}
                className={`p-2 rounded-lg transition-colors ${cols === 3 ? 'bg-surface-300 text-white' : 'text-gray-500 hover:text-white'}`}
                aria-label="3 columns"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setCols(4)}
                className={`p-2 rounded-lg transition-colors ${cols === 4 ? 'bg-surface-300 text-white' : 'text-gray-500 hover:text-white'}`}
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
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <button
              onClick={() => setCategory('All')}
              className="mt-4 btn-secondary"
            >
              View All Products
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
