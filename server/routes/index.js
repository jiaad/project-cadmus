import express from 'express'
import home from './home'
import users from './users'
import auth from './auth'

const router = express.Router()

router.use('/api/v1', home)
router.use('/api/v1/users', users)
router.use('/api/v1/auth', auth)

module.exports = router
