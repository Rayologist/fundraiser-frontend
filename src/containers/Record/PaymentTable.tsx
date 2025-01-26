import { PaymentStatus } from '@/components/PaymentStatus/PaymentStatus';
import { createColumns, Table } from '@/components/Table/Table';
import { OrderDetailsView } from '@/services/record/types';

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

export function PaymentTable(props: { data: OrderDetailsView['payments'] }) {
  return <Table columns={columns} data={props.data} />;
}
