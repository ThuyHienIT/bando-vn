import { NextApiRequest, NextApiResponse } from 'next';

import { bookingModel } from '@models/booking';

export default async function routeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id;
    const data = await bookingModel.cancel(id as string);

    return res.status(200).json(data);
  } catch (e: any) {
    if (e.code) {
      return res.status(e.code).json({ message: e.message });
    }

    return res.status(500).json({ message: e.message });
  }
}
