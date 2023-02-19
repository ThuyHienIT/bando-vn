import { FacilityTypeEnum } from '@enums';
import { FacilityList } from '@components/FacilityList';

export default async function Rooms() {
  const roomsResp = await fetch(
    `http://localhost:3000/api/facilities?type=${FacilityTypeEnum.Room}`
  );
  const rooms: FacilityItem[] = await roomsResp.json();

  return (
    <>
      <FacilityList heading="Rooms" data={rooms} />
    </>
  );
}
