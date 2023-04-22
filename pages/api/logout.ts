import { getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

import { ironOptions } from '@lib/config';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Calling our pure function using the `res` object, it will add the `set-cookie` header
    // Add the `set-cookie` header on the main domain and expire after 30 days
    const session = await getIronSession(req, res, ironOptions);
    session.destroy();

    return res.json({ message: 'logout success' });
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

export default routeHandler;
