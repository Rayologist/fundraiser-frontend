import { DonorInfo } from '@/libs/entities/donor-info.entity';
import { PaymentStatus } from '@/libs/entities/payment.entity';

export type OrderRecordView = {
  id: string;
  createdAt: Date;
  status: PaymentStatus;
  amount: number;
};

export type OrderDetailsView = {
  id: string;
  createdAt: Date;
  amount: number;
  payments: {
    id: string;
    transactionId: string | null;
    transactedAt: Date | null;
    status: PaymentStatus;
    method: string | null;
    createdAt: Date;
  }[];
  donorInfo: DonorInfo;
  orderItems: {
    id: string;
    price: number;
    product: {
      title: string;
      campaign: {
        title: string;
      };
    };
  }[];
};
