'use client';

import { RefObject, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  IconChevronLeft,
  IconChevronRight,
  IconClipboardHeart,
  IconExternalLink,
} from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Progress,
  rem,
  ScrollAreaAutosize,
  Skeleton,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { CartTable } from '@/containers/Cart/Cart';
import { currencyFormatter, percentFormatter } from '@/libs/formatter/number.formatter';
import { useAddCartItem, useCart } from '@/services/cart/client';
import {
  RecommendedProduct as RecommendedProductType,
  useRecommendedProduct,
} from '@/services/product/client';
import { getAuthUrl } from '@/services/session/client';
import { useCheckoutStore } from '@/stores/checkout.store';
import { useUserStore } from '@/stores/user.store';

export default function CartPage() {
  const { data, isLoading } = useCart();
  const { setCartDto } = useCheckoutStore(
    useShallow((state) => ({ setCartDto: state.setCartDto }))
  );
  const router = useRouter();

  if (!data || isLoading) {
    return (
      <Stack>
        <Title order={2} c="blue.9">
          捐款清單
        </Title>
        <Stack mt={20} gap="md">
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
        </Stack>
      </Stack>
    );
  }

  const [cartData] = data;

  if (cartData === null) {
    return (
      <Stack>
        <Title order={2}>捐款清單</Title>
        <Text>您的捐款清單是空的</Text>
      </Stack>
    );
  }

  cartData.cartItems.sort((a, b) => {
    if (a.product.title === '不指定用途') {
      return -1;
    }
    if (b.product.title === '不指定用途') {
      return 1;
    }
    return 0;
  });

  return (
    <Stack>
      <Title order={2} c="blue.9">
        捐款清單
      </Title>
      <Stack mb={10}>
        <CartTable cart={cartData} />
      </Stack>
      <Group>
        <Title order={2}>總計 {currencyFormatter.format(cartData.amount)}</Title>
      </Group>

      <RecommendationSection
        productsToFilter={new Set(cartData.cartItems.map((c) => c.product.id))}
      />

      <Group justify="center" mt="xl">
        <Button
          onClick={() => {
            setCartDto(cartData);
            router.push('/checkout/donor-info');
          }}
          w={100}
        >
          下一步
        </Button>
      </Group>
    </Stack>
  );
}

function RecommendationSection(props: { productsToFilter: Set<string> }) {
  const viewport = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useRecommendedProduct();

  if (!data || isLoading) {
    return <Skeleton height={80} />;
  }

  const [products, error] = data;

  if (error) {
    return <Text>Error</Text>;
  }

  const filteredProducts = products.filter((p) => !props.productsToFilter.has(p.id));

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <Stack mt={20}>
      <Group justify="space-between">
        <Title order={2} c="blue.9">
          推薦專案
        </Title>
        <Group>
          <ActionIcon
            variant="light"
            radius="xl"
            size="sm"
            onClick={() => viewport.current?.scrollBy({ left: -300, behavior: 'smooth' })}
          >
            <IconChevronLeft
              style={{
                width: rem(16),
                height: rem(16),
              }}
            />
          </ActionIcon>
          <ActionIcon
            variant="light"
            radius="xl"
            size="sm"
            onClick={() => viewport.current?.scrollBy({ left: 300, behavior: 'smooth' })}
          >
            <IconChevronRight
              style={{
                width: rem(16),
                height: rem(16),
              }}
            />
          </ActionIcon>
        </Group>
      </Group>
      <RecommendedProduct viewport={viewport} products={filteredProducts} />
    </Stack>
  );
}

function RecommendedProduct(props: {
  products: RecommendedProductType[];
  viewport: RefObject<HTMLDivElement>;
}) {
  const { products, viewport } = props;
  const { mutate } = useAddCartItem();
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const w = rem(300 * (products.length + 1));

  return (
    <ScrollAreaAutosize mah={120} scrollbars="x" offsetScrollbars scrollbarSize={8} ref={viewport}>
      <Group w={w} gap="md">
        {products.map((product) => {
          let progress = 0;

          if (product.currentAmount > 0) {
            progress = product.currentAmount / product.goalAmount;
          }

          return (
            <Box
              key={product.id}
              bd="2px solid gray.6"
              style={{
                borderRadius: 5,
              }}
              p="sm"
              miw={280}
            >
              <Stack gap={2}>
                <Group justify="space-between">
                  <Title order={4}>{product.title}</Title>
                  <Group gap="xs">
                    <Tooltip label="前往專案細項">
                      <ActionIcon
                        variant="subtle"
                        onClick={() =>
                          router.push(`/campaigns/${product.campaign.id}/${product.id}`)
                        }
                      >
                        <IconExternalLink stroke={1.5} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="加入捐款清單">
                      <ActionIcon
                        variant="subtle"
                        onClick={async () => {
                          if (!user) {
                            const [data, error] = await getAuthUrl();
                            if (!data || error) {
                              return;
                            }
                            router.push(data.url);
                            return;
                          }
                          mutate(product.id);
                        }}
                      >
                        <IconClipboardHeart stroke={1.5} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Group>
                <Text size="sm" c="dimmed">
                  {product.campaign.title}
                </Text>
              </Stack>
              <Stack gap={1}>
                <Text size="xs" ta="right" c="blue.9">
                  {percentFormatter.format(Math.max(progress, 0))}
                </Text>
                <Progress value={progress * 100} />
              </Stack>
            </Box>
          );
        })}
      </Group>
    </ScrollAreaAutosize>
  );
}
