import { getIronSession, IronSession } from 'iron-session';
import { NextPage, NextPageContext } from 'next';

import { getUser } from '@models/user';

import { ironOptions } from './config';

export const userGetInitialProps = async (ctx: NextPageContext) => {
  if (ctx.req && ctx.res) {
    let { user, jwt_token } = await getIronSession(
      ctx.req,
      ctx.res,
      ironOptions
    );
    if (!user || !jwt_token) return {};

    const userInfo = await getUserInfo(user.id);
    user = { ...user, ...userInfo };

    return { user };
  }

  return {};
};

export const userGetServerSideProps = async (session: IronSession) => {
  if (!session.user) return { props: { user: null } };
  const user = await getUserInfo(session.user.id);
  return { props: { user } };
};

export const withUserInfo = (Component: NextPage) => {
  Component.getInitialProps = userGetInitialProps;

  return Component;
};

async function getUserInfo(id: string) {
  return await getUser(id);
}
