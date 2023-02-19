import { FacilityTypeEnum } from '@enums';
import { FacilityList } from '@components/FacilityList';
import styles from './page.module.css';

export default async function Home() {
  const roomsResp = await fetch(
    `http://localhost:3000/api/facilities?type=${FacilityTypeEnum.Room}`
  );
  const rooms: FacilityItem[] = await roomsResp.json();

  const facilitiesResp = await fetch(
    `http://localhost:3000/api/facilities?type=${FacilityTypeEnum.Facility}`
  );
  const facilities: FacilityItem[] = await facilitiesResp.json();

  return (
    <>
      <FacilityList heading="Rooms" data={rooms} max={4} viewAllLink="/rooms" />

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
