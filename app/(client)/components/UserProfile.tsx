'use client';

import { Button, Dropdown, MenuProps } from 'antd';
import Link from 'next/link';
import { memo, useMemo } from 'react';

import { CalendarOutlined, UserOutlined } from '@ant-design/icons';

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
