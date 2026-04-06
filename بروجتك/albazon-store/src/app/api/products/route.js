import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const where = { active: true };
    if (category) where.category = { slug: category };
    if (featured === 'true') where.featured = true;
    if (search) where.name = { contains: search };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: { select: { name: true, slug: true } } },
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, salePrice, image, stock, categoryId, featured, active } = body;

    if (!name || !description || !price || !image || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        salePrice: salePrice || null,
        image,
        stock: stock || 0,
        categoryId,
        featured: featured || false,
        active: active !== false,
      },
      include: { category: true },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Product POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
