'use client';

import { Layout } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
`;

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Container = memo<Props>(function Header(props) {
  return <ContainerStyle className={props.className}>{props.children}</ContainerStyle>;
});
