import { redirect } from 'next/navigation';
import React from 'react';

import { getUser } from './cookies-helper';

export default function WithUserProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const userInfo = getUser();
  if (!userInfo) redirect('/login');

  return React.cloneElement(children, {
    userInfo: userInfo,
  });
}
