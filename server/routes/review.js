import express from 'express'
import { createReview } from '../controllers/reviewController'
import authenticateJWT from '../middleware/Auth'

const router = express.Router({ mergeParams: true })

router.post('/:house_id', authenticateJWT, createReview)

module.exports = router
