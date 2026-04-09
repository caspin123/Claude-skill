"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Fade-up reveal wrapper ───────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Services", "Results", "Process", "Testimonials"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "bg-[#0F172A]/95 backdrop-blur-md border border-white/10 shadow-2xl" : "bg-transparent"
      }`}
    >
      <span className="text-xl tracking-tight" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
        <span className="text-[#CA8A04]">Apex</span> Consulting
      </span>

      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer">
            {l}
          </a>
        ))}
      </div>

      <a href="#contact" className="hidden md:inline-flex items-center gap-2 bg-[#CA8A04] hover:bg-[#B45309] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer">
        Book a Call
      </a>

      <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1" aria-label="Toggle menu">
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#1E293B] border border-white/10 rounded-2xl p-4 flex flex-col gap-3"
          >
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                {l}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="bg-[#CA8A04] text-white text-center py-2.5 rounded-xl font-semibold cursor-pointer">
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#CA8A04]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/20 rounded-full blur-[80px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#CA8A04]/10 border border-[#CA8A04]/30 text-[#CA8A04] text-sm font-medium px-4 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-[#CA8A04] rounded-full animate-pulse" />
          Trusted by 200+ small businesses
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Grow Your Business{" "}
          <span className="relative inline-block">
            <span className="text-[#CA8A04]">Smarter</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#CA8A04] origin-left"
            />
          </span>
          <br />Not Harder
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We help small business owners escape the hustle trap — with proven strategy, streamlined systems, and hands-on execution that drives real revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-[#CA8A04] hover:bg-[#B45309] text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors duration-200 cursor-pointer shadow-lg shadow-amber-900/30">
            Book a Free Strategy Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#results" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors duration-200 cursor-pointer">
            See Client Results
          </a>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 text-slate-500 text-sm">
          Featured in
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-8 opacity-30"
        >
          {["Forbes", "Inc. 500", "Entrepreneur", "Fast Company"].map((name) => (
            <span key={name} className="text-white font-bold text-sm tracking-widest uppercase">{name}</span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: 200, suffix: "+", label: "Businesses Helped" },
    { value: 3, suffix: "x", label: "Avg Revenue Increase" },
    { value: 94, suffix: "%", label: "Client Retention Rate" },
    { value: 12, suffix: "yrs", label: "Industry Experience" },
  ];
  return (
    <section id="results" className="py-16 px-4 border-y border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#CA8A04] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-slate-400 text-sm">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: "Growth Strategy",
    desc: "A custom 90-day roadmap built around your goals — not generic templates.",
    tag: "Most Popular",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    title: "Operations & Systems",
    desc: "Eliminate bottlenecks and build repeatable processes so your business runs without you.",
    tag: null,
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: "Marketing & Acquisition",
    desc: "Attract your ideal customers consistently with proven digital marketing frameworks.",
    tag: null,
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Pricing & Profitability",
    desc: "Stop undercharging. We audit your pricing and show you exactly where profit is leaking.",
    tag: "High Impact",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: "Brand Positioning",
    desc: "Define what makes you different and communicate it so clearly clients choose you first.",
    tag: null,
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: "Execution Support",
    desc: "We don't just hand you a plan and leave. We work alongside you to get it done.",
    tag: null,
  },
];

function Services() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-[#CA8A04] text-sm font-semibold uppercase tracking-widest">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Everything Your Business Needs<br /><span className="text-slate-400">to Scale</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">No fluff, no filler. Each service is designed for one thing — measurable growth.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group relative bg-[#1E293B] hover:bg-[#243044] border border-white/5 hover:border-[#CA8A04]/30 rounded-2xl p-6 transition-all duration-300 cursor-pointer h-full">
                {s.tag && (
                  <span className="absolute top-4 right-4 bg-[#CA8A04]/15 text-[#CA8A04] text-xs font-semibold px-2.5 py-1 rounded-full">{s.tag}</span>
                )}
                <div className="w-12 h-12 bg-[#CA8A04]/10 text-[#CA8A04] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#CA8A04]/20 transition-colors duration-200">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Discovery Call", desc: "A free 30-minute call to understand where you are, where you want to be, and what's blocking you." },
  { num: "02", title: "Deep Audit", desc: "We analyse your operations, financials, and marketing to identify the highest-leverage opportunities." },
  { num: "03", title: "Custom Roadmap", desc: "You receive a prioritised 90-day action plan — specific, realistic, and built for your business." },
  { num: "04", title: "Execute & Scale", desc: "We work with you every step of the way, tracking KPIs, adjusting strategy, and celebrating wins." },
];

function Process() {
  return (
    <section id="process" className="py-24 px-4 bg-[#0B1120]">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-[#CA8A04] text-sm font-semibold uppercase tracking-widest">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3" style={{ fontFamily: "Poppins, sans-serif" }}>
            From Stuck to Scaling<br /><span className="text-slate-400">in 4 Steps</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#CA8A04]/40 to-transparent z-10" />
                )}
                <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-bold text-[#CA8A04]/20 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>{step.num}</div>
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "In 6 months we went from barely breaking even to our most profitable quarter ever. The pricing audit alone paid for everything 10x over.",
    name: "Sarah K.",
    role: "Owner, Bloom Bakery",
    result: "+$84K revenue in 6 months",
  },
  {
    quote: "I was working 70-hour weeks and going nowhere. Apex helped me systemise my business so I could step back and actually grow it.",
    name: "Marcus T.",
    role: "Founder, TechFix Pro",
    result: "Workweek reduced 70 → 40 hrs",
  },
  {
    quote: "We tripled our client base without tripling our team. The growth strategy was clear, actionable, and it actually worked.",
    name: "Linda R.",
    role: "CEO, Radiance Clinics",
    result: "3x clients, same team size",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-[#CA8A04] text-sm font-semibold uppercase tracking-widest">Client Results</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3" style={{ fontFamily: "Poppins, sans-serif" }}>
            Real Businesses.<br /><span className="text-slate-400">Real Numbers.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-6 flex flex-col h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#CA8A04] fill-[#CA8A04]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="border-t border-white/5 pt-4">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{t.role}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-[#CA8A04]/10 text-[#CA8A04] text-xs font-semibold px-2.5 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {t.result}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="relative bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#CA8A04]/20 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#CA8A04]/10 rounded-full blur-[80px] pointer-events-none" />
            <span className="relative inline-flex items-center gap-2 bg-[#CA8A04]/10 border border-[#CA8A04]/30 text-[#CA8A04] text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#CA8A04] rounded-full animate-pulse" />
              Limited spots available this month
            </span>
            <h2 className="relative text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              Ready to Build a Business<br />That Works for You?
            </h2>
            <p className="relative text-slate-400 text-lg max-w-xl mx-auto mb-10">
              Book a free 30-minute strategy call. No pitch, no pressure — just clarity on your next move.
            </p>
            <a
              href="mailto:hello@apexconsulting.com"
              className="relative inline-flex items-center gap-2 bg-[#CA8A04] hover:bg-[#B45309] text-white font-semibold px-10 py-4 rounded-xl text-base transition-colors duration-200 cursor-pointer shadow-xl shadow-amber-900/30"
            >
              Book My Free Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="relative mt-4 text-slate-500 text-sm">No commitment. 100% free.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
          <span className="text-[#CA8A04]">Apex</span> Consulting
        </span>
        <p className="text-slate-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Apex Consulting. Helping small businesses grow smarter.
        </p>
        <div className="flex gap-4 text-slate-500 text-sm">
          <a href="#services" className="hover:text-white transition-colors cursor-pointer">Services</a>
          <a href="#contact" className="hover:text-white transition-colors cursor-pointer">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
