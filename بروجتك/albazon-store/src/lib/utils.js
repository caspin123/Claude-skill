import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function generateOrderNo() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ALB-${timestamp}-${random}`;
}

export function truncate(str, length = 100) {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function getDiscountPercent(price, salePrice) {
  if (!salePrice) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}
