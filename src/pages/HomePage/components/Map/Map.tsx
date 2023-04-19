import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { LoadingOutlined } from '@ant-design/icons';
import esriConfig from '@arcgis/core/config';
import Point from '@arcgis/core/geometry/Point.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Zoom from '@arcgis/core/widgets/Zoom';
import { Overlay } from '@components/Overlay';
import { activeItemIdState, activeItemState } from '@recoil/common';

import { config } from './config';
import { getCityGraphic } from './places';

const MapStyle = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MapComp = memo(() => {
  const mapElRef = useRef<HTMLDivElement>();
  const [loading, setLoading] = useState(false);
  const setActiveItemId = useSetRecoilState(activeItemIdState);
  const activeItem = useRecoilValue(activeItemState);
  const viewRef = useRef<MapView>();
  const mapRef = useRef<Map>();
  const graphicLayerRef = useRef<GraphicsLayer>();

  const handleClick = useCallback(() => {
    setActiveItemId('');
  }, [setActiveItemId]);

  useEffect(() => {
    if (mapElRef.current) {
      setLoading(true);

      esriConfig.apiKey = config.key;

      const map = new Map({
        basemap: 'arcgis-navigation',
      });

      const view = new MapView({
        map: map,
        center: [108.805, 14.027],
        zoom: 5,
        background: { color: '#a7d6fe' },
        container: mapElRef.current,
        popup: {
          dockEnabled: false,
          dockOptions: {
            buttonEnabled: true,
            breakpoint: false,
          },
        },

        ui: {
          components: [],
        },
      });

      let zoom = new Zoom({ view: view });

      view.ui.add(zoom, {
        position: 'bottom-right',
      });

      view.when().then(() => {
        setLoading(false);
      });

      view.on('click', handleClick);

      const graphicLayer = new GraphicsLayer({});
      map.add(graphicLayer);

      viewRef.current = view;
      mapRef.current = map;

      graphicLayerRef.current = graphicLayer;
    }
  }, [handleClick]);

  useEffect(() => {
    if (!activeItem?.geometry) return;

    const geoStr = activeItem?.geometry;
    let [lat, long] = geoStr.match(/[-+]?[0-9]*\.?[0-9]+/g) ?? [];

    if (!lat || !long) return;

    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    const point = new Point({
      latitude,
      longitude,
    });

    const graphics = getCityGraphic({
      lat: latitude,
      long: longitude,
      name: activeItem.name,
      content: '',
    });

    const graphicLayer = graphicLayerRef.current;
    graphicLayer?.addMany(graphics);
    viewRef.current?.goTo(point);

    return () => {
      graphicLayer?.removeMany(graphics);
    };
  }, [activeItem?.geometry]);

  return (
    <>
      {loading && (
        <Overlay>
          <LoadingOutlined />
        </Overlay>
      )}
      <MapStyle ref={mapElRef as any}></MapStyle>
    </>
  );
});

export default MapComp;
