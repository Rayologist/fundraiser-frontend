'use client';

import Link from 'next/link';
import { IconFlag3 } from '@tabler/icons-react';
import cx from 'clsx';
import { Box, Center, Group, Paper, Text } from '@mantine/core';
import classes from './TableOfContents.module.css';

export type TableOfProductContentProps = {
  title: string;
  url: string;
  active: boolean;
};

export function TableOfProductContents(props: {
  color: string;
  item: TableOfProductContentProps[];
}) {
  const items = props.item.map((item) => {
    const color = item.active ? 'var(--mantine-color-white)' : props.color;
    return (
      <Box
        style={{ '--hover-color': props.color }}
        component={Link}
        href={item.url}
        key={item.title}
        className={cx(classes.link, { [classes.linkActive]: item.active })}
      >
        <Group gap="xs">
          <Center
            style={{
              borderRadius: '50%',
              border: `2px solid ${color}`,
              width: 20,
              height: 20,
              padding: 1,
            }}
          >
            <IconFlag3 size={16} color={color} stroke={3} />
          </Center>
          <Text>{item.title}</Text>
        </Group>
      </Box>
    );
  });

  return (
    <Paper radius="md" p={10} withBorder w={200}>
      <Group mb="md">
        <Text size="sm" c="dimmed">
          募資項目
        </Text>
      </Group>
      {items}
    </Paper>
  );
}
