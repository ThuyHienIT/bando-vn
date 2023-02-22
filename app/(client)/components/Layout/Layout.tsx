'use client';

import { Layout } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';

import { Container } from './Container';
import { Footer } from './Footer';
import { Header } from './Header';

const LayoutStyle = styled(Layout)`
  &&& {
    min-height: 100vh;
  }
`;

interface Props {
  children: React.ReactNode;
}
export const BasicLayout = memo<Props>(function BasicLayout(props) {
  return (
    <LayoutStyle>
      <Header />
      <Layout.Content>
        <Container className="main-container">{props.children}</Container>
      </Layout.Content>
      <Footer />
    </LayoutStyle>
  );
});
