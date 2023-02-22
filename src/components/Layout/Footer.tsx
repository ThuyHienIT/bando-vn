import { Layout, Typography } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';

import { Container } from './Container';

const FooterStyle = styled(Layout.Footer)`
  padding: 8px 0;
  border-top: 2px solid #dddddd;
`;

interface Props {}
export const Footer = memo<Props>(function Header(props) {
  return (
    <FooterStyle style={{ padding: '8px 0' }}>
      <Container>
        <Typography.Text type="secondary">
          <small>© Created by Thang Kieu</small>
        </Typography.Text>
      </Container>
    </FooterStyle>
  );
});
