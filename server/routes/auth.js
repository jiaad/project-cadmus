import express from 'express'
import {
  signUp,
  logout,
  login,
  updatePassword,
  forgotPassword,
  resetPassword,
  confirmationPost,
  resendConfirmation,
} from '../controllers/authController'
import authenticateJWT from '../middleware/Auth'

const router = express.Router()

/* USER CONFIRMATION AFTER VERIFICATION */
router.post('/confirmation', confirmationPost)
router.post('/resend', resendConfirmation)

router.post('/signup', signUp)
router.post('/login', login)
router.get('/logout', authenticateJWT, logout)
router.post('/:id/password-update', updatePassword)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

module.exports = router
