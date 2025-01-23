'use client';

import { redirect, useParams } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import { alpha, Box, Group, Stack, Text, Title } from '@mantine/core';
import { AddCartItemButton } from '@/components/Product/Action';
import { ProductProgress } from '@/components/Product/Progress';
import { useCampaignStore } from '@/stores/campaign.store';

export default function ProductPage() {
  const { campaignId, productId } = useParams<{ campaignId?: string; productId?: string }>();
  const { campaign, products } = useCampaignStore(
    useShallow((state) => ({ campaign: state.campaign, products: state.products }))
  );

  const product = products.find((p) => p.id === productId);

  if (!product || !campaignId || !productId) {
    return redirect(`/campaigns/${campaignId}`);
  }

  return (
    <Box style={{ backgroundColor: alpha('#cfcfcf', 0.1), borderRadius: '1rem' }} p={40}>
      <Stack>
        <Group align="flex-start">
          <Stack w="100%">
            <Group justify="space-between">
              <Title order={1}>{product.title}</Title>
              <AddCartItemButton color={campaign.config.color.primary} productId={productId} />
            </Group>
            <Text>{product.description}</Text>
          </Stack>
        </Group>
        <Title order={2}>募款進度</Title>
        <ProductProgress
          color={campaign.config.color}
          currentAmount={product.currentAmount}
          goalAmount={product.goalAmount}
          totalContributors={product.totalContributors}
        />
      </Stack>
    </Box>
  );
}
