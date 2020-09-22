import express from'express'
import httpCode from 'http-status-codes'
import {logout, login} from '../controllers/authController'
import asyncHandler from '../middleware/asyncHandler'

const router = express.Router()

router.post('/login', login)
router.get('/logout', logout)

module.exports = router;
