import { FacilityTypeEnum } from '@enums';
import { userModel } from '@models/user';

import { PageContent } from './PageContent';

export default async function Home() {
  const rooms = (await userModel.loadBookings(
    'kqthang1505@gmail.com',
    FacilityTypeEnum.Room
  )) as BookingItem[];

  const facilities = (await userModel.loadBookings(
    'kqthang1505@gmail.com',
    FacilityTypeEnum.Facility
  )) as BookingItem[];

  return (
    <>
      <PageContent bookedFacilities={facilities} bookedRooms={rooms} />
    </>
  );
}

export const metadata = {
  title: 'Your Bookings',
};
