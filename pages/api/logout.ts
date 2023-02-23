import { NextApiRequest, NextApiResponse } from 'next';

import { setCookie } from '@lib/cookies';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Calling our pure function using the `res` object, it will add the `set-cookie` header
    // Add the `set-cookie` header on the main domain and expire after 30 days
    setCookie(res, 'token', 'deleted', { path: '/', maxAge: 0 });

    return res.json({ message: 'logout success' });
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

export default routeHandler;
