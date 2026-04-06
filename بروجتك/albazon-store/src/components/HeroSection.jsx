'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Star, TrendingUp, Gamepad2, Trophy, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20">
              <Zap size={14} className="text-brand-400" />
              <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">
                New Releases 2024
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                <span className="text-white">Level Up</span>
                <br />
                <span className="gradient-text">Your Gaming</span>
                <br />
                <span className="text-white">Experience</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                Explore the latest games, consoles, and gear. From AAA titles to
                indie gems — find your next adventure at ALBAZON Games.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary text-base px-8 py-4 group">
                Browse Games
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/products?featured=true" className="btn-secondary text-base px-8 py-4">
                Top Sellers
                <TrendingUp size={18} />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { value: '10K+', label: 'Games', icon: Gamepad2 },
                { value: '200K+', label: 'Gamers', icon: Users },
                { value: '4.9', label: 'Rating', icon: Star, fill: true },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    {stat.fill ? (
                      <Star size={16} className="text-amber-400 fill-amber-400" />
                    ) : null}
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Featured cards */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[560px]">
              {/* Main card */}
              <div className="absolute top-0 right-0 w-80 glass-card rounded-3xl overflow-hidden shadow-card animate-float">
                <div className="aspect-[4/5] relative">
                  <img
                    src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500"
                    alt="Featured game"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs text-brand-300 font-semibold mb-1">BESTSELLER</p>
                    <p className="text-white font-bold">Cyber Horizon 2077</p>
                    <p className="text-brand-400 font-bold mt-1">$59.99</p>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div
                className="absolute bottom-12 left-0 glass-card rounded-2xl p-4 shadow-card"
                style={{ animation: 'float 6s ease-in-out infinite 1s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">PS5 Pro Console</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats card */}
              <div
                className="absolute top-20 left-4 glass-card rounded-2xl p-4 shadow-card"
                style={{ animation: 'float 6s ease-in-out infinite 2s' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-medium">Players Online</span>
                </div>
                <p className="text-2xl font-bold text-white">48,291</p>
                <p className="text-xs text-gray-500">gaming right now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
