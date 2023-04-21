import { NextPage } from 'next';
import React, { memo } from 'react';

import { withUserInfo } from '@lib/withUserInfo';
import { RestaurantEdit } from '@pages/AdminPage/Restaurant/RestaurantEdit';

const Page: NextPage = memo(() => {
  return <RestaurantEdit isAdd />;
});

export default withUserInfo(Page);
