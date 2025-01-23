import { IconCoins, IconGolf, IconUser } from '@tabler/icons-react';
import { Group, RingProgress, Stack, Text } from '@mantine/core';
import { CampaignDto } from '@/libs/entities/campaign.entity';
import { ProductDto } from '@/libs/entities/product.entity';
import {
  currencyFormatter,
  decimalFormatter,
  percentFormatter,
} from '@/libs/formatter/number.formatter';

export function ProductProgress(
  props: Pick<ProductDto, 'currentAmount' | 'goalAmount' | 'totalContributors'> &
    Pick<CampaignDto['config'], 'color'>
) {
  let progress = 0;

  if (props.currentAmount > 0) {
    progress = props.currentAmount / props.goalAmount;
  }

  return (
    <Group justify="space-between" gap={50}>
      <RingProgress
        sections={[{ value: progress * 100, color: props.color.secondary }]}
        thickness={8}
        roundCaps
        label={
          <Text c={props.color.primary} fw={700} ta="center" size="xl">
            {percentFormatter.format(progress)}
          </Text>
        }
      />
      <Stack gap={0}>
        <Group gap="xs">
          <IconGolf size={16} color={props.color.primary} />
          <Text c="dimmed">目標金額 </Text>
        </Group>
        <Group>
          <Text c={props.color.primary} fw={700} fz={25}>
            {currencyFormatter.format(props.goalAmount)}
          </Text>
          <Text>元</Text>
        </Group>
      </Stack>

      <Stack gap={0}>
        <Group gap="xs">
          <IconCoins size={16} color={props.color.primary} />
          <Text c="dimmed">累積金額</Text>
        </Group>
        <Group>
          <Text c={props.color.primary} fw={700} fz={25}>
            {currencyFormatter.format(props.currentAmount)}
          </Text>
          <Text>元</Text>
        </Group>
      </Stack>

      <Stack gap={0}>
        <Group gap="xs">
          <IconUser size={16} color={props.color.primary} />
          <Text c="dimmed">贊助人數 </Text>
        </Group>
        <Group>
          <Text c={props.color.primary} fw={700} fz={25}>
            {decimalFormatter.format(props.totalContributors)}
          </Text>
          <Text>人</Text>
        </Group>
      </Stack>
    </Group>
  );
}
