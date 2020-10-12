import { Router } from 'express'
// import express from 'express'

import reservationController from '../controllers/reservationController'
// const router = express.Router()
import authenticateJWT from '../middleware/Auth'
import {
  VerifyIfAlreadyReserved,
  mustBeThreeDaysAgo,
} from '../middleware/reservations'

const router = Router()

router.post(
  '/:id/reserve',
  authenticateJWT,
  VerifyIfAlreadyReserved,
  reservationController.create
)

router.delete(
  '/:reserve_id/delete',
  mustBeThreeDaysAgo,
  reservationController.delete
)
export default router
