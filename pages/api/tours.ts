import { NextApiRequest, NextApiResponse } from 'next';

import { queryTourByCompanyId } from '@models/tour';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') return get(req, res);

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e: any) {
    console.debug('/api/tours/ ERROR::', e);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const data = await queryTourByCompanyId(req.query.id as string);
  return res.status(200).json(data);
}

export default routeHandler;
