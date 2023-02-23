'use client';

import {
  Button,
  DatePicker,
  Form,
  Modal,
  notification,
  TimePicker
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import request from 'app/(client)/lib/request';
import { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ExclamationCircleFilled } from '@ant-design/icons';

const Inputs = styled(Form.Item)`
  .ant-form-item-control-input-content {
    display: flex;
    gap: 8px;
  }
`;

interface Props {
  className?: string;
  from?: Dayjs;
  to?: Dayjs;
  data?: FacilityItem;
  opened: boolean;
  isUpdate?: boolean;
  bookingId?: string;
  onClose(): void;
  onDone?(item?: BookingItem): void;
  onCancelled?(bookingId?: string): void;
}

type FormValues = {
  date: Dayjs;
  from: Dayjs;
  to: Dayjs;
};
export function BookingModal({
  onClose,
  onDone,
  onCancelled,
  ...props
}: Props) {
  const [form] = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        setLoading(true);

        const date = values.date
          .clone()
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0);

        const url = props.isUpdate
          ? '/api/booking/update'
          : '/api/facility/reserve';

        const resp = await request(url, {
          method: 'POST',
          body: JSON.stringify({
            facilityId: props.data?.id,
            from: date
              .clone()
              .add(values.from.get('hour'), 'hour')
              .add(values.from.get('minute'), 'minute'),
            to: date
              .clone()
              .add(values.to.get('hour'), 'hour')
              .add(values.to.get('minute'), 'minute'),
            userEmail: 'kqthang1505@gmail.com',
            ...(props.bookingId ? { id: props.bookingId } : {}),
          }),
        });

        api.success({
          message: props.isUpdate
            ? 'Update booking successful'
            : `Reserve a slot on ${values.date.format(
                'DD MMM YYYY'
              )}, from ${values.from.format('HH:mm')} - to ${values.to.format(
                'HH:mm'
              )} successfully`,
        });
        onDone?.(resp);
      } catch (e: any) {
        console.log('e', e);
        api.error({ message: e.message });
      } finally {
        setLoading(false);
      }
    },
    [props.isUpdate, props.data?.id, props.bookingId, api, onDone]
  );

  const handleOK = useCallback(() => {
    form.submit();
  }, [form]);

  const cancelBooking = useCallback(() => {
    Modal.confirm({
      title: `Cancel your booking`,
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to cancel your booking of ${props.data?.name}?`,
      onOk: async () => {
        try {
          await request(`/api/booking/cancel/${props.bookingId}`);
          api.success({ message: 'Cancel booking successful' });

          onCancelled?.(props.bookingId);
        } catch (e: any) {}
      },
      onCancel() {},
      okText: 'Yes',
      cancelText: 'No',
    });
  }, [api, onCancelled, props.bookingId, props.data?.name]);

  const handleCancel = useCallback(() => {
    if (!props.isUpdate) {
      onClose();
      return;
    }

    if (props.data) cancelBooking();
  }, [cancelBooking, onClose, props.data, props.isUpdate]);

  useEffect(() => {
    if (props.opened)
      form.setFieldsValue({ from: props.from, to: props.to, date: props.from });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.opened]);

  return (
    <>
      {contextHolder}
      <Modal
        rootClassName="booking-modal"
        open={props.opened}
        onCancel={onClose}
        title={`Booking this slot of ${props.data?.name}`}
        destroyOnClose
        footer={
          <>
            <Button
              data-testid="booking-modal-cancel-btn"
              className="confirm-modal-no-btn"
              onClick={props.isUpdate ? handleCancel : onClose}
            >
              {props.isUpdate ? 'Cancel this booking' : 'Cancel'}
            </Button>
            <Button
              data-testid="booking-modal-yes-btn"
              type="primary"
              onClick={handleOK}
              loading={loading}
            >
              {props.isUpdate ? 'Update' : 'Book'}
            </Button>
          </>
        }
      >
        <Form
          data-testid="booking-form"
          form={form}
          initialValues={{
            from: props.from,
            to: props.to,
            date: props.from,
          }}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Inputs label="Date" style={{ gap: 8 }}>
            <Form.Item name="date" noStyle rules={[{ required: true }]}>
              <DatePicker showToday={false} />
            </Form.Item>
            <Form.Item name="from" noStyle rules={[{ required: true }]}>
              <TimePicker showSecond={false} format="HH:mm" showNow={false} />
            </Form.Item>
            <Form.Item name="to" noStyle rules={[{ required: true }]}>
              <TimePicker
                showSecond={false}
                format="HH:mm"
                showNow={false}
                use12Hours={false}
              />
            </Form.Item>
          </Inputs>
        </Form>
      </Modal>
    </>
  );
}
