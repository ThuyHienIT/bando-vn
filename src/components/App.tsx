import { ConfigProvider } from 'antd';
import { memo } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { configProviders } from '../antd-theme';
import { theme } from '../theme';

interface Props {
  children: React.ReactNode;
}
export const App = memo<Props>(function App(props) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ConfigProvider {...configProviders}>{props.children}</ConfigProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
});
