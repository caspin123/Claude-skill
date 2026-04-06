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
    where: { email: process.env.ADMIN_EMAIL || 'admin@albazon.games' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@albazon.games',
      password: adminPassword,
      name: 'ALBAZON Games Admin',
      role: 'superadmin',
    },
  });

  console.log('Admin account created');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'pc-games' },
      update: {},
      create: {
        name: 'PC Games',
        slug: 'pc-games',
        description: 'The latest PC games and digital downloads',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'console-games' },
      update: {},
      create: {
        name: 'Console Games',
        slug: 'console-games',
        description: 'Games for PlayStation, Xbox, and Nintendo',
        image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'consoles' },
      update: {},
      create: {
        name: 'Consoles & Hardware',
        slug: 'consoles',
        description: 'Gaming consoles and hardware',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: {
        name: 'Gaming Accessories',
        slug: 'accessories',
        description: 'Controllers, headsets, keyboards, and more',
        image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600',
        order: 4,
      },
    }),
  ]);

  console.log('Categories created');

  // Create products
  const products = [
    {
      name: 'Cyber Horizon 2077',
      slug: 'cyber-horizon-2077',
      description: 'Open world cyberpunk RPG with ray-traced visuals, dynamic weather, and over 200 hours of content.',
      price: 69.99,
      salePrice: 49.99,
      image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600',
      stock: 999,
      featured: true,
      rating: 4.8,
      reviews: 12847,
      categoryId: categories[0].id,
    },
    {
      name: 'Shadow Legends: Rebirth',
      slug: 'shadow-legends-rebirth',
      description: 'Epic action RPG with souls-like combat, procedural dungeons, and intense PvP arenas.',
      price: 59.99,
      salePrice: null,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600',
      stock: 999,
      featured: true,
      rating: 4.9,
      reviews: 8523,
      categoryId: categories[0].id,
    },
    {
      name: 'Galactic Wars: Frontier',
      slug: 'galactic-wars-frontier',
      description: 'Space exploration and combat sim with massive fleet battles and planetary colonization.',
      price: 49.99,
      salePrice: null,
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=600',
      stock: 999,
      featured: false,
      rating: 4.6,
      reviews: 3241,
      categoryId: categories[0].id,
    },
    {
      name: 'Dragon Age: Dark Realm',
      slug: 'dragon-age-dark-realm',
      description: 'Dark fantasy RPG with branching narrative, tactical combat, and a vast open world.',
      price: 69.99,
      salePrice: 54.99,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
      stock: 999,
      featured: true,
      rating: 4.7,
      reviews: 7892,
      categoryId: categories[0].id,
    },
    {
      name: 'Neon Racer: Turbo',
      slug: 'neon-racer-turbo',
      description: 'High-octane arcade racing with neon-lit tracks, vehicle customization, and online multiplayer.',
      price: 39.99,
      salePrice: 29.99,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600',
      stock: 999,
      featured: false,
      rating: 4.5,
      reviews: 2103,
      categoryId: categories[1].id,
    },
    {
      name: 'PlayStation 5 Pro Console',
      slug: 'ps5-pro-console',
      description: 'Next-gen console with enhanced GPU, 2TB SSD, 4K 120fps output, and DualSense Pro controller.',
      price: 699.99,
      salePrice: 649.99,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600',
      stock: 45,
      featured: true,
      rating: 4.9,
      reviews: 6234,
      categoryId: categories[2].id,
    },
    {
      name: 'Xbox Series X Bundle',
      slug: 'xbox-series-x-bundle',
      description: 'Xbox Series X with 2 controllers, Game Pass Ultimate 3-month subscription, and 1TB expansion.',
      price: 599.99,
      salePrice: 499.99,
      image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600',
      stock: 30,
      featured: true,
      rating: 4.8,
      reviews: 3456,
      categoryId: categories[2].id,
    },
    {
      name: 'Nintendo Switch OLED',
      slug: 'nintendo-switch-oled',
      description: 'Vibrant 7-inch OLED screen, wide adjustable stand, and enhanced audio for gaming on the go.',
      price: 349.99,
      salePrice: null,
      image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600',
      stock: 80,
      featured: false,
      rating: 4.8,
      reviews: 9876,
      categoryId: categories[2].id,
    },
    {
      name: 'RGB Mechanical Keyboard',
      slug: 'rgb-mechanical-keyboard',
      description: 'Hot-swappable mechanical keyboard with per-key RGB, aluminum frame, and N-key rollover.',
      price: 189.99,
      salePrice: 149.99,
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600',
      stock: 250,
      featured: true,
      rating: 4.7,
      reviews: 4567,
      categoryId: categories[3].id,
    },
    {
      name: 'Pro Gaming Headset 7.1',
      slug: 'pro-gaming-headset',
      description: '7.1 surround sound headset with noise-canceling mic, memory foam cushions, and RGB lighting.',
      price: 299.99,
      salePrice: 229.99,
      image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600',
      stock: 120,
      featured: true,
      rating: 4.8,
      reviews: 5678,
      categoryId: categories[3].id,
    },
    {
      name: 'Ultra Gaming Mouse',
      slug: 'ultra-gaming-mouse',
      description: 'Lightweight wireless mouse with 25K DPI sensor, 70-hour battery, and customizable buttons.',
      price: 129.99,
      salePrice: 99.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600',
      stock: 300,
      featured: false,
      rating: 4.6,
      reviews: 4521,
      categoryId: categories[3].id,
    },
    {
      name: 'Gaming Monitor 27" 4K',
      slug: 'gaming-monitor-27-4k',
      description: '27-inch 4K IPS panel with 144Hz refresh rate, 1ms response, HDR1000, and G-Sync support.',
      price: 799.99,
      salePrice: 649.99,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
      stock: 55,
      featured: false,
      rating: 4.7,
      reviews: 3890,
      categoryId: categories[3].id,
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
