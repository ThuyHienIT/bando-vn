import {
  ForwardedRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { LoadingOutlined } from '@ant-design/icons';
import esriConfig from '@arcgis/core/config';
import Point from '@arcgis/core/geometry/Point.js';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Overlay } from '@components/Overlay';
import { appconfig } from '@lib/appconfig';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export interface MiniMapParams {
  goTo(lat: number, long: number): void;
}

export interface MiniMapProps {
  forwardedRef: ForwardedRef<MiniMapParams>;
  onLoad?(): void;
}
const MiniMap = memo<MiniMapProps>(({ onLoad, ...props }) => {
  const mapElRef = useRef<HTMLDivElement>();
  const viewRef = useRef<MapView>();
  const graphicLayerRef = useRef<GraphicsLayer>();

  const [loading, setLoading] = useState(false);

  useImperativeHandle(props.forwardedRef, () => ({
    goTo: (latitude, longitude) => {
      const point = new Point({
        latitude,
        longitude,
      });

      let foundPin = null;
      graphicLayerRef.current?.graphics.forEach((graphic) => {
        const symbol = graphic.symbol;
        if (symbol.type === 'picture-marker') {
          foundPin = graphic;
        }
      });

      if (foundPin) {
        graphicLayerRef.current?.graphics.remove(foundPin);
      }

      const pin = getPinByPoint(latitude, longitude);
      graphicLayerRef.current?.add(pin);

      viewRef.current?.goTo(point, {
        animate: true,
        duration: 100,
        easing: 'ease',
      });
    },
  }));

  useEffect(() => {
    if (mapElRef.current && appconfig.erisKey) {
      setLoading(true);

      esriConfig.apiKey = appconfig.erisKey;

      const map = new Map({ basemap: 'arcgis-navigation' });

      const view = new MapView({
        map: map,
        center: [108.805, 14.027],
        zoom: 17,
        background: { color: '#a7d6fe' },
        container: mapElRef.current,
      });

      view.when().then(() => {
        setLoading(false);
        onLoad?.();
      });

      const graphicLayer = new GraphicsLayer();
      map.add(graphicLayer);

      viewRef.current = view;
      graphicLayerRef.current = graphicLayer;
    }
  }, []);

  return (
    <Wrapper>
      {loading && (
        <Overlay>
          <LoadingOutlined />
        </Overlay>
      )}
      <Wrapper ref={mapElRef as any} />
    </Wrapper>
  );
});

function getPinByPoint(lat: number, long: number) {
  const point = {
    type: 'point',
    longitude: long,
    latitude: lat,
  };

  const markerSymbol = {
    type: 'picture-marker',
    url: '/img/map/pin.svg',
    width: '16px',
    height: '22px',
  };

  return new Graphic({
    geometry: point as any,
    symbol: markerSymbol as any,
  });
}

export default MiniMap;
