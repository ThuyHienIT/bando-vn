import 'antd/dist/antd.css';

import { ConfigProvider } from 'antd';
import { memo, useEffect } from 'react';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { userInfoState } from '@recoil/user';

import { configProviders } from '../antd-theme';
import { theme } from '../theme';
import { ErrorBoundary } from './ErrorBoundary';

interface Props {
  children: React.ReactNode;
  user?: UserInfo;
}
export const App = memo<Props>(function App(props) {
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        if (props.user) set(userInfoState, props.user);
      }}
    >
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
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node).getValue());
    }
  }, [snapshot]);

  return null;
}
