import { NextApiRequest, NextApiResponse } from 'next';
import { facilityModel } from '@models/facility';
import { bookingModel } from '@app/pages/models/booking';
import { RequsetError } from '@app/pages/lib/errorClasses';

export default async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await facilityModel.book(req.body);

    return res.status(200).json(data);
  } catch (e: any) {
    if (e.code) {
      return res.status(e.code).json({ message: e.message });
    }

    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}
