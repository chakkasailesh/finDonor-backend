import mongoose from 'mongoose'
import 'dotenv/config'

const connect = async () => {
  if (process.env.DB_URI) {
    try {
      await mongoose.connect(process.env.DB_URI)
      console.log('Connected to MongoDB')
    } catch (err) {
      console.error('Error connecting to MongoDB:', err)
    }
  }
}

export default connect
