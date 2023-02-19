'use client';

import { Layout } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';

interface Props {
  children: React.ReactNode;
}
export const App = memo<Props>(function BasicLayout(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
});
