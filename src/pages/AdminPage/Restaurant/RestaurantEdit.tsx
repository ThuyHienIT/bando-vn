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
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { BasicLayout } from '@components/Layout/Layout';
import { MiniMapParams } from '@components/MiniMap';
import { MiniMapRenderer } from '@components/MiniMapRender';
import request from '@lib/request';
import { getLatLong } from '@utils/common';

interface Props {
  data?: CompanyType;
}

const RightAction = styled.div`
  text-align: right;
`;
type CompanyFormType = CompanyType & { lat: string; long: string };
export const RestaurantEdit = memo<Props>((props) => {
  const [form] = Form.useForm<CompanyFormType>();
  const watchLat = Form.useWatch('lat', form);
  const watchLong = Form.useWatch('long', form);

  const [loading, setLoading] = useState(false);
  const mapRef = useRef<MiniMapParams>();

  const handleFinish = useCallback(
    async (values: CompanyFormType) => {
      const { lat, long, ...d } = values;
      d.geometry = `(${lat}, ${long})`;

      try {
        setLoading(true);
        const resp = await request(`/api/company/${props.data?.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            ...d,
            id: props.data?.id ?? '',
          }),
        });

        notification.success({ message: 'Update success' });
      } catch (e: any) {
        notification.error(e.message);
      } finally {
        setLoading(false);
      }
    },
    [props.data?.id]
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
        Restaurants
      </Typography.Title>
      <Card>
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
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>

              <Form.Item label="Sypnosis" name="synopsis">
                <Input.TextArea />
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

              <Form.Item>
                <Space align="center">
                  <Form.Item label="Lattitue" name="lat">
                    <InputNumber />
                  </Form.Item>
                  <span>-</span>
                  <Form.Item label="Longtitue" name="long">
                    <InputNumber />
                  </Form.Item>
                </Space>
              </Form.Item>

              <RightAction>
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
