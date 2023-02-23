import { NextApiRequest, NextApiResponse } from 'next';

import { userModel } from '@models/user';

export default async function routeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await userModel.loadBookings(
      req.query.email as string,
      req.query.type as FacilityTypeEnum
    );

    return res.status(200).json(data);
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}
