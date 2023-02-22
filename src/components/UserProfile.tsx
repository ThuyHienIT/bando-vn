import { Button, Dropdown, MenuProps, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import {
  CalendarOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';

import request from '../lib/request';
import { userInfoState } from '../recoil/user';

export const UserProfile = memo(function UserProfile() {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);

  const handleLogout = useCallback(async () => {
    try {
      await request('/api/logout');

      router.push('/login');
    } catch (e: any) {}
  }, []);

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        label: `Welcome ${userInfo?.email}`,
        key: 'user',
      },
      {
        label: <Link href="/user/bookings">Your Bookings</Link>,
        key: 'bookings',
        icon: <CalendarOutlined />,
      },
      {
        type: 'divider',
        key: 'divider',
      },
      {
        label: <Typography.Text onClick={handleLogout}>Logout</Typography.Text>,
        key: 'logout',
        icon: <LogoutOutlined />,
      },
    ],
    [userInfo]
  );

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button shape="circle">
        <UserOutlined />
      </Button>
    </Dropdown>
  );
});
