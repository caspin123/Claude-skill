import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Flame,
  Clock,
  ChevronRight,
} from 'lucide-react';

// Demo data (replace with DB calls when Prisma is connected)
const featuredProducts = [
  {
    id: '1',
    name: 'Pro Wireless Headphones',
    slug: 'pro-wireless-headphones',
    price: 349.99,
    salePrice: 279.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    stock: 150,
    featured: true,
    rating: 4.8,
    reviews: 2847,
    category: { name: 'Electronics' },
  },
  {
    id: '2',
    name: 'Ultra Smart Watch X',
    slug: 'ultra-smart-watch-x',
    price: 499.99,
    salePrice: 399.99,
    image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600',
    stock: 89,
    featured: true,
    rating: 4.9,
    reviews: 1523,
    category: { name: 'Electronics' },
  },
  {
    id: '3',
    name: '4K Drone Pro Max',
    slug: '4k-drone-pro-max',
    price: 1299.99,
    salePrice: null,
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600',
    stock: 34,
    featured: true,
    rating: 4.7,
    reviews: 892,
    category: { name: 'Electronics' },
  },
  {
    id: '4',
    name: 'Designer Leather Jacket',
    slug: 'designer-leather-jacket',
    price: 899.99,
    salePrice: 699.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    stock: 45,
    featured: true,
    rating: 4.6,
    reviews: 567,
    category: { name: 'Fashion' },
  },
  {
    id: '5',
    name: 'Limited Edition Sneakers',
    slug: 'limited-edition-sneakers',
    price: 299.99,
    salePrice: null,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    stock: 120,
    featured: false,
    rating: 4.8,
    reviews: 3241,
    category: { name: 'Fashion' },
  },
  {
    id: '7',
    name: 'Modular Smart Sofa',
    slug: 'modular-smart-sofa',
    price: 2499.99,
    salePrice: 1999.99,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
    stock: 12,
    featured: true,
    rating: 4.9,
    reviews: 234,
    category: { name: 'Home & Living' },
  },
  {
    id: '9',
    name: 'Carbon Fiber Road Bike',
    slug: 'carbon-fiber-road-bike',
    price: 3499.99,
    salePrice: 2999.99,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600',
    stock: 18,
    featured: true,
    rating: 4.9,
    reviews: 445,
    category: { name: 'Sports' },
  },
  {
    id: '11',
    name: 'Mechanical Gaming Keyboard',
    slug: 'mechanical-gaming-keyboard',
    price: 199.99,
    salePrice: 159.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600',
    stock: 250,
    featured: false,
    rating: 4.7,
    reviews: 2103,
    category: { name: 'Electronics' },
  },
];

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600',
    count: 1240,
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
    count: 3560,
  },
  {
    name: 'Home & Living',
    slug: 'home-living',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600',
    count: 890,
  },
  {
    name: 'Sports & Outdoors',
    slug: 'sports',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8a0226?w=600',
    count: 2100,
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
                <Sparkles size={18} className="text-brand-400" />
                <span className="text-sm font-semibold text-brand-400 uppercase tracking-wider">
                  Browse
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-brand-400 transition-colors"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="text-lg font-bold text-white mb-0.5">{cat.name}</h3>
                  <p className="text-sm text-gray-300">{cat.count.toLocaleString()} products</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
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
                <Flame size={18} className="text-red-400" />
                <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">
                  Trending
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products?featured=true"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-brand-400 transition-colors"
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
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-700 via-brand-600 to-amber-600" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 mb-6">
                <Clock size={14} />
                <span className="text-sm font-semibold">Limited Time Offer</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                Get 30% Off Everything
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join 120,000+ happy customers and save big on premium products.
                Free shipping included on all orders.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-bold rounded-xl text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Shop the Sale
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-surface-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Stay in the Loop
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Subscribe for exclusive deals, new arrivals, and insider-only discounts.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
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
