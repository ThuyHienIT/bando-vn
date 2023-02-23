import WithUserProvider from 'app/(server)/WithUserProvider';
import React from 'react';

import { BasicLayout } from '@components/Layout/Layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WithUserProvider>
      <BasicLayout>{children} </BasicLayout>
    </WithUserProvider>
  );
}
