import { Request, Response, NextFunction } from 'express'
import { Donation, IDonation } from '../models/DonationModel'
import log from '../utils/logger'

const getDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const donorId = req.params.donorId
    const donations = await Donation.find(
      { donorId },
      { _id: 0, __v: 0 }
    ).populate('hospitalId')
    const result = donations.map((donation) => ({
      hospital: donation.hospitalId.name,
      address: donation.hospitalId.location,
      donatedAt: donation.donatedAt,
    }))
    res.status(200).json(result)
  } catch (error) {
    log.error(error)
    next(new Error('Error fetching donations'))
  }
}

const addDonation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { donorId, hospitalId, donatedAt }: IDonation = req.body
    const donation = new Donation({ donorId, hospitalId, donatedAt })
    const newDonation = await donation.save()
    res.status(201).json(newDonation)
  } catch (error) {
    log.error(error)
    next(new Error('Error adding donation'))
  }
}

export { getDonations, addDonation }
