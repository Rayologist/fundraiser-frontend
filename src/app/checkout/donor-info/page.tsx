'use client';

import { useId } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import { Button, Group, Stack, Title } from '@mantine/core';
import { CreateDonorInfoForm } from '@/containers/DonorInfo/Form';
import { useCheckoutStore } from '@/stores/checkout.store';

export default function DonorInfoPage() {
  const { cartDto, setCartDto } = useCheckoutStore(
    useShallow((state) => ({ cartDto: state.cartDto, setCartDto: state.setCartDto }))
  );

  const router = useRouter();
  const id = useId();

  if (!cartDto) {
    return router.push('/checkout/cart');
  }

  return (
    <Stack>
      <Title order={2} c="blue.9">
        填寫捐款資料
      </Title>
      <CreateDonorInfoForm id={id} />
      <Group justify="center" mt="xl">
        <Button
          variant="outline"
          onClick={() => {
            // setCartDto(null);
            router.push('/checkout/cart');
          }}
          w={100}
        >
          返回
        </Button>
        <Button type="submit" form={id} w={100}>
          下一步
        </Button>
      </Group>
    </Stack>
  );
}
