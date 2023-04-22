import { NextApiRequest, NextApiResponse } from 'next';

import { queryCompaniesByTypes } from '@models/company';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const type = req.query.type as string;
    const keyword = req.query.q as string;
    const data = await queryCompaniesByTypes(
      type ? [type] : undefined,
      keyword
    );

    return res.status(200).json(data);
  } catch (e: any) {
    console.log('ERROR searching::', e);

    return res.status(500).json({ message: 'Cannot retrieve data' });
  }
}

export default routeHandler;
