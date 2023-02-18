import { createMocks } from 'node-mocks-http';
import handleRoute from '@apis/booking/update';
import { randomUUID } from 'crypto';

describe('/api/[booking]/[update]', () => {
  test('not found', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: randomUUID(),
        from: '2022-04-23T23:30:00Z',
        to: '2022-05-23T24:00:00Z',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('update booking invalid data: from or to is in the past', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: 'f388e068-eb4b-4924-bf62-ca4b1e005aca',
        from: '2022-04-23T10:30:00Z',
        to: '2022-04-23T11:00:00Z',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('update booking invalid data: from after to', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: 'f388e068-eb4b-4924-bf62-ca4b1e005aca',
        from: '2022-04-23T10:30:00Z',
        to: '2022-04-23T08:00:00Z',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('update booking valid data', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: 'f388e068-eb4b-4924-bf62-ca4b1e005aca',
        from: '2023-04-23T10:30:00Z',
        to: '2023-04-23T11:00:00Z',
      },
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toMatchObject({
      id: 'f388e068-eb4b-4924-bf62-ca4b1e005aca',
      from: '2023-04-23T10:30:00Z',
      to: '2023-04-23T11:00:00Z',
    });
  });
});
