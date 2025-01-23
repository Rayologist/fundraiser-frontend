import { Campaign } from '@/libs/entities/campaign.entity';
import { CartItem } from '@/libs/entities/cart-item.entity';
import { Product } from '@/libs/entities/product.entity';

export type CartItemView = Pick<CartItem, 'id' | 'price' | 'quantity'> & {
  product: ProductView;
};

type ProductView = Pick<Product, 'id' | 'title'> & { campaign: CampaignView };

type CampaignView = Pick<Campaign, 'id' | 'title'>;

export type CartDto = {
  cartItems: CartItemView[];
  amount: number;
};

export type UpdateCartItemDto = {
  cartItemId: string;
  price?: number;
  quantity?: number;
};
