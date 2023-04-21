import { GetServerSidePropsContext, NextPage } from 'next';
import { redirect } from 'next/navigation';
import React, { memo } from 'react';

import { withSessionSsr } from '@lib/withSession';
import { userGetServerSideProps } from '@lib/withUserInfo';
import { getCompany } from '@models/company';
import { RestaurantEdit } from '@pages/AdminPage/Restaurant/RestaurantEdit';

const Page: NextPage<{ data: CompanyType }> = memo((props) => {
  return <RestaurantEdit {...props} />;
});

async function getServerSidePropsHandler(ctx: GetServerSidePropsContext) {
  const userProps = await userGetServerSideProps(ctx.req.session);
  let data: Nullable<CompanyType> = null;

  const type = ctx.query.type as string;
  const id = ctx.query.id as string;

  try {
    data = await getCompany(id);
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
