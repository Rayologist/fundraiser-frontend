'use client';

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import {
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  useMatches,
} from '@mantine/core';
import { DonorInfo } from '@/components/DonorInfo/DonorInfo';
import { createColumns, Table } from '@/components/Table/Table';
import { currencyFormatter } from '@/libs/formatter/number.formatter';
import { useCheckout } from '@/services/payment/client';
import { useCheckoutStore } from '@/stores/checkout.store';

export default function ReviewPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const { mutateAsync: checkout, isPending } = useCheckout();
  const { cartDto, donorInfo, setNewebpayData } = useCheckoutStore(
    useShallow((state) => ({
      cartDto: state.cartDto,
      donorInfo: state.donorInfo,
      setNewebpayData: state.setNewebpayData,
      setDonorInfo: state.setDonorInfo,
    }))
  );

  if (!cartDto || !donorInfo) {
    return router.push('/checkout/cart');
  }

  const w = useMatches({
    sm: '100%',
    md: '35%',
  });

  return (
    <Stack>
      <Stack>
        <Title order={1} c="blue.9">
          捐款金額
        </Title>
        <Title order={2}>總金額 {currencyFormatter.format(cartDto.amount)}</Title>
        <Table
          columns={columns}
          data={cartDto.cartItems.map((c) => ({
            title: `${c.product.title} (${c.product.campaign.title})`,
            price: c.price,
          }))}
          maxHeight='100vh'
        />
      </Stack>
      <Divider my="lg" />

      <DonorInfo donorInfo={donorInfo} />
      <Stack gap="md">
        <Center>
          <Checkbox
            label="我已確認以上填寫的資料無誤（資料送出後即無法修改）"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        </Center>
        <Group justify="center">
          <Button
            variant="outline"
            onClick={() => {
              //   setDonorInfo(null);
              router.push('/checkout/donor-info');
            }}
            w={100}
          >
            返回
          </Button>
          <Button
            w={100}
            disabled={!checked}
            loading={isPending}
            onClick={async () => {
              const cartItemIds = cartDto.cartItems.map((item) => item.id);
              const [data, error] = await checkout({ cartItemIds, donorInfo });

              if (error) {
                router.push('/checkout/cart');
                return;
              }

              setNewebpayData(data);

              router.push('/checkout/payment');
            }}
          >
            下一步
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
}

const columns = createColumns<{ title: string; price: number }>([
  {
    header: '項目名稱',
    cell({ data }) {
      return <Text>{data.title}</Text>;
    },
  },
  {
    header: '捐款金額',
    cell({ data }) {
      return <Text>{currencyFormatter.format(data.price)}</Text>;
    },
  },
]);
