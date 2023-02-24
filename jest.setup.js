import '@testing-library/jest-dom';
import 'jest-styled-components';
import './__test__/lib/matchMedia.mock';

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  const notification = {
    useNotification: () => [
      {
        success: jest.fn(),
        error: jest.fn(),
      },
      null,
    ],
  };

  return {
    ...antd,
    notification,
  };
});

// ignore this warning due to antd issue
// the tests are working fine but still get this error
// find a solution for this later
const consoleError = console.error;
jest.spyOn(console, 'error').mockImplementation((...args) => {
  const message = typeof args[0] === 'string' ? args[0] : '';
  if (
    message.includes(
      'When testing, code that causes React state updates should be wrapped into act(...)'
    ) ||
    message.includes('antd')
  ) {
    return;
  }

  return consoleError.call(console, args);
});

global.mockRouterPush = jest.fn();
jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: global.mockRouterPush,
    }),
    redirect: jest.fn(),
    notFound: jest.fn(),
  };
});
