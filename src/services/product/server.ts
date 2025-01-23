import { cookies, headers as nextHeaders } from 'next/headers';
import urlJoin from 'url-join';
import env from '@/environments';
import { ProductDto } from '@/libs/entities/product.entity';

export async function getProducts(args: { campaignId: string }) {
  try {
    const h = await nextHeaders();
    const c = await cookies();
    const headers = new Headers();

    const userAgent = h.get('User-Agent');

    if (userAgent) {
      headers.append('User-Agent', userAgent);
    }

    if (c) {
      headers.append('Cookie', c.toString());
    }

    const response = await fetch(
      urlJoin(env.internalUrl, 'v1', `products?campaignId=${args.campaignId}`),
      {
        method: 'GET',
        headers,
        next: {
          revalidate: process.env.NODE_ENV === 'production' ? 60 : undefined,
        },
      }
    );

    if (!response.ok) {
      return [null, new Error('Failed to get products')] as const;
    }

    const data: ProductDto[] = await response.json();
    return [data, null] as const;
  } catch (error) {
    return [null, error as Error] as const;
  }
}

export async function getOneProduct(args: { id: string }) {
  try {
    const h = await nextHeaders();
    const c = await cookies();
    const headers = new Headers();

    const userAgent = h.get('User-Agent');

    if (userAgent) {
      headers.append('User-Agent', userAgent);
    }

    if (c) {
      headers.append('Cookie', c.toString());
    }

    const response = await fetch(urlJoin(env.internalUrl, 'v1', 'products', args.id), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      return [null, new Error('Failed to get products')] as const;
    }

    const data: ProductDto = await response.json();
    return [data, null] as const;
  } catch (error) {
    return [null, error as Error] as const;
  }
}
