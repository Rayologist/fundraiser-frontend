'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconLogout2, IconSearch } from '@tabler/icons-react';
import { Avatar, Group, Menu, rem, Text, UnstyledButton, useMatches } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { deleteSession, useSession } from '@/services/session/client';
import { useUserStore } from '@/stores/user.store';
import classes from './UserAvatar.module.css';

export function UserAvatar() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const { data } = useSession({ enabled: user === null && type === 'authenticated' });
  const { width } = useViewportSize();
  const w = useMatches({
    base: width - 10,
    md: 265,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const [session] = data;

    if (session) {
      setUser(session);
    }
  }, [data]);

  const avatar = <Avatar src={user?.picture ?? null} size="md" radius="xl" />;

  return (
    <Menu shadow="md" withArrow>
      <Menu.Target>
        <UnstyledButton className={classes.button}>{avatar}</UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown w={w}>
        <Group p={10}>
          {avatar}
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {getName({ firstName: user?.firstName, lastName: user?.lastName })}
            </Text>

            <Text c="dimmed" size="xs">
              {user?.email}
            </Text>
          </div>
        </Group>
        <Menu.Divider />
        <Menu.Item
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => {
            router.push('/records');
          }}
        >
          查詢捐助紀錄
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
          onClick={async () => {
            await deleteSession();
            logout();
          }}
        >
          登出
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function getName(args: { firstName?: string; lastName?: string }) {
  const isEnglish =
    /^[a-zA-Z]*$/.test(args.firstName ?? '') && /^[a-zA-Z]*$/.test(args.lastName ?? '');

  if (isEnglish) {
    return `${args.firstName} ${args.lastName}`;
  }

  return `${args.lastName}${args.firstName}`;
}
