import { getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

import { ironOptions } from '@lib/config';
import { tryParseJson } from '@lib/tryParseJSON';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payload = tryParseJson(req.body);
    if (!payload.email || !payload.password)
      return res.status(400).json({ message: 'Email & Password are required' });

    const session = await getIronSession(req, res, ironOptions);

    const user = {} as UserInfo; // retrieve user
    // get user from database then:
    session.user = user;

    req.session = session;

    await req.session.save();
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

export default routeHandler;
