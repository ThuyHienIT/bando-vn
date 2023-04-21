import { Button, Card, Form, Input, InputNumber, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { memo, useCallback } from 'react';

import { BasicLayout } from '@components/Layout/Layout';

export const RestaurantPage = memo(() => {
  const [form] = Form.useForm<CompanyType>();
  const handleFinish = useCallback(() => {}, []);

  return (
    <BasicLayout>
      <Typography.Title level={3} style={{ marginTop: 50 }}>
        Restaurants
      </Typography.Title>
      <Card>
        <Form
          layout="vertical"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Sypnosis" name="synopsis">
            <Input />
          </Form.Item>

          <Form.Item label="Website" name="url">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item label="Phone number" name="tel">
            <Input />
          </Form.Item>

          <Form.Item label="Phone number" name="tel">
            <Input />
          </Form.Item>

          <Form.Item label="inline" style={{ marginBottom: 0 }}>
            <Form.Item
              label="Lattitue"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <InputNumber />
            </Form.Item>
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                lineHeight: '32px',
                textAlign: 'center',
              }}
            >
              -
            </span>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <InputNumber />
            </Form.Item>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </BasicLayout>
  );
});
