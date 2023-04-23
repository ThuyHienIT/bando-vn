import dayjs from 'dayjs';

import { getCompany } from './company';
import { deleteByIds, insertOne, sql, updateOne } from './db';
import {
  deletePhotosByFieldId,
  deletePhotosByIds,
  insertPhotos,
  queryPhotosByFieldId
} from './photo';

type TourWithPhotoType = TourDetailsType & { photo_url: string };

export async function queryTourByCompanyId(id?: string, keyword?: string) {
  let conditions: any = '';
  if (id) {
    conditions = sql`c.company_id = ${id}`;
  }

  if (keyword) {
    if (conditions) {
      conditions = sql`${conditions} 
      AND upper(c.name) like ${`%${keyword.toUpperCase()}%`}`;
    } else {
      conditions = sql`upper(c.name) like ${`%${keyword.toUpperCase()}%`}`;
    }
  }

  const data: TourWithPhotoType[] = await sql`
    SELECT t.*, p.photo_url FROM ${sql('Tour')} t 
    LEFT JOIN ${sql('Photo')} p ON t.id = p.tour_id
    ${conditions ? sql`WHERE ${conditions}` : sql``}
  `;

  console.log('data', [...data]);
  return transformTour(data);
}

export async function insertTour(tour: TourDetailsType) {
  const { photos, company, ...d } = tour;
  const insertedCompany = await insertOne<CompanyType>('Tour', d);

  // insert photos
  if (photos?.length > 0) {
    const insertedPhotos = await insertPhotos(
      photos.map((url) => ({ photo_url: url, tour_id: insertedCompany.id }))
    );
    insertedCompany.photos = insertedPhotos.map((i) => i.photo_url);
  }

  return insertedCompany;
}

export async function getTour(id: string) {
  const data: TourWithPhotoType[] = await sql`
    SELECT c.*, p.photo_url FROM 
    ${sql('Tour')} c LEFT JOIN ${sql('Photo')} p 
    ON c.id=p.tour_id 
    WHERE c.id=${id}
  `;

  if (!data || data.length === 0) return null;

  if (data[0].company_id) {
    const company = await getCompany(data[0].company_id);
    if (company) data[0].company = company;
  }

  return transformTour(data)[0];
}

export async function updateTour(payload: Partial<TourDetailsType>) {
  if (!payload.id) throw Error('Missing id');

  const { photos, company, ...d } = payload;
  await updateOne('Tour', d);

  await deletePhotosByFieldId('tour_id', payload.id);
  if (photos && photos?.length > 0) {
    await insertPhotos(
      photos.map((url) => ({ photo_url: url, tour_id: payload.id }))
    );
  }

  return await getTour(payload.id);
}

export async function deleteTour(id: string) {
  // delete photos
  const photos = await queryPhotosByFieldId('tour_id', id);
  const photoIds = photos.map((i) => i.id);

  await deletePhotosByIds(photoIds);
  await deleteByIds('Tour', [id]);

  return true;
}

function transformTour(data: TourWithPhotoType[]) {
  const result: Record<string, TourDetailsType> = {};
  for (let i = 0; i < data.length; i++) {
    const { photo_url, ...d } = data[i];

    d.created_at = dayjs(d.created_at as any).format();
    d.updated_at = dayjs(d.updated_at as any).format();
    d.start_date = dayjs(d.start_date as any).format();
    d.end_date = dayjs(d.end_date as any).format();

    if (result[d.id]) {
      result[d.id].photos.push(photo_url);
    } else {
      result[d.id] = { ...d, photos: photo_url ? [photo_url] : [] };
    }
  }

  return Object.values(result);
}
