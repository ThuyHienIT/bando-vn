import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';

const DB_FOLDER = process.env.NODE_ENV === 'test' ? 'dbtest' : 'db';
const DB_DIR = path.join(process.cwd(), DB_FOLDER);

async function loadDb<T>(dbName: string) {
  const fileContent = await fs.readFile(path.resolve(DB_DIR, dbName), 'utf-8');
  const data: T[] = JSON.parse(fileContent.toString());

  return data;
}

async function insertOne<T extends { createdAt: string; updatedAt: string }>(
  dbName: string,
  payload: T
) {
  const dataToInsert = { ...payload };

  const fileContent = await fs.readFile(path.resolve(DB_DIR, dbName), 'utf-8');
  const data: T[] = JSON.parse(fileContent.toString());
  dataToInsert.createdAt = dayjs(new Date()).format();
  dataToInsert.updatedAt = dayjs(new Date()).format();

  data.push(dataToInsert);

  await fs.writeFile(path.resolve(DB_DIR, dbName), JSON.stringify(data), 'utf-8');

  return dataToInsert;
}

export const dbModel = { loadDb, insertOne };
