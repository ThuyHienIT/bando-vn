import { NextPage } from 'next';
import Head from 'next/head';

import HomePage from '@pages/HomePage';

interface Props {}

const NextAppsPage: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <HomePage />
    </>
  );
};

export default NextAppsPage;
