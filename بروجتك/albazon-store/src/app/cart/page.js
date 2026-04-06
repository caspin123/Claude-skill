'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useCart from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clearCart = useCart((s) => s.clearCart);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <main>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="w-24 h-24 rounded-3xl bg-surface-200 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/products" className="btn-primary">
            Start Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">
          Shopping Cart
          <span className="text-lg text-gray-500 font-normal ml-3">
            ({items.reduce((s, i) => s + i.quantity, 0)} items)
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-surface-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-white">
                          {formatPrice(item.salePrice || item.price)}
                        </span>
                        {item.salePrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-0 bg-surface-200 rounded-lg border border-surface-300">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-gray-300">
                      {formatPrice((item.salePrice || item.price) * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <Link
                href="/products"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-400 font-medium' : 'text-white font-medium'}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (8%)</span>
                  <span className="text-white font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-between">
                  <span className="text-base font-bold text-white">Total</span>
                  <span className="text-xl font-black text-white">{formatPrice(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-500 mt-3">
                  Add {formatPrice(99 - subtotal)} more for free shipping
                </p>
              )}

              <Link href="/checkout" className="btn-primary w-full mt-6 py-4 text-base">
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              {/* Payment icons placeholder */}
              <div className="mt-4 flex items-center justify-center gap-3">
                {['Visa', 'MC', 'PayPal', 'Apple'].map((m) => (
                  <div
                    key={m}
                    className="px-2 py-1 bg-surface-200 rounded text-[10px] font-bold text-gray-500"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
