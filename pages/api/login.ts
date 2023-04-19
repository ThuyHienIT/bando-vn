import { NextApiRequest, NextApiResponse } from 'next';

import { tryParseJson } from '@lib/tryParseJSON';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payload = tryParseJson(req.body);
    if (!payload.email || !payload.password)
      return res.status(400).json({ message: 'Email & Password are required' });

    // Calling our pure function using the `res` object, it will add the `set-cookie` header
    // Add the `set-cookie` header on the main domain and expire after 30 days

    return res.json({ message: 'success' });
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

export default routeHandler;
