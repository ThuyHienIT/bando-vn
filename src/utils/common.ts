export function getLatLong(geo: string = ''): [number, number] {
  const [lat = '', long = ''] = geo.match(/[-+]?[0-9]*\.?[0-9]+/g) ?? [];
  return [parseFloat(lat) || 0, parseFloat(long) || 0];
}
