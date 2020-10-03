import express from 'express'
import home from './home'
import users from './users'
import auth from './auth'
import house from './house'
import review from './review'

const router = express.Router()

router.use('/api/v1', home)
router.use('/api/v1/users', users)
router.use('/api/v1/auth', auth)
router.use('/api/v1/houses', house)
router.use('/api/v1/reviews', review)

module.exports = router
