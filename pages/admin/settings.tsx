import { GetServerSidePropsContext, NextPage } from 'next';
import Error from 'next/error';
import React, { memo } from 'react';

import { withSessionSsr } from '@lib/withSession';
import { userGetServerSideProps } from '@lib/withUserInfo';
import { queryUsers } from '@models/user';
import SettingsPage from '@pages/AdminPage/SettingsPage';

const Page: NextPage<{ user?: UserInfo }> = memo((props) => {
  if (!props.user) return <Error statusCode={403} />;

  return <SettingsPage user={props.user} />;
});

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
