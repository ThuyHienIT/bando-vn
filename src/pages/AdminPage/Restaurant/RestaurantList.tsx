import React, { memo } from 'react';

import { CompanyList } from '@components/CompanyList';
import { BasicLayout } from '@components/Layout/Layout';

interface Props {
  data: CompanyType[];
}

export const RestaurantList = memo<Props>((props) => {
  return (
    <BasicLayout>
      <CompanyList heading="Restaurants" data={props.data} />
    </BasicLayout>
  );
});
