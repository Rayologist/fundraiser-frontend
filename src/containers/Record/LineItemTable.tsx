import { createColumns, Table } from '@/components/Table/Table';
import { currencyFormatter } from '@/libs/formatter/number.formatter';
import { OrderDetailsView } from '@/services/record/types';

const columns = createColumns<OrderDetailsView['orderItems'][0]>([
  {
    header: '專案名稱',
    width: 300,
    cell({ data }) {
      return data.product.campaign.title;
    },
  },
  {
    header: '細項',
    cell: ({ data }) => {
      return data.product.title;
    },
    width: 300,
  },
  {
    header: '金額',
    width: 300,
    cell: ({ data }) => {
      return currencyFormatter.format(data.price);
    },
  },
]);

export function LineItemTable(props: { data: OrderDetailsView['orderItems'] }) {
  return <Table columns={columns} data={props.data} cellHeight={50} />;
}
