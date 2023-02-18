import path from 'path';
import { promises as fs } from 'fs';

const DB_DIR = path.join(process.cwd(), 'db');
const DB_NAME = 'facilities.json';

async function loadFacilities(type?: FacilityTypeEnum) {
  const fileContent = await fs.readFile(path.resolve(DB_DIR, DB_NAME), 'utf-8');
  const data: FacilityItem[] = JSON.parse(fileContent.toString());

  if (type) return data.filter((i) => i.type === type);

  return data;
}

export const facilityModel = { loadFacilities };
