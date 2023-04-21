import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import postgres from 'postgres';

const sql = postgres({ ssl: true });

type DataType = Record<string, string | number | boolean>;

export async function insertOne<T extends any>(table: string, data: DataType) {
  data.id = randomUUID();
  data.created_at = dayjs().format();
  data.updated_at = dayjs().format();

  const resp = await sql`
    INSERT INTO ${sql(`${table}`)} ${sql(data)}
    returning *
  `;

  return resp[0] as T;
}

export async function insertMany<T extends any>(
  table: string,
  datas: DataType[]
) {
  datas.forEach((data) => {
    data.id = randomUUID();
    data.created_at = dayjs().format();
    data.updated_at = dayjs().format();
  });

  const resp: unknown = await sql`
    INSERT INTO ${sql(`${table}`)} ${sql(datas)}
    returning *
  `;

  return resp as T[];
}

export async function queryAll<T extends any>(
  table: string,
  fields: string[] = []
) {
  const resp: unknown = await sql`
    SELECT ${fields.length > 0 ? sql(fields) : sql`*`} FROM ${sql(`${table}`)}
  `;

  return resp as T[];
}

export async function queryById<T extends any>(table: string, id: string) {
  const data = await sql`
    SELECT * FROM ${sql(table)} WHERE id=${id}
  `;
  return data[0] as T;
}

export async function deleteByIds(table: string, ids: string[]) {
  await sql`
    DELETE FROM ${sql(table)} WHERE id in ${sql(ids)}
  `;
  return true;
}

export async function updateOne<T extends any>(table: string, data: DataType) {
  const { id, updated_at, ...d } = data;

  const updated = await sql`
    UPDATE ${sql(table)} SET ${sql(d)},
    updated_at=now()
    WHERE id=${id}`;

  return updated as T;
}

export { sql };
