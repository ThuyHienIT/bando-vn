import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Popconfirm,
  Row,
  Typography
} from 'antd';
import moment, { Moment } from 'moment';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { BasicLayout } from '@components/Layout/Layout';
import { UploadImage } from '@components/UploadImage';
import request from '@lib/request';
import { notify } from '@utils/common';

import { CompanySearch } from './CompanySearch';

interface Props {
  data?: TourDetailsType;
  isAdd?: boolean;
  extra?: React.ReactNode;
}

const RightAction = styled.div`
  text-align: right;
`;
type CompanyFormType = Omit<TourDetailsType, 'start_date' | 'end_date'> & {
  start_date: Moment;
  end_date: Moment;
};

export const TourEdit = memo<Props>((props) => {
  const router = useRouter();
  const [form] = Form.useForm<CompanyFormType>();
  const [loading, setLoading] = useState(false);
  const isUpdate = useMemo(() => Boolean(props.data?.id), [props.data?.id]);

  const handleFinish = useCallback(
    async (values: CompanyFormType) => {
      try {
        setLoading(true);
        const url = isUpdate ? `/api/tour/${props.data?.id}` : '/api/tour';
        await request(url, {
          method: isUpdate ? 'PUT' : 'POST',
          body: JSON.stringify({
            ...values,
            id: props.data?.id ?? '',
          }),
        });

        notify.success(isUpdate ? 'Update success' : 'Add Success');
        router.push(`/admin/tour`);
      } catch (e: any) {
        notify.error(e.message);
      } finally {
        setLoading(false);
      }
    },
    [isUpdate, props.data?.id, router]
  );

  const handleDelete = useCallback(async () => {
    try {
      await request(`/api/tour/${props.data?.id}`, {
        method: 'DELETE',
      });

      notification.success({ message: 'Delete success' });
    } catch (e: any) {
      notification.error(e.message);
    } finally {
    }
  }, [props.data?.id]);

  const handleSelectCompany = useCallback(
    (id: string) => {
      form.setFieldValue('company_id', id);
    },
    [form]
  );

  useEffect(() => {
    if (!form.isFieldsTouched() && props.data) {
      form.setFieldsValue({
        ...props.data,
        start_date: moment(props.data.start_date),
        end_date: moment(props.data.end_date),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  console.log('data form form', props.data);

  return (
    <BasicLayout>
      <Typography.Title level={3} style={{ marginTop: 50 }}>
        {isUpdate ? `Edit: ${props.data?.name}` : `Add Tour`}
      </Typography.Title>
      <Card style={{ marginBottom: 32 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form
              form={form}
              layout="vertical"
              name="basic"
              onFinish={handleFinish}
              autoComplete="off"
            >
              <Form.Item hidden name="company_id">
                <Input type="hidden" />
              </Form.Item>

              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                label="Website"
                name="url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Start date"
                name="start_date"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="End date"
                name="end_date"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>

              <label htmlFor="" className="ant-form-item-label">
                <span>Photos</span>
                <br />
                <Typography.Text italic type="secondary">
                  Please upload photo with ratio 5:2
                </Typography.Text>
              </label>

              <Form.Item name="photos">
                <UploadImage />
              </Form.Item>
              <Divider />

              <RightAction>
                {isUpdate && (
                  <Popconfirm
                    placement="top"
                    title="Are you sure you want to delete this item?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ danger: true }}
                  >
                    <Button danger type="text" icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm>
                )}

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
          </Col>
          <Col span={12}>
            <Typography.Paragraph style={{ marginBottom: 8 }}>
              Company Agency
            </Typography.Paragraph>
            <CompanySearch
              defaultValue={props.data?.company}
              onSelect={handleSelectCompany}
            />
          </Col>
        </Row>
      </Card>
    </BasicLayout>
  );
});
