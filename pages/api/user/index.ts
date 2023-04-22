import { getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

import { ironOptions } from '@lib/config';
import { tryParseJson } from '@lib/tryParseJSON';
import { insertUser } from '@models/user';

async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') return post(req, res);

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e: any) {
    console.debug('/api/companies/ ERROR::');
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession(req, res, ironOptions);
  // if (session.user?.role !== 'admin') {
  //   return res
  //     .status(403)
  //     .json({ message: "Your don't have permssion to do this action" });
  // }

  const payload = tryParseJson(req.body);
  const data = await insertUser(payload);

  return res.status(200).json(data);
}

export default routeHandler;
