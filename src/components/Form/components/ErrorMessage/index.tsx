import { IconAlertCircle } from '@tabler/icons-react';
import { Center, Group, Text, TextProps } from '@mantine/core';

export function ErrorMessage(props: TextProps & { children: React.ReactNode }) {
  const { children, ...rest } = props;

  return (
    <Group gap={5} component="span" style={{ position: 'absolute' }}>
      <Center component="span">
        <IconAlertCircle size={20} />
      </Center>
      <Text
        fw={500}
        component="span"
        size="sm"
        style={{ wordBreak: 'break-word', display: 'block' }}
        {...rest}
      >
        {children}
      </Text>
    </Group>
  );
}
