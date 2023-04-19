import { NextApiRequest, NextApiResponse } from 'next';

import company from '../../../data/company.json';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id;
    const found = company.find((i) => i.id === id);
    if (!found) return res.status(404).json({ message: 'Item not found' });

    return res.status(200).json(found);
  } catch (e: any) {
    console.log('ERROR searching::', e);

    return res.status(500).json({ message: 'Cannot retrieve data' });
  }
}

export default routeHandler;
