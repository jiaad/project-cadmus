import express  from 'express';
import home  from './home';
import users  from './users'

const router = express.Router()

router.use('/api/v1', home)
router.use('/api/v1/users', users)

module.exports = router