import { createMocks } from 'node-mocks-http';

import handleRoute from '@apis/logout';

describe('/api/logout', () => {
  test('logout success', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(200);

    const header = res._getHeaders();
    const setCookieStr = header['set-cookie'] as string;
    const [tokenStr] = setCookieStr.split(';');
    const [, email] = tokenStr.split('=');

    expect(decodeURIComponent(email)).toBe('deleted');
  });
});
