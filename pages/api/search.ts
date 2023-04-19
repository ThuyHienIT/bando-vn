import { NextApiRequest, NextApiResponse } from 'next';

import company from '../../data/company.json';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json(company);
  } catch (e: any) {
    console.log('ERROR searching::', e);

    return res.status(500).json({ message: 'Cannot retrieve data' });
  }
}

export default routeHandler;
