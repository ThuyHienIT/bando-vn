import './globals.css';

import { App } from '@components/App';
import { BasicLayout } from '@components/Layout/Layout';

import StyledComponentsRegistry from './lib/registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <StyledComponentsRegistry>
          <App>
            <BasicLayout>{children}</BasicLayout>
          </App>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
