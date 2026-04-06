'use client';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import useCart from '@/hooks/useCart';

export default function ProductCard({ product }) {
  const addItem = useCart((s) => s.addItem);
  const discount = getDiscountPercent(
    Number(product.price),
    product.salePrice ? Number(product.salePrice) : null
  );

  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-card">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-surface-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-brand-500 transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </button>
          <Link
            href={`/products/${product.slug || product.id}`}
            className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-brand-500 transition-colors"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
              -{discount}%
            </span>
          )}
          {product.featured && (
            <span className="px-2.5 py-1 bg-brand-500 text-white text-xs font-bold rounded-lg">
              NEW
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: Number(product.price),
              salePrice: product.salePrice ? Number(product.salePrice) : null,
              image: product.image,
            })
          }
          className="absolute bottom-3 left-3 right-3 py-3 bg-brand-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-400"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
          {product.category?.name || 'General'}
        </p>
        <Link href={`/products/${product.slug || product.id}`}>
          <h3 className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.floor(Number(product.rating))
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-600'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews?.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">
            {formatPrice(product.salePrice || product.price)}
          </span>
          {product.salePrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
