import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Layout } from '@/components/Layout/AppShell';
import { SessionManager } from '@/components/SessionManager/SessionManager';
import { theme } from '@/libs/theme';
import { getSession } from '@/services/session/server';
import { QueryProvider } from '@/stores/query/query.store';
import { UserStoreProvider } from '@/stores/user.store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Funding for the Language, Culture, and Technology Organization',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user] = await getSession();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider theme={theme}>
          <UserStoreProvider values={{ user }}>
            <QueryProvider>
              <Layout>
                {children}
                <SessionManager />
              </Layout>
            </QueryProvider>
          </UserStoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
