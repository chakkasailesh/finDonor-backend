import express, { Router, Request, Response, NextFunction } from 'express'
import { getDonors, addUser, updateUser } from '../controllers/UserController'

const router: Router = express.Router()

router.get('/', getDonors)
router.post('/', addUser)
router.put('/:userId', updateUser)

export default router
