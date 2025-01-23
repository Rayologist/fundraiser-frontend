import { useMutation, useQueryClient } from '@tanstack/react-query';
import urlJoin from 'url-join';
import env from '@/environments';
import { DonorInfo } from '@/libs/entities/donor-info.entity';
import { request } from '@/libs/request';
import { NewebpayData } from './types';

type CheckoutArgs = {
  cartItemIds: string[];
  donorInfo: DonorInfo;
};

type CheckoutByIdArgs = {
  orderId: string;
};

export function checkoutById(args: CheckoutByIdArgs) {
  const url = urlJoin(env.serverUrl, 'v1', 'payment', 'checkout', args.orderId);
  return request<{}, NewebpayData>({
    url,
    method: 'GET',
  });
}

export function checkout(args: CheckoutArgs) {
  const url = urlJoin(env.serverUrl, 'v1', 'payment', 'checkout');
  return request<CheckoutArgs, NewebpayData>({
    url,
    method: 'POST',
    payload: args,
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['checkout'],
    mutationFn: (args: CheckoutArgs) => checkout(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
