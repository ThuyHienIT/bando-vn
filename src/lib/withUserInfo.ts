import { getIronSession } from 'iron-session';
import { NextPage } from 'next';

import { ironOptions } from './config';

export const withUserInfo = (Component: NextPage) => {
  Component.getInitialProps = async (ctx) => {
    if (ctx.req && ctx.res) {
      let { user } = await getIronSession(ctx.req, ctx.res, ironOptions);
      if (!user) return {};

      global.__RECOIL_DATA__ = global.__RECOIL_DATA__ ?? {};
      global.__RECOIL_DATA__.user = user;

      return { user };
    }

    return {};
  };

  return Component;
};
