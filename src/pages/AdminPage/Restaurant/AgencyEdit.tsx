import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Typography
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { memo, useCallback, useMemo, useState } from 'react';

import { UploadImage } from '@components/UploadImage';
import request from '@lib/request';

import { RestaurantEdit } from './RestaurantEdit';

interface Props {
  data?: CompanyType;
  isAdd?: boolean;
}

export const AgencyEdit = memo<Props>((props) => {
  const extra = useMemo(() => {
    return (
      <>
        <Form.Item name="tours" label="Tour">
          <TourInput />
        </Form.Item>
      </>
    );
  }, []);

  return (
    <>
      <RestaurantEdit isAdd={props.isAdd} extra={extra} />
    </>
  );
});

interface Props {
  value?: string[];
  onChange?(tourIds: string[]): void;
}
const TourInput = memo<Props>(({ onChange, ...props }) => {
  const [form] = Form.useForm<TourDetailsType>();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTour, setActiveTour] = useState<TourDetailsType>();

  const isUpdate = useMemo(() => Boolean(activeTour?.id), [activeTour?.id]);

  const toggleModal = useCallback(() => {
    setOpened((o) => !o);
  }, []);

  const handleOk = useCallback(() => {
    form.submit();
  }, [form]);

  const handleFinish = useCallback(
    async (values: TourDetailsType) => {
      try {
        setLoading(true);
        const url = isUpdate
          ? `/api/company/${activeTour?.id}`
          : '/api/company';
        const updatedTour: TourDetailsType = await request(url, {
          method: isUpdate ? 'PUT' : 'POST',
          body: JSON.stringify({
            ...values,
            id: props.data?.id ?? '',
            type: 'tour',
          }),
        });

        notification.success({
          message: isUpdate ? 'Update success' : 'Add Success',
        });

        onChange?.([...(props.value ?? []), updatedTour.id]);
      } catch (e: any) {
        notification.error(e.message);
      } finally {
        setLoading(false);
      }
    },
    [activeTour?.id, isUpdate, onChange, props.data?.id, props.value]
  );

  return (
    <>
      <Button onClick={toggleModal}>Add</Button>

      <Modal
        open={opened}
        title="Add Tour"
        onOk={handleOk}
        destroyOnClose
        okButtonProps={{ loading }}
      >
        <Form
          id="add-tour-modal"
          form={form}
          layout="vertical"
          name="basic"
          // initialValues={props.data}
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

          <Form.Item label="Website" name="url" rules={[{ required: true }]}>
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

          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
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
        </Form>
      </Modal>
    </>
  );
});
