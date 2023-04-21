import { NextApiRequest, NextApiResponse } from 'next';

import { tryParseJson } from '@lib/tryParseJSON';
import { deleteCompany, getCompany, updateCompany } from '@models/company';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return get(req, res);
      case 'PUT':
        return put(req, res);
      case 'DELETE':
        return _delete(req, res);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e: any) {
    console.debug(`/api/company ${req.method} ERROR::`, e);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const data = await getCompany(req.query.id as string);
  if (!data) return res.status(404).json({ message: 'Not found' });

  return res.status(200).json(data);
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  const payload = tryParseJson(req.body);
  const updated = await updateCompany(payload);

  return res.status(200).json(updated);
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  await deleteCompany(req.query.id as string);

  return res.status(200).json({ message: 'Success' });
}

export default routeHandler;
