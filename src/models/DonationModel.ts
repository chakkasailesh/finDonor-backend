import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './UserModel'
import { IHospital } from './HospitalModel'

interface IDonation extends Document {
  donorId: IUser['_id']
  hospitalId: IHospital['_id']
  donatedAt: Date
}

const donationSchema: Schema = new Schema({
  donorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true },
  donatedAt: { type: Date, default: Date.now },
})

const Donation = mongoose.model<IDonation>('Donation', donationSchema)

export { Donation, IDonation }
