import { Layout, Menu, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import styled from 'styled-components';

import {
  BankOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { UserProfile } from '@components/UserProfile';

const HeaderStyle = styled(Layout.Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoStyle = styled(Link)`
  float: left;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Nav = styled.div`
  flex-grow: 1;
`;

interface Props {}

export const Header = memo<Props>(function Header(props) {
  const router = useRouter();
  console.log('router', router);

  const handleClick = useCallback(
    ({ key }: { key: string }) => {
      router.push(`/admin/${key}`);
    },
    [router]
  );

  return (
    <HeaderStyle>
      <Nav>
        <LogoStyle href="/admin">
          <img src="/logo.png" alt="Facility Booking" height={30} />
          <Typography.Title level={4} style={{ margin: 0 }}>
            VN Map - Admin
          </Typography.Title>
        </LogoStyle>

        <Menu
          mode="horizontal"
          selectedKeys={[router.query.type as string]}
          // onClick={handleClick}
          items={[
            {
              icon: <CoffeeOutlined />,
              label: <Link href="/admin/restaurant">Restaurant</Link>,
              key: 'restaurant',
            },
            {
              icon: <ShoppingCartOutlined />,
              label: 'ShoppingMall',
              key: 'shopping',
            },
            {
              icon: <BankOutlined />,
              label: 'Hotel',
              key: 'hotel',
            },
            {
              icon: <EnvironmentOutlined />,
              label: 'Attractions',
              key: 'attraction',
            },
          ]}
        />
      </Nav>
      <UserProfile />
    </HeaderStyle>
  );
});
