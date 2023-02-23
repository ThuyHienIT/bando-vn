import 'jest-styled-components';
import './__test__/lib/matchMedia.mock';
import 'whatwg-fetch';

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  const notification = {
    useNotification: () => [
      {
        success: jest.fn,
        error: jest.fn,
      },
      null,
    ],
  };

  return {
    ...antd,
    notification,
  };
});
