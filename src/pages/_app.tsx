import AppContextProvider from '@/context/appContext';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ReactElement, ReactNode, useEffect } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      NProgress.start();
    });
    Router.events.on('routeChangeComplete', (url) => {
      NProgress.done();
    });
    Router.events.on('routeChangeError', (url) => {
      NProgress.done();
    });
  }, []);
  const getLayout = Component.getLayout ?? ((page) => page);
  return <AppContextProvider>{getLayout(<Component {...pageProps} />)}</AppContextProvider>;
}
