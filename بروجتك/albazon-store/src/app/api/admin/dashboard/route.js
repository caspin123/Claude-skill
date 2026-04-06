import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalOrders,
      monthOrders,
      lastMonthOrders,
      totalProducts,
      totalCustomers,
      revenueAgg,
      monthRevenueAgg,
      recentOrders,
      lowStockProducts,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.order.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } } }),
      prisma.product.count({ where: { active: true } }),
      prisma.customer.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.aggregate({ _sum: { total: true }, where: { createdAt: { gte: startOfMonth } } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { customer: { select: { name: true, email: true } } },
      }),
      prisma.product.findMany({
        where: { stock: { lte: 20 }, active: true },
        orderBy: { stock: 'asc' },
        take: 5,
        select: { id: true, name: true, stock: true, image: true },
      }),
    ]);

    const orderGrowth = lastMonthOrders > 0
      ? ((monthOrders - lastMonthOrders) / lastMonthOrders) * 100
      : 100;

    return NextResponse.json({
      stats: {
        totalOrders,
        monthOrders,
        orderGrowth: orderGrowth.toFixed(1),
        totalProducts,
        totalCustomers,
        totalRevenue: Number(revenueAgg._sum.total || 0),
        monthRevenue: Number(monthRevenueAgg._sum.total || 0),
      },
      recentOrders,
      lowStockProducts,
    });
  } catch (error) {
    console.error('Dashboard GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
