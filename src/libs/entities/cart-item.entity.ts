export interface CartItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  price: number;
  productId: string;
  userId: string;
}
