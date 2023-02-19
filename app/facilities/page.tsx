import { FacilityTypeEnum } from '@enums';
import { FacilityList } from '@components/FacilityList';

export default async function Facilities() {
  const facilitiesResp = await fetch(
    `http://localhost:3000/api/facilities?type=${FacilityTypeEnum.Facility}`
  );
  const facilities: FacilityItem[] = await facilitiesResp.json();

  return (
    <>
      <FacilityList heading="Facilities" data={facilities} />
    </>
  );
}
