import { useRouter } from 'next/router';
import React, { memo } from 'react';

import { CompanyList } from '@components/CompanyList';
import { BasicLayout } from '@components/Layout/Layout';

interface Props {
  data: CompanyType[];
}

export const TourList = memo<Props>((props) => {
  const router = useRouter();

  return (
    <BasicLayout>
      <CompanyList type="tour" heading="Tour List" data={props.data} />
    </BasicLayout>
  );
});
