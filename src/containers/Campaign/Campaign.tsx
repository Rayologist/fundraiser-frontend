import { Box, SimpleGrid } from '@mantine/core';
import { CampaignCard } from '@/components/Campaign/Card';
import { CampaignDto } from '@/libs/entities/campaign.entity';

export function Campaign(props: { campaigns: CampaignDto[] }) {
  const { campaigns } = props;
  return (
    <SimpleGrid cols={{ sm: 1, md: 2 }} spacing={100}>
      {campaigns.map((campaign) => (
        <Box key={campaign.title}>
          <CampaignCard
            id={campaign.id}
            color={campaign.config.color.primary}
            pictureUrl={campaign.pictures[0]}
            title={campaign.title}
            description={campaign.description}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
}
