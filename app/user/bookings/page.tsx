import { FacilityTypeEnum } from '@enums';
import { PageContent } from './PageContent';

export default async function Home() {
  const roomsResp = await fetch(
    `http://localhost:3000/api/user/bookings?type=${FacilityTypeEnum.Room}&email=kqthang1505@gmail.com`
  );
  const rooms: BookingItem[] = await roomsResp.json();

  const facilitiesResp = await fetch(
    `http://localhost:3000/api/user/bookings?type=${FacilityTypeEnum.Facility}&email=kqthang1505@gmail.com`
  );
  const facilities: BookingItem[] = await facilitiesResp.json();

  return (
    <>
      <PageContent bookedFacilities={facilities} bookedRooms={rooms} />
    </>
  );
}
