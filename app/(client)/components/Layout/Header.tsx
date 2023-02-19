'use client';

import { ProfileOutlined } from '@ant-design/icons';
import { Layout, Typography } from 'antd';
import Image from 'next/image';
import { memo } from 'react';
import styled from 'styled-components';
import { UserProfile } from '../UserProfile';
import { Container } from './Container';

const HeaderStyle = styled(Layout.Header)`
  &&& {
    background-color: #fff;
  }
`;

const HeaderContent = styled(Container)`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .ant-typography {
    margin-bottom: 0;
  }
`;

interface Props {}
export const Header = memo<Props>(function Header(props) {
  return (
    <HeaderStyle>
      <HeaderContent>
        <Logo>
          <Image src="/logo.png" alt="Facility Booking" width={30} height={30} />
          <Typography.Title level={4}>Facility Booking</Typography.Title>
        </Logo>
        <UserProfile />
      </HeaderContent>
    </HeaderStyle>
  );
});
