import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { LoadingOutlined } from '@ant-design/icons';
import esriConfig from '@arcgis/core/config';
import Point from '@arcgis/core/geometry/Point.js';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Zoom from '@arcgis/core/widgets/Zoom';
import { Overlay } from '@components/Overlay';
import request from '@lib/request';
import { activeItemIdState, activeItemState } from '@recoil/common';
import { getLatLong } from '@utils/common';

import { config } from './config';
import { getCityGraphic } from './places';

const MapStyle = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MapComp = memo(() => {
  const mapElRef = useRef<HTMLDivElement>();
  const [loading, setLoading] = useState(false);
  const [activeItemId, setActiveItemId] = useRecoilState(activeItemIdState);
  const activeItem = useRecoilValue(activeItemState);
  const viewRef = useRef<MapView>();
  const mapRef = useRef<Map>();
  const graphicLayerRef = useRef<GraphicsLayer>();

  const handleClick = useCallback(
    async (event: any) => {
      const hitTest = await viewRef.current?.hitTest(event, {
        include: graphicLayerRef.current,
      });
      const graphic = hitTest?.results[0];

      if (graphic?.type === 'graphic') {
        const id = graphic.graphic.getAttribute('id');

        setActiveItemId(id);
        return;
      }

      setActiveItemId('');

      // do something with the result color
    },
    [setActiveItemId]
  );

  const drawCompany = useCallback((data: CompanyType) => {
    if (!data?.geometry) return;

    const geoStr = data?.geometry;
    let [latitude, longitude] = getLatLong(geoStr);
    if (!latitude || !longitude) return;

    const point = new Point({
      latitude,
      longitude,
    });

    const graphics = getCityGraphic({
      lat: latitude,
      long: longitude,
      name: data.name,
      content: '',
      id: data.id,
    });

    const graphicLayer = graphicLayerRef.current;
    graphicLayer?.addMany(graphics);
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await request<CompanyType[]>(`/api/search?q=`);

      // draw all item
      resp.forEach((i) => {
        drawCompany(i);
      });
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  }, [drawCompany]);

  useEffect(() => {
    if (mapElRef.current) {
      setLoading(true);

      esriConfig.apiKey = config.key;

      const map = new Map({
        basemap: 'arcgis-navigation',
      });

      const view = new MapView({
        map: map,
        center: [106.71852990620054, 10.841172223862083],
        zoom: 12,
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

      view.ui.add(zoom, { position: 'bottom-right' });

      view.when().then(() => {
        setLoading(false);
      });

      view.on('click', handleClick);

      const graphicLayer = new GraphicsLayer();
      map.add(graphicLayer);

      viewRef.current = view;
      mapRef.current = map;

      graphicLayerRef.current = graphicLayer;
    }
  }, [handleClick]);

  useEffect(() => {
    if (!activeItem?.geometry) return;

    const geoStr = activeItem?.geometry;
    let [latitude, longitude] = getLatLong(geoStr);
    if (!latitude || !longitude) return;

    const point = new Point({
      latitude,
      longitude,
    });

    viewRef.current?.goTo(point, {
      animate: true,
      duration: 200,
      easing: 'ease',
    });
  }, [activeItem?.geometry]);

  useEffect(() => {
    const graphicsToRemove: Graphic[] = [];
    const graphicsToAdd: Graphic[] = [];

    graphicLayerRef.current?.graphics.forEach((graphic) => {
      const clonedGraphic = graphic.clone();
      const symbol = clonedGraphic.symbol;

      if (clonedGraphic.getAttribute('name') === 'pin-icon') {
        const currId = clonedGraphic.getAttribute('id');
        if (currId === activeItemId) {
          symbol.set('width', '20px');
          symbol.set('height', '28px');
          symbol.set('url', '/img/map/pin.svg');
        } else {
          symbol.set('width', '16px');
          symbol.set('height', '22px');
          symbol.set('url','/img/map/pin-inactive.svg');
        }

        graphicsToAdd.push(
          new Graphic({
            attributes: { id: currId, name: 'pin-icon' },
            symbol: symbol as any,
            geometry: clonedGraphic.geometry,
          })
        );

        graphicsToRemove.push(graphic);
      }
    });

    graphicLayerRef.current?.addMany(graphicsToAdd);
    graphicLayerRef.current?.removeMany(graphicsToRemove);
  }, [activeItemId]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
