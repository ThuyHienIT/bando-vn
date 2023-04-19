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
    url: '/img/map/pin.svg',
    width: '16px',
    height: '22px',
    label: name,
  };

  const textSymbol2 = {
    type: 'text', // autocasts as new TextSymbol()
    color: '#333333',
    text: name,
    yoffset: -2,
    xoffset: 8,
    font: {
      size: 12,
    },
    horizontalAlignment: 'left',
    verticalAlignment: 'bottom',
  };

  const labelGraphic = new Graphic({
    geometry: point as any,
    symbol: textSymbol2 as any,
  });

  const markerGraphic = new Graphic({
    geometry: point as any,
    symbol: markerSymbol as any,
  });

  return [markerGraphic, labelGraphic];
}
