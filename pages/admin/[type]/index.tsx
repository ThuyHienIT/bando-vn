import { GetServerSidePropsContext, NextPage } from 'next';
import React, { memo } from 'react';

import { withSessionSsr } from '@lib/withSession';
import { userGetServerSideProps } from '@lib/withUserInfo';
import { queryCompanies } from '@models/company';
import { RestaurantList } from '@pages/AdminPage/Restaurant/RestaurantList';

const Page: NextPage<{ data: CompanyType[] }> = memo((props) => {
  return <RestaurantList {...props} />;
});

async function getServerSidePropsHandler(ctx: GetServerSidePropsContext) {
  const userProps = await userGetServerSideProps(ctx.req.session);
  let data: CompanyType[] = [];
  const type = ctx.query.type as string;

  try {
    data = await queryCompanies(type);
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
