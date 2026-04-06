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
  ShoppingCart, Heart, Star, Download, Shield, RotateCcw,
  ChevronRight, Minus, Plus, Check,
} from 'lucide-react';

const productDB = {
  'cyber-horizon-2077': { id: '1', name: 'Cyber Horizon 2077', slug: 'cyber-horizon-2077', description: 'Dive into a neon-lit open world where every choice shapes the fate of a sprawling cyberpunk metropolis. As a mercenary outlaw, you will navigate corporate conspiracies, hack into fortified systems, and engage in adrenaline-pumping combat across massive urban landscapes.\n\nFeaturing ray-traced visuals, a dynamic weather system, and over 200 hours of content, Cyber Horizon 2077 delivers the ultimate sci-fi RPG experience. Customize your character with cybernetic enhancements, build alliances with diverse factions, and uncover the secrets of a world on the brink of collapse.', price: 69.99, salePrice: 49.99, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', images: ['https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800'], stock: 999, featured: true, rating: 4.8, reviews: 12847, category: { name: 'PC Games' }, specs: [['Genre', 'Open World RPG'], ['Platform', 'PC / PS5 / Xbox'], ['Players', '1 (Single)'], ['Size', '85 GB'], ['Rating', 'M (Mature)'], ['Release', '2024']] },
  'shadow-legends-rebirth': { id: '2', name: 'Shadow Legends: Rebirth', slug: 'shadow-legends-rebirth', description: 'Return to the dark fantasy realm of Eldoria in this epic action RPG sequel. Wield legendary weapons, master devastating magic, and face bosses that will test your every skill. The Rebirth expansion adds an entirely new continent, 6 character classes, and a deep crafting system.\n\nWith souls-like combat refined to perfection and a haunting orchestral soundtrack, Shadow Legends: Rebirth raises the bar for the genre. Explore procedurally generated dungeons, forge powerful gear, and challenge other players in intense PvP arenas.', price: 59.99, salePrice: null, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', images: ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800'], stock: 999, featured: true, rating: 4.9, reviews: 8523, category: { name: 'PC Games' }, specs: [['Genre', 'Action RPG'], ['Platform', 'PC / PS5'], ['Players', '1-4 Co-op'], ['Size', '65 GB'], ['Rating', 'T (Teen)'], ['Release', '2024']] },
  'ps5-pro-console': { id: '3', name: 'PlayStation 5 Pro Console', slug: 'ps5-pro-console', description: 'Experience gaming at its finest with the PlayStation 5 Pro. Featuring an upgraded GPU delivering up to 45% faster rendering, enhanced ray tracing capabilities, and AI-driven upscaling for stunning 4K visuals at 120fps.\n\nThe 2TB SSD provides lightning-fast load times, while the redesigned DualSense Pro controller offers haptic feedback that immerses you in every game world. Backward compatible with thousands of PS4 and PS5 titles, the PS5 Pro is the ultimate gaming machine.', price: 699.99, salePrice: 649.99, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800', images: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800'], stock: 45, featured: true, rating: 4.9, reviews: 6234, category: { name: 'Consoles' }, specs: [['GPU', 'RDNA 3+ Enhanced'], ['Storage', '2TB NVMe SSD'], ['Output', '4K 120fps / 8K'], ['RAM', '16GB GDDR6'], ['Audio', '3D Tempest'], ['Wi-Fi', 'Wi-Fi 7']] },
};

const relatedProducts = [
  { id: '4', name: 'RGB Mechanical Keyboard', slug: 'rgb-mechanical-keyboard', price: 189.99, salePrice: 149.99, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600', stock: 250, featured: true, rating: 4.7, reviews: 4567, category: { name: 'Accessories' } },
  { id: '7', name: 'Pro Gaming Headset 7.1', slug: 'pro-gaming-headset', price: 299.99, salePrice: 229.99, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600', stock: 120, featured: true, rating: 4.8, reviews: 5678, category: { name: 'Accessories' } },
  { id: '10', name: 'Ultra Gaming Mouse', slug: 'ultra-gaming-mouse', price: 129.99, salePrice: 99.99, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600', stock: 300, featured: false, rating: 4.6, reviews: 4521, category: { name: 'Accessories' } },
  { id: '5', name: 'Galactic Wars: Frontier', slug: 'galactic-wars-frontier', price: 49.99, salePrice: null, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=600', stock: 999, featured: false, rating: 4.6, reviews: 3241, category: { name: 'PC Games' } },
];

export default function ProductPage() {
  const params = useParams();
  const product = productDB[params.id] || productDB['cyber-horizon-2077'];
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
          <Link href="/products" className="hover:text-white transition-colors">Games</Link>
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
                { icon: Download, text: 'Instant Delivery' },
                { icon: Shield, text: 'Secure Purchase' },
                { icon: RotateCcw, text: '14-Day Refund' },
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
