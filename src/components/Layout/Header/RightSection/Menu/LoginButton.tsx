'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';
import { GoogleIcon } from '@/components/Icon/GoogleIcon/GoogleIcon';
import { getAuthUrl } from '@/services/session/client';

export function LoginButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant="default"
      c="gray.8"
      radius="md"
      size="md"
      leftSection={<GoogleIcon size={18} style={{ marginTop: 1 }} />}
      loading={loading}
      onClick={async () => {
        setLoading(true);
        const [data, error] = await getAuthUrl();
        setLoading(false);
        if (!data || error) {
          return;
        }
        router.push(data.url);
      }}
    >
      登入
    </Button>
  );
}
