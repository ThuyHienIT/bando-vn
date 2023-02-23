import './globals.css';

import React from 'react';

import { App } from '@components/App';

import { AntdStyleRegistry } from './(client)/lib/antd-registry';
import StyledComponentsRegistry from './(client)/lib/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <StyledComponentsRegistry>
          <AntdStyleRegistry>
            <App>{children}</App>
          </AntdStyleRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

// Static metadata
export const metadata = {
  title: 'Facility Booking',
};
