'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@mantine/core';

export function PlatformIcon() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Button
      variant="transparent"
      onClick={() => {
        if (pathname !== '/') {
          router.push('/');
        }
      }}
      c="gray"
    >
      台灣語言文化與資訊協會
    </Button>
  );
}
