import { RequestError } from 'lib/errorClasses';

const PREFIX = 'http://localhost:3000';
export default async function request(url: string, options?: RequestInit) {
  const token = '';
  let { headers: optHeaders, ...restOpts } = options || {};
  const fullUrl = url.startsWith('http') ? url : `${PREFIX}${url}`;

  const headers: Record<string, any> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...optHeaders,
  };

  if (headers['Content-Type'] === 'remove') {
    delete headers['Content-Type'];
  }

  const resp = await fetch(fullUrl, {
    method: 'GET',
    headers,
    ...restOpts,
  });

  // Error
  if (resp.status < 200 || resp.status >= 300) {
    throw new RequestError(resp.status, (await resp.json())?.message);
  }

  const customHeader = (headers as any)?.['Content-Type'];

  if (customHeader && customHeader.startsWith('text'))
    return resp.clone().text();
  if (customHeader && customHeader === 'application/json')
    return resp.clone().json();

  // Success
  return resp;
}
