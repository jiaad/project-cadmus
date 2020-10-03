/* eslint-disable import/named */
import express from 'express'
import {
  index,
  create,
  show,
  update,
  deleteUser,
  socialMediaHandles,
} from '../controllers/usersController'
import authenticateJWT from '../middleware/Auth'

const router = express.Router()

/* GET users listing. */
router.get('/', authenticateJWT, index)
router.post('/create', create)
router.put('/:id/update', update)
router.get('/:id', show)
router.delete('/:id/delete', deleteUser)
router.put('/:id/social-links', socialMediaHandles)

module.exports = router
