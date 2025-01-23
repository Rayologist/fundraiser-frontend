import { Currency } from './shared';

export interface OrderItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  price: number;
  currency: Currency;
  productId: string;
  orderId: string;
}

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
