import { getIronSession } from 'iron-session';
import { GetServerSidePropsContext, NextPage } from 'next';
import { redirect } from 'next/navigation';

import { ironOptions } from '@lib/config';
import LoginPage from '@pages/LoginPage';

const Page: NextPage<any> = (props) => {
  return <LoginPage />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getIronSession(ctx.req, ctx.res, ironOptions);

  if (session.user)
    return {
      redirect: {
        destination: '/admin',
      },
    };

  return { props: {} };
};

export default Page;
