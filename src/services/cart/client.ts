import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import urlJoin from 'url-join';
import env from '@/environments';
import { request } from '@/libs/request';
import { CartDto, UpdateCartItemDto } from './types';

export function getCart() {
  const url = urlJoin(env.serverUrl, 'v1', 'cart');
  return request<{}, CartDto>({
    url,
    method: 'GET',
  });
}

export function addCartItem(productId: string) {
  const url = urlJoin(env.serverUrl, 'v1', 'cart', 'items');
  return request({
    url,
    method: 'POST',
    payload: { productId },
  });
}

export function updateCartItem(args: UpdateCartItemDto) {
  const url = urlJoin(env.serverUrl, 'v1', 'cart', 'items', args.cartItemId);
  return request({
    url,
    method: 'PATCH',
    payload: {
      price: args.price,
    },
  });
}

export function removeCartItem(cartItemId: string) {
  const url = urlJoin(env.serverUrl, 'v1', 'cart', 'items', cartItemId);
  return request({
    url,
    method: 'DELETE',
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addCartItem'],
    mutationFn: (productId: string) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateCartItem'],
    mutationFn: (args: UpdateCartItemDto) => updateCartItem(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['removeCartItem'],
    mutationFn: (cartItemId: string) => removeCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['clearCart'],
    mutationFn: () => {
      const url = urlJoin(env.serverUrl, 'v1', 'cart');
      return request({
        url,
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });
}
