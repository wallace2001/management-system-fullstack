// src/orders/orders.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus, Product } from '@prisma/client';
import { FindOrdersDto } from './dto/find-orders.dto';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProductsByIds(ids: string[]) {
    return this.prisma.product.findMany({
      where: { id: { in: ids } },
    });
  }

  async updateProductStock(productId: string, newQty: number) {
    return this.prisma.product.update({
      where: { id: productId },
      data: { stockQuantity: newQty },
    });
  }

  async createOrder(data: {
    total: number;
    status: OrderStatus;
    userId: string;
    products: { productId: string; quantity: number }[];
  }) {
    return this.prisma.order.create({
      data: {
        total: data.total,
        status: data.status,
        userId: data.userId,
        products: {
          create: data.products,
        },
      },
      include: {
        products: {
          include: { product: true },
        },
      },
    });
  }

  async findAllOrders({ page = 1, limit = 10, status }: FindOrdersDto) {
    const skip = (page - 1) * limit;

    const where = status ? { status } : undefined;

    const [totalItems, data] = await Promise.all([
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        skip,
        take: limit,
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          products: { include: { product: true } },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
      perPage: limit,
    };
  }

  async findOrderById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        products: { include: { product: true } },
      },
    });
  }

  async delete(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!order) return null;

    if (order.status === OrderStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed order');
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELED },
    });
  }

  async updateStock(
    productId: string,
    quantityChange: number,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id: productId },
      data: { stockQuantity: { increment: quantityChange } },
    });
  }

  updateStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
