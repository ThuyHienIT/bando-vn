'use client';

import { Layout, Typography } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';
import { Container } from './Container';

interface Props {}
export const Footer = memo<Props>(function Header(props) {
  return (
    <Layout.Footer style={{ padding: '8px 0' }}>
      <Container>
        <Typography.Text type="secondary">
          <small>© Created by Thang Kieu</small>
        </Typography.Text>
      </Container>
    </Layout.Footer>
  );
});
