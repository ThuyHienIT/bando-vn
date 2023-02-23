import { FacilityList } from '@components/FacilityList';
import { FacilityTypeEnum } from '@enums';
import { facilityModel } from '@models/facility';

export default async function Rooms() {
  const rooms = await facilityModel.loadFacilities(FacilityTypeEnum.Room);

  return <FacilityList heading="Rooms" data={rooms} />;
}

export const metadata = {
  title: 'Rooms',
};
