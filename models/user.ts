import { encryptToken } from '@lib/gen-token';

import { deleteByIds, insertOne, queryAll, sql, updateOne } from './db';

export async function queryUsers() {
  const data: UserInfo[] = await queryAll('User', [
    'email',
    'id',
    'role',
    'name',
  ]);

  return data;
}

export async function insertUser(user: UserInfo & { password: string }) {
  user.password = await encryptToken(user.password);
  const inserted = await insertOne<CompanyType>('User', user);

  return inserted;
}

export async function getUser(id: string) {
  const data: UserInfo[] = await sql`
    SELECT * FROM  ${sql('User')}
    WHERE id=${id}
  `;

  return data[0];
}

export async function updateUser(
  payload: Partial<UserInfo & { password: string }>
) {
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
