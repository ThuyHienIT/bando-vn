import { Button, Divider, Form, Input, notification, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { SaveOutlined } from '@ant-design/icons';
import request from '@lib/request';

interface Props {
  data?: UserInfo;
  onSubmitted?(): void;
}

const RightAction = styled.div`
  text-align: right;
`;

export const AddForm = memo<Props>(({ onSubmitted, ...props }) => {
  const router = useRouter();

  const [form] = Form.useForm<UserInfo>();

  const [loading, setLoading] = useState(false);

  const isUpdate = useMemo(() => Boolean(props.data?.id), [props.data?.id]);
  const type = useMemo(() => router.query.type as string, [router.query.type]);

  const handleFinish = useCallback(
    async (values: UserInfo) => {
      try {
        setLoading(true);
        const url = isUpdate ? `/api/user/${props.data?.id}` : '/api/user';
        await request(url, {
          method: isUpdate ? 'PUT' : 'POST',
          body: JSON.stringify({
            ...values,
            id: props.data?.id ?? '',
          }),
        });

        notification.success({
          message: isUpdate ? 'Update success' : 'Add Success',
        });
        onSubmitted?.();
      } catch (e: any) {
        notification.error(e.message);
      } finally {
        setLoading(false);
      }
    },
    [isUpdate, onSubmitted, props.data?.id]
  );

  useEffect(() => {
    if (!form.isFieldsTouched() && props.data) {
      form.setFieldsValue(props.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      initialValues={props.data}
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label="Default Password"
        name="password"
        rules={[{ required: true }]}
      >
        <Input type="password" autoComplete="off" />
      </Form.Item>

      <Form.Item label="Role" name="role" rules={[{ required: true }]}>
        <Select
          options={[
            { value: 'admin', label: 'Admin' },
            {
              label: 'Moderator',
              value: 'moderator',
            },
          ]}
        />
      </Form.Item>

      <Divider />

      <RightAction>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
        >
          Submit
        </Button>
      </RightAction>
    </Form>
  );
});
