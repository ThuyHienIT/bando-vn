import { Avatar, Button, Layout, Menu } from 'antd';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BankOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

const SidebarStyle = styled(Layout.Sider)`
  position: relative;
  background-color: #f0f2f5;
  border-right: 1px solid #dddd;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const UserProfileStyle = styled(Avatar)`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const CollapseBtn = styled(Button)`
  position: absolute;
  bottom: 16px;
  left: 16px;
`;

const MenuStyle = styled(Menu)`
  background-color: transparent;

  .ant-menu-item {
    margin: 8px;
  }

  &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #ffffff;
    border-radius: 8px;
  }

  &.ant-menu.ant-menu-inline-collapsed > .ant-menu-item {
    padding: 0 calc(50% - 34px / 2);
  }
`;

interface Props {}
export const Sider = memo<Props>(function Sider(props) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = useCallback(() => {
    setCollapsed((c) => !c);
  }, []);

  const type = useMemo(
    () =>
      router.pathname === '/admin/user'
        ? 'user'
        : (router.query.type as string),
    [router]
  );

  return (
    <SidebarStyle
      width={200}
      className="site-layout-background"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',

        top: 64,
      }}
      theme="light"
      collapsed={collapsed}
      collapsible
      trigger={null}
    >
      <UserProfileStyle size="large" src="https://picsum.photos/200/200" />

      <MenuStyle
        mode="vertical"
        theme="light"
        selectedKeys={[type]}
        items={[
          {
            icon: <CoffeeOutlined />,
            label: <Link href="/admin/restaurant">Restaurant</Link>,
            key: 'restaurant',
          },
          {
            icon: <ShoppingCartOutlined />,
            label: <Link href="/admin/shopping">ShoppingMall</Link>,
            key: 'shopping',
          },
          {
            icon: <BankOutlined />,
            label: <Link href="/admin/hotel">Hotel</Link>,
            key: 'hotel',
          },
          {
            icon: <EnvironmentOutlined />,
            label: <Link href="/admin/restaurant">Attractions</Link>,
            key: 'attraction',
          },
          {
            icon: <UserOutlined />,
            label: <Link href="/admin/user">User</Link>,
            key: 'user',
          },
        ]}
      />

      <CollapseBtn
        onClick={handleCollapse}
        icon={collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
      ></CollapseBtn>
    </SidebarStyle>
  );
});
