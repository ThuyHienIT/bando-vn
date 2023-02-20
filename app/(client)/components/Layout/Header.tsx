'use client';

import { Layout, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import styled from 'styled-components';

import { UserProfile } from '../UserProfile';
import { Container } from './Container';

const HeaderStyle = styled(Layout.Header)`
  border-bottom: 2px solid #dddddd;

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
        <Link href="/">
          <Logo>
            <Image src="/logo.png" alt="Facility Booking" width={30} height={30} />
            <Typography.Title level={4}>Facility Booking</Typography.Title>
          </Logo>
        </Link>
        <UserProfile />
      </HeaderContent>
    </HeaderStyle>
  );
});
