import mongoose, { Schema, Document } from 'mongoose'

// Define BloodGroup enum
enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

interface IUser extends Document {
  name: string
  email: string
  password: string
  isDonor: boolean
  bloodGroup: BloodGroup
  phoneNumber: string
  address?: string
  createdAt: Date
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isDonor: { type: Boolean, default: false },
  bloodGroup: { type: String, enum: Object.values(BloodGroup), required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model<IUser>('User', userSchema)

export { User, IUser, BloodGroup }
