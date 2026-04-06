'use client';
import { useState } from 'react';
import {
  Search, Eye, ChevronUp, ChevronDown,
  ShoppingCart, X, Package, Truck, Check, Clock,
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

const orders = [
  { id: 'ALB-X7K2M', customer: 'James Wilson', email: 'james@email.com', product: 'Pro Wireless Headphones x1', total: 279.99, status: 'delivered', address: '123 Main St, New York, NY 10001', date: new Date(2024, 9, 28) },
  { id: 'ALB-9P3QN', customer: 'Sarah Chen', email: 'sarah@email.com', product: 'Ultra Smart Watch X x1', total: 399.99, status: 'processing', address: '456 Oak Ave, Los Angeles, CA 90001', date: new Date(2024, 9, 28) },
  { id: 'ALB-4R8TL', customer: 'Ahmed Al-Rashid', email: 'ahmed@email.com', product: '4K Drone Pro Max x1', total: 1299.99, status: 'shipped', address: '789 Pine Rd, Chicago, IL 60601', date: new Date(2024, 9, 27) },
  { id: 'ALB-2Y6WA', customer: 'Emma Rodriguez', email: 'emma@email.com', product: 'Designer Leather Jacket x1', total: 699.99, status: 'pending', address: '321 Elm St, Houston, TX 77001', date: new Date(2024, 9, 27) },
  { id: 'ALB-5Z1CB', customer: 'Michael Park', email: 'michael@email.com', product: 'Carbon Fiber Road Bike x1', total: 2999.99, status: 'delivered', address: '654 Maple Dr, Phoenix, AZ 85001', date: new Date(2024, 9, 26) },
  { id: 'ALB-8N4DK', customer: 'Lisa Thompson', email: 'lisa@email.com', product: 'Modular Smart Sofa x1', total: 1999.99, status: 'processing', address: '987 Cedar Ln, Philadelphia, PA 19101', date: new Date(2024, 9, 26) },
  { id: 'ALB-1M7GJ', customer: 'David Kim', email: 'david@email.com', product: 'Limited Edition Sneakers x2', total: 599.98, status: 'shipped', address: '147 Birch Blvd, San Antonio, TX 78201', date: new Date(2024, 9, 25) },
  { id: 'ALB-3H9PF', customer: 'Aisha Patel', email: 'aisha@email.com', product: 'Smart Fitness Tracker x1', total: 129.99, status: 'delivered', address: '258 Walnut St, San Diego, CA 92101', date: new Date(2024, 9, 25) },
  { id: 'ALB-6Q2RV', customer: 'Carlos Mendez', email: 'carlos@email.com', product: 'Mechanical Gaming Keyboard x1', total: 159.99, status: 'cancelled', address: '369 Spruce Ave, Dallas, TX 75201', date: new Date(2024, 9, 24) },
  { id: 'ALB-0W5XE', customer: 'Nina Johansson', email: 'nina@email.com', product: 'Wireless Earbuds Elite x1', total: 229.99, status: 'pending', address: '741 Hickory Ct, San Jose, CA 95101', date: new Date(2024, 9, 24) },
];

const statusConfig = {
  pending:    { label: 'Pending',    cls: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20', icon: Clock },
  processing: { label: 'Processing', cls: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',   icon: Package },
  shipped:    { label: 'Shipped',    cls: 'bg-purple-500/10 text-purple-400 border border-purple-500/20', icon: Truck },
  delivered:  { label: 'Delivered',  cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20', icon: Check },
  cancelled:  { label: 'Cancelled',  cls: 'bg-red-500/10 text-red-400 border border-red-500/20', icon: X },
};

const allStatuses = Object.keys(statusConfig);

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' });
  const [viewing, setViewing] = useState(null);
  const [statuses, setStatuses] = useState(Object.fromEntries(orders.map((o) => [o.id, o.status])));

  const filtered = orders
    .filter((o) => {
      const q = search.toLowerCase();
      const matchSearch = o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.email.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || statuses[o.id] === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      if (sort.key === 'date') return (a.date - b.date) * dir;
      if (sort.key === 'total') return (a.total - b.total) * dir;
      return a[sort.key].localeCompare(b[sort.key]) * dir;
    });

  const counts = { all: orders.length, ...Object.fromEntries(allStatuses.map((s) => [s, orders.filter((o) => statuses[o.id] === s).length])) };

  function handleSort(key) {
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));
  }

  function updateStatus(id, newStatus) {
    setStatuses((prev) => ({ ...prev, [id]: newStatus }));
    if (viewing?.id === id) setViewing((v) => ({ ...v, status: newStatus }));
  }

  const SortIcon = ({ k }) =>
    sort.key === k
      ? sort.dir === 'asc' ? <ChevronUp size={14} className="text-brand-400" /> : <ChevronDown size={14} className="text-brand-400" />
      : <ChevronUp size={14} className="text-gray-700" />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-gray-500 text-sm mt-0.5">{orders.length} total orders</p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {[['all', 'All'], ...allStatuses.map((s) => [s, statusConfig[s].label])].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setStatusFilter(val)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              statusFilter === val
                ? 'bg-brand-500 text-white'
                : 'bg-surface-200 text-gray-400 hover:text-white hover:bg-surface-300'
            }`}
          >
            {label}
            <span className="text-xs font-bold opacity-70">{counts[val]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders, customers..."
          className="input-field pl-10"
        />
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left">
                {[
                  { key: 'id', label: 'Order ID' },
                  { key: 'customer', label: 'Customer' },
                  { key: 'product', label: 'Items' },
                  { key: 'total', label: 'Total' },
                  { key: 'date', label: 'Date' },
                  { key: 'status', label: 'Status' },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      <SortIcon k={col.key} />
                    </span>
                  </th>
                ))}
                <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((o) => {
                const s = statuses[o.id];
                const cfg = statusConfig[s];
                return (
                  <tr key={o.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4 font-mono text-sm text-brand-400">{o.id}</td>
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{o.customer}</p>
                      <p className="text-xs text-gray-500">{o.email}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-400 max-w-[160px] truncate">{o.product}</td>
                    <td className="px-5 py-4 font-bold text-white">{formatPrice(o.total)}</td>
                    <td className="px-5 py-4 text-gray-400">{formatDate(o.date)}</td>
                    <td className="px-5 py-4">
                      <span className={`badge ${cfg.cls}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setViewing({ ...o, status: s })}
                        className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                        aria-label="View"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <ShoppingCart size={36} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>

      {/* Order detail modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-2xl w-full max-w-md p-6 border border-white/10 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Order Details</h2>
                <p className="text-sm font-mono text-brand-400 mt-0.5">{viewing.id}</p>
              </div>
              <button onClick={() => setViewing(null)} className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-white">{viewing.customer}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{viewing.email}</p>
                </div>
                <div className="glass-card rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-xl font-black text-white">{formatPrice(viewing.total)}</p>
                </div>
              </div>

              <div className="glass-card rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Items</p>
                <p className="text-white">{viewing.product}</p>
              </div>

              <div className="glass-card rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Shipping Address</p>
                <p className="text-white">{viewing.address}</p>
              </div>

              {/* Update status */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {allStatuses.map((s) => {
                    const cfg = statusConfig[s];
                    const active = statuses[viewing.id] === s;
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(viewing.id, s)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                          active ? cfg.cls : 'bg-surface-200 text-gray-500 border-surface-300 hover:text-white hover:bg-surface-300'
                        }`}
                      >
                        <cfg.icon size={14} />
                        {cfg.label}
                        {active && <Check size={12} className="ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button onClick={() => setViewing(null)} className="btn-secondary w-full mt-6">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
