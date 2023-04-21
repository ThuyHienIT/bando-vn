import { Layout, Typography } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';

import { Container } from './Container';

const FooterStyle = styled(Layout.Footer)`
  padding: 8px 0;
  border-top: 2px solid #dddddd;
  background-color: #ffffff;
`;

interface Props {}
export const Footer = memo<Props>(function Header(props) {
  return (
    <FooterStyle>
      <Container>
        <Typography.Text>
          <small>© Created by ❤️</small>
        </Typography.Text>
      </Container>
    </FooterStyle>
  );
});
