'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import useCart from '@/hooks/useCart';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import {
  ShoppingCart, Heart, Star, Truck, Shield, RotateCcw,
  ChevronRight, Minus, Plus, Check,
} from 'lucide-react';

const productDB = {
  'pro-wireless-headphones': { id: '1', name: 'Pro Wireless Headphones', slug: 'pro-wireless-headphones', description: 'Experience audio perfection with our flagship Pro Wireless Headphones. Featuring industry-leading Active Noise Cancellation, Hi-Res Audio certification, and ultra-comfortable memory foam ear cushions designed for all-day wear. The 40-hour battery life ensures your music never stops, while the premium titanium drivers deliver crystal-clear sound across the entire frequency range.\n\nBuilt with aerospace-grade materials for unmatched durability, these headphones feature multipoint Bluetooth 5.3 connectivity, allowing you to seamlessly switch between devices. The intuitive touch controls and voice assistant integration make controlling your audio effortless.', price: 349.99, salePrice: 279.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800'], stock: 150, featured: true, rating: 4.8, reviews: 2847, category: { name: 'Electronics' }, specs: [['Driver', '50mm Titanium'], ['Battery', '40 Hours'], ['Bluetooth', '5.3'], ['ANC', 'Adaptive'], ['Weight', '250g'], ['Charging', 'USB-C Fast']] },
  'ultra-smart-watch-x': { id: '2', name: 'Ultra Smart Watch X', slug: 'ultra-smart-watch-x', description: 'The Ultra Smart Watch X redefines what a smartwatch can do. With its stunning 2.1" AMOLED always-on display reaching 2000 nits brightness, every glance is crystal clear even in direct sunlight. Track over 100 workout types, monitor blood oxygen, ECG, and sleep patterns with medical-grade sensors.\n\nCrafted from titanium with a sapphire crystal display, it is built for adventure and luxury alike. The 7-day battery life means fewer interruptions, and with IP68 water resistance rated to 100m, it goes wherever you do.', price: 499.99, salePrice: 399.99, image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800', images: ['https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800'], stock: 89, featured: true, rating: 4.9, reviews: 1523, category: { name: 'Electronics' }, specs: [['Display', '2.1" AMOLED'], ['Battery', '7 Days'], ['Water', 'IP68 100m'], ['Sensors', 'SpO2, ECG, HR'], ['Material', 'Titanium'], ['OS', 'WearOS 5']] },
  '4k-drone-pro-max': { id: '3', name: '4K Drone Pro Max', slug: '4k-drone-pro-max', description: 'Capture breathtaking aerial footage with the 4K Drone Pro Max. Featuring a Hasselblad camera system with 4K HDR video at 120fps, 48MP photos, and a 1-inch CMOS sensor for stunning image quality in any lighting condition.\n\n45 minutes of flight time, omnidirectional obstacle avoidance with 12 sensors, and AI-powered subject tracking make this the ultimate creative tool for filmmakers and content creators.', price: 1299.99, salePrice: null, image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800', images: ['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800'], stock: 34, featured: true, rating: 4.7, reviews: 892, category: { name: 'Electronics' }, specs: [['Camera', '4K HDR 120fps'], ['Flight', '45 minutes'], ['Range', '15km'], ['Sensors', '12 Obstacle'], ['Photo', '48MP RAW'], ['Weight', '895g']] },
};

const relatedProducts = [
  { id: '11', name: 'Mechanical Gaming Keyboard', slug: 'mechanical-gaming-keyboard', price: 199.99, salePrice: 159.99, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600', stock: 250, featured: false, rating: 4.7, reviews: 2103, category: { name: 'Electronics' } },
  { id: '12', name: 'Wireless Earbuds Elite', slug: 'wireless-earbuds-elite', price: 229.99, salePrice: null, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600', stock: 180, featured: false, rating: 4.5, reviews: 3890, category: { name: 'Electronics' } },
  { id: '10', name: 'Smart Fitness Tracker', slug: 'smart-fitness-tracker', price: 179.99, salePrice: 129.99, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600', stock: 300, featured: false, rating: 4.6, reviews: 4521, category: { name: 'Sports' } },
  { id: '5', name: 'Limited Edition Sneakers', slug: 'limited-edition-sneakers', price: 299.99, salePrice: null, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', stock: 120, featured: false, rating: 4.8, reviews: 3241, category: { name: 'Fashion' } },
];

export default function ProductPage() {
  const params = useParams();
  const product = productDB[params.id] || productDB['pro-wireless-headphones'];
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const discount = getDiscountPercent(product.price, product.salePrice);

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.image,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main>
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-gray-300">{product.name}</span>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-100 glass-card">
              <img
                src={product.images[selectedImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-xl">
                  -{discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImg === i ? 'border-brand-500' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-brand-400 font-semibold uppercase tracking-wider mb-2">
                {product.category.name}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-white">
                {formatPrice(product.salePrice || product.price)}
              </span>
              {product.salePrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
              {discount > 0 && (
                <span className="badge bg-red-500/10 text-red-400 border border-red-500/20 text-sm">
                  Save {formatPrice(product.price - product.salePrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            {/* Specs */}
            {product.specs && (
              <div className="grid grid-cols-3 gap-3">
                {product.specs.map(([label, value]) => (
                  <div key={label} className="glass-card rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-0 bg-surface-200 rounded-xl border border-surface-300">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 text-gray-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-semibold text-white">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-3 text-gray-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`btn-primary flex-1 py-4 text-base ${added ? 'from-emerald-600 to-emerald-500' : ''}`}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                className="p-4 rounded-xl bg-surface-200 border border-surface-300 text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
              {[
                { icon: Truck, text: 'Free Shipping' },
                { icon: Shield, text: '2-Year Warranty' },
                { icon: RotateCcw, text: '30-Day Returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                  <Icon size={16} className="text-brand-400 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
