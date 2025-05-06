'use client';

import { useRef } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { IconArrowLeft, IconHandClick } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useShallow } from 'zustand/shallow';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  alpha,
  Box,
  Button,
  Center,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { Product } from '@/containers/Product/Product';
import { useAddCartItem } from '@/services/cart/client';
import { getAuthUrl } from '@/services/session/client';
import { useCampaignStore } from '@/stores/campaign.store';
import { useUserStore } from '@/stores/user.store';

export default function CampaignDetailPage() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const { campaign, products } = useCampaignStore(
    useShallow((state) => ({ campaign: state.campaign, products: state.products }))
  );
  const user = useUserStore((state) => state.user);

  const { mutateAsync: addCartItem } = useAddCartItem();
  const router = useRouter();

  const general = products.find((p) => p.goalAmount === 0);
  const specific = products.filter((p) => p.goalAmount > 0);

  return (
    <Stack gap="lg">
      <Tooltip label="返回上一頁" withArrow>
        <ActionIcon radius="xl" variant="subtle" size="lg" color={campaign.config.color.primary}>
          <IconArrowLeft onClick={() => redirect(`/`)} />
        </ActionIcon>
      </Tooltip>

      <Box>
        <Carousel
          withIndicators
          height={350}
          align="center"
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          styles={{
            viewport: {
              borderRadius: 16,
            },
          }}
        >
          {campaign.pictures.map((picture) => (
            <Carousel.Slide key={picture}>
              <Image src={picture} height={350} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>

      <Box style={{ backgroundColor: alpha('#ccc', 0.1), borderRadius: '1rem' }} p={40}>
        <Title order={1} c={campaign.config.color.primary} mb={10}>
          {campaign.title}
        </Title>
        <Text fz="lg">{campaign.longDescription}</Text>
      </Box>
      <Center>
        {general && (
          <Button
            color={campaign.config.color.primary}
            radius="md"
            size="xl"
            w={300}
            rightSection={<IconHandClick />}
            onClick={async () => {
              if (!user) {
                const [data, error] = await getAuthUrl();
                if (!data || error) {
                  return;
                }
                router.push(data.url);
                return;
              }
              await addCartItem(general.id);
              router.push('/checkout/cart');
            }}
          >
            <Stack gap={3}>
              立即捐助
              <Text fz={12}>不指定用途</Text>
            </Stack>
          </Button>
        )}
      </Center>

      <Title order={3} c={campaign.config.color.primary}>
        募款項目
      </Title>

      <Product products={specific} />
    </Stack>
  );
}
