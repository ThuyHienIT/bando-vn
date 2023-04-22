import { NextApiRequest, NextApiResponse } from 'next';

import { queryCompaniesByTypes } from '@models/company';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') return get(req, res);

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e: any) {
    console.debug('/api/companies/ ERROR::');
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const data = await queryCompaniesByTypes();
  return res.status(200).json(data);
}

export default routeHandler;
