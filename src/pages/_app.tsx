import AppContextProvider from '@/context/appContext';
import Layout from '@/layout';
import '@/styles/globals.css';
import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
