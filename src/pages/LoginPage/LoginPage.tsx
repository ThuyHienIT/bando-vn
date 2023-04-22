import { Button, Card, Form, Input, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import request from '@lib/request';
import { userInfoState } from '@recoil/user';
import { notify } from '@utils/common';

interface Props {}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://picsum.photos/1084/992/?blur');
  background-size: cover;
  background-position: center center;
  min-height: 100vh;
  background-position: center;
  position: relative;
  padding: 1rem;

  &::before {
    content: '';
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

const CardStyle = styled(Card)`
  border-radius: 4px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const RightAction = styled.div`
  text-align: right;
`;

const LoginPage = memo(function LoginPage(props: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const email = Form.useWatch('email', form);
  const password = Form.useWatch('password', form);
  const router = useRouter();
  const updateUserInfo = useSetRecoilState(userInfoState);

  const handleSubmit = useCallback(
    async (values: { email: string; password: string }) => {
      try {
        setLoading(true);
        const resp: UserInfo = await request('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        updateUserInfo(resp);
        router.push('/admin');
      } catch (e: any) {
        notify.error(e.message);
      } finally {
        setLoading(false);
      }
    },
    [router, updateUserInfo]
  );

  return (
    <Wrapper>
      <CardStyle>
        <Logo>
          <Image
            src="/logo.png"
            alt="Facility Booking"
            width={50}
            height={50}
          />
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            VN Map
          </Typography.Title>
        </Logo>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Typography.Paragraph type="secondary">
            Enter your Email Address and Password to login
          </Typography.Paragraph>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder="abc@example.com" type="email" allowClear />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input type="password" allowClear />
          </Form.Item>

          <RightAction>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!email || !password}
            >
              Login
            </Button>
          </RightAction>
        </Form>
      </CardStyle>
    </Wrapper>
  );
});

export default LoginPage;
