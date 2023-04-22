import { GetServerSidePropsContext, NextPage } from 'next';
import React, { memo } from 'react';

import { withSessionSsr } from '@lib/withSession';
import { userGetServerSideProps } from '@lib/withUserInfo';
import { queryUsers } from '@models/user';
import UserPage from '@pages/AdminPage/UserPage';

const Page: NextPage<{ user?: UserInfo; users?: UserInfo[] }> = memo(
  (props) => {
    return <UserPage {...props} />;
  }
);

async function getServerSidePropsHandler(ctx: GetServerSidePropsContext) {
  const userProps = await userGetServerSideProps(ctx.req.session);

  let data: UserInfo[] = [];
  try {
    data = await queryUsers();
  } catch (e: any) {
    console.log('ERROR:: Cannot retrieve data', e);
  }

  return {
    props: {
      ...userProps.props,
      users: data,
    },
  };
}

export const getServerSideProps = withSessionSsr(getServerSidePropsHandler);

export default Page;
