import './globals.css';

import Head from 'next/head';

import { App } from '@components/App';

import type { AppProps } from 'next/app';
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico?v=2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#509f53" />
        <meta
          name="description"
          content="Spinarak - Your Newsletter subscription"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta property="og:title" content="Spinarak" />
        <meta property="og:url" content="https://spinarak.data.tech.gov.sg/" />
        <meta property="og:image" content="/img/Spinarak_OG_image.png" />
        <meta property="og:site_name" content="Spinarak" />
      </Head>
      <App>
        <Component {...pageProps} />
      </App>
    </>
  );
};

export default MyApp;
