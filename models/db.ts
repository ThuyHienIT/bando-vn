import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import { promises as fs } from 'fs';
import { RequestError } from 'lib/errorClasses';
import path from 'path';

import { Sentry } from '@lib/sentry-config';

import { tryParseJson } from '../lib/tryParseJSON';

const IS_TEST = process.env.NODE_ENV === 'test';
const DB_FOLDER = IS_TEST ? 'dbtest' : 'db';
const DB_DIR = path.join(process.cwd(), DB_FOLDER);

const TEST_UTILS_DB: Record<string, string> = {};

async function readFile(dbName: string) {
  if (IS_TEST) return TEST_UTILS_DB[dbName];
  try {
    return await fs.readFile(path.resolve(DB_DIR, dbName), 'utf-8');
  } catch (e: any) {
    await writeFile(dbName, '[]');

    return '[]';
  }
}

async function writeFile(dbName: string, data: string) {
  if (IS_TEST) {
    TEST_UTILS_DB[dbName] = data;
    return;
  }

  return await fs.writeFile(path.resolve(DB_DIR, dbName), data, 'utf-8');
}

type RecordType = { id: string; createdAt?: string; updatedAt?: string };

async function prepareDb(dbName: string) {
  if (IS_TEST) {
    TEST_UTILS_DB[dbName] = '[]';
    return;
  }

  try {
    await readFile(dbName);
  } catch (e: any) {
    await writeFile(dbName, '[]');
  }
}

async function clearDb(dbName: string) {
  await writeFile(dbName, '[]');
}

async function loadDb<T>(dbName: string) {
  const fileContent = await readFile(dbName);
  const data: T[] = tryParseJson(fileContent, []);

  return data;
}

async function insertOne<T extends RecordType>(dbName: string, payload: T) {
  const dataToInsert = { ...payload };

  const data = await loadDb<T>(dbName);

  dataToInsert.id = dataToInsert.id || randomUUID();
  dataToInsert.createdAt = dayjs(new Date()).format();
  dataToInsert.updatedAt = dayjs(new Date()).format();

  data.push(dataToInsert);

  try {
    await writeFile(dbName, JSON.stringify(data, null, 2));
  } catch (e: any) {
    Sentry.captureException(e);
    Sentry.captureMessage(e.message);
    throw new RequestError(500, e.message);
  }

  return dataToInsert;
}

async function update<T extends RecordType>(dbName: string, payload: T) {
  const dataToInsert = { ...payload };

  const data = await loadDb<T>(dbName);

  const foundIdx = data.findIndex((i) => i.id === dataToInsert.id);

  dataToInsert.updatedAt = dayjs(new Date()).format();
  data.splice(foundIdx, 1, dataToInsert);

  await writeFile(dbName, JSON.stringify(data, null, 2));

  return dataToInsert;
}

async function remove(dbName: string, id: string) {
  let data = await loadDb<RecordType>(dbName);
  const foundItemIdx = data.findIndex((i) => i.id === id);

  if (foundItemIdx < 0) throw new RequestError(400, 'Item not found');
  data.splice(foundItemIdx, 1);

  await writeFile(dbName, JSON.stringify(data, null, 2));

  return true;
}

export const dbModel = {
  prepareDb,
  clearDb,
  loadDb,
  insertOne,
  update,
  remove,
};
