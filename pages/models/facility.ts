import path from 'path';
import { promises as fs } from 'fs';

const DB_DIR = path.join(process.cwd(), 'db');
const DB_NAME = 'facilities.json';

async function loadFacilities() {
  const fileContent = await fs.readFile(path.resolve(DB_DIR, DB_NAME), 'utf-8');
  const data = JSON.parse(fileContent.toString());

  return data;
}

export const facilityModel = { loadFacilities };
