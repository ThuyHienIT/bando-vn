import { NextApiRequest, NextApiResponse } from 'next';
import { facilityModel } from '../models/facility';

export default async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await facilityModel.loadFacilities();
    return res.status(200).json(data);
  } catch (e: any) {
    console.log('Fetching facilities ERROR::', e);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}
