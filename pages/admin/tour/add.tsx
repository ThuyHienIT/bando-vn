import { NextPage } from 'next';
import Head from 'next/head';
import React, { memo } from 'react';

import { withUserInfo } from '@lib/withUserInfo';
import { TourEdit } from '@pages/AdminPage/TourPage/TourEdit';

const Page: NextPage = memo(() => {
  return (
    <>
      <Head>
        <title>Add New Tour</title>
      </Head>
      <TourEdit isAdd />
    </>
  );
});

export default withUserInfo(Page);
