'use client';

import { Layout } from 'antd';
import { memo } from 'react';
import { Header } from './Header';
import styled from 'styled-components';
import { Footer } from './Footer';
import { Container } from './Container';

const Content = styled(Layout.Content)``;

interface Props {
  children: React.ReactNode;
}
export const BasicLayout = memo<Props>(function BasicLayout(props) {
  return (
    <Layout>
      <Header />
      <Content className="site-layout">
        <Container>{props.children}</Container>
      </Content>
      <Footer />
    </Layout>
  );
});
