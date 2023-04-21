import { Layout } from 'antd';
import React, { memo } from 'react';
import styled from 'styled-components';

import { BasicLayout } from '@components/Layout/Layout';

const LayoutStyle = styled(Layout)`
  .site-layout .site-layout-background {
    background: #fff;
  }
`;
export const AdminPage = memo(() => {
  return (
    <BasicLayout>
      <div
        className="site-layout-background"
        style={{ padding: 24, textAlign: 'center' }}
      >
        <p>long content</p>
      </div>
    </BasicLayout>
  );
});
