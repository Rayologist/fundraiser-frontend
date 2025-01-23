'use client';

import { useQuery } from '@tanstack/react-query';
import urlJoin from 'url-join';
import env from '@/environments';
import { request } from '@/libs/request';
import { User } from '@/stores/user.store';

export function getAuthUrl() {
  return request<{}, { success: boolean; url: string }>({
    url: urlJoin(env.serverUrl, 'v1', 'auth', 'url'),
    method: 'GET',
  });
}

export function getSession() {
  return request<{}, User>({
    url: urlJoin(env.serverUrl, 'v1', 'session'),
    method: 'GET',
  });
}

export function useSession(args?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['session'],
    queryFn: () => getSession(),
    enabled: args?.enabled,
  });
}

export function deleteSession() {
  return request<{}, { success: boolean }>({
    url: urlJoin(env.serverUrl, 'v1', 'session'),
    method: 'DELETE',
  });
}
