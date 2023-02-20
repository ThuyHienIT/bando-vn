'use client';

import { Layout } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';

import { Container } from './Container';
import { Footer } from './Footer';
import { Header } from './Header';

const Content = styled(Layout.Content)``;

interface Props {
  children: React.ReactNode;
}
export const BasicLayout = memo<Props>(function BasicLayout(props) {
  return (
    <Layout>
      <Header />
      <Content className="site-layout">
        <Container className="main-container">{props.children}</Container>
      </Content>
      <Footer />
    </Layout>
  );
});
