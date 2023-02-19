'use client';

import { Layout } from 'antd';
import { memo } from 'react';
import { Header } from './Header';
import styled from 'styled-components';
import { Footer } from './Footer';

const Content = styled(Layout.Content)`
  max-width: 1080px;
  margin: 16px auto;
  padding: 0 16px;
`;

interface Props {
  children: React.ReactNode;
}
export const BasicLayout = memo<Props>(function BasicLayout(props) {
  return (
    <Layout>
      <Header>Header</Header>
      <Content className="site-layout">{props.children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
});
