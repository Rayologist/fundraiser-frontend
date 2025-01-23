'use client';

import { useUserStore } from '@/stores/user.store';
import { LoginButton } from './LoginButton';
import { UserAvatar } from './UserAvatar';

export function Menu() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <LoginButton />;
  }

  return <UserAvatar />;
}
