import { RequestError } from 'lib/errorClasses';
import { NextApiRequest, NextApiResponse } from 'next';

import { bookingModel } from '@models/booking';

export default async function routeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id)
    return res
      .status(404)
      .json({ message: `Booking is not found ${req.query.id}` });

  try {
    const data = await bookingModel.loadById(req.query.id as string);
    if (!data)
      throw new RequestError(404, `Booking is not found : ${req.query.id}`);

    return res.status(200).json(data);
  } catch (e: any) {
    if (e.code) return res.status(e.code).json({ message: e.message });
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}
