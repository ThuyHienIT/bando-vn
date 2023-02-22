import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LoginPage from '@pages/LoginPage';

export default function Page(props: any) {
  const cookieStore = cookies();
  if (cookieStore.get('token')) {
    redirect('/');
  }

  return <LoginPage />;
}
