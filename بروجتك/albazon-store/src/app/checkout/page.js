'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import useCart from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import {
  CreditCard, Lock, Check, ChevronRight, MapPin, User, Mail, Phone,
} from 'lucide-react';

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clearCart = useCart((s) => s.clearCart);
  const [step, setStep] = useState(1);
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = items.reduce(
    (s, i) => s + (i.salePrice || i.price) * i.quantity, 0
  );
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  function handlePlace() {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setDone(true);
      clearCart();
    }, 2000);
  }

  if (done) {
    return (
      <main>
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <Check size={36} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h1>
          <p className="text-gray-400 mb-2">
            Thank you for shopping with ALBAZON.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Order #ALB-{Date.now().toString(36).toUpperCase()} — Confirmation sent to your email.
          </p>
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <button
                onClick={() => setStep(i + 1)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === i + 1
                    ? 'bg-brand-500 text-white shadow-glow-sm'
                    : step > i + 1
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-surface-200 text-gray-500'
                }`}
              >
                {step > i + 1 ? <Check size={16} /> : i + 1}
              </button>
              <span className={`text-sm font-medium hidden sm:inline ${step === i + 1 ? 'text-white' : 'text-gray-500'}`}>
                {s}
              </span>
              {i < 2 && <ChevronRight size={16} className="text-gray-600 hidden sm:inline" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form area */}
          <div className="lg:col-span-3">
            {step === 1 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-brand-400" />
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">First Name</label>
                      <input className="input-field" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Last Name</label>
                      <input className="input-field" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                      <input className="input-field pl-10" placeholder="john@example.com" type="email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                      <input className="input-field pl-10" placeholder="+1 (555) 000-0000" type="tel" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Address</label>
                    <input className="input-field" placeholder="123 Main Street" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">City</label>
                      <input className="input-field" placeholder="New York" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">State</label>
                      <input className="input-field" placeholder="NY" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">ZIP</label>
                      <input className="input-field" placeholder="10001" />
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-primary w-full mt-8 py-4">
                  Continue to Payment
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CreditCard size={20} className="text-brand-400" />
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Card Number</label>
                    <input className="input-field" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Name on Card</label>
                    <input className="input-field" placeholder="John Doe" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Expiry</label>
                      <input className="input-field" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">CVC</label>
                      <input className="input-field" placeholder="123" type="password" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                  <Lock size={12} /> Your payment info is secured with 256-bit encryption
                </div>
                <button onClick={() => setStep(3)} className="btn-primary w-full mt-8 py-4">
                  Review Order
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-6">Review Your Order</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-100 flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {formatPrice((item.salePrice || item.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handlePlace}
                  disabled={placing}
                  className="btn-primary w-full mt-8 py-4 text-base"
                >
                  {placing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      <Lock size={18} />
                      Place Order — {formatPrice(total)}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Side summary */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h3 className="text-sm font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-400">
                    <span className="truncate mr-2">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-white flex-shrink-0">
                      {formatPrice((item.salePrice || item.price) * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-white/5 pt-2 mt-3 space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-emerald-400' : 'text-white'}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span className="text-white">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex justify-between">
                    <span className="font-bold text-white">Total</span>
                    <span className="text-lg font-black text-white">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
