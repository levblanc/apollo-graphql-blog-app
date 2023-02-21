import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apolloClient';
import { MantineProvider } from '@mantine/core';
import '@/styles/global.css';
import AppHeader from '@/components/Header';
import AppFooter from '@/components/Footer';
import { AuthProvider } from '@/hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blogify</title>
        <meta
          name="description"
          content="Blog app built with React, Apollo Server,  GraphQL, and PostgreSQL "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
          }}
        >
          <AuthProvider>
            <div className="appContainer">
              <AppHeader />
              <Component {...pageProps} />
              <AppFooter />
            </div>
          </AuthProvider>
        </MantineProvider>
      </ApolloProvider>
    </>
  );
}
