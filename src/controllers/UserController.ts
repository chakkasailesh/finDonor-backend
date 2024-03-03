import { Request, Response, NextFunction } from 'express'
import { IUser, User } from '../models/UserModel'
import bcrypt from 'bcrypt'
import log from '../utils/logger'

const getDonors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find(
      { isDonor: true },
      { _id: 0, __v: 0, password: 0, createdAt: 0 }
    )
    res.status(200).json(users)
  } catch (error) {
    log.error(error)
    next(new Error('Error fetching donors'))
  }
}

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      email,
      password,
      isDonor,
      bloodGroup,
      phoneNumber,
      address,
    }: IUser = req.body
    const encryptedPwd = await bcrypt.hash(password, 12)
    const user = new User({
      name,
      email,
      password: encryptedPwd,
      isDonor,
      bloodGroup,
      phoneNumber,
      address,
    })
    const newUser = await user.save()
    const { password: pwd, ...newUserData } = newUser.toObject()
    res.status(201).json(newUserData)
  } catch (error) {
    log.error(error)
    next(new Error('Error creating user'))
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.userId
    const userData: Partial<IUser> = req.body
    if (userData.password)
      userData.password = await bcrypt.hash(userData.password, 12)
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    })
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    const { password, ...updatedUserData } = updatedUser.toObject()
    res.status(200).json(updatedUserData)
  } catch (error) {
    log.error(error)
    next(new Error('Error updating user'))
  }
}

export { getDonors, addUser, updateUser }
