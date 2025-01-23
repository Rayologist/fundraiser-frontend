'use client';

import { useEffect, useRef } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import { Loader, Stack, Title } from '@mantine/core';
import { PaymentForm } from '@/components/Newebpay/NewebpayForm';
import { useCheckoutStore } from '@/stores/checkout.store';

export default function PaymentPage() {
  const router = useRouter();
  const { newebpayData } = useCheckoutStore(
    useShallow((state) => ({
      newebpayData: state.newebpayData,
    }))
  );

  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.submit();
    }
  }, []);

  if (!newebpayData) {
    return router.push('/checkout/cart');
  }

  return (
    <Stack style={{ height: '30vh' }} justify="center" align="center">
      <Title order={1}>正在前往藍新金流</Title>
      <Loader type="dots" />
      <PaymentForm data={newebpayData} ref={ref} />
    </Stack>
  );
}
