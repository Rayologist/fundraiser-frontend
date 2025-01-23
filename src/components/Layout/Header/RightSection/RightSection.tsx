'use client';

import { Group } from '@mantine/core';
import { Cart } from './Cart/Cart';
import { Menu } from './Menu/Menu';

export function RightSection() {
  return (
    <Group gap="xl">
      <Cart />
      <Menu />
    </Group>
  );
}
