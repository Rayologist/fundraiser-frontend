import { cookies, headers as nextHeaders } from 'next/headers';
import urlJoin from 'url-join';
import env from '@/environments';
import { CampaignDto } from '@/libs/entities/campaign.entity';

export async function getCampaigns() {
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

    const response = await fetch(urlJoin(env.internalUrl, 'v1', 'campaigns'), {
      method: 'GET',
      headers,
      next: {
        revalidate: process.env.NODE_ENV === 'production' ? 60 : undefined,
      },
    });

    if (!response.ok) {
      return [null, new Error('Failed to get campaigns')] as const;
    }

    const data: CampaignDto[] = await response.json();
    return [data, null] as const;
  } catch (error) {
    return [null, error as Error] as const;
  }
}

export async function getOneCampaign(args: { id: string }) {
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

    const response = await fetch(urlJoin(env.internalUrl, 'v1', 'campaigns', args.id), {
      method: 'GET',
      headers,
      next: {
        revalidate: process.env.NODE_ENV === 'production' ? 60 : undefined,
      },
    });

    if (!response.ok) {
      return [null, new Error('Failed to get campaigns')] as const;
    }

    const data: CampaignDto = await response.json();
    return [data, null] as const;
  } catch (error) {
    return [null, error as Error] as const;
  }
}
