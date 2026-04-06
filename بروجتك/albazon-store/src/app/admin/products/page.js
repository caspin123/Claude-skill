'use client';
import { useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, Package,
  Star, ChevronUp, ChevronDown, X, Check, Loader2,
} from 'lucide-react';
import { formatPrice, getDiscountPercent } from '@/lib/utils';

const initialProducts = [
  { id: '1', name: 'Pro Wireless Headphones', category: 'Electronics', price: 349.99, salePrice: 279.99, stock: 150, featured: true, active: true, rating: 4.8, reviews: 2847, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
  { id: '2', name: 'Ultra Smart Watch X', category: 'Electronics', price: 499.99, salePrice: 399.99, stock: 89, featured: true, active: true, rating: 4.9, reviews: 1523, image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=100' },
  { id: '3', name: '4K Drone Pro Max', category: 'Electronics', price: 1299.99, salePrice: null, stock: 34, featured: true, active: true, rating: 4.7, reviews: 892, image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=100' },
  { id: '4', name: 'Designer Leather Jacket', category: 'Fashion', price: 899.99, salePrice: 699.99, stock: 45, featured: true, active: true, rating: 4.6, reviews: 567, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100' },
  { id: '5', name: 'Limited Edition Sneakers', category: 'Fashion', price: 299.99, salePrice: null, stock: 120, featured: false, active: true, rating: 4.8, reviews: 3241, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { id: '6', name: 'Premium Sunglasses', category: 'Fashion', price: 249.99, salePrice: 199.99, stock: 200, featured: false, active: true, rating: 4.5, reviews: 1876, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100' },
  { id: '7', name: 'Modular Smart Sofa', category: 'Home & Living', price: 2499.99, salePrice: 1999.99, stock: 12, featured: true, active: true, rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100' },
  { id: '8', name: 'Smart Home Hub Pro', category: 'Home & Living', price: 449.99, salePrice: null, stock: 78, featured: false, active: true, rating: 4.4, reviews: 1102, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=100' },
  { id: '9', name: 'Carbon Fiber Road Bike', category: 'Sports', price: 3499.99, salePrice: 2999.99, stock: 18, featured: true, active: true, rating: 4.9, reviews: 445, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100' },
  { id: '10', name: 'Smart Fitness Tracker', category: 'Sports', price: 179.99, salePrice: 129.99, stock: 300, featured: false, active: true, rating: 4.6, reviews: 4521, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100' },
  { id: '11', name: 'Mechanical Gaming Keyboard', category: 'Electronics', price: 199.99, salePrice: 159.99, stock: 250, featured: false, active: true, rating: 4.7, reviews: 2103, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100' },
  { id: '12', name: 'Wireless Earbuds Elite', category: 'Electronics', price: 229.99, salePrice: null, stock: 180, featured: false, active: true, rating: 4.5, reviews: 3890, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=100' },
];

const emptyForm = { name: '', category: 'Electronics', price: '', salePrice: '', stock: '', image: '', featured: false, active: true };

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' });
  const [modal, setModal] = useState(null); // null | 'add' | 'edit' | 'delete'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const filtered = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      const dir = sort.dir === 'asc' ? 1 : -1;
      return typeof va === 'string' ? va.localeCompare(vb) * dir : (va - vb) * dir;
    });

  function openAdd() {
    setForm(emptyForm);
    setModal('add');
  }

  function openEdit(p) {
    setSelected(p);
    setForm({ ...p, salePrice: p.salePrice || '' });
    setModal('edit');
  }

  function openDelete(p) {
    setSelected(p);
    setModal('delete');
  }

  function handleSort(key) {
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      if (modal === 'add') {
        setProducts((prev) => [...prev, { ...form, id: Date.now().toString(), price: Number(form.price), salePrice: form.salePrice ? Number(form.salePrice) : null, stock: Number(form.stock), rating: 0, reviews: 0 }]);
      } else {
        setProducts((prev) => prev.map((p) => p.id === selected.id ? { ...p, ...form, price: Number(form.price), salePrice: form.salePrice ? Number(form.salePrice) : null, stock: Number(form.stock) } : p));
      }
      setSaving(false);
      setModal(null);
    }, 800);
  }

  function handleDelete() {
    setSaving(true);
    setTimeout(() => {
      setProducts((prev) => prev.filter((p) => p.id !== selected.id));
      setSaving(false);
      setModal(null);
    }, 500);
  }

  const SortIcon = ({ k }) => sort.key === k
    ? sort.dir === 'asc' ? <ChevronUp size={14} className="text-brand-400" /> : <ChevronDown size={14} className="text-brand-400" />
    : <ChevronUp size={14} className="text-gray-700" />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">{products.length} total products</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
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
                  { key: 'name', label: 'Product' },
                  { key: 'category', label: 'Category' },
                  { key: 'price', label: 'Price' },
                  { key: 'stock', label: 'Stock' },
                  { key: 'rating', label: 'Rating' },
                  { key: 'featured', label: 'Featured' },
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
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-200 flex-shrink-0">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-white max-w-[200px] truncate">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="badge bg-surface-200 text-gray-400 border border-surface-300">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <span className="font-semibold text-white">{formatPrice(p.salePrice || p.price)}</span>
                      {p.salePrice && (
                        <span className="text-xs text-gray-500 line-through ml-2">{formatPrice(p.price)}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-medium ${p.stock < 20 ? 'text-red-400' : p.stock < 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span className="text-white">{p.rating}</span>
                      <span className="text-gray-600 text-xs">({p.reviews.toLocaleString()})</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {p.featured
                      ? <span className="badge badge-success">Yes</span>
                      : <span className="badge bg-surface-200 text-gray-500 border border-surface-300">No</span>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                        aria-label="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDelete(p)}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Package size={36} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-2xl w-full max-w-lg p-6 border border-white/10 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {modal === 'add' ? 'Add Product' : 'Edit Product'}
              </h2>
              <button onClick={() => setModal(null)} className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Product Name</label>
                <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Category</label>
                  <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {['Electronics', 'Fashion', 'Home & Living', 'Sports'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Stock</label>
                  <input className="input-field" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Price ($)</label>
                  <input className="input-field" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Sale Price ($)</label>
                  <input className="input-field" type="number" step="0.01" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} placeholder="Optional" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Image URL</label>
                <input className="input-field" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setForm({ ...form, featured: !form.featured })}
                    className={`w-10 h-6 rounded-full transition-colors ${form.featured ? 'bg-brand-500' : 'bg-surface-300'} relative`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-sm text-gray-300">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setForm({ ...form, active: !form.active })}
                    className={`w-10 h-6 rounded-full transition-colors ${form.active ? 'bg-emerald-500' : 'bg-surface-300'} relative`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.active ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-sm text-gray-300">Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {modal === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-2xl w-full max-w-sm p-6 border border-white/10 animate-fade-in text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-400" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Delete Product</h2>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to delete <strong className="text-white">{selected?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="btn-secondary flex-1">Cancel</button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-xl transition-colors"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                {saving ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
