import { NextApiRequest, NextApiResponse } from 'next';

import request from '@lib/request';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const resp = await request(
      'https://my.api.mockaroo.com/company.json?key=7b8fc150'
    );
    return res.status(200).json(resp);
  } catch (e: any) {
    console.log('ERROR searching::', e);

    return res.status(500).json({ message: 'Cannot retrieve data' });
  }
}

export default routeHandler;
