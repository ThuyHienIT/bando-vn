import { Layout } from 'antd';
import React, { memo } from 'react';
import styled from 'styled-components';

import { CompanyList } from '@components/CompanyList';
import { BasicLayout } from '@components/Layout/Layout';

import { HeadingMapping } from './Restaurant/config';

const LayoutStyle = styled(Layout)`
  .site-layout .site-layout-background {
    background: #fff;
  }
`;
interface Props {
  data: Record<string, CompanyType[]>;
}

export const AdminPage = memo<Props>((props) => {
  return (
    <BasicLayout>
      {Object.keys(props.data).map((type) => (
        <React.Fragment key={type}>
          <CompanyList
            data={props.data[type]}
            heading={HeadingMapping[type]}
            max={4}
            viewAllLink={`/admin/${type}`}
          />
        </React.Fragment>
      ))}
    </BasicLayout>
  );
});
