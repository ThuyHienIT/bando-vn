import { GetServerSidePropsContext, NextPage } from 'next';
import React, { memo } from 'react';

import { CompanyTypeEnum } from '@enums';
import { withSessionSsr } from '@lib/withSession';
import { userGetServerSideProps } from '@lib/withUserInfo';
import { queryCompaniesByTypes } from '@models/company';
import { AdminPage } from '@pages/AdminPage';

const Page: NextPage<{ data: Record<string, CompanyType[]> }> = memo(
  (props) => {
    return <AdminPage {...props} />;
  }
);

async function getServerSidePropsHandler(ctx: GetServerSidePropsContext) {
  const userProps = await userGetServerSideProps(ctx.req.session);
  const data: Record<string, CompanyType[]> = {
    [CompanyTypeEnum.restaurant]: [],
    [CompanyTypeEnum.attraction]: [],
    [CompanyTypeEnum.hotel]: [],
    [CompanyTypeEnum.shopping]: [],
  };

  try {
    const resp = await queryCompaniesByTypes([
      CompanyTypeEnum.restaurant,
      CompanyTypeEnum.attraction,
      CompanyTypeEnum.hotel,
      CompanyTypeEnum.shopping,
    ]);

    resp.forEach((item) => {
      data[item.type].push(item);
    });
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
