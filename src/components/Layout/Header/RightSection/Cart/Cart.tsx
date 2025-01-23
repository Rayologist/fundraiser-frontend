'use client';

import { useRouter } from 'next/navigation';
import { IconClipboardHeart, IconHeart } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Indicator,
  Loader,
  Popover,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { currencyFormatter } from '@/libs/formatter/number.formatter';
import { useCart, useClearCart } from '@/services/cart/client';
import { CartDto } from '@/services/cart/types';
import { useUserStore } from '@/stores/user.store';

export function Cart() {
  const { data, isLoading } = useCart();
  const user = useUserStore((state) => state.user);
  const [opened, { close, toggle }] = useDisclosure();

  if (!user) {
    return null;
  }

  if (!data || isLoading) {
    return <Loader color="gray" size="sm" />;
  }

  const [cart] = data;

  return (
    <Popover width={300} radius="md" opened={opened} onChange={toggle}>
      <Popover.Target>
        <Box>
          <CartCount count={cart?.cartItems.length}>
            <Center>
              <ActionIcon variant="transparent" c="black" onClick={toggle}>
                <IconClipboardHeart stroke={1.5} />
              </ActionIcon>
            </Center>
          </CartCount>
        </Box>
      </Popover.Target>

      <Popover.Dropdown pb={25}>
        <Stack>
          <Group gap="md">
            <Text size="lg">捐贈清單</Text>
          </Group>
          <CartItemList cart={cart} onButtonClick={close} />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

function CartCount(props: { children: React.ReactNode; count: number | undefined }) {
  if (props.count === 0 || props.count === undefined) {
    return <>{props.children}</>;
  }

  return (
    <Indicator inline label={props.count} mt={5} size={16}>
      {props.children}
    </Indicator>
  );
}

function CartItemList(props: { cart: CartDto | null; onButtonClick: () => void }) {
  const router = useRouter();
  const { cart } = props;
  const { mutate: clearCart, isPending } = useClearCart();

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <Stack align="center" gap={1}>
        <IconHeart size={25} stroke={1.5} />
        <Text size="sm" ta="center">
          清單為空
        </Text>
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack gap={3}>
        {cart?.cartItems.map((item) => (
          <Group key={item.id} justify="space-between">
            <Text size="sm">{item.product.title}</Text>
            <Text size="sm">{currencyFormatter.format(item.price)}</Text>
          </Group>
        ))}
      </Stack>

      <Stack gap="xs">
        <Button
          radius="md"
          onClick={() => {
            router.push('/checkout/cart');
            props.onButtonClick();
          }}
        >
          前往捐款
        </Button>
        <Button
          radius="md"
          variant="outline"
          onClick={() => {
            if (cart?.cartItems?.length && cart.cartItems.length > 0) {
              clearCart();
            }
          }}
          loading={isPending}
        >
          清空
        </Button>
      </Stack>
    </Stack>
  );
}
