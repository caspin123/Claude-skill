'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Star, TrendingUp, Gamepad2, Users, Trophy } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/[0.02] rounded-full blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(167,139,250,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.2) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 backdrop-blur-sm">
              <Zap size={14} className="text-brand-400" />
              <span className="font-heading text-[10px] font-semibold text-brand-300 uppercase tracking-[0.2em]">
                New Releases 2024
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-5">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                <span className="text-white">Level Up</span>
                <br />
                <span className="gradient-text">Your Gaming</span>
                <br />
                <span className="text-white">Experience</span>
              </h1>
              <p className="text-lg text-muted max-w-lg leading-relaxed">
                Explore the latest AAA titles, indie gems, consoles, and premium
                gaming gear. Your next adventure starts at ALBAZON Games.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary text-base px-8 py-4 group">
                Browse Games
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="/products?featured=true" className="btn-secondary text-base px-8 py-4">
                <Trophy size={18} className="text-amber-400" />
                Top Sellers
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-4">
              {[
                { value: '10K+', label: 'Games' },
                { value: '200K+', label: 'Gamers' },
                { value: '4.9', label: 'Rating', hasStar: true },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading text-2xl font-bold text-white">{stat.value}</span>
                    {stat.hasStar && <Star size={16} className="text-amber-400 fill-amber-400" />}
                  </div>
                  <span className="text-xs text-muted-dark uppercase tracking-wider font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Featured cards */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[560px]">
              {/* Main featured card */}
              <div className="absolute top-0 right-0 w-80 glass-card-hover rounded-2xl overflow-hidden shadow-card animate-float scanline-overlay">
                <div className="aspect-[4/5] relative">
                  <img
                    src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500"
                    alt="Cyber Horizon 2077 game cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="badge-accent text-[10px]">BESTSELLER</span>
                    </div>
                    <p className="font-heading text-sm font-bold text-white tracking-wide">Cyber Horizon 2077</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-brand-400 font-bold">$49.99</span>
                      <span className="text-gray-500 text-sm line-through">$69.99</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating product card */}
              <div
                className="absolute bottom-12 left-0 glass-card rounded-2xl p-4 shadow-card"
                style={{ animation: 'float 6s ease-in-out infinite 1s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-brand-500/20">
                    <img
                      src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100"
                      alt="PS5 Pro"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">PS5 Pro Console</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-[11px] text-muted-dark ml-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live stats card */}
              <div
                className="absolute top-20 left-4 glass-card rounded-2xl p-4 shadow-card"
                style={{ animation: 'float 6s ease-in-out infinite 2s' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="font-heading text-[10px] text-neon-green font-medium tracking-wider uppercase">
                    Players Online
                  </span>
                </div>
                <p className="font-heading text-2xl font-bold text-white">48,291</p>
                <p className="text-[11px] text-muted-dark">gaming right now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
