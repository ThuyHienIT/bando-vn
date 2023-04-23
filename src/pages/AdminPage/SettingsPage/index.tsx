import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  notification,
  Typography
} from 'antd';
import { useRouter } from 'next/router';
import { userInfo } from 'os';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { SaveOutlined } from '@ant-design/icons';
import { BasicLayout } from '@components/Layout/Layout';
import request from '@lib/request';
import { userInfoState } from '@recoil/user';

interface Props {
  user: UserInfo;
}

const RightAction = styled.div`
  text-align: right;
`;

const SettingsPage = memo<Props>((props) => {
  const router = useRouter();

  const [form] = Form.useForm<UserInfo>();

  const [loading, setLoading] = useState(false);
  const [userInfo, updateUserInfo] = useRecoilState(userInfoState);

  const isUpdate = useMemo(() => Boolean(props.user?.id), [props.user?.id]);
  const type = useMemo(() => router.query.type as string, [router.query.type]);

  const handleFinish = useCallback(
    async (values: UserInfo) => {
      try {
        setLoading(true);
        const url = isUpdate ? `/api/user/${props.user?.id}` : '/api/user';
        const resp: UserInfo = await request(url, {
          method: isUpdate ? 'PUT' : 'POST',
          body: JSON.stringify({
            ...values,
            id: props.user?.id ?? '',
          }),
        });

        updateUserInfo({ ...userInfo, ...resp });
        notification.success({
          message: isUpdate ? 'Update success' : 'Add Success',
        });
      } catch (e: any) {
        notification.error({ message: e.message });
      } finally {
        setLoading(false);
      }
    },
    [isUpdate, props.user?.id, updateUserInfo, userInfo]
  );

  useEffect(() => {
    if (!form.isFieldsTouched() && props.user) {
      form.setFieldsValue(props.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  return (
    <BasicLayout>
      <Typography.Title level={4} style={{ marginTop: 32 }}>
        Update Profile
      </Typography.Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          initialValues={props.user}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input autoComplete="off" readOnly />
          </Form.Item>

          <Form.Item
            label={isUpdate ? 'New Password' : 'Default Password'}
            name="password"
            rules={[{ required: !isUpdate }]}
          >
            <Input type="password" autoComplete="off" />
          </Form.Item>

          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Input readOnly />
          </Form.Item>

          <Divider />

          <RightAction>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              Update
            </Button>
          </RightAction>
        </Form>
      </Card>
    </BasicLayout>
  );
});

export default SettingsPage;
