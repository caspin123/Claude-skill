const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin account
  const adminPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'Albazon@Admin#2024!',
    12
  );

  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@albazon.store' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@albazon.store',
      password: adminPassword,
      name: 'ALBAZON Admin',
      role: 'superadmin',
    },
  });

  console.log('Admin account created');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest gadgets and electronics',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'fashion' },
      update: {},
      create: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trending fashion and accessories',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home-living' },
      update: {},
      create: {
        name: 'Home & Living',
        slug: 'home-living',
        description: 'Furniture and home decor',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sports' },
      update: {},
      create: {
        name: 'Sports & Outdoors',
        slug: 'sports',
        description: 'Sports gear and outdoor equipment',
        image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8a0226?w=600',
        order: 4,
      },
    }),
  ]);

  console.log('Categories created');

  // Create products
  const products = [
    {
      name: 'Pro Wireless Headphones',
      slug: 'pro-wireless-headphones',
      description: 'Premium noise-canceling wireless headphones with 40-hour battery life, Hi-Res audio, and ultra-comfortable memory foam ear cushions.',
      price: 349.99,
      salePrice: 279.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
      stock: 150,
      featured: true,
      rating: 4.8,
      reviews: 2847,
      categoryId: categories[0].id,
    },
    {
      name: 'Ultra Smart Watch X',
      slug: 'ultra-smart-watch-x',
      description: 'Next-gen smartwatch with AMOLED display, health monitoring, GPS, and 7-day battery life.',
      price: 499.99,
      salePrice: 399.99,
      image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600',
      stock: 89,
      featured: true,
      rating: 4.9,
      reviews: 1523,
      categoryId: categories[0].id,
    },
    {
      name: '4K Drone Pro Max',
      slug: '4k-drone-pro-max',
      description: 'Professional-grade drone with 4K HDR camera, 45-min flight time, obstacle avoidance, and AI tracking.',
      price: 1299.99,
      salePrice: null,
      image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600',
      stock: 34,
      featured: true,
      rating: 4.7,
      reviews: 892,
      categoryId: categories[0].id,
    },
    {
      name: 'Designer Leather Jacket',
      slug: 'designer-leather-jacket',
      description: 'Handcrafted Italian leather jacket with premium silk lining and brushed metal hardware.',
      price: 899.99,
      salePrice: 699.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
      stock: 45,
      featured: true,
      rating: 4.6,
      reviews: 567,
      categoryId: categories[1].id,
    },
    {
      name: 'Limited Edition Sneakers',
      slug: 'limited-edition-sneakers',
      description: 'Exclusive collaboration sneakers with carbon fiber sole and adaptive cushioning system.',
      price: 299.99,
      salePrice: null,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
      stock: 120,
      featured: false,
      rating: 4.8,
      reviews: 3241,
      categoryId: categories[1].id,
    },
    {
      name: 'Premium Sunglasses',
      slug: 'premium-sunglasses',
      description: 'Titanium frame polarized sunglasses with anti-reflective coating and UV400 protection.',
      price: 249.99,
      salePrice: 199.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
      stock: 200,
      featured: false,
      rating: 4.5,
      reviews: 1876,
      categoryId: categories[1].id,
    },
    {
      name: 'Modular Smart Sofa',
      slug: 'modular-smart-sofa',
      description: 'AI-powered modular sofa with built-in wireless charging, speakers, and ambient lighting.',
      price: 2499.99,
      salePrice: 1999.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
      stock: 12,
      featured: true,
      rating: 4.9,
      reviews: 234,
      categoryId: categories[2].id,
    },
    {
      name: 'Smart Home Hub Pro',
      slug: 'smart-home-hub-pro',
      description: 'Central smart home controller with AI assistant, 10-inch display, and whole-home automation.',
      price: 449.99,
      salePrice: null,
      image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600',
      stock: 78,
      featured: false,
      rating: 4.4,
      reviews: 1102,
      categoryId: categories[2].id,
    },
    {
      name: 'Carbon Fiber Road Bike',
      slug: 'carbon-fiber-road-bike',
      description: 'Ultra-lightweight carbon fiber frame with electronic shifting and aerodynamic design.',
      price: 3499.99,
      salePrice: 2999.99,
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600',
      stock: 18,
      featured: true,
      rating: 4.9,
      reviews: 445,
      categoryId: categories[3].id,
    },
    {
      name: 'Smart Fitness Tracker',
      slug: 'smart-fitness-tracker',
      description: 'Advanced fitness band with blood oxygen, ECG, sleep tracking, and 14-day battery.',
      price: 179.99,
      salePrice: 129.99,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600',
      stock: 300,
      featured: false,
      rating: 4.6,
      reviews: 4521,
      categoryId: categories[3].id,
    },
    {
      name: 'Mechanical Gaming Keyboard',
      slug: 'mechanical-gaming-keyboard',
      description: 'RGB mechanical keyboard with hot-swappable switches, aluminum frame, and customizable macros.',
      price: 199.99,
      salePrice: 159.99,
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600',
      stock: 250,
      featured: false,
      rating: 4.7,
      reviews: 2103,
      categoryId: categories[0].id,
    },
    {
      name: 'Wireless Earbuds Elite',
      slug: 'wireless-earbuds-elite',
      description: 'True wireless earbuds with spatial audio, adaptive ANC, and 36-hour total battery.',
      price: 229.99,
      salePrice: null,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600',
      stock: 180,
      featured: false,
      rating: 4.5,
      reviews: 3890,
      categoryId: categories[0].id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log('Products created');
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
