'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import { useSession } from '@/services/session/client';
import { useUserStore } from '@/stores/user.store';

export function SessionManager() {
  const { user, setUser } = useUserStore(
    useShallow((state) => ({ user: state.user, setUser: state.setUser }))
  );
  const router = useRouter();
  const pathnames = usePathname();
  // const searchParams = useSearchParams();
  // const type = searchParams.get('type');
  const { data } = useSession({ enabled: user === null });

  useEffect(() => {
    if (!data) {
      return;
    }

    const [session] = data;

    if (session) {
      setUser(session);
    }

    router.push(pathnames);
  }, [data]);

  return null;
}
