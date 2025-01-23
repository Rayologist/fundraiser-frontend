'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconLogout2, IconSearch } from '@tabler/icons-react';
import { Avatar, Menu, rem } from '@mantine/core';
import { deleteSession, useSession } from '@/services/session/client';
import { useUserStore } from '@/stores/user.store';

export function UserAvatar() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const { data } = useSession({ enabled: user === null && type === 'authenticated' });

  useEffect(() => {
    if (!data) {
      return;
    }

    const [session] = data;

    if (session) {
      setUser(session);
    }
  }, [data]);

  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <Avatar
          src={user?.picture ?? null}
          size="md"
          radius="xl"
          style={{
            cursor: 'pointer',
            border: '2px solid #fff',
            boxShadow: '0 0 0 2px #fff',
          }}
        />
      </Menu.Target>

      <Menu.Dropdown>
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
