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

const router = express.Router()

const re = (req, res, next) => {
  console.log(req.params.id)
  next()
}
// Routes
// DATA CATHING WITH REDIS : redisGetData
router.get('/',redisGetData('houses'), index)
router.post('/', create)
router.put('/upload-photos/:id', photosUpload)
router.route('/:id')
.get(redisGetData(),show) // get the id automatically, don't need any param
.put(update)

module.exports = router
