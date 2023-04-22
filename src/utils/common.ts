import { notification } from 'antd';

export function getLatLong(geo: string = ''): [number, number] {
  const [lat = '', long = ''] = geo.match(/[-+]?[0-9]*\.?[0-9]+/g) ?? [];
  return [parseFloat(lat) || 0, parseFloat(long) || 0];
}

export const notify = {
  success(message: string) {
    notification.success({ message: 'Success', description: message });
  },
  error(message: string) {
    notification.error({ message: 'Error', description: message });
  },
};
