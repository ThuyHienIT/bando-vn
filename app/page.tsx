import { FacilityList } from '@components/FacilityList';
import { BasicLayout } from '@components/Layout/Layout';
import { FacilityTypeEnum } from '@enums';
import { facilityModel } from '@models/facility';

import WithUserProvider from './(server)/WithUserProvider';
import styles from './page.module.css';

async function Home() {
  const rooms = await facilityModel.loadFacilities(FacilityTypeEnum.Room);
  const facilities = await facilityModel.loadFacilities(
    FacilityTypeEnum.Facility
  );

  return (
    <WithUserProvider>
      <BasicLayout>
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
      </BasicLayout>
    </WithUserProvider>
  );
}

export default Home;
