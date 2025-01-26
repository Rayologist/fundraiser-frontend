import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { ActionIcon, Box, Group, rem, Stack, Text, Title } from '@mantine/core';
import { DonorInfo as DonorInfoType } from '@/libs/entities/donor-info.entity';

export function DonorInfo(props: { donorInfo: DonorInfoType }) {
  const { donorInfo } = props;
  const [showTaxId, setShowTaxId] = useState(false);
  const taxId = showTaxId
    ? donorInfo.taxId
    : `${donorInfo.taxId?.slice(-4) ?? ''}`.padStart(donorInfo.taxId?.length ?? 0, '*');
  const icon = showTaxId ? (
    <IconEyeOff color="gray" style={{ width: rem(20) }} />
  ) : (
    <IconEye color="gray" style={{ width: rem(20) }} />
  );

  const info = [
    { title: '姓名或機構名稱', content: donorInfo.fullName, active: true },
    { title: '電子郵件地址', content: donorInfo.email, active: true },
    {
      title: '是否為語言所所友',
      content: donorInfo.isGILMember ? '是' : '否',
      active: true,
    },
    {
      title: '是否需要收據',
      content: donorInfo.receiptRequest ? '是' : '否',
      active: true,
    },
    { title: '收據抬頭', content: donorInfo.receiptName, active: donorInfo.receiptRequest },
    {
      title: '身分證字號或統一編號',
      content: (
        <Group align="center" mt={5}>
          <Box style={{ width: 100 }}>{taxId}</Box>
          <ActionIcon onClick={() => setShowTaxId(!showTaxId)} radius="xl" variant="subtle">
            {icon}
          </ActionIcon>
        </Group>
      ),
      active: donorInfo.receiptRequest,
    },
    {
      title: '聯絡電話或手機',
      content: donorInfo.phoneNumber === '' ? '無' : donorInfo.phoneNumber,
      active: donorInfo.receiptRequest,
    },
  ];

  return (
    <Stack>
      <Title order={1} c="blue.9">
        捐款資料
      </Title>
      <Stack gap={30}>
        {info.map((i) => {
          if (!i.active) {
            return null;
          }

          return (
            <Stack key={i.title} gap={0}>
              <Title order={4}>{i.title}</Title>
              <Text size="md" c="dimmed" component="div">
                {i.content}
              </Text>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
