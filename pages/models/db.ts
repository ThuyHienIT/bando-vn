import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';
import { randomUUID } from 'crypto';
import { tryParseJson } from '../lib/tryParseJSON';

const DB_FOLDER = process.env.NODE_ENV === 'test' ? 'dbtest' : 'db';
const DB_DIR = path.join(process.cwd(), DB_FOLDER);

type RecordType = { id: string; createdAt?: string; updatedAt?: string };

async function prepareDb(dbName: string) {
  const filePath = path.resolve(DB_DIR, dbName);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
  } catch (e: any) {
    await fs.writeFile(filePath, '[]');
  }
}

async function clearDb(dbName: string) {
  await fs.writeFile(path.resolve(DB_DIR, dbName), '[]', 'utf-8');
}

async function loadDb<T>(dbName: string) {
  const fileContent = await fs.readFile(path.resolve(DB_DIR, dbName), {
    encoding: 'utf-8',
    flag: 'rs+',
  });
  const data: T[] = tryParseJson(fileContent, []);

  return data;
}

async function insertOne<T extends RecordType>(dbName: string, payload: T) {
  const dataToInsert = { ...payload };

  const fileContent = await fs.readFile(path.resolve(DB_DIR, dbName), {
    encoding: 'utf-8',
    flag: 'rs+',
  });

  const data: T[] = tryParseJson(fileContent, []);

  dataToInsert.id = dataToInsert.id || randomUUID();
  dataToInsert.createdAt = dayjs(new Date()).format();
  dataToInsert.updatedAt = dayjs(new Date()).format();

  data.push(dataToInsert);

  await fs.writeFile(path.resolve(DB_DIR, dbName), JSON.stringify(data, null, 2), 'utf-8');

  return dataToInsert;
}

async function update<T extends RecordType>(dbName: string, payload: T) {
  const dataToInsert = { ...payload };

  const fileContent = await fs.readFile(path.resolve(DB_DIR, dbName), {
    encoding: 'utf-8',
    flag: 'rs+',
  });
  const data: T[] = tryParseJson(fileContent, []);
  const foundIdx = data.findIndex((i) => i.id === dataToInsert.id);

  dataToInsert.updatedAt = dayjs(new Date()).format();
  data.splice(foundIdx, 1, dataToInsert);

  await fs.writeFile(path.resolve(DB_DIR, dbName), JSON.stringify(data, null, 2), 'utf-8');

  return dataToInsert;
}

export const dbModel = { prepareDb, clearDb, loadDb, insertOne, update };

function readFile(path: string) {}
