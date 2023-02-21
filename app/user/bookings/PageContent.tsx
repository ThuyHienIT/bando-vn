'use client';

import { Modal, notification, Typography } from 'antd';
import { BookingModal } from 'app/facility/[id]/components/BookingModal';
import request from 'app/lib/request';
import dayjs from 'dayjs';
import { memo, useCallback, useState } from 'react';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { BookingList } from '@components/BookingList';
import { FacilityTypeEnum } from '@enums';

import styles from './page.module.css';

interface Props {
  bookedRooms: BookingItem[];
  bookedFacilities: BookingItem[];
}
export const PageContent = memo<Props>(function PageContent(props) {
  const [rooms, setRooms] = useState(props.bookedRooms);
  const [facilities, setFacilities] = useState(props.bookedFacilities);
  const [api, contextHandler] = notification.useNotification();

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingItem>();

  const handleCancelBooking = useCallback(
    (data: BookingItem) => {
      Modal.confirm({
        title: `Cancel your booking`,
        icon: <ExclamationCircleFilled />,
        content: `Are you sure you want to cancel your booking of ${data.facility?.name}?`,
        onOk: async () => {
          try {
            await request(`/api/booking/cancel/${data.id}`);
            api.success({ message: 'Cancel booking successful' });

            switch (data.facility?.type) {
              case FacilityTypeEnum.Room:
                setRooms((rooms) => rooms.filter((r) => r.id !== data.id));
                break;
              case FacilityTypeEnum.Facility:
                setFacilities((facilities) =>
                  facilities.filter((r) => r.id !== data.id)
                );
                break;
            }
          } catch (e: any) {
            api.error({ message: e.message });
          }
        },
        onCancel() {},
        okText: 'Yes',
        cancelText: 'No',
      });
    },
    [api]
  );

  const handleCloseModal = useCallback(() => {
    setShowEditModal(false);
  }, []);

  const handleUpdated = useCallback(
    (data: BookingItem) => {
      switch (data.facility?.type) {
        case FacilityTypeEnum.Room:
          setRooms((rooms) => {
            const idx = rooms.findIndex((r) => r.id == data.id);
            rooms.splice(idx, 1, data);

            return rooms;
          });
          break;
        case FacilityTypeEnum.Facility:
          setFacilities((facilities) => {
            const idx = facilities.findIndex((r) => r.id == data.id);
            facilities.splice(idx, 1, data);

            return facilities;
          });
          break;
      }

      handleCloseModal();
    },
    [handleCloseModal]
  );

  const handleEditBooking = useCallback((data: BookingItem) => {
    setEditingBooking(data);
    setShowEditModal(true);
  }, []);

  return (
    <>
      {contextHandler}
      <Typography.Title style={{ marginTop: 32 }} level={3}>
        Your Bookings
      </Typography.Title>

      <BookingList
        heading="Rooms"
        data={rooms}
        viewAllLink="/rooms"
        onCancel={handleCancelBooking}
        onEdit={handleEditBooking}
      />

      <BookingList
        className={styles.list}
        heading="Facilities"
        data={facilities}
        viewAllLink="/facilities"
        onCancel={handleCancelBooking}
        onEdit={handleEditBooking}
      />

      <BookingModal
        opened={showEditModal}
        from={dayjs(editingBooking?.from)}
        to={dayjs(editingBooking?.to)}
        data={editingBooking?.facility}
        bookingId={editingBooking?.id}
        onClose={handleCloseModal}
        onDone={handleUpdated}
        isUpdate
      />
    </>
  );
});
