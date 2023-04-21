import { useRouter } from 'next/router';
import React, { memo, useMemo } from 'react';

import { CompanyList } from '@components/CompanyList';
import { BasicLayout } from '@components/Layout/Layout';

import { HeadingMapping } from './config';

interface Props {
  data: CompanyType[];
}

export const RestaurantList = memo<Props>((props) => {
  const router = useRouter();
  const type = useMemo(() => router.query.type as string, [router.query.type]);

  return (
    <BasicLayout>
      <CompanyList
        type={type}
        heading={`${HeadingMapping[type] ?? type} List`}
        data={props.data}
      />
    </BasicLayout>
  );
});
