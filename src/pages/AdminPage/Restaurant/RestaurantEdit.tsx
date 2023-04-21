import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Popconfirm,
  Row,
  Space,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { BasicLayout } from '@components/Layout/Layout';
import { MiniMapParams } from '@components/MiniMap';
import { MiniMapRenderer } from '@components/MiniMapRender';
import { UploadImage } from '@components/UploadImage';
import request from '@lib/request';
import { getLatLong } from '@utils/common';

import { HeadingMapping } from './config';

interface Props {
  data?: CompanyType;
  isAdd?: boolean;
}

const RightAction = styled.div`
  text-align: right;
`;
type CompanyFormType = CompanyType & { lat: string; long: string };
export const RestaurantEdit = memo<Props>((props) => {
  const router = useRouter();

  const [form] = Form.useForm<CompanyFormType>();
  const watchLat = Form.useWatch('lat', form);
  const watchLong = Form.useWatch('long', form);

  const [loading, setLoading] = useState(false);
  const mapRef = useRef<MiniMapParams>();

  const isUpdate = useMemo(() => Boolean(props.data?.id), [props.data?.id]);
  const type = useMemo(() => router.query.type as string, [router.query.type]);

  const handleFinish = useCallback(
    async (values: CompanyFormType) => {
      const { lat, long, ...d } = values;
      d.geometry = `(${lat}, ${long})`;

      try {
        setLoading(true);
        const url = isUpdate
          ? `/api/company/${props.data?.id}`
          : '/api/company';
        await request(url, {
          method: isUpdate ? 'PUT' : 'POST',
          body: JSON.stringify({
            ...d,
            id: props.data?.id ?? '',
            type,
          }),
        });

        notification.success({
          message: isUpdate ? 'Update success' : 'Add Success',
        });
        router.push(`/admin/${type}`);
      } catch (e: any) {
        notification.error(e.message);
      } finally {
        setLoading(false);
      }
    },
    [isUpdate, props.data?.id, router, type]
  );

  const handleOnLoad = useCallback(() => {
    const [lat, long] = getLatLong(props.data?.geometry);
    mapRef.current?.goTo(lat, long);
  }, [props.data?.geometry]);

  const handleDelete = useCallback(async () => {
    try {
      await request(`/api/company/${props.data?.id}`, {
        method: 'DELETE',
      });

      notification.success({ message: 'Delete success' });
    } catch (e: any) {
      notification.error(e.message);
    } finally {
    }
  }, [props.data?.id]);

  useEffect(() => {
    if (!form.isFieldsTouched() && props.data) {
      form.setFieldsValue(props.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  useEffect(() => {
    if (props.data?.geometry) {
      let [lat, long] = getLatLong(props.data.geometry);

      form.setFieldValue('lat', lat);
      form.setFieldValue('long', long);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data?.geometry]);

  useEffect(() => {
    if (!watchLat || !watchLong) return;
    mapRef.current?.goTo?.(parseFloat(watchLat), parseFloat(watchLong));
  }, [watchLat, watchLong]);

  return (
    <BasicLayout>
      <Typography.Title level={3} style={{ marginTop: 50 }}>
        {isUpdate
          ? `Edit: ${props.data?.name}`
          : `Add ${HeadingMapping[type] ?? type}`}
      </Typography.Title>
      <Card style={{ marginBottom: 32 }}>
        <Row gutter={16}>
          <Col span={12}>
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

              <Form.Item
                label="Sypnosis"
                name="synopsis"
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
                label="Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone number"
                name="tel"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Space align="center">
                  <Form.Item
                    label="Lattitue"
                    name="lat"
                    rules={[{ required: true }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <span>-</span>
                  <Form.Item
                    label="Longtitue"
                    name="long"
                    rules={[{ required: true }]}
                  >
                    <InputNumber />
                  </Form.Item>
                </Space>
              </Form.Item>

              <Form.Item label="Photos" name="photos">
                <UploadImage />
              </Form.Item>

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
                    <Button danger type="text">
                      Delete
                    </Button>
                  </Popconfirm>
                )}

                <Button loading={loading} type="primary" htmlType="submit">
                  Submit
                </Button>
              </RightAction>
            </Form>
          </Col>
          <Col span={12}>
            <Typography.Paragraph>Location</Typography.Paragraph>
            <div style={{ height: 400 }}>
              <MiniMapRenderer ref={mapRef as any} onLoad={handleOnLoad} />
            </div>
          </Col>
        </Row>
      </Card>
    </BasicLayout>
  );
});
