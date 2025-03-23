import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '@prisma/client';
import { OrdersRepository } from './orders.repository';
import { FindOrdersDto } from './dto/find-orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly repo: OrdersRepository) {}

  async create(dto: CreateOrderDto, userId: string) {
    const productIds = Object.keys(dto.products);
    const products = await this.repo.findProductsByIds(productIds);

    if (products.length !== productIds.length) {
      throw new NotFoundException('Some products were not found.');
    }

    let total = 0;

    for (const product of products) {
      const requestedQty = dto.products[product.id];

      if (product.stockQuantity < requestedQty) {
        throw new BadRequestException(
          `Product ${product.name} does not have enough stock.`,
        );
      }

      total += requestedQty * product.price;
    }

    if (dto.status === OrderStatus.COMPLETED) {
      for (const product of products) {
        const newQty = product.stockQuantity - dto.products[product.id];
        await this.repo.updateProductStock(product.id, newQty);
      }
    }

    return this.repo.createOrder({
      total,
      status: dto.status,
      userId,
      products: productIds.map((productId) => ({
        productId,
        quantity: dto.products[productId],
      })),
    });
  }

  async markAsCompleted(id: string) {
    const order = await this.repo.findOrderById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === OrderStatus.COMPLETED) {
      return { message: 'Order is already completed' };
    }

    for (const item of order.products) {
      await this.repo.updateStock(item.productId, -item.quantity);
    }

    return this.repo.updateStatus(id, OrderStatus.COMPLETED);
  }

  async findAll(params: FindOrdersDto) {
    return this.repo.findAllOrders(params);
  }


  async delete(id: string) {
    const order = await this.repo.findOrderById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.repo.delete(id);
  }

  async findOne(id: string) {
    const order = await this.repo.findOrderById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
