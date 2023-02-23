'use client';
import { Button, Card, Form, Input, notification, Typography } from 'antd';
import request from 'app/(client)/lib/request';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

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

export const LoginForm = memo(function LoginForm(props: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const email = Form.useWatch('email', form);
  const password = Form.useWatch('password', form);
  const [api, contextHandler] = notification.useNotification();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (values: { email: string; password: string }) => {
      try {
        setLoading(true);
        await request('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        router.push('/');
      } catch (e: any) {
        api.error({ message: e.message });
      } finally {
        setLoading(false);
      }
    },
    [api, router]
  );

  return (
    <Wrapper>
      {contextHandler}
      <CardStyle>
        <Logo>
          <Image
            src="/logo.png"
            alt="Facility Booking"
            width={50}
            height={50}
          />
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            Facility Booking
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

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={!email || !password}
          >
            Login
          </Button>
        </Form>
      </CardStyle>
    </Wrapper>
  );
});
