import { NextApiRequest, NextApiResponse } from 'next';
import { facilityModel } from '../models/facility';

export default async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const facilityType = req.query.type as FacilityTypeEnum;
    const data = await facilityModel.loadFacilities(facilityType);

    return res.status(200).json(data);
  } catch (e: any) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}
