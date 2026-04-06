'use client';
import { useState } from 'react';
import {
  TrendingUp, ShoppingCart, Package, Users,
  DollarSign, ArrowUpRight, ArrowDownRight,
  Eye, Star, Clock,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 42000, orders: 320 },
  { month: 'Feb', revenue: 38000, orders: 290 },
  { month: 'Mar', revenue: 55000, orders: 410 },
  { month: 'Apr', revenue: 61000, orders: 480 },
  { month: 'May', revenue: 58000, orders: 440 },
  { month: 'Jun', revenue: 72000, orders: 560 },
  { month: 'Jul', revenue: 68000, orders: 520 },
  { month: 'Aug', revenue: 81000, orders: 630 },
  { month: 'Sep', revenue: 76000, orders: 590 },
  { month: 'Oct', revenue: 94000, orders: 720 },
  { month: 'Nov', revenue: 118000, orders: 910 },
  { month: 'Dec', revenue: 143000, orders: 1100 },
];

const categoryData = [
  { name: 'Electronics', value: 45 },
  { name: 'Fashion', value: 28 },
  { name: 'Home', value: 15 },
  { name: 'Sports', value: 12 },
];

const recentOrders = [
  { id: 'ALB-X7K2M', customer: 'James Wilson', product: 'Pro Wireless Headphones', amount: 279.99, status: 'delivered', time: '2m ago' },
  { id: 'ALB-9P3QN', customer: 'Sarah Chen', product: 'Ultra Smart Watch X', amount: 399.99, status: 'processing', time: '15m ago' },
  { id: 'ALB-4R8TL', customer: 'Ahmed Al-Rashid', product: '4K Drone Pro Max', amount: 1299.99, status: 'shipped', time: '1h ago' },
  { id: 'ALB-2Y6WA', customer: 'Emma Rodriguez', product: 'Designer Leather Jacket', amount: 699.99, status: 'pending', time: '2h ago' },
  { id: 'ALB-5Z1CB', customer: 'Michael Park', product: 'Carbon Fiber Road Bike', amount: 2999.99, status: 'delivered', time: '3h ago' },
];

const topProducts = [
  { name: 'Pro Wireless Headphones', sales: 2847, revenue: 795890, rating: 4.8 },
  { name: 'Ultra Smart Watch X', sales: 1523, revenue: 608777, rating: 4.9 },
  { name: 'Limited Edition Sneakers', sales: 3241, revenue: 972059, rating: 4.8 },
  { name: 'Smart Fitness Tracker', sales: 4521, revenue: 587230, rating: 4.6 },
];

const statusBadge = {
  delivered: 'badge-success',
  processing: 'badge-info',
  shipped: 'badge-warning',
  pending: 'badge bg-gray-500/10 text-gray-400 border border-gray-500/20',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl p-3 border border-white/10">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-sm font-semibold text-white">
            {p.name === 'revenue'
              ? `$${(p.value / 1000).toFixed(0)}k`
              : `${p.value} orders`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState('12m');

  const stats = [
    {
      label: 'Total Revenue',
      value: '$1.04M',
      change: '+23.5%',
      up: true,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Total Orders',
      value: '7,970',
      change: '+18.2%',
      up: true,
      icon: ShoppingCart,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Products',
      value: '12',
      change: '+4 this month',
      up: true,
      icon: Package,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Customers',
      value: '124K',
      change: '+12.8%',
      up: true,
      icon: Users,
      color: 'text-brand-400',
      bg: 'bg-brand-500/10',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening.</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '12m'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                period === p
                  ? 'bg-brand-500 text-white'
                  : 'bg-surface-200 text-gray-400 hover:text-white hover:bg-surface-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={22} className={stat.color} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="xl:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Revenue Overview</h2>
              <p className="text-sm text-gray-500">Monthly performance</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-brand-500" />Revenue
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 5, fill: '#F97316' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-1">Sales by Category</h2>
          <p className="text-sm text-gray-500 mb-6">Revenue distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip formatter={(v) => [`${v}%`, 'Share']} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="value" fill="#F97316" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{c.name}</span>
                <span className="font-semibold text-white">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid xl:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <a href="/admin/orders" className="text-sm text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="divide-y divide-white/5">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-start gap-4 hover:bg-white/2 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-surface-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-400">
                  {order.customer.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{order.customer}</p>
                  <p className="text-xs text-gray-500 truncate">{order.product}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-white">${order.amount}</p>
                  <span className={`${statusBadge[order.status]} mt-1 inline-block`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Top Products</h2>
            <a href="/admin/products" className="text-sm text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1">
              Manage <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="divide-y divide-white/5">
            {topProducts.map((p, i) => (
              <div key={p.name} className="px-6 py-4 flex items-center gap-4">
                <span className="text-sm font-bold text-gray-600 w-5 flex-shrink-0">
                  #{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{p.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs text-gray-500">{p.rating} · {p.sales.toLocaleString()} sold</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-white flex-shrink-0">
                  ${(p.revenue / 1000).toFixed(0)}k
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
