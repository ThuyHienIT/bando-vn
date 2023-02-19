'use client';

import { FacilityTypeEnum } from '@enums';
import { FacilityList } from '@components/FacilityList';
import styles from './page.module.css';
import { BookingList } from '@components/BookingList';
import { memo } from 'react';
import { Typography } from 'antd';

interface Props {
  bookedRooms: BookingItem[];
  bookedFacilities: BookingItem[];
}
export const PageContent = memo<Props>(function PageContent(props) {
  return (
    <>
      <Typography.Title style={{ marginTop: 32 }} level={3}>
        Your Bookings
      </Typography.Title>

      <BookingList heading="Rooms" data={props.bookedRooms} max={4} viewAllLink="/rooms" />

      <BookingList
        className={styles.list}
        heading="Facilities"
        data={props.bookedFacilities}
        max={4}
        viewAllLink="/facilities"
      />
    </>
  );
});
