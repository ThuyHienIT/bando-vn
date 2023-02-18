import { NextApiRequest, NextApiResponse } from 'next';
import { facilityModel } from '@models/facility';

export default async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const data = await facilityModel.loadById(id);

    if (!data) return res.status(404).json({ message: `Cannot found facility ${id}` });

    return res.status(200).json(data);
  } catch (e: any) {
    console.log('Fetching facilities ERROR::', e);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}
