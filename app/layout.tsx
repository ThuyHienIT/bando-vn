import './globals.css';

import React from 'react';

import { App } from '@components/App';
import { BasicLayout } from '@components/Layout/Layout';

import { AntdStyleRegistry } from './(client)/lib/antd-registry';
import StyledComponentsRegistry from './(client)/lib/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
            <App>
              <BasicLayout>{children}</BasicLayout>
            </App>
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
