import { createMocks } from 'node-mocks-http';

import handleRoute from '@apis/login';

describe('/api/login', () => {
  test('missing password', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'kqthang1505@gmail.com',
        password: '',
      },
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  test('missing email', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: '',
        password: '1234',
      },
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  test('login success', async () => {
    const loginEmail = 'kqthang1505@gmail.com';
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: loginEmail,
        password: '1234',
      },
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(200);

    const header = res._getHeaders();
    const setCookieStr = header['set-cookie'] as string;
    const [tokenStr] = setCookieStr.split(';');
    const [, email] = tokenStr.split('=');

    expect(decodeURIComponent(email)).toBe(loginEmail);
  });

  test('throw error', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: 'invalid-string' as any,
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(500);
  });
});
