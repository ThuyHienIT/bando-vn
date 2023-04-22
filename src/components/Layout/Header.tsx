import { Layout, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import styled from 'styled-components';

const HeaderStyle = styled(Layout.Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dddddd;
`;

const LogoStyle = styled(Link)`
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
      <LogoStyle href="/admin">
        <img src="/logo.png" alt="Facility Booking" height={30} />
        <Typography.Title level={4} style={{ margin: 0 }}>
          VN Map - Admin
        </Typography.Title>
      </LogoStyle>
    </HeaderStyle>
  );
});
