import { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { usePrevious } from '@mantine/hooks';
import { PriceSelector } from '@/components/Cart/Cart';
import { createColumns, Table } from '@/components/Table/Table';
import { useRemoveCartItem, useUpdateCartItem } from '@/services/cart/client';
import { CartDto, CartItemView } from '@/services/cart/types';

export function CartTable(props: { cart: CartDto }) {
  return <Table columns={columns} data={props.cart.cartItems} />;
}

const columns = createColumns<CartItemView>([
  {
    key: 'product',
    header: '項目名稱',
    cell: ({ data }) => `${data.product.title} (${data.product.campaign.title})`,
    width: 200,
  },
  {
    key: 'price',
    header: '捐款金額（請點選金額或自訂金額）',
    cell: ({ data }) => {
      const [price, setPrice] = useState(data.price);
      const { mutateAsync: updateCartItem } = useUpdateCartItem();
      const previousPrice = usePrevious(price);

      return (
        <PriceSelector
          value={data.price}
          onChange={async (value) => {
            if (value === previousPrice) {
              return;
            }
            await updateCartItem({ cartItemId: data.id, price: value });
            setPrice(value);
          }}
        />
      );
    },
    width: 300,
  },
  {
    header: '',
    cell: ({ data }) => {
      const { mutateAsync: removeCartItem } = useRemoveCartItem();
      return (
        <ActionIcon
          variant="subtle"
          color="red"
          radius="xl"
          onClick={() => removeCartItem(data.id)}
        >
          <IconX stroke={1.5} size={16} />
        </ActionIcon>
      );
    },
    width: 50,
    align: 'left',
  },
]);
