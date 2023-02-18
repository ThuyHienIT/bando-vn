import { NextApiRequest, NextApiResponse } from 'next';
import { bookingModel } from '@models/booking';

export default async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await bookingModel.update(req.body);

    return res.status(200).json(data);
  } catch (e: any) {
    if (e.code) {
      return res.status(e.code).json({ message: e.message });
    }

    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}
