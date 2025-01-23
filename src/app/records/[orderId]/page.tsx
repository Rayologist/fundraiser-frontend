'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { IconRepeat } from '@tabler/icons-react';
import { Button, Center, Divider, Group, Loader, rem, Stack, Text, Title } from '@mantine/core';
import { DonorInfo } from '@/components/DonorInfo/DonorInfo';
import { PaymentForm } from '@/components/Newebpay/NewebpayForm';
import { PaymentStatus } from '@/components/PaymentStatus/PaymentStatus';
import { createColumns, Table } from '@/components/Table/Table';
import { PaymentStatus as Status } from '@/libs/entities/payment.entity';
import { currencyFormatter } from '@/libs/formatter/number.formatter';
import { checkoutById } from '@/services/payment/client';
import { NewebpayData } from '@/services/payment/types';
import { useRecordDetails } from '@/services/record/client';
import { OrderDetailsView } from '@/services/record/types';

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const ref = useRef<HTMLFormElement>(null);
  const [newebpayData, setNewebpayData] = useState<NewebpayData | null>(null);
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useRecordDetails({ id: orderId });

  if (!data || isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  const [details, error] = data;

  if (!details || error) {
    return <Center>error...</Center>;
  }

  const isPaid = details.payments.some((payment) => payment.status === Status.PAID);
  details.payments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Stack gap="xl">
      <Stack gap="xl">
        <Stack gap="sm">
          <Group justify="space-between" align="flex-end">
            <Title order={1} c="blue.9">
              付款資料
            </Title>
            {!isPaid && (
              <Button
                variant="light"
                color="violet"
                loading={loading}
                leftSection={<IconRepeat style={{ width: rem(16), height: rem(16) }} />}
                onClick={async () => {
                  setLoading(true);
                  const [data, error] = await checkoutById({ orderId: details.id });

                  if (!data || error) {
                    return;
                  }
                  setNewebpayData(data);
                  setTimeout(() => ref.current?.submit(), 1000);
                }}
              >
                重新付款
              </Button>
            )}
          </Group>
          <Text size="md" c="dimmed">
            除信用卡外，其他繳費方式需等待 3 至 5 個工作天入帳。
          </Text>
        </Stack>
        <Table columns={columns} data={details.payments} />
      </Stack>
      <Divider />
      <Stack>
        <Title order={1} c="blue.9">
          捐款明細
        </Title>
        <Title order={3}>總計 {currencyFormatter.format(details.amount)}</Title>
        <Stack gap={3}>
          {details.orderItems.map((item) => (
            <Group key={item.id} justify="space-between">
              <Text
                component="div"
                size="md"
              >{`${item.product.title} (${item.product.campaign.title})`}</Text>
              <Text component="div" size="md" w={100}>
                {currencyFormatter.format(item.price)}
              </Text>
            </Group>
          ))}
        </Stack>
      </Stack>
      <Divider />
      <DonorInfo donorInfo={details.donorInfo} />
      <PaymentForm ref={ref} data={newebpayData} />
    </Stack>
  );
}

const columns = createColumns<OrderDetailsView['payments'][0]>([
  {
    key: 'id',
    header: '捐款編號',
  },
  {
    key: 'transactionId',
    header: '交易序號',
  },
  {
    key: 'transactedAt',
    header: '交易時間',
    cell: ({ data }) => {
      if (!data.transactedAt) return '無';
      return <>{new Date(data.transactedAt).toLocaleString('sv')}</>;
    },
  },
  {
    key: 'method',
    header: '捐款方式',
    width: 500,
  },
  {
    key: 'status',
    header: '捐款狀態',
    cell: ({ data }) => <PaymentStatus status={data.status} />,
  },
]);
