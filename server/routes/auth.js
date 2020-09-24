import express from 'express'
import { logout, login, updatePassword } from '../controllers/authController'

const router = express.Router()

router.post('/login', login)
router.get('/logout', logout)
router.post('/:id/password-update', updatePassword)

module.exports = router
