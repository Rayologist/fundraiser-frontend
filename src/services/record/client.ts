'use client';

import { useQuery } from '@tanstack/react-query';
import urlJoin from 'url-join';
import env from '@/environments';
import { request } from '@/libs/request';
import { OrderDetailsView, OrderRecordView } from './types';

export function getRecord() {
  const url = urlJoin(env.serverUrl, 'v1', 'records');
  return request<{}, OrderRecordView[]>({
    url,
    method: 'GET',
  });
}

export function getRecordDetails(args: { id: string }) {
  const url = urlJoin(env.serverUrl, 'v1', 'records', args.id);
  return request<{}, OrderDetailsView>({
    url,
    method: 'GET',
  });
}

export function useRecord() {
  return useQuery({ queryKey: ['records'], queryFn: () => getRecord() });
}

export function useRecordDetails(args: { id: string }) {
  return useQuery({ queryKey: ['records', args.id], queryFn: () => getRecordDetails(args) });
}
