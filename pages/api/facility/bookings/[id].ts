import { NextApiRequest, NextApiResponse } from 'next';

import { bookingModel } from '@models/booking';

export default async function routeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id)
    return res
      .status(404)
      .json({ message: `Cannot find bookings of facility: ${req.query.id}` });

  try {
    const data = await bookingModel.loadByFacilityId(req.query.id as string);

    return res.status(200).json(data);
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}
