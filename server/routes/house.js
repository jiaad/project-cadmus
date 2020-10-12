/* eslint-disable prettier/prettier */
import express from 'express'
import {
  index,
  create,
  show,
  photosUpload,
  update,
} from '../controllers/houseController'
// const multer = require('multer')
// const upload = multer({ dest: 'images/houses/' }) // .array('photos', 5)
import {redisGetData} from "../middleware/redisCheck"
import authenticateJWT from "../middleware/Auth"
// import { authorizeOwner, authorizeHouseOwnerToModify } from '../middleware/protectRoutes'
import { authorizeHouseOwnerToModify } from '../middleware/protectHouseRoutes'

const router = express.Router()

// Routes
// DATA CATHING WITH REDIS : redisGetData
router.get('/',redisGetData('houses'), index)
router.post('/', create)
router.put('/upload-photos/:id',authenticateJWT,authorizeHouseOwnerToModify(), photosUpload)
router.route('/:id')
.get(redisGetData(),show) // get the id automatically, don't need any param
.put(update)

module.exports = router
