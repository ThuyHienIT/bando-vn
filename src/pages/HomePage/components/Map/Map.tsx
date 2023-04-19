import { memo, useRef, useState } from 'react';
import styled from 'styled-components';

// import { config } from './config';

const MapStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('https://picsum.photos/1024/768');
  background-size: cover;
`;

const MapComp = memo(() => {
  const mapRef = useRef<HTMLDivElement>();
  const [loading, setLoading] = useState(false);
  // const activeItem = useRecoilValue(activeItemState);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     setLoading(true);

  //     esriConfig.apiKey = config.key;

  //     const map = new Map({
  //       basemap: 'arcgis-navigation',
  //     });

  //     const view = new MapView({
  //       map: map,
  //       center: [108.805, 14.027],
  //       zoom: 5,
  //       container: mapRef.current,
  //       popup: {
  //         dockEnabled: false,
  //         dockOptions: {
  //           buttonEnabled: true,
  //           breakpoint: false,
  //         },
  //       },
  //     });

  //     view.when().then(() => {
  //       setLoading(false);
  //     });
  //   }
  // }, []);

  return <MapStyle ref={mapRef as any}></MapStyle>;
});

export default MapComp;
