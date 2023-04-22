import { Button, Dropdown, MenuProps, Tag, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { clearSessionSelector } from '@recoil/common';

import request from '../lib/request';
import { userInfoState } from '../recoil/user';

export const UserProfile = memo(function UserProfile() {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const clearSession = useResetRecoilState(clearSessionSelector);

  const handleLogout = useCallback(async () => {
    try {
      await request('/api/logout');
      clearSession();

      router.push('/login');
    } catch (e: any) {}
  }, [clearSession, router]);

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        label: (
          <>
            Role: <Tag>{userInfo?.role}</Tag>
          </>
        ),
        key: 'user',
      },
      {
        type: 'divider',
      },

      {
        label: <Typography.Text onClick={handleLogout}>Logout</Typography.Text>,
        key: 'logout',
        icon: <LogoutOutlined />,
      },
    ],
    [handleLogout, userInfo?.role]
  );

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button shape="circle">
        <UserOutlined />
      </Button>
    </Dropdown>
  );
});
