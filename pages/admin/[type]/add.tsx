import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { memo } from 'react';

import { withUserInfo } from '@lib/withUserInfo';
import { HeadingMapping } from '@pages/AdminPage/Restaurant/config';
import { RestaurantEdit } from '@pages/AdminPage/Restaurant/RestaurantEdit';

const Page: NextPage = memo(() => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {`Add New ${HeadingMapping[router.query.type as string] ?? ''}`}
        </title>
      </Head>
      <RestaurantEdit isAdd />
    </>
  );
});

export default withUserInfo(Page);
