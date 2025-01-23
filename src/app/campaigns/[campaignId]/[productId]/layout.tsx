'use client';

import { useRef, useState } from 'react';
import { redirect, useParams, useRouter } from 'next/navigation';
import { IconArrowLeft, IconFlag3 } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useShallow } from 'zustand/shallow';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  alpha,
  Box,
  Center,
  FloatingIndicator,
  Group,
  Image,
  Stack,
  Tabs,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useCampaignStore } from '@/stores/campaign.store';
import classes from './layout.module.css';

export default function ProductLayout(props: { children: React.ReactNode }) {
  const { campaignId, productId } = useParams<{ campaignId?: string; productId?: string }>();
  const router = useRouter();
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const campaignColorPrimary = useCampaignStore((state) => state.campaign.config.color.primary);
  const products = useCampaignStore(useShallow((state) => state.products));
  const campaign = useCampaignStore(useShallow((state) => state.campaign));

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>(productId ?? '');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Box
      style={{
        '--fundraiser-indicator-background-color': campaignColorPrimary,
      }}
    >
      <Stack mb={50} gap={35}>
        <Group align="flex-start">
          <Tooltip label="返回上一頁" withArrow>
            <ActionIcon mb={20} radius="xl" variant="subtle" size="lg" color={campaignColorPrimary}>
              <IconArrowLeft onClick={() => redirect(`/campaigns/${campaignId}`)} />
            </ActionIcon>
          </Tooltip>
          <Title order={3} mt={1}>
            {campaign.title}
          </Title>
        </Group>
        <Tabs variant="none" value={value} onChange={setValue}>
          <Tabs.List ref={setRootRef} className={classes.list}>
            {products
              .filter((p) => p.goalAmount !== 0)
              .map((product) => (
                <Tabs.Tab
                  key={product.id}
                  value={product.id}
                  ref={setControlRef(product.id)}
                  className={classes.tab}
                  styles={{
                    tab: {
                      borderRadius: '2rem',
                      backgroundColor:
                        productId !== product.id ? alpha('#aaa', 0.1) : 'transparent',
                    },
                  }}
                  onClick={() => router.push(`/campaigns/${campaignId}/${product.id}`)}
                >
                  <Group gap="xs">
                    <Center
                      style={{
                        borderRadius: '50%',
                        border: `2px solid `,
                        width: 20,
                        height: 20,
                        padding: 1,
                      }}
                    >
                      <IconFlag3 size={16} stroke={3} />
                    </Center>
                    <Text>{product.title}</Text>
                  </Group>
                </Tabs.Tab>
              ))}

            <FloatingIndicator
              target={value ? controlsRefs[value] : null}
              parent={rootRef}
              className={classes.indicator}
            />
          </Tabs.List>
        </Tabs>

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
          <Text fz="lg">{campaign.longDescription}</Text>
        </Box>
      </Stack>

      {props.children}
    </Box>
  );
}
