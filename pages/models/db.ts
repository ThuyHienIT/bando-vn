import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';
import { randomUUID } from 'crypto';

const DB_FOLDER = process.env.NODE_ENV === 'test' ? 'dbtest' : 'db';
const DB_DIR = path.join(process.cwd(), DB_FOLDER);

type RecordType = { id: string; createdAt: string; updatedAt: string };

async function loadDb<T>(dbName: string) {
  const fileContent = await fs.readFile(path.resolve(DB_DIR, dbName), 'utf-8');
  const data: T[] = JSON.parse(fileContent.toString());

  return data;
}

async function insertOne<T extends RecordType>(dbName: string, payload: T) {
  const dataToInsert = { ...payload };

  const fileContent = await fs.readFile(path.resolve(DB_DIR, dbName), 'utf-8');
  const data: T[] = JSON.parse(fileContent.toString());

  dataToInsert.id = randomUUID();
  dataToInsert.createdAt = dayjs(new Date()).format();
  dataToInsert.updatedAt = dayjs(new Date()).format();

  data.push(dataToInsert);

  await fs.writeFile(path.resolve(DB_DIR, dbName), JSON.stringify(data, null, 2), 'utf-8');

  return dataToInsert;
}

async function update<T extends RecordType>(dbName: string, payload: T) {
  const dataToInsert = { ...payload };

  const fileContent = await fs.readFile(path.resolve(DB_DIR, dbName), 'utf-8');
  const data: T[] = JSON.parse(fileContent.toString());
  const foundIdx = data.findIndex((i) => i.id === dataToInsert.id);

  dataToInsert.updatedAt = dayjs(new Date()).format();
  data.splice(foundIdx, 1, dataToInsert);

  await fs.writeFile(path.resolve(DB_DIR, dbName), JSON.stringify(data, null, 2), 'utf-8');

  return dataToInsert;
}

export const dbModel = { loadDb, insertOne, update };
