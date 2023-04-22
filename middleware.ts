import { getIronSession } from 'iron-session/edge';
import { NextResponse } from 'next/server';

import { ironOptions } from '@lib/config';

import type { NextRequest } from 'next/server';
export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, ironOptions);
  const path = req.nextUrl.pathname;

  if (!session.user) {
    session.destroy();
    console.log('redirect to login from ', path);
    return NextResponse.redirect(new URL(`/login?target=${path}`, req.url));
  }

  return res;
};

export const config = {
  matcher: ['/admin/(.*)'],
};
