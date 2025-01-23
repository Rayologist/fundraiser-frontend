'use client';

import { usePathname, useRouter } from 'next/navigation';
import { IconCheck } from '@tabler/icons-react';
import { MantineSize, rem, Stack, Stepper, useMatches } from '@mantine/core';
import { CheckoutStoreProvider } from '@/stores/checkout.store';

export default function CheckoutLayout(props: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();

  const steps: Record<string, number> = {
    cart: 0,
    'donor-info': 1,
    review: 2,
    payment: 3,
  };

  const lastPath = path.split('/').pop();

  if (lastPath === undefined || steps[lastPath] === undefined) {
    router.push('/checkout/cart');
    return null;
  }

  const size = useMatches<MantineSize>({
    base: 'sm',
    md: 'md',
  });

  return (
    <Stack mt={25} gap={70}>
      <Stepper
        size={size}
        active={steps[lastPath]}
        completedIcon={<IconCheck style={{ width: rem(18), height: rem(18) }} />}
      >
        <Stepper.Step icon={1} label="捐贈清單" />
        <Stepper.Step icon={2} label="填寫捐款資料" />
        <Stepper.Step icon={3} label="確認捐款資料" />
        <Stepper.Step icon={4} label="捐款" />
      </Stepper>

      <CheckoutStoreProvider
        values={{
          donorInfo: null,
          cartDto: null,
          newebpayData: null,
        }}
      >
        {props.children}
      </CheckoutStoreProvider>
    </Stack>
  );
}
