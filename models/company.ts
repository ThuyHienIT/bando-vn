import dayjs from 'dayjs';

import { deleteByIds, insertOne, sql, updateOne } from './db';
import {
  deletePhotosByFieldId,
  deletePhotosByIds,
  insertPhotos,
  queryPhotosByFieldId,
} from './photo';

type CompanyWithPhotoType = CompanyType & { photo_url: string };

export async function queryCompaniesByTypes(
  types?: string[],
  keyword?: string
) {
  const companies: CompanyWithPhotoType[] = await sql`
    SELECT c.*, p.photo_url FROM 
    ${sql('BaseCompany')} c LEFT JOIN ${sql('Photo')} p 
    ON c.id = p.company_id
    ${types && types?.length > 0 ? sql`WHERE  c.type in ${sql(types)}` : sql``}
    ${
      keyword
        ? sql`WHERE  upper(c.name) like ${`%${keyword.toUpperCase()}%`}`
        : sql``
    }
  `;

  return transformCompany(companies);
}

export async function insertCompany(company: CompanyType) {
  const { photos, ...d } = company;
  const insertedCompany = await insertOne<CompanyType>('BaseCompany', d);

  // insert photos
  if (photos?.length > 0) {
    const insertedPhotos = await insertPhotos(
      photos.map((url) => ({ photo_url: url, company_id: insertedCompany.id }))
    );
    insertedCompany.photos = insertedPhotos.map((i) => i.photo_url);
  }

  return insertedCompany;
}

export async function getCompany(id: string) {
  const companies: CompanyWithPhotoType[] = await sql`
    SELECT c.*, p.photo_url FROM 
    ${sql('BaseCompany')} c LEFT JOIN ${sql('Photo')} p 
    ON c.id=p.company_id 
    WHERE c.id=${id}
  `;

  if (!companies || companies.length === 0) return null;

  return transformCompany(companies)[0];
}

export async function updateCompany(payload: Partial<CompanyType>) {
  if (!payload.id) throw Error('Missing id');

  const { photos, ...d } = payload;
  await updateOne('BaseCompany', d);

  await deletePhotosByFieldId('company_id', payload.id);
  if (photos && photos?.length > 0) {
    await insertPhotos(
      photos.map((url) => ({ photo_url: url, company_id: payload.id }))
    );
  }

  return await getCompany(payload.id);
}

export async function deleteCompany(id: string) {
  // delete photos
  const photos = await queryPhotosByFieldId('company_id', id);
  const photoIds = photos.map((i) => i.id);

  await deletePhotosByIds(photoIds);
  await deleteByIds('BaseCompany', [id]);

  return true;
}

function transformCompany(companies: CompanyWithPhotoType[]) {
  const result: Record<string, CompanyType> = {};
  for (let i = 0; i < companies.length; i++) {
    const { photo_url, ...d } = companies[i];
    d.created_at = dayjs(d.created_at as any).format();
    d.updated_at = dayjs(d.updated_at as any).format();

    if (result[d.id]) {
      result[d.id].photos.push(photo_url);
    } else {
      result[d.id] = { ...d, photos: photo_url ? [photo_url] : [] };
    }
  }

  return Object.values(result);
}
