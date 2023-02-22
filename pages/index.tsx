import { NextPage } from 'next';
import Head from 'next/head';

import HomePage from '@pages/HomePage';

interface Props {
  rooms?: FacilityItem[];
  facilities?: FacilityItem[];
}

const NextAppsPage: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <HomePage />
    </>
  );
};

NextAppsPage.getInitialProps = async () => {
  // const roomsResp = await fetch(
  //   `http://localhost:3000/api/facilities?type=${FacilityTypeEnum.Room}`
  // );
  // const rooms: FacilityItem[] = await roomsResp.json();

  // const facilitiesResp = await fetch(
  //   `http://localhost:3000/api/facilities?type=${FacilityTypeEnum.Facility}`
  // );
  // const facilities: FacilityItem[] = await facilitiesResp.json();

  // console.log('rooms', rooms);
  return {
    rooms: [],
    facilities: [],
  };
};

export default NextAppsPage;
