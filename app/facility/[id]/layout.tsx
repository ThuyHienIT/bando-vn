'use client';

import './fullpage.css';

import styled from 'styled-components';

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}
