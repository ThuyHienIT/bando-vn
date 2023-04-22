import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import postgres from 'postgres';

const sql = postgres({ ssl: true });

type BaseType = { created_at?: string; updated_at?: string };
type DataType = BaseType & Record<string, string | number | boolean>;

export async function insertOne<T extends BaseType>(
  table: string,
  data: DataType
) {
  data.id = randomUUID();
  data.created_at = dayjs().format();
  data.updated_at = dayjs().format();

  const resp: T[] = await sql`
    INSERT INTO ${sql(`${table}`)} ${sql(data)}
    returning *
  `;

  return transformDate(resp[0]);
}

export async function insertMany<T extends BaseType>(
  table: string,
  datas: DataType[]
) {
  datas.forEach((data) => {
    data.id = randomUUID();
    data.created_at = dayjs().format();
    data.updated_at = dayjs().format();
  });

  const resp: T[] = await sql`
    INSERT INTO ${sql(`${table}`)} ${sql(datas)}
    returning *
  `;

  return resp.map(transformDate);
}

export async function queryAll<T extends BaseType>(
  table: string,
  fields: string[] = []
) {
  const resp: T[] = await sql`
    SELECT ${fields.length > 0 ? sql(fields) : sql`*`} FROM ${sql(`${table}`)}
  `;

  return resp.map(transformDate) as T[];
}

export async function queryById<T extends BaseType>(table: string, id: string) {
  const data: T[] = await sql`
    SELECT * FROM ${sql(table)} WHERE id=${id}
  `;
  return transformDate(data[0]);
}

export async function deleteByIds(table: string, ids: string[]) {
  await sql`
    DELETE FROM ${sql(table)} WHERE id in ${sql(ids)}
  `;
  return true;
}

export async function updateOne<T extends BaseType>(
  table: string,
  data: DataType
) {
  const { id, updated_at, ...d } = data;

  const updated = await sql`
    UPDATE ${sql(table)} SET ${sql(d)},
    updated_at=now()
    WHERE id=${id}`;

  return transformDate(updated[0] as T);
}

export { sql };

export function transformDate(i: DataType) {
  if (!i) return i;

  return {
    ...i,
    ...(i.created_at ? { created_at: dayjs(i.created_at).format() } : {}),
    ...(i.updated_at ? { updated_at: dayjs(i.updated_at).format() } : {}),
  };
}
