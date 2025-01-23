import { useQuery } from '@tanstack/react-query';
import urlJoin from 'url-join';
import env from '@/environments';
import { Campaign } from '@/libs/entities/campaign.entity';
import { Product } from '@/libs/entities/product.entity';
import { request } from '@/libs/request';

export type RecommendedProduct = Pick<
  Product,
  'title' | 'description' | 'id' | 'currentAmount' | 'goalAmount'
> & {
  campaign: Pick<Campaign, 'title' | 'id'>;
};

export function getRecommendedProduct() {
  const url = urlJoin(env.serverUrl, 'v1', 'products', 'recommended');
  return request<{}, RecommendedProduct[]>({
    url,
    method: 'GET',
  });
}

export function useRecommendedProduct() {
  return useQuery({
    queryKey: ['recommendedProducts'],
    queryFn: () => getRecommendedProduct(),
  });
}
