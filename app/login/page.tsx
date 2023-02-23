import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { LoginForm } from './LoginForm';

export default async function LoginPage(props: any) {
  const cookieStore = cookies();
  if (cookieStore.get('token')) {
    redirect('/');
  }

  return <LoginForm />;
}
