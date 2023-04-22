import { getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

import { ironOptions } from '@lib/config';
import { tryParseJson } from '@lib/tryParseJSON';
import { loginUser } from '@models/user';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') return get(req, res);

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e: any) {
    console.debug('/api/login/ ERROR::', e);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const payload = tryParseJson(req.body);
  if (!payload.email || !payload.password)
    return res.status(400).json({ message: 'Email & Password are required' });

  const session = await getIronSession(req, res, ironOptions);
  const user = await loginUser(payload.email, payload.password);

  if (!user)
    return res.status(400).json({ message: 'Email or Password is invalid' });

  // get user from database then:
  session.user = user;
  req.session = session;

  await req.session.save();

  return res.status(200).json(user);
}
export default routeHandler;
