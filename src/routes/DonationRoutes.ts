import express, { Router } from 'express'
import { getDonations, addDonation } from '../controllers/DonationController'

const router: Router = express.Router()

router.get('/:donorId', getDonations)
router.post('/', addDonation)

export default router
