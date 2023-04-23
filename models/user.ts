import { encryptToken } from '@lib/gen-token';

import {
  deleteByIds,
  insertOne,
  queryAll,
  sql,
  transformDate,
  updateOne
} from './db';

const UserPropsToQuery = ['email', 'id', 'role', 'name'];

export async function queryUsers() {
  const data: UserInfo[] = await queryAll('User', UserPropsToQuery);

  return data;
}

type UserInfoWPass = UserInfo & { password: string };
export async function insertUser(user: UserInfoWPass) {
  user.password = await encryptToken(user.password);
  const { password, ...inserted } = await insertOne<UserInfoWPass>(
    'User',
    user
  );

  return inserted;
}

export async function getUser(id: string) {
  const data: UserInfo[] = await sql`
    SELECT ${sql(UserPropsToQuery)} FROM  ${sql('User')}
    WHERE id=${id}
  `;

  return transformDate(data[0]);
}

export async function updateUser(payload: Partial<UserInfoWPass>) {
  if (!payload.id) throw Error('Missing id');

  if (payload.password) {
    payload.password = await encryptToken(payload.password);
  }

  await updateOne('User', payload);

  return await getUser(payload.id);
}

export async function deleteUser(id: string) {
  await deleteByIds('User', [id]);

  return true;
}

export async function loginUser(email: string, password: string) {
  const encrypted = await encryptToken(password);

  const data: UserInfo[] = await sql`
    SELECT * FROM  ${sql('User')}
    WHERE email=${email} AND password=${encrypted}
  `;

  return transformDate(data[0]);
}
