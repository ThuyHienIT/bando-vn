import { Layout, Menu, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import styled from 'styled-components';

import {
  BankOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import { UserProfile } from '../UserProfile';
import { Container } from './Container';

const HeaderStyle = styled(Layout.Header)`
  border-bottom: 2px solid #dddddd;
  position: sticky;
  top: 0;

  &&& {
    background-color: #fff;
    padding-inline: 0;
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

const NavBar = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {}

export const Header = memo<Props>(function Header(props) {
  return (
    <HeaderStyle>
      <HeaderContent>
        <NavBar>
          <Link href="/">
            <Logo>
              <Image
                src="/logo.png"
                alt="Facility Booking"
                width={30}
                height={30}
              />
              <Typography.Title level={4}>VN Map - Admin</Typography.Title>
            </Logo>
          </Link>

          <Menu
            mode="horizontal"
            defaultSelectedKeys={['restaurant']}
            items={[
              {
                icon: <CoffeeOutlined />,
                label: 'Restaurant',
                key: 'restaurant',
              },
              {
                icon: <ShoppingCartOutlined />,
                label: 'ShoppingMall',
                key: 'ShoppingMall',
              },
              {
                icon: <BankOutlined />,
                label: 'Hotel',
                key: 'Hotel',
              },
              {
                icon: <EnvironmentOutlined />,
                label: 'Attractions',
                key: 'Attractions',
              },
            ]}
          />
        </NavBar>

        <UserProfile />
      </HeaderContent>
    </HeaderStyle>
  );
});
