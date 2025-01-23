'use client';

import { usePathname, useRouter } from 'next/navigation';
import { IconCoins, IconFlag3, IconGolf, IconUser } from '@tabler/icons-react';
import { Button, Card, Center, Group, Progress, Stack, Text, Tooltip } from '@mantine/core';
import { ProductDto } from '@/libs/entities/product.entity';
import {
  currencyFormatter,
  decimalFormatter,
  percentFormatter,
} from '@/libs/formatter/number.formatter';
import { useAddCartItem } from '@/services/cart/client';
import { useCampaignStore } from '@/stores/campaign.store';
import { AddCartItemButton } from './Action';

export function ProductCard(props: { product: ProductDto }) {
  const router = useRouter();
  const { mutate } = useAddCartItem();
  const pathname = usePathname();
  const {
    config: { color },
  } = useCampaignStore((state) => state.campaign);

  const { product } = props;
  let progress = 0;

  if (product.currentAmount > 0) {
    progress = product.currentAmount / product.goalAmount;
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ borderColor: 'gray' }}>
      <Group mt="md" mb="xs">
        <Center
          style={{
            borderRadius: '50%',
            border: `1px solid ${color.primary}`,
            width: 35,
            height: 35,
          }}
        >
          <IconFlag3 size={16} color={color.primary} />
        </Center>
        <Stack gap={2}>
          <Text fw={500}>{product.title}</Text>
          <Text size="sm" c="dimmed">
            {product.description.slice(0, 15) + '...'}
          </Text>
        </Stack>
      </Group>

      <Stack gap={1}>
        <Text size="xs" c={color.secondary} ta="right">
          {percentFormatter.format(Math.max(progress, 0))}
        </Text>
        <Progress value={progress * 100} color={color.secondary} />
      </Stack>

      <Stack gap="xs" mt="sm">
        <Group gap="xs">
          <IconGolf size={16} color={color.primary} />
          <Text>目標金額 {currencyFormatter.format(product.goalAmount)} 元</Text>
        </Group>
        <Group gap="xs">
          <IconCoins size={16} color={color.primary} />
          <Text>累積金額 {currencyFormatter.format(product.currentAmount)} 元</Text>
        </Group>
        <Group gap="xs">
          <IconUser size={16} color={color.primary} />
          <Text>贊助人數 {decimalFormatter.format(product.totalContributors)} 人</Text>
        </Group>
      </Stack>

      <Group justify="space-between" align="center" mt="md">
        <Button
          radius="md"
          variant="outline"
          styles={{
            root: {
              color: color.primary,
              borderColor: color.primary,
            },
          }}
          onClick={() => router.push(`${pathname}/${product.id}`)}
        >
          了解更多
        </Button>
        <AddCartItemButton color={color.primary} productId={product.id} />
      </Group>
    </Card>
  );
}
