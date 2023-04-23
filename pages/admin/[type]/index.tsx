import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import React, { memo } from 'react';

import { withSessionSsr } from '@lib/withSession';
import { userGetServerSideProps } from '@lib/withUserInfo';
import { queryCompaniesByTypes } from '@models/company';
import { HeadingMapping } from '@pages/AdminPage/Restaurant/config';
import { RestaurantList } from '@pages/AdminPage/Restaurant/RestaurantList';

const Page: NextPage<{ data: CompanyType[]; type?: string }> = memo((props) => {
  console.log('type', props.type);
  return (
    <>
      <Head>
        <title>
          {`${props.type ? HeadingMapping[props.type] : ''} Management`}
        </title>
      </Head>
      <RestaurantList {...props} />
    </>
  );
});

async function getServerSidePropsHandler(ctx: GetServerSidePropsContext) {
  const userProps = await userGetServerSideProps(ctx.req.session);
  let data: CompanyType[] = [];
  const type = ctx.query.type as string;

  try {
    data = await queryCompaniesByTypes([type]);
  } catch (e: any) {
    console.log('ERROR:: Cannot retrieve prototype details', e);
  }

  return {
    props: {
      ...userProps.props,
      data: data,
      type,
    },
  };
}

export const getServerSideProps = withSessionSsr(getServerSidePropsHandler);

export default Page;
