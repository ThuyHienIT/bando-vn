import Graphic from '@arcgis/core/Graphic';

// Cities, School,...
export async function fetchCities() {
  return fetch('/data/cities.json').then((resp) => resp.json());
}

type ItemData = {
  long: number;
  lat: number;
  name: string;
  content: string;
  id: string;
};
export function getCityGraphic(data: ItemData) {
  const { long, lat, name, content = '' } = data;
  const point = {
    type: 'point',
    longitude: long,
    latitude: lat,
  };

  const markerSymbol = {
    type: 'picture-marker',
    url: '/img/map/pin-inactive.svg',
    width: '16px',
    height: '22px',
    label: name,
  };

  const textSymbol2 = {
    type: 'text', // autocasts as new TextSymbol()
    color: '#333333',
    text: name,
    yoffset: 14,
    font: {
      size: 10,
      weight: 'bold',
    },
    haloColor: '#ffffff',
    width: 100,
    horizontalAlignment: 'center',
    verticalAlignment: 'bottom',
  };

  const labelGraphic = new Graphic({
    attributes: { id: data.id },
    geometry: point as any,
    symbol: textSymbol2 as any,
  });

  const markerGraphic = new Graphic({
    attributes: { id: data.id },
    geometry: point as any,
    symbol: markerSymbol as any,
  });

  return [markerGraphic, labelGraphic];
}
