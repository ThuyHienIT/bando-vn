import { RequestCookie } from 'next/dist/server/web/spec-extension/cookies';
import { cookies } from 'next/headers';

export function getUser() {
  const cookieStore = cookies();
  const userInfomation = getUserInfo(cookieStore.get('token'));

  return userInfomation;
}

function getUserInfo(cookie: RequestCookie | undefined) {
  if (cookie?.name === 'token') {
    return { email: cookie?.value };
  }

  return null;
}
