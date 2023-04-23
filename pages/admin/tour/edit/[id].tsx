import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import React, { memo } from 'react';

import { withSessionSsr } from '@lib/withSession';
import { userGetServerSideProps } from '@lib/withUserInfo';
import { getTour } from '@models/tour';
import { TourEdit } from '@pages/AdminPage/TourPage/TourEdit';

const Page: NextPage<{ data: TourDetailsType }> = memo((props) => {
  return (
    <>
      <Head>
        <title>Edit: {props.data.name}</title>
      </Head>
      <TourEdit {...props} />
    </>
  );
});

async function getServerSidePropsHandler(ctx: GetServerSidePropsContext) {
  const userProps = await userGetServerSideProps(ctx.req.session);
  let data: Nullable<TourDetailsType> = null;

  const type = ctx.query.type as string;
  const id = ctx.query.id as string;

  try {
    data = await getTour(id);
  } catch (e: any) {
    console.log('ERROR:: Cannot retrieve prototype details', e);
  }

  if (!data) {
    return {
      redirect: {
        destination: `/admin/${type}/add`,
        permanent: false,
      },
    };
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
