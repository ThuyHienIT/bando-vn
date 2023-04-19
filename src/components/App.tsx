import 'antd/dist/antd.css';

import { ConfigProvider } from 'antd';
import { memo, useEffect } from 'react';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { configProviders } from '../antd-theme';
import { theme } from '../theme';
import { ErrorBoundary } from './ErrorBoundary';

interface Props {
  children: React.ReactNode;
}
export const App = memo<Props>(function App(props) {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <DebugObserver />
      </ErrorBoundary>
      <ThemeProvider theme={theme}>
        <ConfigProvider {...configProviders}>{props.children}</ConfigProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
});

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    // eslint-disable-next-line
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node).getValue());
    }
  }, [snapshot]);

  return null;
}
