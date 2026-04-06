import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { generateOrderNo } from '@/lib/utils';

export async function GET(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where = status ? { status } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          customer: { select: { name: true, email: true } },
          items: { include: { product: { select: { name: true, image: true } } } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerId, items, address, note } = body;

    if (!customerId || !items?.length || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
    });

    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.salePrice || product.price,
      };
    });

    const subtotal = orderItems.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);
    const shipping = subtotal > 99 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const order = await prisma.order.create({
      data: {
        orderNo: generateOrderNo(),
        customerId,
        address,
        note,
        subtotal,
        shipping,
        tax,
        total,
        items: { create: orderItems },
      },
      include: {
        items: { include: { product: true } },
        customer: true,
      },
    });

    // Decrement stock
    await Promise.all(
      orderItems.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      )
    );

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Order POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
