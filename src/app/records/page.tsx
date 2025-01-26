'use client';

import { useRouter } from 'next/navigation';
import { Button, Center, Loader, Stack, Title, useMatches } from '@mantine/core';
import { PaymentStatus } from '@/components/PaymentStatus/PaymentStatus';
import { createColumns, Table } from '@/components/Table/Table';
import { currencyFormatter } from '@/libs/formatter/number.formatter';
import { useRecord } from '@/services/record/client';
import { OrderRecordView } from '@/services/record/types';

const columns = createColumns<OrderRecordView>([
  {
    key: 'id',
    header: '捐款編號',
  },
  {
    header: '捐款日期',
    cell: ({ data }) => <>{new Date(data.createdAt).toLocaleString('sv')}</>,
  },
  {
    header: '捐款金額',
    cell: ({ data }) => currencyFormatter.format(data.amount),
  },

  {
    header: '捐款狀態',
    cell: ({ data }) => <PaymentStatus status={data.status} />,
  },
  {
    header: '',
    cell: ({ data }) => {
      const router = useRouter();
      return (
        <Button onClick={() => router.push(`/records/${data.id}`)} variant="default">
          查看
        </Button>
      );
    },
  },
]);

export default function RecordPage() {
  const { data, isLoading } = useRecord();
  const w = useMatches({
    sm: '100%',
    md: '30%',
  });
  const router = useRouter();

  if (isLoading || !data) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  const [record, error] = data;

  if (error || !record) {
    return <Center>錯誤</Center>;
  }

  record.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <Stack gap="xl">
      <Title order={1} c="blue.9">
        捐款紀錄
      </Title>
      <Table columns={columns} data={record} maxHeight={600} />
      <Center>
        <Button w={w} variant="outline" fullWidth onClick={() => router.push('/')}>
          返回首頁
        </Button>
      </Center>
    </Stack>
  );
}
