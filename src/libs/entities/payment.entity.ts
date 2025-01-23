export const enum PaymentStatus {
  PENDING = 0,
  PAID = 1,
  FAILED = 2,
}

export interface Payment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  orderId: string;
  transactionId: string | null;
  status: PaymentStatus;
  paymentMethod: string | null;
  transactedAt: Date | null;
  providerResponse: Record<string, any> | null;
}
