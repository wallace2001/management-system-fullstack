export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELED';

export interface Order {
  id: string;
  total: number;
  status: OrderStatus;
  userId: string;
  createdAt: string;
  products: {
    productId: string;
    quantity: number;
    product: {
      name: string;
      price: number;
    };
  }[];
}
