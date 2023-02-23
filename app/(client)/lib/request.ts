import { RequestError } from 'lib/errorClasses';

const PREFIX = '';
export default async function request(url: string, options?: RequestInit) {
  let { headers: optHeaders, ...restOpts } = options || {};
  const fullUrl = url.startsWith('http') ? url : `${PREFIX}${url}`;

  const headers: Record<string, any> = {
    'Content-Type': 'application/json',
    ...optHeaders,
  };

  const resp = await fetch(fullUrl, {
    method: 'GET',
    headers,
    ...restOpts,
  });

  // Error
  if (resp.status < 200 || resp.status >= 300) {
    throw new RequestError(resp.status, (await resp.json())?.message);
  }

  // Success
  return resp.json();
}
