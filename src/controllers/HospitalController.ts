import { Request, Response, NextFunction } from 'express'
import { Hospital, IHospital } from '../models/HospitalModel'
import log from '../utils/logger'

const getHospitals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hospitals = await Hospital.find(
      {},
      { _id: 0, __v: 0, password: 0, createdAt: 0 }
    )
    res.status(200).json(hospitals)
  } catch (error) {
    log.error(error)
    next(new Error('Error fetching hospitals'))
  }
}

const addHospital = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, location, contactNumber, availableBloodGroups }: IHospital =
      req.body
    const hospital = new Hospital({
      name,
      location,
      contactNumber,
      availableBloodGroups,
    })
    const newHospital = await hospital.save()
    res.status(201).json(newHospital)
  } catch (error) {
    log.error(error)
    next(new Error('Error creating hospital'))
  }
}

export { getHospitals, addHospital }
