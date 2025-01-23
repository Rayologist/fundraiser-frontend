import { cookies, headers as nextHeaders } from 'next/headers';
import urlJoin from 'url-join';
import env from '@/environments';

export async function getSession() {
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

    const response = await fetch(urlJoin(env.internalUrl, 'v1', 'session'), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      return [null, new Error('Failed to get session')] as const;
    }

    const data = await response.json();
    return [data, null] as const;
  } catch (error) {
    return [null, error as Error] as const;
  }
}
