import { deleteByIds, insertMany, insertOne, sql } from './db';

export async function queryPhotosByFieldId(field: string, id: string) {
  const data: unknown = await sql`
    SELECT * FROM ${sql('Photo')} WHERE ${sql(field)}=${id}
  `;

  return data as PhotoType[];
}

export async function deletePhotosByFieldId(field: string, id: string) {
  const data: unknown = await sql`
    DELETE FROM ${sql('Photo')} WHERE ${sql(field)}=${id}
  `;

  return data as PhotoType[];
}

export async function insertPhoto(url: string, appId: string) {
  const data = await insertOne('Photo', { url, app_id: appId });
  return data;
}

export async function insertPhotos(payload: Partial<PhotoType>[]) {
  const d = payload.map(({ created_at, updated_at, id, ...p }) => p);

  const data = await insertMany<PhotoType>('Photo', d);

  return data;
}

export async function deletePhotosByIds(ids: string[]) {
  return await deleteByIds('Photo', ids);
}
