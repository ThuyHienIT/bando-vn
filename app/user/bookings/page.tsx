import { getUser } from 'app/(server)/cookies-helper';
import { notFound } from 'next/navigation';

import { FacilityTypeEnum } from '@enums';
import { userModel } from '@models/user';

import { PageContent } from './PageContent';

export default async function Home() {
  const user = getUser();

  if (!user || !user.email) return notFound();

  console.log('user', user);
  const rooms = (await userModel.loadBookings(
    user.email,
    FacilityTypeEnum.Room
  )) as BookingItem[];

  const facilities = (await userModel.loadBookings(
    user.email,
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
