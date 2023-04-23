import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import React, { memo } from 'react';

import { withSessionSsr } from '@lib/withSession';
import { userGetServerSideProps } from '@lib/withUserInfo';
import { queryTourByCompanyId } from '@models/tour';
import { TourList } from '@pages/AdminPage/TourPage/TourList';

const Page: NextPage<{ data: CompanyType[] }> = memo((props) => {
  return (
    <>
      <Head>
        <title>Tour Management</title>
      </Head>
      <TourList {...props} />
    </>
  );
});

async function getServerSidePropsHandler(ctx: GetServerSidePropsContext) {
  const userProps = await userGetServerSideProps(ctx.req.session);
  let data: TourDetailsType[] = [];
  const type = ctx.query.type as string;

  try {
    data = await queryTourByCompanyId();
  } catch (e: any) {
    console.log('ERROR:: Cannot retrieve prototype details', e);
  }

  return {
    props: {
      ...userProps.props,
      data: data,
    },
  };
}

export const getServerSideProps = withSessionSsr(getServerSidePropsHandler);

export default Page;
