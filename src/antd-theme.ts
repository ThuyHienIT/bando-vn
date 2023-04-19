import { ConfigProviderProps } from 'antd/lib/config-provider';

export const configProviders: ConfigProviderProps = {
  form: {
    validateMessages: {
      // eslint-disable-next-line no-template-curly-in-string
      required: '${label} is required!',
      types: {
        // eslint-disable-next-line no-template-curly-in-string
        email: '${label} is not valid',
      },
    },
  },
  // theme: {
  //   token: {
  //     colorPrimary: '#509f53',
  //     fontFamily: 'Roboto, sans-serif',
  //     colorBgLayout: '#ffffff',
  //   },
  // },
};
