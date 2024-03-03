import express, { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import connect from './db'
import userRouter from './routes/UserRoutes'
import hospitalRouter from './routes/HospitalRoutes'
import donationRouter from './routes/DonationRoutes'

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use('/users', userRouter)
app.use('/hospitals', hospitalRouter)
app.use('/donations', donationRouter)

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

app.listen(port, async () => {
  console.log('Server is listening at port : ' + port)
  try {
    await connect()
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
  }
})
