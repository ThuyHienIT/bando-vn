import { FacilityList } from '@components/FacilityList';
import { FacilityTypeEnum } from '@enums';
import { facilityModel } from '@models/facility';

import styles from './page.module.css';

export default async function Home() {
  const rooms = await facilityModel.loadFacilities(FacilityTypeEnum.Room);
  const facilities = await facilityModel.loadFacilities(FacilityTypeEnum.Room);

  return (
    <>
      <FacilityList
        className={styles.list}
        heading="Rooms"
        data={rooms}
        max={4}
        viewAllLink="/rooms"
      />

      <FacilityList
        className={styles.list}
        heading="Facilities"
        data={facilities}
        max={4}
        viewAllLink="/facilities"
      />
    </>
  );
}
