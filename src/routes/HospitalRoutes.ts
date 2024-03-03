import express, { Router } from 'express'
import { getHospitals, addHospital } from '../controllers/HospitalController'

const router: Router = express.Router()

router.get('/', getHospitals)
router.post('/', addHospital)

export default router
