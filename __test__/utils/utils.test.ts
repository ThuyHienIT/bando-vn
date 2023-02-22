import { RequestError } from '@lib/errorClasses';
import { tryParseJson } from '@lib/tryParseJSON';

describe('/errroClasses', () => {
  test('expected property', async () => {
    const error = new RequestError(404, 'Not found');

    expect(error.code).toEqual(404);
    expect(error.message).toEqual('Not found');
  });
});

describe('tryParseJson', () => {
  test('invalid without default value', async () => {
    const data = tryParseJson('invalid string');
    expect(data).toBeFalsy();
  });

  test('invalid with default value', async () => {
    const data = tryParseJson('invalid string', { name: 'T' });
    expect(data).toMatchObject({ name: 'T' });
  });

  test('valid', async () => {
    const data = tryParseJson('{"name": "T"}', { name: 'B' });
    expect(data).toMatchObject({ name: 'T' });
  });
});
