import request from 'app/(client)/lib/request';

import { mockFetch } from '../lib/fetch';

beforeEach(() => {
  mockFetch.mockClear();
});

describe('/requests', () => {
  test('call short api', async () => {
    await request('/api/bbb');

    expect(mockFetch).toBeCalledWith('/api/bbb', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  });

  test('call fullurl', async () => {
    await request('https://google.com/api/bbb');

    expect(mockFetch).toBeCalledWith('https://google.com/api/bbb', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  });

  test('return 200', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: 'T' }),
        text: () => Promise.resolve(''),
        clone: () => ({
          json: () => Promise.resolve({ name: 'T' }),
          text: () => Promise.resolve(''),
        }),
      })
    );

    const resp = await request('https://google.com/api/bbb');

    expect(mockFetch).toBeCalledWith('https://google.com/api/bbb', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    expect(resp).toMatchObject({ name: 'T' });
  });

  test('return 400', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ message: 'Bad Request' }),
        text: () => Promise.resolve(''),
        clone: () => ({
          json: () => Promise.resolve({ name: 'T' }),
          text: () => Promise.resolve(''),
        }),
      })
    );

    try {
      await request('https://google.com/api/bbb');
      expect('false').toBe('true');
    } catch (e: any) {
      expect(e.code).toBe(400);
      expect(e.message).toBe('Bad Request');
    }

    expect(mockFetch).toBeCalledWith('https://google.com/api/bbb', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  });
});
