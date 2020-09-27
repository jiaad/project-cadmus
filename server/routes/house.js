import express from 'express'
import { create, show } from '../controllers/houseConroller'

const router = express.Router()

// Routes
router.post('/', create)
router.get('/:id', show)

module.exports = router
