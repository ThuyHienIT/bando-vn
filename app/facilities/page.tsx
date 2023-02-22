import { FacilityList } from '@components/FacilityList';
import { FacilityTypeEnum } from '@enums';
import { facilityModel } from '@models/facility';

export default async function Facilities() {
  const facilities = await facilityModel.loadFacilities(
    FacilityTypeEnum.Facility
  );

  return (
    <>
      <FacilityList heading="Facilities" data={facilities} />
    </>
  );
}
