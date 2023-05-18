import { Avatar, Button, Layout, Menu, Typography } from 'antd';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BankOutlined,
  CoffeeOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  UserOutlined
} from '@ant-design/icons';
import { userInfoState } from '@recoil/user';

const SidebarStyle = styled(Layout.Sider)`
  background-color: #f0f2f5;
  border-right: 1px solid #dddd;
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const UserProfileStyle = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
  align-items: center;

  .ant-avatar {
    flex-shrink: 0;
  }
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
  const userInfo = useRecoilValue(userInfoState);

  const handleCollapse = useCallback(() => {
    setCollapsed((c) => !c);
  }, []);

  const type = useMemo(() => {
    if (router.query.type) return router.query.type as string;

    return router.pathname.replace('/admin/', '').split('/')[0];
  }, [router]);

  return (
    <SidebarStyle
      width={200}
      className="site-layout-background"
      theme="light"
      collapsed={collapsed}
      collapsible
      trigger={null}
    >
      <UserProfileStyle>
        <Avatar size="large" src="https://picsum.photos/200/200" />
        {!collapsed && (
          <Typography.Title
            style={{ margin: 0, whiteSpace: 'nowrap' }}
            level={5}
          >
            {userInfo?.name}
          </Typography.Title>
        )}
      </UserProfileStyle>

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
            label: <Link href="/admin/attractions">Attractions</Link>,
            key: 'attraction',
          },
          {
            icon: <DollarCircleOutlined />,
            label: <Link href="/admin/agency">Agency</Link>,
            key: 'agency',
          },
          {
            icon: <PictureOutlined />,
            label: <Link href="/admin/tour">Tour</Link>,
            key: 'tour',
          },
          {
            icon: <ToolOutlined />,
            label: <Link href="/admin/settings">Settings</Link>,
            key: 'settings',
          },
          ...(userInfo?.role === 'admin'
            ? [
                {
                  icon: <UserOutlined />,
                  label: <Link href="/admin/user">Users</Link>,
                  key: 'user',
                },
              ]
            : []),
        ]}
      />

      <CollapseBtn
        onClick={handleCollapse}
        icon={collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
      ></CollapseBtn>
    </SidebarStyle>
  );
});
