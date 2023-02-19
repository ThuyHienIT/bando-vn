'use client';

import { CalendarOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { memo, useMemo } from 'react';

export const UserProfile = memo(function UserProfile() {
  const items = useMemo<MenuProps['items']>(
    () => [
      {
        label: <Link href="/user/bookings">Your Bookings</Link>,
        key: 'bookings',
        icon: <CalendarOutlined />,
      },
    ],
    []
  );

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button shape="circle">
        <UserOutlined />
      </Button>
    </Dropdown>
  );
});
