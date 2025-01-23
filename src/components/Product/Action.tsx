'use client';

import { IconClipboardHeart } from '@tabler/icons-react';
import { Button, Group } from '@mantine/core';
import { useAddCartItem } from '@/services/cart/client';
import { useUserStore } from '@/stores/user.store';
import { getAuthUrl } from '@/services/session/client';
import { useRouter } from 'next/navigation';

export function AddCartItemButton(props: { color: string; productId: string }) {
  const { mutate } = useAddCartItem();
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  return (
    <Group>
      <Button
        variant="contained"
        leftSection={<IconClipboardHeart size={16} stroke={1.5} />}
        styles={{
          root: {
            backgroundColor: props.color,
          },
        }}
        onClick={async () => {
          if (!user) {
            const [data, error] = await getAuthUrl();
            if (!data || error) {
              return;
            }
            router.push(data.url);
            return;
          }
          mutate(props.productId);
        }}
      >
        加入捐助清單
      </Button>
    </Group>
  );
}
