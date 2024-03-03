import mongoose, { Schema, Document } from 'mongoose'
import { BloodGroup } from './UserModel'

interface IHospital extends Document {
  name: string
  location: string
  contactNumber: string
  availableBloodGroups: BloodGroup[]
  createdAt: Date
}

const hospitalSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  availableBloodGroups: {
    type: [String],
    enum: Object.values(BloodGroup),
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
})

const Hospital = mongoose.model<IHospital>('Hospital', hospitalSchema)

export { Hospital, IHospital, BloodGroup }
