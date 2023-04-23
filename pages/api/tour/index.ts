import { NextApiRequest, NextApiResponse } from 'next';

import { tryParseJson } from '@lib/tryParseJSON';
import { insertTour } from '@models/tour';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') return post(req, res);

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e: any) {
    console.debug(`/api/tour ${req.method} ERROR::`, e);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const payload = tryParseJson(req.body);
  const insertd = await insertTour(payload);

  return res.status(200).json(insertd);
}

export default routeHandler;
