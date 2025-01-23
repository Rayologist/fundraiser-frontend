'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Card, CardSection, Image, Stack, Text, Title } from '@mantine/core';

export function CampaignCard(props: {
  id: string;
  color: string;
  pictureUrl: string;
  title: string;
  description: string;
}) {
  const router = useRouter();
  const { color, pictureUrl, title, description } = props;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ borderColor: color }}>
      <CardSection>
        <Image src={pictureUrl} height={160} alt="Campaign picture" />
      </CardSection>

      <Stack mt={16}>
        <Title order={2} ta="center">
          {title}
        </Title>

        <Box h={50}>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Box>

        <Button
          color={color}
          fullWidth
          mt="md"
          radius="md"
          onClick={() => router.push(`/campaigns/${props.id}`)}
        >
          立即前往
        </Button>
      </Stack>
    </Card>
  );
}
