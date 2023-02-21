import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apolloClient';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import '@/styles/global.css';
import AppHeader from '@/components/Header';
import AppFooter from '@/components/Footer';
import { AuthProvider } from '@/hooks/useAuth';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>{'{ Blogify }'}</title>
        <meta
          name="description"
          content="Blog app built with React, Apollo Server,  GraphQL, and PostgreSQL "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
          >
            <AuthProvider>
              <div className="appContainer">
                <AppHeader />
                <Component {...pageProps} />
                <AppFooter />
              </div>
            </AuthProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ApolloProvider>
    </>
  );
}
